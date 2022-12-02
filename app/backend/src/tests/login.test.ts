import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

import { 
  adminUser, 
  userWithInvalidEmail, 
  userWithInvalidPassword, 
  userFromDatabase 
} from './mocks/users';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('/login', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore());

  it('should return a token if the user data is correct', async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userFromDatabase as User);

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send( adminUser );

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.include.any.keys('token');
  });

  it('should return an error if email wasn\'t submitted', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ password: adminUser.password });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('should return an error if password wasn\'t submitted', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ email: adminUser.email });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('should return an error if email it\'s not valid', async () => {
    sinon.stub(User, "findOne").resolves(null);
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userWithInvalidEmail);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' });
  });

  it('should return an error if password it\'s not valid', async () => {
    sinon.stub(User, "findOne").resolves(null);
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userWithInvalidPassword);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({ message: 'Incorrect email or password' });
  });
});

describe('/login/validate', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore());

  it('should response with role if credentials are correct', async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userFromDatabase as User);

    const token = await chai
      .request(app)
      .post('/login')
      .send(adminUser).then((res) => res.body.token)

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', token);
      
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ role: 'admin' });
  });

  it('should response with error if token is not submitted', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' });
  });

  it('should response with error if token is not valid', async () => {
    const token = 'invalidtoken';

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', token);
      
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Expired or invalid token' });
  });
})
