
const getSchoolsStatic = (req, res) => {
  res.status(200).send('Static data loading');
}

const getSchools = (req, res) => {
  res.status(200).send('Schools loading');
}

module.exports = { getSchoolsStatic, getSchools }