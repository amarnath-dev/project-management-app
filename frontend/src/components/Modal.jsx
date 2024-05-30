import React from "react";

export const Modal = ({ open, setOpen }) => {
  function closeModal() {
    setOpen(false);
  }

  return (
    <div>
      <button onClick={open}>Open Modal</button>
      <Modal
        isOpen={open}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );
};
