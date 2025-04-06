import React, { useContext, useState } from "react";
import { ProjectContext } from "../../../contexts";
import ProjectsCard from "../projectsCard/ProjectsCard";

import "./ProjectsList.css";

const ProjectsList = () => {
  const { projects, fetchProjects } = useContext(ProjectContext);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);

  const handleDropdownToggle = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="projects-list">
      <div className="projects-list-sort-btns">
        <button
          className={[
            "projects-list-sort-btn",
            !showCompleted && "projects-list-sort-btn--active",
          ].join(" ")}
          onClick={() => setShowCompleted(false)}
        >
          ALL <span>[{projects.length}]</span>
        </button>
        <button
          className={[
            "projects-list-sort-btn",
            showCompleted && "projects-list-sort-btn--active",
          ].join(" ")}
          onClick={() => setShowCompleted(true)}
        >
          COMPLETED{" "}
          <span>
            [
            {
              projects.filter((project) => project.status.name === "COMPLETED")
                .length
            }
            ]
          </span>
        </button>
      </div>
      <div className="projects-list-container">
        {projects.map((project) => {
          if (project.status.name === "STARTED" && showCompleted) {
            return <React.Fragment key={project.id} />;
          }
          return (
            <ProjectsCard
              isDropdownOpen={openDropdownId === project.id}
              onDropdownToggle={() => handleDropdownToggle(project.id)}
              onDelete={fetchProjects}
              key={project.id}
              project={project}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProjectsList;
