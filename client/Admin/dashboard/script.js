window.onload = async() =>{
    await getProductsCount();
}

const getProductsCount = async ()=>{
    try {
        const res = await fetch('http://localhost:8005/api/products',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        

        const data = await res.json()
        const products = data.products 

        const count = products.length



        const productsCount = document.querySelector('#products-count')
        productsCount.innerHTML = count
        
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