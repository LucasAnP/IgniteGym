import AsyncStorage from "@react-native-async-storage/async-storage";

import { AUTH_TOKEN_STORAGE } from "@storage/storageConfig";

export async function storageAuthSaveToken(token: string) {
  await AsyncStorage.setItem(AUTH_TOKEN_STORAGE, token);
}
