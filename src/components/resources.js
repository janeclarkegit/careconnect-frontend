import React, { useState, useEffect } from "react";
import { FaBook, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "./Navbar";
import "./resources.css";

// Resource links organised by UK region and user role
const regionalResources = {
  Scotland: {
    carer: [
      { title: "Carers Trust Scotland", link: "https://carers.org/scotland" },
      { title: "Young Scot", link: "https://young.scot/" },
      { title: "Support for Carers", link: "https://www.careinfoscotland.scot/topics/support-for-carers/" },
      { title: "Scottish Young Carers Services Alliance", link: "https://carers.org/scotland/young-carers" },
      { title: "Mental Health Foundation Scotland", link: "https://www.mentalhealth.org.uk/scotland" },
      { title: "ParentZone Scotland", link: "https://education.gov.scot/parentzone/" },
    ],
    teacher: [
      { title: "Education Scotland", link: "https://education.gov.scot/" },
      { title: "Carers Trust Scotland", link: "https://carers.org/scotland" },
      { title: "Scottish Government Education", link: "https://www.gov.scot/policies/schools/" },
      { title: "Professional Learning Resource for Teachers", link: "https://education.gov.scot/professional-learning" },
      { title: "Supporting Young Carers in Schools", link: "https://carers.org/young-carers-in-schools" },
    ],
  },
  // Other regions omitted here for brevity (England, Wales, Northern Ireland)
};

// Main Resources component
const Resources = () => {
  const [role, setRole] = useState(""); // Tracks user role (carer or educator)
  const [region, setRegion] = useState("Scotland"); // Default region

  useEffect(() => {
    // Load stored role from localStorage to personalise resources
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  return (
    <div className="resources-page">
      <Navbar />

      <div className="resources-container">
        <h1 className="resources-header">Support & Guidance Hub</h1>

        {/* Dropdown to allow users to select their UK region */}
        <div className="region-selector">
          <label htmlFor="region">
            <FaMapMarkerAlt /> Select Your Region:
          </label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <option value="Scotland">Scotland</option>
            <option value="England">England</option>
            <option value="Wales">Wales</option>
            <option value="Northern Ireland">Northern Ireland</option>
          </select>
        </div>

        {/* Display role-specific and region-specific resources */}
        <div className="resource-cards">
          {regionalResources[region][role]?.map((item, index) => (
            <div key={index} className="resource-card">
              <h3>
                <FaBook /> {item.title}
              </h3>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="learn-more"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Simple footer */}
      <footer className="home-footer">
        <p>&copy; 2025 CareConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Resources;