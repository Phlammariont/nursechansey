/**
* Created with phlammariont-chansey.
* User: Phlammariont
* Date: 2016-06-16
* Time: 11:05 PM
* To change this template use Tools | Templates.
*/
module.exports = function(req, res, next) {
   if (req.isAuthenticated()) {
        return next();
    }
    else{
        return res.redirect('/log-in');
    }
};
