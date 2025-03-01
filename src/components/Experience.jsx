import PropTypes from 'prop-types';

const Experience = ({
  experienceList,
  handleChange,
  addEntry,
  removeEntry,
  errors,
}) => {
  // Event handler to stop propagation
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // Custom handler to ensure proper propagation control and event handling
  const handleExperienceInput = (e, index) => {
    stopPropagation(e);
    handleChange(e, index);
  };

  return (
    <div
      role="region"
      aria-labelledby="experience-heading"
      onClick={stopPropagation}
      onMouseDown={stopPropagation}
      onTouchStart={stopPropagation}
    >
      <h3 id="experience-heading" className="sr-only">
        Professional Experience
      </h3>
      {experienceList.map((experience, index) => (
        <div
          key={experience.id}
          className="mb-6 pb-6 border-b last:border-b-0 border-gray-200"
          role="group"
          aria-labelledby={`experience-entry-${index}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3
              id={`experience-entry-${index}`}
              className="text-lg font-semibold"
            >
              Experience {index + 1}
            </h3>
            <button
              onClick={(e) => {
                stopPropagation(e);
                removeEntry(index);
              }}
              className="text-red-500 hover:text-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded-full p-1"
              disabled={experienceList.length <= 1}
              title={
                experienceList.length <= 1
                  ? 'Cannot remove the only experience entry'
                  : 'Remove this experience entry'
              }
              aria-label={`Remove experience ${index + 1}`}
              aria-disabled={experienceList.length <= 1}
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
                htmlFor={`company-${index}`}
                className="block mb-1 font-medium"
                id={`company-label-${index}`}
              >
                Company
              </label>
              <input
                type="text"
                id={`company-${index}`}
                name="company"
                value={experience.company}
                onChange={(e) => handleExperienceInput(e, index)}
                onMouseDown={stopPropagation}
                onTouchStart={stopPropagation}
                onKeyDown={stopPropagation}
                placeholder="Company Name"
                className={`border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[index]?.company ? 'border-red-500' : ''
                }`}
                aria-labelledby={`company-label-${index}`}
                aria-invalid={errors[index]?.company ? 'true' : 'false'}
                aria-describedby={
                  errors[index]?.company ? `company-error-${index}` : undefined
                }
              />
              {errors[index]?.company && (
                <p
                  className="text-red-500 text-xs italic mt-1"
                  id={`company-error-${index}`}
                  aria-live="polite"
                >
                  {errors[index].company}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`title-${index}`}
                className="block mb-1 font-medium"
                id={`title-label-${index}`}
              >
                Job Title
              </label>
              <input
                type="text"
                id={`title-${index}`}
                name="title"
                value={experience.title}
                onChange={(e) => handleExperienceInput(e, index)}
                onMouseDown={stopPropagation}
                onTouchStart={stopPropagation}
                onKeyDown={stopPropagation}
                placeholder="Job Title"
                className={`border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[index]?.title ? 'border-red-500' : ''
                }`}
                aria-labelledby={`title-label-${index}`}
                aria-invalid={errors[index]?.title ? 'true' : 'false'}
                aria-describedby={
                  errors[index]?.title ? `title-error-${index}` : undefined
                }
              />
              {errors[index]?.title && (
                <p
                  className="text-red-500 text-xs italic mt-1"
                  id={`title-error-${index}`}
                  aria-live="polite"
                >
                  {errors[index].title}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <div>
              <label
                htmlFor={`startDate-${index}`}
                className="block mb-1 font-medium"
                id={`exp-startDate-label-${index}`}
              >
                Start Date (DD.MM.YYYY)
              </label>
              <input
                type="text"
                id={`startDate-${index}`}
                name="startDate"
                value={experience.startDate}
                onChange={(e) => handleExperienceInput(e, index)}
                onMouseDown={stopPropagation}
                onTouchStart={stopPropagation}
                onKeyDown={stopPropagation}
                placeholder="DD.MM.YYYY"
                className={`border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[index]?.startDate ? 'border-red-500' : ''
                }`}
                aria-labelledby={`exp-startDate-label-${index}`}
                aria-invalid={errors[index]?.startDate ? 'true' : 'false'}
                aria-describedby={
                  errors[index]?.startDate
                    ? `startDate-error-${index}`
                    : undefined
                }
              />
              {errors[index]?.startDate && (
                <p
                  className="text-red-500 text-xs italic mt-1"
                  id={`startDate-error-${index}`}
                  aria-live="polite"
                >
                  {errors[index].startDate}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`endDate-${index}`}
                className="block mb-1 font-medium"
                id={`exp-endDate-label-${index}`}
              >
                End Date (DD.MM.YYYY or &quot;Present&quot;)
              </label>
              <input
                type="text"
                id={`endDate-${index}`}
                name="endDate"
                value={experience.endDate}
                onChange={(e) => handleExperienceInput(e, index)}
                onMouseDown={stopPropagation}
                onTouchStart={stopPropagation}
                onKeyDown={stopPropagation}
                placeholder="DD.MM.YYYY or Present"
                className={`border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[index]?.endDate ? 'border-red-500' : ''
                }`}
                aria-labelledby={`exp-endDate-label-${index}`}
                aria-invalid={errors[index]?.endDate ? 'true' : 'false'}
                aria-describedby={
                  errors[index]?.endDate ? `endDate-error-${index}` : undefined
                }
              />
              {errors[index]?.endDate && (
                <p
                  className="text-red-500 text-xs italic mt-1"
                  id={`endDate-error-${index}`}
                  aria-live="polite"
                >
                  {errors[index].endDate}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor={`description-${index}`}
              className="block mb-1 font-medium"
              id={`description-label-${index}`}
            >
              Description{' '}
              <span className="text-sm font-normal">
                (use bullet points with * at start of line)
              </span>
            </label>
            <textarea
              id={`description-${index}`}
              name="description"
              value={experience.description || ''}
              onChange={(e) => handleExperienceInput(e, index)}
              onMouseDown={stopPropagation}
              onTouchStart={stopPropagation}
              onKeyDown={stopPropagation}
              rows="4"
              placeholder="Describe your responsibilities and achievements"
              className={`border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors[index]?.description ? 'border-red-500' : ''
              }`}
              aria-labelledby={`description-label-${index}`}
              aria-invalid={errors[index]?.description ? 'true' : 'false'}
              aria-describedby={
                errors[index]?.description
                  ? `description-error-${index}`
                  : undefined
              }
            ></textarea>
            {errors[index]?.description && (
              <p
                className="text-red-500 text-xs italic mt-1"
                id={`description-error-${index}`}
                aria-live="polite"
              >
                {errors[index].description}
              </p>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={(e) => {
          stopPropagation(e);
          addEntry();
        }}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        aria-label="Add another experience entry"
      >
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
      endDate: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  addEntry: PropTypes.func.isRequired,
  removeEntry: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default Experience;
