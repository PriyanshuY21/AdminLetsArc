import React, { useState } from 'react';
import { FaTachometerAlt, FaProjectDiagram, FaUsers, FaClipboardList, FaUser } from 'react-icons/fa';

const Sidebar = ({ items, onSelect }) => {
  const [selected, setSelected] = useState(items[0]);

  const handleClick = (item) => {
    setSelected(item);
    onSelect(item);
  };

  const renderIcon = (item) => {
    const iconProps = {
      className: `mr-2 ${selected === item ? 'text-green-500' : ''}`
    };

    switch (item) {
      case 'Dashboard':
        return <FaTachometerAlt {...iconProps} />;
      case 'Projects':
        return <FaProjectDiagram {...iconProps} />;
      case 'Clients':
        return <FaUsers {...iconProps} />;
      case 'AssignProject':
        return <FaClipboardList {...iconProps} />;
      case 'Profile':
        return <FaUser {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="sidebar bg-gray-800 h-screen w-64 text-white flex flex-col pt-4">
      {items.map((item) => (
        <div
          key={item}
          onClick={() => handleClick(item)}
          className={`p-4 cursor-pointer flex items-center ${selected === item ? 'bg-gray-700 text-green-500 w-50 h-10 rounded-lg' : ''}`}
        >
          {renderIcon(item)}
          {item}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
