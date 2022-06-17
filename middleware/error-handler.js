const errorHandler = (err, req, res, next) => {
  if (err.message === "Resource not found") {
    return res.status(404).json({error: err.message});
  }
  res.status(500).json({error: "Something went wrong. Try again later"})
}

module.exports = errorHandler;