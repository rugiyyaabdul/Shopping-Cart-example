onload = ()=>{
    const path = window.location.pathname;
    const page = path.split("/").pop();
    if(page==="index.htm"){
        getAllProducts();
    }else if(page==="cart.htm"){
        cartList();
    }
    getAllCategories();
    checkCart();
    cartViewCount();
}

const getAllCategories = ()=>{
    fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>showCategoriesListForMenu(json))
}

const showCategoriesListForMenu =(data)=>{

    let list = ``;

    for(let i = 0; i<data.length; i++){
        list += `
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">${data[i].toUpperCase()}</a>
                </li>
        `;
    }
    document.getElementById("menu").innerHTML = list;
}


const getAllProducts = ()=>{
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>showProductsForIndex(json));
}

const showProductsForIndex = (data)=>{
    let list = '';

    for(let i = 0; i < data.length; i++){
        list += `
        <div class="card col-md-4 mx-auto mb-4" style="width: 18rem;">
            <img src="${data[i].image}" style="height:200px; object-fit:container;" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${data[i].title.substr(0,15)}.. (${data[i].price} $)</h5>
            <p class="card-text">${data[i].description.substr(0,25)}...</p>
            <button onclick="viewProduct(${data[i].id},'${data[i].title.replace(/'/g, "")}','${data[i].description.replace(/'/g, "")}',${data[i].price},'${data[i].image}')" class="btn btn-primary">Detail</button>
            </div>
        </div>
        `;
    }

    document.getElementsByClassName("products-section")[0].innerHTML = list;

}


const viewProduct = (id,title,description,price,image)=>{
    const myModal = new bootstrap.Modal(document.getElementById('view'));
    document.getElementById('product_title').innerHTML = title;
    document.getElementById('product_description').innerHTML = description;
    document.getElementById('product_price').innerHTML = price + " $";
    document.getElementById('product_image').src  = image;
    document.getElementById('product_id').value = id;
    myModal.show();
}