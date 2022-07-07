import React, { useRef } from "react";

const Edit = (props) => {
  const commentRef = useRef("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (commentRef.current.value.length > 0) {
      const updatedComment = {
        content: commentRef.current.value,
      };

      props.onUpdateClick(updatedComment);
    }
  };

  return (
    <form className='flex flex-col items-end' onSubmit={submitHandler}>
      <textarea
        className='w-full cursor-pointer resize-none rounded-lg border border-lightgray px-6 pt-3 pb-[60px] font-rubik text-base font-normal text-darkblue placeholder:text-grayblue focus:border-moderateblue focus:ring-1 focus:ring-moderateblue'
        autoFocus
        defaultValue={props.content}
        ref={commentRef}
        onFocus={(e) =>
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          )
        }
      ></textarea>
      <button className='mt-4 h-[48px] w-[104px] rounded-lg bg-moderateblue transition duration-100 hover:opacity-50'>
        <h5 className='px-[20px] py-[12px] text-white'>UPDATE</h5>
      </button>
    </form>
  );
};

export default Edit;
