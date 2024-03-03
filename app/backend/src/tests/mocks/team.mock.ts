export const teamMock = {
  id: 1,
  teamName: 'Cruzeiro',
}

export const teamWithMatchesMock = {
  id: 1,
  teamName: 'Cruzeiro',
  homeMatches: [
    {
      id: 1,
      homeTeamId: 1,
      awayTeamId: 0,
      homeTeamGoals: 2,
      awayTeamGoals: 1,
      inProgress: false,
    },
    {
      id: 2,
      homeTeamId: 1,
      awayTeamId: 3,
      homeTeamGoals: 1,
      awayTeamGoals: 3,
      inProgress: false,
    },
  ],
  awayMatches: [
    {
      id: 1,
      homeTeamId: 0,
      awayTeamId: 1,
      homeTeamGoals: 2,
      awayTeamGoals: 1,
      date: '2021-08-21T00:00:00',
      inProgress: false,
    },
    {
      id: 2,
      homeTeamId: 5,
      awayTeamId: 1,
      homeTeamGoals: 1,
      awayTeamGoals: 3,
      date: '2021-08-21T00:00:00',
      inProgress: false,
    },
  ]
}

export const leaderboardHomeMock = [{
  name: 'Cruzeiro',
  totalPoints: 3,
  totalGames: 2,
  totalVictories: 1,
  totalDraws: 0,
  totalLosses: 1,
  goalsFavor: 3,
  goalsOwn: 4,
  goalsBalance: -1,
  efficiency: 50,
}]

export const leaderboardAwayMock = [{
  name: 'Cruzeiro',
  totalPoints: 3,
  totalGames: 2,
  totalVictories: 1,
  totalDraws: 0,
  totalLosses: 1,
  goalsFavor: 4,
  goalsOwn: 3,
  goalsBalance: 1,
  efficiency: 50,
}]

export const leaderboardAllMock = [{
  name: 'Cruzeiro',
  totalPoints: 6,
  totalGames: 4,
  totalVictories: 2,
  totalDraws: 0,
  totalLosses: 2,
  goalsFavor: 7,
  goalsOwn: 7,
  goalsBalance: 0,
  efficiency: 50,
}]

export const allTeamsMock = [teamMock, teamMock]
