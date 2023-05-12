export default class CustomError {
    static createError ({name='error', cause, message, code=1}){
        const err = new Error(message,{cause})
        err.name = name;
        err.code = code;
        throw err;
    }
}