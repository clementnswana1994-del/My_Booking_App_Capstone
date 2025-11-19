import User from './models/User.js'
import Booking from './models/Booking.js';
import Service from './models/Service.js';
import bcrypt from 'bcryptjs';
import 


app.post('/api/register', async (req,res) => {
  mongoose.connect(process.env.MONGO_URL);
  const {name,email} = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }

});

app.post('/api/login', async (req,res) => {
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
