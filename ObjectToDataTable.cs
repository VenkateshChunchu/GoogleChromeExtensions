using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace RecPortalAPI.Models
{
    public class ObjectToDataTable
    {
        //converting the objects to DataTable



        private DataTable objToDataTable(List<MainDetails> obj)
        {
            DataTable dt = new DataTable();
            MainDetails objmkt = new MainDetails();

            dt.Columns.Add("MatchPercent ");
            dt.Columns.Add("CandidateName");
            dt.Columns.Add("CurrentJobTitle");
            dt.Columns.Add("CurrentCompany");
            dt.Columns.Add("CandidateLocation");
            dt.Columns.Add("HomeAddress");
            dt.Columns.Add("MobileNumber");
            dt.Columns.Add("Email");
            dt.Columns.Add("ResumeUpdated");
            dt.Columns.Add("Experience");
            dt.Columns.Add("Authorization");
            dt.Columns.Add("DesiredSalary");
            dt.Columns.Add("Relocation");
            dt.Columns.Add("ProfileSavedOn");
            foreach (var info in typeof(MainDetails).GetProperties())
            {
                dt.Rows.Add(info.Name);
            }
            dt.AcceptChanges();
            return dt;
        }


    }
    public static class ExtMetClass
    {
        public static int IntegerExtension(this string str)
        {
            return Int32.Parse(str);
        }
        
    }

}