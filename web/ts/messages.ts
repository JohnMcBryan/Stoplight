const backendUrl = "https://stacklight.herokuapp.com";
var $: any;
var helper: HelperTask;
var projectID: any;
var newMessage: NewMessageForm;
var messageInfo: MessageInfo;
var owner: any;
class MessageInfo {
    refresh() {
        $.ajax({
            type: "GET",
            url: backendUrl + "/messages/"+ projectID,
            dataType: "json",
            success: messageInfo.update
        });
    }
    public update(data: any) {
        $("#messageList").html("<table>");
        for (let i = 0; i < data.mMessageData.length; ++i) {
            $("#messageList").append("<tr><td> <b> " +data.mMessageData[i].mOwner+" :</b></td><td>"+data.mMessageData[i].mContent+" </td></tr>");
        }
        $("#messageList").append("</table>");
        console.log(data);
    }
}

class NewMessageForm {
    constructor() {
        $("#addMessage").click(this.submitForm);
    }
    submitForm() {
        let content = "" + $("#message").val();

        if (content === "" ) {
        return;
        }

        $.ajax({
            type: "POST",
            url: backendUrl + "/messages",
            dataType: "json",
            data: JSON.stringify({ mProjectId: projectID, mContent: content,
            mOwner: owner}),
            success: messageInfo.refresh,
            error: messageInfo.refresh
        });
        $("#message").val("");


    }

}

class HelperTask{
    public getUrlParameter(sParam: String) {
        console.log("sParam: " + sParam);
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
        console.log("sPageURL: " + sPageURL);
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            console.log("sParameterName: " + sParameterName);

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }

}


$(document).ready(function () {
    console.log("Loading Task Page.......");

    messageInfo = new MessageInfo();
    newMessage= new NewMessageForm();
    helper = new HelperTask();
    projectID = helper.getUrlParameter('projectID');
    $('.login').text(localStorage.getItem("email"));
    owner = localStorage.getItem("email");

    console.log("Owner: "+owner);
    messageInfo.refresh();
});