$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="chat-main__message-list__message-box">
         <div chat-main__message-list__message-box__create-info">
           <div class="chat-main__message-list__message-box__create-info__user-name">
             ${message.user_name}
           </div>
           <div class="chat-main__message-list__message-box__create-info__create-date">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__message-list__message-box__message">
           <p class="chat-main__message-list__message-box__message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="chat-main__message-list__message-box">
         <div class="chat-main__message-list__message-box__create-info">
           <div class="chat-main__message-list__message-box__create-info__user-name">
             ${message.user_name}
           </div>
           <div class="chat-main__message-list__message-box__create-info__create-date">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__message-list__message-box__message">
           <p class="chat-main__message-list__message-box__message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
 $('#new_message').on('submit', function(e){
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
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.chat-main__message-form__new-message')[0].reset();
      $('.chat-main__message-form__new-message__submit').prop( 'disabled', false );
    })
    .fail(function(){
      alert('error');
    });
  });
});