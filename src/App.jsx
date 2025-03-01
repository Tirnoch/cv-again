import { useEffect } from 'react';
import Personal from './components/Personal';
import Education from './components/Education';
import Experience from './components/Experience';
import TemplateSelector from './components/TemplateSelector';
import DataControls from './components/DataControls';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Languages from './components/Languages';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Import custom hooks
import useFormValidation from './hooks/useValidation';
import { useFormErrors } from './hooks/useFormErrors';
import { useCV, ACTIONS } from './context/CVContext';

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

  // Use custom error handling hook
  const { errors, validateField, removeFieldError } = useFormErrors({
    personal: {},
    education: {},
    experience: {},
    projects: {},
  });

  const handlePersonalChange = (e) => {
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
  };

  // Functions for multiple education entries
  const handleEducationChange = (e, index) => {
    const { id, value } = e.target;
    dispatch({
      type: ACTIONS.UPDATE_EDUCATION,
      index,
      field: id,
      value,
    });

    // Validate as user types
    validateEducationEntry(index, id, value);
  };

  const validateEducationEntry = (index, id, value) => {
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
  };

  // Functions for multiple experience entries
  const handleExperienceChange = (e, index) => {
    const { id, value } = e.target;
    dispatch({
      type: ACTIONS.UPDATE_EXPERIENCE,
      index,
      field: id,
      value,
    });

    // Validate as user types
    validateExperienceEntry(index, id, value);
  };

  const validateExperienceEntry = (index, id, value) => {
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
  };

  // Skills management
  const handleSkillsChange = (newSkills) => {
    dispatch({
      type: ACTIONS.UPDATE_SKILLS,
      skills: newSkills,
    });
  };

  // Project management
  const handleProjectChange = (e, index) => {
    const { id, value } = e.target;
    dispatch({
      type: ACTIONS.UPDATE_PROJECTS,
      index,
      field: id,
      value,
    });
  };

  const addProjectEntry = () => {
    dispatch({
      type: ACTIONS.ADD_PROJECT,
    });
  };

  const removeProjectEntry = (index) => {
    dispatch({
      type: ACTIONS.REMOVE_PROJECT,
      index,
    });
  };

  // Languages management
  const handleLanguagesChange = (newLanguages) => {
    dispatch({
      type: ACTIONS.UPDATE_LANGUAGES,
      languages: newLanguages,
    });
  };

  // Section visibility toggle
  const toggleSectionVisibility = (sectionId) => {
    dispatch({
      type: ACTIONS.TOGGLE_SECTION_VISIBILITY,
      sectionId,
    });
  };

  // Section collapse toggle
  const toggleSectionCollapse = (sectionId) => {
    dispatch({
      type: ACTIONS.TOGGLE_SECTION_COLLAPSE,
      sectionId,
    });
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    console.log('Drag ended:', result);
    if (!result.destination) return;

    const items = Array.from(sectionOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch({
      type: ACTIONS.UPDATE_SECTION_ORDER,
      sectionOrder: items,
    });
    console.log('New section order:', items);
  };

  // Ensure each draggable ID is a string (react-beautiful-dnd requirement)
  const getDraggableId = (id) => `draggable-${id}`;

  // Use a fixed droppable ID to ensure consistency
  const DROPPABLE_ID = 'droppable-sections';

  // Data management functions
  const resetAllData = () => {
    dispatch({
      type: ACTIONS.RESET_ALL,
    });
  };

  const exportData = () => {
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
  };

  const importData = (fileContent) => {
    try {
      const importedData = JSON.parse(fileContent);
      dispatch({
        type: ACTIONS.IMPORT_DATA,
        data: importedData,
      });
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Failed to import data. Please check the file format.');
    }
  };

  // Validate all fields on component mount
  useEffect(() => {
    // Prevent validation from running on every render if values haven't changed
    const validateAllFields = () => {
      // Validate personal info
      validateField(
        'personal',
        'name',
        personal.name,
        validateRequired,
        'Name is required'
      );
      validateField(
        'personal',
        'email',
        personal.email,
        validateEmail,
        'Please enter a valid email'
      );
      validateField(
        'personal',
        'phone',
        personal.phone,
        validatePhone,
        'Please enter a valid phone number'
      );
      validateField(
        'personal',
        'location',
        personal.location,
        validateRequired,
        'Location is required'
      );

      // Validate education entries
      educationList.forEach((edu, index) => {
        validateField(
          'education',
          'school',
          edu.school,
          validateRequired,
          'School name is required',
          index
        );
        validateField(
          'education',
          'degree',
          edu.degree,
          validateRequired,
          'Degree is required',
          index
        );
        validateField(
          'education',
          'startDate',
          edu.startDate,
          validateDate,
          'Please enter a valid date (DD.MM.YYYY)',
          index
        );
        validateField(
          'education',
          'endDate',
          edu.endDate,
          validateDate,
          'Please enter a valid date (DD.MM.YYYY)',
          index
        );
      });

      // Validate experience entries
      experienceList.forEach((exp, index) => {
        validateField(
          'experience',
          'company',
          exp.company,
          validateRequired,
          'Company name is required',
          index
        );
        validateField(
          'experience',
          'title',
          exp.title,
          validateRequired,
          'Job title is required',
          index
        );
        validateField(
          'experience',
          'startDate',
          exp.startDate,
          validateDate,
          'Please enter a valid date (DD.MM.YYYY)',
          index
        );
        validateField(
          'experience',
          'endDate',
          exp.endDate,
          validateDate,
          'Please enter a valid date (DD.MM.YYYY)',
          index
        );
      });
    };

    // Only run validation once on mount
    validateAllFields();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  // Combined CV data for template selector
  const cvData = {
    personal,
    educationList,
    experienceList,
    skills,
    projects,
    languages,
    visibleSections: sectionOrder
      .filter((section) => section.visible)
      .map((section) => section.id),
  };

  // Render a section based on its ID
  const renderSection = (section, index) => {
    const isCollapsed = collapsedSections[section.id] || false;
    const sectionId = `section-${section.id}`;
    const headingId = `heading-${section.id}`;
    // Use simple string IDs for draggable
    const draggableId = `draggable-${section.id}`;

    // Only render content if not collapsed
    const sectionContent = !isCollapsed && (
      <div
        className="p-4"
        id={`content-${section.id}`}
        aria-labelledby={headingId}
      >
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

        {section.id === 'projects' && (
          <Projects
            projects={projects}
            handleChange={handleProjectChange}
            addEntry={addProjectEntry}
            removeEntry={removeProjectEntry}
          />
        )}

        {section.id === 'languages' && (
          <Languages
            languages={languages}
            handleChange={handleLanguagesChange}
          />
        )}
      </div>
    );

    return (
      <Draggable key={draggableId} draggableId={draggableId} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="mb-4 bg-white rounded shadow border border-gray-200 hover:shadow-md transition-shadow"
            id={sectionId}
            role="group"
            aria-labelledby={headingId}
          >
            <div
              {...provided.dragHandleProps}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-t border-b cursor-grab active:cursor-grabbing"
              role="region"
              aria-labelledby={headingId}
            >
              <h2
                id={headingId}
                className="text-lg font-semibold flex items-center"
              >
                <span
                  className="inline-block mr-2 text-gray-400 hover:text-gray-700"
                  title="Drag to reorder"
                  aria-hidden="true"
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
                </span>
                {section.title}
              </h2>
              <div
                className="flex gap-2"
                role="toolbar"
                aria-label={`${section.title} controls`}
              >
                <button
                  onClick={() => toggleSectionVisibility(section.id)}
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
                  onClick={() => toggleSectionCollapse(section.id)}
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
  };

  const addEducationEntry = () => {
    dispatch({
      type: ACTIONS.ADD_EDUCATION,
    });
  };

  const removeEducationEntry = (index) => {
    dispatch({
      type: ACTIONS.REMOVE_EDUCATION,
      index,
    });
    // Remove errors for the deleted entry
    removeFieldError('education', index);
  };

  const addExperienceEntry = () => {
    dispatch({
      type: ACTIONS.ADD_EXPERIENCE,
    });
  };

  const removeExperienceEntry = (index) => {
    dispatch({
      type: ACTIONS.REMOVE_EXPERIENCE,
      index,
    });
    // Remove errors for the deleted entry
    removeFieldError('experience', index);
  };

  return (
    <div className="grid min-w-full md:grid-cols-[1fr_3fr] grid-cols-1 gap-4 min-h-screen print:block">
      <div className="m-4 flex flex-col print:hidden">
        <DataControls
          resetAllData={resetAllData}
          exportData={exportData}
          importData={importData}
        />
        <div className="my-4"></div>

        <h2 id="form-sections-heading" className="sr-only">
          CV Form Sections
        </h2>

        {/* Debug: Output section order to help diagnose react-beautiful-dnd issues */}
        <div className="sr-only">
          {console.log('Section order:', sectionOrder)}
          {console.log(
            'Draggable IDs:',
            sectionOrder.map((section) => getDraggableId(section.id))
          )}
        </div>

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
      </div>
      <div className="m-4 flex flex-col border border-black shadow-md print:m-0 print:border-0 print:shadow-none print:w-full">
        <TemplateSelector cvData={cvData} />
      </div>
    </div>
  );
};

export default App;
