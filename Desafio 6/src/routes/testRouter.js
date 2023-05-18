const {Router} = require('express');
const { addLogger } = require('../utils/logger');
testRouter = Router();

testRouter.get('/', (req, res) => {
    res.send('Estas en los tests')
})

testRouter.get('/loggerTest', (req,res) => {
    req.logger.info('Logged as Production');
    req.logger.debug('Logged as Dev');
    req.logger.verbose('This is invisible');
    req.logger.error('This is an Error')
    res.send('Test pasados')
})


module.exports = testRouter;