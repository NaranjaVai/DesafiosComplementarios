import express from express;
import { addLogger } from "../utils/logger";
const app = express()
app.use(addLogger)

app.get('/', (req, res) => {
    req.logger.info('Ingreso en la ruta raiz')
    req.logger.warn('Este es un warn')
    req.logger.verbose('Este es verbose')
    res.send('Ruta ok')
})


const server = app.listen(8080, () => console.log('server running on 8080'));
server.on('error', error => console.log(error))