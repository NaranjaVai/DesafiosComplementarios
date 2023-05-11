import {faker} from '@faker-js/faker';
faker.locale = 'es';

const generarUsuarios = (cant) =>{
    const users = [];
    for(let i =0; i< cant; i++){
        users.push(generarUsuario())
    }
}

const generarUsuario = () =>{
    return{
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        cumple: faker.date.birthdate(),
        phone: faker.phone.number(),
        productos: generarProductos(10)
    }
}

const generarProductos = (cant) => {
    const products = [];
    for(let i=0; i<cant; i++){
        products.push(generarProducto())
    }
}

const generarProducto = () =>{
    return{
        id: faker.database.mongodbObjectId(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price()
    }
}

export {generarUsuarios, generarProductos}