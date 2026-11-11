export interface MissionChoice {
  id: string;
  label: string;
  subLabel?: string;
  isCorrect: boolean;
  iconName: string;
  accentColor: string;
  speechText: string;
}

export interface PlantMission {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  themeColor: string;
  badge: string;
  question: string;
  questionSpeech: string;
  choices: MissionChoice[];
  factCard: {
    plantName: string;
    fact: string;
    description: string;
    icon: string;
    category: string;
  };
}

export interface StudentProfile {
  name: string;
  grade: 'TK A' | 'TK B';
  character: 'bimo' | 'ayu';
  suns: number; // 0 to 10
  unlockedMission: number; // 1 to 10
  completedMissions: number[]; // e.g. [1, 2, 3]
  homeworkMissions: number[]; // 5 chosen missions for PR
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  grade: string;
  character: 'bimo' | 'ayu';
  suns: number;
  date: string;
}
