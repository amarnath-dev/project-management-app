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

  const handleSubmit = async () => {
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

  return (
    <>
      <ToastContainer />
      <div>
        <div className="container mt-5">
          <h3 className="text-center">My Projects</h3>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Add new Project"
            />
            <textarea
              name=""
              id=""
              className="form-control mt-2"
              placeholder="Project description"
              rows={4}
            ></textarea>
            <button className="btn btn-primary mt-2 w-100" onClick={handleSubmit}>Add Project</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
