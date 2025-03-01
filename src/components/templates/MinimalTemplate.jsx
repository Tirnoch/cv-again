import PropTypes from 'prop-types';

const MinimalTemplate = ({
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
          <section key={sectionId} className="mb-8">
            <h2 className="text-lg uppercase tracking-widest mb-4 text-gray-500 border-b border-gray-200 pb-1">
              Experience
            </h2>
            {experienceList.map((experience) => (
              <div key={experience.id} className="mb-5">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">{experience.title}</h3>
                  <span className="text-sm text-gray-500">
                    {experience.startDate} - {experience.endDate}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{experience.company}</p>
                <p className="text-sm text-gray-700">
                  {experience.description}
                </p>
              </div>
            ))}
          </section>
        );

      case 'education':
        return (
          <section key={sectionId} className="mb-8">
            <h2 className="text-lg uppercase tracking-widest mb-4 text-gray-500 border-b border-gray-200 pb-1">
              Education
            </h2>
            {educationList.map((education) => (
              <div key={education.id} className="mb-4">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">{education.degree}</h3>
                  <span className="text-sm text-gray-500">
                    {education.startDate} - {education.endDate}
                  </span>
                </div>
                <p className="text-gray-600">{education.school}</p>
              </div>
            ))}
          </section>
        );

      case 'skills':
        return skills.length > 0 ? (
          <section key={sectionId} className="mb-8">
            <h2 className="text-lg uppercase tracking-widest mb-4 text-gray-500 border-b border-gray-200 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {skills.map((skill, index) => (
                <span key={index} className="text-gray-700">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ) : null;

      case 'projects':
        return (
          <section key={sectionId} className="mb-8">
            <h2 className="text-lg uppercase tracking-widest mb-4 text-gray-500 border-b border-gray-200 pb-1">
              Projects
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-5">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium">{project.title}</h3>
                  <span className="text-sm text-gray-500">
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-1">
                  {project.description}
                </p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 text-sm hover:text-gray-700"
                  >
                    {project.link}
                  </a>
                )}
              </div>
            ))}
          </section>
        );

      case 'languages':
        return languages.length > 0 ? (
          <section key={sectionId} className="mb-8">
            <h2 className="text-lg uppercase tracking-widest mb-4 text-gray-500 border-b border-gray-200 pb-1">
              Languages
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {languages.map((language) => (
                <div key={language.id} className="flex justify-between">
                  <span className="text-gray-800">{language.name}</span>
                  <span className="text-gray-600 capitalize text-sm">
                    {language.level}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-white p-10 font-light">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-normal tracking-wide mb-3">
          {personal.name}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600">
          <span>{personal.email}</span>
          <span>•</span>
          <span>{personal.phone}</span>
          <span>•</span>
          <span>{personal.location}</span>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full">
        {/* Render sections in the order specified by sectionOrder */}
        {sectionOrder
          .filter((section) => section.visible && section.id !== 'personal')
          .map((section) => renderSection(section.id))}
      </div>
    </div>
  );
};

MinimalTemplate.propTypes = {
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

export default MinimalTemplate;
