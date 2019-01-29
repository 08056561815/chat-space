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
    // console.log("1")
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
      // console.log("2")
      }else{
      var html = buildHTML_image(data);
      }
      $('.messages').append(html)
      // ajax→イベント内のコード（doneやfailは読まれない）→doneまたはfail（通信終了後）の順で読まれるため、disabledの解除はdoneまたはfail処理後に記述しないとならない。でないと、恐らくイベントをsubmit（イベントのセッションが通信の開始〜終了まで）で発火するようにしているため、通信開始→disabledの解除→通信終了→disabledの設定（input要素のデフォルト）となり、読まれてはいるけれども効かないという状態になってしまう。もしくは、alwaysを使えばそれでも問題なく動いてくれました。
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.form__message').val('')
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 2000);
    })
    // console.log("3")
  })
})
