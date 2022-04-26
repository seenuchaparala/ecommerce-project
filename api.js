

const serverData = async (input) => {
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'apidojo-forever21-v1.p.rapidapi.com',
            'X-RapidAPI-Key': '78bed3a4a8mshbf6e6f99e1ad1a5p14e1ddjsn26dbe05350e0'
        }
    };

    let url = `https://apidojo-forever21-v1.p.rapidapi.com/products/search?query=${input}&rows=4&start=0&color_groups=black`;

    const rawData = await fetch(url, options);

    const data = await rawData.json();

    return data;
}

const input = document.getElementById('searchValue');
const submitBtn = document.getElementById('submit');
const productCardHtml = document.getElementsByClassName('shop-item');
// input.addEventListener('keypress', async (event) => {
//     if (event.key === 'Enter') {
//         await createProductCard();
//     }
// })
submitBtn.addEventListener('click', async (event) =>{
    event.preventDefault();
    await createProductCard();
})

const createHtmlCard = (image, brand, description, price) => {
    const htmlString = `<img class = "shop-item-image" src= ${image} alt="Denim Jeans" style="width:100px height:100px">
    <h1 class="shop-item-title">${brand}</h1>
    <p>${description}</p>
    <div class="shop-item-details">
      <p class="shop-item-price">${price}</p>
      <p><button class="btn btn-primary shop-item-button" type="button">Add to Cart</button></p>
    </div>`
    return htmlString;
}

const createProductCard = async () => {
    const data = await serverData(input.value);
    for(let i = 0; i < productCardHtml.length; i++) {
        const {thumb_image, brand, title, price} = data.response.docs[i];
        console.log(thumb_image, brand, title, price);
        productCardHtml[i].innerHTML = '';
        productCardHtml[i].innerHTML = createHtmlCard(thumb_image, brand, title, price);
    }
}



    

