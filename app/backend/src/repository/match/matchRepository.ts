import MatchModel from '../../database/models/MatchModel';
import { ChangeMatchScoreDTO } from '../../dto/ChangeMatchScoreDTO';

export default interface MatchRepository {
  getMatches(): Promise<MatchModel[]>;
  getInProgressMatches(inProgress: boolean): Promise<MatchModel[]>;
  changeMatchStatus(id: number): Promise<number>;
  changeMatchScores(id: number, goals: ChangeMatchScoreDTO): Promise<number>;
}
