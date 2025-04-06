import React from "react";
import { useEffect, useState } from "react";
import Modal from "../partials/components/modal/Modal";

const Members = () => {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setShowModal(false);
  }, []);

  return (
    <div id="members">
      <div className="page-header">
        <h1 className="h2">Team Members</h1>
        <Modal
          buttonIcon={"fa-plus"}
          buttonText="Add Member"
          open={showModal}
          setShowModal={setShowModal}
          heading="Add Member"
        >
          <code>Add Member form</code>
        </Modal>
      </div>
    </div>
  );
};

export default Members;
