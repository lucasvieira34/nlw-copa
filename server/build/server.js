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
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const pool_1 = require("./routes/pool");
const auth_1 = require("./routes/auth");
const game_1 = require("./routes/game");
const guess_1 = require("./routes/guess");
const user_1 = require("./routes/user");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const fastify = (0, fastify_1.default)({
            logger: true,
        });
        yield fastify.register(cors_1.default, {
            origin: true,
        });
        yield fastify.register(jwt_1.default, { secret: `${process.env.JWT_SECRET}` });
        yield fastify.register(pool_1.poolRoutes);
        yield fastify.register(auth_1.authRoutes);
        yield fastify.register(game_1.gameRoutes);
        yield fastify.register(guess_1.guessRoutes);
        yield fastify.register(user_1.userRoutes);
        // PARA CONECTAR COM MOBILE, É NECESSÁRIO O HOST EM DEV
        yield fastify.listen({ port: Number(process.env.PORT), host: `${process.env.HOST}` });
    });
}
bootstrap();
