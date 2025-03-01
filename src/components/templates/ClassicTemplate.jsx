import PropTypes from 'prop-types';

const ClassicTemplate = ({
  personal,
  educationList,
  experienceList,
  skills,
  projects,
  languages,
  visibleSections,
}) => {
  return (
    <>
      <div className="bg-blue-300/60 border-2 border-blue-700 p-4 flex flex-col gap-4 items-center">
        <p className="text-3xl font-bold leading-8">{personal.name}</p>
        <div className="flex gap-8 flex-wrap justify-center">
          <p>{personal.email}</p>
          <p>{personal.phone}</p>
          <p>{personal.location}</p>
        </div>
      </div>

      <div className="bg-black/10 p-4 flex-1">
        {/* Education Section */}
        {visibleSections.includes('education') && (
          <div className="mb-6">
            <h1 className="text-xl font-semibold border-b-2 border-black mb-4">
              Education
            </h1>
            {educationList.map((education) => (
              <div key={education.id} className="mb-4 last:mb-0">
                <p className="font-semibold">{education.school}</p>
                <p className="text-gray-700">{education.degree}</p>
                <p className="text-sm text-gray-600">
                  {education.startDate} - {education.endDate}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Experience Section */}
        {visibleSections.includes('experience') && (
          <div className="mb-6">
            <h1 className="text-xl font-semibold border-b-2 border-black mb-4">
              Work Experience
            </h1>
            {experienceList.map((experience) => (
              <div key={experience.id} className="mb-4 last:mb-0">
                <p className="font-semibold">{experience.company}</p>
                <p className="text-gray-700">{experience.title}</p>
                <p className="text-sm text-gray-600">
                  {experience.startDate} - {experience.endDate}
                </p>
                <p className="mt-1">{experience.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills Section */}
        {visibleSections.includes('skills') && skills.length > 0 && (
          <div className="mb-6">
            <h1 className="text-xl font-semibold border-b-2 border-black mb-4">
              Skills
            </h1>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 px-2 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects Section */}
        {visibleSections.includes('projects') && (
          <div className="mb-6">
            <h1 className="text-xl font-semibold border-b-2 border-black mb-4">
              Projects
            </h1>
            {projects.map((project) => (
              <div key={project.id} className="mb-4 last:mb-0">
                <div className="flex justify-between">
                  <p className="font-semibold">{project.title}</p>
                  <p className="text-sm text-gray-600">
                    {project.startDate} - {project.endDate}
                  </p>
                </div>
                <p className="mt-1">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    {project.link}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Languages Section */}
        {visibleSections.includes('languages') && languages.length > 0 && (
          <div className="mb-6">
            <h1 className="text-xl font-semibold border-b-2 border-black mb-4">
              Languages
            </h1>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((language) => (
                <div key={language.id} className="flex justify-between">
                  <span>{language.name}</span>
                  <span className="capitalize text-gray-600">
                    {language.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

ClassicTemplate.propTypes = {
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
};

export default ClassicTemplate;
