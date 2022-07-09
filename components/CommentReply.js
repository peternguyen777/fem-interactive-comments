import React, { useState } from "react";
import Image from "next/image";
import LikesBar from "./LikesBar";
import LikesBarVert from "./LikesBarVert";
import ButtonDeleteEdit from "./ButtonDeleteEdit";
import ButtonReply from "./ButtonReply";
import Reply from "./Reply";
import Edit from "./Edit";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const CommentReply = (props) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentEdit, setCommentEdit] = useState(false);

  const editCommentId = useSelector((state) => state.editCommentId);
  const editReplyId = useSelector((state) => state.editReplyId);

  const currentCommentId = props.commentId;
  const currentReplyId = props.reply.id;

  const timeAgo = dayjs(props.reply.createdAt).fromNow();

  const imagePath = props.reply.user.image.png;

  //parse comment for highlighting
  const strReplyingTo = props.reply.replyingTo;

  var strReplyToStart = props.reply.content.substring(
    1,
    strReplyingTo.length + 1
  );

  if (strReplyingTo === strReplyToStart) {
    strReplyToStart = `@${strReplyingTo} `;
    var strReplyToEnd = props.reply.content.substring(strReplyingTo.length + 1);
  } else {
    strReplyToStart = "";
    var strReplyToEnd = props.reply.content;
  }
  //parse comment for highlighting

  const replyClickHandler = () => {
    setCommentOpen(!commentOpen);
  };

  const editClickHandler = () => {
    setCommentEdit(!commentEdit);
  };

  const addReplyToReplyHandler = async (commentId, addedCommentReply) => {
    await fetch(
      "https://interactive-comments-408e5-default-rtdb.asia-southeast1.firebasedatabase.app/comments/" +
        commentId +
        "/replies.json",
      {
        method: "POST",
        body: JSON.stringify(addedCommentReply),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    props.onFetchComments();
    setCommentOpen(false);
  };

  const updateReplyHandler = async (updatedCommentReply) => {
    await fetch(
      "https://interactive-comments-408e5-default-rtdb.asia-southeast1.firebasedatabase.app/comments/" +
        editCommentId +
        "/replies/" +
        editReplyId +
        ".json",
      {
        method: "PATCH",
        body: JSON.stringify(updatedCommentReply),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    props.onFetchComments();
    setCommentEdit(false);
  };

  const updateReplyScoreHandler = async (updatedScore) => {
    await fetch(
      "https://interactive-comments-408e5-default-rtdb.asia-southeast1.firebasedatabase.app/comments/" +
        currentCommentId +
        "/replies/" +
        currentReplyId +
        ".json",
      {
        method: "PATCH",
        body: JSON.stringify(updatedScore),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    props.onFetchComments();
  };

  return (
    <div className='mt-4 pl-4 md:pl-[44px]'>
      {/* Comment Replies */}
      <div className='rounded-lg bg-white p-4 md:flex md:space-x-6 md:p-6'>
        <LikesBarVert
          reply={props.reply}
          type={`reply`}
          onUpdateScore={updateReplyScoreHandler}
        />
        <div className='w-full space-y-4 overflow-x-auto'>
          <div className='flex justify-between'>
            <div className='flex items-center space-x-4'>
              <Image src={imagePath} alt='' width={32} height={32} />
              <h3 className='flex items-center'>
                {props.reply.user.username}
                {props.currentUser.username === props.reply.user.username && (
                  <span className='ml-[7px] rounded-[2px] bg-moderateblue px-[6px] pt-[1px] pb-[3px] font-rubik text-[13px] font-medium leading-[15px] text-white'>
                    you
                  </span>
                )}
              </h3>
              <h4>{timeAgo}</h4>
            </div>
            <div className='hidden md:inline-block'>
              {props.currentUser.username === props.reply.user.username ? (
                <ButtonDeleteEdit
                  replyId={props.reply.id}
                  commentId={props.commentId}
                  onEditClick={editClickHandler}
                />
              ) : (
                <ButtonReply onClick={replyClickHandler} />
              )}
            </div>
          </div>

          {commentEdit ? (
            <Edit
              content={props.reply.content}
              onUpdateClick={updateReplyHandler}
            />
          ) : (
            <h4 className='break-words'>
              <span className='cursor-pointer font-rubik text-base font-medium text-moderateblue'>
                {strReplyToStart}
              </span>

              {strReplyToEnd}
            </h4>
          )}
          <div className='flex items-center justify-between md:hidden'>
            <LikesBar
              reply={props.reply}
              type={`reply`}
              onUpdateScore={updateReplyScoreHandler}
            />
            {props.currentUser.username === props.reply.user.username ? (
              <ButtonDeleteEdit
                replyId={props.reply.id}
                commentId={props.commentId}
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
          replyUser={props.reply.user.username}
          commentId={props.commentId}
          onAddCommentReply={addReplyToReplyHandler}
        />
      )}
    </div>
  );
};

export default CommentReply;
