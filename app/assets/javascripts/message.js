$(function(){

  function buildMessage(message){
    var image = ""
    message.image ? image = `<img src="${message.image}">` : image = ""
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <div class="message__upper-info__user">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.time}
                    </div>
                  </div>
                  <div class="message__text">
                    ${message.content}
                    <div class="message__text">
                      ${image}
                    </div>
                  </div>
                </div>`
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $(".form__submit").removeAttr("disabled");
    })
    .fail(function(message){
      alert("メッセージ送信に失敗しました");
    })
  })

  // 自動更新機能の実装
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    // var last_message_id = $(".message").attr("data-message-id")
    // var element = $(".view");
    // var elementChild = $(element).children('div');
    // var elementChildNum = $(elementChild).length;
    // var child = elementChild[elementChildNum - 1];

    last_message_id = $($(".view").children()[$(".view").children().length - 1]).attr("data-message-id");
    console.log(last_message_id);
    // console.log(data);
    // console.log(elementChildNum);
    // console.log($(child).attr("data-message-id"));
    // var last_message_id = $(".message").data("message-id")
    // console.log(last_message_id)
    // function searchId(message){
    //   console.log(message.id)
    // }
    // searchId(group)

    // var aaa = $(document).attr("data-message-id")
    // debugger
    // $(document).on("click", ".message", function(){
    //   var usid = $(this).attr("data-message-id");
    //   console.log(usid);
    // })
    // console.log(last_message_id);
    // console.log(location.href)
    // var httpId = location.href.match(/\/(\d+)/)
    var httpId = location.href.match(new RegExp(/\/(\d+)/))[1]
    console.log(`/groups/${httpId}/api/messages`);

    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: `/groups/${httpId}/api/messages`,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    });
  };
  reloadMessages();
})