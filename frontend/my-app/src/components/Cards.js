import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import axios from 'axios';
import { Web3Storage } from 'web3.storage';

function populateCards(){
  for (let index = 0; index < 5; index++) {
    return (<CardItem
      src='/images/peepohappy.jpg'
      text='CoinFlip'
      label='Crypto'
      path='/services'
    />)

  }
}
function getAccessToken() {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEU0RDU1OENjNGEyZGU4ODg2MGU0M2JkMDhGNDM3Y2NmMDRGN0Y5Q2IiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDk1MDIyMTQwNjAsIm5hbWUiOiJ0ZXN0In0.maFSn8Y-xBvN8UQhnb_44NHZRVLu90u-E-R-4u089es'
}
function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}
async function listUploads() {
  const client = makeStorageClient()
  
  for await (const upload of client.list()) {

     console.log(`${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}`)
   //console.log( retrieveFilesHTTP(upload.cid,upload.name));
  }
}
async function retrieveFilesHTTP(cid,name) {
  
  const a = await axios.get("https://" + cid + ".ipfs.dweb.link/" + name);
  console.log( a.data)
}

function Cards() {
let objects = []

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
              path='/services'
            />;
          })
          }
            
            <CardItem
              src='/images/peeposhy.jpg'
              text='A shy peepo'
              label='cute'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='/images/peepohey.png'
              text='A random peepo chillin'
              label='cute'
              path='/products'
            />
            <CardItem
              src='/images/peepoblanket.jpg'
              text='peepo in his element'
              label='cute'
              path='/sign-up'
            />
            <CardItem
              src='/images/peepolove.png'
              text='peepo giving y all some love'
              label='cute'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
