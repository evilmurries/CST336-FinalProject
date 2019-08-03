/*Code taken from Lab 5 Tutorial and Modified for this Final Project. CST 336 Summer 2019*/

$(document).ready(function() {


  $(".button").on("click", function() {
    var image;

    $.ajax({
      method: "get",
      url: "/api/getimage",
      data: {
        "image": image,
      },
      success: function(rows, status) {
        $("#animalResult").html("");
        $("#animalResult").append("<img id='image' src='" + image + "' width='200' height='200'/>");
      }
    }) //ajax
  });
}) //ready document