import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import hospitalCtrl from '../controllers/hospital.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/hospitals - Get list of hospitals */
    .get(hospitalCtrl.list)
    .post(hospitalCtrl.createOrUpdate)

router.route('/:hospitalId')
    /** GET /api/hospitals/:hospitalId - Get hospital */
    .get(hospitalCtrl.get)
    /** DELETE /api/users/:userId - Delete hospital */
    .delete(hospitalCtrl.remove)
    /** POST /api/users/:userId - update hospital */
    .post(hospitalCtrl.createOrUpdate);

/** Load user when API with hospitalId route parameter is hit */
router.param('hospitalId', hospitalCtrl.load)

export default router;
