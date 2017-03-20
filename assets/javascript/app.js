/* I chose location-based gifs for this assignment. Not all results
clearly illustrate a place (some are a bit random), but I thought 
it was a fun theme. */

var topics = ["San Francisco", "New York City", "Tokyo", "Paris", 
              "London", "Chicago", "Amsterdam", "Copenhagen",
              "Detroit", "Italy", "Moscow", "Hawaii", "The Moon", "Singapore",
              "Mexico City", "Area 51"]

// I wanted to cap first letter of each user input word also.

function createButtons() {
    $("#cityButtons").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>" + "&bull;");
        button.addClass("city");
        button.attr("data-name", topics[i]);
        button.text(topics[i]).addClass("capitalize");
        $("#cityButtons").append(button);
    }

   $("button").hover(function(){
        $(this).css("background-color", "#7ac943");
        }, function(){
        $(this).css("background-color", "white");
    });

}

createButtons();

// Connecting to Giphy API using get method.

function displayGifs() {
	var city = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" 
    			 	+ city 
    			 	+ "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
    url: queryURL,
    method: "GET"
    }).done(function(response) {
    	var results = response.data;
    	for (var i = 0; i < results.length; i++) {
    		var cityDiv = $("<div class='city'>");
    		var rating = results[i].rating;
    		var p = $("<p>").text("Rating: " + rating);
			cityDiv.append(p);
    		var imgURL = results[i].images.fixed_height_still.url;
    		var gifURL = results[i].images.fixed_height.url;
    		var cityImage = $("<img>").attr("src", imgURL).addClass("gif")
                                      .attr("data-still", imgURL)
                                      .attr("data-animate", gifURL)
                                      .attr("data-state", "still");

			cityDiv.prepend(cityImage);
    		$("#cityGifs").prepend(cityDiv);

        }

/* It took me ages to figure out that I had to close this for loop before the 
click function below. I originally had for loop including click function, but 
that caused a bug with images going to the DOM and disrupted still/animate toggle. */

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
    });
}

$("#add-city").on("click", function(event) {
    event.preventDefault();
    var newCity = $("#city-input").val().trim();
    topics.push(newCity);
    createButtons();
});

$("#cityButtons").on("click", ".city", displayGifs);

/* I really wanted to add a "clear" button to search bar. Method included
below works fine until you get to xs viewport. I solved for this by removing
the button at that viewport in CSS. */

$("#clear").click(function(event){
    event.preventDefault();
    $("#city-input").val("").focus();
});

$("a").hover(function(){
    $(this).css("background-color", "#18c8e4");
	}, function(){
        $(this).css("background-color", "white");
});