import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface ProfileProps {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  company: string;
  followers: number;
}

export interface ProfileProviderProps {
  children: ReactNode;
}

interface ProfileContextType {
  profile: ProfileProps;
}

export const ProfileContext = createContext({} as ProfileContextType);

export function ProfileProvider({ children }: ProfileProviderProps) {
  const [profile, setProfile] = useState({} as ProfileProps);

  useEffect(() => {
    async function fetchProfile() {
      const profileResponse = await api.get("/users/maykbrito");

      setProfile(profileResponse.data);
    }

    fetchProfile();
  }, []);
  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
}
