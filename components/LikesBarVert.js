import React, { useEffect } from "react";
import Image from "next/image";

const LikesBarVert = (props) => {
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
  };

  const clickMinusHandler = () => {
    const updatedScore = {
      score: action - 1,
    };

    props.onUpdateScore(props.scoreId, updatedScore);
  };

  return (
    <div className='hidden h-[100px] rounded-[10px] bg-verylightgray md:flex'>
      <div className='mx-auto flex w-[40px] flex-col items-center justify-center'>
        <Image
          src='/images/icon-plus.svg'
          alt=''
          width={11}
          height={11}
          className='cursor-pointer'
          onClick={clickAddHandler}
        />
        <h5 className='leading-[19px] md:mt-[19px] md:mb-[21px]'>{action}</h5>
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

export default LikesBarVert;
