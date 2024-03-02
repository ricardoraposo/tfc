import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import UserModel from '../database/models/UserModel';

import { app } from '../app';
import httpCode from '../utils/httpCode';
import * as auth from '../utils/auth';
import { userMock } from './mocks/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams integration tests', function() {
  beforeEach(async () => {
    sinon.restore();
  });

  it('should return token and status 200', async function() {
    sinon.stub(auth, 'signToken').returns('d3f1n1t1v4m3nt3umt0k3n');
    sinon.stub(UserModel, 'findOne').resolves(UserModel.build(userMock));

    const httpRequestBody = {
      email: 'admin@admin.com',
      password: 'secret_admin'
    };

    const res = await chai.request(app).post('/login').send(httpRequestBody);

    expect(res.status).to.equal(httpCode.ok);
    expect(res.body).to.deep.equal({ token: 'd3f1n1t1v4m3nt3umt0k3n' })
  });

  it('should return status 400 when email is not provided', async function() {
    const httpRequestBody = {
      password: 'secret_admin'
    };

    const res = await chai.request(app).post('/login').send(httpRequestBody);
    expect(res.status).to.equal(httpCode.badRequest);
    expect(res.body).to.deep.equal({ message: 'All fields must be filled' })
  })

  it('should return status 400 when password is not provided', async function() {
    const httpRequestBody = {
      email: 'admin@admin.com',
    };

    const res = await chai.request(app).post('/login').send(httpRequestBody);
    expect(res.status).to.equal(httpCode.badRequest);
    expect(res.body).to.deep.equal({ message: 'All fields must be filled' })
  })

  it('should return status 401 when email does not exists', async function() {
    sinon.stub(UserModel, 'findOne').resolves(null);

    const httpRequestBody = {
      email: 'admin@admin.com',
      password: 'secret_admin'
    };

    const res = await chai.request(app).post('/login').send(httpRequestBody);

    expect(res.status).to.equal(httpCode.unauthorized);
    expect(res.body).to.deep.equal({ message: 'Invalid email or password' })
  })
});
