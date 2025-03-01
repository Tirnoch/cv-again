import { useState } from 'react';

/**
 * Custom hook for managing form errors
 * @param {Object} initialErrors - Initial error state
 * @returns {Object} Object containing errors state and utility functions
 */
export const useFormErrors = (initialErrors = {}) => {
  const [errors, setErrors] = useState(initialErrors);

  /**
   * Update an error for a specific field
   * @param {string} section - The section of the form (e.g., 'personal', 'education')
   * @param {string} field - The field name
   * @param {string} message - The error message
   * @param {number} index - Optional index for array fields (e.g., education[0])
   */
  const updateFieldError = (section, field, message, index = null) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (!newErrors[section]) {
        newErrors[section] = {};
      }

      if (index !== null) {
        if (!newErrors[section][index]) {
          newErrors[section][index] = {};
        }
        newErrors[section][index][field] = message;
      } else {
        newErrors[section][field] = message;
      }

      return newErrors;
    });
  };

  /**
   * Remove an error for a specific field or all errors for a section/index
   * @param {string} section - The section of the form
   * @param {string|number} fieldOrIndex - The field name or index
   * @param {number} index - Optional index for array fields
   */
  const removeFieldError = (section, fieldOrIndex = null, index = null) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      // If fieldOrIndex is a number, treat it as an index and remove all errors for that index
      if (typeof fieldOrIndex === 'number') {
        if (newErrors[section]) {
          delete newErrors[section][fieldOrIndex];
        }
        return newErrors;
      }

      // If fieldOrIndex is null, remove all errors for the section
      if (fieldOrIndex === null) {
        delete newErrors[section];
        return newErrors;
      }

      // Otherwise, treat fieldOrIndex as a field name
      if (index !== null) {
        if (newErrors[section] && newErrors[section][index]) {
          delete newErrors[section][index][fieldOrIndex];
        }
      } else if (newErrors[section]) {
        delete newErrors[section][fieldOrIndex];
      }

      return newErrors;
    });
  };

  /**
   * Validate a field and update errors accordingly
   * @param {string} section - The section of the form
   * @param {string} field - The field name
   * @param {*} value - The field value
   * @param {Function} validationFn - The validation function
   * @param {string} errorMessage - The error message if validation fails
   * @param {number} index - Optional index for array fields
   * @returns {boolean} - Whether the field is valid
   */
  const validateField = (
    section,
    field,
    value,
    validationFn,
    errorMessage,
    index = null
  ) => {
    const isValid = validationFn(value);

    if (!isValid) {
      updateFieldError(section, field, errorMessage, index);
    } else {
      removeFieldError(section, field, index);
    }

    return isValid;
  };

  return {
    errors,
    setErrors,
    updateFieldError,
    removeFieldError,
    validateField,
  };
};

export default useFormErrors;
