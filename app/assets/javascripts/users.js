$(function() {
  // インクリメントサーチ
  var search_list = $("#user-search-result");

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


  // インクリメントサーチ残りの実装
  function  addUser(userName, userId){
    var html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${userId}'>
              <p class='chat-group-user__name'>${userName}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>
            `
    $("#chat-group-users").append(html)
  }

  $(document).on("click", ".chat-group-user__btn--add", function() {
    console.log(this);
    // 追加ボタン押したとき、nameとidを取得
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
      console.log(userName);
      console.log(userId);

    // 検索結果から削除
    $(this).parent().remove()
    addUser(userName, userId)
    // addDeleteUser(userName, userId);
    // addMember(userId);
  });

});