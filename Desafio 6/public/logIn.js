const sendLogin = async () => {
    const mail = document.getElementById('nameClient').value;
    const pw = document.getElementById('password').value;
    console.log(mail,pw);
    await fetch('/api/session/login',{
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

document.getElementById('logIN').addEventListener('submit',(e) =>{
    e.preventDefault();
    sendLogin();
});

const logout = async () => {
    await fetch('/api/session/logout', {
        method: 'post',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      .then(response => response.text())
      //.then(response => response.json())
      .then(responseText => console.log(responseText))      
      .catch(error => console.error(error));
    }

document.getElementById('logout').addEventListener('click', (e) =>{
    e.preventDefault();
    logout();
});