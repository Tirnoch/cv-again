import PropTypes from 'prop-types';

const Personal = ({ handleChange, errors = {}, personal = {} }) => {
  return (
    <>
      <div className="bg-teal-100/40 border-2 border-teal-700/70 flex flex-col items-end flex-wrap flex-1 max-w-md p-2 rounded-md">
        <h2
          className="self-center text-2xl font-semibold mb-3"
          id="personal-heading"
        >
          Personal Info
        </h2>
        <div className="p-1 w-full flex flex-col">
          <div className="w-full flex">
            <label htmlFor="name" className="flex-1 flex justify-end pr-1">
              Name:{' '}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={personal.name || ''}
              onChange={handleChange}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`w-1/2 border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
          {errors.name && (
            <p
              id="name-error"
              className="text-red-500 text-xs italic self-end w-1/2 mt-1"
              aria-live="polite"
            >
              {errors.name}
            </p>
          )}
        </div>
        <div className="p-1 w-full flex flex-col">
          <div className="w-full flex">
            <label htmlFor="email" className="flex-1 flex justify-end pr-1">
              Email:{' '}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={personal.email || ''}
              onChange={handleChange}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`w-1/2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
          {errors.email && (
            <p
              id="email-error"
              className="text-red-500 text-xs italic self-end w-1/2 mt-1"
              aria-live="polite"
            >
              {errors.email}
            </p>
          )}
        </div>
        <div className="p-1 w-full flex flex-col">
          <div className="w-full flex">
            <label htmlFor="phone" className="flex-1 flex justify-end pr-1">
              Phone:{' '}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={personal.phone || ''}
              onChange={handleChange}
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={`w-1/2 border ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              } rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
          {errors.phone && (
            <p
              id="phone-error"
              className="text-red-500 text-xs italic self-end w-1/2 mt-1"
              aria-live="polite"
            >
              {errors.phone}
            </p>
          )}
        </div>
        <div className="p-1 w-full flex flex-col">
          <div className="w-full flex">
            <label htmlFor="location" className="flex-1 flex justify-end pr-1">
              Location:{' '}
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={personal.location || ''}
              onChange={handleChange}
              aria-invalid={errors.location ? 'true' : 'false'}
              aria-describedby={errors.location ? 'location-error' : undefined}
              className={`w-1/2 border ${
                errors.location ? 'border-red-500' : 'border-gray-300'
              } rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
          {errors.location && (
            <p
              id="location-error"
              className="text-red-500 text-xs italic self-end w-1/2 mt-1"
              aria-live="polite"
            >
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
  personal: PropTypes.object,
};

export default Personal;
