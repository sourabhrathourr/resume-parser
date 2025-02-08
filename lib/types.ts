export interface PersonalDetails {
  name: string;
  phone?: string;
  email: string;
  linkedin?: string;
  github?: string;
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  location: string;
  gpa?: string;
  highlights?: string[];
}

export interface TechnicalSkills {
  languagesFrameworks?: string[];
  databasesORMs?: string[];
  backendTechnologies?: string[];
  developerTools?: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  highlights: string[];
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  responsibilities: string[];
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  education: Education[];
  technicalSkills: TechnicalSkills;
  projects: Project[];
  experience: Experience[];
} 