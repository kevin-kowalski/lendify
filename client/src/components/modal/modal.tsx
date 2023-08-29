import { useContext, useEffect } from "react";
import { ModalContext, ModalContextProps } from "../../contexts/ModalContext";
import { getUser } from "../../service/apiService";

export default function Modal () {

  const { modalData, showModal, setShowModal } = useContext<ModalContextProps>(ModalContext);

  // Check if the user is new, and in that case, show the modal
  useEffect(() => {
    getUser()
      .then((user) => {
        if (user.newUser) setShowModal(true);
      })
      .catch((error) => console.log(error));
  }, []);

  /* Render Component */

  return (<>
    {showModal && (
    <div className="modal-wrapper">
      <div className="modal">
        <h1>{modalData.title}</h1>
        <div className="modal-text" dangerouslySetInnerHTML={{ __html: modalData.text }}></div>
        <button className="button styled full large" onClick={modalData.action}>{modalData.actionText}</button>
      </div>
    </div>
    )}
  </>);
}