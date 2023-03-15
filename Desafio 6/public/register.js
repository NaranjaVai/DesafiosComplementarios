
function createRegister(){
    const name = document.getElementById('nameClient').value;
    const apellido = document.getElementById('surNameClient').value;
    const pw = document.getElementById('password').value;
    const userMail = document.getElementById('emailClient').value;
    const edad = document.getElementById('ageClient').value;

    fetch('/register',{
        method: 'POST',
        headers:{'Content-Type': 'aplication/json'},
        body: JSON.stringify({name: name, surName: apellido, password: pw, userMail: userMail, age: edad })
    })
    .then(res => res.text())
    .catch(err => console.error(err));
}

document.getElementById('register').addEventListener('click', createRegister);
