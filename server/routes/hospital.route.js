import express from 'express'
import validate from 'express-validation'
import paramValidation from '../../config/param-validation'
import hospitalCtrl from '../controllers/hospital.controller'


const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
    /** GET /api/hospitals - Get list of hospitals */
    .get(hospitalCtrl.list)
    .post(hospitalCtrl.createOrUpdate)

router.route('/:hospitalId')
    /** GET /api/hospitals/:hospitalId - Get hospital */
    .get(hospitalCtrl.get)

    /** POST /api/hospitals/:hospitalId - update hospital */
    .post(hospitalCtrl.createOrUpdate) 
    
        /** DELETE /api/hospitals/:hospitalId - Delete hospital */
    .delete(hospitalCtrl.remove)

/** Load hospital when API with hospitalId route parameter is hit */
router.param('hospitalId', hospitalCtrl.load)

export default router
