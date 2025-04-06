import React from "react";
import { useEffect, useState } from "react";
import Modal from "../partials/components/modal/Modal";

const Clients = () => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(false);
  }, []);

  return (
    <div id="clients">
      <div className="page-header">
        <h1 className="h2">Clients</h1>
        <Modal
          buttonIcon={"fa-plus"}
          buttonText="Add Client"
          open={showModal}
          setShowModal={setShowModal}
          heading="Add Client"
        >
          <code>Add Client form</code>
        </Modal>
      </div>
    </div>
  );
};

export default Clients;
