'use strict';

//GLOBAL VARIABLES

//variables that connect to a place on the page
var click_data = document.getElementById('list');
var ctx = document.getElementById('myChart').getContext('2d');

//number of times and item is clicked into an array.
var item_click_data = [];

//number of times an items is viewed.
var total_view_data = [];

var myChart; // eslint-disable-line no-unused-vars

//variable to the total number of selecting opportunities
var TESTS = 5;

//variable that stores the details of each item in an array (each instance of the item object)
var catalog_options =[];

//variable that stores the name of each item
var catalog_names = [];

//variables that hold the currently displayed image
var currently_displayed_left_item;
var currently_displayed_middle_item;
var currently_displayed_right_item;

//variable for the container that holds all the images in the selection box
var container_for_items = document.getElementById('selection_block');

//variables associated with the left item of the selection block
var left_image = document.getElementById('left_item_image');
var left_h2 = document.getElementById('left_item_h2');

//variables associated with the middle item of the selection block
var middle_image = document.getElementById('middle_item_image');
var middle_h2 = document.getElementById('middle_item_h2');

//variables associated with the right item of the selection block
var right_image = document.getElementById('right_item_image');
var right_h2 = document.getElementById('right_item_h2');

//FUNCTIONS
//Constructs an Item object (constructor function)
var Item = function(name, url){
  this.name = name;
  this.url = url;
  this.clicks = 0;
  this.times_shown = 0;
  catalog_options.push(this);
  catalog_names.push(name);
};

//function that assigns a particular item name and url to targets (tells us where they will be on the page)
//  render_item(catalog_options[left_item_idx]);
var render_item = function(the_item, target_img, target_h2){
  target_img.src = the_item.url;
  target_h2.textContent = the_item.name;
  the_item.times_shown ++;
};

//function to pick new items
var pick_new_items = function (){
  //picking new items and placing them on the page
  //pick a random array indice that will be used to select image (next code block)
  var left_item_idx = Math.floor(Math.random() * catalog_options.length);
  var middle_item_idx = Math.floor(Math.random() * catalog_options.length);
  var right_item_idx = Math.floor(Math.random() * catalog_options.length);

  //load the randomly selected images into the placeholders
  currently_displayed_left_item = catalog_options[left_item_idx];
  currently_displayed_middle_item = catalog_options[middle_item_idx];
  currently_displayed_right_item = catalog_options[right_item_idx];

  //render the images to the page by calling the render_item function
  render_item(currently_displayed_left_item, left_image, left_h2);
  render_item(currently_displayed_middle_item, middle_image, middle_h2);
  render_item(currently_displayed_right_item, right_image, right_h2 );
};

//function that is called when the mouse is clicked
var handle_click_on_item = function (event){
  //check to be make sure the click is in an image
  if (event.target.tagName === 'IMG'){
    //if it is the left image log the click
    if (event.target.id === 'left_item_image'){
      currently_displayed_left_item.clicks ++;
    }
    //if it is the middle image log the click
    else if (event.target.id === 'middle_item_image'){
      currently_displayed_middle_item.clicks ++;
    }
    //if it is the right image log the click
    else if (event.target.id === 'right_item_image'){
      currently_displayed_right_item.clicks ++;
    }

    //reduce number of TESTS remaining
    TESTS --;

    pick_new_items();

    //stop listening for clicks
    if (TESTS <= 0){
      container_for_items.removeEventListener('click', handle_click_on_item);
      for (var k = 0; k < catalog_options.length; k++){
        if (catalog_options[k].times_shown === 0) {
          var percent = 0;
        }
        else {
          percent = Math.round(catalog_options[k].clicks / catalog_options[k].times_shown * 100);
        }
        //created the element
        var list_element = document.createElement('li');
        //add content to an element
        list_element.textContent = `${catalog_options[k].name} -- clicks: ${catalog_options[k].clicks}, times shown: ${catalog_options[k].times_shown}, percent of time selected: ${percent}`;
        //display on the page
        click_data.appendChild(list_element);

        //send click data to array that holds the number of times the item clicked.
        item_click_data.push(catalog_options[k].clicks);

        //send times shown data to an array that holds the number of times the item was shown.
        total_view_data.push(catalog_options[k].times_shown);
      }
      render_myChart();
      var stringy_catalog_options = JSON.stringify(catalog_options);
      localStorage.setItem('catalog_options', stringy_catalog_options);
    }
  }
};
//generate a chart of the number of clicks - note the is EXTERNAL CODE (see script in <head> of HTML)
function render_myChart(){
  myChart = new Chart(ctx, {//eslint-disable-line no-undef
    type: 'horizontalBar',
    data: {
      labels: catalog_names,
      datasets: [{
        label: '# of Clicks',
        data: item_click_data,
        backgroundColor:
          'rgba(255, 99, 132, 0.2)',
        borderColor:
          'rgba(255,99,132,1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

//MAIN BODY OF CODE

//if the catalog_options JSON file has content bypass creating instances of object.
if (localStorage.getItem('catalog_options')){
  //get the stringy data from JSON storage
  var storage_stringy_catalog_options = localStorage.getItem('catalog_options');
  //update the catalog_options array with the content from the JSON storage
  catalog_options = JSON.parse(storage_stringy_catalog_options);
  //push the name of each item to the catalog_names array.
  for (var m = 0; m < catalog_options.length; m++){
    catalog_names.push(catalog_options[m].name);
  }
}
//create instances of all items (note in the Item object has code that sends each instance to an array)
else {
  new Item ('Funky Travel Bag', 'assets/bag.jpg');
  new Item ('Cool Banana Slicer', 'assets/banana.jpg');
  new Item ('"Connected" TP Stand', 'assets/bathroom.jpg');
  new Item ('Rain Boots', 'assets/boots.jpg');
  new Item ('Breakfast in One', 'assets/breakfast.jpg');
  new Item ('Meatball Gum', 'assets/bubblegum.jpg');
  new Item ('Upsidedown Chair', 'assets/chair.jpg');
  new Item ('Monstero', 'assets/cthulhu.jpg');
  new Item ('Doggie Duck Lips', 'assets/dog-duck.jpg');
  new Item ('Dragon Meat', 'assets/dragon.jpg');
  new Item ('Silver-Pen', 'assets/pen.jpg');
  new Item ('Pet Sweep', 'assets/pet-sweep.jpg');
  new Item ('Pizza Scissors', 'assets/scissors.jpg');
  new Item ('Shark Bag', 'assets/shark.jpg');
  new Item ('Baby Sweep', 'assets/sweep.png');
  new Item ('Tauntaun Sleep', 'assets/tauntaun.jpg');
  new Item ('Unicorn Meat', 'assets/unicorn.jpg');
  new Item ('OctoUSB', 'assets/usb.gif');
  new Item ('Watering Can', 'assets/water-can.jpg');
  new Item ('Tilted Wine Glass', 'assets/wine-glass.jpg');
}

//initialize the items in the selection box
currently_displayed_left_item = catalog_options[0];
currently_displayed_middle_item = catalog_options[1];
currently_displayed_right_item = catalog_options[2];

//EXTERNAL CODE
//add an event listener to activate on a mouse click
container_for_items.addEventListener('click', handle_click_on_item);
