import PropTypes from 'prop-types';

const Education = ({ handleChange, errors = {} }) => {
  return (
    <>
      <div className="bg-teal-100/40 border-2 border-teal-700/70 flex flex-col items-end flex-wrap flex-1 max-w-md p-2 rounded-md">
        <h2 className="self-center text-2xl font-semibold mb-3">Education</h2>
        <div className="p-1 w-full flex flex-col">
          <div className="w-full flex">
            <label htmlFor={'school'} className="flex-1 flex justify-end pr-1">
              School:{' '}
            </label>
            <input
              type="text"
              id={'school'}
              onChange={handleChange}
              className={`w-1/2 border ${
                errors.school ? 'border-red-500' : 'border-gray-300'
              } rounded px-2 py-1`}
            />
          </div>
          {errors.school && (
            <p className="text-red-500 text-xs italic self-end w-1/2 mt-1">
              {errors.school}
            </p>
          )}
        </div>
        <div className="p-1 w-full flex flex-col">
          <div className="w-full flex">
            <label htmlFor={'degree'} className="flex-1 flex justify-end pr-1">
              Degree:{' '}
            </label>
            <input
              type="text"
              id={'degree'}
              onChange={handleChange}
              className={`w-1/2 border ${
                errors.degree ? 'border-red-500' : 'border-gray-300'
              } rounded px-2 py-1`}
            />
          </div>
          {errors.degree && (
            <p className="text-red-500 text-xs italic self-end w-1/2 mt-1">
              {errors.degree}
            </p>
          )}
        </div>
        <div className="p-1 w-full flex flex-col">
          <div className="w-full flex">
            <label
              htmlFor={'startDate'}
              className="flex-1 flex justify-end pr-1"
            >
              Start date:{' '}
            </label>
            <input
              type="text"
              id={'startDate'}
              onChange={handleChange}
              className={`w-1/2 border ${
                errors.startDate ? 'border-red-500' : 'border-gray-300'
              } rounded px-2 py-1`}
            />
          </div>
          {errors.startDate && (
            <p className="text-red-500 text-xs italic self-end w-1/2 mt-1">
              {errors.startDate}
            </p>
          )}
        </div>
        <div className="p-1 w-full flex flex-col">
          <div className="w-full flex">
            <label htmlFor={'endDate'} className="flex-1 flex justify-end pr-1">
              End date:{' '}
            </label>
            <input
              type="text"
              id={'endDate'}
              onChange={handleChange}
              className={`w-1/2 border ${
                errors.endDate ? 'border-red-500' : 'border-gray-300'
              } rounded px-2 py-1`}
            />
          </div>
          {errors.endDate && (
            <p className="text-red-500 text-xs italic self-end w-1/2 mt-1">
              {errors.endDate}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

Education.propTypes = {
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default Education;
