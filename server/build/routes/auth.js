"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const axios_1 = __importDefault(require("axios"));
const authenticate_1 = require("../plugins/authenticate");
function authRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get("/me", {
            onRequest: [authenticate_1.authenticate],
        }, (request) => __awaiter(this, void 0, void 0, function* () {
            return { user: request.user };
        }));
        fastify.post("/users", (request) => __awaiter(this, void 0, void 0, function* () {
            const createUserBody = zod_1.z.object({
                access_token: zod_1.z.string(),
            });
            const { access_token } = createUserBody.parse(request.body);
            const userResponse = yield axios_1.default.get("https://www.googleapis.com/oauth2/v2/userinfo", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const userData = yield userResponse.data;
            const userInfoSchema = zod_1.z.object({
                id: zod_1.z.string(),
                email: zod_1.z.string().email(),
                name: zod_1.z.string(),
                picture: zod_1.z.string().url(),
            });
            const userInfo = userInfoSchema.parse(userData);
            let user = yield prisma_1.prisma.user.findUnique({
                where: {
                    googleId: userInfo.id,
                },
            });
            if (!user) {
                user = yield prisma_1.prisma.user.create({
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
        }));
    });
}
exports.authRoutes = authRoutes;
