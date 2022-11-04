import { HStack } from "native-base";
import CountryFlag from "react-native-country-flag";

import { Input } from "./Input";

interface Props {
  code: string;
  position: "left" | "right";
  teamPoints: string;
  onChangeText: (value: string) => void;
}

export function Team({ code, position, teamPoints, onChangeText }: Props) {
  return (
    <HStack alignItems="center">
      {position === "left" && <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />}

      <Input
        w={12}
        h={12}
        textAlign="center"
        fontSize="xl"
        fontWeight="bold"
        keyboardType="numeric"
        onChangeText={onChangeText}
        defaultValue={teamPoints}
        isDisabled={teamPoints ? true : false}
      />

      {position === "right" && <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />}
    </HStack>
  );
}
