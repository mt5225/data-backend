import Hospital from '../models/hospital.model'

/**
 * Load hospital and append to req.
 */
function load(req, res, next, id) {
  Hospital.get(id)
    .then((hospital) => {
      req.hospital = hospital; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e))
}

/**
 * Get hospital
 * @returns {Hospital}
 */
function get(req, res) {
  console.log(req)
  return res.json(req.hospital)
}

function list(req, res, next) {
  const { limit = 100, skip = 0 } = req.query;
  Hospital.list({ limit, skip })
    .then(hospitals => res.json(hospitals))
    .catch(e => next(e));
}

/**
 * update hospital
 * @returns {Hospital}
 */
function createOrUpdate(req, res, next) {
  const query = { 'id': req.body.id }
  Hospital.findOneAndUpdate(query, req.body, { upsert: true })
    .then(savedHospital => savedHospital ? 
      res.json(savedHospital) : res.json({message : "create new hospital success"}))
    .catch(e => next(e));
}

/**
 * Delete hospital.
 * @returns {Hospital}
 */
function remove(req, res, next) {
  const hospital = req.hospital;
  hospital.remove()
    .then(deletedHospital => res.json(deletedHospital))
    .catch(e => next(e));
}

export default { list, load, get, createOrUpdate, remove }