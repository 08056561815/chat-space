$(function(){
  function buildHTML(comment){
    var html = `<div class="message">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ comment.user_name }
                    </div>
                    <div class="upper-message__date">
                      ${ comment.created_at }
                    </div>
                  </div>`
    return html;
  }
  function buildContent(comment){
    var html =   `<div class="lower-meesage">
                    <p class="lower-message__content">
                      ${ comment.content }
                    </p>
                  </div>
                </div>`
    return html;
  }
  function buildImage(comment){
    var html =   `<div class="lower-meesage">
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
      if(data.content !== "" && data.image !== null){
      var html = buildHTML(data) + buildContent(data) + buildImage(data);
      console.log(data)
      }else if(data.content !== ""){
      var html = buildHTML(data) + buildContent(data);
      console.log(2)
      }else{
      var html = buildHTML(data) + buildImage(data);
      console.log(3)
      }
      $('.messages').append(html)
      $('.form__message').val('')
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
