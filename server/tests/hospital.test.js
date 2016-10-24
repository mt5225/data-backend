import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
    // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mongoose.connection.close();
    done();
});

describe('## Hospital APIs', () => {
    let user = {
        username: 'KK123',
        mobileNumber: '1234567890'
    };

    describe('# GET /api/hospitals/', () => {
        it('should get all hospitals', (done) => {
            request(app)
                .get('/api/hospitals')
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body).to.be.an('array');

                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api/hospitals/:hospitalsId', () => {
        it('should get hospitals details', (done) => {
            request(app)
                .get('/api/hospitals/59eb56a7-6202-4596-9acd-26de6f5614c9')
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.hospital).to.equal('San Gabriel  Valley Medical Center');
                    expect(res.body.rating).to.equal(47.2);
                    done();
                })
                .catch(done);
        });

        it('should report error with message - Not found, when user does not exists', (done) => {
            request(app)
                .get('/api/hospitals/56c787ccc67fc16ccc1a5e92')
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.message).to.equal('Not Found');
                    done();
                })
                .catch(done);
        });
    });

});
