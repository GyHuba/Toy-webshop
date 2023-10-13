import { useEffect, useState } from "react";
import "../css/components/image.css"
import { TbArrowBigRightFilled } from "react-icons/tb";
import { TbArrowBigLeftFilled } from "react-icons/tb";


export default function ImagePagination (props){
   
      const [picsIndex,setPicsIndex]=useState(props.defaultSelected);

      useEffect(() => {
        const interval = setTimeout(() => {
          next()
        }, 5000);
        return () => clearTimeout(interval);
      }, [picsIndex]);
    

      return(
        <div className="img-container">
        
            <img src={props.images[picsIndex].imgPath} title={props.images[picsIndex].title} alt={props.images[picsIndex].description} className="image"/>
           
            <div className="pagination"> 
                <div>{props.images[picsIndex].description}</div>
                {/* <button className="arrow-btn" onClick={(next)}><TbArrowBigLeftFilled/></button>
                <button className="arrow-btn" onClick={(back)}><TbArrowBigRightFilled/></button>  */}
            </div>
           
       </div>
      )

    function next(){
         if (picsIndex === props.images.length - 1){
            setPicsIndex(0);
        } else {
            setPicsIndex(picsIndex+1)
        } 
    }

    function back(){
        if (picsIndex<=0){
            setPicsIndex(3);;
        } else {
            setPicsIndex(picsIndex-1)
        }
    }
}