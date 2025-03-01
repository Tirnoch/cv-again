import { useRef } from 'react';
import PropTypes from 'prop-types';

const DataControls = ({ resetAllData, exportData, importData }) => {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      importData(event.target.result);
    };
    reader.readAsText(file);

    // Reset file input so the same file can be selected again
    e.target.value = null;
  };

  return (
    <div
      className="bg-white p-4 rounded shadow border border-gray-200"
      role="region"
      aria-labelledby="data-controls-heading"
    >
      <h2
        id="data-controls-heading"
        className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2"
      >
        Data Management
      </h2>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={resetAllData}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
          aria-label="Reset all data"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Reset All
        </button>

        <button
          onClick={exportData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
          aria-label="Export CV data as JSON file"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export CV
        </button>

        <button
          onClick={handleImportClick}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
          aria-label="Import CV data from JSON file"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Import CV
        </button>

        {/* Hidden file input for import */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".json"
          className="hidden"
          aria-hidden="true"
          tabIndex="-1"
        />
      </div>

      <div className="mt-3 text-xs text-gray-500" aria-live="polite">
        <p>• Data is automatically saved to your browser</p>
        <p>• Export your CV to save a backup</p>
        <p>• Import previously saved CV data</p>
      </div>
    </div>
  );
};

DataControls.propTypes = {
  resetAllData: PropTypes.func.isRequired,
  exportData: PropTypes.func.isRequired,
  importData: PropTypes.func.isRequired,
};

export default DataControls;
