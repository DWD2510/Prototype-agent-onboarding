export type UserRole = 'newcomer' | 'mentor';

export interface User {
  id: string;
  name: string;
  role: string;
  team: string;
  department: string;
  division: string;
  startDate: string;
  email: string;
  personalEmail: string;
  mentorName: string;
  mentorRole: string;
  mentorEmail: string;
  mentorAvatar: string;
  avatar: string;
}

export interface ChecklistItem {
  id: string;
  stageId: string;
  title: string;
  completed: boolean;
  actionLabel?: string;
  actionType?: 'system' | 'doc' | 'chat' | 'link';
  systemId?: string;
  docId?: string;
  chatPrompt?: string;
  isToday?: boolean;
}

export interface RoadmapStage {
  id: string;
  name: string;
  daysLabel: string;
  goal: string;
  isCurrent: boolean;
  isLocked: boolean;
  unlockLabel?: string;
  checklistIds: string[];
  readingDocIds: string[];
}

export type AccessStatus = 'not_started' | 'pending' | 'granted';

export interface AccessSystem {
  id: string;
  name: string;
  code: string;
  category: string;
  iconName: string;
  status: AccessStatus;
  approver: string;
  typicalTime: string;
  formUrl: string;
  description: string;
  steps: string[];
}

export type DocCategory = 'all' | 'hr' | 'it' | 'process' | 'admin';

export interface DocumentItem {
  id: string;
  title: string;
  category: 'hr' | 'it' | 'process' | 'admin';
  categoryLabel: string;
  updatedAt: string;
  owner: string;
  summary: string;
  readTime: string;
  content: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  fullForm?: string;
  shortDefinition: string;
  exampleSentence?: string;
  relatedTerms: string[];
  projectTag: 'Chung' | 'GSM';
}

export interface ContactItem {
  id: string;
  problem: string;
  department: string;
  leadRole: string;
  teamEmail: string;
  channel: string;
  responseTime: string;
  iconName: string;
  tags: string[];
}

export interface OrgNode {
  id: string;
  name: string;
  level: 'division' | 'department' | 'team';
  leader: string;
  leaderTitle: string;
  responsibilities: string[];
  currentProjects?: string[];
  contactRole?: string;
  contactEmail?: string;
  children?: OrgNode[];
  isMyTeam?: boolean;
}

export interface SourceCardData {
  title: string;
  updatedAt: string;
  owner: string;
  docId?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  sourceCard?: SourceCardData;
  contactCard?: ContactItem;
  feedback?: 'like' | 'dislike';
  isFallback?: boolean;
  rawQuestion?: string;
}

export interface Mentee {
  id: string;
  name: string;
  role: string;
  team: string;
  startDate: string;
  onboardingDay: number;
  progressPercent: number;
  lastActive: string;
  warningTag?: 'slow' | 'access_repeat' | 'normal';
  warningLabel?: string;
}

export interface UnansweredQuestion {
  id: string;
  question: string;
  askedBy: string;
  timestamp: string;
  frequency: number;
  topic: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}
