import express from 'express'
import bookingRecordCtrl from '../controllers/booking.record.controller'

const router = express.Router(); // eslint-disable-line new-cap

router.route('/days/:range')
  .get(bookingRecordCtrl.getRecordByDayRange)

router.route('/getone/:recordId')
  /** GET /api/booking records/:userId - Get user */
  .get(bookingRecordCtrl.getOne)

router.route('/records/:uuid')
  /** GET /api/booking records/:userId - Get user */
  .get(bookingRecordCtrl.getByUUID)
  .post(bookingRecordCtrl.updateRecord)

/** Load user when API with userId route parameter is hit */
router.param('recordId', bookingRecordCtrl.load)

export default router