import PropTypes from 'prop-types';

const ModernTemplate = ({
  name,
  email,
  phone,
  location,
  schoolName,
  schoolDegree,
  schoolStart,
  schoolEnd,
  companyName,
  companyTitle,
  companyStart,
  companyEnd,
  companyDescription,
}) => {
  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="bg-slate-800 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{name}</h1>
        <div className="flex flex-wrap gap-4 text-slate-300">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>{email}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>{phone}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 bg-white">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-300">
            Experience
          </h2>
          <div className="mb-2">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold text-slate-800">
                {companyTitle}
              </h3>
              <span className="text-sm text-slate-500">
                {companyStart} - {companyEnd}
              </span>
            </div>
            <div className="text-slate-600 font-medium">{companyName}</div>
            <p className="mt-2 text-slate-700">{companyDescription}</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-300">
            Education
          </h2>
          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold text-slate-800">
                {schoolDegree}
              </h3>
              <span className="text-sm text-slate-500">
                {schoolStart} - {schoolEnd}
              </span>
            </div>
            <div className="text-slate-600 font-medium">{schoolName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

ModernTemplate.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  schoolName: PropTypes.string.isRequired,
  schoolDegree: PropTypes.string.isRequired,
  schoolStart: PropTypes.string.isRequired,
  schoolEnd: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  companyTitle: PropTypes.string.isRequired,
  companyStart: PropTypes.string.isRequired,
  companyEnd: PropTypes.string.isRequired,
  companyDescription: PropTypes.string.isRequired,
};

export default ModernTemplate;
