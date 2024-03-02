import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import MatchModel from '../database/models/MatchModel';

import { app } from '../app';
import httpCode from '../utils/httpCode';
import { matchMock } from './mocks/match.mock';

chai.use(chaiHttp);

const { expect } = chai;

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
});
