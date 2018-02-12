using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using System.IO;

namespace RecPortalAPI.Models
{
    public class ProfileDetails
    {
        public string ResumeSubmittedOn { get; set; }
        public MainDetails MainDetails { get; set; }
        public WorkHistoryList WorkHistoryList { get; set; }
        public EductionList EductionList { get; set; }
        public SkillsList SkillsList { get; set; }
        public CareerInfo CareerInfo { get; set; }
        public TargetJob TargetJob { get; set; }
        public CertList CertList { get; set; }

    }

    public class MainDetails
    {
        public string ProfileLink { get; set; }
        public string MatchPercent { get; set; }
        public string CandidateName { get; set; }
        public string CurrentJobTitle { get; set; }
        public string CurrentCompany { get; set; }
        public string CandidateLocation { get; set; }
        public string HomeAddress { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public string ResumeUpdated { get; set; }
        public string Experience { get; set; }
        public string Authorization { get; set; }
        public string DesiredSalary { get; set; }
        public string Relocation { get; set; }
        public string ProfileSavedOn { get; set; }
        public string ResumePath { get; set; }
    }

    public class WorkHistory
    {
        public string DurationOfJob { get; set; }
        public string JobDescription { get; set; }
        public string JobTitle { get; set; }
        public string EmployerName { get; set; }
    }

    public class WorkHistoryList
    {
        public List<WorkHistory> WorkHistory { get; set; }
    }

    public class Education
    {
        public string Year { get; set; }
        public string Qualification { get; set; }
        public string CollegeName { get; set; }
    }

    public class EductionList
    {
        public List<Education> Education { get; set; }
    }

    public class Skill
    {
        public string SkillName { get; set; }
        public string LastUsed { get; set; }
        public string ExperienceInSkill { get; set; }
    }

    public class SkillsList
    {
        public List<Skill> Skills { get; set; }
    }

    public class CareerInfo
    {
        public string MostRecentEmployer { get; set; }
        public string RelevantWorkExperience { get; set; }
        public string HighestQualification { get; set; }
        public string CareerLevel { get; set; }
        public string Availability { get; set; }
        public string Location { get; set; }
        public string Relocate { get; set; }
        public string Travel { get; set; }
        public string WillingToWorkWeekEnds { get; set; }
        public string MilitaryService { get; set; }
        public string Citizenship { get; set; }
        public string SecurityClearence { get; set; }
        public string VateranStatus { get; set; }
        public string WorkAutherization { get; set; }
        public string WillingToWorkShifts { get; set; }
    }

    public class TargetJob
    {
        public string CompanySize { get; set; }
        public string DesiredStatus { get; set; }
        public string JobType { get; set; }
        public string Salary { get; set; }
        public string Locations { get; set; }
        public string JobTitles { get; set; }
        public string Industry { get; set; }
        public string Occupation { get; set; }
    }
    public class Cert
    {
        public string CertName { get; set; }
        public string CertYear { get; set; }
        public string CertBy { get; set; }
        public string CertDescription { get; set; }
    }

    public class CertList
    {
        public List<Cert> Certs { get; set; }
    }
    public class MatchedProfiles
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
        public DateTime CreatedTime { get; internal set; }
    }







}