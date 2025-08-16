import React from 'react';

type TagColor = 'blue' | 'green' | 'purple' | 'red' | 'gray';

interface ColoredTagProps {
  label: string;
  color: TagColor;
  className?: string;
}

const colorMap: Record<TagColor, { bg: string; text: string }> = {
  blue: { bg: 'bg-[#1e2a53]', text: 'text-[#60a5fa]' },
  green: { bg: 'bg-[#0e2d23]', text: 'text-[#34d399]' },
  purple: { bg: 'bg-[#2b184b]', text: 'text-[#c084fc]' },
  red: { bg: 'bg-[#3b0d0c]', text: 'text-[#f87171]' },
  gray: { bg: 'bg-[#1f2937]', text: 'text-[#9ca3af]' },
};

const ColoredTag = ({ label, color, className = '' }: ColoredTagProps) => {
  const { bg, text } = colorMap[color] || colorMap.gray;

  return (
    <span
      className={`flex items-center px-4 py-1 rounded-md text-sm font-medium font-jetbrains desktopMax:text-[13px] ${bg} ${text} ${className}`}
    >
      {label}
    </span>
  );
};

export default ColoredTag;
