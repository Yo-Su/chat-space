$(function() {

  var search_list = $("#chat-group-users");

  function searchHit(user){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
              `;
    search_list.append(html);
  }

  function searchUnHit(){
    var html = `
                <div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>
               `;
    search_list.append(html);
  }

  function addDeleteUser(name, id){
    let html = `
                <div class="ChatMember clearfix" id="${id}">
                  <p class="ChatMember__name">${name}</p>
                  <div class="ChatMember__remove ChatMember__button" data-user-id="${id}" data-user-name="${name}">削除</div>
                </div>
               `;
    $("#.ChatMembers").append(html);
  }


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: "json"
    })
    .done(function(users) {
      search_list.empty();

      if (users.length !== 0){
        users.forEach(function(user){
          searchHit(user);

        })
        console.log(users);
      } else if (input.length == 0) {
        return false;
      }
      else {
        searchUnHit();
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  });
});