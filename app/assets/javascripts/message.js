$(function(){

  function showImage(message){
    var image = `<div class="message__text">
                  <img class="lower-message__image" src="/uploads/message/image/11/nekoneko.jpg" alt="Nekoneko">
                </div>`
    return image
  }
  function buildMessage(message){
    // console.log()
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
      // debugger
      $('.messages').append(html);
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $(".form__submit").removeAttr("disabled");
    })
    .fail(function(message){
      alert("メッセージ送信に失敗しました");
    })

  })
})