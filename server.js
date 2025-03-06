const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const notFound = require('./middleware/notFoundMiddleware');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const logger = require('./config/logger');

dotenv.config();

connectDB();

const app = express();

// Use helmet for security
app.use(helmet());

// Configure CORS
const corsOptions = {
    origin: process.env.FRONT_END_URL, // Replace with your frontend's origin
    credentials: true,
    // optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

app.use(express.json());
app.use(cookieParser());

// Use logger middleware
app.use(loggerMiddleware);

app.use(async (req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
});

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});