import app from '../../../www'
import request from "supertest";
import { expect } from "chai";

describe('GET /api/signin', () => {
  it('should respond with text message "Hello World"', (done) => {
    request(app)
      .get('/api/signin')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res.text).to.equal('signin success');
        done();
      });
  });
});


