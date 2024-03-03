import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import MatchModel from '../database/models/MatchModel';

import { app } from '../app';
import httpCode from '../utils/httpCode';
import { matchMock, matchMockInProgress } from './mocks/match.mock';
import { sign } from 'jsonwebtoken';
import TeamModel from '../database/models/TeamModel';
import { teamMock } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

const secret = process.env.JWT_SECRET || 'segredinhoDoRaposo';
const token = sign({ id: 1 }, secret, { expiresIn: '1h' });

describe('Match integration tests', function() {
  beforeEach(async () => {
    sinon.restore();
  });

  it('should return an array of matches and status 200', async function() {
    sinon.stub(MatchModel, 'findAll').resolves([matchMock] as any);

    const res = await chai.request(app).get('/matches')

    expect(res.status).to.equal(httpCode.ok);
    expect(res.body).to.deep.equal([matchMock])
  });

  it('shoudl return an array of inProgress matches and status 200', async function() {
    sinon.stub(MatchModel, 'findAll').resolves([matchMock] as any);

    const res = await chai.request(app).get('/matches?inProgress=true');

    expect(res.status).to.equal(httpCode.ok);
    expect(res.body).to.deep.equal([matchMock]);
  });

  it('should return message "Token not found" when not token provided', async function() {
    const res = await chai.request(app).patch('/matches/h1/finish').send({})

    expect(res.status).to.equal(httpCode.unauthorized);
    expect(res.body).to.deep.equal({ message: 'Token not found' })
  });

  it('should return message "Token must be a valid token" when token is invalid', async function() {
    const res = await chai.request(app).patch('/matches/h1/finish').set({ authorization: 'Bearer invalidToken' }).send({})

    expect(res.status).to.equal(httpCode.unauthorized);
    expect(res.body).to.deep.equal({ message: 'Token must be a valid token' })
  });

  it('should return message "Finished" and status 200 when match is finished', async function() {
    sinon.stub(MatchModel, 'update').resolves([1] as any);

    const res = await chai.request(app).patch('/matches/h1/finish').set({ authorization: `Bearer ${token}` })

    expect(res.status).to.equal(httpCode.ok);
    expect(res.body).to.deep.equal({ message: 'Finished' });
  })

  it('should return message "Scores changed" and status 200', async function() {
    sinon.stub(MatchModel, 'update').resolves([1] as any);

    const res = await chai.request(app).patch('/matches/1').send({ homeTeamGoals: 2, awayTeamGoals: 1 }).set({ authorization: `Bearer ${token}` });

    expect(res.status).to.equal(httpCode.ok);
    expect(res.body).to.deep.equal({ message: 'Scores changed' });
  });

  it('should return message "It is not possible to create a match with two equal teams" and status 422', async function() {
    const res = await chai.request(app).post('/matches').send({ homeTeamId: 1, awayTeamId: 1, homeTeamGoals: 2, awayTeamGoals: 1 }).set({ authorization: `Bearer ${token}` });

    expect(res.status).to.equal(httpCode.unprocessableEntity);
    expect(res.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  });

  it('should return message "There is no team with such id!" and status 404 when team id provided is invalid', async function() {
    sinon.stub(TeamModel, 'findByPk').resolves(null as any);

    const res = await chai.request(app).post('/matches').send({ homeTeamId: 1, awayTeamId: 2, homeTeamGoals: 2, awayTeamGoals: 1 }).set({ authorization: `Bearer ${token}` });

    expect(res.status).to.equal(httpCode.notFound);
    expect(res.body).to.deep.equal({ message: 'There is no team with such id!' });
  })

  it('should return new match thingy', async function() {
    sinon.stub(TeamModel, 'findByPk').resolves(TeamModel.build(teamMock));
    sinon.stub(MatchModel, 'create').resolves(matchMockInProgress as any);

    const res = await chai.request(app).post('/matches').send({ homeTeamId: 1, awayTeamId: 2, homeTeamGoals: 2, awayTeamGoals: 1 }).set({ authorization: `Bearer ${token}` });

    expect(res.status).to.equal(httpCode.created);
    expect(res.body).to.deep.equal(matchMockInProgress);
  })
});
