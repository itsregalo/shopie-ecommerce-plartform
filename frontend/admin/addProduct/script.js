let productForm = document.querySelector("#product-form");

let product = {

};

const getProductDetails = () => {
    const productTitle = document.querySelector('#productTitle').value
    const productDescription = document.querySelector('#productDescription').value
    // const productCategory = document.querySelector('#productCategory').value
    const unitsInStock = document.querySelector('#unitsInStock').value
    const productPrice = document.querySelector('#productPrice').value
    const imageFile = document.querySelector('#imageFile').value
    
       
    product = {
        product_name: productTitle,
        product_description: productDescription,
        product_category_id: "269841a1-28f7-4b6e-af4a-a2d08bad43c2",
        product_stock: unitsInStock,
        product_price: productPrice,
        product_image: imageFile
    }
}


productForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    getProductDetails();
    try {

        const res = await fetch('http://localhost:8005/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(product)
        })

        const data = await res.json()


        //   let alerts = document.querySelector('.alerts')

        //    let html = `<h3 > ${data?.message??'something went wrong'}</h3>`
        //   alerts.innerHTML = html;
          
        
    } catch (error) {
        console.log(error)
        
    }

});






