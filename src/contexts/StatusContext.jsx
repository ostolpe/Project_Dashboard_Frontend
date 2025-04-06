import React, { useState, createContext, useEffect } from "react";

export const StatusContext = createContext();

export function StatusProvider({ children }) {
  const apiEndpoint = "https://localhost:7025/api/Statuses";
  const [status, setstatus] = useState([]);

  const fetchstatus = async () => {
    try {
      const res = await fetch(apiEndpoint);
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
