import { useCallback } from 'react';

/**
 * Custom hook for email validation
 * @returns {Function} A function to validate email addresses
 */
export const useEmailValidation = () => {
  return useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);
};

/**
 * Custom hook for phone number validation
 * @returns {Function} A function to validate phone numbers
 */
export const usePhoneValidation = () => {
  return useCallback((phone) => {
    const phoneRegex =
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/;
    return phoneRegex.test(phone);
  }, []);
};

/**
 * Custom hook for required field validation
 * @returns {Function} A function to validate required fields
 */
export const useRequiredValidation = () => {
  return useCallback((value) => {
    return value && value.trim() !== '';
  }, []);
};

/**
 * Custom hook for date validation
 * @returns {Function} A function to validate dates in DD.MM.YYYY format or 'Present'
 */
export const useDateValidation = () => {
  return useCallback((date) => {
    // Empty date is valid (will be handled by required field validation if needed)
    if (!date || date.trim() === '') return true;

    // Accept 'Present' or 'present' as valid
    if (date.trim().toLowerCase() === 'present') return true;

    // Simple date validation for format DD.MM.YYYY or similar patterns
    const dateRegex = /^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{2,4})$/;
    return dateRegex.test(date);
  }, []);
};

/**
 * Combined validation hook that returns all validation functions
 * @returns {Object} An object containing all validation functions
 */
export const useFormValidation = () => {
  const validateEmail = useEmailValidation();
  const validatePhone = usePhoneValidation();
  const validateRequired = useRequiredValidation();
  const validateDate = useDateValidation();

  return {
    validateEmail,
    validatePhone,
    validateRequired,
    validateDate,
  };
};

export default useFormValidation;
