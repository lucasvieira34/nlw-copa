"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const axios_1 = __importDefault(require("axios"));
const authenticate_1 = require("../plugins/authenticate");
async function authRoutes(fastify) {
    fastify.get("/me", {
        onRequest: [authenticate_1.authenticate],
    }, async (request) => {
        return { user: request.user };
    });
    fastify.post("/users", async (request) => {
        const createUserBody = zod_1.z.object({
            access_token: zod_1.z.string(),
        });
        const { access_token } = createUserBody.parse(request.body);
        const userResponse = await axios_1.default.get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const userData = await userResponse.data;
        const userInfoSchema = zod_1.z.object({
            id: zod_1.z.string(),
            email: zod_1.z.string().email(),
            name: zod_1.z.string(),
            picture: zod_1.z.string().url(),
        });
        const userInfo = userInfoSchema.parse(userData);
        let user = await prisma_1.prisma.user.findUnique({
            where: {
                googleId: userInfo.id,
            },
        });
        if (!user) {
            user = await prisma_1.prisma.user.create({
                data: {
                    googleId: userInfo.id,
                    name: userInfo.name,
                    email: userInfo.email,
                    avatarUrl: userInfo.picture,
                },
            });
            console.log(`USUÁRIO LOGADO VIA GOOGLE: ${user.email}`);
        }
        const token = fastify.jwt.sign({
            name: user.name,
            avatarUrl: user.avatarUrl,
        }, {
            sub: user.id,
            expiresIn: "7 days",
        });
        return { token };
    });
}
exports.authRoutes = authRoutes;
