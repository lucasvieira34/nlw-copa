import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.game.create({
    data: {
      date: "2022-11-20T13:00:00.201Z",
      firstTeamCountryCode: "QA",
      secondTeamCountryCode: "EC",
      firstTeamName: "Catar",
      secondTeamName: "Equador",
      round: "1ª rodada",
      group: "A",
      stadium: "AL BAYT",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-21T13:00:00.201Z",
      firstTeamCountryCode: "SN",
      secondTeamCountryCode: "NL",
      firstTeamName: "Senegal",
      secondTeamName: "Holanda",
      round: "1ª rodada",
      group: "A",
      stadium: "AL THUMAMA",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-21T10:00:00.201Z",
      firstTeamCountryCode: "GB",
      secondTeamCountryCode: "IR",
      firstTeamName: "Inglaterra",
      secondTeamName: "Irã",
      round: "1ª rodada",
      group: "B",
      stadium: "INTERNACIONAL KHALIFA",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-21T16:00:00.201Z",
      firstTeamCountryCode: "US",
      secondTeamCountryCode: "WL",
      firstTeamName: "Estados Unidos",
      secondTeamName: "País de Gales",
      round: "1ª rodada",
      group: "B",
      stadium: "AHMAD BIN ALI",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-22T07:00:00.201Z",
      firstTeamCountryCode: "AR",
      secondTeamCountryCode: "SA",
      firstTeamName: "Argentina",
      secondTeamName: "Arábia Saudita",
      round: "1ª rodada",
      group: "C",
      stadium: "LUSAIL",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-22T13:00:00.201Z",
      firstTeamCountryCode: "MX",
      secondTeamCountryCode: "PL",
      firstTeamName: "México",
      secondTeamName: "Polônia",
      round: "1ª rodada",
      group: "C",
      stadium: "ESTÁDIO 974",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-22T10:00:00.201Z",
      firstTeamCountryCode: "DK",
      secondTeamCountryCode: "TN",
      firstTeamName: "Dinamarca",
      secondTeamName: "Tunísia",
      round: "1ª rodada",
      group: "D",
      stadium: "CIDADE DA EDUCAÇÃO",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-22T16:00:00.201Z",
      firstTeamCountryCode: "FR",
      secondTeamCountryCode: "AU",
      firstTeamName: "França",
      secondTeamName: "Austrália",
      round: "1ª rodada",
      group: "D",
      stadium: "AL JANOUB",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-23T10:00:00.201Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "JP",
      firstTeamName: "Alemanha",
      secondTeamName: "Japão",
      round: "1ª rodada",
      group: "E",
      stadium: "INTERNACIONAL KHALIFA",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-23T13:00:00.201Z",
      firstTeamCountryCode: "ES",
      secondTeamCountryCode: "CR",
      firstTeamName: "Espanha",
      secondTeamName: "Costa Rica",
      round: "1ª rodada",
      group: "E",
      stadium: "AL THUMAMA",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-23T07:00:00.201Z",
      firstTeamCountryCode: "MA",
      secondTeamCountryCode: "HR",
      firstTeamName: "Marrocos",
      secondTeamName: "Croácia",
      round: "1ª rodada",
      group: "F",
      stadium: "AL BAYT",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-23T16:00:00.201Z",
      firstTeamCountryCode: "BE",
      secondTeamCountryCode: "CA",
      firstTeamName: "Bélgica",
      secondTeamName: "Canadá",
      round: "1ª rodada",
      group: "F",
      stadium: "AHMAD BIN ALI",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-24T07:00:00.201Z",
      firstTeamCountryCode: "CH",
      secondTeamCountryCode: "CM",
      firstTeamName: "Suíça",
      secondTeamName: "Camarões",
      round: "1ª rodada",
      group: "G",
      stadium: "AL JANOUB",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-24T16:00:00.201Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "RS",
      firstTeamName: "Brasil",
      secondTeamName: "Sérvia",
      round: "1ª rodada",
      group: "G",
      stadium: "LUSAIL",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-24T10:00:00.201Z",
      firstTeamCountryCode: "UY",
      secondTeamCountryCode: "KR",
      firstTeamName: "Uruguai",
      secondTeamName: "Coréia do Sul",
      round: "1ª rodada",
      group: "H",
      stadium: "CIDADE DA EDUCAÇÃO",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-24T13:00:00.201Z",
      firstTeamCountryCode: "PT",
      secondTeamCountryCode: "GH",
      firstTeamName: "Portugal",
      secondTeamName: "Gana",
      round: "1ª rodada",
      group: "H",
      stadium: "ESTÁDIO 974",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-25T10:00:00.201Z",
      firstTeamCountryCode: "QA",
      secondTeamCountryCode: "SN",
      firstTeamName: "Catar",
      secondTeamName: "Senegal",
      round: "2ª rodada",
      group: "A",
      stadium: "AL THUMAMA",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-25T13:00:00.201Z",
      firstTeamCountryCode: "NL",
      secondTeamCountryCode: "EC",
      firstTeamName: "Holanda",
      secondTeamName: "Equador",
      round: "2ª rodada",
      group: "A",
      stadium: "INTERNACIONAL KHALIFA",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-25T07:00:00.201Z",
      firstTeamCountryCode: "WL",
      secondTeamCountryCode: "IR",
      firstTeamName: "País de Gales",
      secondTeamName: "Irá",
      round: "2ª rodada",
      group: "B",
      stadium: "AHMAD BIN ALI",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-25T16:00:00.201Z",
      firstTeamCountryCode: "GB",
      secondTeamCountryCode: "US",
      firstTeamName: "Inglaterra",
      secondTeamName: "Estados Unidos",
      round: "2ª rodada",
      group: "B",
      stadium: "AL BAYT",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-26T10:00:00.201Z",
      firstTeamCountryCode: "PL",
      secondTeamCountryCode: "SA",
      firstTeamName: "Polônia",
      secondTeamName: "Arábia Saudita",
      round: "2ª rodada",
      group: "C",
      stadium: "CIDADE DA EDUCAÇÃO",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-26T16:00:00.201Z",
      firstTeamCountryCode: "AR",
      secondTeamCountryCode: "MX",
      firstTeamName: "Argentina",
      secondTeamName: "México",
      round: "2ª rodada",
      group: "C",
      stadium: "LUSAIL",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-26T07:00:00.201Z",
      firstTeamCountryCode: "TN",
      secondTeamCountryCode: "AU",
      firstTeamName: "Tunísia",
      secondTeamName: "Austrália",
      round: "2ª rodada",
      group: "D",
      stadium: "AL JANOUB",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-26T13:00:00.201Z",
      firstTeamCountryCode: "FR",
      secondTeamCountryCode: "DK",
      firstTeamName: "França",
      secondTeamName: "Dinamarca",
      round: "2ª rodada",
      group: "D",
      stadium: "ESTÁDIO 974",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-27T07:00:00.201Z",
      firstTeamCountryCode: "JP",
      secondTeamCountryCode: "CR",
      firstTeamName: "Japão",
      secondTeamName: "Costa Rica",
      round: "2ª rodada",
      group: "E",
      stadium: "AHMAD BIN ALI",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-27T16:00:00.201Z",
      firstTeamCountryCode: "ES",
      secondTeamCountryCode: "DE",
      firstTeamName: "Espanha",
      secondTeamName: "Alemanha",
      round: "2ª rodada",
      group: "E",
      stadium: "AL BAYT",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-27T10:00:00.201Z",
      firstTeamCountryCode: "BE",
      secondTeamCountryCode: "MA",
      firstTeamName: "Bélgica",
      secondTeamName: "Marrocos",
      round: "2ª rodada",
      group: "F",
      stadium: "AL THUMAMA",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-27T13:00:00.201Z",
      firstTeamCountryCode: "HR",
      secondTeamCountryCode: "CA",
      firstTeamName: "Croácia",
      secondTeamName: "Canadá",
      round: "2ª rodada",
      group: "F",
      stadium: "INTERNACIONAL KHALIFA",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-28T07:00:00.201Z",
      firstTeamCountryCode: "CM",
      secondTeamCountryCode: "RS",
      firstTeamName: "Camarões",
      secondTeamName: "Sérvia",
      round: "2ª rodada",
      group: "G",
      stadium: "AL JANOUB",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-28T13:00:00.201Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "CH",
      firstTeamName: "Brasil",
      secondTeamName: "Suíça",
      round: "2ª rodada",
      group: "G",
      stadium: "ESTÁDIO 974",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-28T10:00:00.201Z",
      firstTeamCountryCode: "KR",
      secondTeamCountryCode: "GH",
      firstTeamName: "Coréia do Sul",
      secondTeamName: "Gana",
      round: "2ª rodada",
      group: "H",
      stadium: "CIDADE DA EDUCAÇÃO",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-28T16:00:00.201Z",
      firstTeamCountryCode: "PT",
      secondTeamCountryCode: "UY",
      firstTeamName: "Portugal",
      secondTeamName: "Uruguai",
      round: "2ª rodada",
      group: "H",
      stadium: "LUSAIL",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-29T12:00:00.201Z",
      firstTeamCountryCode: "NL",
      secondTeamCountryCode: "QA",
      firstTeamName: "Holanda",
      secondTeamName: "Catar",
      round: "3ª rodada",
      group: "A",
      stadium: "AL BAYT",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-29T12:00:00.201Z",
      firstTeamCountryCode: "EC",
      secondTeamCountryCode: "SN",
      firstTeamName: "Equador",
      secondTeamName: "Senegal",
      round: "3ª rodada",
      group: "A",
      stadium: "INTERNACIONAL KHALIFA",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-29T16:00:00.201Z",
      firstTeamCountryCode: "IR",
      secondTeamCountryCode: "US",
      firstTeamName: "Irã",
      secondTeamName: "Estados Unidos",
      round: "3ª rodada",
      group: "B",
      stadium: "AL THUMAMA",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-29T16:00:00.201Z",
      firstTeamCountryCode: "WL",
      secondTeamCountryCode: "GB",
      firstTeamName: "País de Gales",
      secondTeamName: "Inglaterra",
      round: "3ª rodada",
      group: "B",
      stadium: "AHMAD BIN ALI",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-30T16:00:00.201Z",
      firstTeamCountryCode: "PL",
      secondTeamCountryCode: "AR",
      firstTeamName: "Polônia",
      secondTeamName: "Argentina",
      round: "3ª rodada",
      group: "C",
      stadium: "ESTÁDIO 974",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-30T16:00:00.201Z",
      firstTeamCountryCode: "SA",
      secondTeamCountryCode: "MX",
      firstTeamName: "Arábia Saudita",
      secondTeamName: "México",
      round: "3ª rodada",
      group: "C",
      stadium: "LUSAIL",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-30T12:00:00.201Z",
      firstTeamCountryCode: "TN",
      secondTeamCountryCode: "FR",
      firstTeamName: "Tunísia",
      secondTeamName: "México",
      round: "3ª rodada",
      group: "D",
      stadium: "CIDADE DA EDUCAÇÃO",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-30T12:00:00.201Z",
      firstTeamCountryCode: "AU",
      secondTeamCountryCode: "DK",
      firstTeamName: "Austrália",
      secondTeamName: "Dinamarca",
      round: "3ª rodada",
      group: "D",
      stadium: "AL JANOUB",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-12-01T16:00:00.201Z",
      firstTeamCountryCode: "JP",
      secondTeamCountryCode: "ES",
      firstTeamName: "Japão",
      secondTeamName: "Espanha",
      round: "3ª rodada",
      group: "E",
      stadium: "INTERNACIONAL KHALIFA",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-12-01T16:00:00.201Z",
      firstTeamCountryCode: "CR",
      secondTeamCountryCode: "DE",
      firstTeamName: "Costa Rica",
      secondTeamName: "Alemanha",
      round: "3ª rodada",
      group: "E",
      stadium: "AL BAYT",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-12-01T12:00:00.201Z",
      firstTeamCountryCode: "HR",
      secondTeamCountryCode: "BE",
      firstTeamName: "Croácia",
      secondTeamName: "Bélgica",
      round: "3ª rodada",
      group: "F",
      stadium: "AHMAD BIN ALI",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-12-01T12:00:00.201Z",
      firstTeamCountryCode: "CA",
      secondTeamCountryCode: "MA",
      firstTeamName: "Canadá",
      secondTeamName: "Marrocos",
      round: "3ª rodada",
      group: "F",
      stadium: "AL THUMAMA",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-12-02T16:00:00.201Z",
      firstTeamCountryCode: "CM",
      secondTeamCountryCode: "BR",
      firstTeamName: "Camarões",
      secondTeamName: "Brasil",
      round: "3ª rodada",
      group: "G",
      stadium: "LUSAIL",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-12-02T16:00:00.201Z",
      firstTeamCountryCode: "RS",
      secondTeamCountryCode: "CH",
      firstTeamName: "Sérvia",
      secondTeamName: "Suíça",
      round: "3ª rodada",
      group: "G",
      stadium: "ESTÁDIO 974",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-02T12:00:00.201Z",
      firstTeamCountryCode: "KR",
      secondTeamCountryCode: "PT",
      firstTeamName: "Coréia do Sul",
      secondTeamName: "Portugal",
      round: "3ª rodada",
      group: "H",
      stadium: "CIDADE DA EDUCAÇÃO",
    },
  });
  await prisma.game.create({
    data: {
      date: "2022-11-02T12:00:00.201Z",
      firstTeamCountryCode: "GH",
      secondTeamCountryCode: "UY",
      firstTeamName: "Gana",
      secondTeamName: "Uruguai",
      round: "3ª rodada",
      group: "G",
      stadium: "AL JANOUB",
    },
  });
}
main();
