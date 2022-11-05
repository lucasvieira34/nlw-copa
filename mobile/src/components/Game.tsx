import { Button, HStack, Text, useTheme, VStack } from "native-base";
import { X, Check } from "phosphor-react-native";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";

import { Team } from "./Team";

import countries from "i18n-iso-countries";

countries.registerLocale(require("i18n-iso-countries/langs/pt.json"));

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
  id: string;
  date: string;
  round: string;
  group: string;
  stadium: string;
  firstTeamName: string;
  secondTeamName: string;
  firstTeamCountryCode: string;
  secondTeamCountryCode: string;
  guess: null | GuessProps;
}

interface Props {
  data: GameProps;
  onGuessConfirm: () => void;
  firstTeamPoints: string;
  secondTeamPoints: string;
  setFirstTeamPoints: (value: string) => void;
  setSecondTeamPoints: (value: string) => void;
}

export function Game({
  data,
  firstTeamPoints,
  secondTeamPoints,
  setFirstTeamPoints,
  setSecondTeamPoints,
  onGuessConfirm,
}: Props) {
  const { colors, sizes } = useTheme();

  const dateFormatted = dayjs(data.date).locale(ptBR).format("DD [de] MMMM [de] YYYY [-] HH:00[h]");

  return (
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <Text color="gray.100" fontFamily="heading" fontSize="sm">
        {/* {countries.getName(data.firstTeamCountryCode, "pt")} vs. {countries.getName(data.secondTeamCountryCode, "pt")} */}
        {data.firstTeamName} x {data.secondTeamName}
      </Text>

      <Text color="gray.200" fontSize="xs">
        Grupo {data.group} - {data.round}
      </Text>

      <Text color="gray.200" fontSize="xs">
        {dateFormatted}
      </Text>

      <HStack mt={4} w="full" justifyContent="space-between" alignItems="center">
        <Team
          code={data.firstTeamCountryCode}
          position="right"
          onChangeText={setFirstTeamPoints}
          teamPoints={firstTeamPoints}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secondTeamCountryCode}
          position="left"
          onChangeText={setSecondTeamPoints}
          teamPoints={secondTeamPoints}
        />
      </HStack>

      {!data.guess && (
        <Button
          size="xs"
          w="full"
          bgColor="green.500"
          mt={4}
          onPress={onGuessConfirm}
          _pressed={{ bgColor: "green.900" }}
        >
          <HStack alignItems="center">
            <Text color="white" fontSize="xs" fontFamily="heading" mr={3}>
              CONFIRMAR PALPITE
            </Text>

            <Check color={colors.white} size={sizes[4]} />
          </HStack>
        </Button>
      )}
    </VStack>
  );
}
