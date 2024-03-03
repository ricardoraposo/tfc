import { Match } from './Match';

export interface Team {
  id: number;
  teamName: string;
  homeMatches?: Match[],
  awayMatches?: Match[],
}
