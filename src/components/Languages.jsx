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
      <h2 className="text-xl font-semibold mb-4" id="languages-heading">
        Languages
      </h2>
      <div
        className="flex flex-col"
        role="region"
        aria-labelledby="languages-heading"
      >
        <div className="flex gap-2 mb-4 flex-wrap">
          <div className="flex-grow">
            <label htmlFor="language-input" className="sr-only">
              Language name
            </label>
            <input
              type="text"
              id="language-input"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Language name (e.g. English, Spanish)"
              className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-describedby="language-instructions"
            />
          </div>
          <div>
            <label htmlFor="level-select" className="sr-only">
              Proficiency level
            </label>
            <select
              id="level-select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {proficiencyLevels.map((prof) => (
                <option key={prof.value} value={prof.value}>
                  {prof.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={addLanguage}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
            aria-label="Add language"
          >
            Add Language
          </button>
        </div>
        <p id="language-instructions" className="sr-only">
          Type a language name and select proficiency level, then press Enter or
          click Add Language button
        </p>

        <div aria-live="polite" aria-relevant="additions removals">
          {languages.length === 0 ? (
            <p className="text-gray-500 italic">
              No languages added yet. Add some languages above.
            </p>
          ) : (
            <table
              className="w-full text-left border-collapse"
              aria-label="Languages list"
            >
              <thead>
                <tr>
                  <th scope="col" className="p-2 border-b">
                    Language
                  </th>
                  <th scope="col" className="p-2 border-b">
                    Proficiency
                  </th>
                  <th
                    scope="col"
                    className="p-2 border-b w-16"
                    aria-label="Actions"
                  ></th>
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
                        className="text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded-full p-1"
                        aria-label={`Remove ${lang.name}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
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
    </div>
  );
};

Languages.propTypes = {
  languages: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Languages;
