import React, { useContext } from "react";
import {
  ClientContext,
  UserContext,
  ProjectContext,
} from "../../../../contexts";
import InputField from "../InputField/InputField";
import TextAreaField from "../TextAreaField/TextAreaField";
import Select from "../Select/Select";

import "react-datepicker/dist/react-datepicker.css";

const AddProjectForm = ({}) => {
  const { clients } = useContext(ClientContext);
  const { users } = useContext(UserContext);
  const { fetchProjects } = useContext(ProjectContext);

  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    console.log("Payload:", payload);

    try {
      const res = await fetch("https://localhost:7025/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      if (res.ok) fetchProjects();
    } catch (err) {
      console.error("Request failed", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="upload-img-wrapper">
        <div className="upload-img-container">
          <i className="fa-duotone fa-solid fa-circle-camera fa-3x"></i>
        </div>
      </div>

      <InputField
        type="text"
        placeholder="Enter Project Name"
        label={"Project Name"}
        name="projectName"
      />

      <Select name="clientId" options={clients} />

      <TextAreaField
        label="Description"
        placeholder="Type Something"
        name="description"
      />

      <div className="date-input-wrapper">
        <InputField type="date" label={"Start Date"} name="startDate" />
        <InputField type="date" label={"End Date"} name="endDate" />
      </div>

      <Select name="userId" options={formattedUsers} />

      <InputField type="text" label={"Budget"} placeholder="0" name="budget" />
      <button type="submit" className="btn save-btn">
        Add
      </button>
    </form>
  );
};

export default AddProjectForm;
