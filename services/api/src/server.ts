import 'dotenv/config';
import app from './app';
import db from './config/db';
import notificationRoute from './routes/notificationRoute';

const PORT = process.env.PORT || 3000;

// Ensure db connection code runs by referencing it
void db;

app.use('/notifications', notificationRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});