export interface AgentPalette {
  core: string;
  edge: string;
  rim: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  seed: number;
  palette: AgentPalette;
  bgTint: string;
  sample: string[];
}
