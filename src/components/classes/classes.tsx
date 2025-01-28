import React from 'react';
import ClassItem from './classItem';
import { CLASS_LIST } from '../../consts';

const Classes: React.FC = () => {
  return (
    <div className="class-container">
      <h2>Classes</h2>
      <ul className="">
        {Object.entries(CLASS_LIST).map(([key, value]) => (
          <ClassItem key={key} name={key} minAttributes={value} />
        ))}
      </ul>
    </div>
  );
};

export default Classes;
