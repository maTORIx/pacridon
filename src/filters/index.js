module.exports = function(app) {
  app.use(function(req, res, next) {
    require("./session")(app);
  })
}