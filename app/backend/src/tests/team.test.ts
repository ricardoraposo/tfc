import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import TeamModel from '../database/models/TeamModel';
import { teamMock } from './mocks/team.mock';

import { app } from '../app';
import httpCode from '../utils/httpCode';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams integration tests', function() {
  beforeEach(async () => {
    sinon.restore();
  });

  it('should return all teams and status 200', async function() {
    sinon.stub(TeamModel, 'findAll').resolves(TeamModel.bulkBuild([teamMock]));

    const res = await chai.request(app).get('/teams');

    expect(res.status).to.equal(httpCode.ok);
    expect(res.body).to.deep.equal([teamMock]);
  });

  it('should return a team by id', async function() {
    sinon.stub(TeamModel, 'findByPk').resolves(TeamModel.build(teamMock));

    const res = await chai.request(app).get('/teams/1');

    expect(res.status).to.equal(httpCode.ok);
    expect(res.body).to.deep.equal(teamMock);
  })
});
