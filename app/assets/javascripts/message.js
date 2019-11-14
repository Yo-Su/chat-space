$(function(){

  function buildMessage(message){
    var image = ""
    message.image_url ? image = `<img src="${message.image_url}">` : image = ""
    var html = `<div class="message" data-message-id=${message.id}>
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
      $(".view").append(html);
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $(".form__submit").removeAttr("disabled");
    })
    .fail(function(message){
      alert("メッセージ送信に失敗しました");
    })
  })

  // 自動更新機能の実装

  var buildMessageHTML = function(message) {
    var image = ""
    // message.image_url ? console.log("OK") : console.log("NG");
    message.image.url ? image = `<img src="${message.image.url}">` : image = ""
    // console.log(message.image);
    // console.log(message.image.url);
    // console.log(message.image_url);
    // console.log(image);
    
    // console.log(message.image);
    var html = `<div class="message" data-message-id=${message.id}>
                  <div class="message__upper-info">
                    <div class="message__upper-info__user">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="message__text">
                    ${message.content}
                    <div class="message__text">
                      ${image}
                    </div>
                  </div>
                </div>`
    return html;
  };


  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $($(".view").children()[$(".view").children().length - 1]).attr("data-message-id");
    // console.log(last_message_id);
    var httpId = location.href.match(new RegExp(/\/(\d+)/))[1]
    var http = `/groups/${httpId}/api/messages`
    // console.log(http);
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
      // console.log('success');
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      // console.log(message);
      var pageCount = 0;
      messages.forEach(function(newMessage){
        var countHTML = insertHTML
        insertHTML += buildMessageHTML(newMessage);
        pageCount = 1;

      });
      //メッセージが入ったHTMLを取得

      //メッセージを追加
      $(".view").append(insertHTML)
      if (pageCount === 1){
        $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
        pageCount = 0;
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 7000);
  // reloadMessages();
})