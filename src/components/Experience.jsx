import '../input.css';
const Experience = ({ handleChange }) => {
  return (
    <>
      <div className="input-container">
        <div className="input-segment">
          <label htmlFor="company">Company: </label>
          <input
            type="text"
            id="company"
            onChange={handleChange}
            name="benim adim"
          />
        </div>
        <div className="input-segment">
          <label htmlFor="title">Title: </label>
          <input type="text" id="title" onChange={handleChange} />
        </div>
        <div className="input-segment">
          <label htmlFor="startDate">Start: </label>
          <input type="text" id="startDate" onChange={handleChange} />
        </div>
        <div className="input-segment">
          <label htmlFor="endDate">End: </label>
          <input type="text" id="endDate" onChange={handleChange} />
        </div>
        <div className="input-segment">
          <label htmlFor="description">Description: </label>
          <textarea id="description" rows="3" onChange={handleChange} />
        </div>
      </div>
    </>
  );
};

export default Experience;
