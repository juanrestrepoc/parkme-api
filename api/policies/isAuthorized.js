module.exports = function (req, res, next) {
    var token;
  
    if (req.headers && req.headers.authorization) {
      var parts = req.headers.authorization.split(' ');
      if (parts.length == 2) {
        var scheme = parts[0],
          credentials = parts[1];
  
        if (/^Bearer$/i.test(scheme)) {
          token = credentials;
        }
      } else {
        return res.json(401, {message: 'Format is Authorization: Bearer [token]'});
      }
    } else if (req.param('token')) {
      token = req.param('token');
      delete req.query.token;
    } else {
      return res.json(401, {message: 'No Authorization header was found'});
    }
  
    jwToken.verify(token, function (err, token) {
      if (err) return res.json(401, {message: 'Invalid Token!'});
      req.token = token;
      
      Users.findOne({email: token.email}).populate('vehicles').exec(function(err, user) {
          if (err || !user) { return res.userNotFound(token.email); }

          req.user = user;
          next();
      })
    });
  };