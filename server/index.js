const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { generateToken, verifyToken } = require('./utils');
const db = require('./db');
const app = express();

const args = process.argv.slice(2);

async function checkUserMiddleware(req, res, next) {
  const token = req.headers.authorization;
  try {
    const sub = verifyToken(token);
    if(!sub) return res.status(401).json('invalid key');
    const user = await db.User.findById(sub);
    if(!user) return res.status(401).json('invalid user');
    req.user = user;
    next()
  } catch(err) {
    res.status(401).json('invalid key');
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors('*'));

app.post(`/login`, async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const errorResponse = (msg) => {
    res.status(500).json({
      success: false,
      message: msg || 'Invalid credentials',
    });
  };
  try {
    const user = await db.User.findOne({ email });
    if (user === null) {
      errorResponse('This Email is not registered in the system');
      return;
    }
    user.comparePassword(password, async (err, isMatch) => {
      if (err || !isMatch) {
        errorResponse();
        return;
      }
      const token = generateToken(user._id);
      const userObj = user.toObject();
      delete userObj.password;
      res.status(200).json({
        success: true,
        me: userObj,
        token,
      });
    });
  } catch (err) {
    return errorResponse(err.message);
  }
});

app.post(`/register`, async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    let newUser = new db.User({
      email: email,
      password: password,
    });
    newUser = await newUser.save();
    delete newUser.password;
    const token = generateToken(newUser._id);
    const userObj = newUser.toObject();
    delete userObj.password;
    res.status(200).json({
      success: true,
      token: token,
      user: userObj,
    })

  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

app.use(checkUserMiddleware);

app.get('/me',  async (req, res) => {
  const user = req.user;
  try {
    const user = await db.User.findById(user._id);
    const userObj = user.toObject();
    delete userObj.password;
    res.json({
      success: true,
      me: user
    });
  } catch (e) {
    res.status(401).json({
      success: false,
      message: 'unauthorized'
    });
  }
})
app.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    const docs = await db.Post.find({
      author: {
        $regex: new RegExp(q),
        $options: 'i',
      }
    });

    res.status(200).json({
      posts: docs,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
});

app.get('/post/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await db.Post.findById(id);

    res.status(200).json({
      post,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
});

app.post('/new-post', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const post = new db.Post({
      title, content, author
    });
    const data = await post.save();
    if(!data) throw new Error('Invalid post')
    res.status(200).json({
      data,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
});

// app.use(express.static(path.resolve(__dirname, '..', 'build')));

// app.get('/*', function (req, res) {
//   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
// })
const PORT = process.env.PORT || 5000;

mongoose.connect(`mongodb://localhost/ng-route`)
  .then(
    () => {
      console.log('Success connecting to mongoose :D');
      app.listen(PORT, async () => {
        // if(args.indexOf('fixtures') !== -1) {
        //   await mongoose.connection.db.dropDatabase();
        //   await db.Post.insertMany(fixtures)
        // }
        // console.log(`listening on port ${PORT}`)
      });
    },
    (err) => {
      console.log('Error connecting to mongoose :(');
    },
  )

