import path from 'node:path';

import dotenv from 'dotenv';

import http from 'node:http';

import cors from 'cors';

import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

import { router } from './router';
import bodyParser from 'body-parser';

const app = express();

const server = http.createServer(app);
export const io = new Server(server);
const env = dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.uizxrtg.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    const port = 3001;

    app.use(bodyParser.json());

    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE');
      res.setHeader('Access-Control-Allow-Headers', '*');
      app.use(cors());
      next();
    });
    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
    app.use(express.json());
    app.use(router);

    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(() => console.log('error'));
