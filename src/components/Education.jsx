import '../input.css';
const Education = ({ handleChange }) => {
  return (
    <>
      <div className="input-container">
        <h2>Education Info</h2>
        <div className="input-segment">
          <label htmlFor={'school'}>School: </label>
          <input type="text" id={'school'} onChange={handleChange} />
        </div>
        <div className="input-segment">
          <label htmlFor={'degree'}>Degree: </label>
          <input type="text" id={'degree'} onChange={handleChange} />
        </div>
        <div className="input-segment">
          <label htmlFor={'startDate'}>Start: </label>
          <input type="text" id={'startDate'} onChange={handleChange} />
        </div>
        <div className="input-segment">
          <label htmlFor={'endDate'}>End: </label>
          <input type="text" id={'endDate'} onChange={handleChange} />
        </div>
      </div>
    </>
  );
};

export default Education;
