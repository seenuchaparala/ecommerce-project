# ecommerce-project

E-Commerce portfolio website for Front end Web Development course

https://bucolic-pika-8602e1.netlify.app/index.html


The main goal of this project is to encapsulate all the HTML, CSS & Javascript concepts learned as part of the coursework at AcademyXi. As per the course requirement, only one page is included/rendered in this project and it has to be a responsive website.


This page consists of a header, product cards, and a shopping cart. The first part is a header which consists of a Forever21 logo that has a link tag pointing back to this page. There are three more links that do not redirect (Course requirement). A final part is a form with text input and a search button. The function of this form is explained later in this document.


The second part is a sliding image section that consists of three images. each of which populates every 3 seconds on the page. Here, the 'setTimeout' event handler is used to recursively call the function, showSlides(), every 3 seconds.

This page displays four product cards from Forever21 API based on 'click' and 'keypress' events on the form in the navigation header. Based on the search input text, relevant product cards are displayed. The key for the forever21 API was obtained from rapidapi.com. Fetch with async/await is used to get the JSON object from this API. The resulting object is destructured to get the required data for the product cards.

Each product card has an 'Add to cart' button, and clicking this button adds the product to the shopping cart. The item quantity can be increased by the changing of quanity in the cart or by clicking the 'Add to cart' button again. The total is calculated based on the price and quantity. Products can also be removed with the 'Remove' button.
 
References:
https://www.w3schools.com/ 

