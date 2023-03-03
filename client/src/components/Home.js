import { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import Loading from "./Loading";

const Home = ({setResult}) => {
  const [fullName, setFullName] = useState("");
  const [currentPosition,setCurrentPosition]=useState("");
  const [currentLength,setCurrentLength]=useState(1);
  const [currentTechnologies,setCurrentTechnologies]=useState("");
  const [headshot,setHeadshot]=useState(null);
  const [companyInfo, setCompanyInfo] = useState([{ name: "", position: "" }]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()

   // updates the state with user's input
   const handleAddCompany = () => {
    setCompanyInfo([...companyInfo, { name: "", position: "" }]);
  };

  // removes a selected item from the list
  const handleRemoveCompany = (index) => {
    const list = [...companyInfo];
    list.splice(index, 1);
    setCompanyInfo(list);
  };

  // updates an item within the list
  const handleUpdateCompany = (e, index) => {
    const { name, value } = e.target;
    const list = [...companyInfo];
    list[index][name] = value;
    setCompanyInfo(list);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData=new FormData();
    formData.append("headshotImage",headshot,headshot.name);
    formData.append("fullName",fullName);
    formData.append("currentPosition",currentPosition);
    formData.append("currentLength",currentLength);
    formData.append("currentTechnologies",currentTechnologies);
    formData.append("workHistory",JSON.stringify(companyInfo))
    console.log('formData',formData)
    axios.post("http://localhost:4001/resume/create",formData,{}).then((res)=>{
        if(res.data.message){
            // updates the result object
            setResult(res.data.data)
            console.log('res.data.message',res.data.message);
            navigate("/resume")
        }
    }).catch((err)=>console.error(err))
    setLoading(true);
  };

  // Renders the Loading component you submit the form
  if (loading) return <Loading />;

  return (
    <div className="app">
      <h1>Resume Builder</h1>
      <p>Generate a resume with ChatGPT in few seconds</p>
      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="fullName">Enter your full name</label>
        <input
          type="text"
          required
          name="fullName"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <div className="nestedContainer">
            <div>
                <label htmlFor="currentPosition">Current Position</label>
                <input type="text" required name="currentPosition" id="currentPosition" value={currentPosition} onChange={(e)=>setCurrentPosition(e.target.value)} />
            </div>
            <div>
                <label htmlFor="currentLength">For how long? (year)</label>
                <input type="number" required className="currentInput" value={currentLength} onChange={(e)=>setCurrentLength(e.target.value)} />
            </div>
            <div>
                <label htmlFor="currentTechnologies">Technologies</label>
                <input type="text" required name="currentTechnologies" id="currentTechnologies" className="currentInput" value={currentTechnologies} onChange={(e)=>setCurrentTechnologies(e.target.value)} />
            </div>
        </div>
        <label htmlFor='photo'>Upload your headshot image</label>
        <input type="file" name="photo" id="photo" required accept="image/x-png,image/jpeg" onChange={(e)=>setHeadshot(e.target.files[0])} />
        <h3>Companies you've worked at</h3>   
        {companyInfo.map((company, index) => (
          <div className="nestedContainer" key={index}>
            <div className="companies">
              <label htmlFor="name">Company Name</label>
              <input
                type="text"
                name="name"
                required
                onChange={(e) => handleUpdateCompany(e, index)}
              />
            </div>
            <div className="companies">
                <label htmlFor="position">Position Held</label>
                <input type="text" name="position" required onChange={(e)=>handleUpdateCompany(e,index)} />
            </div>
            <div className="btn_group">
               {companyInfo.length -1 === index && companyInfo.length <4 && (<button id="addBtn" onClick={handleAddCompany}>Add</button>)}
               {companyInfo.length >1 && (<button id="deleteBtn" onClick={()=>handleRemoveCompany(index)}>Del</button>)}
            </div>
          </div>
        ))}
        <button>CREATE RESUME</button>
      </form>
    </div>
  );
};
export default Home;
