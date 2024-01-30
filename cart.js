const checkCart = ()=>{
    if(localStorage.getItem('cart')){

    }else{
        let Cart = {
            user_id: Math.floor(Math.random() * 10000) + 1,
            product_title: [],
            product_id: [],
            product_price: [],
            product_count:[],
            sub_total: 0
        };
        localStorage.setItem('cart',JSON.stringify(Cart));
    }
}

const addToCart = ()=>{
    const title = document.getElementById('product_title').textContent;
    const price = parseFloat(document.getElementById('product_price').textContent);
    const id = document.getElementById('product_id').value;
    let Cart = JSON.parse(localStorage.getItem('cart'));
    let indexId = Cart.product_id.indexOf(id);
    if(indexId < 0){
        Cart.product_count.push(1);
        Cart.product_price.push(price);
        Cart.product_title.push(title);
        Cart.product_id.push(id);
        let priceSum = 0;
        for(let i = 0; i<Cart.product_id.length; i++){
            priceSum += Cart.product_count[i] * Cart.product_price[i];
        }
        Cart.sub_total = priceSum;
    }else{
        Cart.product_count[indexId] += 1;
        let priceSum = 0;
        for(let i = 0; i<Cart.product_id.length; i++){
            priceSum += Cart.product_count[i] * Cart.product_price[i];
        }
        Cart.sub_total = priceSum;
    }
    localStorage.setItem('cart',JSON.stringify(Cart));
    cartViewCount();
};


const cartViewCount = ()=>{
    let Cart = JSON.parse(localStorage.getItem('cart'));
    document.getElementById('cart_view_count').innerHTML = `Cart (${Cart.product_id.length})`;
}


const cartList = ()=>{
    let Cart = JSON.parse(localStorage.getItem('cart'));
    let table = '';

    for(let i = 0; i < Cart.product_id.length; i++){
        table += `
            <tr>
                <td>${Cart.product_title[i]}</td>
                <td>${Cart.product_price[i]} $</td>
                <td>
                    <input onchange="changeCount('${Cart.product_id[i]}',${i})" type="number" min="1" id="count_${i}" value="${Cart.product_count[i]}" class="form-control" />
                </td>
                <td>${(Cart.product_count[i] * Cart.product_price[i]).toFixed(2)} $</td>
                <td>
                    <button onclick="deleteProduct('${Cart.product_id[i]}')" class="btn btn-danger btn-sm">Delete</button>
                </td>
            </tr>
        `;
    }

    table += `
        <tr>
            <td colspan="5" class="text-end">Sub total: ${Cart.sub_total} $</td>
        </tr>
    `;

    document.getElementsByTagName('tbody')[0].innerHTML = table;
}

const deleteProduct = (id)=>{
    let Cart = JSON.parse(localStorage.getItem('cart'));
    let indexProduct = Cart.product_id.indexOf(id);

    if(indexProduct > -1){
        Cart.product_id.splice(indexProduct,1);
        Cart.product_title.splice(indexProduct,1);
        Cart.product_count.splice(indexProduct,1);
        Cart.product_price.splice(indexProduct,1);

        let priceSum = 0;
        for(let i = 0; i<Cart.product_id.length; i++){
            priceSum += Cart.product_count[i] * Cart.product_price[i];
        }
        Cart.sub_total = priceSum;
        localStorage.setItem('cart',JSON.stringify(Cart));
        cartViewCount();
        cartList();
    }
}

const changeCount = (id,i)=>{
    let count = Number(document.getElementById("count_"+i).value);
    let Cart = JSON.parse(localStorage.getItem('cart'));
    let indexProduct = Cart.product_id.indexOf(id);
    if(indexProduct > -1){
        Cart.product_count[indexProduct] = count;
        let priceSum = 0;
        for(let i = 0; i < Cart.product_id.length; i++){
            priceSum += Cart.product_count[i] * Cart.product_price[i];
        }
        Cart.sub_total = priceSum;
        localStorage.setItem('cart', JSON.stringify(Cart));
    }

    cartList();
}