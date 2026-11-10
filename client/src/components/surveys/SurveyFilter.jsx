import React, { useState } from "react";
import { useSelector } from "react-redux";

const FilterSurveys = ({handleSorting}) => {
    const [isHover,setisHover] = useState(false)

    return (
        <div 
            className="right-align"
            style={{
                margin:"20px"
            }}
            onMouseOver={()=>
                        setisHover(clicked => !clicked)
                    }
            onMouseOut={()=>
                setisHover(clicked => !clicked)
            }
        >
                <div 
                    className="btn pink lighten-3"
                    style={{
                            width: "150px"
                        }}
                    >                           
                    <i className="material-icons right black-text">sort</i>
                    Sort By
                </div>            
                {isHover &&
                    <div>
                        <div>
                            <button className="btn pink lighten-4" 
                                style={{
                                    width: "150px"
                                }}
                                onClick={()=>{
                                    handleSorting("Newest");
                                    setisClicked(clicked => !clicked)
                                }}>
                                <i className="material-icons right black-text">arrow_downward</i>
                                New - Old
                            </button>
                        </div>  
                        <div>
                            <button className="btn pink lighten-4" 
                                style={{
                                    width: "150px"
                                }}
                                onClick={()=>{
                                    handleSorting("Oldest");
                                    setisClicked(clicked => !clicked)
                                }}>
                                <i className="material-icons right black-text">arrow_upward</i>
                                Old - New
                            </button>
                        </div>  
                    </div>                             
                }
                
            </div>
        
    )
}

export default FilterSurveys;