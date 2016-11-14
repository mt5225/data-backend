import Promise from 'bluebird'
import mongoose from 'mongoose'
import httpStatus from 'http-status'
import APIError from '../helpers/APIError'

/**
 *  Schema
 */
const DoctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price_normal: {
        type: String,
        required: true
    },
    csection: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    speak_cn: {
        type: String,
        required: true
    },
    has_cn_assistant: {
        type: String,
        required: true
    },
})

const CitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    room_2b1b: {
        type: String,
        required: true
    },
    room_1b1b: {
        type: String,
        required: true
    },
    search_name: {
        type: String,
        required: true
    }
})

const HospitalSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    hospital: {
        type: String,
        required: true
    },
    hospital_cn: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    high_risk_service: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    NICU_bed: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        normal: {
            type: String,
            required: true
        },
        csection: {
            type: String,
            required: true
        },
    },
    main_image: {
        type: String,
        required: true,
        default: 'https://s3-us-west-1.amazonaws.com/uniroom/hospital/dummy_front.png'
    },
    images: {
        type: Array,
        required: true,
        default: ['https://s3-us-west-1.amazonaws.com/uniroom/hospital/dummy_detail.png']
    },
    doctors: [DoctorSchema],
    cities: [CitySchema],
    createdAt: {
        type: Date,
        default: Date.now
    },
    geo: {
        type: String,
        required: true
    },
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
HospitalSchema.method({
});


/**
 * Statics
 */
HospitalSchema.statics = {
  /**
   * Get hospital list
   * @param {id} id - The id of user.
   * @returns {Promise<Hospital, APIError>}
   */
  get(id) {
    return this.findOne({'id': id})
      .exec()
      .then((hospital) => {
        if (hospital) {
          return hospital;
        }
        const err = new APIError('No such hospital exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 100 } = {}) {
    return this.find()
      .sort({ rating: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
  }
};

/**
 * @typedef User
 */
export default mongoose.model('Hospital', HospitalSchema);
