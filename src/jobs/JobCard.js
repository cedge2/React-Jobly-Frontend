import React, { useEffect, useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import "./JobCard.css";

function JobCard({ id, title, salary, equity, companyName }) {
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);

  const [applied, setApplied] = useState();

  useEffect(
    function updateAppliedStatus() {
      setApplied(hasAppliedToJob(id));
    },
    [id, hasAppliedToJob]
  );

  async function handleApply(event) {
    if (hasAppliedToJob(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    <div className="card">
      <div className="container">
        <h4 className="card-title">{title}</h4>
        <p className="company-name"> {companyName}</p>
        {salary && (
          <div>
            <small>Salary: {addCommasToSalary(salary)}</small>
          </div>
        )}
        {equity !== undefined && (
          <div>
            <small>Equity: {equity}</small>
          </div>
        )}

        <button className="apply-btn" onClick={handleApply} disabled={applied}>
          {applied ? "APPLIED" : "APPLY"}
        </button>
      </div>
    </div>
  );
}

function addCommasToSalary(salary) {
  const salaryToString = salary.toString();
  let str = "";

  for (let i = salaryToString.length - 1; i >= 0; i--) {
    str += salaryToString.charAt(i);
  }

  let n = 3;
  let insertChar = ",";
  let outputString = ""; 
  let reverseArray = []; 

  for (let i = 0; i < str.length; i += n) {
    let slice = str.substring(i, n + i);
    if (slice.length === n) {
      outputString = outputString.concat(slice, insertChar);
    }
    else if ((slice.length === n && str.length <= n) || slice.length !== n) {
      outputString = outputString.concat(slice);
    }
  }
  let splitString = outputString.split("");

  reverseArray = splitString.reverse();

  if (reverseArray[0] === ",") {
    reverseArray.shift();
    let joinArray = reverseArray.join("");
    return joinArray;
  } else {
    let joinArray = reverseArray.join("");
    return joinArray;
  }
}

export default JobCard;