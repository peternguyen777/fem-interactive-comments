import React from "react";
import Image from "next/image";

const ButtonDeleteEdit = () => {
  return (
    <div className='flex space-x-4'>
      <div className='flex cursor-pointer items-center space-x-2 transition duration-100 hover:opacity-50'>
        <Image src='/images/icon-delete.svg' alt='' width={12} height={14} />
        <h6>Delete</h6>
      </div>
      <div className='flex cursor-pointer items-center space-x-2 transition duration-100 hover:opacity-50'>
        <Image src='/images/icon-edit.svg' alt='' width={14} height={14} />
        <h5>Edit</h5>
      </div>
    </div>
  );
};

export default ButtonDeleteEdit;