// Data definitions
let allProducts = [
  {
    index: 1,
    id: "p1",
    name: "Samsung TV",
    price: 500000,
    in_cart: false,
  },
  {
    index: 2,
    id: "p2",
    name: "Pixel 4a",
    price: 250000,
    in_cart: false,
  },
  {
    index: 3,
    id: "p3",
    name: "PS 5",
    price: 300000,
    in_cart: false,
  },
  {
    index: 4,
    id: "p4",
    name: "MacBook Air",
    price: 800000,
    in_cart: false,
  },
  {
    index: 5,
    id: "p5",
    name: "Apple Watch",
    price: 95000,
    in_cart: false,
  },
  {
    index: 6,
    id: "p6",
    name: "Air Pods",
    price: 75000,
    in_cart: false,
  },
];

let cart = [];

// DOM Query
// Select all add to cart buttons
const addtoCartButtons = document.querySelectorAll(".cart_btn");
const cartButton = document.querySelector("#cartButton");
const cartButtonCounter = document.querySelector(".cart-counter");
const cartModal = document.querySelector("#cartModal");
const emptyCartMessage = document.querySelector(".empty-cart-message");
const cartTable = document.querySelector("#cart_table");
const cartTableBody = document.querySelector("#cart_table tbody");
const finalPrice = document.querySelector(".final_price");
const priceSection = document.querySelector("#cartModal .price");
const cartModalFooter = document.querySelector(".modal-footer");

// Function to add and remove from cart
const addToCart = (e) => {
  const productID = e.target.parentElement.id;
  const selectedProduct = allProducts.filter(
    (product) => product.id === productID
  );
  const checkProductInCart = cart.some((product) => product.id === productID);
  if (checkProductInCart) {
    cart = cart.filter((product) => product.id !== productID);
    e.target.textContent = "Add to Cart";
    e.target.classList.remove("added_to_cart");
  } else {
    cart.push(selectedProduct[0]);
    e.target.textContent = "Remove from Cart";
    e.target.classList.add("added_to_cart");
  }
  cartButtonCounter.textContent = cart.length;
  const myModal = new bootstrap.Modal(document.getElementById("cartModal"));
  myModal.show();
};


// Event listener for each Add to cart buttons
addtoCartButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});

// Event listener for the modal
cartModal.addEventListener("show.bs.modal", (event) => {
  if (cart.length) {
    emptyCartMessage.style.display = "none";
    cartTable.classList.remove("d-none");
    priceSection.classList.remove("d-none");
    cartModalFooter.classList.remove("d-none");
    const renderHTML = (data) => {
      let html = `
            <tr data-id=${data.id}>
              <td>${data.name}</td>
              <td>#${data.price}</td>
              <td>1</td>
              <td>${data.price}</td>
              <td>
                <button href="#" class="remove_from_cart_button btn btn-danger btn-sm">
                  Remove
                </button>
              </td>
            </tr>
            `;
      cartTableBody.innerHTML += html;
    };
    cart.forEach(product => renderHTML(product));
    finalPrice.innerHTML = `#${cart.reduce((a, b) => {return a + b.price}, 0)}`;
  }
});

cartModal.addEventListener('hidden.bs.modal', event => {
    emptyCartMessage.style.display = "";
    cartTable.classList.add("d-none");
    priceSection.classList.add("d-none");
    cartModalFooter.classList.add("d-none");
    cartTableBody.innerHTML = ``
  })
  