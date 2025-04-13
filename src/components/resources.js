import React, { useState, useEffect } from "react";
import { FaBook, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "./Navbar";
import "./resources.css";

const regionalResources = {
  Scotland: {
    carer: [
      { title: "Carers Trust Scotland", link: "https://carers.org/scotland" },
      { title: "Young Scot", link: "https://young.scot" },
      { title: "Support for Carers", link: "https://www.careinfoscotland.scot" },
      { title: "Scottish Young Carers Services Alliance", link: "https://www.carers.org/scotland/young-carers" },
      { title: "Mental Health Foundation Scotland", link: "https://www.mentalhealth.org.uk/scotland" },
      { title: "ParentZone Scotland", link: "https://education.gov.scot/parentzone" },
    ],
    teacher: [
      { title: "Education Scotland", link: "https://education.gov.scot" },
      { title: "Carers Trust Scotland", link: "https://carers.org/scotland" },
      { title: "Scottish Government Education", link: "https://www.gov.scot/policies/schools/" },
      { title: "Professional Learning Resource for Teachers", link: "https://education.gov.scot/improvement/professional-learning" },
      { title: "Supporting Young Carers in Schools", link: "https://carers.org/young-carers-in-schools" },
    ],
  },
  England: {
    carer: [
      { title: "Carers UK", link: "https://www.carersuk.org" },
      { title: "The Children's Society", link: "https://www.childrenssociety.org.uk" },
      { title: "Carers Trust England", link: "https://carers.org/england" },
      { title: "Barnardo's Young Carers", link: "https://www.barnardos.org.uk/what-we-do/supporting-young-carers" },
      { title: "Mind - Mental Health Support", link: "https://www.mind.org.uk" },
      { title: "Young Minds", link: "https://youngminds.org.uk" },
    ],
    teacher: [
      { title: "Gov.uk Education", link: "https://www.gov.uk/education" },
      { title: "Department for Education (DfE)", link: "https://www.gov.uk/government/organisations/department-for-education" },
      { title: "Carers Trust England", link: "https://carers.org/england" },
      { title: "Supporting Young Carers in Schools", link: "https://carers.org/young-carers-in-schools" },
      { title: "TES Teaching Resources", link: "https://www.tes.com/teaching-resources" },
    ],
  },
  Wales: {
    carer: [
      { title: "Carers Wales", link: "https://www.carersuk.org/wales" },
      { title: "Family Action Wales", link: "https://www.family-action.org.uk" },
      { title: "Young Carers Network Wales", link: "https://www.youngcarers.wales" },
      { title: "Mind Cymru", link: "https://www.mind.org.uk/about-us/mind-cymru/" },
      { title: "Youth Cymru", link: "https://www.youthcymru.org.uk" },
    ],
    teacher: [
      { title: "Welsh Government Education", link: "https://gov.wales/education-skills" },
      { title: "Carers Trust Wales", link: "https://carers.org/wales" },
      { title: "Learning Wales", link: "http://learning.gov.wales" },
    ],
  },
  "Northern Ireland": {
    carer: [
      { title: "Carers NI", link: "https://www.carersuk.org/northernireland" },
      { title: "Young Carers NI", link: "https://www.youngcarersni.org" },
      { title: "Action for Children NI", link: "https://www.actionforchildren.org.uk" },
    ],
    teacher: [
      { title: "Department of Education NI", link: "https://www.education-ni.gov.uk" },
      { title: "Carers Trust NI", link: "https://carers.org/northern-ireland" },
      { title: "Education Authority NI", link: "https://www.eani.org.uk" },
    ],
  },
};

const Resources = () => {
  const [role, setRole] = useState("");
  const [region, setRegion] = useState("Scotland");

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    console.log("Stored role:", storedRole);
    setRole(storedRole);
  }, []);

  return (
    <div className="resources-page">
      <Navbar />
      <div className="resources-container">
        <h1 className="resources-header">Support & Guidance Hub</h1>

        {/* Region Selector */}
        <div className="region-selector">
          <label htmlFor="region"><FaMapMarkerAlt /> Select Your Region:</label>
          <select id="region" value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="Scotland">Scotland</option>
            <option value="England">England</option>
            <option value="Wales">Wales</option>
            <option value="Northern Ireland">Northern Ireland</option>
          </select>
        </div>

        <div className="resource-cards">
          {regionalResources[region][role]?.map((item, index) => (
            <div key={index} className="resource-card">
              <h3><FaBook /> {item.title}</h3>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="learn-more">Learn More</a>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="home-footer">
        <p>&copy; 2025 CareConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Resources;