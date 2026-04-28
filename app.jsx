import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({name:"",roll:"",date:"",agreed:false});
  const [msg, setMsg] = useState("");

  const handle = e => {
    const {name,type,value,checked} = e.target;
    setForm(f=>({...f,[name]:type==="checkbox"?checked:value}));
  };

  const submit = async e => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
    const data = await res.json();
    setMsg(data.message);
  };

  return (
    <div>
      <h2>Undertaking Form</h2>
      <form onSubmit={submit}>
        <input name="name" placeholder="Full Name" onChange={handle} required/><br/><br/>
        <input name="roll" placeholder="Roll Number" onChange={handle} required/><br/><br/>
        <input name="date" type="date" onChange={handle} required/><br/><br/>
        <label><input type="checkbox" name="agreed" onChange={handle} required/> I agree to abide by all rules.</label><br/><br/>
        <button type="submit">Submit</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
