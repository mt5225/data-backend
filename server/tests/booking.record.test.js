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

describe('## Booking Record APIs', () => {
    describe('# GET /api/bookingrecords/days/-4', () => {
        it('should get booking records in this week with details', (done) => {
            request(app)
                .get('/api/bookingrecords/days/-4')
                .expect(httpStatus.OK)
                .then((res) => {
                    done();
                })
                .catch(done);
        });
    });
    describe('# GET /api/bookingrecords/days/3', () => {
        it('should get booking records in this week with details', (done) => {
            request(app)
                .get('/api/bookingrecords/days/3')
                .expect(httpStatus.OK)
                .then((res) => {
                    done();
                })
                .catch(done);
        });
    });
});
