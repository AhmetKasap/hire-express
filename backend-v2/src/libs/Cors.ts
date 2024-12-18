import { Request, Response, NextFunction } from 'express';

const corsWhiteList: string[] = ["http://localhost:3000", "http://localhost:3001"];

interface CorsOptions {
  origin: boolean;
  methods: string[];
  credentials: boolean;
}

type CorsCallback = (err: Error | null, options?: CorsOptions) => void;

const corsConfig = (req: Request, callback: CorsCallback): void => {
  let corsOptions: CorsOptions

  const origin = req.header('Origin');
  if (origin && corsWhiteList.includes(origin)) {
    corsOptions = {
      origin: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
      credentials: true, 
    }
    //console.log(corsOptions)
  } else {
    corsOptions = {
      origin: false,
      methods: [],
      credentials: false,
    };
  }

  callback(null, corsOptions)
}

export default corsConfig
