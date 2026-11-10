import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SurveyList from './surveys/SurveyList';
import FilterSurveys from './surveys/SurveyFilter';

const Dashboard = () => {
  const surveys = useSelector((state) => state.surveys);
  const [sortedSurveys,setSortedSurveys] = useState([])
  
  useEffect(()=>{
   setSortedSurveys(surveys)
  },[surveys])
  
  const handleSorting =(option) =>{
    if(option==='Newest'){
      setSortedSurveys(surveys.toReversed());
    }else if(option === 'Oldest') {
      setSortedSurveys(surveys);
    }
  }
  
  return (
    <div className=''>
      {sortedSurveys.length?
          <FilterSurveys handleSorting={handleSorting}/>:
          <div style={{ textAlign: 'center' }}> 
            <h4>
              No Surveys Yet!<br/>
              Start adding it now below.
            </h4>
          </div> 
      }
      <SurveyList surveys={sortedSurveys} />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red pulse">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
