<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="FileUploadPage.aspx.cs" Inherits="TestSampleApp.FileUploadPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <%--    <script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>--%>
</head>
<body>
    <form id="form1" runat="server">
        <asp:FileUpload ID="FileUploadControl" runat="server" />
        <asp:Button runat="server" ID="UploadButton" Text="Upload" OnClick="UploadButton_Click" Style="width: 60px" />
        <br />
        <br />
        <asp:Label runat="server" ID="StatusLabel" Visible="false" Text="Upload Status: " />
    </form>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script>
        if (!jQuery) {
            document.write('<script src="scripts/jquery.min.js"><\/script>');
        }
    </script>

</body>
</html>
