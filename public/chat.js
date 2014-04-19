$(function() {
 
    var messages = [];
    var socket = io.connect('http://localhost:3700');
 
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
           $("#content").html("");
            for (var i = 0; i < messages.length; i++) {
                var message = $("<div>");
                // default username is Server
                var name = $("<b>").text((messages[i].username ? messages[i].username : 'Server') + ': ');
                message.append(name);
                // escapes dangerous html strings
                var text = $("<div>").text(messages[i].message).html();
                // append to the proper container
                message.append(text);
                $("#content").append(message);
            }
            // makes it auto scroll
            $("#content").scrollTop($("#content")[0].scrollHeight);
        } else {
            console.log("There is a problem:", data);
        }
    });
    $("#field").keypress(function(e) {
        if (e.keyCode == 13)
            $("#send").click();
    });

    $("#send").click(function() {
        if($("#name").val() == "") {
            alert("Please type your name!");
        } else {
            var text = $("#field").val();
            socket.emit('send', { message: text, username: $("#name").val() });
            $("#field").val("");
        }
    });
 
});