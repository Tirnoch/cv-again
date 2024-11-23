import { useState } from 'react';
import PersonalInput from './PersonalInput';

const App = () => {
  const [personal, setPersonal] = useState({
    name: 'Damla OZ',
    mail: 'tahmin@baka.lim',
    phone: '+90123456',
    location: 'Bursa, Turkiye',
  });
  const [education, setEducation] = useState([
    {
      school: 'Mimar Sinan University',
      degree: 'Sanat ve Sepet Isleri',
      startDate: '01.01.2001',
      endDate: '02.02.2002',
      id: crypto.randomUUID(),
    },
  ]);
  const [experience, setExperience] = useState([
    {
      company: 'Random Grafik Tasarim Atolyesi',
      title: 'Grafik Tasarim Bacisi',
      startDate: '03.03.2003',
      endDate: '04.04.2004',
      description: '',
      id: crypto.randomUUID(),
    },
  ]);

  const handleInputName = () => {
    let update = document.querySelector('#inputName');
    setPersonal({ ...personal, name: update.value });
  };
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <PersonalInput data={personal} fetchName={handleInputName} />
    </>
  );
};

export default App;
