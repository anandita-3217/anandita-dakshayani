// src/utils/iconMap.js
import { GraduationCap, DatabaseZap } from 'lucide-react';
import { DiReact, DiJavascript1, DiNodejsSmall,DiPython } from "react-icons/di";
import { BsGlobe } from "react-icons/bs";

export const iconMap = {
  GraduationCap: GraduationCap,
  DiReact: DiReact,
  BsGlobe: BsGlobe,
  DiJavascript1: DiJavascript1,
  DiNodejsSmall: DiNodejsSmall,
  DatabaseZap: DatabaseZap,
  DiPython: DiPython,
};

// Helper function to get icon component
export const getIcon = (iconType, color) => {
  const IconComponent = iconMap[iconType];
  return IconComponent ? <IconComponent color={color} /> : null;
};