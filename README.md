# day14
==============User Stories===================================
In Index.html
-instructions on how to use page
-drop down menu of all products
    -use <select>
    -use <option>
-button to indicate quantity of purchase
    -input has to be: type="number"
-add an "add to cart" button to submit order
    -title of that button: "Add to Cart"
-When order is submitted, input fields should clear
-animated confirmation message display after submit
    -link to shopping cart page
    -animation from CSS and JS

In cart.html
-display all items currently in the order
    -pictures of each item
-needs button to delete item
    -if the button is clicked, will remove order from the DOM and order array
-text input field
    -name 
    -street
    -city
    -zip
    -phone number
-Input for credit card num
    -type="number"
    -16 digit card num
-process order button to submit order
    -"process order"
    -when pushed, all input fields clear
-animated confirmation message that order has been processed

==================================================TOOOLKIT=================
-local storage to share between HTML pages
-constructor function
    -like the one from busmall labs for organization
-Deploy repo to see how it looks as you work on it

=============How app.js works================
-feed in product name and quantity
    -add item to cart
    