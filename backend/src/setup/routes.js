const testRouter = require('../routes/test');
const userRouter = require('../routes/user');
const express = require("express");
const apiVersion = "v1";

module.exports = (app) => {
  const router = express.Router();
  router.use(express.json());
  router.use('/test', testRouter);
  router.use('/users', userRouter);

  app.use(`/api/${apiVersion}`, router);
  app.use((_, res) => {
    res.status(404).json({
      error: "Unknown endpoint"
    });
  });
};
