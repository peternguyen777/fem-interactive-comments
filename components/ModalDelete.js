import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../store/modal";

export default function ModalDelete(props) {
  const [isBrowser, setIsBrowser] = useState(false);
  const showModal = useSelector((state) => state.showModal);
  const deleteId = useSelector((state) => state.deleteCommentId);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = () => {
    dispatch(modalActions.modalOff());
  };

  const handleDelete = () => {
    props.onDeleteComment(deleteId);
    dispatch(modalActions.modalOff());
  };

  const modalContent = showModal ? (
    <div className='absolute top-0 left-0 flex h-screen w-full items-center justify-center p-4 sm:p-0'>
      <div className='z-20 w-full rounded-lg bg-white px-7 py-6 sm:w-[400px] sm:p-8'>
        <h2 className='text-[24px] leading-[28px]'>Delete comment</h2>
        <h4 className='mt-4 sm:mt-5'>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </h4>
        <div className='mt-4 flex space-x-3 sm:mt-5'>
          <button
            className='h-[48px] flex-1 rounded-lg bg-grayblue transition duration-100 hover:opacity-50'
            onClick={handleClose}
          >
            <h5 className='py-[12px] text-base text-white'>NO, CANCEL</h5>
          </button>
          <button
            className='h-[48px] flex-1 rounded-lg bg-softred transition duration-100 hover:opacity-50'
            onClick={handleDelete}
          >
            <h5 className='py-[12px] text-base text-white'>YES, DELETE</h5>
          </button>
        </div>
      </div>
    </div>
  ) : null;

  const underlayContent = showModal ? (
    <div
      className='fixed top-0 h-full w-full bg-black opacity-50'
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
