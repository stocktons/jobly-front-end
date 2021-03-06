import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";
import SearchBox from "./SearchBox";

/**  Makes API call to show all companies or filter specific companies 
 *   by name.
 * 
 *   State:
 *   - companies: array of company objects, like 
 *    [ { handle, name, description, numEmployees, logoUrl }, ...]
 *   - isLoading: boolean to show if the API call is in progress
 *   - companyName: string search term entered by user
 * 
 *   App -> Routes -> CompanyList -> [SearchBox, CompanyCard]
*/
function CompanyList() {

  const [companies, setCompanies] = useState([]);

  async function search(companyName) {
    let companiesResults = await JoblyApi.request(`companies?name=${companyName}`);
    setCompanies(companiesResults.companies);
  }

  useEffect(function getCompaniesWhenMounted() {
    async function getCompanies() {
      let companiesResults = await JoblyApi.request('companies')
      setCompanies(companiesResults.companies);
    }
    getCompanies();
  }, []);

  if (companies.length === 0) return <i>Loading...</i>;

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchBox search={search} />
      {companies.length
        ? (
          <div className="CompanyList-list">
            {companies.map(company =>
              <CompanyCard
                key={company.handle}
                company={company}
              />
            )}
          </div>
        ) : (
          <p className="lead">Sorry, no results were found!</p>
        )}
    </div>
  );
}

export default CompanyList;