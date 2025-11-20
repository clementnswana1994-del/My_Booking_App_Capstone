import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/User.js'
import Booking from './models/Booking.js';
import Service from './models/Service.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
// import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
// import multer from 'multer';
// import fs from 'fs';
// import mime from 'mime-types';


import 'dotenv/config'

import connectDB from './db.js';

const app = express()

const port = process.env.PORT || 8080

app.use(express.json());
app.use(cookieParser());
// app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(cors());

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ghfgfhbfhffffnfjfjf';

app.get('/', (req, res) => {
    res.json('Hello World! (from server)')
});


app.post('/api/register', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {name,email,password} = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password:bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }

});

app.post('/api/login', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {email} = req.body;
  const userDoc = await User.findOne({email});
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email:userDoc.email,
        id:userDoc._id
      }, jwtSecret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.status(400).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});

app.get('/api/profile', (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const {name,email,_id} = await User.findById(userData.id);
      res.json({name,email,_id});
    });
  } else {
    res.json(null);
  }
});

app.post('/api/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

// app.post('/api/upload-by-link', async (req,res) => {
//   const {link} = req.body;
//   const newName = 'photo' + Date.now() + '.jpg';
//   await imageDownloader.image({
//     url: link,
//     dest: '/tmp/' +newName,
//   });
//   const url = await uploadToS3('/tmp/' +newName, newName, mime.lookup('/tmp/' +newName));
//   res.json(url);
// });

// const photosMiddleware = multer({dest:'/tmp'});
// app.post('/api/upload', photosMiddleware.array('photos', 100), async (req,res) => {
//   const uploadedFiles = [];
//   for (let i = 0; i < req.files.length; i++) {
//     const {path,originalname,mimetype} = req.files[i];
//     const url = await uploadToS3(path, originalname, mimetype);
//     uploadedFiles.push(url);
//   }
//   res.json(uploadedFiles);
// });

app.post('/api/Service', (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {token} = req.cookies;
  const {
    service, status, payment,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const serviceDoc = await Place.create({
      service:userData.id,status,
      status:payment,service
    });
    res.json(serviceDoc);
  });
});

app.get('/api/user-service', (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {token} = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const {id} = userData;
    res.json( await Service.find({status:id}) );
  });
});

app.get('/api/service/:id', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {id} = req.params;
  res.json(await Service.findById(id));
});

app.put('/api/service', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {token} = req.cookies;
  const {
    id, service, status, payment
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const serviceDoc = await Service.findById(id);
    if (userData.id === serviceDoc.status.toString()) {
      serviceDoc.set({
        service,status,payment
      });
      await serviceDoc.save();
      res.json('ok');
    }
  });
});

app.get('/api/service', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json( await Service.find() );
});

app.post('/api/bookings', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  const {
    name,service,description,price,
  } = req.body;
  Booking.create({
    name,service,description,price:userData.id,
  }).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    throw err;
  });
});

app.get('/api/bookings', async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromReq(req);
  res.json( await Booking.find({user:userData.id}).populate('place') );
});


app.listen(port, () => {
    console.log('Listening on port: ' + port)
    connectDB()
})
