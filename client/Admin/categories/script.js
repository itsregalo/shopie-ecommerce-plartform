let categoryForm = document.querySelector("#category-form");
let updateCategoryForm = document.querySelector("#update-category-form");

let category = {
    
};

let categoryID;

window.onload = async() =>{
    await fetchAllCategories()

    var editBtns = document.querySelectorAll('.edit-btn');
    var deleteBtns = document.querySelectorAll('.delete-btn');

    editBtns.forEach(editBtn => {
        editBtn.addEventListener('click', async (event) => {
            const trElement = event.target.closest("tr");
            const inputElement = trElement.querySelector("input[type='hidden']");
            categoryID = inputElement.value;

            // TODO: Populate update form with current category name
            try {        
                const res = await fetch(`http://localhost:8005/api/products/category/${categoryID}`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                
        
                const data = await res.json()
                const category = data.category 
        
                document.querySelector('#newCategoryName').value = category.category_name

                
            } catch (error) {
        
                // console.log(error)
                // alerts.innerHTML = `
                // <div class="alerts">${error.message}</div>
                // `
                // setTimeout(()=>{
                //     alerts.innerHTML =''
                // },3000)
                
            }
        

            const closeModalBtn = document.getElementById('closeModalBtn'); // Close button
            const modalBackdrop = document.getElementById('modalBackdrop');
            const modalContent = document.getElementById('modalContent');

            modalBackdrop.style.display = 'block';
            modalContent.style.display = 'block';
        

            closeModalBtn.addEventListener('click', () => { // Close button event
                modalBackdrop.style.display = 'none';
                modalContent.style.display = 'none';
            });

            modalBackdrop.addEventListener('click', (event) => { // Click outside to close
                if (event.target === modalBackdrop) {
                    modalBackdrop.style.display = 'none';
                    modalContent.style.display = 'none';
                }
            });
        });
    });

    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', async (event) => {
            const trElement = event.target.closest("tr");
            const inputElement = trElement.querySelector("input[type='hidden']");
            categoryID = inputElement.value;
            
            console.log(categoryID);
        
            const deleteCategory = async () => {
                try {
                    const res = await fetch(`http://localhost:8005/api/products/category/${categoryID}`,{
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    const data = await res.json()

                } catch (error) {
                    
                }
            }

            await deleteCategory();
            location.reload();
        });
    });

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
    
        categories.map((category, index) => {
            html += `
            <tr>
                <input id="category_id" type="hidden" value="${category.id}">
                <td>${index + 1}</td>
                <td>${category.category_name}</td>
                <td class="text-center">
                    <button class="edit-btn" id="showModalBtn">Edit</button>
                </td>
                <td class="text-center">
                    <button class="delete-btn" id="delete-btn">Delete</button>
                </td>
            </tr>
            `
        })
    
        let tbody = document.querySelector('#tbody')
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

const getCategoryDetails = () => {
    const categoryName = document.querySelector('#categoryName').value
    
       
    category = {
        category_name: categoryName
    }
}


categoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    getCategoryDetails();
    try {

        const res = await fetch('http://localhost:8005/api/products/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'

            },
            body: JSON.stringify(category)
        })

        console.log('saved');

        const data = await res.json()

        //   let alerts = document.querySelector('.alerts')

        //    let html = `<h3 > ${data?.message??'something went wrong'}</h3>`
        //   alerts.innerHTML = html;
          
        
    } catch (error) {
        console.log(error)
        
    }

    location.reload();

});

updateCategoryForm.addEventListener('submit', async(e)=>{
    e.preventDefault();

    let category = {
        category_name: document.querySelector('#newCategoryName').value,
    }

    try {
        const res = await fetch(`http://localhost:8005/api/products/category/${categoryID}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
        })
        const data = await res.json()

    } catch (error) {
        
    }

    location.reload();

})










