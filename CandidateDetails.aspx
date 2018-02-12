<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CandidateDetails.aspx.cs" Inherits="RecPortalAPI.CandidateDetails" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <%--<link href="StyleSheet1.css" rel="stylesheet" />--%>
    <link href="CandidateDetailsStyle.css" rel="stylesheet" />
    <title></title>
    <%--    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>--%>
</head>
<body>

    <form id="form1" runat="server">
        <%--<table>
            <tr>
                <td>
                    <p id="profile" align="center"></p>
                </td>
            </tr>
            <tr>
                <td>
                    <h2>Profile Saved On:</h2>
                    <h3>
                        <label id="lblResumeSubmittedOn"></label>
                    </h3>
                </td>
            </tr>

            <tr>
                <td>
                    <h1>Main Details Of the Candidate</h1>
                    <p id="main"></p>
                </td>
            </tr>
            <tr>
                <td>
                    <h1>Work History</h1>
                    <p id="work"></p>
                </td>
            </tr>

            <tr>
                <td>
                    <h1>Education Details</h1>
                    <p id="education"></p>
                </td>
            </tr>
            <tr>
                <td>
                    <h1>Career Info</h1>
                    <p id="career"></p>
                </td>
            </tr>

            <tr>
                <td>
                    <h1>Certifications</h1>
                    <p id="certs"></p>
                </td>
            </tr>
            <tr>
                <td>
                    <h1>Target Job</h1>
                    <p id="targetJob"></p>
                </td>
            </tr>
            <tr>
                <td>
                    <h1>Skills</h1>
                    <p id="skills"></p>
                </td>
            </tr>

        </table>--%>

        <p id="profile" align="center"></p>

        <h2>Profile Saved On:</h2>
        <h3>
            <label id="lblResumeSubmittedOn"></label>
        </h3>
        <br />

        <h1 id="hmain">Main Details Of the Candidate</h1>
        <p id="main"></p>
        <br />

        <h1 id="hwork">Work History</h1>
        <p id="work"></p>
        <br />

        <h1 id="heducation">Education Details</h1>
        <p id="education"></p>
        <br />

        <h1 id="hcareer">Career Info</h1>
        <p id="career"></p>
        <br />

        <h1 id="hcert">Certifications</h1>
        <p id="certs"></p>
        <br />

        <h1 id="htarget">Target Job</h1>
        <p id="targetJob"></p>
        <br />

        <h1 id="hskills">Skills</h1>
        <p id="skills"></p>
    </form>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script>
        if (!jQuery) {
            document.write('<script src="scripts/jquery.min.js"><\/script>');
        }
    </script>
    <script src="scripts/candidateDetails.js"></script>
</body>
</html>
