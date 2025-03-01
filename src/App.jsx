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
import useLocalStorage from './hooks/useLocalStorage';

const App = () => {
  // Use custom validation hooks
  const { validateEmail, validatePhone, validateRequired, validateDate } =
    useFormValidation();

  // Use local storage hooks for state
  const [personal, setPersonal] = useLocalStorage('cv-personal', {
    name: 'Damla OZ',
    email: 'tahmin@baka.lim',
    phone: '+90123456',
    location: 'Bursa, Turkiye',
  });

  // Multi-entry education data
  const [educationList, setEducationList] = useLocalStorage(
    'cv-education-list',
    [
      {
        id: 'edu-1',
        school: 'Mimar Sinan University',
        degree: 'Sanat ve Sepet Isleri',
        startDate: '01.01.2001',
        endDate: '02.02.2002',
      },
    ]
  );

  // Multi-entry experience data
  const [experienceList, setExperienceList] = useLocalStorage(
    'cv-experience-list',
    [
      {
        id: 'exp-1',
        company: 'Random Grafik Tasarim Atolyesi',
        title: 'Grafik Tasarim Bacisi',
        startDate: '03.03.2003',
        endDate: '04.04.2004',
        description: 'done this and that for some time for sure',
      },
    ]
  );

  // Skills section
  const [skills, setSkills] = useLocalStorage('cv-skills', []);

  // Projects section
  const [projects, setProjects] = useLocalStorage('cv-projects', [
    {
      id: 'proj-1',
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      link: '',
    },
  ]);

  // Languages section
  const [languages, setLanguages] = useLocalStorage('cv-languages', []);

  // Section visibility and order
  const [sectionOrder, setSectionOrder] = useLocalStorage('cv-section-order', [
    { id: 'personal', title: 'Personal Details', visible: true },
    { id: 'education', title: 'Education', visible: true },
    { id: 'experience', title: 'Experience', visible: true },
    { id: 'skills', title: 'Skills', visible: true },
    { id: 'projects', title: 'Projects', visible: true },
    { id: 'languages', title: 'Languages', visible: true },
  ]);

  // Collapsible sections state
  const [collapsedSections, setCollapsedSections] = useLocalStorage(
    'cv-collapsed-sections',
    {}
  );

  // Use custom error handling hook
  const { errors, validateField, removeFieldError } = useFormErrors({
    personal: {},
    education: {},
    experience: {},
    projects: {},
  });

  const handlePersonalChange = (e) => {
    const { id, value } = e.target;
    setPersonal({ ...personal, [id]: value });

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
    const updatedList = [...educationList];
    updatedList[index] = { ...updatedList[index], [id]: value };
    setEducationList(updatedList);

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
    const updatedList = [...experienceList];
    updatedList[index] = { ...updatedList[index], [id]: value };
    setExperienceList(updatedList);

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
    setSkills(newSkills);
  };

  // Project management
  const handleProjectChange = (e, index) => {
    const { id, value } = e.target;
    const updatedList = [...projects];
    updatedList[index] = { ...updatedList[index], [id]: value };
    setProjects(updatedList);
  };

  const addProjectEntry = () => {
    const newId = `proj-${Date.now()}`;
    setProjects([
      ...projects,
      {
        id: newId,
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        link: '',
      },
    ]);
  };

  const removeProjectEntry = (index) => {
    if (projects.length <= 1) return;
    const newList = [...projects];
    newList.splice(index, 1);
    setProjects(newList);
  };

  // Languages management
  const handleLanguagesChange = (newLanguages) => {
    setLanguages(newLanguages);
  };

  // Section visibility toggle
  const toggleSectionVisibility = (sectionId) => {
    setSectionOrder(
      sectionOrder.map((section) =>
        section.id === sectionId
          ? { ...section, visible: !section.visible }
          : section
      )
    );
  };

  // Section collapse toggle
  const toggleSectionCollapse = (sectionId) => {
    setCollapsedSections({
      ...collapsedSections,
      [sectionId]: !collapsedSections[sectionId],
    });
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sectionOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSectionOrder(items);
  };

  // Data management functions
  const resetAllData = () => {
    // Reset to default values
    setPersonal({
      name: '',
      email: '',
      phone: '',
      location: '',
    });

    setEducationList([
      {
        id: 'edu-1',
        school: '',
        degree: '',
        startDate: '',
        endDate: '',
      },
    ]);

    setExperienceList([
      {
        id: 'exp-1',
        company: '',
        title: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);

    setSkills([]);

    setProjects([
      {
        id: 'proj-1',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        link: '',
      },
    ]);

    setLanguages([]);

    // Clear localStorage
    localStorage.removeItem('cv-personal');
    localStorage.removeItem('cv-education-list');
    localStorage.removeItem('cv-experience-list');
    localStorage.removeItem('cv-skills');
    localStorage.removeItem('cv-projects');
    localStorage.removeItem('cv-languages');
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

      if (importedData.personal) {
        setPersonal(importedData.personal);
      }

      if (importedData.educationList) {
        setEducationList(importedData.educationList);
      }

      if (importedData.experienceList) {
        setExperienceList(importedData.experienceList);
      }

      if (importedData.skills) {
        setSkills(importedData.skills);
      }

      if (importedData.projects) {
        setProjects(importedData.projects);
      }

      if (importedData.languages) {
        setLanguages(importedData.languages);
      }

      if (importedData.sectionOrder) {
        setSectionOrder(importedData.sectionOrder);
      }
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Failed to import data. Please check the file format.');
    }
  };

  // Validate all fields on component mount
  useEffect(() => {
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
  }, [
    validateRequired,
    validateEmail,
    validatePhone,
    validateDate,
    personal.name,
    personal.email,
    personal.phone,
    personal.location,
    educationList,
    experienceList,
  ]);

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

    // Section header with collapse/expand and visibility toggle
    const sectionHeader = (
      <div
        className="flex justify-between items-center bg-gray-100 p-2 rounded-t border-b"
        role="region"
        aria-labelledby={headingId}
      >
        <h2 id={headingId} className="text-lg font-semibold">
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
    );

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
      <Draggable key={section.id} draggableId={section.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="mb-4 bg-white rounded shadow border border-gray-200"
            id={sectionId}
            role="group"
            aria-labelledby={headingId}
          >
            <div
              {...provided.dragHandleProps}
              className="cursor-move"
              aria-label={`Drag ${section.title} section to reorder`}
              tabIndex={0}
            >
              {sectionHeader}
            </div>
            {sectionContent}
          </div>
        )}
      </Draggable>
    );
  };

  const addEducationEntry = () => {
    const newId = `edu-${Date.now()}`;
    setEducationList([
      ...educationList,
      {
        id: newId,
        school: '',
        degree: '',
        startDate: '',
        endDate: '',
      },
    ]);
  };

  const removeEducationEntry = (index) => {
    if (educationList.length <= 1) return; // Always keep at least one entry
    const newList = [...educationList];
    newList.splice(index, 1);
    setEducationList(newList);

    // Remove errors for the deleted entry
    removeFieldError('education', index);
  };

  const addExperienceEntry = () => {
    const newId = `exp-${Date.now()}`;
    setExperienceList([
      ...experienceList,
      {
        id: newId,
        company: '',
        title: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const removeExperienceEntry = (index) => {
    if (experienceList.length <= 1) return; // Always keep at least one entry
    const newList = [...experienceList];
    newList.splice(index, 1);
    setExperienceList(newList);

    // Remove errors for the deleted entry
    removeFieldError('experience', index);
  };

  return (
    <>
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
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
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
    </>
  );
};

export default App;
