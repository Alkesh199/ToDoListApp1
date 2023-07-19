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
    const [showNoTaskError,setShowNoTaskError] = useState(false);

    console.log(deletedTaskList);

    const updateInputData = (e) =>{
        setInputData(e.target.value);
    }

    const updateItemList = () =>{
        if(inputData.length>0){
            setToDoList([...todoList,inputData]);
            setShowNoTaskError(false);
        }
        // else{
        //     setToDoList([...todoList]);
        // }
         
         setInputData("");
    }

    const clearItems = () =>{
        if(todoList.length>0){
            setDeletedTaskList([...deletedTaskList,...todoList]);
            
        }

        if(todoList.length==0){
            //need to add error message
            setShowNoTaskError(true);
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
   
     
    //add item back to todoList and remove it from  deletedTaskList
    const backToDoDeletedHandler = (itemIndex) =>{
        const newItem = deletedTaskList[itemIndex];
        setToDoList([...todoList,newItem]);
        setShowNoTaskError(false);
        //remove itemIndex element from deletedTaskList
        const newDeletedTaskList = deletedTaskList.filter((ele,index)=>index!=itemIndex);
        setDeletedTaskList(newDeletedTaskList);
    }

    const backToDoCompletedHandler = (itemIndex) =>{
        const newItem = completedTaskList[itemIndex];
        setToDoList([...todoList,newItem]);
        setShowNoTaskError(false);
        //remove itemIndex element from deletedTaskList
        const newCompletedTaskList = completedTaskList.filter((ele,index)=>index!=itemIndex);
        setCompleteTaskList(newCompletedTaskList);
    }



    
    return(
        <div className="inner-container">
               <AppImageComponent></AppImageComponent>
               <p className="heading">Save Your Goal Here....</p>
               <div className="list-main-div">
                    <div className="add-text-div">
                        <input type="text"  value={inputData} placeholder="type here to add text" maxLength={60} onChange={updateInputData}></input>
                        <FontAwesomeIcon icon={faPlus} className="plusIcon icons" onClick={updateItemList}/>
                    </div>
                    {inputData.length>0 ? <p className="char-limit-text">Remaining char to add : <span>{60-inputData.length}</span></p> : <p className="max-char-text">Max char Limit : 60</p>}
                    {todoList.length>0 && <p className = "heading">To Do Items: </p>}

                    {todoList.map((ele,index)=>{
                        return(
                            <div className="list-item-div" key={index}>      
                         <p>{ele}</p>
                         <FontAwesomeIcon icon={faTrash} className="icons" onClick={()=>itemDeleteHandler(index)}/>
                         <FontAwesomeIcon icon={faCheckCircle} className="checkIcon icons" onClick={()=>itemCompleteHandler(index)} />
                </div>
                        );
                         
                    })}

                  <div className="button-div">
                    {showNoTaskError && <p className="no-task-error"><span>there is no task to clear, please add some task</span></p>}
                    <button type="button" onClick={clearItems}>Clear All Items</button>
                  </div>

                  <hr></hr>
                 {deletedTaskList.length==0 ? <p className = "heading">There is No Deleted Task Till Now.</p> : <p className = "heading">Deleted Task List </p>} 
                  {deletedTaskList.map((ele,index)=>{
                        return(
                            <div className="list-item-div deletedTaskDiv" key={index}>
                                  <p>{ele}</p>
                                  <FontAwesomeIcon icon={faPlus} className="plusIcon icons" onClick={()=>backToDoDeletedHandler(index)}/>
                            </div>
                        );
                         
                    })}
                
                <hr></hr>
              
              { completedTaskList.length==0 ? <p className = "heading">There is No Completed Task Till Now.</p> : <p className = "heading">Completed Task List </p> }
              
               {completedTaskList.map((ele,index)=>{
                     return(
                         <div className="list-item-div completedTaskDiv">
                               <p>{ele}</p>
                               <FontAwesomeIcon icon={faPlus} className="plusIcon icons" onClick={()=>backToDoCompletedHandler(index)}/>
                         </div>
                     );
                      
                 })}



                    
                    
               </div>
        </div>
    )
}

export default ToDo;
