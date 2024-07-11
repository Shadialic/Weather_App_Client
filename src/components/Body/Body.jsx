import React, { useState } from 'react';
import Today from './Today';
import Week from './Week';

function Body() {
  const [activeComponent, setActiveComponent] = useState('Today');

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="w-full">
      <div className="flex flex-row text-black font-prompt-semibold text-[20px] gap-4 p-4">
        <button
          onClick={() => handleButtonClick('Today')}
          className={activeComponent === 'Today' ? 'text-blue-500' : ''}
        >
          Today
        </button>
        <button
          onClick={() => handleButtonClick('Week')}
          className={activeComponent === 'Week' ? 'text-blue-500' : ''}
        >
          Week
        </button>
      </div>
      <div className="p-4">
        {activeComponent === 'Today' && <Today />}
        {activeComponent === 'Week' && <Week />}
      </div>
    </div>
  );
}

export default Body;
