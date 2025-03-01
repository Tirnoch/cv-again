import { useState } from 'react';
import PropTypes from 'prop-types';

const Languages = ({ languages, handleChange }) => {
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('intermediate');

  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'fluent', label: 'Fluent' },
    { value: 'native', label: 'Native' },
  ];

  const addLanguage = () => {
    if (language.trim() === '') return;

    // Check if the language already exists
    const exists = languages.some(
      (lang) => lang.name.toLowerCase() === language.trim().toLowerCase()
    );

    if (!exists) {
      const newLanguage = {
        id: `lang-${Date.now()}`,
        name: language.trim(),
        level,
      };
      handleChange([...languages, newLanguage]);
      setLanguage('');
    }
  };

  const removeLanguage = (languageId) => {
    handleChange(languages.filter((lang) => lang.id !== languageId));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addLanguage();
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex gap-2 mb-4 flex-wrap">
          <input
            type="text"
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Language name (e.g. English, Spanish)"
            className="border rounded p-2 flex-grow"
          />
          <select
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border rounded p-2"
          >
            {proficiencyLevels.map((prof) => (
              <option key={prof.value} value={prof.value}>
                {prof.label}
              </option>
            ))}
          </select>
          <button
            onClick={addLanguage}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition whitespace-nowrap"
          >
            Add Language
          </button>
        </div>

        {languages.length === 0 ? (
          <p className="text-gray-500 italic">
            No languages added yet. Add some languages above.
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-2 border-b">Language</th>
                <th className="p-2 border-b">Proficiency</th>
                <th className="p-2 border-b w-16"></th>
              </tr>
            </thead>
            <tbody>
              {languages.map((lang) => (
                <tr key={lang.id} className="hover:bg-gray-50">
                  <td className="p-2 border-b">{lang.name}</td>
                  <td className="p-2 border-b capitalize">{lang.level}</td>
                  <td className="p-2 border-b">
                    <button
                      onClick={() => removeLanguage(lang.id)}
                      className="text-gray-400 hover:text-red-500 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

Languages.propTypes = {
  languages: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Languages;
