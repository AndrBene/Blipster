exports.getHomeView = (req, res, next) => {
  res.status(200).render('index');
};
