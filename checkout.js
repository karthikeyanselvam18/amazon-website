const orderContainer = document.querySelector(".order-list-container");

function render() {
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => {
      let localStorageFile = JSON.parse(localStorage.getItem("amazon-cart"));
      orderContainer.innerHTML = "";
      localStorageFile.forEach((item) => {
        data.forEach((product) => {
          if (item.id === product.id) {
            const orderListSummary = document.createElement("section");
            orderListSummary.className = "order-list-summary";
            orderListSummary.innerHTML = `<span class="delivery-date"
            >Delivery date: Thursday, January 18
          </span>
          <section class="product-details-container">
            <div class="image-container">
              <img
                src="${product.image}"
                alt=""
                class="product-image"
              />
            </div>
            <div class="product-details">
              <span class="product-name">
                ${product.name}
              </span>
              <span class="product-price">${product.priceCents}
              </span>
              <span class="product-quantity">Quantity: ${item.count} Update
              <button onclick="deleteItem('${product.id}')">Delete</button>
              </span>
            </div>
            <div class="delivery-details">
              <span class="delivery-option-title">
                Choose a delivery option:
              </span>
              <div class="delivery-options">
                <input type="radio" name="" id="" />
                <div class="delivery-option-details">
                  <p>Thursday, January 18</p>
                  <p>FREE Shipping</p>
                </div>
              </div>
              <div class="delivery-options">
                <input type="radio" name="" id="" />
                <div class="delivery-option-details">
                  <p>Thursday, January 18</p>
                  <p>FREE Shipping</p>
                </div>
              </div>
              <div class="delivery-options">
                <input type="radio" name="" id="" />
                <div class="delivery-option-details">
                  <p>Thursday, January 18</p>
                  <p>FREE Shipping</p>
                </div>
              </div>
            </div>
          </section>`;
            orderContainer.appendChild(orderListSummary);
          }
        });
      });
    });
}

function deleteItem(productId) {
  let localStorageFile = JSON.parse(localStorage.getItem("amazon-cart")) || [];
  localStorageFile.forEach((item) => {
    if (item.id == productId) {
      let index = localStorageFile.indexOf(item);
      localStorageFile.splice(index, 1);
      localStorage.setItem("amazon-cart", JSON.stringify(localStorageFile));
    }
  });
  render();
}

render();
