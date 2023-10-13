import { IQuery } from '../../lib/interfaces/generalTypes';

export interface ICandidate {
  personalInformation: IPersonalInformation;
  education: IEducation[];
  tag: string[];
  skills: string[];
  profileImage: string;
  interviewStage: TInterviewStage;
  id: string;
}

export interface IPersonalInformation {
  firstName: string;
  lastName: string;
  emailId: string;
  currentResidence: string;
}

export interface IEducation {
  institution: string;
  from: number;
  to: number;
  level: string;
}

export const interviewStageList = [
  'Opportunity Browsing',
  'Applied',
  'Technical Interview',
  'Shortlisted',
  'Video Interview I',
  'Video Interview II',
  'Video Interview III',
  'Offer',
  'Withdrawn',
] as const;

export type TInterviewStage = (typeof interviewStageList)[number];

export interface ICandidateQuery extends IQuery {}
