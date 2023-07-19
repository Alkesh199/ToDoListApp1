import AppImageComponent from "./AppImageComponent";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ToDo = () =>{
    const [inputData,setInputData] = useState("");
    const [todoList,setToDoList] = useState([]);
    const [completedTaskList,setCompleteTaskList] = useState([]);
    const [deletedTaskList,setDeletedTaskList] = useState([]);

    console.log(deletedTaskList);

    const updateInputData = (e) =>{
        setInputData(e.target.value);
    }

    const updateItemList = () =>{
        if(inputData.length>0){
            setToDoList([...todoList,inputData]);
        }
        else{
            setToDoList([...todoList]);
        }
         
         setInputData("");
    }

    const clearItems = () =>{
        if(todoList.length>0){
            setDeletedTaskList([...deletedTaskList,...todoList]);
        }
       
        setToDoList([]);

        
    }

    const itemDeleteHandler = (itemIndex) =>{
        const filteredList = todoList.filter((ele,index)=>index!==itemIndex);
        setToDoList(filteredList);
        const filteredDeletedList = todoList.filter((ele,index)=>index==itemIndex);
        setDeletedTaskList([...deletedTaskList,filteredDeletedList]);
    }
    
    const itemCompleteHandler = (itemIndex) =>{
        const filteredList = todoList.filter((ele,index)=>index!==itemIndex);
        setToDoList(filteredList);
        const filteredCompletedList = todoList.filter((ele,index)=>index==itemIndex);
        setCompleteTaskList([...completedTaskList,filteredCompletedList]);
    }


    return(
        <div className="inner-container">
               <AppImageComponent></AppImageComponent>
               <p className="heading">Save Your Goal Here....</p>
               <div className="list-main-div">
                    <div className="add-text-div">
                        <input type="text"  value={inputData} placeholder="type here to add text" onChange={updateInputData}></input>
                        <FontAwesomeIcon icon={faPlus} className="plusIcon icons" onClick={updateItemList}/>
                    </div>
                    {todoList.length>0 && <p className = "heading">To Do Items: </p>}

                    {todoList.map((ele,index)=>{
                        return(
                            <div className="list-item-div">
                         <p>{ele}</p>
                         <FontAwesomeIcon icon={faTrash} className="icons" onClick={()=>itemDeleteHandler(index)}/>
                         <FontAwesomeIcon icon={faCheckCircle} className="checkIcon icons" onClick={()=>itemCompleteHandler(index)} />
                </div>
                        );
                         
                    })}

                  <div className="button-div">
                    <button type="button" onClick={clearItems}>Clear All Items</button>
                  </div>

                  <hr></hr>
                 {deletedTaskList.length==0 ? <p className = "heading">There is No Deleted Task Till Now.</p> : <p className = "heading">Deleted Task List </p>} 
                  {deletedTaskList.map((ele,index)=>{
                        return(
                            <div className="list-item-div deletedTaskDiv">
                                  <p>{ele}</p>
                            </div>
                        );
                         
                    })}
                
                <hr></hr>
              
              { completedTaskList.length==0 ? <p className = "heading">There is No Completed Task Till Now.</p> : <p className = "heading">Completed Task List </p> }
              
               {completedTaskList.map((ele,index)=>{
                     return(
                         <div className="list-item-div completedTaskDiv">
                               <p>{ele}</p>
                         </div>
                     );
                      
                 })}



                    
                    
               </div>
        </div>
    )
}

export default ToDo;
