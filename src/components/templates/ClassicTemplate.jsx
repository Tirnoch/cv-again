import PropTypes from 'prop-types';

const ClassicTemplate = ({
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
    <>
      <div className="bg-blue-300/60 border-2 border-blue-700 p-4 flex flex-col gap-4 items-center">
        <p className="text-3xl font-bold leading-8">{name}</p>
        <div className="flex gap-8 flex-wrap justify-center">
          <p>{email}</p>
          <p>{phone}</p>
          <p>{location}</p>
        </div>
      </div>
      <div className="bg-black/10 p-4 flex-1">
        <div className="mb-6">
          <h1 className="text-xl font-semibold border-b-2 border-black mb-2">
            Education
          </h1>
          <p>
            <span className="font-medium">School:</span> {schoolName}
          </p>
          <p>
            <span className="font-medium">Degree:</span> {schoolDegree}
          </p>
          <p>
            <span className="font-medium">Time Period:</span> {schoolStart} -{' '}
            {schoolEnd}
          </p>
        </div>
        <div>
          <h1 className="text-xl font-semibold border-b-2 border-black mb-2">
            Work Experience
          </h1>
          <p>
            <span className="font-medium">Company:</span> {companyName}
          </p>
          <p>
            <span className="font-medium">Position:</span> {companyTitle}
          </p>
          <p>
            <span className="font-medium">Time Period:</span> {companyStart} -{' '}
            {companyEnd}
          </p>
          <p>
            <span className="font-medium">Description:</span>{' '}
            {companyDescription}
          </p>
        </div>
      </div>
    </>
  );
};

ClassicTemplate.propTypes = {
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

export default ClassicTemplate;
