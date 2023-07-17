import { IButtonProps, Button as NativeBaseButton, Text } from "native-base";

type Props = IButtonProps & {
  title: string;
};

export function Button({ title, ...rest }: Props) {
  return (
    <NativeBaseButton
      w="full"
      h={14}
      bg={"green.700"}
      rounded={"sm"}
      _pressed={{
        bg: "green.500",
      }}
      {...rest}
    >
      <Text color={"white"} fontFamily={"heading"} fontSize={"sm"}>
        {title}
      </Text>
    </NativeBaseButton>
  );
}
