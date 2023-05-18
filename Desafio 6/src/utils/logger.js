const winston = require('winston');

const customColors =  {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    debug: 'green',
    verbose: 'cyan',
}

const buildProdLogger = () => {
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
            winston.format.colorize({ colors: customColors}),
            winston.format.timestamp(),
            winston.format.simple()
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: './errors.log', level: 'warn' })
        ]
    })
    return logger;
}

const buildDevLogger = () => {
    const logger = winston.createLogger({
        level: 'debug',
        format: winston.format.combine(
            winston.format.colorize({colors: customColors}),
            winston.format.timestamp(),
            winston.format.simple()
        ),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: './errors.log', level: 'debug'})
        ]
    })
    return logger;
}

(process.env.LOG_VAR === 'production') ? 
logger = buildProdLogger() :
logger = buildDevLogger();


const addLogger = (req, res, next) => {
    req.logger = logger;
    next()
}

module.exports = {addLogger}