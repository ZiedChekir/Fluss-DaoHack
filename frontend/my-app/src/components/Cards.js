import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import axios from 'axios';
import { Web3Storage } from 'web3.storage';


function getAccessToken() {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEU0RDU1OENjNGEyZGU4ODg2MGU0M2JkMDhGNDM3Y2NmMDRGN0Y5Q2IiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDk1MDIyMTQwNjAsIm5hbWUiOiJ0ZXN0In0.maFSn8Y-xBvN8UQhnb_44NHZRVLu90u-E-R-4u089es'
}
function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}
let Object = [];
async function listUploads() {
  const client = makeStorageClient()
  for await (const upload of client.list()) {
    Object.push(retrieveFilesHTTP(upload.cid,upload.name));
   //console.log( retrieveFilesHTTP(upload.cid,upload.name));
  }
  return Object;
}

async function retrieveFilesHTTP(cid) {
 let FileName = "Project.json"
  const a = await axios.get("https://" + cid + ".ipfs.dweb.link/" + FileName);
   return a.data
}

function Cards() {
  let objects = Object;

  return (
    <div className='cards'>
      <h1>Check out these EPIC Projects!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
          {
            objects.map(function(object, i){
              return <CardItem
              src='/images/peepohands.jpeg'
              text='RobinMania'
              label= {object}
              path='/show_proj/'
            />;
          })
          }
            <CardItem
              src='/images/peeposhy.jpg'
              text='A shy peepo'
              label='cute'
              path="/show_proj/"
              id='1'
            />
             <CardItem
              src='/images/peeposhy.jpg'
              text='A shy peepo'
              label='cute'
              path='/Project/'
              id='2'
            />
             <CardItem
              src='/images/peeposhy.jpg'
              text='A shy peepo'
              label='cute'
              path='/services'
              id='3'
            />
             <CardItem
              src='/images/peeposhy.jpg'
              text='A shy peepo'
              label='cute'
              path='/services'
              id='4'
            />
             <CardItem
              src='/images/peeposhy.jpg'
              text='A shy peepo'
              label='cute'
              path='/services'
              id='5'
            />
             <CardItem
              src='/images/peeposhy.jpg'
              text='A shy peepo'
              label='cute'
              path='/services'
              id='6'
            />
          </ul>
        
        </div>
      </div>
    </div>
  );
}

export default Cards;
