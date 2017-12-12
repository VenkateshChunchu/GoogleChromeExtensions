//Om vigneshwaraye namaha,sri matre 
//$(document).ready(function(){
//    alert("Script is running" + $('.grid expanded tr').length);
//    $("#ctl00_ctl00_ContentPlaceHolderBase_ContentPlaceHolderRight_CndTop_RNCandidateDetail_RightNowHelpContainer").append('<img src="img/myimg.png" onclick="">');
//    for (var i = 1; i < $('.grid expanded tr').length; i++) {
//        alert("in for loop");
//        if (i < 10)
//            var id = "#ctl-1_ctl00_ContentPlaceHolderBase_ContentPlaceHolderRight_ctl00_ctl00_ctl0" + i + "_NameLocation";
//        else
//            var id = "#ctl-1_ctl00_ContentPlaceHolderBase_ContentPlaceHolderRight_ctl00_ctl00_ctl" + i + "_NameLocation";

//        $(id).next().next().append('<img src="img/myimg.png" onclick="">');
//    }
//});
//
//setTimeout(postDataToAPI, 5000);

if (window.location.href.indexOf("https://hiring.monster") == 0) {
    $(document).ready(function () {
        //appending the GetProfileDetails button to the Page
        if ($("#btnGetProfileDetails").length == 0) {
            $("#ctl00_ctl00_ContentPlaceHolderBase_ContentPlaceHolderRight_CndTop_RNCandidateDetail_RightNowHelpContainer").append('<button id="btnGetProfileDetails" class="redux-button btn-secondary-large" title="Get The Profile Info" type="button" ><span class="button-left"><span class="button-right"><span class="button-text">Get The Profile Info</span></span></span></button>');
        }
        //on GetProfileDetails button click
        $("#btnGetProfileDetails").click(function () {
            //Getting the Header section of the profile
            var basicDetails = $("#candidateData .headerColumn columnCandidateBrief").html +
                +$("#candidateData .headerColumn columnCandidateDetails").html;
            //basicDetails = JSON.stringify(basicDetails);

            if ($("#candidate-detail-tabs #divAnchorTab a").length > 2) {
                //For Resume Tab
                $("#candidate-detail-tabs #divAnchorTab a:eq(0)").click()
                //download_file();
                var downloadLocation = "https://hiring.monster.com" + $("a.at-actionDownloadWordLink:eq(1)").attr('href');
                //setTimeout(download_file(downloadLocation), 5000);

                //To switch throw tabs 
                //For Candidate Details
                $("#candidate-detail-tabs #divAnchorTab a:eq(1)").click()
                // For all candidate details
                var candidateDetailsTab = $(".TabInnerWindow Skills DNATabInnerWindow").html;
                // For Additional info
                $("#candidate-detail-tabs #divAnchorTab a:eq(2)").click()
                //Additional info like carreer summery
                var additionalInfoTab = $(".TabInnerWindow CareerSummary").html;
            }
            var profileDetails = basicDetails + candidateDetailsTab + additionalInfoTab;
            profileDetails = JSON.stringify(profileDetails);
            postDataToAPI("https://www.google.com", profileDetails);
        });
    })
}
else if (window.location.href.indexOf("https://dice") == 0) {
    //Dice blog code goes here 
}
else if (window.location.href.indexOf("https://localjobs@zen3") == 0) {
    //zen3
}
//for downloading the candidate resume.
function download_file(downloadLocation) {
    window.location = downloadLocation;
}
function postDataToAPI(url, profileDetails) {
    $.ajax({
        type: 'POST',
        data: profileDetails,
        url: url,
        dataType: 'application/json',
        cache: true
    }).done(function (data) {
        console.log(data)
        alert("Success in Posting the Candidate Details: ");
        setTimeout($('#btnGetProfileDetails').css('display', 'None'),5000);
        appendFileUpload();
    }).fail(function (data) {
        console.log("failed :: " + data.status);
        alert("Failed in Posting the Candidate Details: ");
        setTimeout($('#btnGetProfileDetails').css('display', 'None'),5000);
        appendFileUpload();//this should be removed
    });
}
function appendFileUpload() {
    if ($("#myfileUpload").length == 0 && $("#btnSubmitFile").length == 0) {
        $("#ctl00_ctl00_ContentPlaceHolderBase_ContentPlaceHolderRight_CndTop_RNCandidateDetail_RightNowHelpContainer").
            append('<input type="file" id="myfileUpload" accept="application/msword"/>').//class="redux-button btn-secondary-large"
            append('<button id="btnSubmitFile" class="redux-button btn-secondary-large" title="PostFile" type="button" onclick="postFileToAPI(formdata)" ><span class="button-left"><span class="button-right"><span class="button-text">PostFile</span></span></span></button>');//style="dislay:none;"

        $('#myfileUpload').change(function uploadFile() {
            //on change event  
            alert("we are file upolad change");
            formdata = new FormData();
            if ($(this).prop('files').length > 0) {
                file = $(this).prop('files')[0];
                formdata.append("word", file);
            }
            return formdata;
        });
        $('#btnSubmitFile').click(
            function () {
                alert("we are not in function");
                $.ajax({
                    url: "https://www.google.com",//Api url should go here
                    type: "POST",
                    data: formdata,
                    processData: false,
                    contentType: "application/word",//false,
                }).done(function (data) {
                    console.log(data.status)
                    alert("Success in Posting the file");
                    $('#btnSubmitFile').css('display', 'None');
                    $('#myfileUpload').css('display', 'None');
                    $('#btnGetProfileDetails').css('display', 'inline-block');
                }).fail(function (data) {
                    console.log("failed :: " + data.status);
                    alert("Faild in Posting the file" + data.status);
                    $('#btnSubmitFile').css('display', 'None');
                    $('#myfileUpload').css('display', 'None');
                    $('#btnGetProfileDetails').css('display', 'inline-block');
                });
            }
            );
    }
    else { };
}
function postFileToAPI(formdata) {
    alert("we are in function");
    $.ajax({
        url: "https://www.google.com",//Api url should go here
        type: "POST",
        data: formdata,
        processData: false,
        contentType: false,
    }).done(function (data) {
        console.log(data)
        alert("Success in Posting the file");
        $('#btnSubmitFile').css('display', 'None');//$('#navigation ul li').css({'display' : 'inline-block'});
        $('#myfileUpload').css('display', 'None');
    }).fail(function (data) {
        console.log("failed :: " + data.status);
        alert("Faild in Posting the file" + data.status);
    });
};
//////sending file to API other way
//function myfunction() {

//var form = new FormData();

//// The content of the file
//var fileBody = '<p>hey!<p>';

//// JS file-like object
//var blob = new Blob([fileBody], { type: 'text/xml'});

//// Add the file to the form
//form.append('file', blob);

//// Add the destination folder for the upload to the form
//form.append('parent_id', '0');

//var uploadUrl = 'https://upload.box.com/api/2.0/files/content';

//// The Box OAuth 2 Header. Add your access token.
//var headers = {
//    Authorization: 'Bearer YOUR_ACCESS_TOKEN'
//};

//$.ajax({
//    url: uploadUrl,
//    //headers: headers,
//    type: 'POST',
//    // This prevents JQuery from trying to append the form as a querystring
//    processData: false,
//    contentType: false,
//    data: form
//}).complete(function ( data ) {
//    // Log the JSON response to prove this worked
//    console.log(data.responseText);
//});
//}