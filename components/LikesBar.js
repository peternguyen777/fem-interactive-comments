import React from "react";
import Image from "next/image";

const LikesBar = (props) => {
  if (props.type === "comment") {
    var action = props.comment.score;
  } else if (props.type === "reply") {
    var action = props.reply.score;
  }

  const clickAddHandler = () => {
    const updatedScore = {
      score: action + 1,
    };

    props.onUpdateScore(props.scoreId, updatedScore);
    console.log("added score");
  };

  const clickMinusHandler = () => {
    const updatedScore = {
      score: action - 1,
    };

    props.onUpdateScore(props.scoreId, updatedScore);
    console.log("minussed score");
  };

  return (
    <div className='flex h-[40px] w-[100px] items-center justify-center rounded-[10px] bg-verylightgray'>
      <div className='flex items-center'>
        <Image
          src='/images/icon-plus.svg'
          alt=''
          width={11}
          height={11}
          className='cursor-pointer'
          onClick={clickAddHandler}
        />
        <h5 className='mx-[11px] leading-[18.96px]'>{action}</h5>
        <Image
          src='/images/icon-minus.svg'
          alt=''
          width={11}
          height={3}
          className='cursor-pointer'
          onClick={clickMinusHandler}
        />
      </div>
    </div>
  );
};

export default LikesBar;
