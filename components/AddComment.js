import Image from "next/image";
import { useState, useEffect } from "react";

const AddComment = (props) => {
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    const isObjectEmpty = Object.keys(props.currentUser).length === 0;
    setIsEmpty(isObjectEmpty);
  }, [props.currentUser]);

  if (!isEmpty) {
    let origPath = props.currentUser.image.png;
    var imagePath = origPath.substring(1);
  }

  return (
    <div className='rounded-lg bg-white'>
      <div className='p-4 md:flex md:justify-between md:space-x-4 md:p-6'>
        <div className='hidden md:inline-block'>
          {!isEmpty && <Image src={imagePath} alt='' width={32} height={32} />}
        </div>
        <form className='md:flex md:flex-grow md:space-x-4'>
          <textarea
            className='w-full resize-none rounded-lg border border-lightgray px-6 pt-3 pb-[60px] font-rubik text-base font-normal text-darkblue placeholder:text-grayblue focus:border-moderateblue focus:ring-1 focus:ring-moderateblue'
            placeholder='Add a comment...'
            rows='1'
          ></textarea>

          <div className='mt-4 flex flex-row-reverse items-center justify-between md:mt-0 md:items-start'>
            <button className='h-[48px] rounded-lg bg-moderateblue transition duration-100 hover:opacity-50'>
              <h5 className='px-[30px] py-[12px] text-white'>SEND</h5>
            </button>
            <div className='md:hidden'>
              {!isEmpty && (
                <Image src={imagePath} alt='' width={32} height={32} />
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddComment;
