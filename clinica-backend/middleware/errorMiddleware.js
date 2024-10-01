const dotenv = require('dotenv');
dotenv.config();

const notFound = (req, res, next) => {
    const error = new Error(`Não Encontrado - ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    //bad ObjectId in MongoDB
    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        message = "Item não encontrado";
        statusCode = 404;

        res.status(statusCode).json({
            message,
            stack: process.env.NODE_ENV === 'production' ? '📚' : err.stack,
        });
    }
}


module.exports = { notFound, errorHandler };