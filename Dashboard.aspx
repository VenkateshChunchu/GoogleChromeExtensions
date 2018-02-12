<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="RecPortalAPI.Dashboard" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="Main.css" rel="stylesheet" />
    <title></title>
    <%--<script src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.2.1.min.js"></script>--%>
</head>
<body>

    <form id="form1" runat="server">
        <img src="Zen3-105x75-1.png" alt="Zen3 Logo" title="Zen3 Logo" class="Watermark" style="align-self: center; opacity: 0.2; filter: alpha(opacity=20);" />
        <div id="SearchPane">
            <table>
                <tr>
                    <td>
                        <asp:Label ID="Label1" runat="server" Text="Search By"></asp:Label>
                    </td>
                    &nbsp;&nbsp;
                <td>
                    <asp:DropDownList ID="ddlSearchBy" runat="server">
                        <asp:ListItem Selected="True" Text="Name" />
                        <asp:ListItem Text="Company" />
                        <asp:ListItem Text="Location" />
                        <asp:ListItem Text="Job Title" />
                        <asp:ListItem Text="Skill" />
                    </asp:DropDownList>
                </td>
                    &nbsp;&nbsp;
                <td>
                    <asp:TextBox ID="txtSearch" runat="server"></asp:TextBox>

                </td>
                    <td>
                        <asp:Button Text="Search Profiles" runat="server" ID="btnSearch" OnClick="btnSearch_Click" />
                    </td>
                </tr>
            </table>
        </div>
        <br />
        <div id="profilesPane">
            <asp:GridView ID="grdJSON2Grid" runat="server" OnRowCommand="grdJSON2Grid_RowCommand" AllowPaging="True" AllowSorting="True" AutoGenerateColumns="False" BackColor="White" BorderColor="#00aeef" BorderStyle="None" BorderWidth="1px" CellPadding="4" OnPageIndexChanging="grdJSON2Grid_PageIndexChanging" OnSorting="grdJSON2Grid_Sorting" Style="position: static" PageSize="10">
                <HeaderStyle Width="100px" />
                <Columns>
                    <asp:TemplateField HeaderText="Current Job Title" SortExpression="CurrentJobTitle">
                        <ItemTemplate>
                            <asp:Label ID="lnkcurrentJobTitle" runat="server" Text='<%#Eval("CurrentJobTitle") %>'></asp:Label>
                        </ItemTemplate>
                        <ItemStyle Wrap="true"></ItemStyle>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Current Company" ItemStyle-Wrap="false">
                        <ItemTemplate>
                            <asp:Label ID="lnkcurrentcompany" runat="server" Text='<%#Eval("CurrentCompany") %>'></asp:Label>
                        </ItemTemplate>

                        <ItemStyle Wrap="true"></ItemStyle>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Candidate Location" SortExpression="CandidateLocation">
                        <ItemTemplate>
                            <asp:Label ID="lnkcandidatelocation" runat="server" Text='<%#Eval("CandidateLocation") %>'></asp:Label>
                        </ItemTemplate>
                        <ItemStyle Wrap="true"></ItemStyle>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Candidate Name" SortExpression="CandidateName">
                        <ItemTemplate>

                            <%--<asp:Label ID="lnkcandidateName" runat="server" Text='<%#Eval("CandidateName") %>'>'
                        </asp:Label>--%>

                            <asp:LinkButton ID="lnkcandidateName" runat="server" CommandArgument='<%#Eval("ProfileLink")%>' Text='<%#Eval("CandidateName") %>' CommandName="CandidateName" OnClick="lnkProfileLink_Click"></asp:LinkButton>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Email">
                        <ItemTemplate>
                            <asp:LinkButton ID="lnkemail" runat="server" CommandArgument='<%#Eval("Email")%>' Text='<%#Eval("Email") %>' CommandName="Email"></asp:LinkButton>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Profile Saved On" SortExpression="ProfileSavedOn">
                        <ItemTemplate>
                            <asp:Label ID="lnkresumeupdated" runat="server" Text='<%#Eval("ProfileSavedOn") %>'>'
                            </asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Experience" SortExpression="Experience">
                        <ItemTemplate>
                            <asp:Label ID="lnkexperience" runat="server" Text='<%#Eval("Experience") %>'>'
                            </asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Authorization" SortExpression="Authorization">
                        <ItemTemplate>
                            <asp:Label ID="lnkauthorization" runat="server" Text='<%#Eval("Authorization") %>'>'
                            </asp:Label>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <asp:TemplateField HeaderText="Resume">
                        <ItemTemplate>
                            <asp:LinkButton ID="lnkResumeDownload" runat="server" CommandArgument='<%#Eval("ResumePath")%>' Text="Download" OnClick="lnkResumeDownload_Click" CommandName="ResumePath"></asp:LinkButton>
                        </ItemTemplate>
                    </asp:TemplateField>
                    <%--   <asp:TemplateField HeaderText="Monster">
                        <ItemTemplate>
                            <asp:LinkButton ID="lnkProfileLink" runat="server" CommandArgument='<%#Eval("ProfileLink")%>' Text="Print" CommandName="ProfileLink" OnClick="lnkProfileLink_Click"></asp:LinkButton>
                        </ItemTemplate>
                    </asp:TemplateField>--%>
                </Columns>
                <FooterStyle BackColor="#00aeef" ForeColor="#003399" />
                <HeaderStyle BackColor="#00aeef" Font-Bold="True" ForeColor="#CCCCFF" />
                <PagerStyle BackColor="#00aeef" ForeColor="#003399" HorizontalAlign="Left" Wrap="False" />
                <RowStyle BackColor="White" ForeColor="#003399" />
                <SelectedRowStyle BackColor="#00aeef" Font-Bold="True" ForeColor="#CCFF99" />
                <SortedAscendingCellStyle BackColor="#00aeef" />
                <SortedAscendingHeaderStyle BackColor="#00aeef" />
                <SortedDescendingCellStyle BackColor="#00aeef" />
                <SortedDescendingHeaderStyle BackColor="#00aeef" />
            </asp:GridView>
        </div>
        <br />
        <br />
    </form>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script>
        if (!jQuery) {
            document.write('<script src="scripts/jquery.min.js"><\/script>');
        }
    </script>
</body>
</html>
