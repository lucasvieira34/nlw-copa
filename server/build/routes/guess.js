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
exports.guessRoutes = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const authenticate_1 = require("../plugins/authenticate");
function guessRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get("/guesses/count", () => __awaiter(this, void 0, void 0, function* () {
            const count = yield prisma_1.prisma.guess.count();
            return { count };
        }));
        fastify.post("/pools/:poolId/games/:gameId/guesses", {
            onRequest: [authenticate_1.authenticate],
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const createGuessParams = zod_1.z.object({
                poolId: zod_1.z.string(),
                gameId: zod_1.z.string(),
            });
            const createGuessBody = zod_1.z.object({
                firstTeamPoints: zod_1.z.number(),
                secondTeamPoints: zod_1.z.number(),
            });
            const { poolId, gameId } = createGuessParams.parse(request.params);
            const { firstTeamPoints, secondTeamPoints } = createGuessBody.parse(request.body);
            const participant = yield prisma_1.prisma.participant.findUnique({
                where: {
                    userId_poolId: {
                        poolId,
                        userId: request.user.sub,
                    },
                },
            });
            if (!participant) {
                return reply.status(400).send({
                    message: "You're not allowed to create a guess inside this pool.",
                });
            }
            const guess = yield prisma_1.prisma.guess.findUnique({
                where: {
                    participantId_gameId: {
                        participantId: participant.id,
                        gameId,
                    },
                },
            });
            if (guess) {
                return reply.status(400).send({
                    message: "You're already sent a guess to this game on this pool.",
                });
            }
            const game = yield prisma_1.prisma.game.findUnique({
                where: {
                    id: gameId,
                },
            });
            if (!game) {
                return reply.status(404).send({
                    message: "Game not found.",
                });
            }
            if (game.date < new Date()) {
                return reply.status(404).send({
                    message: "You cannot send guesses after the game date.",
                });
            }
            yield prisma_1.prisma.guess.create({
                data: {
                    gameId,
                    participantId: participant.id,
                    firstTeamPoints,
                    secondTeamPoints,
                },
            });
            return reply.status(201).send();
        }));
    });
}
exports.guessRoutes = guessRoutes;
