import { useState } from "react";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base";
import { Alert, TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE = 33;

export function Profile() {
  const [userPhoto, setUserPhoto] = useState("https://github.com/lucasAnP.png");
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const toast = useToast();

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true);
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (!photoSelected.canceled && photoSelected?.assets[0]?.uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected?.assets[0]?.uri
        );
        if (photoInfo?.size && photoInfo?.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Very large image, try another.",
            placement: "top",
            bgColor: "red.500",
          });
        }
        setUserPhoto(photoSelected.assets[0].uri);
      }
      return;
    } catch (error) {
      console.log(error);
    } finally {
      setPhotoIsLoading(false);
    }
  }

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
              source={{ uri: userPhoto }}
              alt="User picture"
              size={PHOTO_SIZE}
            />
          )}
          <TouchableOpacity onPress={handleUserPhotoSelect}>
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
          <Heading
            color={"gray.200"}
            fontSize={"md"}
            mb={2}
            fontFamily={"heading"}
          >
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
