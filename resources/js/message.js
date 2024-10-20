const selectedContact = $('meta[name="selected_contact"]')
const authId = $('meta[name="auth_id"]').attr('content')
const baseUrl = $('meta[name="base_url"]').attr('content')
const inbox = $('.messages ul')

function toggleLoader(){
    $('.loader').toggleClass('d-none')
}
function messageTemplate(text, className){
    return `
    <li class="${className}">
    <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
    <p>${text} </p>
    </li>
`
}

function fetchMessage(){
    let contactId = selectedContact.attr('content')

    $.ajax({
        method : 'GET',
        url : baseUrl+'/fetch-messages',
        data : {
            contact_id : contactId
        },
        beforeSend : function(){
            toggleLoader()
        },
        success : function(data){
            setContactInfo(data.contact)

            //apend message
            inbox.empty()
            data.messages.forEach(value => {
                if(value.from_id == contactId){
                    inbox.append(messageTemplate(value.message, 'sent'))
                }else{
                    inbox.append(messageTemplate(value.message, 'replies'))
                }
            })

            scrollToBottom()
        },
        error: function(xhr, status, error){},
        complete : function(){
            toggleLoader()
        }
    })
}

function setContactInfo(contact){
    $('.contact-name').text(contact.name)
}

function sendMessage(){
    let messageBox = $('.message-box')
    let contactId = selectedContact.attr('content')
    let formData = $('.message-form').serialize()

    $.ajax({
        method :'POST',
        url : baseUrl +'/send-message',
        data :  formData + '&contact_id='+contactId,
        beforeSend : function(){
            let message = messageBox.val()
            inbox.append(messageTemplate(message, 'replies'))
            messageBox.val('')
            scrollToBottom()
        },
        success : function(){},
        error: function(xhr, status, error){},
    })
}

function scrollToBottom(){
    $('.messages').stop().animate({
        scrollTop: $('.messages')[0].scrollHeight
    })
}

$(document).ready(function(){
    //set contact id on meta
    $('.contact').on('click', function(){
        let contactId = $(this).data('id')
        selectedContact.attr('content', contactId)
        // console.log(selectedContact.attr('content'))

        //hide the blank wrapper
        $('.blank-wrap').addClass('d-none')

        //fetch messages
        fetchMessage()

    })

    $('.message-form').on('submit', function(e){
        e.preventDefault()
        sendMessage()
    })

})

//listen to live event
window.Echo.private('message.' + authId)
    .listen('SendMessageEvent', (e)=> {
    // console.log(e)
    if(e.from_id == selectedContact.attr('content')){
        inbox.append(messageTemplate(e.text,'sent'))
        scrollToBottom()
    }
})

window.Echo.join('online')
    .here(users => {
        // console.log(users)
        users.forEach(user => {
            let element = $(`.contact[data-id="${user.id}"]`)
            if(element.length >0){
                element.find('.contact-status').removeClass('offline')
                element.find('.contact-status').addClass('online')
            }else{
                element.find('.contact-status').removeClass('online')
                element.find('.contact-status').addClass('offline')
            }
        })
    })
    .joining(user => {
        // console.log('joining ', user)
        let element = $(`.contact[data-id="${user.id}"]`)
        element.find('.contact-status').removeClass('offline')
        element.find('.contact-status').addClass('online')
    })
    .leaving(user => {
        // console.log('leaving ', user)
        let element = $(`.contact[data-id="${user.id}"]`)
        element.find('.contact-status').removeClass('online')
        element.find('.contact-status').addClass('offline')
    })

