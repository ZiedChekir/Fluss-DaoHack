import React, { useEffect, useLayoutEffect, useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import axios from 'axios';
import { Web3Storage } from 'web3.storage';





function Cards() {
  const [data, setData] = useState([]);

  function getAccessToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEU0RDU1OENjNGEyZGU4ODg2MGU0M2JkMDhGNDM3Y2NmMDRGN0Y5Q2IiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDk1MDIyMTQwNjAsIm5hbWUiOiJ0ZXN0In0.maFSn8Y-xBvN8UQhnb_44NHZRVLu90u-E-R-4u089es'
  }
  function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() })
  }
  useEffect(async() => {
    let arrayy = [];
    const client = makeStorageClient()
    for await (const upload of client.list()) {
      //Object.push(retrieveFilesHTTP(upload.cid,upload.name));
      let FileName = "Project.json"
      const x = await axios.get("https://" + upload.cid + ".ipfs.dweb.link/" + FileName)
      arrayy.push(x.data);
    }
    setData(arrayy);
  }, []);




  async function listUploads() {
    const client = makeStorageClient()
    for await (const upload of client.list()) {
      //Object.push(retrieveFilesHTTP(upload.cid,upload.name));
      retrieveFilesHTTP(upload.cid);
    }

  }

  async function retrieveFilesHTTP(cid) {
    let FileName = "Project.json"
    const x = await axios.get("https://" + cid + ".ipfs.dweb.link/" + FileName)

  }

function a (){
  console.log(data[0].title);
}
let p = ["hi", "ssss"]
  return (
    <ul>

      {data.map(x=>(<li>{x}</li>))}
    </ul>
  );
}

export default Cards;
