import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaSearch, FaTrash, FaChevronDown, FaEllipsisH, FaEdit } from 'react-icons/fa';
import ProgressBar from './Progressbar';
import Detailed from './Detailed';

const Project = ({ onAssignProjectClick }) => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');
  const [clientFilter, setClientFilter] = useState('All');
  const [sortProgress, setSortProgress] = useState('All');
  const [sortDate, setSortDate] = useState('None');
  const [clients, setClients] = useState([]);
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const [showProgressDropdown, setShowProgressDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showOptions, setShowOptions] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5005/api/adminprojects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setSelectedProject(data[0]);
        const uniqueClients = [...new Set(data.map(project => project.clientName))];
        setClients(uniqueClients);
      });
  }, []);

  const handleDelete = (projectName) => {
    fetch(`http://localhost:5005/api/adminprojects/${projectName}`, { method: 'DELETE' })
      .then(() => {
        setProjects(projects.filter((project) => project.projectName !== projectName));
      });
  };

  const handleUpdateProgress = (projectName, nextStep) => {
    const updatedProgress = { completed: nextStep };
    fetch(`http://localhost:5005/api/adminprojects/${projectName}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progress: updatedProgress })
    })
      .then(response => response.json())
      .then(updatedProject => {
        setProjects(projects.map(project => project.projectName === projectName ? updatedProject : project));
        setSelectedProject(updatedProject);
      });
  };

  const handleEditSave = (projectId, updatedDetails) => {
    fetch(`http://localhost:5005/api/adminprojects/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedDetails)
    })
      .then(response => response.json())
      .then(updatedProject => {
        setProjects(projects.map(project => project._id === projectId ? updatedProject : project));
        setEditingProject(null);
        setSelectedProject(updatedProject);
      });
  };
  
  const filteredProjects = projects.filter(project => {
    if (filter === 'Ongoing') return project.progress.completed < project.progress.total;
    if (filter === 'Completed') return project.progress.completed === project.progress.total;
    return true;
  }).filter(project => {
    if (clientFilter === 'All') return true;
    return project.clientName === clientFilter;
  }).filter(project =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortProgress === 'Completed') return a.progress.completed < b.progress.completed ? 1 : -1;
    if (sortProgress === 'Ongoing') return a.progress.completed > b.progress.completed ? 1 : -1;
    return 0;
  }).sort((a, b) => {
    if (sortDate === 'Earliest') return new Date(a.date) - new Date(b.date);
    if (sortDate === 'Oldest') return new Date(b.date) - new Date(a.date);
    return 0;
  });

  const getRowClassName = (project, index) => {
    if (project === selectedProject) {
      return 'bg-nn2';
    } else {
      if (index % 2 === 0) {
        return 'bg-secondary';
      } else {
        return 'bg-nn';
      }
    }
  };

  return (
    <div className="flex flex-col p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold">Projects</h2>
          <button className="bg-gr text-white px-4 py-2 rounded-md" onClick={onAssignProjectClick} style={{ marginLeft: '60rem' }}>
            Assign Project
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search project"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-nc rounded-md pl-10 pr-4 py-2"
          />
        </div>
        <div className="flex items-center mr-96 space-x-7">
          <div className="relative">
            <button
              className="flex items-center bg-gray-200 px-4 py-2 rounded-md"
              onClick={() => setShowClientDropdown(!showClientDropdown)}
            >
              Filter By Clients <FaChevronDown className="ml-2" />
            </button>
            {showClientDropdown && (
              <div className="absolute mt-2 w-full rounded-md shadow-lg z-40 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button onClick={() => setClientFilter('All')} className="block px-4 py-2 text-sm text-gray-700">
                    All
                  </button>
                  {clients.map(client => (
                    <button
                      key={client}
                      onClick={() => setClientFilter(client)}
                      className="block px-4 py-2 text-sm z-40 text-gray-700 "
                    >
                      {client}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="flex items-center bg-gray-200 px-4 py-2 rounded-md"
              onClick={() => setShowProgressDropdown(!showProgressDropdown)}
            >
              Sort By Progress <FaChevronDown className="ml-2" />
            </button>
            {showProgressDropdown && (
              <div className="absolute mt-2 z-40 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button onClick={() => setSortProgress('All')} className="block px-4 py-2 text-sm text-gray-700">
                    All
                  </button>
                  <button onClick={() => setSortProgress('Completed')} className="block px-4 py-2 text-sm text-gray-700">
                    Completed
                  </button>
                  <button onClick={() => setSortProgress('Ongoing')} className="block px-4 py-2 text-sm text-gray-700">
                    Ongoing
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="flex items-center bg-gray-200 px-4 py-2 rounded-md"
              onClick={() => setShowDateDropdown(!showDateDropdown)}
            >
              Sort By Date <FaChevronDown className="ml-2" />
            </button>
            {showDateDropdown && (
              <div className="absolute mt-2 z-40 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button onClick={() => setSortDate('None')} className="block px-4 py-2 text-sm text-gray-700">
                    None
                  </button>
                  <button onClick={() => setSortDate('Earliest')} className="block px-4 py-2 text-sm text-gray-700">
                    Earliest
                  </button>
                  <button onClick={() => setSortDate('Oldest')} className="block px-4 py-2 text-sm text-gray-700">
                    Oldest
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex" style={{ height: '50%' }}>
        <div className="flex flex-col w-full pr-2">
          <div className="overflow-auto flex-1 border border-gray-200 rounded-lg shadow-lg p-2 custom-scrollbar">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-nn">
                <tr>
                  <th className="px-9 py-3 text-center text-xs font-medium text-accent">Project</th>
                  <th className="px-9 py-3 text-center text-xs font-medium text-accent">Clients</th>
                  <th className="px-9 py-3 text-center text-xs font-medium text-accent" style={{ width: '200%' }}>Progress</th>
                  <th className="px-9 py-3 text-center text-xs font-medium text-accent">Start Date</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-secondary divide-y divide-gray-200">
                {sortedProjects.map((project, index) => (
                  <tr
                    key={project._id}
                    className={getRowClassName(project, index)}
                    onClick={() => setSelectedProject(project)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-normal text-text">
                      {project.projectName}
                    </td>
                    <td className="px-6 py-3 text-center whitespace-nowrap font-normal text-sm text-text">
                      {project.clientName}
                    </td>
                    <td className="px-8 py-3 text-center whitespace-nowrap text-sm text-accent">
                      <ProgressBar
                        completed={project.progress.completed}
                        total={project.progress.total}
                      />
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-normal text-text text-center">{project.date}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-center text-text relative">
                      {project.progress.completed === project.progress.total && (
                        <FaTrash
                          className="cursor-pointer"
                          onClick={(e) => { e.stopPropagation(); handleDelete(project.projectName); }}
                        />
                      )}
                      <FaEllipsisH
                        className="ml-4 cursor-pointer"
                        onClick={(e) => { e.stopPropagation(); setShowOptions(project._id === showOptions ? null : project._id); }}
                      />
                      {showOptions === project._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                          <button
                            onClick={() => setEditingProject(project)}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FaEdit className="mr-2 ml-12 translate-y-4" /> Edit
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(project.projectName); }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <FaTrash className="mr-2 ml-12 translate-y-4" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {editingProject && (
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Edit Project</h2>
            <form
            onSubmit={(e) => {
           e.preventDefault();
           handleEditSave(editingProject._id, {
           firstName: e.target.firstName.value,
           lastName: e.target.lastName.value,
           projectName: e.target.projectName.value,
           clientName: e.target.clientName.value,
           contactNumber: e.target.contactNumber.value,
           email: e.target.email.value,
           date: e.target.date.value,
           progress: {
           completed: parseInt(e.target.completed.value),
           total: parseInt(e.target.total.value),
          },
            });
            }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" name="firstName" defaultValue={editingProject.firstName} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" name="lastName" defaultValue={editingProject.lastName} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Project Name</label>
                  <input type="text" name="projectName" defaultValue={editingProject.projectName} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Client Name</label>
                  <input type="text" name="clientName" defaultValue={editingProject.clientName} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                  <input type="text" name="contactNumber" defaultValue={editingProject.contactNumber} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" name="email" defaultValue={editingProject.email} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Date</label>
                  <input type="date" name="date" defaultValue={editingProject.date} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Progress Completed</label>
                  <input type="number" name="completed" defaultValue={editingProject.progress.completed} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Progress Total</label>
                  <input type="number" name="total" defaultValue={editingProject.progress.total} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm" required />
                </div>
              </div>
              <div className="flex items-center justify-end mt-4">
                <button type="button" onClick={() => setEditingProject(null)} className="bg-gr text-white px-4 py-2 rounded-md mr-2">
                  Cancel
                </button>
                <button type="submit" className="bg-gr text-white px-4 py-2 rounded-md">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {selectedProject && <Detailed project={selectedProject} onUpdateProgress={handleUpdateProgress} />}
    </div>
  );
};

export default Project;
