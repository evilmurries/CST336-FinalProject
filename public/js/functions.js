/*Code taken from Lab 5 Tutorial and Modified for this Final Project. CST 336 Summer 2019*/


$(document).ready(function() {

  
  
    //test for location
    $("#animals").on("change", function() {
    $.ajax({
      method: "get",
      url: "/api/getLocation",
      data: {
        "animal_type": $("#animals").val(),
      },
      success: function(result, status) {
        //$("#price").html("<select>");
        $("#location").html("<option>Select One</option>")
        for (let i = 0; i < result.length; i++) {
          $("#location").append("<option>" + result[i].location + "</option>");
        }
        // $("#price").html("</select>");
      }
    }) //ajax
  }); //select pets
  
  //$(".button").on("click", function() {
    
  $("#animals").on("change", function() {
    $.ajax({
      method: "get",
      url: "/api/getPrice",
      data: {
        "animal_type": $("#animals").val(),
      },
      success: function(result, status) {
        //$("#price").html("<select>");
        $("#price").html("<option>Select One</option>")
        for (let i = 0; i < result.length; i++) {
          $("#price").append("<option>" + result[i].adoption_fee + "</option>");
        }
        // $("#price").html("</select>");
      }
    }) //ajax
  }); //select pets
  
   $(".petLink").on("click", function() {
    $.ajax({
      method: "get",
      url: "/api/getimage",
      data: {

        "animal_type" : $(this).text().trim(),
      },
      success: function(rows, status) {
        
        $("#animalResult").html("");
        rows.forEach(function(row) {
        $("#animalResult").append("<img id='image' src='" + row.image + "' width='200' height='200'/>");

        })
      }
    }) //ajax
  }); //petLink
  //});
  
  //Action listener for adpot search button
  $("#search").click(function() {
    let animal = $("#animals").val();
    
    console.log(animal);
    var petType = "animal";
    var location = "location";
    var price = "price";
    
    console.log("animal " + petType);
    console.log("location " + location);
    console.log("price " + price);
    
    $.ajax({
        method: "get",
        dataType: "json",
        data: {"petType": petType, "location": location, "price": price},
        url: "api/adoptSearch",
        success: function(rows, status){
          //console.log("Adopt search was carried out successfully. ");
          for(i=0;i<rows.length;i++)
            {
              $("#animalResult").append(rows[i].pet_name + "<br>");
            }
        },//success  
        error: function(err, status) {
          console.log(err);
        }
      });//ajax
  });


  }) //ready document

// Action Listener for when the shopping cart is clicked on
$("#cartContainer").on("click", function() {
  $("#cartContainer").html("");
  $("#cartContainer").append('<i class="fas fa-cart-arrow-down"></i>');
});

// Action listener for when an already clicked cart is clicked
$("#cartContainer").on("click", function() {
  $("#cartContainer").html("");
  $("#cartContainer").append('<i class="fas fa-shopping-cart"></i>');
});


