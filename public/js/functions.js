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
        $("#animalResult").append("<img id='image' src='" + result[0].image + "' width='200' height='200'/>");
      }
    }) //ajax
  //});
}) //ready document