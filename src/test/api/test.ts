import app from '../../www'
import request from "supertest";
import { expect } from "chai";

describe('GET /check', () => {
  it('should respond with text message "Hello World"', (done) => {
    request(app)
      .get('/check')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res.text).to.equal('check success');
        done();
      });
  });
});


describe('GET /api/test', () => {
  it('should respond with text message "test"', (done) => {
    request(app)
      .get('/api/test')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        expect(res.text).to.equal('test');
        done();
      });
  });
});
