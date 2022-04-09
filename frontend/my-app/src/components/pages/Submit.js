import React from 'react';
import '../../App.css';
import { useState } from "react";

export default function Submit() {
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target[0].value)
    console.log(event.target[1].value)
    console.log(event.target[2].value)
    console.log(event.target[3].value)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Title:
        <input type="text" name="title" value={inputs.title || ""} onChange={handleChange} />
      </label>
      <label>Description:
        <input type="text" name="description" value={inputs.description || ""} onChange={handleChange} />
      </label>
      <label>Address:
        <input type="text" name="address" value={inputs.address || ""} onChange={handleChange} />
      </label>
      <label>Image:
        <input type="file" name="img" value={inputs.img || ""} onChange={handleChange} />
      </label>
        <input type="submit" />
    </form>
  )
}
