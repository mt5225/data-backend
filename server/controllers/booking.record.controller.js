import BookingRecord from '../models/record.model';
import OP from '../models/op.model';

/**
 * Load booking records by day range
 */
function getRecordByDayRange(req, res, next) {
    const days = parseInt(req.params.range, 10)
    BookingRecord.getRecordByRange(days)
        .then((records) => {
            res.json(records);
        })
        .catch(e => next(e));
}

/**
 * Load booking records by day range for checkin
 */
function getRecordByDayRangeCheckIn(req, res, next) {
    const days = parseInt(req.params.range, 10)
    BookingRecord.getRecordByRangeCheckIn(days)
        .then((records) => {
            res.json(records);
        })
        .catch(e => next(e));
}

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
    BookingRecord.get(id)
        .then((record) => {
            req.record = record; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get record
 * @returns {Record}
 */
function getOne(req, res) {
    return res.json(req.record);
}

/**
 * Get record by UUID
 */
function getByUUID(req, res, next) {
    const uuid = req.params.uuid
    BookingRecord.findOne({ UUID: uuid })
        .then((record) => {
            res.json(record)
        })
        .catch(e => next(e))
}

/**
 * Update record with status and/or commands
 */
function updateRecord(req, res, next) {
    const uuid = req.params.uuid
    const query = { 'UUID': uuid }
    const update = {
        Status: req.body.status,
    }
    BookingRecord.findOneAndUpdate(query, update, { upsert: false })
        .then((record) => {
            res.json(record)
        })
        .catch(e => next(e))
}

/**
 * Update record with status and/or commands
 */
function addComment(req, res, next) {
    const uuid = req.params.uuid
    const query = { 'UUID': uuid }
    const comment = req.body
    BookingRecord.findOneAndUpdate(query, { $push: { Comments: comment } }, { upsert: true })
        .then((record) => {
            res.json(record)
        })
        .catch(e => next(e))
}

/**
 * set checkout time setCheckout
 */
function setCheckout(req, res, next) {
    const uuid = req.params.uuid
    const query = { 'UUID': uuid }
    const update = {
        CheckoutTime: req.body.checkout,
    }
    BookingRecord.findOneAndUpdate(query, update, { upsert: false })
        .then((record) => {
            res.json(record)
        })
        .catch(e => next(e))
}

/**
 * get lastest op log
 */
function getSyncStatus(req, res, next) {
    OP.findOne()
        .sort({ createdAt: -1 })
        .then((record) => {
            res.json(record)
        })
        .catch(e => next(e))
}

export default {
    getRecordByDayRange,
    getOne,
    load,
    getByUUID,
    updateRecord,
    addComment, setCheckout,
    getSyncStatus,
    getRecordByDayRangeCheckIn,
}