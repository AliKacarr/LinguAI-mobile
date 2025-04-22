require('dotenv').config();

const dbUri = process.env.DB_URI;

// Export the configuration
module.exports = {
  dbUri,
};