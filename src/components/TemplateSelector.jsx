import PropTypes from 'prop-types';
import { useState } from 'react';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

const TemplateSelector = ({ cvData }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [previewMode, setPreviewMode] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const renderTemplate = () => {
    const templateProps = {
      personal: cvData.personal,
      educationList: cvData.educationList,
      experienceList: cvData.experienceList,
      skills: cvData.skills,
      projects: cvData.projects,
      languages: cvData.languages,
      visibleSections: cvData.visibleSections,
    };

    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate {...templateProps} />;
      case 'minimal':
        return <MinimalTemplate {...templateProps} />;
      default:
        return <ClassicTemplate {...templateProps} />;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Controls - hidden when printing */}
      <div
        className={`bg-white p-4 border-b ${
          previewMode ? 'hidden' : 'flex'
        } md:flex justify-between items-center print:hidden`}
      >
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold">Template:</h2>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded transition ${
                selectedTemplate === 'classic'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedTemplate('classic')}
            >
              Classic
            </button>
            <button
              className={`px-3 py-1 rounded transition ${
                selectedTemplate === 'modern'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedTemplate('modern')}
            >
              Modern
            </button>
            <button
              className={`px-3 py-1 rounded transition ${
                selectedTemplate === 'minimal'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedTemplate('minimal')}
            >
              Minimal
            </button>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button
            className={`px-3 py-1 rounded transition ${
              previewMode
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? 'Exit Preview' : 'Preview Mode'}
          </button>
          <button
            className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-1"
            onClick={handlePrint}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Print
          </button>
        </div>
      </div>

      {/* Template with print styles */}
      <div
        className={`flex-1 ${
          previewMode ? 'bg-gray-100 p-8 flex justify-center items-start' : ''
        }`}
      >
        <div
          className={`bg-white ${
            previewMode ? 'shadow-xl w-[21cm] min-h-[29.7cm]' : 'h-full'
          } overflow-hidden`}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

TemplateSelector.propTypes = {
  cvData: PropTypes.shape({
    personal: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    }).isRequired,
    educationList: PropTypes.array.isRequired,
    experienceList: PropTypes.array.isRequired,
    skills: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    languages: PropTypes.array.isRequired,
    visibleSections: PropTypes.array.isRequired,
  }).isRequired,
};

export default TemplateSelector;
