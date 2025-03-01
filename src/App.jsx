import {
  useEffect,
  useState,
  lazy,
  Suspense,
  useCallback,
  useMemo,
} from 'react';
// Use code splitting with lazy loading for components
const Personal = lazy(() => import('./components/Personal'));
const Education = lazy(() => import('./components/Education'));
const Experience = lazy(() => import('./components/Experience'));
const TemplateSelector = lazy(() => import('./components/TemplateSelector'));
const DataControls = lazy(() => import('./components/DataControls'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Languages = lazy(() => import('./components/Languages'));
// Use @hello-pangea/dnd - a React 18 compatible fork of react-beautiful-dnd
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Import custom hooks
import useFormValidation from './hooks/useValidation';
import { useFormErrors } from './hooks/useFormErrors';
import { useCV, ACTIONS } from './context/CVContext';

// Loading component while lazy components load
const LoadingComponent = () => (
  <div className="flex justify-center items-center p-4 text-gray-500">
    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    Loading...
  </div>
);

const App = () => {
  // Use custom validation hooks
  const { validateEmail, validatePhone, validateRequired, validateDate } =
    useFormValidation();

  // Use CV context for state management
  const { state, dispatch } = useCV();
  const {
    personal,
    educationList,
    experienceList,
    skills,
    projects,
    languages,
    sectionOrder,
    collapsedSections,
  } = state;

  // State to ensure the dnd context is only rendered after mount
  const [isDndEnabled, setIsDndEnabled] = useState(false);
  // State for loading during operations
  const [isLoading, setIsLoading] = useState(false);

  // Enable DnD after component mount to avoid hydration issues
  useEffect(() => {
    // Add a small delay to ensure React has fully rendered
    const timer = setTimeout(() => {
      setIsDndEnabled(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Use custom error handling hook
  const { errors, validateField, removeFieldError } = useFormErrors({
    personal: {},
    education: {},
    experience: {},
    projects: {},
  });

  // Optimize event handlers with useCallback
  const handlePersonalChange = useCallback(
    (e) => {
      const { id, value } = e.target;
      dispatch({
        type: ACTIONS.UPDATE_PERSONAL,
        field: id,
        value,
      });

      // Validate as user types
      if (id === 'name') {
        validateField(
          'personal',
          'name',
          value,
          validateRequired,
          'Name is required'
        );
      } else if (id === 'email') {
        validateField(
          'personal',
          'email',
          value,
          validateEmail,
          'Please enter a valid email'
        );
      } else if (id === 'phone') {
        validateField(
          'personal',
          'phone',
          value,
          validatePhone,
          'Please enter a valid phone number'
        );
      } else if (id === 'location') {
        validateField(
          'personal',
          'location',
          value,
          validateRequired,
          'Location is required'
        );
      }
    },
    [dispatch, validateField, validateRequired, validateEmail, validatePhone]
  );

  // Functions for multiple education entries
  const handleEducationChange = useCallback(
    (e, index) => {
      const { id, value } = e.target;
      dispatch({
        type: ACTIONS.UPDATE_EDUCATION,
        index,
        field: id,
        value,
      });

      // Validate as user types
      validateEducationEntry(index, id, value);
    },
    [dispatch]
  );

  const validateEducationEntry = useCallback(
    (index, id, value) => {
      if (id === 'school') {
        validateField(
          'education',
          'school',
          value,
          validateRequired,
          'School name is required',
          index
        );
      } else if (id === 'degree') {
        validateField(
          'education',
          'degree',
          value,
          validateRequired,
          'Degree is required',
          index
        );
      } else if (id === 'startDate') {
        validateField(
          'education',
          'startDate',
          value,
          validateDate,
          'Please enter a valid date (DD.MM.YYYY)',
          index
        );
      } else if (id === 'endDate') {
        validateField(
          'education',
          'endDate',
          value,
          validateDate,
          'Please enter a valid date (DD.MM.YYYY)',
          index
        );
      }
    },
    [validateField, validateRequired, validateDate]
  );

  // Functions for multiple experience entries
  const handleExperienceChange = useCallback(
    (e, index) => {
      const { id, value } = e.target;
      dispatch({
        type: ACTIONS.UPDATE_EXPERIENCE,
        index,
        field: id,
        value,
      });

      // Validate as user types
      validateExperienceEntry(index, id, value);
    },
    [dispatch]
  );

  const validateExperienceEntry = useCallback(
    (index, id, value) => {
      if (id === 'company') {
        validateField(
          'experience',
          'company',
          value,
          validateRequired,
          'Company name is required',
          index
        );
      } else if (id === 'title') {
        validateField(
          'experience',
          'title',
          value,
          validateRequired,
          'Job title is required',
          index
        );
      } else if (id === 'startDate') {
        validateField(
          'experience',
          'startDate',
          value,
          validateDate,
          'Please enter a valid date (DD.MM.YYYY)',
          index
        );
      } else if (id === 'endDate') {
        validateField(
          'experience',
          'endDate',
          value,
          validateDate,
          'Please enter a valid date (DD.MM.YYYY)',
          index
        );
      } else if (id === 'description') {
        validateField(
          'experience',
          'description',
          value,
          validateRequired,
          'Description is required',
          index
        );
      }
    },
    [validateField, validateRequired, validateDate]
  );

  // Skills management
  const handleSkillsChange = useCallback(
    (newSkills) => {
      dispatch({
        type: ACTIONS.UPDATE_SKILLS,
        skills: newSkills,
      });
    },
    [dispatch]
  );

  // Project management
  const handleProjectChange = useCallback(
    (e, index) => {
      const { id, value } = e.target;
      dispatch({
        type: ACTIONS.UPDATE_PROJECTS,
        index,
        field: id,
        value,
      });
    },
    [dispatch]
  );

  const addProjectEntry = useCallback(() => {
    setIsLoading(true);
    dispatch({
      type: ACTIONS.ADD_PROJECT,
    });
    setTimeout(() => setIsLoading(false), 100);
  }, [dispatch]);

  const removeProjectEntry = useCallback(
    (index) => {
      setIsLoading(true);
      dispatch({
        type: ACTIONS.REMOVE_PROJECT,
        index,
      });
      setTimeout(() => setIsLoading(false), 100);
    },
    [dispatch]
  );

  // Languages management
  const handleLanguagesChange = useCallback(
    (newLanguages) => {
      dispatch({
        type: ACTIONS.UPDATE_LANGUAGES,
        languages: newLanguages,
      });
    },
    [dispatch]
  );

  // Section visibility toggle
  const toggleSectionVisibility = useCallback(
    (sectionId) => {
      dispatch({
        type: ACTIONS.TOGGLE_SECTION_VISIBILITY,
        sectionId,
      });
    },
    [dispatch]
  );

  // Section collapse toggle
  const toggleSectionCollapse = useCallback(
    (sectionId) => {
      dispatch({
        type: ACTIONS.TOGGLE_SECTION_COLLAPSE,
        sectionId,
      });
    },
    [dispatch]
  );

  // Handle drag and drop reordering
  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;

      setIsLoading(true);
      dispatch({
        type: ACTIONS.REORDER_SECTIONS,
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      });
      setTimeout(() => setIsLoading(false), 100);
    },
    [dispatch]
  );

  // Use a fixed droppable ID for consistency
  const DROPPABLE_ID = 'droppable-sections';

  // Data management functions
  const resetAllData = useCallback(() => {
    setIsLoading(true);
    dispatch({
      type: ACTIONS.RESET_ALL,
    });
    setTimeout(() => setIsLoading(false), 200);
  }, [dispatch]);

  const exportData = useCallback(() => {
    setIsLoading(true);
    // Create a data object with all CV information
    const exportData = {
      personal,
      educationList,
      experienceList,
      skills,
      projects,
      languages,
      sectionOrder,
    };

    // Convert to JSON and create a downloadable file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    // Create a download link and trigger click
    const exportFileDefaultName = 'cv-data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    setTimeout(() => setIsLoading(false), 200);
  }, [
    personal,
    educationList,
    experienceList,
    skills,
    projects,
    languages,
    sectionOrder,
  ]);

  const importData = useCallback(
    (fileContent) => {
      try {
        setIsLoading(true);
        const importedData = JSON.parse(fileContent);
        dispatch({
          type: ACTIONS.IMPORT_DATA,
          data: importedData,
        });
        setTimeout(() => setIsLoading(false), 200);
      } catch (error) {
        console.error('Error importing data:', error);
        alert('Failed to import data. Please check the file format.');
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  // Optimize the addEducationEntry and removeEducationEntry functions
  const addEducationEntry = useCallback(() => {
    setIsLoading(true);
    dispatch({
      type: ACTIONS.ADD_EDUCATION,
    });
    setTimeout(() => setIsLoading(false), 100);
  }, [dispatch]);

  const removeEducationEntry = useCallback(
    (index) => {
      setIsLoading(true);
      dispatch({
        type: ACTIONS.REMOVE_EDUCATION,
        index,
      });
      // Remove errors for the deleted entry
      removeFieldError('education', index);
      setTimeout(() => setIsLoading(false), 100);
    },
    [dispatch, removeFieldError]
  );

  const addExperienceEntry = useCallback(() => {
    setIsLoading(true);
    dispatch({
      type: ACTIONS.ADD_EXPERIENCE,
    });
    setTimeout(() => setIsLoading(false), 100);
  }, [dispatch]);

  const removeExperienceEntry = useCallback(
    (index) => {
      setIsLoading(true);
      dispatch({
        type: ACTIONS.REMOVE_EXPERIENCE,
        index,
      });
      // Remove errors for the deleted entry
      removeFieldError('experience', index);
      setTimeout(() => setIsLoading(false), 100);
    },
    [dispatch, removeFieldError]
  );

  // Use useMemo for the cv data to reduce re-computation
  const cvData = useMemo(
    () => ({
      personal,
      educationList,
      experienceList,
      skills,
      projects,
      languages,
      visibleSections: sectionOrder
        .filter((section) => section.visible)
        .map((section) => section.id),
      sectionOrder,
    }),
    [
      personal,
      educationList,
      experienceList,
      skills,
      projects,
      languages,
      sectionOrder,
    ]
  );

  // Render a section based on its ID
  const renderSection = useCallback(
    (section, index) => {
      const isCollapsed = collapsedSections[section.id] || false;
      const headingId = `section-heading-${section.id}`;

      // Determine the content to render based on section type
      let sectionContent = null;

      if (!isCollapsed) {
        // Only render content if the section is not collapsed
        sectionContent = (
          <div
            id={`content-${section.id}`}
            className="p-3 bg-white"
            onClick={(e) => {
              // Stop propagation to prevent dragging when clicking on content
              e.stopPropagation();
            }}
          >
            <Suspense fallback={<LoadingComponent />}>
              {section.id === 'personal' && (
                <Personal
                  name={personal.name}
                  email={personal.email}
                  phone={personal.phone}
                  location={personal.location}
                  handleChange={handlePersonalChange}
                  errors={errors.personal}
                />
              )}
              {section.id === 'education' && (
                <Education
                  educationList={educationList}
                  handleChange={handleEducationChange}
                  addEntry={addEducationEntry}
                  removeEntry={removeEducationEntry}
                  errors={errors.education || {}}
                />
              )}
              {section.id === 'experience' && (
                <Experience
                  experienceList={experienceList}
                  handleChange={handleExperienceChange}
                  addEntry={addExperienceEntry}
                  removeEntry={removeExperienceEntry}
                  errors={errors.experience || {}}
                />
              )}
              {section.id === 'skills' && (
                <Skills skills={skills} handleChange={handleSkillsChange} />
              )}
              {section.id === 'languages' && (
                <Languages
                  languages={languages}
                  handleChange={handleLanguagesChange}
                />
              )}
              {section.id === 'projects' && (
                <Projects
                  projects={projects}
                  handleChange={handleProjectChange}
                  addEntry={addProjectEntry}
                  removeEntry={removeProjectEntry}
                />
              )}
            </Suspense>
          </div>
        );
      }

      return (
        <Draggable
          key={section.id}
          draggableId={section.id}
          index={index}
          isDragDisabled={!isDndEnabled}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              className={`mb-4 border rounded shadow-sm ${
                !section.visible ? 'opacity-50' : ''
              }`}
              aria-labelledby={headingId}
            >
              {/* The header - now it's clickable to toggle collapse, but only drag handle has dragHandleProps */}
              <div
                className="flex justify-between items-center bg-gray-100 p-2 rounded-t border-b cursor-pointer"
                role="region"
                aria-labelledby={headingId}
                onClick={() => toggleSectionCollapse(section.id)}
              >
                <div className="flex items-center flex-1">
                  {/* Drag handle that covers full height */}
                  <div
                    className="flex items-center self-stretch px-2 -m-2 mr-2 text-gray-400 hover:text-gray-700 cursor-grab active:cursor-grabbing"
                    title="Drag to reorder"
                    aria-hidden="true"
                    {...provided.dragHandleProps}
                    onClick={(e) => {
                      // Stop propagation to prevent toggling collapse when using drag handle
                      e.stopPropagation();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </div>
                  <h2 id={headingId} className="text-lg font-semibold">
                    {section.title}
                  </h2>
                </div>
                <div
                  className="flex gap-2"
                  role="toolbar"
                  aria-label={`${section.title} controls`}
                  onClick={(e) => {
                    // Stop propagation to prevent toggling collapse when clicking controls
                    e.stopPropagation();
                  }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSectionVisibility(section.id);
                    }}
                    className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
                    title={section.visible ? 'Hide from CV' : 'Show in CV'}
                    aria-label={
                      section.visible
                        ? `Hide ${section.title} section from CV`
                        : `Show ${section.title} section in CV`
                    }
                    aria-pressed={section.visible}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      {section.visible ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      )}
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSectionCollapse(section.id);
                    }}
                    className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded"
                    title={isCollapsed ? 'Expand section' : 'Collapse section'}
                    aria-label={
                      isCollapsed
                        ? `Expand ${section.title} section`
                        : `Collapse ${section.title} section`
                    }
                    aria-expanded={!isCollapsed}
                    aria-controls={`content-${section.id}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      {isCollapsed ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
              {sectionContent}
            </div>
          )}
        </Draggable>
      );
    },
    [
      collapsedSections,
      personal,
      educationList,
      experienceList,
      skills,
      languages,
      projects,
      errors,
      handlePersonalChange,
      handleEducationChange,
      addEducationEntry,
      removeEducationEntry,
      handleExperienceChange,
      addExperienceEntry,
      removeExperienceEntry,
      handleSkillsChange,
      handleLanguagesChange,
      handleProjectChange,
      addProjectEntry,
      removeProjectEntry,
      isDndEnabled,
      toggleSectionCollapse,
      toggleSectionVisibility,
    ]
  );

  return (
    <div className="grid min-w-full md:grid-cols-[1fr_3fr] grid-cols-1 gap-4 min-h-screen print:block">
      <div className="m-4 flex flex-col print:hidden">
        <Suspense fallback={<LoadingComponent />}>
          <DataControls
            resetAllData={resetAllData}
            exportData={exportData}
            importData={importData}
          />
        </Suspense>
        <div className="my-4"></div>

        <h2 id="form-sections-heading" className="sr-only">
          CV Form Sections
        </h2>

        {/* Show loading overlay for async operations */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg shadow-lg flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-blue-500"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </div>
          </div>
        )}

        {/* Only render DragDropContext after component is mounted */}
        {isDndEnabled ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId={DROPPABLE_ID}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  role="region"
                  aria-labelledby="form-sections-heading"
                  aria-describedby="drag-drop-instructions"
                >
                  <p id="drag-drop-instructions" className="sr-only">
                    Drag and drop sections to reorder them. Use tab to navigate
                    between sections and space to select a section for dragging.
                  </p>
                  {sectionOrder.map((section, index) =>
                    renderSection(section, index)
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          // Render a loading state when DnD is not yet enabled
          <div className="text-center py-4 text-gray-500">
            <div className="animate-pulse">
              Loading drag and drop functionality...
            </div>
          </div>
        )}
      </div>
      <div className="m-4 flex flex-col border border-black shadow-md print:m-0 print:border-0 print:shadow-none print:w-full">
        <Suspense fallback={<LoadingComponent />}>
          <TemplateSelector cvData={cvData} />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
