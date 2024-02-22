import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';

import { Settings } from './Settings.view';

const SettingsViewModel = () => {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState(i18n.language);

  const handleChangeLanguage = (code: string): void => {
    setSelected(`${code}`);
    i18n.changeLanguage(code);
  };

  const controllers = {
    selected,
    handleChangeLanguage
  };

  return <Settings controllers={controllers} />
};

export default SettingsViewModel;
