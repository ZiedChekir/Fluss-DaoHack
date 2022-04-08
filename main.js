
//index.js
  
// import express from 'express';
  
// const app = express();
  
// app.get('/',(req,res) => {
//     res.send('GeeksforGeeks');
// })
  
// const PORT = 5000;
  
// app.listen(PORT,() => {
//     console.log(`Running on PORT ${PORT}`);
// })
import  {Web3Storage}  from 'web3.storage';
import { getFilesFromPath } from 'web3.storage'
import  axios from 'axios';
function getAccessToken () {
    // If you're just testing, you can paste in a token
    // and uncomment the following line:
    // return 'paste-your-token-here'
  
    // In a real app, it's better to read an access token from an
    // environement variable or other configuration that's kept outside of
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdkQzQ0RkUzMDRFNjZFZGU3YWYwNmMxMGEyMEY2NzQ3NUUwQzMyOGIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDkyMDA2NzgxNzUsIm5hbWUiOiJkYW9oYWNrIn0.tzCJ0Vxtmdzd_UpeNWVGRU-IgQRsuNvPYG0gQ63dWGs'
  }
  
  function makeStorageClient () {
    return new Web3Storage({ token: getAccessToken() })
  }

  async function getFiles (path) {
    const files = await getFilesFromPath(path)
    console.log(`read ${files.length} file(s) from ${path}`)
    return files
  }
  import  {File}  from 'web3.storage';

  function makeFileObjects () {
    // You can create File objects from a Buffer of binary data
    // see: https://nodejs.org/api/buffer.html
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const obj = { title: 'world',Description:"descriptionaaaaa", WalletAdress:"0x2f....",reputation:"0" }
    const buffer = Buffer.from(JSON.stringify(obj))
  
    const files = [
      new File([buffer], 'helloo.json')
    ]
    return files
  }

  //cid bafybeih5o5j3dbti5q5mbkiprkd2qvqtowazfhnv4cube6h4iqbd4szgyq
  async function storeFiles (files) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    return cid
  }

  async function retrieveFiles (cid) {
    const client = makeStorageClient()
    const res = await client.get(cid)
    console.log(`Got a response! [${res.status}] ${res.statusText}`)
    if (!res.ok) {
      throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
    }
  
    // unpack File objects from the response
    const files = await res.files()
    for (const file of files) {
        console.log(file)
      console.log(`${file.cid} -- ${file.name} -- ${file.size}`)
    }
  }
 async function listUploads () {
    const client = makeStorageClient()
    for await (const upload of client.list()) {
      console.log(`${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}`)
    }
  }
  async function retrieveFilesHTTP( cid){
      let fileName = "helloo.json"
     const a = await axios.get("https://"+cid+".ipfs.dweb.link/"+fileName);
     return a.data
  }

  //storeFiles(makeFileObjects());
  retrieveFilesHTTP("bafybeiajvbycqc5s3brdjaicypkefcocvixkulycitmetk42ghlksc5ywy");

  //listUploads();
  //retrieveFiles('bafybeih5o5j3dbti5q5mbkiprkd2qvqtowazfhnv4cube6h4iqbd4szgyq');