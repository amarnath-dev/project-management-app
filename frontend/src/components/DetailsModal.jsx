import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { getProject } from "../services/user.services";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

export const DetailsModal = ({ open, setOpen, id }) => {
  const [project, setProject] = useState();

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const res = await getProject(id);
          if (res) {
            console.log(res.project);
            setProject(res.project);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Project Informations
            </Typography>
            <hr />
            <Typography id="modal-modal-description">
              <span>
                Name: <strong>{project?.name}</strong>{" "}
              </span>
            </Typography>
            <div className="mt-2">
              <span>
                Description: <strong>{project?.description}</strong>{" "}
              </span>
            </div>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              <span>
                Role: <strong>{project?.role}</strong>{" "}
              </span>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};
