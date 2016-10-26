import BookingRecord from '../models/record.model';

/**
 * Load booking records by day range
 */
function getRecordByDayRange(req, res, next) {
    const days = parseInt(req.param('range'), 10)
    BookingRecord.getRecordByRange(days)
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
    const uuid = req.param('uuid')
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
    const uuid = req.param('uuid')
    const query = {'UUID': uid}
    const update = {
        Status: req.body.status,
        Comments: req.body.comments,
    }
    BookingRecord.findOne( query, update, {upset: true})
        .then((record) => {
             res.json(record)
        })
        .catch(e => next(e))
}


export default { getRecordByDayRange, getOne, load, getByUUID,  updateRecord}