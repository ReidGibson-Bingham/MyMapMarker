$(document).ready(function() {
  console.log("testing we are in get request");
  $.ajax({
    type: "get",
    url: "/",
    // data: {message: "body"},
    success: (result) => {
      console.log("success", result);
    },
    dataType: "json"
  });
})

