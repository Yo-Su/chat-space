$(function() {
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    console.log(input);
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
      console.log(users);
    })
    .fail(function() {
      console.log("失敗です");
    });
  });
});