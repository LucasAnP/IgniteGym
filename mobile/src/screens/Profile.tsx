import { useState } from "react";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as yup from "yup";
import {
  Center,
  Heading,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useAuth } from "@hooks/useAuth";

const PHOTO_SIZE = 33;

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  old_password: string;
  confirm_password: string;
};

const profileSchema = yup.object({
  name: yup.string().required("Inform the name."),
  password: yup
    .string()
    .min(6, "The password must be at least 6 characters long.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password")], "The passwords didn't match."),
});

export function Profile() {
  const [userPhoto, setUserPhoto] = useState("https://github.com/lucasAnP.png");
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const toast = useToast();
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

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
        if (photoInfo.exists && photoInfo?.size / 1024 / 1024 > 5) {
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

  async function handleProfileUpdate(data: FormDataProps) {
    console.log(data);
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

          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <Input
                bg={"gray.600"}
                placeholder="Name"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                bg={"gray.600"}
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                isDisabled
              />
            )}
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
          <Controller
            control={control}
            name="old_password"
            render={({ field: { value, onChange } }) => (
              <Input
                bg={"gray.600"}
                placeholder="Old password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange } }) => (
              <Input
                bg={"gray.600"}
                placeholder="New password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { value, onChange } }) => (
              <Input
                bg={"gray.600"}
                placeholder="Confirm new password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.confirm_password?.message}
              />
            )}
          />

          <Button
            title="Update"
            mt={4}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </VStack>
      </ScrollView>
    </VStack>
  );
}
