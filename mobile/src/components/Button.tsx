import { Button as ButtonNativeBase, IButtonProps, Text } from "native-base";

interface Props extends IButtonProps {
  title: string;
  type?: "PRIMARY" | "SECONDARY" | "TERTIARY";
}

export function Button({ title, type = "PRIMARY", ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      fontSize="md"
      textTransform="uppercase"
      bg={type === "SECONDARY" ? "red.500" : type === "PRIMARY" ? "yellow.500" : "blue.400"}
      _pressed={{
        bg: type === "SECONDARY" ? "red.400" : type === "PRIMARY" ? "yellow.600" : "blue.500",
      }}
      _loading={{
        _spinner: { color: "black" },
      }}
      {...rest}
    >
      <Text fontSize="sm" fontFamily="heading" color={type === "SECONDARY" || type === "TERTIARY" ? "white" : "black"}>
        {title}
      </Text>
    </ButtonNativeBase>
  );
}
