import { TInterviewStage } from '../services/candidate/candidate.interface';

export const candidateStatus = [
  {
    label: 'Opportunity Browsing',
    count: 66,
  },
  {
    label: 'Applied',
    count: 74,
  },
  {
    label: 'Shortlisted',
    count: 10,
  },
  {
    label: 'Video Interview I',
    count: 160,
  },
  {
    label: 'Video Interview II',
    count: 148,
  },
  {
    label: 'Video Interview III',
    count: 189,
  },
  {
    label: 'Offer',
    count: 7,
  },
  {
    label: 'Withdrawn',
    count: 142,
  },
];

export const interviewStages: Array<{ label: TInterviewStage; key: number }> = [
  {
    label: 'Video Interview I',
    key: 1,
  },
  {
    label: 'Video Interview II',
    key: 2,
  },
  {
    label: 'Video Interview III',
    key: 3,
  },
];

export const candidatesData = [{}];
