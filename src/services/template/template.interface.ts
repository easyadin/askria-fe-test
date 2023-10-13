import { IQuery } from '../../lib/interfaces/generalTypes';

export interface ITemplate {
  id: string;
  type: string;
  attributes: ITemplateAttributes;
}

export interface ITemplateAttributes {
  coverImage: string;
  personalInformation: IPersonalInformation;
  profile: IProfile;
  customisedQuestions: IQuestion[];
}

export interface IPersonalInformation {
  firstName: IPersonalInformationConstraints;
  lastName: IPersonalInformationConstraints;
  emailId: IPersonalInformationConstraints;
  phoneNumber: IPersonalInformationConstraints;
  nationality: IPersonalInformationConstraints;
  currentResidence: IPersonalInformationConstraints;
  idNumber: IPersonalInformationConstraints;
  dateOfBirth: IPersonalInformationConstraints;
  gender: IPersonalInformationConstraints;
  personalQuestions: IQuestion[];
}

export interface IPersonalInformationConstraints {
  internalUse: boolean;
  show: boolean;
}

export interface IProfile {
  education: IProfileConstraints;
  experience: IProfileConstraints;
  resume: IProfileConstraints;
  profileQuestions: IQuestion[];
}

export interface IProfileConstraints {
  mandatory: boolean;
  show: boolean;
}

export interface IQuestion {
  id: string;
  type: TQuestion;
  question: string;
  choices?: string[];
  maxChoice?: number;
  disqualify: boolean;
  other: boolean;
}

export const questionTypeList = [
  'Paragraph',
  'ShortAnswer',
  'YesNo',
  'Dropdown',
  'MultipleChoice',
  'Date',
  'Number',
  'FileUpload',
  // 'VideoQuestion',
] as const;

export const questionTypeLabelMaps = {
  Paragraph: 'Paragraph',
  ShortAnswer: 'Short Answer',
  YesNo: 'Yes or no',
  Dropdown: 'Dropdown',
  MultipleChoice: 'Multiple Choice',
  Date: 'Date',
  Number: 'Number',
  FileUpload: 'File Upload',
  VideoQuestion: 'Video Question',
};

export type TQuestion = (typeof questionTypeList)[number];

export interface ITemplateQuery extends IQuery {}
