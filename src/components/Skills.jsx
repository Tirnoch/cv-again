import { useState } from 'react';
import PropTypes from 'prop-types';

const Skills = ({ skills, handleChange }) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() === '') return;
    const skill = newSkill.trim();

    // Only add the skill if it doesn't already exist
    if (!skills.includes(skill)) {
      handleChange([...skills, skill]);
    }

    setNewSkill('');
  };

  const removeSkill = (skillToRemove) => {
    handleChange(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex">
          <input
            type="text"
            id="skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a skill (e.g. React, JavaScript, Design)"
            className="border rounded p-2 flex-1"
          />
          <button
            onClick={addSkill}
            className="ml-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {skills.length === 0 ? (
            <p className="text-gray-500 italic">
              No skills added yet. Add some skills above.
            </p>
          ) : (
            skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-full px-3 py-1 flex items-center group"
              >
                <span>{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

Skills.propTypes = {
  skills: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Skills;
