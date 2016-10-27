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
    const update_uuid = '1f93deb0-9b08-11e6-9f33-a24fc0d9649c'
    const update_status = {
        status: 'clean',
    }
    const add_comment = {
        content: "kknd",
        author: "jerry",
    }

    describe('# GET /api/bookingrecords/days with day range', () => {
        it('should get booking records in past 4 days with details', (done) => {
            request(app)
                .get('/api/bookingrecords/days/-4')
                .expect(httpStatus.OK)
                .then((res) => {
                    done();
                })
                .catch(done);
        });
        it('should get booking records in today and next 3 days with details', (done) => {
            request(app)
                .get('/api/bookingrecords/days/3')
                .expect(httpStatus.OK)
                .then((res) => {
                    done();
                })
                .catch(done);
        });
    });

    describe('# GET /api/bookingrecords/records/' + update_uuid, () => {
        it('should get booking record by UUID ' + update_uuid, (done) => {
            request(app)
                .get('/api/bookingrecords/records/' + update_uuid)
                .expect(httpStatus.OK)
                .then((res) => {
                    done();
                })
                .catch(done);
        });
    });

    describe('# POST /api/bookingrecords/records/' + update_uuid, () => {
        it('should update clean status booking record by UUID ' + update_uuid, (done) => {
            request(app)
                .post('/api/bookingrecords/records/' + update_uuid)
                .send(update_status)
                .expect(httpStatus.OK)
                .then((res) => {
                    done();
                })
                .catch(done);
        });
        it('should get updated ', (done) => {
            request(app)
                .get('/api/bookingrecords/records/' + update_uuid)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.Status).to.equal('clean');
                    done();
                })
                .catch(done);
        });
    });

    describe('# POST /api/bookingrecords/records/' + update_uuid + '/comments', () => {
        it('should add comment booking record by UUID ' + update_uuid, (done) => {
            request(app)
                .post('/api/bookingrecords/records/' + update_uuid + '/comments')
                .send(add_comment)
                .expect(httpStatus.OK)
                .then((res) => {
                    done();
                })
                .catch(done);
        });
        it('should add new comment', (done) => {
            request(app)
                .get('/api/bookingrecords/records/' + update_uuid)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.Comments).to.have.length.above(0)
                    done();
                })
                .catch(done);
        });
    });
});
