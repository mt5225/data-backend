import express from 'express'
import bookingRecordCtrl from '../controllers/booking.record.controller'

const router = express.Router(); // eslint-disable-line new-cap

router.route('/days/:range')
  .get(bookingRecordCtrl.getRecordByDayRange)

router.route('/dayscheckin/:range')
  .get(bookingRecordCtrl.getRecordByDayRangeCheckIn)

router.route('/getone/:recordId')
  .get(bookingRecordCtrl.getOne)

router.route('/records/:uuid')
  .get(bookingRecordCtrl.getByUUID)
  .post(bookingRecordCtrl.updateRecord)

router.route('/records/:uuid/comments')
  .post(bookingRecordCtrl.addComment)

router.route('/records/:uuid/checkout')
  .post(bookingRecordCtrl.setCheckout)

router.route('/syncstatus')
  .get(bookingRecordCtrl.getSyncStatus)

/** Load record when API with recordId route parameter is hit */
router.param('recordId', bookingRecordCtrl.load)

export default router