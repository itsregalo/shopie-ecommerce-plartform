let productForm = document.querySelector("#product-form");
let product = {
    
};

window.onload = async() =>{
    await fetchAllProducts();
    await fetchAllCategories();
    var deleteBtns = document.querySelectorAll('.delete-btn');

    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', async (event) => {
            const trElement = event.target.closest("tr");
            const inputElement = trElement.querySelector("input[type='hidden']");
            const productID = inputElement.value;
        
            const deleteProduct = async () => {
                try {
                    const res = await fetch(`http://localhost:8005/api/products/${productID}`,{
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    const data = await res.json()

                } catch (error) {
                    
                }
            }

            await deleteProduct();
            location.reload();
        });
    });

    const editBtns = document.querySelectorAll('.btn-open-modal')
    editBtns.forEach(editBtn => {
        editBtn.addEventListener("click", async () => {
            document.getElementById("productModal").style.display = "block";
            const trElement = event.target.closest("tr");
            const inputElement = trElement.querySelector("input[type='hidden']");
            const productID = inputElement.value;

            // TODO: Populate update form with current products details
            try {        
                const res = await fetch(`http://localhost:8005/api/products/${productID}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                
        
                const data = await res.json()
                const product = data.product 
        
                document.querySelector('#productTitle').value = product.product_name
                document.querySelector('#productDescription').value = product.product_description
                document.querySelector('#unitsInStock').value = product.product_stock
                document.querySelector('#productPrice').value = product.product_price

                
            } catch (error) {
        
                // console.log(error)
                // alerts.innerHTML = `
                // <div class="alerts">${error.message}</div>
                // `
                // setTimeout(()=>{
                //     alerts.innerHTML =''
                // },3000)
                
            }
            
            productForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                getProductDetails();
                try {
            
                    const res = await fetch(`http://localhost:8005/api/products/${productID}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'accept': 'application/json'
                        },
                        body: JSON.stringify(product)
                    })
            
                    const data = await res.json()

                    await fetchAllProducts();
            
                    console.log('updated');
            
                    //   let alerts = document.querySelector('.alerts')
            
                    //    let html = `<h3 > ${data?.message??'something went wrong'}</h3>`
                    //   alerts.innerHTML = html;
                      
                    
                } catch (error) {
                    console.log(error)
                    
                }

                location.reload();
            });
        });
    })

    

    // Close modal
    document.querySelector(".close-modal").addEventListener("click", function() {
        document.getElementById("productModal").style.display = "none";
    });
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

const fetchAllProducts = async ()=>{
    try {

        let html =``

        const res = await fetch('http://localhost:8005/api/products',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        

        const data = await res.json()
        const products = data.products 


        products.map((product, index) => {
            html += `
            
            <tr>
                <input id="product_id" type="hidden" value="${product.id}">
                <td>${index + 1}</td>
                <td>
                    <img src="" style="height: 100px; width: 100px; object-fit: cover;">
                </td>
                <td>${product.product_name}</td>
                <td>${product.product_description}</td>
                <td class="text-center">
                    <button type="button" class="btn-open-modal" id="edit-btn">Edit</button>
                </td>
                <td class="text-center">
                    <button class="delete-btn" id="delete-btn">Delete</button>
                </td>
            </tr>
            `
        })

        const tbody = document.querySelector('#tbody')
        tbody.innerHTML = html
        
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






