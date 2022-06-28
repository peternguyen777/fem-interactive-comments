import React from "react";
import Image from "next/image";

const LikesBar = (props) => {
  if (props.type === "comment") {
    var action = props.comment.score;
  } else if (props.type === "reply") {
    var action = props.reply.score;
  }

  return (
    <div className='flex h-[40px] w-[100px] items-center justify-center rounded-[10px] bg-verylightgray'>
      <div className='flex items-center'>
        <Image src='/images/icon-plus.svg' alt='' width={11} height={11} />
        <h5 className='mx-[11px] leading-[18.96px]'>{action}</h5>
        <Image src='/images/icon-minus.svg' alt='' width={11} height={3} />
      </div>
    </div>
  );
};

export default LikesBar;
