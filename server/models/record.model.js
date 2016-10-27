import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import * as UTIL from '../helpers/util'

/**
 * User Schema
 */
const RecordSchema = new mongoose.Schema({
    UUID: {
        type: String,
        required: true
    },
    CustomerId: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true,
    },
    CheckIn: {
        type: Date,
        required: true,
    },
    CheckOut: {
        type: Date,
        required: true,
    },
    Room: {
        type: String,
        required: true,
    },
    TotalNight: {
        type: String,
        required: true,
    },
    Market: {
        type: String,
        required: true,
    },
    Sales: {
        type: String,
        required: true,
    },
    Operation: {
        type: String,
        required: true,
    },
    Nationality: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required: true,
    },
    Comments: [{
         createdAt: {
            type: Date,
            default: Date.now
        },
        content: String,
        author: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
RecordSchema.method({
});

/**
 * Statics
 */
RecordSchema.statics = {
    getRecordByRange(days) {
        const [start_day, end_day] = UTIL.getDateRange(days)
        return this.find()
            .and(
            [{
                CheckOut: { $gte: start_day }
            }, {
                CheckOut: { $lte: end_day }
            }]
            )
            .sort({ createdAt: -1 })
            .exec();
    },
};

/**
 * @typedef User
 */

module.exports = mongoose.model('Record', RecordSchema);