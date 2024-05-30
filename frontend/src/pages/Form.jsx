import React, { useState } from "react";
import { createProject } from "../services/user.services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Form = () => {
  // eslint-disable-next-line no-unused-vars
  const [details, setDetails] = useState({
    name: "",
    description: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProject(details);
      if (res?.status === false) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div className="container mt-5">
          <h3 className="text-center">Add a new project</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="Project name"
                name="name"
                value={details?.name}
                onChange={handleChange}
              />
              <textarea
                name="description"
                id="description"
                className="form-control mt-2"
                placeholder="Project description"
                rows={4}
                value={details?.description}
                onChange={handleChange}
              ></textarea>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Enter your project role"
                name="role"
                value={details?.role}
                onChange={handleChange}
              />
              <button className="btn btn-primary mt-2 w-100" type="submit">
                Add Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
