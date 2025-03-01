import PropTypes from 'prop-types';

const Education = ({
  educationList,
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
  const handleEducationInput = (e, index) => {
    stopPropagation(e);
    handleChange(e, index);
  };

  return (
    <div
      role="region"
      aria-labelledby="education-heading"
      onClick={stopPropagation}
      onMouseDown={stopPropagation}
      onTouchStart={stopPropagation}
    >
      <h3 id="education-heading" className="sr-only">
        Education History
      </h3>
      {educationList.map((education, index) => (
        <div
          key={education.id}
          className="mb-4 pb-4 border-b last:border-b-0"
          role="group"
          aria-labelledby={`education-entry-${index}`}
        >
          <div className="flex justify-between items-center mb-2">
            <h3
              id={`education-entry-${index}`}
              className="text-lg font-semibold"
            >
              Education {index + 1}
            </h3>
            <button
              onClick={(e) => {
                stopPropagation(e);
                removeEntry(index);
              }}
              className="text-red-500 hover:text-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded"
              disabled={educationList.length <= 1}
              title={
                educationList.length <= 1
                  ? 'Cannot remove the only education entry'
                  : 'Remove this education entry'
              }
              aria-label={`Remove education ${index + 1}`}
              aria-disabled={educationList.length <= 1}
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
                htmlFor={`school-${index}`}
                className="block mb-1 font-medium"
                id={`school-label-${index}`}
              >
                School
              </label>
              <input
                type="text"
                id={`school-${index}`}
                name="school"
                value={education.school}
                onChange={(e) => handleEducationInput(e, index)}
                onMouseDown={stopPropagation}
                onTouchStart={stopPropagation}
                onKeyDown={stopPropagation}
                placeholder="University or School Name"
                className={`border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[index]?.school ? 'border-red-500' : ''
                }`}
                aria-labelledby={`school-label-${index}`}
                aria-invalid={errors[index]?.school ? 'true' : 'false'}
                aria-describedby={
                  errors[index]?.school ? `school-error-${index}` : undefined
                }
              />
              {errors[index]?.school && (
                <p
                  className="text-red-500 text-xs italic mt-1"
                  id={`school-error-${index}`}
                  aria-live="polite"
                >
                  {errors[index].school}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`degree-${index}`}
                className="block mb-1 font-medium"
                id={`degree-label-${index}`}
              >
                Degree / Field of Study
              </label>
              <input
                type="text"
                id={`degree-${index}`}
                name="degree"
                value={education.degree}
                onChange={(e) => handleEducationInput(e, index)}
                onMouseDown={stopPropagation}
                onTouchStart={stopPropagation}
                onKeyDown={stopPropagation}
                placeholder="Degree and Field of Study"
                className={`border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[index]?.degree ? 'border-red-500' : ''
                }`}
                aria-labelledby={`degree-label-${index}`}
                aria-invalid={errors[index]?.degree ? 'true' : 'false'}
                aria-describedby={
                  errors[index]?.degree ? `degree-error-${index}` : undefined
                }
              />
              {errors[index]?.degree && (
                <p
                  className="text-red-500 text-xs italic mt-1"
                  id={`degree-error-${index}`}
                  aria-live="polite"
                >
                  {errors[index].degree}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <div>
              <label
                htmlFor={`startDate-${index}`}
                className="block mb-1 font-medium"
                id={`edu-startDate-label-${index}`}
              >
                Start Date (DD.MM.YYYY)
              </label>
              <input
                type="text"
                id={`startDate-${index}`}
                name="startDate"
                value={education.startDate}
                onChange={(e) => handleEducationInput(e, index)}
                onMouseDown={stopPropagation}
                onTouchStart={stopPropagation}
                onKeyDown={stopPropagation}
                placeholder="DD.MM.YYYY"
                className={`border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[index]?.startDate ? 'border-red-500' : ''
                }`}
                aria-labelledby={`edu-startDate-label-${index}`}
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
                id={`edu-endDate-label-${index}`}
              >
                End Date (DD.MM.YYYY)
              </label>
              <input
                type="text"
                id={`endDate-${index}`}
                name="endDate"
                value={education.endDate}
                onChange={(e) => handleEducationInput(e, index)}
                onMouseDown={stopPropagation}
                onTouchStart={stopPropagation}
                onKeyDown={stopPropagation}
                placeholder="DD.MM.YYYY or Present"
                className={`border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors[index]?.endDate ? 'border-red-500' : ''
                }`}
                aria-labelledby={`edu-endDate-label-${index}`}
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
        </div>
      ))}

      <button
        onClick={(e) => {
          stopPropagation(e);
          addEntry();
        }}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
        aria-label="Add another education entry"
      >
        Add Another Education
      </button>
    </div>
  );
};

Education.propTypes = {
  educationList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      school: PropTypes.string.isRequired,
      degree: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string,
    })
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  addEntry: PropTypes.func.isRequired,
  removeEntry: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default Education;
