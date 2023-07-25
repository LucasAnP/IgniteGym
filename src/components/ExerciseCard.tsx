import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  title: string;
};

export function ExerciseCard({ title, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg={"gray.500"}
        alignItems={"center"}
        padding={2}
        pr={4}
        rounded={"md"}
        mb={3}
      >
        <Image
          source={{
            uri: "https://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg",
          }}
          alt="Exercise image"
          w={16}
          h={16}
          rounded={"md"}
          mr={4}
          resizeMode={"center"}
        />
        <VStack flex={1}>
          <Heading fontSize={"lg"} color={"white"}>
            {title}
          </Heading>
          <Text fontSize={"sm"} color={"gray.200"} mt={1} numberOfLines={2}>
            3 series x 12 repetitions
          </Text>
        </VStack>

        <Icon as={Entypo} name="chevron-thin-right" color={"gray.300"} />
      </HStack>
    </TouchableOpacity>
  );
}
