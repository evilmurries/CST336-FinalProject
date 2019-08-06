/*Code taken from Lab 5 Tutorial and Modified for this Final Project. CST 336 Summer 2019*/


$(document).ready(function() {


  //$(".button").on("click", function() {
    
  
  
    $.ajax({
      method: "get",
      url: "/api/getimage",
      data: {
        
        "pet_name": 'Donut', //calling one image
      },
      success: function(result, status) {
        
        $("#animalResult").html("");
        $("#cartContainer").html("");
        $("#animalResult").append("<img id='image' src='" + result[0].image + "' width='200' height='200'/>");
        $("#cartContainer").append('<i class="fas fa-shopping-cart"></i>');
        // Switch to <i class="fas fa-cart-arrow-down"></i> when clicked on
      }
    }) //ajax
  //});
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