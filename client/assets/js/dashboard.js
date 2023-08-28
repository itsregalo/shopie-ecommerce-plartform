const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const base_url = 'http://127.0.0.1:8005/api';

const fetchAllProducts = async()=>{
    const response = await fetch(`${base_url}/products/`, {
        headers:{
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

const displayProducts = async()=>{
    const product_div = document.querySelector('.products');
    const products = await fetchAllProducts();

    products.products.forEach(product => {
        const product_card = document.createElement('div');
        product_card.classList.add('product-card');

        const inner_html = `
            <div class="product-image">
                <img src="${product.product_image}" 
                alt="product-1" width="200px">
            </div>
            <div class="product-info">
                <a href="/client/products/products_details.html?id=${product.id}">
                    <h4>
                        ${product.product_name}
                    </h4>
                </a>
                <p>Price: $${product.product_price}</p>
                <button id="add_to_cart">
                    <a href="">Add to Cart</a>
                </button>
            </div>
        `;
        product_card.innerHTML = inner_html;
        product_div.appendChild(product_card);
    });
}

const fetchProductId = async(id)=>{
    const response = await fetch(`${base_url}/products/${id}`, {
        headers:{
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

const displayProductDetails = async()=>{
    const product_id = new URLSearchParams(window.location.search).get('id');
    const product_div = document.querySelector('.product-details');
    const product = await fetchProductId(product_id);

    const inner_html = `
        <div class="product-img">
            <img src="${product.product.product_image}" 
            alt="product-1" width="">
        </div>

        <div class="description">
            <div class="detail-title">
                <h2>
                    ${product.product.product_name}
                </h2>
            </div>
            <div class="detail-price">
                <p>Price: $${product.product.product_price}</p>
            </div>
            <div class="detail-category">
                <p>Category: ${product.product.product_category_id}</p>
            </div>

            <div class="item-description">
                <p>
                    ${product.product.product_description}
                </p>
            </div>
            
            <div class="product-quantity">
                <button>-</button>
                <input type="number" value="1">
                <button>+</button>
            </div>
                
            <div class="add-cart-btn btn">
                    <button>Add to Cart</button>
            </div>
        </div>
    `;
    product_div.innerHTML = inner_html;
}


const addProductToCart = async()=>{
    const response = await fetch(`${base_url}/products/item/add-to-cart/${id}`, {
        headers : {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            product_quantity: 1
        })
        
    });
    const data = await response.json();
    return data;
}

const add_several_products_to_cart = async()=>{
    const response = await fetch(`${base_url}/products/item/add-to-cart/${id}`, {
        headers : {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            product_quantity: 1
        })
        
    });
    const data = await response.json();
    return data;
}

