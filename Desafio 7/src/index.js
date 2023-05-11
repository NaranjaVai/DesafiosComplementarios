import { Router } from "express";
import { generarUsuarios } from "./mocks/index";
const router = Router()

router.get('/', (req,res) =>{
    let usuario = generarUsuarios(20);
    res.send({status: 'success', payload: usuario})
})

export default router;