import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { getProject, editProject } from "../services/user.services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 3,
};

export const EditModal = ({ open, setOpen, id }) => {
  const [project, setProject] = useState();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const res = await getProject(id);
          if (res) {
            setProject(res.project);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await editProject(id, project);
      if (res?.status === false) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        setOpen(false);
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
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <h3>Edit Project</h3>
              <hr />
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="form-label">
                    Project Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={project?.name}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    value={project?.description}
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="form-label">
                    Role
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="role"
                    name="role"
                    value={project?.role}
                    required
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3">
                  Submit
                </button>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
};
