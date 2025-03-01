import PropTypes from 'prop-types';

const ModernTemplate = ({
  personal,
  educationList,
  experienceList,
  skills,
  projects,
  languages,
  visibleSections,
  sectionOrder,
}) => {
  // Render function for each section type
  const renderSection = (sectionId) => {
    if (!visibleSections.includes(sectionId)) return null;

    switch (sectionId) {
      case 'experience':
        return (
          <div key={sectionId} className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-300">
              Experience
            </h2>
            {experienceList.map((experience) => (
              <div key={experience.id} className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {experience.title}
                  </h3>
                  <span className="text-sm text-slate-500">
                    {experience.startDate} - {experience.endDate}
                  </span>
                </div>
                <div className="text-slate-600 font-medium">
                  {experience.company}
                </div>
                <p className="mt-2 text-slate-700">{experience.description}</p>
              </div>
            ))}
          </div>
        );

      case 'education':
        return (
          <div key={sectionId} className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-300">
              Education
            </h2>
            {educationList.map((education) => (
              <div key={education.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {education.degree}
                  </h3>
                  <span className="text-sm text-slate-500">
                    {education.startDate} - {education.endDate}
                  </span>
                </div>
                <div className="text-slate-600 font-medium">
                  {education.school}
                </div>
              </div>
            ))}
          </div>
        );

      case 'skills':
        return skills.length > 0 ? (
          <div key={sectionId} className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-300">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-slate-100 px-3 py-1 rounded text-slate-800 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ) : null;

      case 'projects':
        return (
          <div key={sectionId} className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-300">
              Projects
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-6">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold text-slate-800">
                    {project.title}
                  </h3>
                  <span className="text-sm text-slate-500">
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                <p className="mt-2 text-slate-700">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline mt-1 inline-block"
                  >
                    {project.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        );

      case 'languages':
        return languages.length > 0 ? (
          <div key={sectionId} className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-300">
              Languages
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {languages.map((language) => (
                <div key={language.id} className="flex flex-col">
                  <span className="font-medium text-slate-800">
                    {language.name}
                  </span>
                  <span className="text-sm text-slate-500 capitalize">
                    {language.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="bg-slate-800 text-white p-8">
        <h1 className="text-4xl font-bold mb-2">{personal.name}</h1>
        <div className="flex flex-wrap gap-4 text-slate-300">
          <div className="flex items-center gap-1">
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
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>{personal.email}</span>
          </div>
          <div className="flex items-center gap-1">
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>{personal.phone}</span>
          </div>
          <div className="flex items-center gap-1">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{personal.location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 bg-white">
        {/* Render sections in the order specified by sectionOrder */}
        {sectionOrder
          .filter((section) => section.visible && section.id !== 'personal')
          .map((section) => renderSection(section.id))}
      </div>
    </div>
  );
};

ModernTemplate.propTypes = {
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
};

export default ModernTemplate;
