const sendLogin = async () => {
    const mail = document.getElementById('nameClient').value;
    const pw = document.getElementById('password').value;
    console.log(mail,pw);
    await fetch('/auth/login',{
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        headers:{'Content-Type': 'aplication/json'},
        body: JSON.stringify({userMail: mail, password: pw })
    })
    .then(res => res.text())
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

document.getElementById('logIN').addEventListener('submit', sendLogin);
