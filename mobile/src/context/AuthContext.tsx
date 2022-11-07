import { createContext, ReactNode, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
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
  signIn: (value: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

//npm i dotenv babel-plugin-inline-dotenv
export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [loginProvider, setLoginProvider] = useState("");

  let googleConfig: Partial<AuthSession.GoogleAuthRequestConfig> = {};
  let facebookConfig: Partial<AuthSession.FacebookAuthRequestConfig> = {};
  if (process.env.SCOPE === "DEV") {
    googleConfig = {
      clientId: process.env.GOOGLE_WEB_CLIENT_ID,
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    };
    facebookConfig = {
      expoClientId: process.env.FACEBOOK_CLIENT_ID,
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    };
  } else if (process.env.SCOPE === "PRD") {
    googleConfig = {
      clientId: Platform.OS === "android" ? process.env.GOOGLE_ANDROID_CLIENT_ID : process.env.GOOGLE_IOS_CLIENT_ID,
      androidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
      iosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
    };
    facebookConfig = {
      clientId: process.env.FACEBOOK_CLIENT_ID,
    };
  }
  const googleAuthResponse = Google.useAuthRequest({ ...googleConfig, scopes: ["profile", "email"] });
  const facebookAuthResponse = Facebook.useAuthRequest({
    ...facebookConfig,
    scopes: ["public_profile", "email"],
    responseType: AuthSession.ResponseType.Token,
  });

  async function signIn(provider: string) {
    setLoginProvider(provider);
    try {
      setIsUserLoading(true);
      if (provider === "GOOGLE") {
        console.log("login via google");
        const [request, response, promptAsync] = googleAuthResponse;
        await promptAsync({ useProxy: process.env.SCOPE === "DEV" ? true : false });
      } else if (provider === "FACEBOOK") {
        console.log("login via facebook");
        const [request, response, promptAsync] = facebookAuthResponse;
        await promptAsync({ useProxy: process.env.SCOPE === "DEV" ? true : false });
      }
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithProvider(access_token: string) {
    try {
      setIsUserLoading(true);

      const tokenResponse = await api.post("/users", { access_token, loginProvider });
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
    if (loginProvider === "GOOGLE") {
      if (googleAuthResponse[1]?.type === "success" && googleAuthResponse[1].authentication?.accessToken) {
        signInWithProvider(googleAuthResponse[1].authentication.accessToken);
      }
    } else if (loginProvider === "FACEBOOK") {
      if (facebookAuthResponse[1]?.type === "success" && facebookAuthResponse[1].authentication.accessToken) {
        signInWithProvider(facebookAuthResponse[1].authentication.accessToken);
      }
    }
  }, [googleAuthResponse[1], facebookAuthResponse[1]]);

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
