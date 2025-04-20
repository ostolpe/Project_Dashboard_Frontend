import React, { useState, useEffect } from "react";
import ProjectsList from "../partials/components/projectsList/ProjectsList";
import Modal from "../partials/components/modal/Modal";
import AddProjectForm from "../partials/components/form/AddProjectForm/AddProjectForm";

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <div id="projects">
        <div className="page-header">
          <h1 className="h2">Projects</h1>
          <Modal
            buttonIcon={"fa-plus"}
            buttonText="Add Project"
            open={showModal}
            setShowModal={setShowModal}
            heading="Add Project"
          >
            <AddProjectForm setShowModal={setShowModal} />
          </Modal>
        </div>
        <ProjectsList />
      </div>
    </>
  );
};

export default Projects;
