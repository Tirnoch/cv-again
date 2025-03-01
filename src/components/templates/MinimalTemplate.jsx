import PropTypes from 'prop-types';

const MinimalTemplate = ({
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
    <div className="flex flex-col min-h-full bg-white p-10 font-light">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-normal tracking-wide mb-3">{name}</h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
          <span>{email}</span>
          <span>•</span>
          <span>{phone}</span>
          <span>•</span>
          <span>{location}</span>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full">
        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-lg uppercase tracking-widest mb-4 text-gray-500 border-b border-gray-200 pb-1">
            Experience
          </h2>
          <div className="mb-5">
            <div className="flex justify-between mb-1">
              <h3 className="font-medium">{companyTitle}</h3>
              <span className="text-sm text-gray-500">
                {companyStart} - {companyEnd}
              </span>
            </div>
            <p className="text-gray-600 mb-2">{companyName}</p>
            <p className="text-sm text-gray-700">{companyDescription}</p>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-lg uppercase tracking-widest mb-4 text-gray-500 border-b border-gray-200 pb-1">
            Education
          </h2>
          <div>
            <div className="flex justify-between mb-1">
              <h3 className="font-medium">{schoolDegree}</h3>
              <span className="text-sm text-gray-500">
                {schoolStart} - {schoolEnd}
              </span>
            </div>
            <p className="text-gray-600">{schoolName}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

MinimalTemplate.propTypes = {
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

export default MinimalTemplate;
