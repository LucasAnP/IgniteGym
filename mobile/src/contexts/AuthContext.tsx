import { ReactNode, createContext } from "react";

import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
};

type AuthContextProviderProps = {
  children: ReactNode;
};
export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
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
      {children}
    </AuthContext.Provider>
  );
}
