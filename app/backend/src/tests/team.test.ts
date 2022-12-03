import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';

import { teams, team } from './mocks/teams';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('/teams', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore());

  it('should return an array of teams', async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(teams as Team[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(teams);
  });
});

describe('/teams/:id', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore());

  it('should return an team if id exists', async () => {
    sinon
      .stub(Team, "findOne")
      .resolves(team as Team);

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/:id')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(team);
  });

  it('should return an error if id doesn\'t exists', async () => {
    sinon
      .stub(Team, "findOne")
      .resolves(null);

    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/:id')

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Team not found' });
  });
});