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
    let hospitalNew = {
        id: "30bd68a8-c55e-4f5c-8914-905a756a97f5",
        hospital: "best hospital ever",
        hospital_cn: "医疗中心",
        address: "8700 Heaven Blvd, Los Angeles, CA 90048",
        level: "三级",
        rating: 250,
        high_risk_service: "有",
        website: "www.kknd.cc",
        NICU_bed: "45",
        description: "描述",
        price: {
            normal: "21310 USD",
            csection: "29600 USD"
        },
        doctors: [
            {
                name: "x-man",
                price_normal: "2500 USD",
                csection: "3000 USD",
                address: "N/A",
                tel: "1223",
                hospital: "N/A",
                sex: "男",
                speak_cn: "是",
                has_cn_assistant: "是"
            },
        ],
        cities: [
            {
                name: "Beverly Hills",
                room_2b1b: "5500 USD",
                room_1b1b: "5000 USD"
            },
        ]
    };

    describe('# POST /api/hospitals', () => {
        it('should create a new hospital', (done) => {
            request(app)
                .post('/api/hospitals')
                .send(hospitalNew)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.message).to.equal('create new hospital success');
                    done();
                })
                .catch(done);
        });
    });

    describe('# POST /api/hospitals/:hospitalsId', () => {
        hospitalNew.hospital = 'worst hospital ever';
        let hospitalUpdate = Object.assign(hospitalNew, {
            cities: [
                {
                    name: "Beverly Hills",
                    room_2b1b: "888 USD",
                    room_1b1b: "999 USD"
                },
                {
                    name: "San Monica",
                    room_2b1b: "5500 USD",
                    room_1b1b: "5000 USD"
                }
            ],
        });
        it('should update hospitals details', (done) => {
            request(app)
                .post(`/api/hospitals/${hospitalUpdate.id}`)
                .send(hospitalUpdate)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.hospital).to.equal('worst hospital ever');
                    expect(res.body.rating).to.equal(250);
                    done();
                })
                .catch(done);
        });
    });

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
                .get(`/api/hospitals/${hospitalNew.id}`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.hospital).to.equal('worst hospital ever');
                    expect(res.body.rating).to.equal(250);
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

    describe('# DELETE /api/hospitals/:hospitalsId', () => {
        it('should delete hospital', (done) => {
            request(app)
                .delete(`/api/hospitals/${hospitalNew.id}`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.hospital).to.equal('worst hospital ever');
                    done();
                })
                .catch(done);
        });
    });

});
