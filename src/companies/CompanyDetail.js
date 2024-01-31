import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api/api";
import JobCardList from "../jobs/JobCardList";
import LoadingSpinner from "../common/LoadingSpinner";

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState({
    name: "",
    description: "",
    handle: "",
    jobs: [],
  });

  useEffect(
    function getCompanyAndJobs() {
      async function getCompanyDetail() {
        let company = await JoblyApi.getCompany(handle);
        setCompany(company);
      }
      getCompanyDetail();
    },
    [handle]
  );

  if (!company) return <LoadingSpinner />;

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );
}
export default CompanyDetail;