type User = {
  id: string;
  heroes: Hero[];
};

type Hero = {
  id: string;
  name: string;
  language: string;
  goals: Goal[];
};

type Goal = {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  kpis: GoalKpi[]; // quantitative representation of the goal
  measurements: Measurement[]; // real measurements of progress, entered by a user
  createdAt: Date;
  updatedAt: Date;
  experience: number; // experience points gained by completing the goal quests
  levels: GoalLevel[]; // goals that are accomplished by completing this goal
  skills: Skill[];
  // levels: GoalLevel[];
};

type Skill = {
  id: string;
  name: string;
  logoUrl: string;
  description: string; // describes a nature of this attribute
  goalId: string;
  level: number;
  experience: number;
  experienceToTheNextLevel: number;
};

type Measurement = {
  id: string;
  kpiId: string;
  goalId: string;
  currentPoint: string;
  currentLevel: number; // on what level this measurement was done
  createdAt: Date;
  updatedAt: Date;
  comments: string;
};

type GoalKpi = {
  id: string;
  title: string;
  startingPoint: string;
  endingPoint: string;
  createdAt: Date;
  updatedAt: Date;
  goalId: string;
};

type GoalLevel = {
  id: string;
  level: number;
  status: 'active' | 'accomplished';
  goalId: string;
  // the value is aggregated with previous levels points
  experienceNeeded: number; // how many experience points are needed to level up, use logarithmic growth to calculate next level (base XP & log(level) + 1)
  accomplishmentSummary: string; // when the level is accomplished, the summary of the level by finished quests and user comments will be generated into this field
};

type Quest = {
  type: 'timebased';
  title: string;
  description: string;
  goalId: string;
  experience: number;
  skillsExperience: Array<{ skillId: string; experience: number }>;
  deadlineInSeconds: number; // how many seconds a user has to accomplish the quest after it's acceptance
};

type PathProgress = {
  pathId: string;
  level: number;
};

const quests: Quest[] = [];

const goal1: Goal = {
  id: 'goal-id-1',
  name: 'Weight loss',
  logoUrl: 'https://example.com/logo.png',
  description: 'Improve my body shape',
  levels: [
    {
      id: 'level-id-1',
      level: 1,
      status: 'active',
      goalId: 'goal-id-1',
      experienceNeeded: 100,
      accomplishmentSummary: '',
    },
  ],
  skills: [
    {
      id: 'skill-id-1',
      name: 'Strength',
      logoUrl: 'https://example.com/strength.png',
      description: 'How strong you are',
      goalId: 'goal-id-1',
      level: 1,
      experience: 0,
      experienceToTheNextLevel: 100,
    },
  ],
  kpis: [
    {
      goalId: 'goal-id-1',
      id: 'kpi-id-1',
      title: 'Weight',
      startingPoint: '115kg',
      endingPoint: '100kg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  measurements: [
    {
      id: 'measurement-id-1',
      kpiId: 'kpi-id-1',
      goalId: 'goal-id-1',
      currentPoint: '114kg',
      currentLevel: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      comments: 'I am doing well',
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
  experience: 0,
};

const alexTheHero: Hero = {
  id: 'hero-id-1',
  name: 'Alex',
  language: 'en',
  goals: [goal1],
};

const user: User = {
  id: 'user-id-1',
  heroes: [alexTheHero],
};
