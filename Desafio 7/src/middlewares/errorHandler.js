import { EErrors } from "../services/errors/enums";
export default (err, req,res, next) =>{
    console.log(err.cause);
    (err.code === EErrors.ERROR_INVALID_TYPE) ? 
    res.send({status: 'error', error:err.name}) : 
    res.send({status:'error', error: 'Unhandled Error'})
}