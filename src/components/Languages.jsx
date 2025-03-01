import PropTypes from 'prop-types';

const Languages = ({ languages, handleChange }) => {
  // Event handler to stop propagation
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // Handle adding a new language
  const handleAddLanguage = (e) => {
    stopPropagation(e);
    const newLanguages = [...languages, { name: '', level: 'Beginner' }];
    handleChange(newLanguages);
  };

  // Handle removing a language
  const handleRemoveLanguage = (e, index) => {
    stopPropagation(e);
    const newLanguages = languages.filter((_, i) => i !== index);
    handleChange(newLanguages);
  };

  // Handle language name change
  const handleLanguageChange = (e, index) => {
    stopPropagation(e);
    const { value } = e.target;
    const newLanguages = [...languages];
    newLanguages[index] = { ...newLanguages[index], name: value };
    handleChange(newLanguages);
  };

  // Handle language level change
  const handleLevelChange = (e, index) => {
    stopPropagation(e);
    const { value } = e.target;
    const newLanguages = [...languages];
    newLanguages[index] = { ...newLanguages[index], level: value };
    handleChange(newLanguages);
  };

  return (
    <div
      className="languages-section bg-indigo-50/60 border-2 border-indigo-700/30 p-3 rounded-md"
      onClick={stopPropagation}
      onMouseDown={stopPropagation}
      onTouchStart={stopPropagation}
    >
      {languages.map((language, index) => (
        <div key={index} className="language-item flex items-center gap-2 mb-2">
          <input
            type="text"
            value={language.name || ''}
            onChange={(e) => handleLanguageChange(e, index)}
            onMouseDown={stopPropagation}
            onTouchStart={stopPropagation}
            onKeyDown={stopPropagation}
            placeholder="Language name"
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={language.level || 'Beginner'}
            onChange={(e) => handleLevelChange(e, index)}
            onMouseDown={stopPropagation}
            onTouchStart={stopPropagation}
            onKeyDown={stopPropagation}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Fluent">Fluent</option>
            <option value="Native">Native</option>
          </select>
          <button
            onClick={(e) => handleRemoveLanguage(e, index)}
            className="p-1 text-red-500 hover:text-red-700 focus:outline-none"
            title="Remove language"
            aria-label={`Remove ${language.name || 'language'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ))}

      {/* Add Language Button */}
      <button
        onClick={handleAddLanguage}
        className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
        aria-label="Add another language"
      >
        Add Language
      </button>
    </div>
  );
};

Languages.propTypes = {
  languages: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Languages;
