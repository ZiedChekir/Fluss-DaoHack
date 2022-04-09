
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
import { Web3Storage } from 'web3.storage';
import { getFilesFromPath } from 'web3.storage'
import axios from 'axios';
function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEU0RDU1OENjNGEyZGU4ODg2MGU0M2JkMDhGNDM3Y2NmMDRGN0Y5Q2IiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDk1MDIyMTQwNjAsIm5hbWUiOiJ0ZXN0In0.maFSn8Y-xBvN8UQhnb_44NHZRVLu90u-E-R-4u089es'
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

async function getFiles(path) {
  const files = await getFilesFromPath(path)
  console.log(`read ${files.length} file(s) from ${path}`)
  return files
}
import { File } from 'web3.storage';

function makeFileObjects() {
  // You can create File objects from a Buffer of binary data
  // see: https://nodejs.org/api/buffer.html
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  const obj = { title: 'world', Description: "descriptionaaaaa", WalletAdress: "0x2f....", reputation: "0" }
  const buffer = Buffer.from(JSON.stringify(obj))

  const file =
    new File([buffer], 'Project.json')

  return file
}
const namePrefix = "ImageProject"
async function storeImageAndText(imageFile, caption) {

  const file = makeFileObjects();


  // The name for our upload includes a prefix we can use to identify our files later

  const uploadName = [namePrefix, caption].join('|')

  // We store some metadata about the image alongside the image file.
  // The metadata includes the file path, which we can use to generate
  // a URL to the full image.
  const metadataFile = jsonFile('metadata.json', {
    path: imageFile.name,
    caption
  })

  const token = getSavedToken()
  if (!token) {
    showMessage('> ❗️ no API token found for Web3.Storage. You can add one in the settings page!')
    showLink(`${location.protocol}//${location.host}/settings.html`)
    return
  }
  const web3storage = new Web3Storage({ token })
  showMessage(`> 🤖 calculating content ID for ${imageFile.name}`)
  const cid = await web3storage.put([file, imageFile, metadataFile], {
    // the name is viewable at https://web3.storage/files and is included in the status and list API responses
    name: uploadName,

    // onRootCidReady will be called as soon as we've calculated the Content ID locally, before uploading
    onRootCidReady: (localCid) => {
      showMessage(`> 🔑 locally calculated Content ID: ${localCid} `)
      showMessage('> 📡 sending files to web3.storage ')
    },

    // onStoredChunk is called after each chunk of data is uploaded
    onStoredChunk: (bytes) => showMessage(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
  })

  const metadataGatewayURL = makeGatewayURL(cid, 'metadata.json')
  const imageGatewayURL = makeGatewayURL(cid, imageFile.name)
  const imageURI = `ipfs://${cid}/${imageFile.name}`
  const metadataURI = `ipfs://${cid}/metadata.json`
  return { cid, metadataGatewayURL, imageGatewayURL, imageURI, metadataURI }
}


//cid bafybeih5o5j3dbti5q5mbkiprkd2qvqtowazfhnv4cube6h4iqbd4szgyq
async function storeFiles(files) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}

async function retrieveFiles(cid) {
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
async function listUploads() {
  const client = makeStorageClient()
  
  for await (const upload of client.list()) {

   // console.log(`${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}`)
   retrieveFilesHTTP(upload.cid);
  }
}
async function retrieveFilesHTTP(cid) {
  let fileName = "Project.json"
  const a = await axios.get("https://" + cid + ".ipfs.dweb.link/" + fileName);
  console.log( a.data)
}

//storeFiles(makeFileObjects());
//retrieveFilesHTTP("bafybeih5o5j3dbti5q5mbkiprkd2qvqtowazfhnv4cube6h4iqbd4szgyq");

//storeImageAndText()
//storeFiles([makeFileObjects()]);
listUploads();
//  retrieveFiles('bafybeihrm6snki3b3cdx7tv4ups3lzkb4ps66rs5vs6t4vixqhun4sxvda');