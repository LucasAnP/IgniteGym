import { useContext } from "react";
import { useTheme, Box } from "native-base";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { AuthContext } from "@contexts/AuthContext";
import { useAuth } from "@hooks/useAuth";

export function Routes() {
  const { colors } = useTheme();

  const { user } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        <AuthRoutes />
        {/* <AppRoutes /> */}
      </NavigationContainer>
    </Box>
  );
}
