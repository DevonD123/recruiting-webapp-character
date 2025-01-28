import React from 'react';
import { useCharacter } from '../../context/characterContext';

const Remaining: React.FC = () => {
  const { totalPoints, maxPoints } = useCharacter();

  return (
    <p className="pointsCounter">
      Points Used: {totalPoints + 60} / {maxPoints}
    </p>
  );
};

export default Remaining;
