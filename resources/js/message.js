const selectedContact = $('meta[name="selected_contact"]')
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
        },
        success : function(){},
        error: function(xhr, status, error){},
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