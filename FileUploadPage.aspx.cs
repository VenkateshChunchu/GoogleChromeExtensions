using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using RecPortalAPI.Models;
using System.Web.Script.Serialization;

namespace TestSampleApp
{
    public partial class FileUploadPage : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            StatusLabel.Visible = false;
            //Page.ClientScript.RegisterOnSubmitStatement(typeof(Page), "closePage", "window.onunload = CloseWindow();");
        }

        protected void UploadButton_Click(object sender, EventArgs e)
        {
            ////************************** to get the Client dowload Folder location
            //string path = KnownFolders.GetPath(KnownFolder.Downloads);
            //var directory = new DirectoryInfo(path);
            //var myFile = directory.GetFiles()
            //                 .OrderByDescending(f => f.LastWriteTime)
            //                 .First();
            //string fullPath = myFile.FullName;
            //string fileName = fullPath.Split('\\')[fullPath.Split('\\').Length - 1].ToString();
            //string extension = fileName.Split('.')[1].ToString();
            //Stream s = myFile;
            //myFile.OpenWrite();
            //**************************

            //Stream fs = FileUploadControl.PostedFile.InputStream;
            //BinaryReader br = new BinaryReader(fs);
            //byte[] bytes = br.ReadBytes((Int32)fs.Length);
            //Save the Byte Array as File.
            //string filePath = "~/scripts/" + Path.GetFileName(FileUploadControl.FileName);
            //File.WriteAllBytes(Server.MapPath(filePath), bytes);

            //*****************************************
            string status = "";
            if (FileUploadControl.HasFile)
            {
                try
                {
                    if (FileUploadControl.PostedFile.ContentLength < 1024000)
                    {
                        string extension = Path.GetExtension(FileUploadControl.PostedFile.FileName);

                        //string filePath1 = Server.MapPath("~\\App_Data\\") + Path.GetFileName(FileUploadControl.FileName);
                        string profileFolderPath = @"D:\Venkateshh\Profiles\";
                        string candidateEmail = Request.Url.Query.Replace('?', ' ').Trim().Replace("%40", "@").Trim();
                        string[] profiles = Directory.GetFiles(profileFolderPath, "*.json", SearchOption.TopDirectoryOnly);

                        if (profiles.Length != 0)
                        {
                            string profile = profiles.Where(s => s.Contains(candidateEmail)).FirstOrDefault();

                            if (!string.IsNullOrEmpty(profile))
                            {
                                ProfileDetails profileDetails = new JavaScriptSerializer().Deserialize<ProfileDetails>(File.ReadAllText(profile));
                                string filePath = Server.MapPath("~\\App_Data\\") + profileDetails.MainDetails.Email + extension;
                                //Updating the File Path in the Respective User File
                                profileDetails.MainDetails.ResumePath = filePath;
                                string profileFilePath = profileFolderPath + profileDetails.MainDetails.CandidateName + "-" + profileDetails.MainDetails.Email + ".json";
                                var json = new JavaScriptSerializer().Serialize(profileDetails);
                                File.WriteAllText(profileFilePath, json);
                                FileUploadControl.SaveAs(filePath);//filePath1
                                status = "File Uploaded Successfully!!";
                            }
                            else
                            {
                                status = "Profile is Missing in the DB Please Export the Profile and Try Again";
                            }
                            ShowText(status);
                            Page.ClientScript.RegisterStartupScript(typeof(Page), "closePage", "<script language=javascript>alert( '" + status + "' );self.close();</script>");
                        }
                    }
                    else
                        ShowText("The file limit exceeded");
                }
                catch (Exception ex)
                {
                    ShowText("The file could not be uploaded. The following error occured: " + ex.Message);
                }
            }
            else
            {
                ShowText("Please Select the File");
            }
        }
        private void ShowText(string text)
        {
            StatusLabel.Visible = true;
            StatusLabel.Text = "Upload status:: " + text;
        }
        private static void SaveFile(string downloadedFileSaveLocation, Stream fileStream)
        {
            using (var file = File.Create(downloadedFileSaveLocation))
            {
                fileStream.CopyTo(file);
            }
        }
    }
}