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
  return res.json(req.hospital)
}

function list(req, res, next) {
  const { limit = 100, skip = 0 } = req.query;
  Hospital.list({ limit, skip })
    .then(hospitals => res.json(hospitals))
    .catch(e => next(e));
}

export default { list, load, get }