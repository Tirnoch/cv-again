import PropTypes from 'prop-types';

const Personal = ({ handleChange, errors = {} }) => {
  return (
    <>
      <div className="bg-teal-100/40 border-2 border-teal-700/70 flex flex-col items-end flex-wrap flex-1 max-w-md p-2 rounded-md">
        <h2 className="self-center text-2xl font-semibold mb-3">
          Personal Info
        </h2>
        <div className="p-1 w-full flex flex-col">
          <div className="w-full flex">
            <label htmlFor={'name'} className="flex-1 flex justify-end pr-1">
              Name:{' '}
            </label>
            <input
              type="text"
              id={'name'}
              onChange={handleChange}
              className={`w-1/2 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded px-2 py-1`}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs italic self-end w-1/2 mt-1">
              {errors.name}
            </p>
          )}
        </div>
        <div className="p-1 w-full flex flex-col">
          <div className="w-full flex">
            <label htmlFor={'email'} className="flex-1 flex justify-end pr-1">
              Email:{' '}
            </label>
            <input
              type="text"
              id={'email'}
              onChange={handleChange}
              className={`w-1/2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded px-2 py-1`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs italic self-end w-1/2 mt-1">
              {errors.email}
            </p>
          )}
        </div>
        <div className="p-1 w-full flex flex-col">
          <div className="w-full flex">
            <label htmlFor={'phone'} className="flex-1 flex justify-end pr-1">
              Phone:{' '}
            </label>
            <input
              type="text"
              id={'phone'}
              onChange={handleChange}
              className={`w-1/2 border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } rounded px-2 py-1`}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-xs italic self-end w-1/2 mt-1">
              {errors.phone}
            </p>
          )}
        </div>
        <div className="p-1 w-full flex flex-col">
          <div className="w-full flex">
            <label
              htmlFor={'location'}
              className="flex-1 flex justify-end pr-1"
            >
              Location:{' '}
            </label>
            <input
              type="text"
              id={'location'}
              onChange={handleChange}
              className={`w-1/2 border ${
                errors.location ? 'border-red-500' : 'border-gray-300'
              } rounded px-2 py-1`}
            />
          </div>
          {errors.location && (
            <p className="text-red-500 text-xs italic self-end w-1/2 mt-1">
              {errors.location}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

Personal.propTypes = {
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default Personal;
