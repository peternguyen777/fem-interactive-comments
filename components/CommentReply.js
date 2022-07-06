import React, { useState } from "react";
import Image from "next/image";
import ButtonDeleteEdit from "./ButtonDeleteEdit";
import ButtonReply from "./ButtonReply";
import LikesBar from "./LikesBar";
import LikesBarVert from "./LikesBarVert";
import Reply from "./Reply";

const CommentReply = (props) => {
  const [commentOpen, setCommentOpen] = useState(false);

  const origImagePath = props.reply.user.image.png;
  const imagePath = origImagePath.substring(1);

  const replyClickHandler = () => {
    setCommentOpen(!commentOpen);
  };

  return (
    <div className='mt-4 pl-4 md:pl-[44px]'>
      {/* Comment Replies */}
      <div className='rounded-lg bg-white p-4 md:flex md:space-x-6 md:p-6'>
        <LikesBarVert reply={props.reply} type={`reply`} />
        <div className='space-y-4'>
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
                <ButtonDeleteEdit />
              ) : (
                <ButtonReply onClick={replyClickHandler} />
              )}
            </div>
          </div>

          <h4>
            <span className='cursor-pointer font-rubik text-base font-medium text-moderateblue'>
              @{props.reply.replyingTo}{" "}
            </span>
            {props.reply.content}
          </h4>
          <div className='flex items-center justify-between md:hidden'>
            <LikesBar reply={props.reply} type={`reply`} />
            {props.currentUser.username === props.reply.user.username ? (
              <ButtonDeleteEdit />
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
        />
      )}
    </div>
  );
};

export default CommentReply;
