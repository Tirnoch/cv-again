import PropTypes from 'prop-types';

const Experience = ({
  experienceList,
  handleChange,
  addEntry,
  removeEntry,
  errors,
}) => {
  return (
    <div>
      {experienceList.map((experience, index) => (
        <div key={experience.id} className="mb-4 pb-4 border-b last:border-b-0">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
            <button
              onClick={() => removeEntry(index)}
              className="text-red-500 hover:text-red-700 transition"
              disabled={experienceList.length <= 1}
              title={
                experienceList.length <= 1
                  ? 'Cannot remove the only experience entry'
                  : 'Remove this experience entry'
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
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
                htmlFor={`company-${index}`}
                className="block mb-1 font-medium"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                value={experience.company}
                onChange={(e) => handleChange(e, index)}
                placeholder="Company Name"
                className={`border rounded p-2 w-full ${
                  errors[index]?.company ? 'border-red-500' : ''
                }`}
              />
              {errors[index]?.company && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors[index].company}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`title-${index}`}
                className="block mb-1 font-medium"
              >
                Job Title
              </label>
              <input
                type="text"
                id="title"
                value={experience.title}
                onChange={(e) => handleChange(e, index)}
                placeholder="Job Title"
                className={`border rounded p-2 w-full ${
                  errors[index]?.title ? 'border-red-500' : ''
                }`}
              />
              {errors[index]?.title && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors[index].title}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor={`startDate-${index}`}
                className="block mb-1 font-medium"
              >
                Start Date
              </label>
              <input
                type="text"
                id="startDate"
                value={experience.startDate}
                onChange={(e) => handleChange(e, index)}
                placeholder="DD.MM.YYYY"
                className={`border rounded p-2 w-full ${
                  errors[index]?.startDate ? 'border-red-500' : ''
                }`}
              />
              {errors[index]?.startDate && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors[index].startDate}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`endDate-${index}`}
                className="block mb-1 font-medium"
              >
                End Date
              </label>
              <input
                type="text"
                id="endDate"
                value={experience.endDate}
                onChange={(e) => handleChange(e, index)}
                placeholder="DD.MM.YYYY (or 'Present')"
                className={`border rounded p-2 w-full ${
                  errors[index]?.endDate ? 'border-red-500' : ''
                }`}
              />
              {errors[index]?.endDate && (
                <p className="text-red-500 text-xs italic mt-1">
                  {errors[index].endDate}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor={`description-${index}`}
              className="block mb-1 font-medium"
            >
              Description
            </label>
            <textarea
              id="description"
              value={experience.description}
              onChange={(e) => handleChange(e, index)}
              placeholder="Describe your role and responsibilities"
              className="border rounded p-2 w-full h-24"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEntry}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
        Add Another Experience
      </button>
    </div>
  );
};

Experience.propTypes = {
  experienceList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  addEntry: PropTypes.func.isRequired,
  removeEntry: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default Experience;
