import MatchModel from '../../database/models/MatchModel';

export default interface MatchRepository {
  getMatches(): Promise<MatchModel[]>;
  getInProgressMatches(inProgress: boolean): Promise<MatchModel[]>;
}
