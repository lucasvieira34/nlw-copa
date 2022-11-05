"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const pool_1 = require("./routes/pool");
const auth_1 = require("./routes/auth");
const game_1 = require("./routes/game");
const guess_1 = require("./routes/guess");
const user_1 = require("./routes/user");
async function bootstrap() {
    const fastify = (0, fastify_1.default)({
        logger: true,
    });
    await fastify.register(cors_1.default, {
        origin: true,
    });
    await fastify.register(jwt_1.default, { secret: `${process.env.JWT_SECRET}` });
    await fastify.register(pool_1.poolRoutes);
    await fastify.register(auth_1.authRoutes);
    await fastify.register(game_1.gameRoutes);
    await fastify.register(guess_1.guessRoutes);
    await fastify.register(user_1.userRoutes);
    // PARA CONECTAR COM MOBILE, É NECESSÁRIO O HOST EM DEV
    await fastify.listen({ port: Number(process.env.PORT), host: `${process.env.HOST}` });
}
bootstrap();
