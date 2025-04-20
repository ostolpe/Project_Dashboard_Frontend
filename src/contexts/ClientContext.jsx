import React, { useState, createContext, useEffect } from "react";

export const ClientContext = createContext();

export function ClientProvider({ children }) {
  const apiEndpoint =
    "https://alpha-portal-oliver-fgd6c2abcfg6c8gg.swedencentral-01.azurewebsites.net/api/Clients";
  // const apiEndpoint =
  //   "https://alpha-portal-webbapp.azurewebsites.net/projects/clients";
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
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
        setClients(data);
      } else {
        console.error("Failed to fetch clients");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <ClientContext.Provider value={{ clients, fetchClients }}>
      {children}
    </ClientContext.Provider>
  );
}
