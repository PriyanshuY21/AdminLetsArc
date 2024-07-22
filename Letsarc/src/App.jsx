import React, { useState } from 'react';
import Navbar from './assets/components/Nav.jsx';
import Sidebar from './assets/components/Sidebar.jsx';
import Dashboard from './assets/components/Dashboard.jsx';
import Upload from './assets/components/Upload.jsx';
import Clients from './assets/components/Clients.jsx';
import Projects from './assets/components/Projects.jsx';
import Profile from './assets/components/User.jsx';
import Add from './assets/components/Add.jsx';
import './index.css';

const App = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  const sidebarItems = ['Dashboard', 'Projects', 'Clients', 'Profile'];

  const renderContent = () => {
    switch (selectedItem) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Projects':
        return <Projects onAssignProjectClick={() => setSelectedItem('Upload')} />;
      case 'Clients':
        return <Clients onAddClientClick={() => setSelectedItem('Add')} />;
      case 'Profile':
        return <Profile />;
      case 'Upload':
        return <Upload onBackClick={() => setSelectedItem('Projects')} />;
      case 'Add':
        return <Add onBackClick={() => setSelectedItem('Clients')} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar items={sidebarItems} onSelect={handleSelect} />
        <div className="flex-grow p-4 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;
