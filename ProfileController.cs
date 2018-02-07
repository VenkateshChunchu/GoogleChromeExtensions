using System;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using System.IO;
using RecPortalAPI.Models;
using System.Net;
using System.Linq;
using System.Collections;
using System.Collections.Generic;
using System.Web.Http.Cors;

namespace RecPortalAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProfileController : ApiController
    {

        private string profileFolderPath = @"D:\Venkateshh\Profiles\";

        [HttpGet]
        public HttpResponseMessage ISProfileMatched([FromUri] String profileNames)
        {
            string profile = "";
            try
            {
                var nameList = profileNames.Split(',');

                string[] profiles = Directory.GetFiles(profileFolderPath, "*.json", SearchOption.TopDirectoryOnly);

                if (profiles.Length == 0)
                    return Request.CreateResponse(HttpStatusCode.OK, "No Profile Saved in DB");

                if (nameList.Length != 0 && profiles.Length != 0)
                {
                    List<MatchedProfiles> matchedProfileList = new List<MatchedProfiles>();

                    foreach (string name in nameList)
                    {
                        MatchedProfiles mp = new MatchedProfiles();
                        mp.Name = name;

                        if ("" == mp.Name || mp.Name.Length > 1)
                        {
                            profile = profiles.Where(s => s.ToLower().Contains(mp.Name.ToLower())).FirstOrDefault();

                            if (!string.IsNullOrEmpty(profile))
                            {
                                mp.Email = profile.Split('-').Last().Replace(".json", "");
                                mp.Status = "Exact Match";
                                mp.CreatedTime = File.GetLastWriteTimeUtc(profile);
                            }
                            else
                            {
                                mp.Email = "Not Found";
                                mp.Status = "No Match";
                            }
                        }
                        else
                        {
                            mp.Email = "Not Found";
                            mp.Status = "No Match";
                        }

                        matchedProfileList.Add(mp);
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, matchedProfileList);
                }
                return Request.CreateResponse(HttpStatusCode.NotFound, "No Profile Matched");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpPost]
        public HttpResponseMessage SaveProfile([FromBody]ProfileDetails profileDetails)
        {
            // We should code for the current Time entry in DB
            try
            {
                if (profileDetails != null)
                {
                    string profileFilePath = profileFolderPath + profileDetails.MainDetails.CandidateName + "-" + profileDetails.MainDetails.Email + ".json";
                    var json = new JavaScriptSerializer().Serialize(profileDetails);
                    File.WriteAllText(profileFilePath, json.Replace("undefined", "-").Replace("Unknown", "-"));
                    return Request.CreateResponse(HttpStatusCode.OK, "Profile Saved.");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, "Profile Details does not provided.");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        [HttpGet]
        public HttpResponseMessage ISProfileMatchedWithEmail([FromUri] String email)
        {
            try
            {
                List<string> profiles = Directory.GetFiles(profileFolderPath, "*.json", SearchOption.TopDirectoryOnly).ToList();

                if (profiles.Count == 0)
                    return Request.CreateResponse(HttpStatusCode.OK, "No Profile Saved in DB");

                if (!string.IsNullOrEmpty(email) && profiles.Count != 0)
                {
                    string profile = profiles.Where(s => s.Contains(email)).FirstOrDefault();

                    if (!string.IsNullOrEmpty(profile))
                    {
                        DateTime profileUpdatedTime = File.GetLastWriteTimeUtc(profile);
                        return Request.CreateResponse(HttpStatusCode.OK, profileUpdatedTime);
                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, false);
                    }
                }

                return Request.CreateResponse(HttpStatusCode.NotFound, "No Profile found in matching to email.");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        public HttpResponseMessage LoadProfile([FromUri]String candidateEmail)
        {
            try
            {
                string[] profiles = Directory.GetFiles(profileFolderPath, "*.json", SearchOption.TopDirectoryOnly);

                if (profiles.Length != 0)
                {
                    string profile = profiles.Where(s => s.Contains(candidateEmail)).FirstOrDefault();

                    if (!string.IsNullOrEmpty(profile))
                    {
                        ProfileDetails profileDetails = new JavaScriptSerializer().Deserialize<ProfileDetails>(File.ReadAllText(profile));
                        profileDetails.MainDetails.ProfileSavedOn = File.GetLastWriteTimeUtc(profile).ToLongDateString();
                        return Request.CreateResponse(HttpStatusCode.OK, profileDetails);
                    }
                }
                return Request.CreateResponse(HttpStatusCode.NotFound, "No Profile Found.");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        [HttpGet]
        public HttpResponseMessage GetAllProfiles()
        {
            List<string> profiles = Directory.GetFiles(profileFolderPath, "*.json", SearchOption.TopDirectoryOnly).ToList();
            return Request.CreateResponse(HttpStatusCode.OK, profiles);
        }
    }
}
