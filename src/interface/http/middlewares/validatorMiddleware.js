const wrapperError = (error) => {
  return error.map(({
    message,
    path
  }) => ({
    message,
    path: path.join('.')
  }));
};

const validate = (req, schema) => schema.validate(req, {
  abortEarly: false,
  stripUnknown: true,
  allowUnknown: true,
});


module.exports = ({ logger }) => (schema) => {
  return (req, res, next) => {
    try {
      const { error } = validate(req, schema);

      if(error) {
        const err = new Error();
        err.status = err.status || 400;
        err.name = 'Validation';

        logger.error(err);

        return res.status(err.status).json({
          title: err.name,
          message: wrapperError(error.details)
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
