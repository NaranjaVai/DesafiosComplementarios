const comprar = async () => {
    urlPurchase = `${window.location.href}/purchase`
    await fetch(urlPurchase, {
        method: 'get',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' }       
      })
      .then(response => response.text())
      .then(responseText => console.log(responseText))      
      .catch(error => console.error(error));
}

document.getElementById("comprar").addEventListener("click", (e) => {
    e.preventDefault();
    comprar();
  });