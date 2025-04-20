import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const apiEndpoint =
    "https://alpha-portal-oliver-fgd6c2abcfg6c8gg.swedencentral-01.azurewebsites.net/api/auth";
  const defaultValues = {
    accessToken: null,
    role: "Admin",
    isAuthenticated: true,
    loading: false,
  };
  const [auth, setAuth] = useState(defaultValues);

  const fetchAuthData = async () => {
    setAuth({ ...defaultValues, loading: false });

    try {
      const res = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "Y2U5NDBlOTctMjJmYy00MGJmLWE3MDEtYTE1ZGIzOGE1Yjk5",
        },
      });

      if (res.ok) {
        const data = await res.json();
        setAuth({
          accessToken: data.accessToken,
          role: data.role,
          isAuthenticated: true,
          loading: false,
        });
      }
    } catch (error) {
      setAuth(defaultValues);
    }
  };

  // useEffect(() => {
  //   fetchAuthData();
  // }, []);

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
};
