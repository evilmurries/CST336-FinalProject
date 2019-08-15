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
    
   //Execute automatically when page is loaded, this will prevent double click problem
                $.ajax({
                    method:"get",
                    url: "/getPetLocation",
                  data: {
                          //"" : ,
                        },
                    success: function(result,status){
                        for(let i=0; i < result.length; i++)
                        {
                            //$("#animal").append("<option value= " + result[i].animal_type + ">" + "</option>");
                            $("#location").append("<option value= " + result[i].location + ">" + result[i].location + "</option>");
                            
                        }
                    }
                });//ajax  
  
  
  /*
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
  }); //select pets */
  
  //$(".button").on("click", function() {
  
  
  
   //Action listener for adpot search button
$("#search").click(function() {
  var animalType = $("#animal").val();
  var physicalLocation = $("#location").val();
  
  $.ajax({
    
      method: "get",
      url: "/adoptSearch",
      data: {
        "animal" : animalType, "location" : physicalLocation,
      },
      success: function(result, status){
        $("#animalResult").html("");
        for(i=0;i<result.length;i++)
          {
            $("#animalResult").append(`
                                      ${result[i].pet_name} ${result[i].animal_type} 
                                      ${result[i].adoption_fee}  
                                      ${result[i].location} 
                                      <img class='image' src='${result[i].image}' width='75'> ${result[i].description} 
                                      <button class='adoptButton' value='${result[i].pet_name} ${result[i].adoption_fee}'>Adopt</button> <br>
                                      
                                     `);  
            $("#animalResult").append("<br>");
          }
      },//success  
      error: function(err, status) {
        console.log(err);
      }
    });//ajax
    
});
    
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
    let animal = $("#animals").val();
    
    var petType = $("#animals").val();
    var location = $("#location").val();
    var price = $("#price").val();
    
    console.log("animal " + petType);
    console.log("location " + location);
    console.log("price " + price);
    
    $.ajax({
        method: "get",
        dataType: "json",
        data: {"petType": petType, "location": location, "price": price},
        url: "api/storeInfo",
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
  

 //save the pet name in a session variable when adopt button is clicked
  $(document).on("click", ".adoptButton", function(){
    var petName = $(this).attr("value");
     
    $.ajax({
      method: "get",
      url: "/storeInfo",
      data: {
            "pet_name" : petName,
            },
      success: function(rows, status){
       
      },//success  
      error: function(err, status) {
        console.log(err);
      }
    });//ajax
});
  


  //button to display cart/session variable contents
  $("#showCart").click(function() {
    $.ajax({
    
      method: "get",
      url: "/retrieveInfo",
      data: {
       
      },
      success: function(result, status){
        $("#cartContainer").html("")
        for(i=0;i<result.pets.length;i++)
          {
            $("#cartContainer").append(result.pets[i]);
            $("#cartContainer").append("<br>");
          }
        $("#cartContainer").append("Cart total: " + result.cartTotal);
      },//success  
      error: function(err, status) {
        console.log(err);
      }
    });//ajax
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

//   //button to display cart/session variable contents
//   $("#showCart").click(function() {
//     $.ajax({
    
//       method: "get",
//       url: "/retrieveInfo",
//       data: {
       
//       },
//       success: function(result, status){
//         $("#cartContainer").html("")
//         for(i=0;i<result.pets.length;i++)
//           {
//             $("#cartContainer").append(result.pets[i]);
//             $("#cartContainer").append("<br>");
//           }
//         $("#cartContainer").append("Cart total: " + result.cartTotal);
//       },//success  
//       error: function(err, status) {
//         console.log(err);
//       }
//     });//ajax
//     });
    
//        //Action listener for adpot search button
// $("#search").click(function() {
//   var animalType = $("#animal").val();
//   var physicalLocation = $("#location").val();
  
//   $.ajax({
    
//       method: "get",
//       url: "/adoptSearch",
//       data: {
//         "animal" : animalType, "location" : physicalLocation,
//       },
//       success: function(result, status){
//         $("#animalResult").html("");
//         for(i=0;i<result.length;i++)
//           {
//             $("#animalResult").append(`
//                                       ${result[i].pet_name} ${result[i].animal_type} 
//                                       ${result[i].adoption_fee}  
//                                       ${result[i].location} 
//                                       <img class='image' src='${result[i].image}' width='75'> ${result[i].description} 
//                                       <button class='adoptButton' value='${result[i].pet_name} ${result[i].adoption_fee} <img class='image' src='${result[i].image}' width='75'>'>Adopt</button> <br>
                                      
//                                      `);  
//             $("#animalResult").append("<br>");
//           }
//       },//success  
//       error: function(err, status) {
//         console.log(err);
//       }
//     });//ajax
    
// });

 
  

  
//   }) //ready document
  




// // Action Listener for when the shopping cart is clicked on
// $("#cartContainer").on("click", function() {
//   $("#cartContainer").html("");
//   $("#cartContainer").append('<i class="fas fa-cart-arrow-down"></i>');
// });

// // Action listener for when an already clicked cart is clicked
// $("#cartContainer").on("click", function() {
//   $("#cartContainer").html("");
//   $("#cartContainer").append('<i class="fas fa-shopping-cart"></i>');
// });