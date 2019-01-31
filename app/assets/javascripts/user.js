$(document).on('turbolinks:load', function() {
  var search_list = $("#user-search-result");
  var group_users_list = $("#chat-group-users");

  function appendSearchResult(user) {
    var html = `<div class="chat-group-user clearfix", id="chat-group-user">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    search_list.append(html);
  }

  function appendGroupUser(id, name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    group_users_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    console.log(input);
      $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      users.forEach(function(user){
        appendSearchResult(user);
      });
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $("#user-search-result").on("click",".user-search-add", function() {
    var id = $(this).data("userId");
    var name = $(this).data("userName");
    $(this).parent().remove();
    appendGroupUser(id, name)
  })

  $("#chat-group-users").on("click",".user-search-remove", function() {
    $(this).parent().remove();
  })
});
