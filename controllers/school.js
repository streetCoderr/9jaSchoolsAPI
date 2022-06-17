const School = require('../models/school');

const getSchool = async (req, res) => {
  const {id} = req.params;
  let schools = School.findOne({_id: id});
  const {fields} = req.query;
  if (fields) {
    const fieldsParams = fields.trim().split(',').join(' ');
    schools.select(fieldsParams);
  }
  schools = await schools;
  if (!schools) throw Error("Resource not found");
  res.status(200).json({nbHits: schools.length, schools});
}

const getSchools = async (req, res) => {
  const { name, state, location, year_founded, funding, sort,
     fields, numericFilters } = req.query;
  const queryObject = {}
  if (name) queryObject.name = { $regex: name.trim(), $options: 'i'};
  if (year_founded) queryObject.year_founded = Number(year_founded);
  if (state) {
    let stateReg = new RegExp(`^${state.trim()}$`)
    queryObject.state = { $regex: stateReg, $options: 'i' };
  }
  if (funding) {
    let fundReg = new RegExp(`^${funding.trim()}$`)
    queryObject.funding = { $regex: fundReg, $options: 'i'};
  }
  if (location) {
    let locReg = new RegExp(`^${location.trim()}$`);
    queryObject.location = { $regex: locReg, $options: 'i'};
  }
  if (numericFilters) {
    const opMaps = {
      '>': '$gt',
      '>=': '$gte',
      '<': '$lt',
      '<=': '$lte',
      '=': '$eq',
    }

    let filters = numericFilters.trim().replace(/\b(>|<|<=|>=|=)\b/g, match => `-${opMaps[match]}-`);
    let numFields = ['year_founded'];
    filters.split(',').forEach((filter) => {
      let [numField, op, num] = filter.split('-');
      if (numFields.includes(numField)) queryObject[numField] = { [op]: Number(num) };
    })
  }
  // console.log(queryObject);

  const result = School.find(queryObject);
  if (sort) {
    const sortFields = sort.trim().split(',').join(' ');
    result.sort(sortFields)
  }
  if (fields) {
    const fieldsParams = fields.trim().split(',').join(' ');
    result.select(fieldsParams)
  }
  const limit = Number(req.query.limit) || 10
  const page = Number(req.query.page) || 1
  const skip = (page-1) * limit
  const schools = await result.skip(skip).limit(limit);
  res.status(200).json({nbHits: schools.length, schools});
}

module.exports = { getSchool, getSchools }