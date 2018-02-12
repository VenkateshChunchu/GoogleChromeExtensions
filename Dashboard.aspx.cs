using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using RecPortalAPI.Models;
using System.Web.Script.Serialization;
using System.ComponentModel;
using System.Text.RegularExpressions;

namespace RecPortalAPI
{
    public partial class Dashboard : System.Web.UI.Page
    {
        private string sortDirection = "ASC";
        private DataTable dt;
        private string apiUrl = "https://192.168.1.68:443/";

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                LoadGrid(txtSearch.Text);
                ViewState["sortColumn"] = " ";
                ViewState["sortDirection"] = " ";
                txtSearch.Text = "";
            }

        }
        protected void grdJSON2Grid_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            if (e.CommandName == "Email")
                ClientScript.RegisterStartupScript(this.GetType(), "newWindow", String.Format("<script>window.open('{0}');</script>", apiUrl + "CandidateDetails.aspx?" + e.CommandArgument.ToString()));
            //else if (e.CommandName == "CandidateName")
            //    ClientScript.RegisterStartupScript(this.GetType(), "newWindow", String.Format("<script>window.open('{0}');</script>", apiUrl + "CandidateDetails.aspx?" + e.CommandArgument.ToString()));
        }

        protected void btnSearch_Click(object sender, EventArgs e)
        {
            LoadGrid(txtSearch.Text);
        }

        protected void grdJSON2Grid_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            grdJSON2Grid.PageIndex = e.NewPageIndex;
            LoadGrid(txtSearch.Text);
            //grdJSON2Grid.DataBind();
        }

        protected void grdJSON2Grid_Sorting(object sender, GridViewSortEventArgs e)
        {
            if (ViewState["sortColumn"].ToString() == e.SortExpression.ToString())
            {
                if ("ASC" == ViewState["sortDirection"].ToString())
                    ViewState["sortDirection"] = "DESC";
                else
                    ViewState["sortDirection"] = "ASC";
            }
            else
            {
                ViewState["sortColumn"] = e.SortExpression.ToString();
                ViewState["sortDirection"] = "ASC";
            }

            SetSortDirection(ViewState["sortDirection"].ToString());
            dt = (DataTable)Session["mainDetailsList"];

            if (null != dt)
            {
                dt.DefaultView.Sort = e.SortExpression + " " + sortDirection;
                grdJSON2Grid.DataSource = dt;//(DataTable)Session["mainDetailsList"];
                grdJSON2Grid.DataBind();
            }
        }
        protected void lnkResumeDownload_Click(object sender, EventArgs e)
        {
            string filePath = (sender as LinkButton).CommandArgument;
            Response.ContentType = ContentType;
            Response.AppendHeader("Content-Disposition", "attachment; filename=" + Path.GetFileName(filePath));
            //Response.TransmitFile(Server.MapPath("~\\App_Data\\") + filePath);
            Response.TransmitFile(filePath);
            //Response.WriteFile(filePath);
            Response.End();
        }

        protected void lnkProfileLink_Click(object sender, EventArgs e)
        {
            string profileLink = (sender as LinkButton).CommandArgument;
            Page.ClientScript.RegisterStartupScript(typeof(Page), "ProfilePage", "<script language=javascript> window.open( '" + profileLink + "');</script>");// , '_blank', 'toolbar=yes,top=1500,left=1500,width=1500,height=800');</script>");
            //Server.Execute(profileLink);
            //Response.Redirect(profileLink);
        }
        #region Helping Methods
        private void LoadGrid(string loadBy)
        {
            string profileFolderPath = @"D:\Venkateshh\Profiles\";
            string[] profiles = Directory.GetFiles(profileFolderPath, "*.json", SearchOption.TopDirectoryOnly);
            var mainDetailsList = new List<MainDetails>();
            string searchText = "";
            List<Skill> searchList = null;
            foreach (var profile in profiles)
            {
                var profileDetails = new JavaScriptSerializer().Deserialize<ProfileDetails>(File.ReadAllText(profile));

                if (!string.IsNullOrEmpty(loadBy))
                {
                    switch (ddlSearchBy.Text)
                    {
                        case "Company":
                            searchText = profileDetails.MainDetails.CurrentCompany;
                            break;
                        case "Location":
                            searchText = profileDetails.MainDetails.CandidateLocation;
                            break;
                        case "Job Title":
                            searchText = profileDetails.MainDetails.CurrentJobTitle;
                            break;
                        case "Skill":
                            if (null != profileDetails.SkillsList && null != profileDetails.SkillsList.Skills)
                                searchList = profileDetails.SkillsList.Skills;
                            else
                                searchText = "";
                            break;
                        default:
                            searchText = profileDetails.MainDetails.CandidateName;
                            break;
                    }
                    if (null != searchList)
                    {
                        foreach (var skill in searchList)
                            if (skill.SkillName.ToLower().Contains(loadBy.ToLower()))
                            {
                                mainDetailsList.Add(profileDetails.MainDetails);
                                break;
                            }
                        searchList = null;
                    }
                    if (searchText.ToLower().Contains(loadBy.ToLower()))
                        mainDetailsList.Add(profileDetails.MainDetails);


                }
                if (string.IsNullOrEmpty(loadBy))
                    mainDetailsList.Add(profileDetails.MainDetails);
            }

            dt = ConvertToDataTable(mainDetailsList);
            Session.Add("mainDetailsList", dt);

            if (null != dt)
            {
                if (dt.Rows.Count > 0)
                {
                    grdJSON2Grid.DataSource = dt;
                    grdJSON2Grid.DataBind();
                }
                else
                {
                    dt.Rows.Add(dt.NewRow());
                    grdJSON2Grid.DataSource = dt;
                    grdJSON2Grid.DataBind();
                    int totalcolums = grdJSON2Grid.Rows[0].Cells.Count;
                    grdJSON2Grid.Rows[0].Cells.Clear();
                    grdJSON2Grid.Rows[0].Cells.Add(new TableCell());
                    grdJSON2Grid.Rows[0].Cells[0].ColumnSpan = totalcolums;
                    grdJSON2Grid.Rows[0].Cells[0].Text = "No Records Found With Your Search...!!!";
                    txtSearch.Text = "";
                }
            }
            else
                txtSearch.Text = "Getting Null Data Table";

        }
        private void SetSortDirection(string direction)
        {
            if (direction.ToUpper().Contains("ASC"))
                sortDirection = "DESC";
            else
                sortDirection = "ASC";
        }
        //Converting the List to DataTable
        private DataTable ConvertToDataTable<T>(IList<T> data)
        {
            PropertyDescriptorCollection properties =
               TypeDescriptor.GetProperties(typeof(T));
            DataTable table = new DataTable();

            foreach (PropertyDescriptor prop in properties)
                table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);

            foreach (T item in data)
            {
                DataRow row = table.NewRow();
                foreach (PropertyDescriptor prop in properties)
                    row[prop.Name] = prop.GetValue(item) ?? DBNull.Value;
                table.Rows.Add(row);
            }
            return table;
        }
        #endregion

        protected void btnDeleteProfile_Click(object sender, EventArgs e)
        {

        }
    }

}