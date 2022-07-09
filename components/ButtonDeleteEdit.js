import React from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { modalActions } from "../store/modal";

const ButtonDeleteEdit = (props) => {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(modalActions.modalOn());
    dispatch(modalActions.deleteComment(props.commentId));

    if (typeof props.replyId === "undefined") {
      dispatch(modalActions.deleteReply("undefined"));
    } else if (typeof props.replyId !== "undefined") {
      dispatch(modalActions.deleteReply(props.replyId));
    }
  };

  const editHandler = () => {
    dispatch(modalActions.editComment(props.commentId));

    if (typeof props.replyId === "undefined") {
      dispatch(modalActions.editReply("undefined"));
    } else if (typeof props.replyId !== "undefined") {
      dispatch(modalActions.editReply(props.replyId));
    }
    props.onEditClick();
  };

  return (
    <div className='flex space-x-4'>
      <div
        className='flex cursor-pointer items-center space-x-2 transition duration-100 hover:opacity-50'
        onClick={deleteHandler}
      >
        <Image src='/images/icon-delete.svg' alt='' width={12} height={14} />
        <h6>Delete</h6>
      </div>
      <div
        className='flex cursor-pointer items-center space-x-2 transition duration-100 hover:opacity-50'
        onClick={editHandler}
      >
        <Image src='/images/icon-edit.svg' alt='' width={14} height={14} />
        <h5>Edit</h5>
      </div>
    </div>
  );
};

export default ButtonDeleteEdit;
