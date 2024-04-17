import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API Documentation for your Node.js app',
    },
    servers: [
      {
        url: 'http://localhost:10000', // Update this URL with your actual server URL
        description: 'Local server',
      },
    ],
  },
  apis: ['./docs/*.yaml'], // Path to the files containing your Swagger documentation
};

export default swaggerJsdoc(options);