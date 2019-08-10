/*Code taken from Lab 5 Tutorial and Modified for this Final Project. CST 336 Summer 2019*/


$(document).ready(function() {


  //$(".button").on("click", function() {
    
  
  
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