// responsible for server and database connection using mongoose
import mongoose from 'mongoose';

// mongodb connection url
const MONGO_URL = process.env.MONGO_URL || 'dummy_url';

mongoose.connect(MONGO_URL, {
    // useNewUrlParser and useUnifiedTopology are deprecated in newer mongoose versions
    // No need to specify them
});

const db = mongoose.connection;

// event listeners for mongoose connection
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// export the db connection and run on server file to create connection when server starts
export default db;