let productForm = document.querySelector("#product-form");
let updateBtn = document.querySelector(".update-btn");

let product = {
    
};

let productImageURL = '';

window.onload = async() =>{
    await fetchAllProducts();
    await fetchAllCategories();

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
                updateBtn.style.display = "block";
            })
        }
    })

    let deleteBtns = document.querySelectorAll('.delete-btn');

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
        editBtn.addEventListener("click", async (event) => {
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
                console.log(error);            
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
    
       
    product = {
        product_name: productTitle,
        product_description: productDescription,
        product_category_id: productCategory,
        product_stock: unitsInStock,
        product_price: productPrice,
        product_image: productImageURL
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
                    <img src="${product.product_image}" style="height: 100px; width: 100px; object-fit: cover;">
                </td>
                <td>${product.product_name}</td>
                <td>${product.product_description}</td>
                <td class="text-center">
                    <button type="button" class="btn-open-modal" id="edit-btn" data-cy="editProduct">Edit</button>
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
                <input type="radio" name="category" value="${category.id}" data-cy="category" required> ${category.category_name}
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






