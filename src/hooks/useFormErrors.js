import { useState } from 'react';

/**
 * Custom hook for managing form errors
 * @param {Object} initialErrors - Initial error state
 * @returns {Array} [errors, setErrors, updateFieldError, removeFieldError, validateField]
 */
const useFormErrors = (initialErrors = {}) => {
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
   * Remove an error for a specific field
   * @param {string} section - The section of the form
   * @param {string} field - The field name
   * @param {number} index - Optional index for array fields
   */
  const removeFieldError = (section, field, index = null) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (index !== null) {
        if (newErrors[section] && newErrors[section][index]) {
          delete newErrors[section][index][field];
        }
      } else if (newErrors[section]) {
        delete newErrors[section][field];
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

  return [errors, setErrors, updateFieldError, removeFieldError, validateField];
};

export default useFormErrors;
