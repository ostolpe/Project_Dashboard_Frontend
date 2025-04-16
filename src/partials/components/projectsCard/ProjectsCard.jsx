import React, { useEffect, useState, useRef } from "react";
import { ClientProvider, UserProvider } from "../../../contexts";
import ProjectLogo from "../../../assets/images/project-logo.svg";
import Modal from "../modal/Modal";
import Dropdown from "../dropdown/dropdown";
import EditProjectForm from "../form/EditProjectForm/EditProjectForm";
import "./ProjectCard.css";

const ProjectsCard = ({
  project,
  onDelete,
  isDropdownOpen,
  onDropdownToggle,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const prevShowModal = useRef(false);

  useEffect(() => {
    if (prevShowModal.current && !showModal) {
      onDropdownToggle(false);
    }
    prevShowModal.current = showModal;
  }, [showModal]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://localhost:7171/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "Y2U5NDBlOTctMjJmYy00MGJmLWE3MDEtYTE1ZGIzOGE1Yjk5",
        },
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      onDelete?.(); // null check if function doesn't exist
    } catch (err) {
      console.error("Request failed", err);
    }
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <img src={ProjectLogo} alt="" />
        <div className="card-title">
          <h6>{project.name}</h6>
          <p>{project.client.name}</p>
        </div>
        <Dropdown
          onToggle={() => onDropdownToggle(!isDropdownOpen)}
          ariaLabel={`Edit ${project.projectName}`}
          open={isDropdownOpen}
          display="right"
        >
          <div className="projects-card-dropdown">
            <Modal
              buttonText="Edit"
              buttonIcon={"fa-pen-to-square"}
              buttonClassName={"btn-neutral"}
              heading="Edit Project"
              open={showModal}
              setShowModal={setShowModal}
            >
              <ClientProvider>
                <UserProvider>
                  <EditProjectForm
                    project={project}
                    setShowModal={setShowModal}
                  />
                </UserProvider>
              </ClientProvider>
            </Modal>

            <Modal
              buttonText=" Delete Project"
              buttonIcon={"fa-solid fa-trash"}
              buttonClassName={"btn-delete"}
              heading="Delete Project"
              open={showDeleteModal}
              setShowModal={setShowDeleteModal}
            >
              <div>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(project.id)}
                >
                  <i className="fa-solid fa-trash"></i>
                  Confirm
                </button>
                <button
                  className="btn btn-neutral"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </Modal>
          </div>
        </Dropdown>
      </div>
      <p>{project.description}</p>
      <p>{project.status.name}</p>
    </div>
  );
};

export default ProjectsCard;
