const not_found = (req, res) => {
  res.status(404).send("This resource could not be found");
}

module.exports = not_found;