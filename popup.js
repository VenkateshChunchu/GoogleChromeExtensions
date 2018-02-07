//Global API URL.
var apiUrl = "https://192.168.1.68:443/"
var apiProfileUrl = apiUrl + "api/profile"
var printUrl = "https://hiring.monster.com/jcm/candidates/printresume.aspx?type=power&resumes=";

//Check for Monster url location
if (window.location.href.toLowerCase().indexOf("https://hiring.monster") === 0) {

    //if (window.location.pathname.toLowerCase().indexOf("/searchresults.aspx") != -1) {

    //    email = $("#ctl00_ctl00_ContentPlaceHolderBase_ContentPlaceHolderRight_lld_Detail_controlDetailTop_linkEmail").text();
    //    CheckInDB(email);
    //}
    //Check for EnhancedSearchResult.aspx page
    if (window.location.pathname.toLowerCase().indexOf("searchresults.aspx") != -1) {

        //After EnhancedSearchResult.aspx page is loaded perform below.
        $(function () {
            // To show List of DB Profiles
            if ($("#btnShowProfiles").length === 0) {
                //{//if (document.getElementById("RNCandidateIndexWrapper") != null)
                var appendElementTo = (window.location.pathname.toLowerCase().indexOf("enhancedsearch") != -1) ? $("#RNCandidateIndexWrapper") : $("#AnswerContent");

                appendElementTo.append('<button id="btnShowProfiles" style="font-size:10pt;color:white;background-color:#00aeef;border:2px solid #00aeef;padding:3px; border-radius: 5px;cursor: pointer;" title="Get The Profile" type="button" ><span class="button-left"><span class="button-right"><span class="button-text">Show Saved Profiles</span></span></span></button>');

                $("#btnShowProfiles").on("click", function () {
                    if (window.location.pathname.toString().toLowerCase().split('/')[3] == "searchresults.aspx" && window.location.href.toLowerCase().indexOf('detail') > 1) {
                        email = $("#ctl00_ctl00_ContentPlaceHolderBase_ContentPlaceHolderRight_lld_Detail_controlDetailTop_linkEmail").text();
                        CheckInDB(email);
                    }
                    else
                        window.open(apiUrl + "Dashboard.aspx", "_blank", "toolbar=yes,top=1500,left=1500,width=1500,height=800");
                });
            }
            //Defining ID of the element.
            var id = "#ctl00_ctl00_ContentPlaceHolderBase_ContentPlaceHolderRight_gridContainer";
            setTimeout(PopulateProfilesNotSavedandSavedButtons(id), 500);
        });
    }

    if (window.location.pathname.toLowerCase().indexOf("resumeview.aspx") != -1) {
        email = $("div #candidateData .detail-holder div:eq(3)").text().trim();
        CheckInDB(email);
    }

}

else if (window.location.pathname.indexOf("https://dice") === 0) {
    //Dice portal code goes here 
}

else if (window.location.href.indexOf("https://careerbuilder") === 0) {
    //carrerbuilder code goes here
}

function PopulateProfilesNotSavedandSavedButtons(id) {
    //Constructing Candidate name array
    if ($(id + ' tr').length > 0) {

        var candidateNamesList = [],
            profilesCount = $(id + ' tr').length,

            start = (window.location.pathname.toLowerCase().indexOf("enhancedsearch") != -1) ? 0 : 2;

        for (var i = start; i < profilesCount; i++) {
            var name = (start == 0) ? $(id + ' tr:eq(' + i + ') td:eq(1) .Name').text().trim() : $(id + ' tr:eq(' + i + ') td:eq(1) span:eq(0)').text().trim(),
            name = name.replace(/[\u2014]/g, "@@"),
            name = name.split("@@")[0].trim(),
            name = name.replace(/[^a-zA-Z ]/g, " ");
            candidateNamesList.push(name);
        }

        //Service call to get the matched profiles.
        var xhr = $.ajax({
            type: "GET",
            url: apiProfileUrl + "?profileNames=" + candidateNamesList,

            success: function (data) {
                if (window.location.pathname.toLowerCase().indexOf("enhancedsearch") != -1) {
                    if (data == "No Profile Saved in DB") {
                        for (var i = 0; i < $(id + ' tr').length; i++) {
                            $(id + ' tr:eq(' + i + ') td:eq(3)').append('<button id="xyz' + i + '" style="font-size:9pt;color:red;background-color:white;border:2px solid #00aeef;padding:2px;" title="Profie not in DB" type="button" ><span class="button-left"><span class="button-right"><span class="button-text"> Not Saved Yet </span></span></span></button>');
                            gotoExportToServerPage(i, id);
                        }
                    }
                    else {
                        for (var i = 0; i < $(id + ' tr').length; i++) {
                            var status;
                            if (data[i].Status == "Exact Match") {
                                var timeDiff = date_diff_indays(data[i].CreatedTime, new Date());

                                if (timeDiff == 0)
                                    status = "Saved (Today)";
                                else
                                    status = "Saved (" + timeDiff + " Days ago)";

                                $(id + ' tr:eq(' + i + ') td:eq(3)').append('<button id="xyz' + i + '" style="font-size:9pt;color:white;background-color:#00aeef;border:2px solid #00aeef;padding:2px;border-radius:2px;cursor:pointer;:hover {background-color: #3e8e41}" title="Profile lies in DB" type="button" ><span class="button-left"><span class="button-right"><span class="button-text">' + status + '</span></span></span></button>');
                                AppendClickEventToButton(i, data[i].Email);
                            }
                            else if (data[i].Status == "No Match") {
                                $(id + ' tr:eq(' + i + ') td:eq(3)').append('<button id="xyz' + i + '" style="font-size:9pt;color:red;background-color:white;border:2px solid #00aeef;padding:2px;border-radius:2px;cursor:pointer;:hover {background: yellow}" title="Profile not in DB" type="button" ><span class="button-left"><span class="button-right"><span class="button-text"> Not Saved Yet </span></span></span></button>');
                                gotoExportToServerPage(i, id);

                            }
                        }
                    }
                }
                else {
                    if (data == "No Profile Saved in DB") {
                        for (var i = 2; i < $(id + ' tr').length; i++) {
                            var j = i - 2;
                            $(id + ' tr:eq(' + i + ') td:eq(2) ul').append('<button id="xyz' + j + '" style="font-size:9pt;color:red;background-color:white;border:2px solid #00aeef;padding:2px;" title="Profie not in DB" type="button" ><span class="button-left"><span class="button-right"><span class="button-text"> Not Saved Yet </span></span></span></button>');
                            gotoExportToServerPage(j, id);
                        }
                    }
                    else {
                        for (var i = 2; i < $(id + ' tr').length; i++) {
                            var j = i - 2;
                            var status;
                            if (data[j].Status == "Exact Match") {
                                var timeDiff = date_diff_indays(data[j].CreatedTime, new Date());

                                if (timeDiff == 0)
                                    status = "Saved (Today)";
                                else
                                    status = "Saved (" + timeDiff + " Days ago)";

                                $(id + ' tr:eq(' + i + ') td:eq(2) ul').append('<button id="xyz' + j + '" style="font-size:9pt;color:white;background-color:#00aeef;border:2px solid #00aeef;padding:2px;border-radius:2px;cursor:pointer;:hover {background-color: #3e8e41}" title="Profile lies in DB" type="button" ><span class="button-left"><span class="button-right"><span class="button-text">' + status + '</span></span></span></button>');
                                AppendClickEventToButton(j, data[j].Email);
                            }
                            else if (data[j].Status == "No Match") {
                                $(id + ' tr:eq(' + i + ') td:eq(2) ul').append('<button id="xyz' + j + '" style="font-size:9pt;color:red;background-color:white;border:2px solid #00aeef;padding:2px;border-radius:2px;cursor:pointer;:hover {background: yellow}" title="Profile not in DB" type="button" ><span class="button-left"><span class="button-right"><span class="button-text"> Not Saved Yet </span></span></span></button>');
                                gotoExportToServerPage(j, id);

                            }
                        }
                    }
                }
            },
            error: function (err) {
                console.log(err.responseText);
            },
            failure: function (fail) {
                console.log(fail.status + "state: " + fail.readyState)
            }
        });
    }
    else {
        setTimeout(PopulateProfilesNotSavedandSavedButtons(id), 500);
    }
}
//Function to append click event to button to open candidate detail.aspx page.
function AppendClickEventToButton(i, email) {
    $("#xyz" + i).on("click", function () {
        window.open(apiUrl + "CandidateDetails.aspx?" + email, "_blank", "toolbar=yes,top=1500,left=1500,width=1200,height=1200");
    })
}
//$(id + ' tr:eq(' + 2 + ') td:eq(1) span:eq(0)').click()
//Function to Navigate to the Monster profile page.
function gotoExportToServerPage(i, id) {
    $("#xyz" + i).on("click", function () {
        if (window.location.pathname.toLowerCase().indexOf("enhancedsearchresults.aspx") != -1) {
            console.log("cursor in not saved yet click in enhansed search page");
            if ($(id + ' tr:eq(' + i + ') label span')[1]) {
                $(id + ' tr:eq(' + i + ') label span')[1].click();
            }
        }
        else {
            i = i + 2;
            if ($(id + ' tr:eq(' + i + ') td:eq(1) span:eq(0)')) {
                $(id + ' tr:eq(' + i + ') td:eq(1) span:eq(0)').click();
            }
            else if ($(id + ' tr:eq(' + i + ') td:eq(2) .actionView span')) {
                $(id + ' tr:eq(' + i + ') td:eq(2) .actionView span').click();
            }
        }
    });
}
//Function to Get the Monster profile page Link for respective user.
function getTheExportToServerPageLink(i, id) {
    if (window.location.pathname.toLowerCase().indexOf("enhancedsearch.aspx") != -1) {
        if ($(id + ' tr:eq(' + i + ') label span')[1])
            return $(id + ' tr:eq(' + i + ') label span')[1].href;
    }
    else if (window.location.pathname.toLowerCase().indexOf("searchresults.aspx") != -1) {
        if ($(id + ' tr:eq(' + i + ') label span')[0])
            $(id + ' tr:eq(' + i + ') label span')[0].href;
    }
}

//API call to check profiles in DB, class="redux-button btn-secondary-large"
function CheckInDB(email) {
    showText = "";
    if ("" != email)
        $.ajax({
            type: "GET",
            url: apiProfileUrl + "?email=" + email,
            success: function (data) {
                //removing the Show Profiles button on the Candidate View Page
                if (window.location.pathname.toString().toLowerCase().split('/')[3] == "searchresults.aspx" && window.location.href.toLowerCase().indexOf('detail') > 1) {
                    if ($("#btnShowProfiles"))
                        $("#btnShowProfiles").remove();
                }
                if (!data || data == "No Profile Saved in DB") {

                    if ($("#btnGetProfileDetails").length === 0) {
                        var appendElementTo = (window.location.pathname.toLowerCase().indexOf("resumeview.aspx") != -1) ? $("#RNCandidateDetailWrapper") : $("#AnswerContent");//RNCandidateIndexWrapper
                        appendElementTo.append('<button id="btnGetProfileDetails" style="font-size:10pt;color:white;background-color:#00aeef;border:2px solid #00aeef;padding:3px;border-radius:5px;cursor:pointer;" title="Get The Profile" type="button" ><span class="button-left"><span class="button-right"><span class="button-text">Export to Server</span></span></span></button>');

                        if ($("#RNCandidateDetailWrapper").html() == appendElementTo.html())
                            BindClickEventToExportToServerButton();
                        else
                            BindClickEventToExportToServerButtonClassicSearch();
                    }
                }
                else {
                    if ($("#btnGetProfileDetails").length === 0) {
                        var appendElementTo = (window.location.pathname.toLowerCase().indexOf("resumeview.aspx") != -1) ? $("#RNCandidateDetailWrapper") : $("#AnswerContent");//RNCandidateIndexWrapper
                        var timeDiff = date_diff_indays(data, new Date());

                        if (timeDiff == 0) {
                            timeDiff = diff_hours(data, new Date());
                            showText = "Saved ( Today )";
                        }
                        else
                            showText = "Saved ( " + timeDiff + " Days ago)";
                        appendElementTo.append('<button id="btnGetProfileDetails" style="font-size:9pt;color:white;background-color:#00aeef;border:2px solid #00aeef;padding:2px;border-radius:5px;cursor:pointer;" title="Get The Profile" type="button" ><span class="button-left"><span class="button-right"><span class="button-text">' + showText + '</span></span></span></button>');

                        if ($("#RNCandidateDetailWrapper").html() == appendElementTo.html())
                            BindClickEventToExportToServerButton();
                        else
                            BindClickEventToExportToServerButtonClassicSearch();
                    }
                }
            },
            error: function (err) {
                console.log(err.status);
                //window.location=window.location.href.toLowerCase().split('s=')[0]+'detail'
            }
        });
    else
        console.log("Email is empty");
}
//Bind click Event to ExportToServer button
function BindClickEventToExportToServerButton() {
    //on GetProfileDetails button click
    $("#btnGetProfileDetails").click(function () {
        if ($("#candidate-detail-tabs #divAnchorTab a").length > 2) {
            if ($("#candidate-detail-tabs #divAnchorTab a:eq(0)")) {
                $("#candidate-detail-tabs #divAnchorTab a:eq(0)")[0].click()
                var downloadLocation = "";
                if ($("a.at-actionDownloadWordLink:eq(1)").attr('href') ? true : false)
                    downloadLocation = "https://hiring.monster.com" + $("a.at-actionDownloadWordLink:eq(1)").attr('href');
                //var dl = $("a.at-actionDownloadWordLink:eq(1)").attr('href');
                setTimeout(download_file(downloadLocation), 5000);
                loadDocPostDataToAPI(apiProfileUrl, GetMonsterProfileDetailsPowerSearch(), downloadLocation);
            }
        }
    });
}

function BindClickEventToExportToServerButtonClassicSearch() {
    //on GetProfileDetails button click
    $("#btnGetProfileDetails").click(function () {
        if ($("#CandidateInfoTabs #divAnchorTab a").length > 2) {
            if ($("#CandidateInfoTabs #divAnchorTab a:eq(0)")) {
                $("#CandidateInfoTabs #divAnchorTab a:eq(0)").click()
                var downloadLocation = "";
                if ($("a.at-actionDownloadWordLink:eq(1)").attr('href') ? true : false)
                    downloadLocation = "https://hiring.monster.com" + $("a.at-actionDownloadWordLink:eq(1)").attr('href');
                //var dl = $("a.at-actionDownloadWordLink:eq(1)").attr('href');
                setTimeout(download_file(downloadLocation), 5000);
                loadDocPostDataToAPI(apiProfileUrl, GetMonsterProfileDetailsClassicSearch(), downloadLocation);
            }
        }
    });
}

//for downloading the candidate resume.
function download_file(downloadLocation) {
    if (downloadLocation != "")
        window.location = downloadLocation;
}

//Getting all the Profile Details from the Monster Portal on PowerSearch
function GetMonsterProfileDetailsPowerSearch() {

    //switching to Resume tab
    if ($("#candidate-detail-tabs #divAnchorTab a:eq(0)")) {
        $("#candidate-detail-tabs #divAnchorTab a:eq(0)")[0].click();

        ProfileLink = printUrl + $("div .TabContent .resumeId span:eq(1)").text().trim(),
        //Candidate Resume Page
        MatchPercent = $("div #candidateData .CS-score").text().trim() + " match",
        CandidateName = $("div #candidateData .candidateName").text().trim(),
        CurrentJobTitle = $("div #candidateData #currentJobTitle").text().trim(),
        CurrentCompany = $("div #candidateData #currentCompany").text().trim(),
        CandidateLocation = $("div #candidateData .detail-holder div:eq(0)").text().trim(),
        HomeAddress = $("div #candidateData .detail-holder div:eq(1) span").text().trim(),
        MobileNumber = $("div #candidateData .detail-holder div:eq(2) span").text().trim(),
        Email = $("div #candidateData .detail-holder div:eq(3)").text().trim(),
        ResumeUpdated = $("div #candidateData .candidateDetailList li:eq(0) span:eq(2)").text().trim(),
        Experience = $("div #candidateData .candidateDetailList li:eq(1) span:eq(2)").text().trim(),
        //Experience = Experience.replace(/[a-zA-Z ]/g, " ");
        Authorization = $("div #candidateData .candidateDetailList li:eq(2) span:eq(2)").text().trim(),
        DesiredSalary = $("div #candidateData .candidateDetailList li:eq(3) span:eq(2)").text().trim(),
        Relocation = $("div #candidateData .candidateDetailList li:eq(4) span:eq(2)").text().trim(),
        ProfileSavedOn = new Date().toDateString();
        ResumePath = "https://hiring.monster.com" + $("a.at-actionDownloadWordLink:eq(1)").attr('href');

        var MainDetails = {
            "ProfileLink": ProfileLink, "MatchPercent": MatchPercent,
            "CandidateName": CandidateName, "CurrentJobTitle": CurrentJobTitle, "CurrentCompany": CurrentCompany,
            "CandidateLocation": CandidateLocation, "HomeAddress": HomeAddress, "MobileNumber": MobileNumber, "Email": Email, "ResumeUpdated": ResumeUpdated,
            "Experience": Experience, "Authorization": Authorization, "DesiredSalary": DesiredSalary, "Relocation": Relocation, "ProfileSavedOn": ProfileSavedOn, "ResumePath": ResumePath
        };

        //Resume Tab
        var ResumeSubmittedOn = $("div #candidate-detail-tabs #topHeader div:eq(2) span:eq(1)").text().trim();
    }

    //Switching to Candidate Details Tab
    if ($("#candidate-detail-tabs #divAnchorTab a:eq(1)")) {
        $("#candidate-detail-tabs #divAnchorTab a:eq(1)")[0].click();

        var experienceRecords = $("div #candidate-detail-tabs #gridCareerHistoryJob tr").length,
           WorkHistory = '{"WorkHistory":[]}',
           WorkHistoryList = JSON.parse(WorkHistory);

        for (var i = 0; i < experienceRecords; i++) {
            var DurationOfJob = $("div #candidate-detail-tabs #gridCareerHistoryJob tr:eq(" + i + ") td:eq(0)").text().trim(),
            JobDescription = $("div #candidate-detail-tabs #gridCareerHistoryJob tr:eq(" + i + ") td:eq(1)").text().trim(),
            JobTitle = $("div #candidate-detail-tabs #gridCareerHistoryJob tr:eq(" + i + ") td:eq(2)").text().trim(),
            EmployerName = $("div #candidate-detail-tabs #gridCareerHistoryJob tr:eq(" + i + ") td:eq(4)").text().trim();
            WorkHistoryList['WorkHistory'].push({ "DurationOfJob": DurationOfJob, "JobDescription": JobDescription, "JobTitle": JobTitle, "EmployerName": EmployerName });
        }

        var educationRecords = $("div #candidate-detail-tabs #gridEducation tr").length,
            Eduction = '{"Education":[]}',
            EductionList = JSON.parse(Eduction);
        //to get all education details looping throw all tr elements
        for (var j = 0; j < educationRecords; j++) {
            var Year = $("div #candidate-detail-tabs #gridEducation tr:eq(" + j + ") td:eq(0)").text().trim(),
            Qualification = $("div #candidate-detail-tabs #gridEducation tr:eq(" + j + ") td:eq(3)").text().trim(),
            CollegeName = $("div #candidate-detail-tabs #gridEducation tr:eq(" + j + ") td:eq(5)").text().trim();
            EductionList['Education'].push({ "Year": Year, "Qualification": Qualification, "CollegeName": CollegeName });
        }

        //Skills
        var skillSetLength = $("div #candidate-detail-tabs #skillsGroupContainer tr").length,
            Skills = '{"Skills":[]}',
            SkillsList = JSON.parse(Skills);
        //to get all skillsets details looping throw all tr elements
        for (var i = 0; i < skillSetLength; i++) {
            if ($("div #candidate-detail-tabs #skillsGroupContainer tr:eq(" + i + ") td:eq(1)").text().trim() != "") {
                var SkillName = $("div #candidate-detail-tabs #skillsGroupContainer tr:eq(" + i + ") td:eq(1)").text().trim(),
                LastUsed = $("div #candidate-detail-tabs #skillsGroupContainer tr:eq(" + i + ") td:eq(3)").text().trim(),
                ExperienceInSkill = $("div #candidate-detail-tabs #skillsGroupContainer tr:eq(" + i + ") td:eq(4)").text().trim();
                SkillsList['Skills'].push({ "SkillName": SkillName, "LastUsed": LastUsed, "ExperienceInSkill": ExperienceInSkill });
            }
        }
    }

    //Additional Info Tab Career Information
    if ($("#candidate-detail-tabs #divAnchorTab a:eq(2)")) {

        $("#candidate-detail-tabs #divAnchorTab a:eq(2)")[0].click();

        var MostRecentEmployer = $("div #divCareerDataBody .careerDataBody div:eq(0) span").text().trim(),
            RelevantWorkExperience = $("div #divCareerDataBody .careerDataBody div:eq(4) span").text().trim(),
            HighestQualification = $("div #divCareerDataBody .careerDataBody div:eq(8) span").text().trim(),
            CareerLevel = $("div #divCareerDataBody .careerDataBody div:eq(12) span").text().trim(),
            Availability = $("div #divCareerDataBody .careerDataBody div:eq(16) div:eq(0) span").text().trim(),
            Location = $("div #divCareerDataBody .careerDataBody div:eq(16) div:eq(4) span").text().trim(),
            Relocate = $("div #divCareerDataBody .careerDataBody div:eq(16) div:eq(8) span").text().trim(),
            Travel = $("div #divCareerDataBody .careerDataBody div:eq(16) div:eq(12) span").text().trim(),
            WillingToWorkWeekEnds = $("div #divCareerDataBody .careerDataBody div:eq(16) div:eq(16) span").text().trim(),
            MilitaryService = $("div #divCareerDataBody .careerDataBody .innerTable:eq(1) div:eq(0) span").text().trim(),
            Citizenship = $("div #divCareerDataBody .careerDataBody .innerTable:eq(1) div:eq(4) span").text().trim(),
            SecurityClearence = $("div #divCareerDataBody .careerDataBody .innerTable:eq(1) div:eq(8) span").text().trim(),
            VateranStatus = $("div #divCareerDataBody .careerDataBody .innerTable:eq(1) div:eq(12) span").text().trim(),
            WorkAutherization = $("div #divCareerDataBody .careerDataBody .innerTable:eq(1) div:eq(16) span").text().trim(),
            WillingToWorkShifts = $("div #divCareerDataBody .careerDataBody .innerTable:eq(1) div:eq(20) span").text().trim();

        var CareerInfo = {
            "MostRecentEmployer": MostRecentEmployer, "RelevantWorkExperience": RelevantWorkExperience, "HighestQualification": HighestQualification,
            "CareerLevel": CareerLevel, "Availability": Availability, "Location": Location, "Relocate": Relocate, "Travel": Travel,
            "WillingToWorkWeekEnds": WillingToWorkWeekEnds, "MilitaryService": MilitaryService, "Citizenship": Citizenship,
            "SecurityClearence": SecurityClearence, "VateranStatus": VateranStatus, "WorkAutherization": WorkAutherization, "WillingToWorkShifts": WillingToWorkShifts
        };


        var CompanySize = $("div #divCareerDataBody .careerDataBody:eq(1) .innerTable:eq(0) div:eq(0) span").text().trim(),
            DesiredStatus = $("div #divCareerDataBody .careerDataBody:eq(1) .innerTable:eq(0) div:eq(4) span").text().trim(),
            JobType = $("div #divCareerDataBody .careerDataBody:eq(1) .innerTable:eq(0) div:eq(8) span").text().trim(),
            Salary = $("div #divCareerDataBody .careerDataBody:eq(1) .innerTable:eq(0) div:eq(12) span").text().trim(),
            Locations = $("div #divCareerDataBody .careerDataBody:eq(1) .innerTable:eq(0) div:eq(16) span").text().trim(),

            JobTitles = $("div #divCareerDataBody .careerDataBody:eq(1) .innerTable:eq(1)  div:eq(0) span").text().trim(),
            Industry = $("div #divCareerDataBody .careerDataBody:eq(1) .innerTable:eq(1)  div:eq(4) span").text().trim(),
            Occupation = $("div #divCareerDataBody .careerDataBody:eq(1) .innerTable:eq(1)  div:eq(8) span").text().trim();
        if (MainDetails.DesiredSalary == "-" || MainDetails.DesiredSalary == "")
            MainDetails.DesiredSalary = Salary;
        var TargetJob = {
            "CompanySize": CompanySize, "DesiredStatus": DesiredStatus, "JobType": JobType, "Salary": Salary,
            "Locations": Locations, "JobTitles": JobTitles, "Industry": Industry, "Occupation": Occupation
        };

        //Certifications

        if ($("#tblCertifications tr").length > 0) {
            //Skills
            var certListLength = $("#tblCertifications tr").length,
                Certs = '{"Certs":[]}',
                CertList = JSON.parse(Certs);
            //to get all skillsets details looping throw all tr elements
            if (certListLength > 0) {
                for (var i = 0; i < certListLength; i++) {
                    var CertName = $("#tblCertifications tr:eq(" + i + ") td:eq(0)").text().trim(),
                        CertYear = $("#tblCertifications tr:eq(" + i + ") td:eq(1)").text().trim(),
                        CertBy = $("#tblCertifications tr:eq(" + i + ") td:eq(2)").text().trim(),
                        CertDescription = $("#tblCertifications tr:eq(" + i + ") td:eq(3)").text().trim();
                    CertList['Certs'].push({ "CertName": CertName, "CertYear": CertYear, "CertBy": CertBy, "CertDescription": CertDescription });
                }
            }
            else
                CertList['Certs'].push({ "CertName": '-', "CertYear": '-', "CertBy": '-', "CertDescription": '-' });
        }
    }

    ProfileDetails = {
        "ResumeSubmittedOn": ResumeSubmittedOn,
        "MainDetails": MainDetails, "WorkHistoryList": WorkHistoryList,
        "EductionList": EductionList, "SkillsList": SkillsList, "CareerInfo": CareerInfo, "TargetJob": TargetJob, "CertList": CertList
    };

    //switching to Resume tab
    if ($("#candidate-detail-tabs #divAnchorTab a:eq(0)")) {
        $("#candidate-detail-tabs #divAnchorTab a:eq(0)")[0].click();
    }
    return ProfileDetails;

    //Certifications

    //tblCertifications grab with this id

    //Honour And Rewards

    //Carreer Highlights

    //Intrest and Hobbies

    //Affiliations

    //ResumeSource

    //Language Proficiency
}

//Getting all the Profile Details from the Monster Portal On Classic Search
function GetMonsterProfileDetailsClassicSearch() {

    //switching to Resume tab
    if ($("#tabResume .HeaderTitle")) {
        $("#tabResume .HeaderTitle").click();

        ProfileLink = printUrl + $("div .TabContent .resumeId span:eq(1)").text().trim(),
        //Candidate Resume Page
        MatchPercent = '-',//$("div #candidateData .CS-score").text().trim() + " match",
        CandidateName = $("div #titlePrint .candidateName").text().trim(),
        CurrentJobTitle = $("div #candidateData div:eq(0) div:eq(0)").text().split(',')[0].trim(),
        CurrentCompany = $("div #candidateData div:eq(0) div:eq(0)").text().split(',')[1].trim(),
        CandidateLocation = $("div #candidateData div:eq(0) div:eq(1) span").text().trim(),
        HomeAddress = $("#ctl00_ctl00_ContentPlaceHolderBase_ContentPlaceHolderRight_lld_Detail_controlDetailTop_lbHome").text().trim(),

        MobileNumber = $("#ctl00_ctl00_ContentPlaceHolderBase_ContentPlaceHolderRight_lld_Detail_controlDetailTop_lbMobile").text().trim(),
        Email = $("#ctl00_ctl00_ContentPlaceHolderBase_ContentPlaceHolderRight_lld_Detail_controlDetailTop_linkEmail").text().trim(),

        ResumeUpdated = $("#ctl00_ctl00_ContentPlaceHolderBase_ContentPlaceHolderRight_lld_Detail_resumeDetailTabStrip_controlResumeTab_lblResumeUpdated").text().trim(),
        Experience = '-',//$("div #candidateData .candidateDetailList li:eq(1) span:eq(2)").text().trim(),
        //Experience = Experience.replace(/[a-zA-Z ]/g, " ");
        Authorization = '-',//$("div #candidateData .candidateDetailList li:eq(2) span:eq(2)").text().trim(),
        DesiredSalary = '-',// $("div #candidateData .candidateDetailList li:eq(3) span:eq(2)").text().trim(),
        Relocation = '-',//$("div #candidateData .candidateDetailList li:eq(4) span:eq(2)").text().trim(),
        ProfileSavedOn = new Date().toDateString();
        ResumePath = "https://hiring.monster.com" + $("a.at-actionDownloadWordLink:eq(1)").attr('href');

        var MainDetails = {
            "ProfileLink": ProfileLink, "MatchPercent": MatchPercent,
            "CandidateName": CandidateName, "CurrentJobTitle": CurrentJobTitle, "CurrentCompany": CurrentCompany,
            "CandidateLocation": CandidateLocation, "HomeAddress": HomeAddress, "MobileNumber": MobileNumber, "Email": Email, "ResumeUpdated": ResumeUpdated,
            "Experience": Experience, "Authorization": Authorization, "DesiredSalary": DesiredSalary, "Relocation": Relocation, "ProfileSavedOn": ProfileSavedOn, "ResumePath": ResumePath
        };

        //Resume Tab
        var ResumeSubmittedOn = $("#ctl00_ctl00_ContentPlaceHolderBase_ContentPlaceHolderRight_lld_Detail_resumeDetailTabStrip_controlResumeTab_lblResumeUpdated").text().trim();
    }

    //Switching to Additional Info Tab
    if ($("#tabCareer .HeaderTitle")) {
        $("#tabCareer .HeaderTitle").click();
        var experienceRecords = $("div #candidate-detail-tabs #gridCareerHistoryJob tr").length,
           WorkHistory = '{"WorkHistory":[]}',
           WorkHistoryList = JSON.parse(WorkHistory);

        for (var i = 0; i < experienceRecords; i++) {
            var DurationOfJob = $("div #candidate-detail-tabs #gridCareerHistoryJob tr:eq(" + i + ") td:eq(0)").text().trim(),
            JobDescription = $("div #candidate-detail-tabs #gridCareerHistoryJob tr:eq(" + i + ") td:eq(1)").text().trim(),
            JobTitle = $("div #candidate-detail-tabs #gridCareerHistoryJob tr:eq(" + i + ") td:eq(2)").text().trim(),
            EmployerName = $("div #candidate-detail-tabs #gridCareerHistoryJob tr:eq(" + i + ") td:eq(4)").text().trim();
            WorkHistoryList['WorkHistory'].push({ "DurationOfJob": DurationOfJob, "JobDescription": JobDescription, "JobTitle": JobTitle, "EmployerName": EmployerName });
        }

        var educationRecords = $("div #candidate-detail-tabs #gridEducation tr").length,
            Eduction = '{"Education":[]}',
            EductionList = JSON.parse(Eduction);
        //to get all education details looping throw all tr elements
        for (var j = 0; j < educationRecords; j++) {
            var Year = $("div #candidate-detail-tabs #gridEducation tr:eq(" + j + ") td:eq(0)").text().trim(),
            Qualification = $("div #candidate-detail-tabs #gridEducation tr:eq(" + j + ") td:eq(3)").text().trim(),
            CollegeName = $("div #candidate-detail-tabs #gridEducation tr:eq(" + j + ") td:eq(5)").text().trim();
            EductionList['Education'].push({ "Year": Year, "Qualification": Qualification, "CollegeName": CollegeName });
        }
    }

    //Additional Info Tab Career Information
    if ($("#tabCareer .HeaderTitle")) {
        $("#tabCareer .HeaderTitle").click();

        var MostRecentEmployer = $("div .careerDataBody div:eq(22)").text().trim(),
            RelevantWorkExperience = $("div .careerDataBody div:eq(26)").text().trim(),
            HighestQualification = $("div .careerDataBody div:eq(30)").text().trim(),
            CareerLevel = $("div .careerDataBody div:eq(34)").text().trim(),
            Availability = $("div .careerDataBody div:eq(42) span").text().trim(),
            Location = $("div .careerDataBody div:eq(46) span").text().trim(),
            Relocate = $("div .careerDataBody div:eq(50) span").text().trim(),
            Travel = $("div .careerDataBody div:eq(54) span").text().trim(),
            WillingToWorkWeekEnds = $("div .careerDataBody div:eq(58) span").text().trim(),
            MilitaryService = $("div .careerDataBody div:eq(62) div:eq(0) span").text().trim(),
            Citizenship = $("div .careerDataBody div:eq(62) div:eq(2) span").text().trim(),
            SecurityClearence = $("div .careerDataBody div:eq(62) div:eq(4) span").text().trim(),

            VateranStatus = '-',// $("div #divCareerDataBody .careerDataBody .innerTable:eq(1) div:eq(12) span").text().trim(),
            WorkAutherization = $("div .careerDataBody:eq(2) .labelData:eq(5)").text().trim(),

            WillingToWorkShifts = $("div .careerDataBody div:eq(62) div:eq(8) span").text().trim();

        var CareerInfo = {
            "MostRecentEmployer": MostRecentEmployer, "RelevantWorkExperience": RelevantWorkExperience, "HighestQualification": HighestQualification,
            "CareerLevel": CareerLevel, "Availability": Availability, "Location": Location, "Relocate": Relocate, "Travel": Travel,
            "WillingToWorkWeekEnds": WillingToWorkWeekEnds, "MilitaryService": MilitaryService, "Citizenship": Citizenship,
            "SecurityClearence": SecurityClearence, "VateranStatus": VateranStatus, "WorkAutherization": WorkAutherization, "WillingToWorkShifts": WillingToWorkShifts
        };

        MainDetails.Authorization = WorkAutherization;
        //Target Job
        var CompanySize = $("div .careerDataBody:eq(2) .labelData:eq(0)").text().trim(),
            DesiredStatus = $("div .careerDataBody:eq(2) .labelData:eq(1)").text().trim(),
            JobType = $("div .careerDataBody:eq(2) .labelData:eq(2)").text().trim(),
            Salary = $("div .careerDataBody:eq(2) .labelData:eq(3)").text().trim(),
            Locations = $("div .careerDataBody:eq(2) .labelData:eq(4)").text().trim(),
            JobTitles = $("div .careerDataBody:eq(2) .labelData:eq(6)").text().trim(),
            Industry = $("div .careerDataBody:eq(2) .labelData:eq(7)").text().trim(),
            Occupation = $("div .careerDataBody:eq(2) .labelData:eq(8)").text().trim();

        var TargetJob = {
            "CompanySize": CompanySize, "DesiredStatus": DesiredStatus, "JobType": JobType, "Salary": Salary,
            "Locations": Locations, "JobTitles": JobTitles, "Industry": Industry, "Occupation": Occupation
        };

        //Certifications

        if ($("#tblCertifications tr").length > 0) {
            //Skills
            var certListLength = $("#tblCertifications tr").length,
                Certs = '{"Certs":[]}',
                CertList = JSON.parse(Certs);
            //to get all skillsets details looping throw all tr elements
            if (certListLength > 0) {
                for (var i = 0; i < certListLength; i++) {
                    var CertName = $("#tblCertifications tr:eq(" + i + ") td:eq(0)").text().trim(),
                        CertYear = $("#tblCertifications tr:eq(" + i + ") td:eq(1)").text().trim(),
                        CertBy = $("#tblCertifications tr:eq(" + i + ") td:eq(2)").text().trim(),
                        CertDescription = $("#tblCertifications tr:eq(" + i + ") td:eq(3)").text().trim();
                    CertList['Certs'].push({ "CertName": CertName, "CertYear": CertYear, "CertBy": CertBy, "CertDescription": CertDescription });
                }
            }
            else
                CertList['Certs'].push({ "CertName": '-', "CertYear": '-', "CertBy": '-', "CertDescription": '-' });
        }
    }
    //skills tab
    if ($("#tabSkills .HeaderTitle")) {
        $("#tabSkills .HeaderTitle").click();

        //Skills
        var skillSetLength = $("#skillsContainer tr").length,
            Skills = '{"Skills":[]}',
            SkillsList = JSON.parse(Skills);
        //to get all skillsets details looping throw all tr elements
        if (skillSetLength > 0) {
            for (var i = 1; i < skillSetLength; i++) {
                var SkillName = $("#skillsContainer tr:eq(" + i + ") .skillCell").text()
                LastUsed = '-';
                ExperienceInSkill = $("#skillsContainer tr:eq(" + i + ") .proficiencyCell").text()
                SkillsList['Skills'].push({ "SkillName": SkillName, "LastUsed": LastUsed, "ExperienceInSkill": ExperienceInSkill });
            }
        }
        else
            SkillsList['Skills'].push({ "SkillName": '-', "LastUsed": '-', "ExperienceInSkill": '-' });

    }

    ProfileDetails = {
        "ResumeSubmittedOn": ResumeSubmittedOn,
        "MainDetails": MainDetails, "WorkHistoryList": WorkHistoryList,
        "EductionList": EductionList, "SkillsList": SkillsList, "CareerInfo": CareerInfo, "TargetJob": TargetJob,"CertList":CertList
    };

    //switching to Resume tab
    if ($("#tabResume .HeaderTitle"))
        $("#tabResume .HeaderTitle").click();

    return ProfileDetails;

    //Honour And Rewards

    //Carreer Highlights

    //Intrest and Hobbies

    //Affiliations

    //ResumeSource

    //Language Proficiency
}
//Profile Details are In String or JSON format are Posted to The API
function loadDocPostDataToAPI(URL, profileDetails, downloadLocation) {
    email = profileDetails.MainDetails.Email;
    profileDetails.ProfileLink = "";
    $.ajax({
        url: URL,
        type: "POST",
        data: JSON.stringify(profileDetails),
        contentType: "application/json",
        success: function (data) {

            if (downloadLocation != "")
                window.open(apiUrl + "FileUploadPage.aspx?" + email, "_blank", "toolbar=yes,top=250,left=250,width=800,height=200");
            else
                alert("Resume Not Found. But Profile Saved!!!");

            $('#btnGetProfileDetails').css('display', 'None');
            var appendElementTo = (window.location.pathname.toLowerCase().indexOf("resumeview.aspx") != -1) ? $("#RNCandidateDetailWrapper") : $("#AnswerContent");//RNCandidateIndexWrapper
            if ($("#inDB").length === 0)
                appendElementTo.append('<label id="inDB" style="font-size:9pt;color:white;background-color:#00aeef;border:2px solid #00aeef;padding:3px;border-radius: 5px;cursor: pointer;" title="Profile is Already In DB"><span class="button-text">Profile Saved</span></label>');
        },
        error: function (err) {
            console.log(err.responseText);
        },
        failure: function (fail) {
            console.log(fail.status + "state: " + fail.readyState)
        }
    });
}

//To get date difference in days
function date_diff_indays(date1, date2) {
    dt1 = new Date(date1);
    dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
}

//To get date difference in hours
function diff_hours(dt1, dt2) {
    dt1 = new Date(dt1);
    dt2 = new Date(dt2);
    var diff = (Date.UTC(dt2.getTime()) - Date.UTC(dt1.getTime())) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
}
