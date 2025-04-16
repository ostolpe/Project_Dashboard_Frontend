import React, { useState, createContext, useEffect } from "react";

export const StatusContext = createContext();

export function StatusProvider({ children }) {
  const apiEndpoint = "https://localhost:7171/api/Statuses";
  const [status, setstatus] = useState([]);

  const fetchstatus = async () => {
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
        setstatus(data);
      } else {
        console.error("Failed to fetch status");
      }
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  useEffect(() => {
    fetchstatus();
  }, []);

  return (
    <StatusContext.Provider value={{ status, fetchstatus }}>
      {children}
    </StatusContext.Provider>
  );
}
