// let products = [];
$(function () {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((response) => (products = response))
    .then((response) => renderCheckout(response));
  $(".form-control").on("click", function () {
    $(".invalid-feedback").hide();
  });
  $("#submit-button").on("click", validateInput);
});

function renderCheckout(products) {
  let output = "";
  let totalPrice = 0;
  const cart = getCart();
  cart.forEach((element) => {
    const item = getObjectById(element.id);
    const linePrice = Number(element.quantity) * Number(item.price);
    totalPrice += linePrice;
    output += `<ul class="list-group list-group-horizontal text-center">
          <li class="list-group-item col-6 text-start">${item.title}</li>
          <li class="list-group-item col-2">${item.price}</li>
          <li class="list-group-item col-2">${element.quantity}</i></li>
          <li class="list-group-item col-2" >${linePrice}</li>
        </ul>`;
  });
  output += `<ul class="list-group list-group-horizontal text-center">
    <li class="list-group-item col-8"></li>
    <li class="list-group-item col-2"><h5>Totalpris</h5></li>
    <li class="list-group-item col-2"><h5>${totalPrice}</h5></li>
    </ul>`;
  $("#checkout-output").html(output);
}

function validatePhone(input) {
  const phonePattern = /^[(]{0,1}[0-9]{2,4}[)]{0,1}[-\s.]{0,1}[0-9]{3}[-\s.]{0,1}[0-9]{2,6}$/;
  return phonePattern.test(input);
}

function validateZipcode(input) {
  const zipCodePattern = /^[1-9][0-9]{2} ?[0-9]{2}$/;
  return zipCodePattern.test(input);
}

function validateText(input) {
  const namePattern = /\p{L}/gu;
  return namePattern.test(input);
}

function validateEmail(input) {
  const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailPattern.test(input);
}

function validateInput() {
  let valid = true;
  if (!validateText($("#firstname").val())) {
    valid = false;
    $("#invalid-firstname").show();
  }
  if (!validateText($("#lastname").val())) {
    valid = false;
    $("#invalid-lastname").show();
  }
  if (!validateEmail($("#email").val())) {
    valid = false;
    $("#invalid-email").show();
  }
  if (!validatePhone($("#phone").val())) {
    valid = false;
    $("#invalid-phone").show();
  }
  if (!validateText($("#address").val())) {
    valid = false;
    $("#invalid-address").show();
  }
  if (!validateZipcode($("#zipcode").val())) {
    valid = false;
    $("#invalid-zipcode").show();
  }
  if (!validateText($("#city").val())) {
    valid = false;
    $("#invalid-city").show();
  }
  if (valid) {
    orderSuccessful();
  }
}

function orderSuccessful() {
  Swal.fire("Order bekräftad!", "Tack för din order! Välkommen åter!", "success")
    .then(function () {
      window.open("./index.html", "_self");
    })
    .then(function() {
        localStorage.removeItem("cart");
    });
}

