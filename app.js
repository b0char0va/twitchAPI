var channels= ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
$(document).ready(function () {
    for(let i=0; i<channels.length; i++){
        $.getJSON(" https://wind-bow.glitch.me/twitch-api/streams/"+channels[i]+"?callback=?", function (streamResult) {
            $.getJSON(" https://wind-bow.glitch.me/twitch-api/channels/"+channels[i]+"?callback=?", function (channelResult) {
                var newDiv = document.createElement('div');
                var divLogo= document.createElement('div');
                var divTitle = document.createElement('div');
                var logo = document.createElement('img');
                logo.setAttribute("src", channelResult.logo);
                var heading = document.createElement('span');
                var anchor = document.createElement('a');
                anchor.setAttribute("href", "https://www.twitch.tv/"+channelResult.display_name);
                anchor.setAttribute("target", "blank");
                var text = document.createTextNode(channelResult.display_name);

                $(logo).addClass("rounded-circle size border border-light");
                $(newDiv).addClass("row mt-2 p-1 bg-secondary text-light");
                $(divLogo).addClass("col-sm-2");
                $(divTitle).addClass("col-sm-5 text");
                $(heading).append(text);
                $(anchor).append(heading);
                $(divTitle).append(anchor);
                $(divLogo).append(logo);
                $(newDiv).append(divLogo);
                $(newDiv).append(divTitle);

                var divStatus = document.createElement('div');
                var status = document.createElement('span');
                if(streamResult.stream === null) {
                    var statusText = document.createTextNode("offline");
                    $(newDiv).addClass("bg-danger");
                    $('#offlineOutput').append(newDiv);
                } else{
                    statusText = document.createTextNode(streamResult.stream.game + ": " + streamResult.stream.channel.status);
                    $(newDiv).addClass("bg-success");
                    $('#onlineOutput').append(newDiv);
                }
                $(divStatus).addClass("col-sm-5 statusText");
                $(status).append(statusText);
                $(divStatus).append(status);
                $(newDiv).append(divStatus);
            });
        });
        $('#btnOffline').click(function () {
            getOffline();
        });
        $('#btnOnline').click(function () {
            getOnline();
        });
        $('#btnAll').click(function () {
            getAll();
        });
    }
});
function getAll(){
    $('#onlineOutput').removeClass('hide');
    $('#offlineOutput').removeClass('hide');
}
function getOffline(){
 $('#onlineOutput').addClass('hide');
 $('#offlineOutput').removeClass('hide');
}
function getOnline(){
    $('#onlineOutput').removeClass('hide');
    $('#offlineOutput').addClass('hide');
}