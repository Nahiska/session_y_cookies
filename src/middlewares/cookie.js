module.exports = (req, res, next) => {
      if (req.cookies.color && !req.session.user) {
        req.session.user = {
          color: req.cookies.color,
        };
      }
      next();
    };
    