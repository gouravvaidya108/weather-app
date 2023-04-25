import React, { useState } from 'react';
import styles from './SwitchButton.module.css';

interface SwitchButtonProps {
  onSwitchToggle: (isOn: boolean) => void;
  isCelsius:boolean
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ onSwitchToggle,isCelsius }) =>{
  const [isOn, setIsOn] = useState<boolean>(isCelsius);

  const handleClick = () => {
    onSwitchToggle(!isOn);
  };

  return (
    <div className={styles.switchContainer}>
      <label className={`${styles.switch} ${isOn ? styles.on : styles.off}`} onClick={handleClick}>
        <span className={styles.slider}>
          <span className={styles.sliderText}>{isOn ? '°C' : '°F'}</span>
        </span>
      </label>
    </div>
  );
};

export default SwitchButton;
