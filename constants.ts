// constants.ts

import { User, Subject, IBProgramme, IBLevel, ExtendedEssay, CASPortfolio, TimetableEvent, AtlSkill, LessonTopic, Community, Post, Lesson, StudyBuddy, University, WellbeingActivity } from './types';

export const IB_SUBJECTS: Subject[] = [
  // Group 1
  { id: 'eng-a-lit', name: 'English A: Literature', group: 'Group 1: Studies in Language and Literature' },
  { id: 'spa-a-lit', name: 'Spanish A: Literature', group: 'Group 1: Studies in Language and Literature' },
  // Group 2
  { id: 'eng-b', name: 'English B', group: 'Group 2: Language Acquisition' },
  { id: 'fre-b', name: 'French B', group: 'Group 2: Language Acquisition' },
  // Group 3
  { id: 'history', name: 'History', group: 'Group 3: Individuals and Societies' },
  { id: 'psych', name: 'Psychology', group: 'Group 3: Individuals and Societies' },
  // Group 4
  { id: 'bio', name: 'Biology', group: 'Group 4: Sciences' },
  { id: 'chem', name: 'Chemistry', group: 'Group 4: Sciences' },
  // Group 5
  { id: 'math-aa', name: 'Mathematics: Analysis and Approaches', group: 'Group 5: Mathematics' },
  { id: 'math-ai', name: 'Mathematics: Applications and Interpretation', group: 'Group 5: Mathematics' },
  // Group 6
  { id: 'vis-arts', name: 'Visual Arts', group: 'Group 6: The Arts' },
  { id: 'music', name: 'Music', group: 'Group 6: The Arts' },
  { id: 'theater', name: 'Theater', group: 'Group 6: The Arts' },
  // MYP Core
  { id: 'phe', name: 'Physical and Health Education', group: 'MYP Core' },
  { id: 'design', name: 'Design', group: 'MYP Core' },
];

const MOCK_SUBJECTS_SELECTION = [
    { subject: IB_SUBJECTS.find(s => s.id === 'eng-a-lit')!, level: IBLevel.HL },
    { subject: IB_SUBJECTS.find(s => s.id === 'history')!, level: IBLevel.HL },
    { subject: IB_SUBJECTS.find(s => s.id === 'bio')!, level: IBLevel.HL },
    { subject: IB_SUBJECTS.find(s => s.id === 'math-aa')!, level: IBLevel.SL },
    { subject: IB_SUBJECTS.find(s => s.id === 'fre-b')!, level: IBLevel.SL },
    { subject: IB_SUBJECTS.find(s => s.id === 'vis-arts')!, level: IBLevel.SL },
];


export const MOCK_USER: User = {
  id: 'user-123',
  firstName: 'Alex',
  lastName: 'Chen',
  email: 'alex.chen@ibstudent.com',
  bio: 'DP Year 2 student passionate about biology and history. Aiming for a career in biotech research. Always looking for study buddies!',
  avatarUrl: `https://api.dicebear.com/8.x/avataaars/svg?seed=Alex`,
  programme: IBProgramme.DP,
  subjects: MOCK_SUBJECTS_SELECTION,
  streak: 0, // Reset streak for new user experience
  onboardingComplete: false,
  coreProgress: {
    tok: 'on-track',
    ee: 'at-risk',
    cas: 'on-track',
  },
  subjectProgress: {
    'eng-a-lit': { completion: 75, predictedScore: 6 },
    'history': { completion: 60, predictedScore: 5 },
    'bio': { completion: 85, predictedScore: 7 },
    'math-aa': { completion: 50, predictedScore: 6 },
    'fre-b': { completion: 90, predictedScore: 7 },
    'vis-arts': { completion: 40, predictedScore: 5 },
  },
  atlSkills: {
    'Thinking': 80,
    'Communication': 75,
    'Social': 60,
    'Self-management': 85,
    'Research': 90,
  },
  timetable: [], // This will be populated by MOCK_TIMETABLE_EVENTS
  uniFrogProfile: null,
};

export const MOCK_TIMETABLE_EVENTS: TimetableEvent[] = [
    { id: 'evt1', title: 'Math AA SL - Review Chapter 5', start: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), end: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), type: 'subject', completed: false, subjectId: 'math-aa' },
    { id: 'evt2', title: 'History HL - IA Draft Due', start: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), end: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), type: 'ia', completed: false, subjectId: 'history' },
    { id: 'evt3', title: 'Biology HL - Lab Report', start: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(), end: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(), type: 'subject', completed: false, subjectId: 'bio' },
    { id: 'evt4', title: 'CAS - Volunteer at Shelter', start: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString(), end: new Date(new Date().setDate(new Date().getDate() + 4)).toISOString(), type: 'cas', completed: false },
    { id: 'evt5', title: 'EE Check-in with Supervisor', start: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(), end: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(), type: 'ee', completed: true },
];

MOCK_USER.timetable = MOCK_TIMETABLE_EVENTS;

export const ATL_SKILL_DEFINITIONS: Record<AtlSkill, string> = {
  'Thinking': 'Critical thinking, creativity and innovation, transfer skills.',
  'Communication': 'Exchanging thoughts, messages and information effectively.',
  'Social': 'Collaboration and interpersonal skills.',
  'Self-management': 'Organization, affective and reflection skills.',
  'Research': 'Information literacy and media literacy.',
};

export const MOCK_EE_PROJECT: ExtendedEssay = {
    id: 'ee-1',
    researchQuestion: 'To what extent was the decline of the Ottoman Empire in the 19th century a result of internal factors?',
    subject: 'History',
    supervisor: 'Mr. Davies',
    rubricProgress: { A: 4, B: 5, C: 9, D: 3, E: 5 } // max 6, 6, 12, 4, 6
}

export const MOCK_CAS_PORTFOLIO: CASPortfolio = {
    activities: [
        { id: 'cas1', title: 'Varsity Soccer Team', type: 'Activity', hours: 45, learningOutcomes: ['LO1', 'LO4'] },
        { id: 'cas2', title: 'Volunteering at Food Bank', type: 'Service', hours: 30, learningOutcomes: ['LO2', 'LO5', 'LO6'] },
        { id: 'cas3', title: 'Learning Guitar', type: 'Creativity', hours: 25, learningOutcomes: ['LO1', 'LO2'] },
    ]
}

export const IBO_LINKS = {
    HOME: 'https://www.ibo.org/',
    DP_HOME: 'https://www.ibo.org/programmes/diploma-programme/',
    CP_HOME: 'https://www.ibo.org/programmes/career-related-programme/',
    MYP_HOME: 'https://www.ibo.org/programmes/middle-years-programme/',
    TOK_GUIDE: 'https://www.ibo.org/programmes/diploma-programme/curriculum/dp-core/theory-of-knowledge/',
    TOK_WHAT_IS: 'https://www.ibo.org/programmes/diploma-programme/curriculum/dp-core/theory-of-knowledge/what-is-tok/',
    EE_GUIDE: 'https://www.ibo.org/programmes/diploma-programme/curriculum/extended-essay/',
    CAS_GUIDE: 'https://www.ibo.org/programmes/diploma-programme/curriculum/creativity-activity-and-service/'
};


export const MOCK_LESSON_TOPICS: LessonTopic[] = [
    {
        id: 'bio-topic-1',
        subjectId: 'bio',
        name: 'Cell Biology',
        lessons: [
            { id: 'l1-bio', title: 'Introduction to Cells', type: 'video', duration: 15, completed: true, subjectId: 'bio', topicId: 'bio-topic-1', xp: 150, atlSkills: ['Thinking', 'Research'], difficulty: 'easy' },
            { id: 'l2-bio', title: 'Cell Structure Quiz', type: 'quiz', duration: 10, completed: false, subjectId: 'bio', topicId: 'bio-topic-1', xp: 100, atlSkills: ['Thinking'], difficulty: 'medium' },
        ]
    },
    {
        id: 'hist-topic-1',
        subjectId: 'history',
        name: 'The Move to Global War',
        lessons: [
            { id: 'l3-hist', title: 'Japanese Expansionism', type: 'reading', duration: 20, completed: true, subjectId: 'history', topicId: 'hist-topic-1', xp: 200, atlSkills: ['Research'], difficulty: 'medium' },
            { id: 'l4-hist', title: 'German and Italian Expansionism', type: 'video', duration: 18, completed: true, subjectId: 'history', topicId: 'hist-topic-1', xp: 180, atlSkills: ['Thinking'], difficulty: 'medium' },
        ]
    },
    {
        id: 'math-topic-1',
        subjectId: 'math-aa',
        name: 'Algebra',
        lessons: [
            { id: 'l1-math', title: 'Sequences and Series', type: 'quiz', duration: 25, completed: false, subjectId: 'math-aa', topicId: 'math-topic-1', xp: 250, atlSkills: ['Thinking', 'Self-management'], difficulty: 'hard' },
        ]
    },
     {
        id: 'eng-topic-1',
        subjectId: 'eng-a-lit',
        name: 'Literary Analysis',
        lessons: [
            { id: 'l1-eng', title: 'Understanding Poetic Devices', type: 'quiz', duration: 15, completed: false, subjectId: 'eng-a-lit', topicId: 'eng-topic-1', xp: 150, atlSkills: ['Thinking', 'Communication'], difficulty: 'easy' },
        ]
    },
];

export const MOCK_LESSONS_WITH_CONTENT: Lesson[] = [
    {
        id: 'l1-math', title: 'Sequences and Series', type: 'quiz', duration: 25, completed: false, subjectId: 'math-aa', topicId: 'math-topic-1', xp: 250, atlSkills: ['Thinking', 'Self-management'],
        content: "An arithmetic sequence is a sequence of numbers such that the difference between the consecutive terms is constant. This constant difference is called the common difference, denoted by 'd'.",
        questions: [
            { id: 'q1', type: 'mcq', text: 'What is the next term in the arithmetic sequence: 3, 7, 11, ...?', options: ['14', '15', '16', '18'], correctAnswer: '15', explanation: 'The common difference is 7 - 3 = 4. So the next term is 11 + 4 = 15.' },
            { id: 'q2', type: 'frq', text: 'Find the 10th term of an arithmetic sequence where the first term is 2 and the common difference is 5.', correctAnswer: '47', explanation: 'Use the formula a_n = a_1 + (n-1)d. a_10 = 2 + (10-1)*5 = 2 + 9*5 = 47.' },
        ]
    },
    {
        id: 'l1-eng', title: 'Understanding Poetic Devices', type: 'quiz', duration: 15, completed: false, subjectId: 'eng-a-lit', topicId: 'eng-topic-1', xp: 150, atlSkills: ['Thinking', 'Communication'],
        content: "A metaphor is a figure of speech that directly refers to one thing by mentioning another. It may provide clarity or identify hidden similarities between two ideas.",
        questions: [
            { id: 'q1', type: 'mcq', text: 'Which of the following is a metaphor?', options: ['The sun is like a golden ball.', 'The classroom was a zoo.', 'He is as brave as a lion.', 'The wind whispered through the trees.'], correctAnswer: 'The classroom was a zoo.', explanation: 'It directly equates the classroom to a zoo, without using "like" or "as".'},
            { id: 'q2', type: 'mcq', text: 'What is the literary device used in "The world is a stage"?', options: ['Simile', 'Personification', 'Metaphor', 'Hyperbole'], correctAnswer: 'Metaphor', explanation: 'This is a classic example of a metaphor, comparing the world to a stage.'},
        ]
    }
];

export const MOCK_COMMUNITIES: Community[] = [
    { id: 'comm1', name: 'History HL Study Group', description: 'For all things History HL!', memberCount: 45 },
    { id: 'comm2', name: 'Math AA SL Help', description: 'Stuck on a problem? Ask here.', memberCount: 123 },
];

export const MOCK_COMMUNITY_POSTS: Post[] = [
    {
        id: 'post1',
        author: { id: 'user-456', firstName: 'Ben', avatarUrl: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Ben' },
        content: 'Does anyone have good notes on the causes of the Cold War? My mock exam is next week!',
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        likes: 12,
        comments: 4,
        communityId: 'comm1',
    },
    {
        id: 'post2',
        author: { id: 'user-789', firstName: 'Chloe', avatarUrl: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Chloe' },
        content: 'I finally understand vectors! This video was a lifesaver: [link]',
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        likes: 3,
        comments: 1,
        communityId: 'comm2',
    }
];

export const MOCK_STUDY_BUDDIES: StudyBuddy[] = [
    { id: 'sb1', firstName: 'Maria', lastName: 'G.', avatarUrl: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Maria', programme: IBProgramme.DP, commonSubjects: ['History HL', 'Biology HL'] },
    { id: 'sb2', firstName: 'Leo', lastName: 'K.', avatarUrl: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Leo', programme: IBProgramme.DP, commonSubjects: ['Math AA SL', 'French B SL'] },
    { id: 'sb3', firstName: 'Samira', lastName: 'A.', avatarUrl: 'https://api.dicebear.com/8.x/avataaars/svg?seed=Samira', programme: IBProgramme.DP, commonSubjects: ['English A HL', 'Visual Arts SL'] },
];

export const MOCK_UNIVERSITIES: University[] = [
    { id: 'uni1', name: 'University of Toronto', country: 'Canada', program: 'Life Sciences', entryRequirements: 'IB 36+', fitScore: 92, costEstimate: '$$$' },
    { id: 'uni2', name: 'Imperial College London', country: 'UK', program: 'Mechanical Engineering', entryRequirements: 'IB 40+, Math/Phys HL 7', fitScore: 88, costEstimate: '$$$$' },
    { id: 'uni3', name: 'University of California, Berkeley', country: 'USA', program: 'Computer Science', entryRequirements: 'IB 38+, Strong EE/CAS', fitScore: 85, costEstimate: '$$$$' },
];

export const MOCK_WELLBEING_ACTIVITIES: WellbeingActivity[] = [
    { id: 'wb1', type: 'breathing', title: 'Box Breathing', duration: 60 },
    { id: 'wb2', type: 'breathing', title: '4-7-8 Breathing', duration: 90 },
    { id: 'wb3', type: 'meditation', title: 'Mindful Moment', duration: 180 },
    { id: 'wb4', type: 'meditation', title: 'Body Scan', duration: 300 },
    { id: 'wb5', type: 'stretch', title: 'Neck & Shoulder Release', duration: 45 },
];