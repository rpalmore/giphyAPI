var topics = ["San Francisco", "New York City", "Tokyo", "Paris", 
              "London", "Chicago", "Amsterdam", "Copenhagen",
              "Detroit", "Italy", "Moscow", "Hawaii", "The Moon", "Singapore",
              "Mexico City", "Area 51"]

function createButtons() {
    $("#cityButtons").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("city");
        button.attr("data-name", topics[i]);
        button.text(topics[i]).addClass("capitalize");
        $("#cityButtons").append(button);
    }

   $("button").hover(function(){
        $(this).css("background-color", "#7ac943");
        }, function(){
        $(this).css("background-color", "buttonface");
    });
}
createButtons();

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
                              		  .attr("data-state", imgURL)
                             		  .attr("data-still", imgURL)
                             		  .attr("data-animate", gifURL)
			cityDiv.prepend(cityImage);
    		$("#cityGifs").prepend(cityDiv);

    		$(".gif").on("click", function() {
				var state = $(this).attr("data-state");
        		if (state === "still") {
        			console.log(this);
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

$("#add-city").on("click", function(event) {
    event.preventDefault();
    var newCity = $("#city-input").val().trim();
    topics.push(newCity);
    createButtons();
});

$("#cityButtons").on("click", ".city", displayGifs);


$("#clear").click(function(event){
    event.preventDefault();
    $("#city-input").val("").focus();
});

$("a").hover(function(){
    $(this).css("background-color", "#18c8e4");
	}, function(){
        $(this).css("background-color", "white");
});