import React, { useRef } from "react";
import Image from "next/image";

const Reply = (props) => {
  const commentReplyRef = useRef("");

  const imagePath = props.currentUser.image.png;

  const submitHandler = (event) => {
    event.preventDefault();

    let replyString = commentReplyRef.current.value;
    let remText = replyString.replace(/\s/g, "");
    let replyLength = remText.length;

    var current = new Date();

    if (replyLength > 0) {
      const replyComment = {
        content: commentReplyRef.current.value,
        createdAt: current,
        score: 0,
        replyingTo: props.replyUser,
        user: {
          image: {
            png: props.currentUser.image.png,
            webp: props.currentUser.image.webp,
          },
          username: props.currentUser.username,
        },
      };

      props.onAddCommentReply(props.commentId, replyComment);
    }
  };

  return (
    <div className='mt-2 rounded-lg bg-white'>
      <div className='p-4 md:flex md:justify-between md:space-x-4 md:p-6'>
        <div className='hidden md:inline-block'>
          <Image src={imagePath} alt='' width={32} height={32} />
        </div>
        <form
          className='md:flex md:flex-grow md:space-x-4'
          onSubmit={submitHandler}
        >
          <textarea
            className='w-full cursor-pointer resize-none rounded-lg border border-lightgray px-6 pt-3 pb-[60px] font-rubik text-base font-normal text-darkblue placeholder:text-grayblue focus:border-moderateblue focus:ring-1 focus:ring-moderateblue'
            rows='1'
            autoFocus
            defaultValue={`@${props.replyUser} `}
            ref={commentReplyRef}
            onFocus={(e) =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length
              )
            }
          ></textarea>

          <div className='mt-4 flex flex-row-reverse items-center justify-between md:mt-0 md:items-start'>
            <button className='h-[48px] rounded-lg bg-moderateblue transition duration-100 hover:opacity-50'>
              <h5 className='px-[30px] py-[12px] text-white'>REPLY</h5>
            </button>
            <div className='md:hidden'>
              <Image src={imagePath} alt='' width={32} height={32} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reply;
