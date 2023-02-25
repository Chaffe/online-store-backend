import express from 'express';
import mongoose from "mongoose";
import multer from 'multer';

import { loginValidation, registerValidation, productCreateValidation } from "./validations/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, ProductController } from './controllers/index.js';

mongoose
    .connect("mongodb+srv://Chaffe:wwwwww@cluster0.ooqonha.mongodb.net/online-store?retryWrites=true&w=majority")
    .then(() => console.log('DB Connected'))
    .catch(() => console.log('DB Error'))

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'))

mongoose.set('strictQuery', true);

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
});

app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.getOne);
app.post('/products', checkAuth, productCreateValidation, ProductController.create);
app.delete('/products/:id', checkAuth, ProductController.remove);
app.patch('/products/:id', checkAuth, ProductController.update)


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server started');
})