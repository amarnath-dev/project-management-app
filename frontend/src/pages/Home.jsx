import React, { useEffect, useState } from "react";
import { getProjects } from "../services/user.services";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { DetailsModal } from "../components/DetailsModal";
import { EditModal } from "../components/EditModal";
import { useNavigate } from "react-router-dom";
import { deleteProject } from "../services/user.services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const [id, setId] = useState();
  const navigate = useNavigate();

  const handleView = (id) => {
    setId(id);
    setOpen(true);
  };

  const handleEdit = (id) => {
    setId(id);
    setEdit(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteProject(id);
      if (res?.status === false) {
        toast.error(res.message);
      } else {
        const updatedProjects = projects.filter(
          (project) => project._id !== id
        );
        setProjects(updatedProjects);
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getProjects();
        if (res.projects.length > 0) {
          setProjects(res?.projects);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <ToastContainer />
      <DetailsModal open={open} setOpen={setOpen} id={id} />
      <EditModal open={edit} setOpen={setEdit} id={id} />
      <div className="container mt-5">
        <div className="">
          <h3 className="text-center">My Projects</h3>
          <div className="d-flex flex-row-reverse">
            <button
              type="button"
              class="btn btn-sm btn-primary"
              onClick={() => navigate("/new")}
            >
              Add new Project
            </button>
          </div>
        </div>
        <hr />
        {projects.length === 0 ? (
          <>
            <h1 className="text-center">No projects available</h1>
            <h6 className="text-center">Create a new Project</h6>
          </>
        ) : (
          <>
            <ul className="list-group">
              {projects.map((obj, index) => {
                return (
                  <div key={index} className="border p-2 rounded bg-light mt-2">
                    <h4 className="text-center">{obj.name}</h4>
                    <div className="d-flex gap-5 justify-content-center mt-3">
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-primary"
                        onClick={() => handleView(obj?._id)}
                      >
                        <FaEye />
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-primary"
                        onClick={() => handleEdit(obj?._id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-outline-primary"
                        onClick={() => handleDelete(obj?._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Home;
