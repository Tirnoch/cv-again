import { useState, useEffect } from 'react';
import Personal from './components/Personal';
import Education from './components/Education';
import Experience from './components/Experience';
import TemplateSelector from './components/TemplateSelector';
import DataControls from './components/DataControls';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Languages from './components/Languages';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const App = () => {
  // Initialize state with localStorage data if available, otherwise use defaults
  const [personal, setPersonal] = useState(() => {
    const savedPersonal = localStorage.getItem('cv-personal');
    return savedPersonal
      ? JSON.parse(savedPersonal)
      : {
          name: 'Damla OZ',
          email: 'tahmin@baka.lim',
          phone: '+90123456',
          location: 'Bursa, Turkiye',
        };
  });

  // Multi-entry education data
  const [educationList, setEducationList] = useState(() => {
    const savedEducation = localStorage.getItem('cv-education-list');
    return savedEducation
      ? JSON.parse(savedEducation)
      : [
          {
            id: 'edu-1',
            school: 'Mimar Sinan University',
            degree: 'Sanat ve Sepet Isleri',
            startDate: '01.01.2001',
            endDate: '02.02.2002',
          },
        ];
  });

  // Multi-entry experience data
  const [experienceList, setExperienceList] = useState(() => {
    const savedExperience = localStorage.getItem('cv-experience-list');
    return savedExperience
      ? JSON.parse(savedExperience)
      : [
          {
            id: 'exp-1',
            company: 'Random Grafik Tasarim Atolyesi',
            title: 'Grafik Tasarim Bacisi',
            startDate: '03.03.2003',
            endDate: '04.04.2004',
            description: 'done this and that for some time for sure',
          },
        ];
  });

  // Skills section
  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem('cv-skills');
    return savedSkills ? JSON.parse(savedSkills) : [];
  });

  // Projects section
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('cv-projects');
    return savedProjects
      ? JSON.parse(savedProjects)
      : [
          {
            id: 'proj-1',
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            link: '',
          },
        ];
  });

  // Languages section
  const [languages, setLanguages] = useState(() => {
    const savedLanguages = localStorage.getItem('cv-languages');
    return savedLanguages ? JSON.parse(savedLanguages) : [];
  });

  // Section visibility and order
  const [sectionOrder, setSectionOrder] = useState(() => {
    const savedOrder = localStorage.getItem('cv-section-order');
    return savedOrder
      ? JSON.parse(savedOrder)
      : [
          { id: 'personal', title: 'Personal Details', visible: true },
          { id: 'education', title: 'Education', visible: true },
          { id: 'experience', title: 'Experience', visible: true },
          { id: 'skills', title: 'Skills', visible: true },
          { id: 'projects', title: 'Projects', visible: true },
          { id: 'languages', title: 'Languages', visible: true },
        ];
  });

  // Collapsible sections state
  const [collapsedSections, setCollapsedSections] = useState(() => {
    const savedCollapsed = localStorage.getItem('cv-collapsed-sections');
    return savedCollapsed ? JSON.parse(savedCollapsed) : {};
  });

  // Save to localStorage whenever data changes (autosave)
  useEffect(() => {
    localStorage.setItem('cv-personal', JSON.stringify(personal));
  }, [personal]);

  useEffect(() => {
    localStorage.setItem('cv-education-list', JSON.stringify(educationList));
  }, [educationList]);

  useEffect(() => {
    localStorage.setItem('cv-experience-list', JSON.stringify(experienceList));
  }, [experienceList]);

  useEffect(() => {
    localStorage.setItem('cv-skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('cv-projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('cv-languages', JSON.stringify(languages));
  }, [languages]);

  useEffect(() => {
    localStorage.setItem('cv-section-order', JSON.stringify(sectionOrder));
  }, [sectionOrder]);

  useEffect(() => {
    localStorage.setItem(
      'cv-collapsed-sections',
      JSON.stringify(collapsedSections)
    );
  }, [collapsedSections]);

  // Validation state
  const [errors, setErrors] = useState({
    personal: {},
    education: {},
    experience: {},
    projects: {},
  });

  // Validation rules
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex =
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/;
    return phoneRegex.test(phone);
  };

  const validateRequired = (value) => {
    return value.trim() !== '';
  };

  const validateDate = (date) => {
    // Simple date validation for format DD.MM.YYYY or similar patterns
    const dateRegex = /^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{2,4})$/;
    return dateRegex.test(date);
  };

  const handlePersonalChange = (e) => {
    const { id, value } = e.target;
    setPersonal({ ...personal, [id]: value });

    // Validate as user types
    let newErrors = { ...errors };

    if (id === 'name' && !validateRequired(value)) {
      newErrors.personal.name = 'Name is required';
    } else if (id === 'name') {
      delete newErrors.personal.name;
    }

    if (id === 'email' && !validateEmail(value)) {
      newErrors.personal.email = 'Please enter a valid email';
    } else if (id === 'email') {
      delete newErrors.personal.email;
    }

    if (id === 'phone' && !validatePhone(value)) {
      newErrors.personal.phone = 'Please enter a valid phone number';
    } else if (id === 'phone') {
      delete newErrors.personal.phone;
    }

    if (id === 'location' && !validateRequired(value)) {
      newErrors.personal.location = 'Location is required';
    } else if (id === 'location') {
      delete newErrors.personal.location;
    }

    setErrors(newErrors);
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
    let newErrors = { ...errors };
    if (!newErrors.education) newErrors.education = {};
    if (!newErrors.education[index]) newErrors.education[index] = {};

    if (id === 'school' && !validateRequired(value)) {
      newErrors.education[index].school = 'School name is required';
    } else if (id === 'school') {
      delete newErrors.education[index].school;
    }

    if (id === 'degree' && !validateRequired(value)) {
      newErrors.education[index].degree = 'Degree is required';
    } else if (id === 'degree') {
      delete newErrors.education[index].degree;
    }

    if (id === 'startDate' && !validateDate(value)) {
      newErrors.education[index].startDate =
        'Please enter a valid date (DD.MM.YYYY)';
    } else if (id === 'startDate') {
      delete newErrors.education[index].startDate;
    }

    if (id === 'endDate' && !validateDate(value)) {
      newErrors.education[index].endDate =
        'Please enter a valid date (DD.MM.YYYY)';
    } else if (id === 'endDate') {
      delete newErrors.education[index].endDate;
    }

    setErrors(newErrors);
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
    const newErrors = { ...errors };
    if (newErrors.education && newErrors.education[index]) {
      delete newErrors.education[index];
    }
    setErrors(newErrors);
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
    let newErrors = { ...errors };
    if (!newErrors.experience) newErrors.experience = {};
    if (!newErrors.experience[index]) newErrors.experience[index] = {};

    if (id === 'company' && !validateRequired(value)) {
      newErrors.experience[index].company = 'Company name is required';
    } else if (id === 'company') {
      delete newErrors.experience[index].company;
    }

    if (id === 'title' && !validateRequired(value)) {
      newErrors.experience[index].title = 'Job title is required';
    } else if (id === 'title') {
      delete newErrors.experience[index].title;
    }

    if (id === 'startDate' && !validateDate(value)) {
      newErrors.experience[index].startDate =
        'Please enter a valid date (DD.MM.YYYY)';
    } else if (id === 'startDate') {
      delete newErrors.experience[index].startDate;
    }

    if (id === 'endDate' && !validateDate(value)) {
      newErrors.experience[index].endDate =
        'Please enter a valid date (DD.MM.YYYY)';
    } else if (id === 'endDate') {
      delete newErrors.experience[index].endDate;
    }

    setErrors(newErrors);
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
    const newErrors = { ...errors };
    if (newErrors.experience && newErrors.experience[index]) {
      delete newErrors.experience[index];
    }
    setErrors(newErrors);
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
    const newErrors = {
      personal: {},
      education: {},
      experience: {},
    };

    // Validate personal info
    if (!validateRequired(personal.name)) {
      newErrors.personal.name = 'Name is required';
    }

    if (!validateEmail(personal.email)) {
      newErrors.personal.email = 'Please enter a valid email';
    }

    if (!validatePhone(personal.phone)) {
      newErrors.personal.phone = 'Please enter a valid phone number';
    }

    if (!validateRequired(personal.location)) {
      newErrors.personal.location = 'Location is required';
    }

    // Validate education entries
    newErrors.education = {};
    educationList.forEach((edu, index) => {
      newErrors.education[index] = {};

      if (!validateRequired(edu.school)) {
        newErrors.education[index].school = 'School name is required';
      }

      if (!validateRequired(edu.degree)) {
        newErrors.education[index].degree = 'Degree is required';
      }

      if (!validateDate(edu.startDate)) {
        newErrors.education[index].startDate =
          'Please enter a valid date (DD.MM.YYYY)';
      }

      if (!validateDate(edu.endDate)) {
        newErrors.education[index].endDate =
          'Please enter a valid date (DD.MM.YYYY)';
      }
    });

    // Validate experience entries
    newErrors.experience = {};
    experienceList.forEach((exp, index) => {
      newErrors.experience[index] = {};

      if (!validateRequired(exp.company)) {
        newErrors.experience[index].company = 'Company name is required';
      }

      if (!validateRequired(exp.title)) {
        newErrors.experience[index].title = 'Job title is required';
      }

      if (!validateDate(exp.startDate)) {
        newErrors.experience[index].startDate =
          'Please enter a valid date (DD.MM.YYYY)';
      }

      if (!validateDate(exp.endDate)) {
        newErrors.experience[index].endDate =
          'Please enter a valid date (DD.MM.YYYY)';
      }
    });

    setErrors(newErrors);
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

    // Section header with collapse/expand and visibility toggle
    const sectionHeader = (
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-t border-b">
        <h2 className="text-lg font-semibold">{section.title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => toggleSectionVisibility(section.id)}
            className="p-1 text-gray-500 hover:text-gray-700"
            title={section.visible ? 'Hide from CV' : 'Show in CV'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
            className="p-1 text-gray-500 hover:text-gray-700"
            title={isCollapsed ? 'Expand section' : 'Collapse section'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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
      <div className="p-4">
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
          >
            <div {...provided.dragHandleProps} className="cursor-move">
              {sectionHeader}
            </div>
            {sectionContent}
          </div>
        )}
      </Draggable>
    );
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

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
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
