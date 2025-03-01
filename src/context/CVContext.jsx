import { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

// Create context
const CVContext = createContext();

// Initial state
const initialState = {
  personal: {
    name: 'Damla OZ',
    email: 'tahmin@baka.lim',
    phone: '+90123456',
    location: 'Bursa, Turkiye',
  },
  educationList: [
    {
      id: 'edu-1',
      school: 'Mimar Sinan University',
      degree: 'Sanat ve Sepet Isleri',
      startDate: '01.01.2001',
      endDate: '02.02.2002',
    },
  ],
  experienceList: [
    {
      id: 'exp-1',
      company: 'Random Grafik Tasarim Atolyesi',
      title: 'Grafik Tasarim Bacisi',
      startDate: '03.03.2003',
      endDate: '04.04.2004',
      description: 'done this and that for some time for sure',
    },
  ],
  skills: [],
  projects: [
    {
      id: 'proj-1',
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      link: '',
    },
  ],
  languages: [],
  sectionOrder: [
    { id: 'personal', title: 'Personal Details', visible: true },
    { id: 'education', title: 'Education', visible: true },
    { id: 'experience', title: 'Experience', visible: true },
    { id: 'skills', title: 'Skills', visible: true },
    { id: 'projects', title: 'Projects', visible: true },
    { id: 'languages', title: 'Languages', visible: true },
  ],
  collapsedSections: {},
};

// Action types
export const ACTIONS = {
  UPDATE_PERSONAL: 'update_personal',
  UPDATE_EDUCATION: 'update_education',
  ADD_EDUCATION: 'add_education',
  REMOVE_EDUCATION: 'remove_education',
  UPDATE_EXPERIENCE: 'update_experience',
  ADD_EXPERIENCE: 'add_experience',
  REMOVE_EXPERIENCE: 'remove_experience',
  UPDATE_SKILLS: 'update_skills',
  UPDATE_PROJECTS: 'update_projects',
  ADD_PROJECT: 'add_project',
  REMOVE_PROJECT: 'remove_project',
  UPDATE_LANGUAGES: 'update_languages',
  UPDATE_SECTION_ORDER: 'update_section_order',
  TOGGLE_SECTION_VISIBILITY: 'toggle_section_visibility',
  TOGGLE_SECTION_COLLAPSE: 'toggle_section_collapse',
  RESET_ALL: 'reset_all',
  IMPORT_DATA: 'import_data',
};

// Reducer function
function cvReducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_PERSONAL:
      return {
        ...state,
        personal: {
          ...state.personal,
          [action.field]: action.value,
        },
      };

    case ACTIONS.UPDATE_EDUCATION:
      return {
        ...state,
        educationList: state.educationList.map((edu, index) =>
          index === action.index
            ? { ...edu, [action.field]: action.value }
            : edu
        ),
      };

    case ACTIONS.ADD_EDUCATION:
      return {
        ...state,
        educationList: [
          ...state.educationList,
          {
            id: `edu-${Date.now()}`,
            school: '',
            degree: '',
            startDate: '',
            endDate: '',
          },
        ],
      };

    case ACTIONS.REMOVE_EDUCATION:
      if (state.educationList.length <= 1) return state;
      return {
        ...state,
        educationList: state.educationList.filter(
          (_, index) => index !== action.index
        ),
      };

    case ACTIONS.UPDATE_EXPERIENCE:
      return {
        ...state,
        experienceList: state.experienceList.map((exp, index) =>
          index === action.index
            ? { ...exp, [action.field]: action.value }
            : exp
        ),
      };

    case ACTIONS.ADD_EXPERIENCE:
      return {
        ...state,
        experienceList: [
          ...state.experienceList,
          {
            id: `exp-${Date.now()}`,
            company: '',
            title: '',
            startDate: '',
            endDate: '',
            description: '',
          },
        ],
      };

    case ACTIONS.REMOVE_EXPERIENCE:
      if (state.experienceList.length <= 1) return state;
      return {
        ...state,
        experienceList: state.experienceList.filter(
          (_, index) => index !== action.index
        ),
      };

    case ACTIONS.UPDATE_SKILLS:
      return {
        ...state,
        skills: action.skills,
      };

    case ACTIONS.UPDATE_PROJECTS:
      return {
        ...state,
        projects: state.projects.map((proj, index) =>
          index === action.index
            ? { ...proj, [action.field]: action.value }
            : proj
        ),
      };

    case ACTIONS.ADD_PROJECT:
      return {
        ...state,
        projects: [
          ...state.projects,
          {
            id: `proj-${Date.now()}`,
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            link: '',
          },
        ],
      };

    case ACTIONS.REMOVE_PROJECT:
      if (state.projects.length <= 1) return state;
      return {
        ...state,
        projects: state.projects.filter((_, index) => index !== action.index),
      };

    case ACTIONS.UPDATE_LANGUAGES:
      return {
        ...state,
        languages: action.languages,
      };

    case ACTIONS.UPDATE_SECTION_ORDER:
      return {
        ...state,
        sectionOrder: action.sectionOrder,
      };

    case ACTIONS.TOGGLE_SECTION_VISIBILITY:
      return {
        ...state,
        sectionOrder: state.sectionOrder.map((section) =>
          section.id === action.sectionId
            ? { ...section, visible: !section.visible }
            : section
        ),
      };

    case ACTIONS.TOGGLE_SECTION_COLLAPSE:
      return {
        ...state,
        collapsedSections: {
          ...state.collapsedSections,
          [action.sectionId]: !state.collapsedSections[action.sectionId],
        },
      };

    case ACTIONS.RESET_ALL:
      return initialState;

    case ACTIONS.IMPORT_DATA:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
}

// Provider component
export function CVProvider({ children }) {
  // Load initial state from localStorage
  const [storedPersonal] = useLocalStorage(
    'cv-personal',
    initialState.personal
  );
  const [storedEducationList] = useLocalStorage(
    'cv-education-list',
    initialState.educationList
  );
  const [storedExperienceList] = useLocalStorage(
    'cv-experience-list',
    initialState.experienceList
  );
  const [storedSkills] = useLocalStorage('cv-skills', initialState.skills);
  const [storedProjects] = useLocalStorage(
    'cv-projects',
    initialState.projects
  );
  const [storedLanguages] = useLocalStorage(
    'cv-languages',
    initialState.languages
  );
  const [storedSectionOrder] = useLocalStorage(
    'cv-section-order',
    initialState.sectionOrder
  );
  const [storedCollapsedSections] = useLocalStorage(
    'cv-collapsed-sections',
    initialState.collapsedSections
  );

  // Merge stored data with initial state
  const mergedInitialState = {
    personal: storedPersonal,
    educationList: storedEducationList,
    experienceList: storedExperienceList,
    skills: storedSkills,
    projects: storedProjects,
    languages: storedLanguages,
    sectionOrder: storedSectionOrder,
    collapsedSections: storedCollapsedSections,
  };

  const [state, dispatch] = useReducer(cvReducer, mergedInitialState);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('cv-personal', JSON.stringify(state.personal));
  }, [state.personal]);

  useEffect(() => {
    localStorage.setItem(
      'cv-education-list',
      JSON.stringify(state.educationList)
    );
  }, [state.educationList]);

  useEffect(() => {
    localStorage.setItem(
      'cv-experience-list',
      JSON.stringify(state.experienceList)
    );
  }, [state.experienceList]);

  useEffect(() => {
    localStorage.setItem('cv-skills', JSON.stringify(state.skills));
  }, [state.skills]);

  useEffect(() => {
    localStorage.setItem('cv-projects', JSON.stringify(state.projects));
  }, [state.projects]);

  useEffect(() => {
    localStorage.setItem('cv-languages', JSON.stringify(state.languages));
  }, [state.languages]);

  useEffect(() => {
    localStorage.setItem(
      'cv-section-order',
      JSON.stringify(state.sectionOrder)
    );
  }, [state.sectionOrder]);

  useEffect(() => {
    localStorage.setItem(
      'cv-collapsed-sections',
      JSON.stringify(state.collapsedSections)
    );
  }, [state.collapsedSections]);

  return (
    <CVContext.Provider value={{ state, dispatch }}>
      {children}
    </CVContext.Provider>
  );
}

CVProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the CV context
export function useCV() {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
}

export default CVContext;
