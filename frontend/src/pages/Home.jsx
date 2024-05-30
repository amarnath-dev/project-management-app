import React, { useEffect, useState } from "react";
import { getProjects } from "../services/user.services";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Modal } from "../../../frontend/src/components/Modal";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);

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

  const handleView = () => {
    setOpen(true);
  };

  return (
    <>
      <Modal open={open} setOpen={setOpen} />
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
          <button className="btn btn-primary mt-2 w-100">Add Project</button>
        </div>
        <ul className="list-group">
          {projects.map((obj, index) => {
            return (
              <div key={index} className="border p-2 rounded bg-light">
                <h4 className="text-center">{obj.name}</h4>
                <div className="d-flex gap-5 justify-content-center mt-3">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-primary"
                    onClick={handleView}
                  >
                    <FaEye />
                  </button>
                  <button type="button" class="btn btn-sm btn-outline-primary">
                    <FaEdit />
                  </button>
                  <button type="button" class="btn btn-sm btn-outline-primary">
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Home;
