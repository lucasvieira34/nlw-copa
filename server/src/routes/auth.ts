import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import axios from "axios";
import { authenticate } from "../plugins/authenticate";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/me",
    {
      onRequest: [authenticate],
    },
    async (request) => {
      return { user: request.user };
    }
  );

  fastify.post("/users", async (request) => {
    const createUserBody = z.object({
      access_token: z.string(),
      loginProvider: z.string(),
    });

    const { access_token, loginProvider } = createUserBody.parse(request.body);

    let userResponse, userData;
    if (loginProvider === "GOOGLE") {
      userResponse = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      userData = await userResponse.data;
    } else {
      userResponse = await axios.get(
        `https://graph.facebook.com/me?fields=id,name,picture.type(large),email&access_token=${access_token}`
      );
      userData = await { ...userResponse.data, picture: userResponse.data.picture.data.url };
    }

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });

    const userInfo = userInfoSchema.parse(userData);

    let where, data;
    if (loginProvider === "GOOGLE") {
      where = {
        googleId: userInfo.id,
      };
      data = {
        googleId: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        avatarUrl: userInfo.picture,
      };
    } else {
      where = {
        facebookId: userInfo.id,
      };
      data = {
        facebookId: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        avatarUrl: userInfo.picture,
      };
    }
    let user = await prisma.user.findUnique({
      where,
    });

    if (!user) {
      user = await prisma.user.create({
        data,
      });

      const message =
        loginProvider === "GOOGLE"
          ? `USUÁRIO LOGADO VIA GOOGLE: ${user.email}`
          : `USUÁRIO LOGADO VIA FACEBOOK: ${user.email}`;

      console.log(message);
    }

    const token = fastify.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: "7 days",
      }
    );

    return { token };
  });
}
