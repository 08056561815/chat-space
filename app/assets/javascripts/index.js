$(document).on('turbolinks:load', function(){
  function buildMESSAGE(comment) {
    var message_content = ""
    if (comment.content){
      var message_content = `<p class="lower-message__content">
                              ${ comment.content }
                            </p>`
    };

    var message_image = ""
    if (comment.image){
      var message_image = `<img class="lower-message__image" src= ${ comment.image } >`
    };

    var html = `<div class="message" data-id= ${ comment.id }>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ comment.user_name }
                    </div>
                    <div class="upper-message__date">
                      ${ comment.created_at }
                    </div>
                  </div>
                  <div class="lower-meesage">
                    ${message_content}
                    ${message_image}
                  </div>
                </div>`
    $('.messages').append(html);
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 3000);
  }


  function update(){
    if($('.message')[0]){
      var message_id = $('.message:last').data('id');
    } else {
      var message_id = 0
    }

    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
        message: { id: message_id }
      },
      dataType: 'json'
    })

    .done(function(data){
      $.each(data, function(i, data){
        buildMESSAGE(data);
      });
    })
    .fail(function(){
      alert('error');
    })
  }

  var timer = setInterval(function(){
  if (window.location.pathname.match(/\/groups\/\d+\/messages/)) {
    update();
  } else {
    clearInterval(timer);
  }}, 5000);
});
