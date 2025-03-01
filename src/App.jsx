import { useState, useEffect } from 'react';
import Personal from './components/Personal';
import Experience from './components/Experience';
import Education from './components/Education';
import TemplateSelector from './components/TemplateSelector';

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

  // Validation state
  const [errors, setErrors] = useState({
    personal: {},
    education: {},
    experience: {},
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

  const handleEducationChange = (e) => {
    const { id, value } = e.target;
    setEducation({ ...education, [id]: value });

    // Validate as user types
    let newErrors = { ...errors };

    if (id === 'school' && !validateRequired(value)) {
      newErrors.education.school = 'School name is required';
    } else if (id === 'school') {
      delete newErrors.education.school;
    }

    if (id === 'degree' && !validateRequired(value)) {
      newErrors.education.degree = 'Degree is required';
    } else if (id === 'degree') {
      delete newErrors.education.degree;
    }

    if (id === 'startDate' && !validateDate(value)) {
      newErrors.education.startDate = 'Please enter a valid date (DD.MM.YYYY)';
    } else if (id === 'startDate') {
      delete newErrors.education.startDate;
    }

    if (id === 'endDate' && !validateDate(value)) {
      newErrors.education.endDate = 'Please enter a valid date (DD.MM.YYYY)';
    } else if (id === 'endDate') {
      delete newErrors.education.endDate;
    }

    setErrors(newErrors);
  };

  const handleExperienceChange = (e) => {
    const { id, value } = e.target;
    setExperience({ ...experience, [id]: value });

    // Validate as user types
    let newErrors = { ...errors };

    if (id === 'company' && !validateRequired(value)) {
      newErrors.experience.company = 'Company name is required';
    } else if (id === 'company') {
      delete newErrors.experience.company;
    }

    if (id === 'title' && !validateRequired(value)) {
      newErrors.experience.title = 'Job title is required';
    } else if (id === 'title') {
      delete newErrors.experience.title;
    }

    if (id === 'startDate' && !validateDate(value)) {
      newErrors.experience.startDate = 'Please enter a valid date (DD.MM.YYYY)';
    } else if (id === 'startDate') {
      delete newErrors.experience.startDate;
    }

    if (id === 'endDate' && !validateDate(value)) {
      newErrors.experience.endDate = 'Please enter a valid date (DD.MM.YYYY)';
    } else if (id === 'endDate') {
      delete newErrors.experience.endDate;
    }

    setErrors(newErrors);
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

    // Validate education
    if (!validateRequired(education.school)) {
      newErrors.education.school = 'School name is required';
    }

    if (!validateRequired(education.degree)) {
      newErrors.education.degree = 'Degree is required';
    }

    if (!validateDate(education.startDate)) {
      newErrors.education.startDate = 'Please enter a valid date (DD.MM.YYYY)';
    }

    if (!validateDate(education.endDate)) {
      newErrors.education.endDate = 'Please enter a valid date (DD.MM.YYYY)';
    }

    // Validate experience
    if (!validateRequired(experience.company)) {
      newErrors.experience.company = 'Company name is required';
    }

    if (!validateRequired(experience.title)) {
      newErrors.experience.title = 'Job title is required';
    }

    if (!validateDate(experience.startDate)) {
      newErrors.experience.startDate = 'Please enter a valid date (DD.MM.YYYY)';
    }

    if (!validateDate(experience.endDate)) {
      newErrors.experience.endDate = 'Please enter a valid date (DD.MM.YYYY)';
    }

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
    education.school,
    education.degree,
    education.startDate,
    education.endDate,
    experience.company,
    experience.title,
    experience.startDate,
    experience.endDate,
  ]);

  // Combined CV data for template selector
  const cvData = {
    personal,
    education,
    experience,
  };

  return (
    <>
      <div className="grid min-w-full md:grid-cols-[1fr_3fr] grid-cols-1 gap-4 min-h-screen print:block">
        <div className="m-4 flex flex-col print:hidden">
          <Personal
            name={personal.name}
            email={personal.email}
            phone={personal.phone}
            location={personal.location}
            handleChange={handlePersonalChange}
            errors={errors.personal}
          />
          <div className="my-4"></div>
          <Education
            school={education.school}
            degree={education.degree}
            startDate={education.startDate}
            endDate={education.endDate}
            handleChange={handleEducationChange}
            errors={errors.education}
          />
          <div className="my-4"></div>
          <Experience
            company={experience.company}
            title={experience.title}
            startDate={experience.startDate}
            endDate={experience.endDate}
            description={experience.description}
            handleChange={handleExperienceChange}
            errors={errors.experience}
          />
        </div>
        <div className="m-4 flex flex-col border border-black shadow-md print:m-0 print:border-0 print:shadow-none print:w-full">
          <TemplateSelector cvData={cvData} />
        </div>
      </div>
    </>
  );
};

export default App;
