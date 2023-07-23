import { HStack, VStack, Heading, Text, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity } from "react-native";

export function HomeHeader() {
  return (
    <HStack bg={"gray.600"} pt={16} pb={5} px={8} alignItems={"center"}>
      <UserPhoto
        source={{ uri: "https://avatars.githubusercontent.com/u/30278242?v=4" }}
        alt="User image"
        size={16}
        mr={4}
      />
      <VStack flex={1}>
        <Text color={"gray.100"} fontSize={"md"}>
          Hello,
        </Text>

        <Heading color={"gray.100"} fontSize={"md"}>
          Lucas
        </Heading>
      </VStack>
      <TouchableOpacity>
        <Icon as={MaterialIcons} name={"logout"} color={"gray.200"} size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
