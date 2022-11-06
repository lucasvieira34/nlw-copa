import { createContext, ReactNode, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { api } from "../api/api";
import { Platform } from "react-native";

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

export interface AuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const androidClientId = "1085087390605-t6uvc7p5gf282bakpmgfakppv5ir9c2q.apps.googleusercontent.com";
  const iosClientId = "1085087390605-c8sf5he8gnbjs50jmd01r2r4iqs7irn8.apps.googleusercontent.com";

  let config: Partial<AuthSession.GoogleAuthRequestConfig> = {};
  //npm i dotenv babel-plugin-inline-dotenv
  if (process.env.SCOPE === "DEV") {
    config = {
      clientId: process.env.CLIENT_ID,
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    };
  } else if (process.env.SCOPE === "PRD") {
    config = {
      clientId: Platform.OS === "android" ? androidClientId : iosClientId,
      androidClientId,
      iosClientId,
    };
  }
  const [request, response, promptAsync] = Google.useAuthRequest({ ...config, scopes: ["profile", "email"] });

  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync({ useProxy: process.env.SCOPE === "DEV" ? true : false });
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true);

      const tokenResponse = await api.post("/users", { access_token });
      api.defaults.headers.common["Authorization"] = `Bearer ${tokenResponse.data.token}`;

      const userInfoReponse = await api.get("/me");
      setUser(userInfoReponse.data.user);
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
