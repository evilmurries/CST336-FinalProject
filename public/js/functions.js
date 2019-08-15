/*Code taken from Lab 5 Tutorial and Modified for this Final Project. CST 336 Summer 2019*/


$(document).ready(function() {
  
//Execute automatically when page is loaded, this will prevent double click problem
  $.ajax({
      method:"get",
      url: "/getPetTypes",
    data: {
            //"" : ,
          },
      success: function(result,status){
        console.dir(result);
          for(let i=0; i < result.length; i++)
          {
              $("#animal").append("<option value= " + result[i].animal_type + ">" + i + "</option>");
              //$("#location").append("<option value= " + result[i].location + ">" + "</option>");

          }
      }
  });//ajax

    
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
  
  $("#price").on("change", function() {
  $.ajax({
    method: "get",
    url: "/api/getLocation",
    data: {
      "animal_type": $("#animals").val(),
      "price": $("#price").val()
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
  
//Action listener for adopt search button
$("#addToCart").click(function() {
  //console.log("Adopt search was carried out successfully. ");
//  let animal = $("#animals").val();

  var petType = $("#animals option:selected").text();
  var location = $("#location").val();
  var price = $("#price").val();


  console.log("animal " + petType);
  console.log("location " + location);
  console.log("price " + price);

   $.ajax({
    method: "get",
    url: "/api/addCart",
    data: {

       price , location , petType
    },
    success: function(total, status) {
      
   //add CSS    
  let itemType = document.createElement("span")
  itemType.innerHTML = petType 

  let itemLocation = document.createElement("span")
  itemLocation.innerHTML = location

  let itemPrice = document.createElement("span")
  itemPrice.innerHTML = price

  let cartItem = document.createElement("div")
  cartItem.appendChild(itemType)
  cartItem.appendChild(itemLocation)
  cartItem.appendChild(itemPrice)
     
      
   // REMINDER: WE HAVE THE TOTAL DISPLAY TOTAL PRICE
   
  document.querySelector("#cartContainer").appendChild(cartItem)

      
      console.log(total)

    }
  }) //ajax



});


//button to display cart/session variable contents
$("#showCart").click(function() {
  console.log("show cart clicked")




});

})




// /*Code taken from Lab 5 Tutorial and Modified for this Final Project. CST 336 Summer 2019*/


// $(document).ready(function() {


//   //Execute automatically when page is loaded, this will prevent double click problem
//                 $.ajax({
//                     method:"get",
//                     url: "/getPetTypes",
//                   data: {
//                           //"" : ,
//                         },
//                     success: function(result,status){
//                       console.dir(result);
//                         for(let i=0; i < result.length; i++)
//                         {
//                             $("#animal").append("<option value= " + result[i].animal_type + ">" + result[i].animal_type  + "</option>");
//                             //$("#location").append("<option value= " + result[i].location + ">" + "</option>");
                            
//                         }
//                     }
 
                
//                 });//ajax
  
  
//   //Execute automatically when page is loaded, this will prevent double click problem
//                 $.ajax({
//                     method:"get",
//                     url: "/getPrice",
//                   data: {
//                           //"" : ,
//                         },
//                     success: function(result,status){
//                       console.log("success")
//                         for(let i=0; i < result.length; i++)
//                         {
//                             //$("#animal").append("<option value= " + result[i].animal_type + ">" + "</option>");
//                             $("#adoption_fee").append("<option value= " + result[i].adoption_fee + ">" + result[i].adoption_fee + "</option>");
                            
//                         }
//                     }
//                 });//ajax
  
  
  
  
//    //Execute automatically when page is loaded, this will prevent double click problem
//                 $.ajax({
//                     method:"get",
//                     url: "/getPetLocation",
//                   data: {
//                           //"" : ,
//                         },
//                     success: function(result,status){
//                         for(let i=0; i < result.length; i++)
//                         {
//                             //$("#animal").append("<option value= " + result[i].animal_type + ">" + "</option>");
//                             $("#location").append("<option value= " + result[i].location + ">" + result[i].location + "</option>");
                            
//                         }
//                     }
//                 });//ajax
  
//    $(".petLink").on("click", function() {
//     $.ajax({
//       method: "get",
//       url: "/api/getimage",
//       data: {

//         "animal_type" : $(this).text().trim(),
//       },
//       success: function(rows, status) {
        
//         $("#animalResult").html("");
//         rows.forEach(function(row) {
//         $("#animalResult").append("<img id='image' src='" + row.image + "' width='200' height='200'/>");

//         })
//       }
//     }) //ajax
//   }); //petLink
//   //});
  
//  //save the pet name in a session variable when adopt button is clicked
//   $(document).on("click", ".adoptButton", function(){
//     var petName = $(this).attr("value"); 
      
//     $.ajax({
//       method: "get",
//       url: "/storeInfo",
//       data: {
//             "pet_name" : petName,
//             },
//       success: function(rows, status){
        
//       },//success  
//       error: function(err, status) {
//         console.log(err);
//       }
//     });//ajax
    
// });




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