
export interface Producer {
  id: string;
  name: string;
  style: string;
  category: string;
}

export interface Persona {
  name: string;
  tag: string;
}

export type PerformanceMode = 'duet' | 'solo_rap' | 'solo_singer';

export interface SongFormData {
  performanceMode: PerformanceMode;
  producerId: string;
  rapperName: string;
  singerName: string;
  topic: string;
  fileContext?: string;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  config: Partial<SongFormData>;
}

export interface GenerationResult {
  stylePrompt: string;
  lyrics: string;
}
