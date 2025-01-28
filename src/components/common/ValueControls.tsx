import React from 'react';

interface ValueControlsProps {
  onIncrement: () => void;
  onDecrement: () => void;
  disableIncrement?: boolean;
  disableDecrement?: boolean;
  isLoading: boolean;
}

const ValueControls: React.FC<ValueControlsProps> = ({
  onIncrement,
  onDecrement,
  disableIncrement = false,
  disableDecrement = false,
  isLoading = false,
}) => {
  return (
    <div className="controls">
      <button
        onClick={onDecrement}
        className="control-button"
        disabled={disableDecrement || isLoading}
      >
        -
      </button>
      <button
        onClick={onIncrement}
        className="control-button"
        disabled={disableIncrement || isLoading}
      >
        +
      </button>
    </div>
  );
};

export default ValueControls;
