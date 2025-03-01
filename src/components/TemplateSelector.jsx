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
      sectionOrder: cvData.sectionOrder,
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
        role="toolbar"
        aria-label="CV template controls"
      >
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold" id="template-selector">
            Template:
          </h2>
          <div
            className="flex space-x-2"
            role="radiogroup"
            aria-labelledby="template-selector"
          >
            <button
              className={`px-3 py-1 rounded transition ${
                selectedTemplate === 'classic'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              onClick={() => setSelectedTemplate('classic')}
              aria-pressed={selectedTemplate === 'classic'}
              role="radio"
              aria-checked={selectedTemplate === 'classic'}
            >
              Classic
            </button>
            <button
              className={`px-3 py-1 rounded transition ${
                selectedTemplate === 'modern'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              onClick={() => setSelectedTemplate('modern')}
              aria-pressed={selectedTemplate === 'modern'}
              role="radio"
              aria-checked={selectedTemplate === 'modern'}
            >
              Modern
            </button>
            <button
              className={`px-3 py-1 rounded transition ${
                selectedTemplate === 'minimal'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              onClick={() => setSelectedTemplate('minimal')}
              aria-pressed={selectedTemplate === 'minimal'}
              role="radio"
              aria-checked={selectedTemplate === 'minimal'}
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
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
            onClick={() => setPreviewMode(!previewMode)}
            aria-pressed={previewMode}
            aria-label={
              previewMode ? 'Exit preview mode' : 'Enter preview mode'
            }
          >
            {previewMode ? 'Exit Preview' : 'Preview Mode'}
          </button>
          <button
            className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 transition flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            onClick={handlePrint}
            aria-label="Print or save CV as PDF"
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
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-1 1v4h10z"
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
        aria-live="polite"
      >
        <div
          className={`bg-white ${
            previewMode ? 'shadow-xl w-[21cm] min-h-[29.7cm]' : 'h-full'
          } overflow-hidden`}
          role="region"
          aria-label="CV preview"
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
    sectionOrder: PropTypes.array.isRequired,
  }).isRequired,
};

export default TemplateSelector;
