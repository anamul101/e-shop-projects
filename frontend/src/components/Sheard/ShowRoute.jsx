import React from 'react';
import {RiArrowRightSLine} from 'react-icons/ri'; 
import './ShowRoute.css'; 
const ShowRoute = ({title, first, second,}) => {
   return (
      <div className='h-40 w-full  text-center flex flex-col gap-5 items-center justify-center showRouteBg '>
         <h2 className='text-4xl uppercase  '>{title}</h2>
         <h4 className='flex text-[#189952] items-center text-2xl gap-2 font-bold'>Home {first &&  <span className='flex items-center gap-2'> <RiArrowRightSLine className='text-3xl text-[#fff] font-extrabold'></RiArrowRightSLine> {first}</span> } {second &&  <span className='flex items-center gap-2'> <RiArrowRightSLine className='text-3xl font-extrabold'></RiArrowRightSLine> {second}</span> } </h4>
      </div>
   );
};

export default ShowRoute;