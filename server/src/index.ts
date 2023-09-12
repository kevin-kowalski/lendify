import Koa from 'koa';
import parser from 'koa-bodyparser';
import cors from 'koa-cors';
import proxy from 'koa-proxies';
import { Server } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import router from './router';
import connectDb from './models/_index';
import { ioConnect } from './controllers/socketHandler.controller';

dotenv.config();
const PORT = process.env.PORT || 5001;
const app = new Koa();
const server = http.createServer(app.callback());
const serverOptions = {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'Authorization', 'Access-Control-Allow-Origin'],
    credentials: true,
    // preflightContinue: true,
  },
};
const io = new Server(server, serverOptions);

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  headers: ['Origin', 'Content-Type', 'Accept', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Credentials'],
  credentials: true,
}));
app.use(async (ctx, next) => {
  console.log('headers', ctx.headers);
  console.log('authorization', ctx.headers.authorization);
  console.log('cookie', ctx.headers.cookie);
  next();
});
app.use(parser());
app.use(router.routes());
app.use(router.allowedMethods());


ioConnect(io);
console.log('🎪 Socket connected 🎪');

// function to connect to the database and start the server
const run = async () => {
  await connectDb();
  console.log('🚧 Connected to the database 🚧');

  server.listen(PORT, async () => {
    console.log(`🚀 Live from Berlin at port ${PORT}, it's Project Lent. 🚀`);
  });
};

run();

export { io, app };
