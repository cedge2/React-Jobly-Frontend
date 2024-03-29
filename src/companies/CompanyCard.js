import React from "react";
import { Link } from "react-router-dom";

import "./CompanyCard.css";

function CompanyCard({ handle, name, description, logoUrl }) {
  return (
    <Link className="CompanyCard-link" to={`/companies/${handle}`}>
      <div className="card">
        <h4 className="card-name">{name}</h4>
        <h5 className="description">{description}</h5>
        <h5 className="logo">
          {logoUrl && (
            <img src={logoUrl} alt={name} className="float-right ml-5" />
          )}
        </h5>
      </div>
    </Link>
  );
}
export default CompanyCard;