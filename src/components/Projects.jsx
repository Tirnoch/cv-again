import PropTypes from 'prop-types';

const Projects = ({ projects, handleChange, addEntry, removeEntry }) => {
  // Event handler to stop propagation
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // Create a wrapper function for the handleChange to ensure proper name and event handling
  const handleProjectChange = (e, index) => {
    // Stop propagation first to prevent drag and drop interference
    stopPropagation(e);

    // Extract the field name from the name attribute (not the id)
    const { name, value } = e.target;

    // Call the parent's handleChange with the correct field name
    const eventWithName = {
      target: {
        id: name, // This is critical - use the name as id to match App.jsx expectations
        value,
      },
    };

    handleChange(eventWithName, index);
  };

  return (
    <div
      role="region"
      aria-labelledby="projects-heading"
      onClick={stopPropagation}
      onMouseDown={stopPropagation}
      onTouchStart={stopPropagation}
    >
      <h2 id="projects-heading" className="sr-only">
        Projects
      </h2>
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="mb-4 pb-4 border-b last:border-b-0"
          role="group"
          aria-labelledby={`project-entry-${index}`}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 id={`project-entry-${index}`} className="text-lg font-semibold">
              Project {index + 1}
            </h3>
            <button
              onClick={(e) => {
                stopPropagation(e);
                removeEntry(index);
              }}
              className="text-red-500 hover:text-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded"
              title="Remove this project"
              aria-label={`Remove project ${index + 1}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="mb-3">
            <label
              htmlFor={`title-${index}`}
              className="block mb-1 font-medium"
              id={`title-label-${index}`}
            >
              Project Title
            </label>
            <input
              type="text"
              id={`title-${index}`}
              name="title"
              value={project.title || ''}
              onChange={(e) => handleProjectChange(e, index)}
              onMouseDown={stopPropagation}
              onTouchStart={stopPropagation}
              onKeyDown={stopPropagation}
              placeholder="Project Title"
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-labelledby={`title-label-${index}`}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor={`description-${index}`}
              className="block mb-1 font-medium"
              id={`description-label-${index}`}
            >
              Description
            </label>
            <textarea
              id={`description-${index}`}
              name="description"
              value={project.description || ''}
              onChange={(e) => handleProjectChange(e, index)}
              onMouseDown={stopPropagation}
              onTouchStart={stopPropagation}
              onKeyDown={stopPropagation}
              placeholder="Project Description"
              rows="3"
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-labelledby={`description-label-${index}`}
            ></textarea>
          </div>

          <div className="mb-3">
            <label
              htmlFor={`technologies-${index}`}
              className="block mb-1 font-medium"
              id={`technologies-label-${index}`}
            >
              Technologies Used
            </label>
            <input
              type="text"
              id={`technologies-${index}`}
              name="technologies"
              value={project.technologies || ''}
              onChange={(e) => handleProjectChange(e, index)}
              onMouseDown={stopPropagation}
              onTouchStart={stopPropagation}
              onKeyDown={stopPropagation}
              placeholder="Technologies (comma separated)"
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-labelledby={`technologies-label-${index}`}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor={`link-${index}`}
              className="block mb-1 font-medium"
              id={`link-label-${index}`}
            >
              Project Link (Optional)
            </label>
            <input
              type="url"
              id={`link-${index}`}
              name="link"
              value={project.link || ''}
              onChange={(e) => handleProjectChange(e, index)}
              onMouseDown={stopPropagation}
              onTouchStart={stopPropagation}
              onKeyDown={stopPropagation}
              placeholder="https://..."
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-labelledby={`link-label-${index}`}
            />
          </div>
        </div>
      ))}

      <button
        onClick={(e) => {
          stopPropagation(e);
          addEntry();
        }}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        aria-label="Add another project"
      >
        Add Another Project
      </button>
    </div>
  );
};

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      technologies: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  addEntry: PropTypes.func.isRequired,
  removeEntry: PropTypes.func.isRequired,
};

export default Projects;
