const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/notes-app';

async function checkConnection() {
  const client = new MongoClient(uri);

  try {
    console.log('Checking MongoDB connection...');
    await client.connect();
    await client.db().admin().ping();
    console.log('✓ MongoDB connection successful!');
    console.log(`Connected to: ${uri}`);
    return true;
  } catch (error) {
    console.error('✗ MongoDB connection failed!');
    console.error('Error:', error.message);
    console.error('\nPlease ensure:');
    console.error('1. MongoDB is installed and running');
    console.error('2. Connection string in .env is correct');
    console.error('3. MongoDB service is started');
    return false;
  } finally {
    await client.close();
  }
}

checkConnection()
  .then((success) => process.exit(success ? 0 : 1))
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
