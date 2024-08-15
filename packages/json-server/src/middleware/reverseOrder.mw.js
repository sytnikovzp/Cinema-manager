exports.reverseOrder = (req, res, next) => {
  if (!req.query._sort) {
    req.query._sort = 'id';
  }

  if (!req.query._order) {
    req.query._order = 'desc';
  }

  next();
};
