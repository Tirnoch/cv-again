import { useState } from 'react';
import Personal from './components/Personal';
import Experience from './components/Experience';
import Education from './components/Education';
import Template from './components/Template';

const App = () => {
  const [personal, setPersonal] = useState({
    name: 'Damla OZ',
    email: 'tahmin@baka.lim',
    phone: '+90123456',
    location: 'Bursa, Turkiye',
  });
  const [education, setEducation] = useState({
    school: 'Mimar Sinan University',
    degree: 'Sanat ve Sepet Isleri',
    startDate: '01.01.2001',
    endDate: '02.02.2002',
  });
  const [experience, setExperience] = useState({
    company: 'Random Grafik Tasarim Atolyesi',
    title: 'Grafik Tasarim Bacisi',
    startDate: '03.03.2003',
    endDate: '04.04.2004',
    description: 'done this and that for some time for sure',
  });

  const handlePersonalChange = (e) => {
    const { id, value } = e.target;
    setPersonal({ ...personal, [id]: value });
  };
  const handleEducationChange = (e) => {
    const { id, value } = e.target;
    setEducation({ ...education, [id]: value });
  };
  const handleExperienceChange = (e) => {
    const { id, value } = e.target;
    setExperience({ ...experience, [id]: value });
  };

  return (
    <>
      <div className="grid min-w-full md:grid-cols-[1fr_3fr] grid-cols-1 gap-4 min-h-screen">
        <div className="m-4 flex flex-col">
          <Personal
            name={personal.name}
            email={personal.email}
            phone={personal.phone}
            location={personal.location}
            handleChange={handlePersonalChange}
          />
          <div className="my-4"></div>
          <Education
            school={education.school}
            degree={education.degree}
            startDate={education.startDate}
            endDate={education.endDate}
            handleChange={handleEducationChange}
          />
          <div className="my-4"></div>
          <Experience
            company={experience.company}
            title={experience.title}
            startDate={experience.startDate}
            endDate={experience.endDate}
            description={experience.description}
            handleChange={handleExperienceChange}
          />
        </div>
        <div className="m-4 flex flex-col border border-black shadow-md">
          <Template
            name={personal.name}
            email={personal.email}
            phone={personal.phone}
            location={personal.location}
            schoolName={education.school}
            schoolDegree={education.degree}
            schoolStart={education.startDate}
            schoolEnd={education.endDate}
            companyName={experience.company}
            companyTitle={experience.title}
            companyStart={experience.startDate}
            companyEnd={experience.endDate}
            companyDescription={experience.description}
          />
        </div>
      </div>
    </>
  );
};

export default App;
