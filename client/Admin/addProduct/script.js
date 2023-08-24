let productForm = document.querySelector("#product-form");

let product = {

};

window.onload = async() =>{
    await fetchAllCategories()
}

const getProductDetails = () => {
    const productTitle = document.querySelector('#productTitle').value
    const productDescription = document.querySelector('#productDescription').value
    const productCategory = document.querySelector('input[name="category"]:checked').value
    const unitsInStock = document.querySelector('#unitsInStock').value
    const productPrice = document.querySelector('#productPrice').value
    const imageFile = document.querySelector('#imageFile').value
    
       
    product = {
        product_name: productTitle,
        product_description: productDescription,
        product_category_id: productCategory,
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

const fetchAllCategories = async ()=>{

    try {
    
        let html =``
    
        const res = await fetch('http://localhost:8005/api/products/category/all',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
    
        const data = await res.json()
        const categories = data.categories 
    
        categories.map(category => {
            html += `
            <br>
            <label>
                <input type="radio" name="category" value="${category.id}" required> ${category.category_name}
            </label>
            `
        })
    
        let categoriesContainer = document.querySelector('#categories-container')
        categoriesContainer.innerHTML = html
        
    } catch (error) {
    
        // console.log(error)
        // alerts.innerHTML = `
        // <div class="alerts">${error.message}</div>
        // `
        // setTimeout(()=>{
        //     alerts.innerHTML =''
        // },3000)
        
    }
}



