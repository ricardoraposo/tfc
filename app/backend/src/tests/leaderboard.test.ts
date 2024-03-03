import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import TeamModel from '../database/models/TeamModel';
import { leaderboardAllMock, leaderboardAwayMock, leaderboardHomeMock, teamWithMatchesMock } from './mocks/team.mock';

import { app } from '../app';
import httpCode from '../utils/httpCode';

chai.use(chaiHttp);

const { expect } = chai;

describe('Leaderboard integration tests', function() {
  beforeEach(async () => {
    sinon.restore();
  });

  it('should return a home matches leaderboard', async function() {
    sinon.stub(TeamModel, 'findAll').resolves([teamWithMatchesMock] as any);

    const res = await chai.request(app).get('/leaderboard/home');

    expect(res.status).to.equal(httpCode.ok);
    expect(res.body).to.deep.equal(leaderboardHomeMock);
  });

  it('should return a home matches leaderboard', async function() {
    sinon.stub(TeamModel, 'findAll').resolves([teamWithMatchesMock] as any);

    const res = await chai.request(app).get('/leaderboard/away');

    expect(res.status).to.equal(httpCode.ok);
    expect(res.body).to.deep.equal(leaderboardAwayMock);
  });

  it('should return a home matches leaderboard', async function() {
    sinon.stub(TeamModel, 'findAll').resolves([teamWithMatchesMock] as any);

    const res = await chai.request(app).get('/leaderboard');

    expect(res.status).to.equal(httpCode.ok);
    expect(res.body).to.deep.equal(leaderboardAllMock);
  });
});

