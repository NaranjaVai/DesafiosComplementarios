import winston from 'winston';

const buildProdLogger = () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({ level: 'info'}),
            new winston.transports.File({ filename: './errors.log', level: 'warn' })
        ]
    })
    return logger;
}

const buildDevLogger = () => {
    const logger = winston.createLogger({
        transports: [
            new winston.transports.Console({ level: 'debug'}),
            new winston.transports.File({ filename: './errors.log', level: 'debug' })
        ]
    })
    return logger;
}

if(process.env.LOG_VAR === 'production'){
    logger = buildProdLogger()
}else{
    logger = buildDevLogger()
}

export const addLogger = (req, res, next) => {
    req.logger = logger;
    next()
}