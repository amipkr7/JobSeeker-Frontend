import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Application = () => {
  
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [coverLetter,setCoverLetter]=useState("");
  const [phone,setPhone]=useState("");
  const [address,setAddress]=useState("");
  const [resume,setResume]=useState(null);

  const {isAuthorized,user} =useContext(Context);

  const navigateTo=useNavigate();

  const handleFileChange =(e)=>{
    const resume=e.target.files[0];
    setResume(resume);
  }

  const {id}=useParams();
  const handleApplication = async(e)=>{
    e.preventDeafault();
    const formData=new FormData();
    formData.append("name",name);
    formData.append("email",email);
    formData.append("phone",phone);
    formData.append("address",address);
    formData.append("coverLetter",coverLetter);
    formData.append("resume",resume);
    formData.append("jobId",id);

    try{
      const {data}=await axios.post("http://localhost:5000/api/v1/application/post ",formData,{
        withCredentials:true,
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setResume("");
      setAddress("");
      alert(data.message);
      navigateTo("/job/getall")
    }
    catch(error){
      alert(error.response.data.message);
    }

    if(!isAuthorized ||(user && user.role==="Employer"))
    {
      navigateTo("")
    }
  }


  return (
    <section className='application'>
      <div className="container">
        <h3>Application Form</h3>
        <form onSubmit={handleApplication}>
          <input type="text" placeholder='Your Name' value={name} onChange={(e)=>setName(e.target.value)}/>
          <input type="text" placeholder='Your Email' value={email} onChange={(e)=>setName(e.target.value)}/>
          <input type="number" placeholder='Your Phone' value={phone} onChange={(e)=>setName(e.target.value)}/>
          <input type="text" placeholder='Your Address' value={address} onChange={(e)=>setName(e.target.value)}/>
          <textarea  value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)} placeholder='Enter CoverLetter' rows="10"></textarea>
          <div>
            <label style={{textAlign:"start", display:"block", fontSize:"20px"}}>
              Select Resume
            </label>
            <input type="file" accept='.jpg, .png, .webp' onChange={handleFileChange}/>
          </div>
          <button type='submit'>Send Application</button>
        </form>
      </div>
    </section>
  )
}

export default Application
