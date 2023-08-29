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
                <button id="add_to_cart" onclick="addProductToCart('${product.id}')">Add to Cart</button>
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


const addProductToCart = async(id)=>{
    try {
        // id to varchhar
        id = id.toString();
        const response = await fetch(`${base_url}/products/item/add-to-cart/${id}`, {
            headers : {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify({
                product_quantity: 1
            })
            
        });
        const data = await response.json();
        // notify user
        showNotification("Added to cart Successfully", "success");
        return data;
    }
    catch(error){
        console.log(error);
    }
}

const removeItemFromCart = async(id)=>{
    try {
        const response = await fetch(`${base_url}/products/item/remove-from-cart/${id}`, {
            headers : {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            method: 'DELETE',
            body: JSON.stringify({
                product_quantity: 1
            })

        });
        const data = await response.json();
        console.log(data);
        // notify user
        showNotification("Removed from cart Successfully", "success");

        // refresh page after 2 seconds
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        return data;
        
    } catch (error) {
        showNotification("Error removing from cart", "error");
    }
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

const fetchCartItems = async()=>{
    const response = await fetch(`${base_url}/products/item/get-cart-items/`, {
        headers:{
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}


const displayCartProducts = async () => {
    const product_div = document.querySelector('.products');
    const products = await fetchCartItems();

    //count number of items in cart
    const cart_items = products.cart.length;
    
    const cart_items_count = document.querySelector('.cart-count');
    cart_items_count.innerHTML = cart_items;

    for (const product of products.cart) {
        const product_card = document.createElement('div');
        product_card.classList.add(`product-card`);

        // get product id
        const product_id = product.product_id;

        // get product details
        const product_details = await fetchProductId(product_id);

        const inner_html = `
            <div class="product-image">
                <img src="${product_details.product.product_image}" 
                alt="product-1" width="200px">
            </div>
            <div class="product-info">
                <a href="/client/products/products_details.html?id=${product.id}">
                    <h4>
                        ${product_details.product.product_name}
                    </h4>
                </a>
                <p>Price: $${product_details.product.product_price}</p>
                <button id="add_to_cart" onclick="removeItemFromCart('${product.id}')">Remove from Cart</button>
            </div>
        `;
        product_card.innerHTML = inner_html;
        product_div.appendChild(product_card);
    }
}


function showNotification(message, type) {
    console.log('works')

    toast.create({
        title: type,
        text: message,
        type: type,
        timeout: 5000
    });
  };
  
  (function(root, factory) {
    try {
      // commonjs
      if (typeof exports === 'object') {
        module.exports = factory();
      // global
      } else {
        root.toast = factory();
      }
    } catch(error) {
      console.log('Isomorphic compatibility is not supported at this time for toast.')
    }
  })(this, function() {
  
    // We need DOM to be ready
    if (document.readyState === 'complete') {
      init();
    } else {
      window.addEventListener('DOMContentLoaded', init);
    }
  
    // Create toast object
    toast = {
      // In case toast creation is attempted before dom has finished loading!
      create: function() {
        console.error([
          'DOM has not finished loading.',
          '\tInvoke create method when DOM\s readyState is complete'
        ].join('\n'))
      }
    };
    var autoincrement = 0;
  
    // Initialize library
    function init() {
      // Toast container
      var container = document.createElement('div');
      container.id = 'cooltoast-container';
      document.body.appendChild(container);
  
      // @Override
      // Replace create method when DOM has finished loading
      toast.create = function(options) {
        var toast = document.createElement('div');
        toast.id = ++autoincrement;
        toast.id = 'toast-' + toast.id;
        toast.className = 'cooltoast-toast';
  
        // title
        if (options.title) {
          var h4 = document.createElement('h4');
          h4.className = 'cooltoast-title';
          h4.innerHTML = options.title;
          toast.appendChild(h4);
        }
  
        // text
        if (options.text) {
          var p = document.createElement('p');
          p.className = 'cooltoast-text';
          p.innerHTML = options.text;
          toast.appendChild(p);
        }
  
        // icon
        if (options.icon) {
          var img = document.createElement('img');
          img.src = options.icon;
          img.className = 'cooltoast-icon';
          toast.appendChild(img);
        }
  
        // click callback
        if (typeof options.callback === 'function') {
          toast.addEventListener('click', options.callback);
        }
  
        // toast api
        toast.hide = function() {
          toast.className += ' cooltoast-fadeOut';
          toast.addEventListener('animationend', removeToast, false);
        };
  
        // autohide
        if (options.timeout) {
          setTimeout(toast.hide, options.timeout);
        } 
        // else setTimeout(toast.hide, 2000);
  
        if (options.type) {
          toast.className += ' cooltoast-' + options.type;
        }
  
        toast.addEventListener('click', toast.hide);
  
  
        function removeToast() {
          document.getElementById('cooltoast-container').removeChild(toast);
        }
  
        document.getElementById('cooltoast-container').appendChild(toast);
        return toast;
  
      }
    }
  
    return toast;
  
  });