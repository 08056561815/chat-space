$(function(){
  function buildHTML_content(comment){
    var html = `<div class="message">
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
                  </div>
                </div>`
    return html;
  }
  function buildHTML_image(comment){
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ comment.user_name }
                    </div>
                    <div class="upper-message__date">
                      ${ comment.created_at }
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <img class="lower-message__image" src= ${ comment.image } >
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
      contentType: false
    })
    .done(function(data){
      if(data.content !== "" ){
      var html = buildHTML_content(data);
      }else{
      var html = buildHTML_image(data);
      }
      $('.messages').append(html)
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.form__message').val('')
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 2000);
    })
  })
})
