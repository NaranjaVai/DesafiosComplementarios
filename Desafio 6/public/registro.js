//document.getElementById('register').addEventListener('click', createRegister);

const  createRegister = async () => {
    const name = document.getElementById('nameClient').value;
    const apellido = document.getElementById('surNameClient').value;
    const pw = document.getElementById('password').value;
    const userMail = document.getElementById('emailClient').value;
    const edad = document.getElementById('ageClient').value;
    await fetch('http://localhost:8080/auth/register',{
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers:{'Content-Type': 'aplication/json'},
        body: JSON.stringify({name: name, surName: apellido, password: pw, userMail: userMail, age: edad })
    })
    .then(res => res.text())
    .catch(err => console.error(err));
}

document.getElementById("register").addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("escucha evento")
    createRegister();
  });