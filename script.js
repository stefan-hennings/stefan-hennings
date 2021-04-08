let products = [];

$(function () {
  $("#cart-btn").on("click", function () {
    $("#exampleModal").modal("show");
    renderCart();
  });
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((response) => (products = response))
    .then((response) => renderProducts(response));
});

function renderProducts(products) {
  let output = "";
  products.forEach((element) => {
    output += `<div class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100">
          <img
              class="card-img-top img-fluid"
              src="${element.image}"
              alt="Produkt bild"
          />
          <div class="card-body">
            <h4 class="card-title">
                ${element.title}
            </h4>
            <h5>${element.price}</h5>
            <p class="card-text">
            ${element.description}
            </p>
          </div>
          <div class="card-footer">
            <button class="btn btn-primary add-button" id="${element.id}">Lägg till </button>
          </div>
        </div>
      </div>`;
  });
  $("#product-output").append(output);
  $(".add-button").on("click", function (e) {
    addToCart(e.target.id);
  });
}

function addToCart(id) {
  const cart = getCart();
  const item = cart.find((item) => item.id == Number(id));
  if (item != undefined) {
    let quantity = item.quantity + 1;
    cart.find((item) => item.id == Number(id)).quantity = quantity;
  } else {
    cart.push({ id: Number(id), quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function removeFromCart(id) {
  console.log(id);
  let cart = getCart();
  const item = cart.find((item) => item.id == Number(id));
  console.log(item);
  if (item != undefined) {
    quantity = item.quantity - 1;
    console.log(`Item ${item.id} found, quantity: ${item.quantity} decreased`);
    console.log(cart.find((item) => item.id == Number(id)));
    cart.find((item) => item.id == Number(id)).quantity = quantity;
    cart = cart.filter(function (element) {
      return element.quantity > 0;
    });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) ?? [];
}

function getObjectById(id) {
  return products.find((item) => item.id == Number(id));
}

function increaseItem(id) {
  addToCart(id);
  renderCart();
}

function decreaseItem(id) {
  removeFromCart(id);
  renderCart();
}

function renderCart() {
  const cart = getCart();
  let output = "";
  let totalPrice = 0;
  cart.forEach((element) => {
    const item = getObjectById(element.id);
    const linePrice = Number(element.quantity) * Number(item.price);
    totalPrice += linePrice;
    output += `<ul class="list-group list-group-horizontal text-center">
        <li class="list-group-item col-6 text-start">${item.title}</li>
        <li class="list-group-item col-2">${item.price}</li>
        <li class="list-group-item col-2"><i class="bi bi-dash-square decrease" id="${element.id}"></i> ${element.quantity} <i class="bi bi-plus-square increase" id="${element.id}"></i></li>
        <li class="list-group-item col-2" >${linePrice}</li>
      </ul>`;
  });
  output += `<ul class="list-group list-group-horizontal text-center">
  <li class="list-group-item col-8"></li>
  <li class="list-group-item col-2"><h5>Totalpris</h5></li>
  <li class="list-group-item col-2"><h5>${totalPrice}</h5></li>
  </ul>`;
  $("#cart-output").html(output);
  $(".decrease").on("click", function (e) {
    decreaseItem(e.target.id);
  });
  $(".increase").on("click", function (e) {
    increaseItem(e.target.id);
  });
}
