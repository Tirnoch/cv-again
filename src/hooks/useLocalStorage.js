import { useState, useEffect } from 'react';

/**
 * Custom hook to persist state in localStorage
 * @param {string} key - The localStorage key
 * @param {*} initialValue - The initial value or function to get initial value
 * @returns {Array} [storedValue, setValue] - State and setter function
 */
function useLocalStorage(key, initialValue) {
  // Get from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      // Parse stored json or return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
