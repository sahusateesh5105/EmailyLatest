const passport = require("passport");
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );
  //facebook auth routes
  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['email']
    })
  );

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  app.post('/auth/login', (req,res,next)=> {
    
    console.log("req",req)
    passport.authenticate('local', (err,user,info)=>{
      if(err){
        return next(err)
      }

      if (!user) {
      return res.status(401).json({ error: info.message || 'Invalid username or password.' });
      }
      // If authentication succeeded, manually log them in using req.login()
      req.login(user, (err) => {
        if (err) return next(err);

      // Send JSON response back to React
        return res.status(200).send({
           id: user._id,
           username: user.username, 
           credits: user.credits 
        });
      });
      })(req, res, next); // Note: passport.authenticate as middleware requires (req, res, next) at the end when custom callback is used
  }
  );

  app.post('/auth/register', async (req,res,next)=>{
      try{
        const { username, password } = req.body;

        if (!username || !password) {
          return res.status(400).json({ error: 'Username and password are required.' });
        }
        if (password.length < 6) {
          return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
        }
        // Create a new user instance with the plain password
        const newUser = new User({
          username: username.trim(),
          password: password
        });

        // When you call .save(), the model's pre('save') hook automatically 
        // runs bcrypt to hash the password and saves it to MongoDB.
        const savedUser = await newUser.save();

        // Automatically log the user in after registration
        req.login(savedUser, (err) => {
          if (err) return next(err);

          return res.status(200).send(
            { userid: savedUser._id, 
              username: savedUser.username, 
              credits: savedUser.credits 
            })
        });
      } catch (err) {
        // Handle duplicate username error (MongoDB error code 11000)
        if (err.code === 11000) {
          return res.status(409).json({ error: 'This username is already taken.' });
        }
        console.error('Registration error:', err);
        return res.status(500).json({ error: 'Internal server error.' });
      }
  })
  
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
