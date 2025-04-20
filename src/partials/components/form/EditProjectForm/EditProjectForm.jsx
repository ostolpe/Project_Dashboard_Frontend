import React, { useContext, useState } from "react";
import { ClientContext, UserContext } from "../../../../contexts";
import InputField from "../InputField/InputField";
import TextAreaField from "../TextAreaField/TextAreaField";
import "./EditProjectForm.css";
import { StatusContext } from "../../../../contexts/StatusContext";
import { ProjectContext } from "../../../../contexts/ProjectContext";
import Select from "../Select/Select";

const EditProjectForm = ({ project, setShowModal }) => {
  const { clients } = useContext(ClientContext);
  const { users } = useContext(UserContext);
  const { status } = useContext(StatusContext);
  const { fetchProjects } = useContext(ProjectContext);

  const formattedUsers = users.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
  }));

  const [selectedValues, setSelectedValues] = useState({
    clientId: project.client.id,
    userId: project.user ? project.user.id : "",
    statusId: project.status.id,
  });
  const startDate = new Date(project.startDate);
  const formattedStartDate = startDate.toISOString().split("T")[0];
  const endDate = new Date(project.startDate);
  const formattedEndDate = endDate.toISOString().split("T")[0];

  const formattedBudget = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(project.budget);

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSelectedValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      const res = await fetch("https://localhost:7171/api/projects", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "Y2U5NDBlOTctMjJmYy00MGJmLWE3MDEtYTE1ZGIzOGE1Yjk5",
        },
        body: JSON.stringify(payload),
      });

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
        value={project.name}
        label={"Project Name"}
        name="name"
        required
      />

      <Select
        name="clientId"
        label="Client Name"
        value={selectedValues.clientId}
        options={clients}
        setSelectedValues={setSelectedValues}
        required
      />
      <TextAreaField
        name="description"
        value={project.description}
        label="Description"
        required
      />
      <div className="date-input-wrapper">
        <InputField
          name="startDate"
          type="date"
          value={formattedStartDate}
          label="Start Date"
          required
        />
        <InputField
          name="endDate"
          type="date"
          value={formattedEndDate}
          label={"End Date"}
          required
        />
      </div>

      <Select
        name="userId"
        label="Project Owner"
        value={selectedValues.userId}
        options={formattedUsers}
        setSelectedValues={setSelectedValues}
        required
      />

      <InputField
        name="budget"
        type="text"
        value={project.budget}
        label={"Budget"}
        required
      />

      <Select
        name="statusId"
        label={"Project Status"}
        value={selectedValues.statusId}
        options={status}
        setSelectedValues={setSelectedValues}
        required
      />

      <InputField name="id" type="hidden" value={project.id} />
      <InputField name="image" type="hidden" value="" />

      <button type="submit" className="btn save-btn">
        Edit
      </button>
    </form>
  );
};

export default EditProjectForm;
