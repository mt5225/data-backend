import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import hospitalCtrl from '../controllers/hospital.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/hospitals - Get list of hospitals */
    .get(hospitalCtrl.list)

router.route('/:hospitalId')
    /** GET /api/hospitals/:hospitalId - Get hospital */
    .get(hospitalCtrl.get)

/** Load user when API with hospitalId route parameter is hit */
router.param('hospitalId', hospitalCtrl.load)

export default router;
