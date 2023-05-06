const addProduct = async (cid, pid) => {  
    await fetch(`/api/carts/${cid}/product/${pid}`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.text())
      .then(responseText => console.log(responseText))
      .catch(error => console.error(error));
  }
  