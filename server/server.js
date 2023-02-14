const express = require('express');
require('dotenv').config();
// const pool = require('./pool');
// const axios = require('axios')

const app = express();
const bodyParser = require('body-parser');

// Route includes
const userRouter = require('./routes/user.router');
const reservationRouter = require('./routes/reservation.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
// app.use(sessionMiddleware);

// start up passport sessions
// app.use(passport.initialize());
// app.use(passport.session());

/* Routes */
app.use('/api/v1/user', userRouter);
app.use('/api/v1/reservation', reservationRouter);
// app.use('/cards', cardsRouter)

// Serve static files
app.use(express.static('build'));



app.get('/public',(req,res) => {
  res.sendStatus(200);
})

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});