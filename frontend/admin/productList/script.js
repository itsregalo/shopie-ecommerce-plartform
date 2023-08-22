window.onload = async() =>{
    await fetchAllProducts();
    var deleteBtns = document.querySelectorAll('.delete-btn');

    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', async (event) => {
            const tdElement = event.target.closest("td.text-center");
            const inputElement = tdElement.querySelector("input[type='hidden']");
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
            await fetchAllProducts();
        });
    });

    const btnOpenModals = document.querySelectorAll('.btn-open-modal')
    btnOpenModals.forEach(btnOpenModal => {
        btnOpenModal.addEventListener("click", function() {
            document.getElementById("productModal").style.display = "block";
        });
    })

    

    // Close modal
    document.querySelector(".close-modal").addEventListener("click", function() {
        document.getElementById("productModal").style.display = "none";
    });
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
                <td>${index + 1}</td>
                <td>
                    <img src="" style="height: 100px; width: 100px; object-fit: cover;">
                </td>
                <td>${product.product_name}</td>
                <td>${product.product_description}</td>
                <td class="text-center">
                    <button type="button" class="btn-open-modal">Edit</button>
                </td>
                <td class="text-center">
                    <input id="product_id" type="hidden" value="${product.id}">
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


