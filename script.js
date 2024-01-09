const main = document.querySelector("main");
let localStorageFile = JSON.parse(localStorage.getItem("amazon-cart")) || [];
const cartCountElement = document.querySelector(".cart-count");
let cartCount = 0;
localStorageFile.forEach((item) => {
  cartCount += item.count;
});
cartCountElement.innerHTML = cartCount;
async function fetchProducts() {
  try {
    const response = await fetch("products.json");
    const data = await response.json();
    data.forEach((product) => {
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
    <span class="prodcut-count"></span>
    <button id="${product.id}">Add to Cart</button>`;
      main.appendChild(productContainer);
      const button = document.getElementById(product.id);
      button.addEventListener("click", () => {
        localStorageFile =
          JSON.parse(localStorage.getItem("amazon-cart")) || [];
        let count = 1;
        localStorageFile.forEach((item) => {
          if (item.id == button.id) {
            let index = localStorageFile.indexOf(item);
            count = item.count + 1;
            localStorageFile.splice(index, 1);
          }
        });

        cartCount += 1;
        cartCountElement.innerHTML = cartCount;
        localStorageFile.push({ id: button.id, count });
        localStorage.setItem("amazon-cart", JSON.stringify(localStorageFile));
      });
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
