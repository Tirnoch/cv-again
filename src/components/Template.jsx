import '../template.css';

const Template = ({
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
      <div className="primary-segment">
        <p id="title-name">{name}</p>
        <div className="personal-info">
          <p>{email}</p>
          <p>{phone}</p>
          <p>{location}</p>
        </div>
      </div>
      <div className="secondary-segment">
        <div className="minor-segment">
          <h1>Education</h1>
          <p>School: {schoolName}</p>
          <p>Degree: {schoolDegree}</p>
          <p>
            Time Period: {schoolStart} - {schoolEnd}
          </p>
        </div>
        <br />
        <div className="minor-segment">
          <h1>Work Experience</h1>
          <p>Company: {companyName}</p>
          <p>Position: {companyTitle}</p>
          <p>
            Time Perood: {companyStart} - {companyEnd}
          </p>
          <p>Descrtiption: {companyDescription}</p>
        </div>
      </div>
    </>
  );
};

export default Template;
