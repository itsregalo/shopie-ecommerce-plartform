let productForm = document.querySelector("#product-form");
let addBtn = document.querySelector(".add-btn");

let product = {

};

let productImageURL = '';

window.onload = async() =>{
    await fetchAllCategories()

    const imageFile = document.querySelector('#imageFile')

    imageFile.addEventListener('change', (event)=>{
        
        const target = event.target
        const files = target.files
        if(files){
            const formData = new FormData()
            formData.append("file", files[0])
            formData.append("upload_preset", "shopie")
            formData.append("cloud_name", "difoayyrr")

            fetch('https://api.cloudinary.com/v1_1/difoayyrr/image/upload', {
                method: "POST",
                body: formData
            }).then((res) => res.json()).then(res => {
                productImageURL = res.url
                addBtn.style.display = "block";
            })
        }

    })
}


// TODO: Fetch product details input and store as a product object
const getProductDetails = () => {
    const productTitle = document.querySelector('#productTitle').value
    const productDescription = document.querySelector('#productDescription').value
    const productCategory = document.querySelector('input[name="category"]:checked').value
    const unitsInStock = document.querySelector('#unitsInStock').value
    const productPrice = document.querySelector('#productPrice').value
    
    
    product = {
        product_name: productTitle,
        product_description: productDescription,
        product_category_id: productCategory,
        product_stock: unitsInStock,
        product_price: productPrice,
        product_image: productImageURL
    }
    
}

// TODO: Clear form
const clearForm = ()=>{
    document.querySelector('#productTitle').value = ''
    document.querySelector('#productDescription').value = ''
    document.querySelector('input[name="category"]:checked').value = ''
    document.querySelector('#unitsInStock').value = ''
    document.querySelector('#productPrice').value = ''
    document.querySelector('#imageFile').value = ''
}


// TODO: Add product to DB
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

        let alerts = document.querySelector('.alerts')

        if(data.message) {
            alerts.innerHTML = `
                <div style="color: rgb(5, 203, 5);">${data.message}</div>
            `;

            clearForm();
        }

        else if(data.error) {
            alerts.innerHTML = `
                <div style="color: red;">${data.error}</div>
            `;
        }
        
        setTimeout(()=>{
            alerts.innerHTML = '';
        }, 3000)
          
        
    } catch (error) {
        console.log(error)
        
    }

});

// TODO: Fetch all categories in DB
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
                <input type="radio" name="category" value="${category.id}" data-cy="category" required> ${category.category_name}
            </label>
            `
        })
    
        let categoriesContainer = document.querySelector('#categories-container')
        categoriesContainer.innerHTML = html
        
    } catch (error) {
        console.log(error);       
    }
}



