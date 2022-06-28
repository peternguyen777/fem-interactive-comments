import React from "react";
import Image from "next/image";

const ButtonReply = () => {
  return (
    <div className='flex cursor-pointer items-center space-x-2 transition duration-100 hover:opacity-50'>
      <Image src='/images/icon-reply.svg' alt='' width={14} height={13} />
      <h5>Reply</h5>
    </div>
  );
};

export default ButtonReply;
