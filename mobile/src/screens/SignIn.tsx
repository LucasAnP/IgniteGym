import { Controller, useForm } from "react-hook-form";
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  useToast,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

import { AuthNavigatorroutesProps } from "@routes/auth.routes";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { useState } from "react";

type FormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorroutesProps>();

  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const toast = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppRerror = error instanceof AppError;

      const title = isAppRerror
        ? error.message
        : "Unable to sign in. Try again later.";

      toast.show({
        title,
        placement: "bottom",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="People training"
          resizeMode="contain"
          position="absolute"
        />
        <Center my={24}>
          <LogoSvg />
          <Text color="gray.100" fontSize="sm">
            Train your mind and your body
          </Text>
        </Center>
        <Center>
          <Heading color="gray.100" fontSize="xl" mb="6" fontFamily="heading">
            Access your account
          </Heading>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Inform the e-mail" }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ required: "Inform the password" }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Password"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Button
            title="Access"
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
          />
        </Center>
        <Center mt={24}>
          <Text color={"gray.100"} fontSize={"sm"} mb={3} fontFamily={"body"}>
            Don't have access yet?
          </Text>
          <Button
            title="Create Account"
            variant={"outline"}
            onPress={handleNewAccount}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}
