const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const multiparty = require('connect-multiparty');

const multipartMiddleware = multiparty({uploadDir: "./images"})
const userRouter = require('./router/Users-router');
const departmentRouter = require('./router/daperment-router');
const kindRouter = require('./router/kindOfNews-router');
const newsRouter = require('./router/news-router');
const controllerNews = require('./controllers/news-controller')

const middleware = require('./middleware/auth');


dotenv.config();
const db = mongoose.connection;

//connect mongodb 
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true, 
  useUnifiedTopology: true,
}).then(() => console.log('DB Connected!'));
    db.on('error', (err) => {
        console.log('DB connection error:', err.message);
})
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

app.use(express.static("uploads"));

app.get('/', (req, res) => {
    res.json({hello: 'alo anh binh gold day phai khong a'})
})
app.use('/api-user', userRouter);

app.use('/api-department', departmentRouter)

app.use('/api-kind', kindRouter)

app.use('/api-news' ,newsRouter); 

app.post("/api-news/upload", multipartMiddleware, controllerNews.uploadImages)

app.get('/api/example', middleware.auth , (req, res) => {
    console.log('ttttt  ');
})

const port = 5000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})