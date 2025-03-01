import PropTypes from 'prop-types';

const Experience = ({ handleChange, errors = {} }) => {
  return (
    <>
      <div className="bg-teal-100/40 border-2 border-teal-700/70 flex flex-col items-end flex-wrap flex-1 max-w-md p-2 rounded-md">
        <h2 className="self-center text-2xl font-semibold mb-3">Experience</h2>
        <div className="p-1 w-full flex flex-col">
          <div className="w-full flex">
            <label htmlFor={'company'} className="flex-1 flex justify-end pr-1">
              Company:{' '}
            </label>
            <input
              type="text"
              id={'company'}
              onChange={handleChange}
              className={`w-1/2 border ${
                errors.company ? 'border-red-500' : 'border-gray-300'
              } rounded px-2 py-1`}
            />
          </div>
          {errors.company && (
            <p className="text-red-500 text-xs italic self-end w-1/2 mt-1">
              {errors.company}
            </p>
          )}
        </div>
        <div className="p-1 w-full flex flex-col">
          <div className="w-full flex">
            <label htmlFor={'title'} className="flex-1 flex justify-end pr-1">
              Title:{' '}
            </label>
            <input
              type="text"
              id={'title'}
              onChange={handleChange}
              className={`w-1/2 border ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              } rounded px-2 py-1`}
            />
          </div>
          {errors.title && (
            <p className="text-red-500 text-xs italic self-end w-1/2 mt-1">
              {errors.title}
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
        <div className="p-1 w-full flex flex-col">
          <div className="w-full flex">
            <label
              htmlFor={'description'}
              className="flex-1 flex justify-end pr-1"
            >
              Description:{' '}
            </label>
            <textarea
              id={'description'}
              onChange={handleChange}
              className={`w-1/2 resize-none h-24 border ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              } rounded px-2 py-1`}
            />
          </div>
          {errors.description && (
            <p className="text-red-500 text-xs italic self-end w-1/2 mt-1">
              {errors.description}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

Experience.propTypes = {
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default Experience;
