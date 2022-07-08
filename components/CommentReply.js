import React, { useState } from "react";
import Image from "next/image";
import ButtonDeleteEdit from "./ButtonDeleteEdit";
import ButtonReply from "./ButtonReply";
import LikesBar from "./LikesBar";
import LikesBarVert from "./LikesBarVert";
import Reply from "./Reply";

const CommentReply = (props) => {
  const [commentOpen, setCommentOpen] = useState(false);

  let origPath = props.reply.user.image.png;
  var imagePath = origPath.substring(1);

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

  const addReplyToReplyHandler = async (commentId, addedCommentReply) => {
    console.log("Updating comment of id: " + commentId);
    const response = await fetch(
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

  return (
    <div className='mt-4 pl-4 md:pl-[44px]'>
      {/* Comment Replies */}
      <div className='rounded-lg bg-white p-4 md:flex md:space-x-6 md:p-6'>
        <LikesBarVert reply={props.reply} type={`reply`} />
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
              <h4>{props.reply.createdAt}</h4>
            </div>
            <div className='hidden md:inline-block'>
              {props.currentUser.username === props.reply.user.username ? (
                <ButtonDeleteEdit
                  replyId={props.reply.id}
                  commentId={props.commentId}
                />
              ) : (
                <ButtonReply onClick={replyClickHandler} />
              )}
            </div>
          </div>

          <h4 className='break-words'>
            <span className='cursor-pointer font-rubik text-base font-medium text-moderateblue'>
              {strReplyToStart}
            </span>

            {strReplyToEnd}
          </h4>
          <div className='flex items-center justify-between md:hidden'>
            <LikesBar reply={props.reply} type={`reply`} />
            {props.currentUser.username === props.reply.user.username ? (
              <ButtonDeleteEdit
                replyId={props.reply.id}
                commentId={props.commentId}
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
