import LeaderboardRow, { Leaderboard } from '../Interfaces/LeaderboardRow';
import TeamRepository from '../repository/team/teamRepository';
import SequelizeTeamRepository from '../repository/team/sequelizeTeamRepository';

function sort(leaderboard: Leaderboard[]) {
  return leaderboard.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });
}

export default class LearderboardService {
  constructor(
    private readonly teamRepositoy: TeamRepository = new SequelizeTeamRepository(),
  ) { }

  async getLeaderboardHome() {
    const matches = await this.teamRepositoy.getTeamsWithMatches();
    const leaderboard = matches.map((match) => {
      const leaderboardRow = new LeaderboardRow(match.teamName);
      if (match.homeMatches) leaderboardRow.addHomeMatchData(match.homeMatches);
      return leaderboardRow.getFormattedData();
    });

    const sortedLeaderboard = sort(leaderboard);

    return sortedLeaderboard;
  }

  async getLeaderboardAway() {
    const matches = await this.teamRepositoy.getTeamsWithMatches();
    const leaderboard = matches.map((match) => {
      const leaderboardRow = new LeaderboardRow(match.teamName);
      if (match.awayMatches) leaderboardRow.addAwayMatchData(match.awayMatches);
      return leaderboardRow.getFormattedData();
    });

    const sortedLeaderboard = sort(leaderboard);

    return sortedLeaderboard;
  }

  async getLeaderboard() {
    const matches = await this.teamRepositoy.getTeamsWithMatches();
    const leaderboard = matches.map((match) => {
      const leaderboardRow = new LeaderboardRow(match.teamName);
      if (match.homeMatches) leaderboardRow.addHomeMatchData(match.homeMatches);
      if (match.awayMatches) leaderboardRow.addAwayMatchData(match.awayMatches);
      return leaderboardRow.getFormattedData();
    });

    const sortedLeaderboard = sort(leaderboard);

    return sortedLeaderboard;
  }
}
