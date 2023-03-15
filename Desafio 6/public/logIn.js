function sendLogin(){
    const name = document.getElementById('emailClient');
    const pw = document.getElementById('password');
    fetch('/login',{
        method: 'POST',
        headers:{'Content-Type': 'aplication/json'},
        body: JSON.stringify({userMail: userMail, password: pw })
    })
    .then(res => res.text())
    .catch(err => console.error(err));
}

document.getElementById('logIN').addEventListener('click', sendLogin);
