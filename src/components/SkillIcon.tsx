import { useState } from "react";
import * as SimpleIcons from "react-icons/si";

interface SkillIconProps {
  iconPath: string;
  color?: string;
  name: string;
  compact?: boolean;
}

export default function SkillIcon({
  iconPath,
  color = "#F54927",
  name,
  compact = false,
}: SkillIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  const iconName = iconPath.split("/")[1];
  const Icon = (SimpleIcons as any)[iconName];

  if (!Icon) return null;

  // Compact pill: icon + label, horizontal, used in About categories
  if (compact) {
    return (
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-200 cursor-default hover:bg-gray-100 dark:hover:bg-white/5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title={name}
      >
        <Icon
          className="w-3.5 h-3.5 shrink-0 transition-colors duration-200"
          style={{ color: isHovered ? color : "#9CA3AF" }}
        />
        <span className="text-xs font-medium text-gray-500 dark:text-gray-500 whitespace-nowrap">
          {name}
        </span>
      </div>
    );
  }

  // Full card: existing behavior
  return (
    <div
      className="group bg-white dark:bg-[#111111] rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 cursor-default"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        className="w-12 h-12 transition-all duration-300 hover:scale-125"
        style={{
          color: isHovered ? color : "#9CA3AF",
        }}
      />
      <span className="font-medium text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
        {name}
      </span>
    </div>
  );
}
