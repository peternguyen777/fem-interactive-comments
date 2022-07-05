import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./ModalDelete.module.css";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../store/modal";

export default function ModalDelete() {
  const [isBrowser, setIsBrowser] = useState(false);
  const showModal = useSelector((state) => state.showModal);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e) => {
    e.preventDefault();
    dispatch(modalActions.modalOff());
  };

  const modalContent = showModal ? (
    <div className='absolute top-0 left-0 flex h-full w-full items-center justify-center p-4'>
      <div className='z-20 w-full rounded-lg bg-white px-7 py-6'>
        <h2>Delete comment</h2>
        <h4 className='mt-4'>
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </h4>
        <div className='mt-4 flex justify-between'>
          <button
            className='h-[48px] w-[138px] rounded-lg bg-grayblue transition duration-100 hover:opacity-50'
            onClick={handleClose}
          >
            <h5 className='py-[12px] text-base text-white'>NO, CANCEL</h5>
          </button>
          <button
            className='h-[48px] w-[138px] rounded-lg bg-softred transition duration-100 hover:opacity-50'
            onClick={handleClose}
          >
            <h5 className='py-[12px] text-base text-white'>YES, DELETE</h5>
          </button>
        </div>
      </div>
    </div>
  ) : null;

  const underlayContent = showModal ? (
    <div
      className='absolute top-0 left-0 z-10 flex h-screen w-full bg-black opacity-50'
      onClick={handleClose}
    ></div>
  ) : null;

  if (isBrowser) {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          modalContent,
          document.getElementById("modal-root")
        )}
        {ReactDOM.createPortal(
          underlayContent,
          document.getElementById("underlay-root")
        )}
      </React.Fragment>
    );
  } else {
    return null;
  }
}
