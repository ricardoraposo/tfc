export default interface TeamRepository {
  getTeams(): Promise<Team[]>;
}
