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

const AddProjectForm = ({ setShowModal }) => {
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

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(
        "https://alpha-portal-oliver-fgd6c2abcfg6c8gg.swedencentral-01.azurewebsites.net/api/projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "Y2U5NDBlOTctMjJmYy00MGJmLWE3MDEtYTE1ZGIzOGE1Yjk5",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      if (res.ok) {
        fetchProjects();
        setShowModal(false);
      }
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
        name="name"
        required
      />

      <Select name="clientId" options={clients} required />

      <TextAreaField
        label="Description"
        placeholder="Type Something"
        name="description"
        required
      />

      <div className="date-input-wrapper">
        <InputField
          type="date"
          label={"Start Date"}
          name="startDate"
          required
        />
        <InputField type="date" label={"End Date"} name="endDate" required />
      </div>

      <Select name="userId" options={formattedUsers} required />

      <InputField
        type="text"
        label={"Budget"}
        placeholder="0"
        name="budget"
        required
      />
      <button type="submit" className="btn save-btn">
        Add
      </button>
    </form>
  );
};

export default AddProjectForm;
