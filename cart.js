
let cart = JSON.parse(localStorage.getItem('cart')) || [];


function renderCart() {
    var section = document.getElementsByClassName("cart-items-list")[0];
    section.innerHTML = '';
    cart.forEach((item, index) => {
        drawCartProduct(item, index);
    });
    totalPrice()
}

function removeItem(product) {
    cart = cart.filter(item => item.id !== product.id);
    syncCart()
};

function syncCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}


renderCart();

function drawCartProduct(data) {
    var section = document.getElementsByClassName("cart-items-list")[0];
    document.getElementsByClassName("cart-items-list").textContent = ''

    // Main Card Container
    var div = document.createElement("div");
    div.className = "  bg-white flex justify-start items-center md:min-w-[600px] max-w-[400px%] lg:gap-0 md:gap-2 md:justify-around lg:justify-start md:flex-row justify-evenly  p-6 mb-4 border border-gray-100 rounded-[2rem]  shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in-up ";

    // Product Image
    var img = document.createElement("img");
    img.src = data.thumbnail;
    img.className = "w-28 h-28 object-contain bg-neutral-50 rounded-2xl p-2 border border-gray-50 cursor-pointer hover:scale-[1.05] ";

    // Middle Section: Title and Brand
    var infoDiv = document.createElement("div");
    infoDiv.className = "flex flex-col items-center min-w-[200px] max-w-[200px]";

    var title = document.createElement("h4");
    title.className = "text-xl text-center font-black text-gray-900 tracking-tight max-w-[150px] cursor-pointer hover:underline";
    title.textContent = data.title;

    var subInfo = document.createElement("div");
    subInfo.className = "flex items-center gap-2 mt-1 flex-col ";
    subInfo.innerHTML = `
        <span class="text-xs font-bold uppercase tracking-widest text-purple-600">${data.paymentMethod || 'Standard'}</span>
        <span class="text-gray-500 font-medium">by ${data.brand}</span>`;
        
        // <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
    infoDiv.append(title, subInfo);

    var controls = document.createElement("div");
    controls.className = "flex  md:flex-row items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-100";

    var minusBtn = document.createElement("button");
    minusBtn.textContent = "-";
    minusBtn.className = "px-3 py-1 bg-white hover:bg-purple-600 hover:text-white transition-colors font-bold rounded-md shadow-sm cursor-pointer";
    minusBtn.onclick = function () {
        if (data.quantity > 1) {
            data.quantity--;
            syncCart();
        } else {
            removeItem(data);
        }
    };

    var qty = document.createElement("span");
    qty.className = "w-8 text-center font-bold text-gray-900";
    qty.textContent = data.quantity;

    var plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.className = "px-3 py-1 bg-white hover:bg-purple-600 hover:text-white transition-colors font-bold rounded-md shadow-sm cursor-pointer";
    plusBtn.onclick = function () {
        data.quantity++;
        syncCart(); // Update storage and redraw
    };

    controls.append(minusBtn, qty, plusBtn);
    // Pricing & Remove Section
    var priceSection = document.createElement("div");
    priceSection.className = " text-right flex flex-col  items-center md:flex-row md:justify-between";
    var price = document.createElement("p");
    price.className = "text-lg font-black text-gray-900";
    // Calculate total based on quantity
    const totalDisplay = (data.finalPrice || data.price) * data.quantity;
    price.textContent = `$${totalDisplay.toFixed(2)}`;
    var removeBtn = document.createElement("button");
    removeBtn.className = "text-gray-400 hover:text-red-500 transition-colors p-2 mt-1 cursor-pointer";
    removeBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    removeBtn.onclick = () => removeItem(data);

    priceSection.append(price, removeBtn);
    var AllInfoDiv = document.createElement("div");
    AllInfoDiv.classList=" flex flex-col items-center md:flex-row md:gap-2 md:justify-around "
    AllInfoDiv.append(infoDiv, controls, priceSection)
    div.append(img, AllInfoDiv);
    section.append(div);
    title.addEventListener("click", function () {
        localStorage.setItem("selectedProduct", JSON.stringify(data))
        window.location.href = "product_description.html"
    })
    img.addEventListener("click", function () {
        localStorage.setItem("selectedProduct", JSON.stringify(data))
        window.location.href = "product_description.html"
    })


}


function totalPrice() {
    var total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += parseFloat((cart[i].quantity * cart[i].finalPrice));
    }
    var checkoutText = document.getElementById("checkout");
    checkoutText.innerText = `${(total).toFixed()} USD`;

    var tax = document.getElementById("tax");
    var totalTax = parseFloat((total * 0.1).toFixed())
    tax.innerText = `${totalTax} USD`;

    var finalTotal = document.getElementById("total-summary");
    finalTotal.innerText = `${(total + totalTax).toFixed()} USD`;


}
