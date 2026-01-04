

function search(event) {
    event.preventDefault();

    var input = document.getElementById("searchInput").value;

    var req = new XMLHttpRequest();
    req.open("GET", "https://dummyjson.com/products/search?q=" + input);
    req.send();

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            var container = document.getElementsByClassName("products")[0];
            container.textContent = "";

            var res = JSON.parse(req.responseText);
            var arr = res.products;

            for (var i = 0; i < arr.length; i++) {
                drawShopProduct(arr[i]);
            }
        }
    };
}


function getAllProducts() {
    document.getElementsByClassName('products')[0].textContent = ''

    var req = new XMLHttpRequest()
    req.open("GET", "https://dummyjson.com/products")
    req.send()
    req.onreadystatechange = function () {
        if (req.readyState == 4) {

            var res = JSON.parse(req.responseText)
            var products = res.products;
            for (var index = 0; index < products.length; index++) {
                element = products[index];

                drawShopProduct(element)
            }
        }
    }
}

getAllProducts()

// Get the container of your radio buttons
const brandList = document.getElementById('brand-checkbox-list');

brandList.addEventListener('change', function (e) {
    if (e.target.name === 'filter') {
        const category = e.target.value;

        // If "All" is selected, we use our previous global function
        if (category === "all") {
            getAllProducts();
        } else {
            // Otherwise, use your filter function
            filterProducts(category);
        }
    }
});


function filterProducts(x) {
    var input = x

    var req = new XMLHttpRequest();
    req.open("GET", 'https://dummyjson.com/products/category/' + input);
    req.send();
    req.onreadystatechange = function () {
        document.getElementsByClassName('products')[0].textContent = ''



        if (req.readyState == 4) {
            var res = JSON.parse(req.responseText);
            // console.log(typeof res);
            console.log(res.products);
            var arr = res.products;
            for (var i = 0; i < arr.length; i++) {
                var data = arr[i]
                drawShopProduct(data);
            }

        }
    }
}

function drawShopProduct(data) {
    var section = document.getElementsByClassName("products")[0]
    var div = document.createElement("div")
    div.classList = "shadow-xl/30 min-w-[150px]  rounded-lg py-8 px-5 cursor-pointer hover:scale-[1.05] transition delay-150 duration-300 ease-in-out will-change-transform"

    //img
    var img = document.createElement("img")
    img.src = data.thumbnail
    // title
    var title = document.createElement("p")
    title.classList = "text-lg font-semibold  line-clamp-1"
    title.textContent = data.title
    //description
    var description = document.createElement("p")
    description.classList = "line-clamp-2"
    description.textContent = data.description
    // brand 
    var by = document.createElement("p")
    by.classList = "text-[#50575E]"
    by.textContent = "by "
    var brand = document.createElement("span")
    brand.classList = "underline text-[#5007aa]"
    brand.textContent = data.brand
    by.appendChild(brand)

    var bottomDetails = document.createElement('div')
    bottomDetails.classList = "flex justify-between"
    //price 
    var price = document.createElement("p")
    price.classList = "font-bold"
    price.textContent = `USD $${data.price}`
    //ratings
    var rates = document.createElement("div")
    rates.classList = "flex gap-1 justify-between items-center"
    var star = document.createElement("img")
    star.src = "https://woocommerce.com/wp-content/themes/woo/images/svg/star-active.svg"
    star.classList = "w-5"
    var rating = document.createElement("p")
    rating.textContent = data.rating
    var reviews = document.createElement("p")
    reviews.classList = "text-[#50575E]"
    reviews.textContent = `(${data.reviews.length})`

    rates.append(star, rating, reviews)

    bottomDetails.append(price, rates)

    div.append(img, title, description, by, bottomDetails)
    section.append(div)

    div.addEventListener("click", function () {
        localStorage.setItem("selectedProduct", JSON.stringify(data))
        window.location.href = "product_description.html"
    })


}









var filterButtons = document.getElementsByClassName("filter-btn");

for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function () {

        for (var j = 0; j < filterButtons.length; j++) {
            filterButtons[j].classList.remove("active");
        }
        this.classList.add("active");
        if (this.textContent == "All") {
            getAllProducts()
        }
        else {
            filterProducts(this.textContent);

        }
    });
}



