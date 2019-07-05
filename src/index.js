import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import unsafegames from './routes/unsafegames';
import unsafepublishers from './routes/unsafepublishers';
import games from './routes/games';
import authgames from './routes/authgames';
import users from './routes/users';
import auth from './routes/auth';

dotenv.config({
  path: path.join(__dirname, '.env'),
});
const app = express();

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/api/unsafegames', unsafegames);
app.use('/api/unsafepublishers', unsafepublishers);
app.use('/api/games', games);
app.use('/api/authgames', authgames);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(cors());

mongodb.MongoClient.connect(`${process.env.DB_CONNECTION}`, (err, db) => {
  app.set('db', db);
  err
    ? console.log('error from MongoDB: ', err)
    : console.log('No MongoDB error');
  app.use(cors());

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
  });

  app.listen(process.env.SERVER_PORT, () =>
    console.log(`Running on localhost:${process.env.SERVER_PORT}`),
  );
});
