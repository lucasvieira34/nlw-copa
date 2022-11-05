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
exports.poolRoutes = void 0;
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const authenticate_1 = require("../plugins/authenticate");
function poolRoutes(fastify) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get("/pools/count", () => __awaiter(this, void 0, void 0, function* () {
            const count = yield prisma_1.prisma.pool.count();
            return { count };
        }));
        fastify.post("/pools", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const createPoolBody = zod_1.z.object({
                title: zod_1.z.string(),
            });
            const { title } = createPoolBody.parse(request.body);
            const generate = new short_unique_id_1.default({ length: 6 });
            const code = String(generate()).toUpperCase();
            try {
                yield request.jwtVerify();
                yield prisma_1.prisma.pool.create({
                    data: {
                        title,
                        code,
                        ownerId: request.user.sub,
                        participants: {
                            create: {
                                userId: request.user.sub,
                            },
                        },
                    },
                });
            }
            catch (_a) {
                yield prisma_1.prisma.pool.create({
                    data: {
                        title,
                        code,
                    },
                });
            }
            return reply.status(201).send({ code });
        }));
        fastify.post("/pools/join", {
            onRequest: [authenticate_1.authenticate],
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const joinPoolBody = zod_1.z.object({
                code: zod_1.z.string(),
            });
            const { code } = joinPoolBody.parse(request.body);
            const pool = yield prisma_1.prisma.pool.findUnique({
                where: {
                    code,
                },
                include: {
                    participants: {
                        where: {
                            userId: request.user.sub,
                        },
                    },
                },
            });
            if (!pool) {
                return reply.status(400).send({
                    message: "Pool not found.",
                });
            }
            if (pool.participants.length > 0) {
                return reply.status(400).send({
                    message: "You already joined this pool.",
                });
            }
            if (!pool.ownerId) {
                yield prisma_1.prisma.pool.update({
                    where: {
                        id: pool.id,
                    },
                    data: {
                        ownerId: request.user.sub,
                    },
                });
            }
            yield prisma_1.prisma.participant.create({
                data: {
                    poolId: pool.id,
                    userId: request.user.sub,
                },
            });
            return reply.status(201).send();
        }));
        fastify.get("/pools", {
            onRequest: [authenticate_1.authenticate],
        }, (request) => __awaiter(this, void 0, void 0, function* () {
            const pools = yield prisma_1.prisma.pool.findMany({
                where: {
                    participants: {
                        some: {
                            userId: request.user.sub,
                        },
                    },
                },
                include: {
                    _count: {
                        select: {
                            participants: true,
                        },
                    },
                    participants: {
                        select: {
                            id: true,
                            user: {
                                select: {
                                    avatarUrl: true,
                                },
                            },
                        },
                        take: 4,
                    },
                    owner: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });
            return { pools };
        }));
        fastify.get("/pools/:id", {
            onRequest: [authenticate_1.authenticate],
        }, (request) => __awaiter(this, void 0, void 0, function* () {
            const getPoolParams = zod_1.z.object({
                id: zod_1.z.string(),
            });
            const { id } = getPoolParams.parse(request.params);
            const pool = yield prisma_1.prisma.pool.findUnique({
                where: {
                    id,
                },
                include: {
                    _count: {
                        select: {
                            participants: true,
                        },
                    },
                    participants: {
                        select: {
                            id: true,
                            user: {
                                select: {
                                    avatarUrl: true,
                                },
                            },
                        },
                        take: 4,
                    },
                    owner: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });
            return { pool };
        }));
    });
}
exports.poolRoutes = poolRoutes;
