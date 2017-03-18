/*Before you can make any part of our site work, 
you need to create an array of strings, each one 
related to a topic that interests you. 
Save it to a variable called topics.*/

var topics = ["San Francisco", "New York", "Tokyo", "Paris", "London", "Chicago"]

/*Your app should take the topics in this array and create buttons 
in your HTML. Try using a loop that appends a button for 
each string in the array.*/

function createButtons() {
    // Deletes the cities prior to adding new cities
    // (this is necessary otherwise you will have repeat buttons)
    $("#cityButtons").empty();
    // Loops through the array of topics
    for (var i = 0; i < topics.length; i++) {
    // Then dynamicaly generates buttons for each topic in the array
    // This code $("<button>") is all jQuery needs to 
    // create the beginning and end tag. (<button></button>)
    var button = $("<button>");
    // Adds a class of city to our button
    button.addClass("city");
    // Added a data-attribute
    button.attr("data-name", topics[i]);
    // Provided the initial button text
    button.text(topics[i]);
    // Added the button to the buttons-view div
    $("#cityButtons").append(button);
   }
}

createButtons();

/*When the user clicks on a button, the page should grab 10 static, 
non-animated gif images from the GIPHY API and place them on the page.*/

function displayCityInfo() {

    var city = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + 
        city + "&api_key=dc6zaTOxFJmzC&limit=10";
   
    // Creates AJAX call for the specific city button being clicked
    $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {
    var results = response.data;
    // for loop ...
    for (var i = 0; i < results.length; i++) {
    // Creates a div to hold the city
    var cityDiv = $("<div class='city'>");
    // Retrieves the Rating Data
    // console.log(response);
    var rating = results[i].rating;
    // Creates an element to have the rating displayed
    var p = $("<p>").text("Rating: " + rating);
	// Displays the rating
	cityDiv.append(p);
	// Retrieving the URL for the image
    var imgURL = results[i].images.fixed_width_still.url;

    console.log(imgURL);
    // Creates an element to hold the image
    var cityImage = $("<img>").attr("src", imgURL).addClass("gif data-state");

	// Appends the image
	cityDiv.append(cityImage);
    // Puts the entire city above the previous city.
     $("#cityGifs").prepend(cityDiv);

    // var still = results[i].images.fixed_width_still.url;
    // var animate = results[i].images.fixed_width.url;

        $(".gif").on("click", function() {

        console.log("Whoopie!");

        var state = $(this).attr("data-state");
        console.log(this);

        if (state === "still") {
        $(this).attr("src", $(this).attr("animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        }

        });
 }
    });
}

/* When the user clicks one of the still GIPHY images, the gif 
should animate. If the user clicks the gif again, 
it should stop playing.
*/




  // <img src=
  // "http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" 
  // data-still=
  // "http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" 
  // data-animate=
  // "http://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" 
  // data-state=
  // "still" class="gif">





// Adding a click event listener to all elements with a class of "city"
   // $(document).on("click", ".city", displayCityInfo);
      $("#cityButtons").on("click", ".city", displayCityInfo);


// Adding in button hover elements
$("button").hover(function(){
    $(this).css("background-color", "#18c8e4");
    }, function(){
    $(this).css("background-color", "white");
 });

 // And some fun link hover decoration
$("a").hover(function(){
    $(this).css("background-color", "#18c8e4");
     }, function(){
    $(this).css("background-color", "white");
 });