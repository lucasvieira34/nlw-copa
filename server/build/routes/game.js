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
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const authenticate_1 = require("../plugins/authenticate");
function gameRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get("/pools/:id/games", {
            onRequest: [authenticate_1.authenticate],
        }, (request) => __awaiter(this, void 0, void 0, function* () {
            const getPoolParams = zod_1.z.object({
                id: zod_1.z.string(),
            });
            const { id } = getPoolParams.parse(request.params);
            const games = yield prisma_1.prisma.game.findMany({
                orderBy: {
                    date: "asc",
                },
                include: {
                    guesses: {
                        where: {
                            participant: {
                                userId: request.user.sub,
                                poolId: id,
                            },
                        },
                    },
                },
            });
            return {
                games: games.map((game) => {
                    return Object.assign(Object.assign({}, game), { guess: game.guesses.length > 0 ? game.guesses[0] : null, guesses: undefined });
                }),
            };
        }));
        fastify.get("/games", {
            onRequest: [authenticate_1.authenticate],
        }, () => __awaiter(this, void 0, void 0, function* () {
            const games = yield prisma_1.prisma.game.findMany({
                orderBy: {
                    date: "asc",
                },
            });
            return { games };
        }));
    });
}
exports.gameRoutes = gameRoutes;
