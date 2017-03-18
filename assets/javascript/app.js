/*Before you can make any part of our site work, 
you need to create an array of strings, each one 
related to a topic that interests you. 
Save it to a variable called topics.*/

var topics = ["San Francisco", "New York", "Tokyo", "Paris", 
              "London", "Chicago", "Amsterdam", "Copenhagen"]

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
    var gifURL = results[i].images.fixed_width.url;

    // Creates an element to hold the image
    var cityImage = $("<img>").attr("src", imgURL).addClass("gif")
                              .attr("data-state", imgURL)
                              .attr("data-still", imgURL)
                              .attr("data-animate", gifURL);

	// Appends the image
	cityDiv.append(cityImage);
    // Puts the entire city above the previous city.
    $("#cityGifs").prepend(cityDiv);

/* When the user clicks one of the still GIPHY images, the gif 
should animate. If the user clicks the gif again, 
it should stop playing.
*/

    $(".gif").on("click", function() {

        var state = $(this).attr("data-state");
        console.log(this);

        if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        }

        });
 }
    });
}

/*Add a form to your page that takes the value from a user input box 
and adds it into your topics array. Then make a function call that 
takes each topic in the array and remakes the buttons on the page.*/

// This function handles events where a city button is clicked
$("#add-city").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var newCity = $("#city-input").val().trim();

    // Adding movie from the textbox to our array
    topics.push(newCity);

    // Calling renderButtons which handles the processing of our movie array
    createButtons();
});


// Adding a click event listener to all elements with a class of "city"
   // $(document).on("click", ".city", displayCityInfo);
$("#cityButtons").on("click", ".city", displayCityInfo);
