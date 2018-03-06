exports.api_index = (req, res, next) => {
  res.status(200).json({
    links: {
      self: {
        href: process.env.DOMAIN + 'api',
        method: 'GET',
        desc: 'Main entry point. Overview of routes.'
      },
      sensors: {
        href: process.env.DOMAIN + 'api/sensors',
        method: 'GET',
        desc: 'Route for listing all available sensors.'
      }
    }
  });
};