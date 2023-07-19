import appImage from "../Images/todo.png";
const AppImageComponent = () =>{
    return(
        <div className="app-image-div">
           <img src={appImage} alt="ToDo Image" className="app-img"></img>
        </div>
    )
}


export default AppImageComponent;