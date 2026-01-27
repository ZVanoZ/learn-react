import React from 'react';

interface ButtonPanelProps {
  onButtonClick: (name: 'Component1' | 'Component2') => void;
  onClearClick: () => void;
}

const ButtonPanel: React.FC<ButtonPanelProps> = ({ onButtonClick, onClearClick }) => {
  return (
    <div className="button-panel">
      <button onClick={() => onButtonClick('Component1')}>button-1</button>
      <button onClick={() => onButtonClick('Component2')}>button-2</button>
      <button onClick={onClearClick}>clear</button>
    </div>
  );
};

export default ButtonPanel;
