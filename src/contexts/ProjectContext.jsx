import React, { useState, createContext, useEffect } from "react";

export const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const apiEndpoint = "https://localhost:7025/api/projects";
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(apiEndpoint);
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
        console.log("Projects fetched successfully:", data);
      } else {
        console.error("Failed to fetch projects");
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, fetchProjects }}>
      {children}
    </ProjectContext.Provider>
  );
}
