import React, { useState, createContext, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const apiEndpoint = "https://localhost:7171/api/Users";
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
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
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
}
