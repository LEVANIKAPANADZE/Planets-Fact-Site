export interface PlanetSection {
  content: string;
  source: string;
}

export interface PlanetImages {
  planet: string;
  internal: string;
  geology: string;
}

export interface Planet {
  name: PlanetName;
  overview: PlanetSection;
  structure: PlanetSection;
  geology: PlanetSection;
  rotation: string;
  revolution: string;
  radius: string;
  temperature: string;
  images: PlanetImages;
  color: string;
  size: string;
  Ssize: string;
  Tsize: string;
  Dsize: string;
  DSsize: string;
}

export type PlanetInfo = "overview" | "structure" | "geology";

export type PlanetSelection = "OVERVIEW" | "STRUCTURE" | "GEOLOGY";

export type PlanetName =
  | "Mercury"
  | "Venus"
  | "Earth"
  | "Mars"
  | "Jupiter"
  | "Saturn"
  | "Uranus"
  | "Neptune";

export interface PlanetTab {
  type: PlanetSelection;
  short: string;
  full: string;
  num: string;
}