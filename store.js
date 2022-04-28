// if (document.readyState == 'loading'){
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
//     ready()
// }

const input = document.getElementById('searchValue');
console.log(input);
const submitBtn = document.getElementById('submit');
const productCardHtml = document.getElementsByClassName('shop-items')[1];
const scrollToProduct = document.getElementsByClassName('shop-item-button');
const caps = document.getElementById('caps');
const rings = document.getElementById('rings');
const gifts = document.getElementById('gifts');
const sheets = document.getElementById('sheets');

function ready() {
  const removeCartItemButtons = document.getElementsByClassName('btn-danger');

  for (let i = 0; i < removeCartItemButtons.length; i++) {
    const button = removeCartItemButtons[i];
    button.addEventListener('click', removeCartItem);
  }
  const quantityInputs = document.getElementsByClassName('cart-quantity-input');
  for (let i = 0; i < quantityInputs.length; i++) {
    const input1 = quantityInputs[i];
    input1.addEventListener('change', quantityChanged);
  }

  const addToCartButtons = document.getElementsByClassName('shop-item-button');
  for (let i = 0; i < addToCartButtons.length; i++) {
    const button = addToCartButtons[i];
    button.addEventListener('click', addToCartClicked);
  }

  document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked);
  window.scrollTo(0, document.body.scrollHeight);
}

function purchaseClicked() {
  alert('Thank you for your purchase');
  const cartItems = document.getElementsByClassName('cart-items')[0];
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateCartTotal();
}
function removeCartItem(event) {
  const buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  const button = event.target;
  const shopItem = button.parentElement.parentElement.parentElement;
  console.log(shopItem);
  const description = shopItem.getElementsByClassName('shop-item-description')[0].innerText;
  const price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
  const imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
  addItemToCart(description, price, imageSrc);
  updateCartTotal();
  window.scrollTo(0, document.body.scrollHeight);
}

function addItemToCart(title, price, imageSrc) {
  const cartRow = document.createElement('div');
  cartRow.classList.add('cart-row');
  const cartItems = document.getElementsByClassName('cart-items')[0];
  const cartItemNames = cartItems.getElementsByClassName('cart-item-image');
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].src === imageSrc) {
      alert('This item is already in the cart');
      return;
    }
  }
  const cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
}
function updateCartTotal() {
  const cartItemContainer = document.getElementsByClassName('cart-items')[0];
  let total = 0;
  const cartRows = cartItemContainer.getElementsByClassName('cart-row');
  for (let i = 0; i < cartRows.length; i++) {
    const cartRow = cartRows[i];
    const priceElement = cartRow.getElementsByClassName('cart-price')[0];
    const quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
    const price = parseFloat(priceElement.innerText.replace('$', ''));
    const quantity = quantityElement.value;
    total += (price * quantity);
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName('cart-total-price')[0].innerText = `$${total}`;
}

// api code

const serverData = async (input) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'apidojo-forever21-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '78bed3a4a8mshbf6e6f99e1ad1a5p14e1ddjsn26dbe05350e0',
    },
  };

  const url = `https://apidojo-forever21-v1.p.rapidapi.com/products/search?query=${input}&rows=4&start=0&color_groups=black`;

  const rawData = await fetch(url, options);

  const data = await rawData.json();

  return data;
};

const createHtmlCard = (image, brand, description, price) => {
  const htmlString = `<img class = "shop-item-image" src= ${image} alt="Denim Jeans" style="width:100px height:100px">
    <h1 class="shop-item-title">${brand}</h1>
    <p class = "shop-item-description">${description}</p>
    <div class="shop-item-details">
      <p class="shop-item-price">$${price}</p>
      <p><button class="btn btn-primary shop-item-button" type="button">Add to Cart</button></p>
    </div>`;
  return htmlString;
};

const createProductCard = async (input) => {
  const data = await serverData(input);
  productCardHtml.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    const productDiv = document.createElement('span');
    productDiv.className = 'card item shop-item';
    const {
      thumb_image, brand, title, price,
    } = data.response.docs[i];
    productDiv.innerHTML = createHtmlCard(thumb_image, brand, title, price);
    productCardHtml.appendChild(productDiv);
  }
};
input.addEventListener('keypress', async (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const i = event.target.value.replace(/\s+/g, '');
    await createProductCard(i);
    ready();
  }
});

submitBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const i = input.value.replace(/\s+/g, '');
  await createProductCard(i);
  ready();
});

caps.addEventListener('click', async (event) => {
  event.preventDefault();
  await createProductCard('menscaps');
  ready();
});
rings.addEventListener('click', async (event) => {
  event.preventDefault();
  await createProductCard('mensjackets');
  ready();
});
gifts.addEventListener('click', async (event) => {
  event.preventDefault();
  createProductCard('shoes');
  ready();
});
sheets.addEventListener('click', async (event) => {
  event.preventDefault();
  createProductCard('mensshirts');
  ready();
});
