module.exports = (req, res, next) => {
  console.log("requireLogin start");

  if (!req.user) {
    return res.status(401).send({ error: "Must be logged in to do this." });
  }
  console.log("requireLogin done");
  next();
};
