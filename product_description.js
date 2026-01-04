
function GetProductDeatils() {

    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    document.getElementById("product-img").src = product.thumbnail;
    document.getElementById("product-title").textContent = product.title;
    document.getElementById("product-description").textContent = product.description;
    const priceTags = document.getElementsByClassName("product-price");

    for (let tag of priceTags) {
        tag.textContent = `$${product.price}`;
    }

    var priceAfterdiscount = (product.price * (80 / 100)).toFixed(2)
    document.getElementById("discount").textContent = `$${priceAfterdiscount}`
    document.getElementById("product-brand").textContent = `${product.brand}`;
    document.getElementById("stock").textContent = `${product.availabilityStatus}`;
    document.getElementById("rate").textContent = `${product.rating}`;
    document.getElementById("reviews").textContent = `${product.reviews.length}`;
    document.getElementById("warrantyInformation").textContent = `${product.warrantyInformation}`;

}

GetProductDeatils()
var productsAddedToCart = JSON.parse(localStorage.getItem('cart')) || [];
function AddtoCart() {
       const product = JSON.parse(localStorage.getItem("selectedProduct"));

    const isCredit = document.getElementById('credit').checked;
    

    var  finalPrice =parseFloat( isCredit ? (product.price * 0.8).toFixed(2) : product.price);
    const paymentMethod = isCredit ? 'Credit' : 'Cash';

    let existingItem = productsAddedToCart.find(item => item.id == product.id);

    if (existingItem) {
            existingItem.quantity++;
        }
        else {
            product.quantity = 1;
            product.finalPrice=finalPrice
            productsAddedToCart.push(product)
        }

    
    localStorage.setItem('cart', JSON.stringify(productsAddedToCart));
    alert(`Added ${product.title} to cart via ${paymentMethod}!`);
};
