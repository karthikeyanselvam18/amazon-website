const main = document.querySelector("main");
const searchBar = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-button");
let localStorageFile = JSON.parse(localStorage.getItem("amazon-cart")) || [];
const cartCountElement = document.querySelector(".cart-count");
let cartCount = 0;
localStorageFile.forEach((item) => {
  cartCount += item.count;
});
cartCountElement.innerHTML = cartCount;
async function fetchProducts() {
  try {
    main.innerHTML = "";
    const response = await fetch("products.json");
    const data = await response.json();
    data.forEach((product) => {
      if (product.name.toLowerCase().startsWith(searchBar.value))
        render(product);
    });
  } catch (error) {
    console.error("Error fetching the products:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchProducts);

const cartContiner = document.querySelector(".cart-container");
cartContiner.addEventListener("click", () => {
  window.location.href = "checkout.html";
});

function render(product) {
  const productContainer = document.createElement("div");
  productContainer.classList = "product-container";
  productContainer.innerHTML = `
  <div class="image-container"><img
  src="${product.image}"
  alt=""
  class="product-image"
/></div>
<span class="product-name"
  >${product.name}</span
>
<div class="rating-container">
  <img src="images/ratings/rating-45.png" class="rating" />
  <span class="rate-count">${product.rating.count}</span>
</div>
<span class="product-price">₹${product.priceCents}</span>
<div class="product-quantity-container">
            <select class="quantity-selector" id="sel-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
<button id="${product.id}">Add to Cart</button>`;
  main.appendChild(productContainer);
  const button = document.getElementById(product.id);
  const selector = document.getElementById("sel-" + product.id);
  button.addEventListener("click", () => {
    localStorageFile = JSON.parse(localStorage.getItem("amazon-cart")) || [];
    let count = parseInt(selector.value);
    localStorageFile.forEach((item) => {
      if (item.id == button.id) {
        let index = localStorageFile.indexOf(item);
        count = item.count + parseInt(selector.value);
        localStorageFile.splice(index, 1);
      }
    });

    cartCount += parseInt(selector.value);
    cartCountElement.innerHTML = cartCount;
    localStorageFile.push({ id: button.id, count });
    localStorage.setItem("amazon-cart", JSON.stringify(localStorageFile));
    console.log(JSON.parse(localStorage.getItem("amazon-cart")));
  });
}

searchBtn.addEventListener("click", () => {
  fetchProducts();
});

// localStorage.removeItem("amazon-cart");
