// For Index page
$(document).ready(function(){
  $("#submitButton").click(function(){
    var firstName=document.getElementById("text1").value;
    var lastName=document.getElementById("text2").value;
    var email=document.getElementById("email").value;

    if(firstName ===''|| lastName ==='' || email==='' ){    	
    	window.alert("Please add all details")
    }
    else{
    $.get(`/api/createUser?firstName=${firstName}&lastName=${lastName}&email=${email}`).then(data=>
	     {
	      window.location.assign("users")
	     }  
	  );
    }
  });
});


// For Users page

$(document).ready(function(){
	 $.get(`/api/allUsers`).then(data=>
     {
      console.log(data)

      $.each(data, function(rowIndex, r) {
        var row = '<tr><td>'+ r.firstName+'</td><td>'+ r.lastName+'</td><td>'+r.email+'</td> <td>'
        			+r.id + '</td></tr>'
        $("table tbody").append(row);
    	});
     });

    $("#buttonCreate").click(function(){   
      window.location.assign("createUser")
  });
});