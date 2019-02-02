$(document).on('turbolinks:load', function(){

  function buildHTML(comment){
    var message_image = ""
    if (comment.image){
      var message_image =
      `<img class="lower-message__image" src= ${ comment.image } >`
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
                    <p class="lower-message__content">
                      ${ comment.content }
                    </p>
                    ${message_image}
                  </div>
                </div>`
    return html;
  }

  $('.js-form').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html =buildHTML(data)
      $('.messages').append(html)
      $('.js-form')[0].reset()
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 2000);
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    })
  })
})
