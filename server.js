import http from 'node:http';
import { serveStatic } from './utils/serveStatic.js';


const PORT = 3001;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req,res) => {

     await serveStatic(req, res, __dirname);

   
  
});

server.listen(PORT, () => console.log(`Listening at ${PORT}`));

/*  try {
        // 1️⃣ Get the absolute path to index.html
        const pathToResource = serveStatic(__dirname);
        // 2️⃣ Read file asynchronously as a Buffer
        const content = //await fs.readFile(pathToResource);
        
        sendResponse(res, 200, 'text/html', content); 
    } catch (error) {
        // 3️⃣ Challenge requirement: Log the error in catch block
        console.error('❌ Failed to read index.html:', error.message);
    } */