import PropTypes from 'prop-types';

const Projects = ({ projects, handleChange, addEntry, removeEntry }) => {
  return (
    <div role="region" aria-labelledby="projects-heading">
      <h3 id="projects-heading" className="sr-only">
        Projects
      </h3>
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="mb-4 pb-4 border-b last:border-b-0"
          role="group"
          aria-labelledby={`project-entry-${index}`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3 id={`project-entry-${index}`} className="text-lg font-semibold">
              Project {index + 1}
            </h3>
            <button
              onClick={() => removeEntry(index)}
              className="text-red-500 hover:text-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded"
              disabled={projects.length <= 1}
              title={
                projects.length <= 1
                  ? 'Cannot remove the only project'
                  : 'Remove this project'
              }
              aria-label={`Remove project ${index + 1}`}
              aria-disabled={projects.length <= 1}
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

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor={`projectTitle-${index}`}
                className="block mb-1 font-medium"
                id={`projectTitle-label-${index}`}
              >
                Project Title
              </label>
              <input
                type="text"
                id={`projectTitle-${index}`}
                name="title"
                value={project.title}
                onChange={(e) => handleChange(e, index)}
                placeholder="Project Name"
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-labelledby={`projectTitle-label-${index}`}
              />
            </div>

            <div>
              <label
                htmlFor={`projectLink-${index}`}
                className="block mb-1 font-medium"
                id={`projectLink-label-${index}`}
              >
                Project Link{' '}
                <span className="text-sm font-normal">(optional)</span>
              </label>
              <input
                type="url"
                id={`projectLink-${index}`}
                name="link"
                value={project.link}
                onChange={(e) => handleChange(e, index)}
                placeholder="https://example.com"
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-labelledby={`projectLink-label-${index}`}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <div>
              <label
                htmlFor={`projectStartDate-${index}`}
                className="block mb-1 font-medium"
                id={`projectStartDate-label-${index}`}
              >
                Start Date
              </label>
              <input
                type="date"
                id={`projectStartDate-${index}`}
                name="startDate"
                value={project.startDate}
                onChange={(e) => handleChange(e, index)}
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-labelledby={`projectStartDate-label-${index}`}
              />
            </div>

            <div>
              <label
                htmlFor={`projectEndDate-${index}`}
                className="block mb-1 font-medium"
                id={`projectEndDate-label-${index}`}
              >
                End Date{' '}
                <span className="text-sm font-normal">
                  (or leave blank for ongoing)
                </span>
              </label>
              <input
                type="date"
                id={`projectEndDate-${index}`}
                name="endDate"
                value={project.endDate}
                onChange={(e) => handleChange(e, index)}
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-labelledby={`projectEndDate-label-${index}`}
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor={`projectDescription-${index}`}
              className="block mb-1 font-medium"
              id={`projectDescription-label-${index}`}
            >
              Description{' '}
              <span className="text-sm font-normal">
                (use bullet points with * at start of line)
              </span>
            </label>
            <textarea
              id={`projectDescription-${index}`}
              name="description"
              value={project.description}
              onChange={(e) => handleChange(e, index)}
              rows="4"
              placeholder="Describe your project, technologies used, and your role"
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-labelledby={`projectDescription-label-${index}`}
            ></textarea>
          </div>
        </div>
      ))}

      <button
        onClick={addEntry}
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
      title: PropTypes.string.isRequired,
      link: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  addEntry: PropTypes.func.isRequired,
  removeEntry: PropTypes.func.isRequired,
};

export default Projects;
