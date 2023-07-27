import { useState } from "react";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  return (
    <VStack flex={1}>
      <ScreenHeader title={"Profile"} />
      <ScrollView _contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={6} px={10}>
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded={"full"}
              startColor={"gray.500"}
              endColor={"gray.400"}
            />
          ) : (
            <UserPhoto
              source={{ uri: "https://github.com/lucasAnP.png" }}
              alt="User picture"
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity>
            <Text
              color={"green.500"}
              fontWeight={"bold"}
              fontSize={"md"}
              mt={2}
              mb={8}
            >
              Change photo
            </Text>
          </TouchableOpacity>
          <Input placeholder="Name" bg={"gray.600"} />
          <Input
            isDisabled
            bg={"gray.600"}
            placeholder="E-mail"
            value="lucas.antonio@dcx.ufpb.br"
          />
        </Center>
        <VStack px={10} mt={12} mb={9}>
          <Heading color={"gray.200"} fontSize={"md"} mb={2}>
            Change password
          </Heading>
          <Input bg={"gray.600"} placeholder="Old password" secureTextEntry />
          <Input bg={"gray.600"} placeholder="New password" secureTextEntry />
          <Input
            bg={"gray.600"}
            placeholder="Confirm new password"
            secureTextEntry
          />
          <Button title="Update" mt={4} />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
