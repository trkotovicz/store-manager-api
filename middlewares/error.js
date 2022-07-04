const errorMessage = (message) => {
  if (message.includes('required')) return 400;
  if (message.includes('empty')) return 400;
  if (message.includes('length')) return 422;
  if (message.includes('not found')) return 404;
};

const errorMiddleware = (err, _req, res, _next) => {
  const { name, message } = err;

  switch (name) {  
    case 'ValidationError':
      res.status(errorMessage(message)).json({ message });
      break;

    default: res.status(500).json({ message });
  }
};

module.exports = errorMiddleware;
