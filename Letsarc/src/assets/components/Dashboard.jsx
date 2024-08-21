import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaSearch, FaTrash } from 'react-icons/fa';
import ProgressBar from './Progressbar';
import Detailed from './Detailed';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('http://localhost:5005/api/adminprojects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setSelectedProject(data[0]);
      });
  }, []);

  const handleDelete = (projectName) => {
    fetch(`http://localhost:5005/api/adminprojects/${projectName}`, { method: 'DELETE' })
      .then(() => {
        setProjects(projects.filter((project) => project.projectName !== projectName));
      });
  };

  const handleUpdateProgress = (projectId, nextStep) => {
    const updatedProgress = { completed: nextStep };
    fetch(`http://localhost:5005/api/adminprojects/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progress: updatedProgress })
    })
      .then(response => response.json())
      .then(updatedProject => {
        setProjects(projects.map(project => project._id === projectId ? updatedProject : project));
        setSelectedProject(updatedProject);
      });
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'All') return true;
    if (filter === 'Ongoing') return project.progress.completed < project.progress.total;
    if (filter === 'Completed') return project.progress.completed === project.progress.total;
  }).filter(project =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) || project.clientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h2 className="text-2xl pl-10 text-center font-bold">All Projects</h2>
          <div className="relative group ml-2 pt-1">
            <FaInfoCircle className="w-6 h-6 text-gray-500 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute left-full mt-2 ml-2 w-64 text-center p-2 bg-gray-500 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Find your all ongoing and completed project's progress in this section.
            </div>
          </div>
          <div className="relative ml-96">
            <FaSearch className="absolute top-3 text-gray-400" style={{ marginLeft: '20rem' }} />
            <input
              type="text"
              placeholder="Search client or project"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-12 py-2 focus"
              style={{ marginLeft: '19rem' }}
            />
          </div>
        </div>
      </div>
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 rounded-md ml-2 ${filter === 'All' ? 'bg-text text-secondary' : 'bg-gray-200'}`}
          onClick={() => setFilter('All')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded-md ml-2 ${filter === 'Ongoing' ? 'bg-text text-secondary' : 'bg-gray-200'}`}
          onClick={() => setFilter('Ongoing')}
        >
          Ongoing
        </button>
        <button
          className={`px-4 py-2 rounded-md ml-2 ${filter === 'Completed' ? 'bg-text text-secondary' : 'bg-gray-200'}`}
          onClick={() => setFilter('Completed')}
        >
          Completed
        </button>
      </div>
      <div className="flex" style={{ height: '50%' }}>
        <div className="flex flex-col w-full pr-2">
          <div className="overflow-auto flex-1 border border-gray-200 rounded-lg shadow-lg p-2 custom-scrollbar">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-nn">
                <tr>
                  <th className="px-9 py-3 text-center text-xs font-medium text-accent">Projects</th>
                  <th className="px-9 py-3 text-center text-xs font-medium text-accent">Clients</th>
                  <th className="px-9 py-3 text-center text-xs font-medium text-accent" style={{ width: '200%' }}>Progress</th>
                  <th className="px-9 py-3 text-center text-xs font-medium text-accent">Start Date</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-accent">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-secondary divide-y divide-gray-200">
                {filteredProjects.map((project, index) => (
                  <tr
                    key={project._id}
                    className={getRowClassName(project, index)}
                    onClick={() => setSelectedProject(project)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-normal text-text ">
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
                    <td className="px-6 py-3 whitespace-nowrap text-sm text-center text-red-600">
                      {project.progress.completed === project.progress.total && (
                        <FaTrash
                          className="cursor-pointer"
                          onClick={(e) => { e.stopPropagation(); handleDelete(project.projectName); }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {selectedProject && <Detailed project={selectedProject} onUpdateProgress={handleUpdateProgress} />}
    </div>
  );
};

export default Dashboard;
