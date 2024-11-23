const PersonalInput = ({ data, fetchName }) => {
  return (
    <>
      <div className="InputSegment">
        <label htmlFor="inputNname">Name: </label>
        <input type="text" id="inputName" placeholder={data.name} />
        <button type="submit" onClick={fetchName}>
          Submit
        </button>
        <h1>{data.name}</h1>
      </div>
    </>
  );
};

export default PersonalInput;
