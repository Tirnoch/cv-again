import PropTypes from 'prop-types';

const Experience = ({ handleChange }) => {
  return (
    <>
      <div className="bg-teal-100/40 border-2 border-teal-700/70 flex flex-col items-end flex-wrap flex-1 max-w-md p-2 rounded-md">
        <h2 className="self-center text-2xl font-semibold mb-3">Experience</h2>
        <div className="p-1 w-full flex">
          <label htmlFor={'company'} className="flex-1 flex justify-end pr-1">
            Company:{' '}
          </label>
          <input
            type="text"
            id={'company'}
            onChange={handleChange}
            className="w-1/2 border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="p-1 w-full flex">
          <label htmlFor={'title'} className="flex-1 flex justify-end pr-1">
            Title:{' '}
          </label>
          <input
            type="text"
            id={'title'}
            onChange={handleChange}
            className="w-1/2 border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="p-1 w-full flex">
          <label htmlFor={'startDate'} className="flex-1 flex justify-end pr-1">
            Start date:{' '}
          </label>
          <input
            type="text"
            id={'startDate'}
            onChange={handleChange}
            className="w-1/2 border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="p-1 w-full flex">
          <label htmlFor={'endDate'} className="flex-1 flex justify-end pr-1">
            End date:{' '}
          </label>
          <input
            type="text"
            id={'endDate'}
            onChange={handleChange}
            className="w-1/2 border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <div className="p-1 w-full flex">
          <label
            htmlFor={'description'}
            className="flex-1 flex justify-end pr-1"
          >
            Description:{' '}
          </label>
          <textarea
            id={'description'}
            onChange={handleChange}
            className="w-1/2 resize-none h-24 border border-gray-300 rounded px-2 py-1"
          />
        </div>
      </div>
    </>
  );
};

Experience.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Experience;
