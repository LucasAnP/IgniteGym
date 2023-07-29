import { VStack, Image, Text, Center, Heading, ScrollView } from "native-base";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Inform the name."),
  email: yup
    .string()
    .required("Inform the email.")
    .email("Invalid E-mail Address."),
  password: yup
    .string()
    .required("Inform the password.")
    .min(6, "The password may have 6 digits."),
  password_confirm: yup
    .string()
    .required("Confirm the password.")
    .oneOf(
      [yup.ref("password")],
      "The confirmation of the password is required."
    ),
});

export function SignUp() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp({
    name,
    email,
    password,
    password_confirm,
  }: FormDataProps) {
    const response = await fetch("http://192.168.100.69:3333/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();

    console.log(data);
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
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
            Create your account
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Name"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: "This field is required.",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            rules={{
              required: "This field is required.",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirm password"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Create and access"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          title="Back to Login"
          variant={"outline"}
          mt={12}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  );
}
