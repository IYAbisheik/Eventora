import React, {createContext, useState, ReactNode} from 'react';

type AuthContextType = {
  splash: boolean;
  setSplash: (value: boolean) => void;
  loggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
};

export const Auth = createContext<AuthContextType>({
  splash: true,
  setSplash: () => {},
  loggedIn: false,
  setLoggedIn: () => {},
});

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [splash, setSplash] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Auth.Provider value={{splash, setSplash, loggedIn, setLoggedIn}}>
      {children}
    </Auth.Provider>
  );
};