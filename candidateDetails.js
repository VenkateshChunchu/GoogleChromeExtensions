/// <reference path="jquery.min.js" />

var apiProfileUrl = "https://192.168.1.68:443/api/profile",
email = window.location.href.split("?")[1],
txt = "";
jQuery.support.cors = true;
$.ajax({
    url: apiProfileUrl + "?candidateEmail=" + email,
    type: "GET",
    contentType: "application/json",
    success: function (data) {
        DisplayMonsterCandidateDetails(data);
    },
    error: function (err) {
        console.log(err.responseText);
    },
    failure: function (fail) {
        console.log(fail.status + "state: " + fail.readyState)
    }
});

function DisplayMonsterCandidateDetails(data) {
    var main = data.MainDetails;
    txt = "<h1>" + main.CandidateName + " Details</h1> "
    document.getElementById("profile").innerHTML = txt;
    txt = "";
    $("#lblResumeSubmittedOn").text(main.ProfileSavedOn);

    txt += "<table id='tblProfile' border='1'>";
    txt += "<tr><td>CandidateName:</td><td>" + main.CandidateName + "</td></tr>";
    txt += "<tr><td>CurrentJobTitle:</td><td>" + main.CurrentJobTitle + "</td></tr>";
    txt += "<tr><td>CurrentCompany:</td><td>" + main.CurrentCompany + "</td></tr>";
    txt += "<tr><td>CandidateLocation:</td><td>" + main.CandidateLocation + "</td></tr>";
    txt += "<tr><td>HomeAddress</td><td>" + main.HomeAddress + "</td></tr>";
    txt += "<tr><td>MobileNumber</td><td>" + main.MobileNumber + "</td></tr>";
    txt += "<tr><td>Email</td><td>" + main.Email + "</td></tr>";
    txt += "<tr><td>Experience:</td><td>" + main.Experience + "</td></tr>";
    txt += "<tr><td>Authorization:</td><td>" + main.Authorization + "</td></tr>";
    txt += "<tr><td>DesiredSalary:</td><td>" + main.DesiredSalary + "</td></tr>";
    txt += "<tr><td>Relocation:</td><td>" + main.Relocation + "</td></tr>";
    txt += "</table>"

    document.getElementById("main").innerHTML = txt;

    txt = "";
    myObj = data.WorkHistoryList.WorkHistory

    txt += "<table id='tblProfile' border='1'><thread><th>DurationOfJob:</th> <th>JobDescription:</th> <th>JobTitle:</th><th>EmployerName:</th></thread>";
    for (var x in myObj) {
        txt += "<tr><td>" + myObj[x].DurationOfJob + "</td>";
        txt += "<td>" + myObj[x].JobDescription + "</td>";
        txt += "<td>" + myObj[x].JobTitle + "</td>";
        txt += "<td>" + myObj[x].EmployerName + "</td></tr>";
    }
    txt += "</table>"
    document.getElementById("work").innerHTML = txt;
    txt = "";
    education = data.EductionList.Education
    txt += "<table id='tblProfile' class='scroll' border='1'>  <thread><th>Year:</th><th>Qualification:</th> <th>CollegeName:</th></thread><tbody>";
    for (var x in education) {
        txt += "<tr><td>" + education[x].Year + "</td>";
        txt += "<td>" + education[x].Qualification + "</td>";
        txt += "<td>" + education[x].CollegeName + "</td></tr>";
    }
    txt += "</tbody></table>"
    document.getElementById("education").innerHTML = txt;

    txt = "";
    skills = data.SkillsList.Skills
    txt += "<table id='tblProfile' class='scroll' border='1' class='scroll' > <thread><th>SkillName:</th> <th>LastUsed:</th> <th>ExperienceInSkill:</th></thread><tbody>";
    for (var x in skills) {
        if (skills[x].SkillName.length > 0 && skills[x].SkillName != '-') {
            txt += "<tr><td>" + skills[x].SkillName + "</td>";
            txt += "<td>" + skills[x].LastUsed + "</td>";
            txt += "<td>" + skills[x].ExperienceInSkill + "</td></tr>";
        }
    }
    txt += "</tbody></table>"
    document.getElementById("skills").innerHTML = txt;

    txt = "";
    career = data.CareerInfo;
    txt += "<table id='tblProfile' border='1'>";

    txt += "<tr><td>MostRecentEmployer:</td><td>" + career.MostRecentEmployer + "</td></tr>";
    txt += "<tr><td>RelevantWorkExperience:</td><td>" + career.RelevantWorkExperience + "</td></tr>";
    txt += "<tr><td>HighestQualification:</td><td>" + career.HighestQualification + "</td></tr>";
    txt += "<tr><td>CareerLevel:</td><td>" + career.CareerLevel + "</td></tr>";
    txt += "<tr><td>Availability:</td><td>" + career.Availability + "</td></tr>";
    txt += "<tr><td>Location:</td><td>" + career.Location + "</td></tr>";
    txt += "<tr><td>Relocate:</td><td>" + career.Relocate + "</td></tr>";
    txt += "<tr><td>Travel:</td><td>" + career.Travel + "</td></tr>";
    txt += "<tr><td>WillingToWorkWeekEnds:</td><td>" + career.WillingToWorkWeekEnds + "</td></tr>";
    txt += "<tr><td>MilitaryService:</td><td>" + career.MilitaryService + "</td></tr>";
    txt += "<tr><td>Citizenship:</td><td>" + career.Citizenship + "</td></tr>";
    txt += "<tr><td>SecurityClearence:</td><td>" + career.SecurityClearence + "</td></tr>";
    txt += "<tr><td>VateranStatus:</td><td>" + career.VateranStatus + "</td></tr>";
    txt += "<tr><td>WorkAutherization:</td><td>" + career.WorkAutherization + "</td></tr>";
    txt += "<tr><td>WillingToWorkShifts:</td><td>" + career.WillingToWorkShifts + "</td></tr>";
    txt += "</table>"
    document.getElementById("career").innerHTML = txt;

    txt = "";


    targetJob = data.TargetJob;
    txt += "<table id='tblProfile' border='1'>";

    txt += "<tr><td>CompanySize:</td><td>" + targetJob.CompanySize + "</td></tr>";
    txt += "<tr><td>DesiredStatus:</td><td>" + targetJob.DesiredStatus + "</td></tr>";
    txt += "<tr><td>JobType:</td><td>" + targetJob.JobType + "</td></tr>";
    txt += "<tr><td>Salary:</td><td>" + targetJob.Salary + "</td></tr>";
    txt += "<tr><td>Locations:</td><td>" + targetJob.Locations + "</td></tr>";
    txt += "<tr><td>JobTitles:</td><td>" + targetJob.JobTitles + "</td></tr>";
    txt += "<tr><td>Industry:</td><td>" + targetJob.Industry + "</td></tr>";
    txt += "<tr><td>Occupation:</td><td>" + targetJob.Occupation + "</td></tr>";
    txt += "</table>"
    document.getElementById("targetJob").innerHTML = txt;

    txt = "";
    certs = data.CertList.Certs
    txt += "<table id='tblProfile' class='scroll' border='1' class='scroll' > <thread><th>Cert Name:</th> <th>Cert Year:</th> <th>Cert By:</th><th>Cert Description:</th></thread><tbody>";
    for (var x in certs) {
        txt += "<tr><td>" + certs[x].CertName + "</td>";
        txt += "<td>" + certs[x].CertYear + "</td>";
        txt += "<td>" + certs[x].CertBy + "</td>";
        txt += "<td>" + certs[x].CertDescription + "</td></tr>";
    }
    txt += "</tbody></table>"
    document.getElementById("certs").innerHTML = txt;
    txt = "";

}
