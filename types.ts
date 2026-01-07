
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

export interface SongFormData {
  producerId: string;
  rapperName: string;
  singerName: string;
  topic: string;
  fileContext?: string;
}

export interface GenerationResult {
  stylePrompt: string;
  lyrics: string;
}
