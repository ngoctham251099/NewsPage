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
const categoriesRouter = require('./router/categories-router')
const kindRouter = require('./router/kindOfNews-router');
const newsRouter = require('./router/news-router');
const controllerNews = require('./controllers/news-controller')
const imagesRouter = require('./router/images-router');
const priceOfKindRouter = require('./router/priceOfKind-router');
const kindOfImagesRouter = require('./router/kindOfImages-router');


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

app.use(express.static('uploads'))

app.use('/api-user', userRouter);

app.use('/api-department', departmentRouter)

app.use('/api-categories', categoriesRouter)

app.use('/api-kind', kindRouter);

app.use('/api-price-of-kind', priceOfKindRouter)

app.use('/api-price-of-images', kindOfImagesRouter)

app.use('/api-news' ,newsRouter); 

app.use('/api-images' ,imagesRouter); 

app.post("/api-news/upload", multipartMiddleware, controllerNews.uploadImages)



const port = 5000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})