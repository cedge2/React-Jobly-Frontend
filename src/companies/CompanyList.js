import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import "./CompanyList.css";
import LoadingSpinner from "../common/LoadingSpinner";

function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(function getAllCompaniesOnRender() {
    search();
  }, []);

  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  if (!companies) {
    return <LoadingSpinner />;
  }

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchForm search={search} />
      {companies.length ? (
        <div className="CompanyList-list">
          {companies.map((company) => (
            <CompanyCard
              key={company.handle}
              handle={company.handle}
              name={company.name}
              description={company.description}
              logoUrl={company.logoUrl}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}
export default CompanyList;