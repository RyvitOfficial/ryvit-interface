'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const CSwitch = ({
  checked,
  defaultChecked = false,
  onChange,
  className = '',
}: CSwitchProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isOn = isControlled ? checked : internalChecked;

  const toggle = () => {
    const newValue = !isOn;
    if (onChange) onChange(newValue);
    if (!isControlled) setInternalChecked(newValue);
  };

  useEffect(() => {
    if (isControlled) {
      setInternalChecked(checked || false);
    }
  }, [checked, isControlled]);

  return (
    <button
      onClick={toggle}
      className={`w-12 h-7 rounded-full flex items-center px-1 transition-colors duration-300 switch ${
        isOn ? 'bg-primary justify-end' : 'bg-bgblack2 justify-start'
      } ${className}`}
    >
      <motion.div
        layout={false}
        className="w-5 h-5 bg-white rounded-full shadow"
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
      />
    </button>
  );
};

export default CSwitch;
