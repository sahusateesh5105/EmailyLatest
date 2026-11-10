import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteSurvey, fetchSurveys } from "../../store/slices/surveySlice";

const SurveyList = ({surveys}) => {
 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSurveys());
  }, [dispatch]);

  const renderSurveys = () => {
    return surveys.map((survey) => {
        return (
          <div className="card hoverable pink lighten-5" style={{margin:"20px"}} key={survey._id}>
            <div className="card-content">
              <span className="card-title">{survey.title}</span>
              <p>{survey.body}</p>
              <p className="right">
                Sent On: {new Date(survey.dateSent).toLocaleDateString()}
              </p>
            </div>
            <div className="card-action">
              <a href="#!" onClick={(e) => e.preventDefault()}>
                Yes: {survey.yes}
              </a>
              <a href="#!" onClick={(e) => e.preventDefault()}>
                No: {survey.no}
              </a>
              <button 
                className="btn-flat red lighten-3" 
                style={{marginLeft:'600px'}} 
                onClick={()=> dispatch(deleteSurvey(survey._id))}
              >
                  <i className="material-icons right black-text">delete</i>
                  delete
              </button>
            </div>
          </div>
        );
      });
  };

  return <div>{renderSurveys()}</div>;
};

export default SurveyList;
