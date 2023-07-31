import { StatusBar, View, LogBox } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { AuthContext } from "@contexts/AuthContext";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";
import { Routes } from "@routes/index";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider isSSR theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContext.Provider
        value={{
          user: {
            id: "1",
            name: "Lucas Antonio",
            email: "lucas.antonio@dcx.ufpb.br",
            avatar: "lucas.png",
          },
        }}
      >
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
