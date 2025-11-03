import { useState } from 'react';
import * as SimpleIcons from 'react-icons/si';

interface SkillIconProps {
  iconPath: string;
  color?: string;
  name: string;
}

export default function SkillIcon({ iconPath, color = '#F54927', name }: SkillIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Extract icon name from path
  const iconName = iconPath.split('/')[1];
  const Icon = (SimpleIcons as any)[iconName];

  if (!Icon) {
    console.warn(`Icon ${iconName} not found`);
    return null;
  }

  return (
    <div
      className="group bg-white dark:bg-[#2a2a2a] rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon 
        className="w-12 h-12 transition-all duration-300 hover:scale-125" 
        style={{
          color: isHovered ? color : '#9CA3AF' // Gray when not hovered, brand color when hovered
        }}
      />
      <span className="font-medium text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
        {name}
      </span>
    </div>
  );
}
