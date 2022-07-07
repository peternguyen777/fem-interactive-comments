import React, { useState } from "react";
import Image from "next/image";
import CommentReply from "./CommentReply";
import LikesBar from "./LikesBar";
import LikesBarVert from "./LikesBarVert";
import ButtonDeleteEdit from "./ButtonDeleteEdit";
import ButtonReply from "./ButtonReply";
import Reply from "./Reply";
import Edit from "./Edit";
import { useDispatch, useSelector } from "react-redux";

const CommentMain = (props) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentEdit, setCommentEdit] = useState(false);
  const editId = useSelector((state) => state.editCommentId);
  const dispatch = useDispatch();

  const origImagePath = props.comment.user.image.png;
  const imagePath = origImagePath.substring(1);

  const replyClickHandler = () => {
    setCommentOpen(!commentOpen);
  };

  const editClickHandler = () => {
    setCommentEdit(!commentEdit);
  };

  const handleUpdate = (updatedComment) => {
    props.onEditComment(editId, updatedComment);
    setCommentEdit(false);
  };

  return (
    <div className='mb-4'>
      {/* Main Comment */}
      <div className='rounded-lg bg-white p-4 md:flex md:space-x-6 md:p-6'>
        <LikesBarVert comment={props.comment} type={`comment`} />
        <div className='w-full space-y-4 overflow-x-auto'>
          <div className='flex justify-between'>
            <div className='flex items-center space-x-4'>
              <Image src={imagePath} alt='' width={32} height={32} />
              <h3 className='flex items-center'>
                {props.comment.user.username}
                {props.currentUser.username === props.comment.user.username && (
                  <span className='ml-[7px] rounded-[2px] bg-moderateblue px-[6px] pt-[1px] pb-[3px] font-rubik text-[13px] font-medium leading-[15px] text-white'>
                    you
                  </span>
                )}
              </h3>

              <h4>{props.comment.createdAt}</h4>
            </div>
            <div className='hidden md:inline-block'>
              {props.currentUser.username === props.comment.user.username ? (
                <ButtonDeleteEdit
                  commentId={props.comment.id}
                  onEditClick={editClickHandler}
                />
              ) : (
                <ButtonReply onClick={replyClickHandler} />
              )}
            </div>
          </div>
          {commentEdit ? (
            <Edit
              content={props.comment.content}
              editId={props.comment.id}
              onUpdateClick={handleUpdate}
            />
          ) : (
            <h4 className='break-words'>{props.comment.content}</h4>
          )}

          <div className='flex items-center justify-between md:hidden'>
            <LikesBar comment={props.comment} type={`comment`} />
            {props.currentUser.username === props.comment.user.username ? (
              <ButtonDeleteEdit
                commentId={props.comment.id}
                onEditClick={editClickHandler}
              />
            ) : (
              <ButtonReply onClick={replyClickHandler} />
            )}
          </div>
        </div>
      </div>
      {commentOpen && (
        <Reply
          currentUser={props.currentUser}
          replyUser={props.comment.user.username}
        />
      )}
      {/* Comment Replies */}

      {props.comment.hasOwnProperty("replies") && (
        <div className='border-l-2 border-lightgray md:ml-[44px]'>
          {props.comment.replies.map((reply) => {
            return (
              <CommentReply
                key={reply.id}
                reply={reply}
                currentUser={props.currentUser}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CommentMain;
