import '../input.css';
const Personal = ({ handleChange }) => {
  return (
    <>
      <div className="input-container">
        <div className="input-segment">
          <label htmlFor={'name'}>Name: </label>
          <input type="text" id={'name'} onChange={handleChange} />
        </div>
        <div className="input-segment">
          <label htmlFor={'email'}>Email: </label>
          <input type="text" id={'email'} onChange={handleChange} />
        </div>
        <div className="input-segment">
          <label htmlFor={'phone'}>Phone: </label>
          <input type="text" id={'phone'} onChange={handleChange} />
        </div>
        <div className="input-segment">
          <label htmlFor={'location'}>Location: </label>
          <input type="text" id={'location'} onChange={handleChange} />
        </div>
      </div>
    </>
  );
};

export default Personal;
