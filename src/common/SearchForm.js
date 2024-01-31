import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ search }) {
  const [searchInput, setSearchInput] = useState("");

  const { searchTerm } = searchInput;

  function handleSubmit(event) {
    event.preventDefault();

    search(searchInput.trim() || undefined);
    setSearchInput(searchInput.trim());
  }

  function handleChange(event) {
    const { value } = event.target;
    setSearchInput(value);
  }
  return (
    <div>
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control"
          type="text"
          name="searchTerm"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Enter Search Term ..."
        />
        <button type="submit" className="btn btn-lg btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SearchForm;