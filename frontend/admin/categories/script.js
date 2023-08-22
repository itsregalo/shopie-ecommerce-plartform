let categoryForm = document.querySelector("#category-form");

let category = {

};

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
        console.log(data)
        const categories = data.categories 
    
        categories.map((category, index) => {
            html += `
            <tr>
                <td>${index + 1}</td>
                <td>${category.category_name}</td>
                <td class="text-center">
                    <a href="" id="edit-btn">Edit</a>
                </td>
                <td class="text-center">
                    <a href="" id="delete-btn">Delete</a>
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

window.onload = async() =>{
    await fetchAllCategories()
}



