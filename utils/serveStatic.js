import path from 'node:path';
import fs from 'node:fs/promises';
import { sendResponse } from './sendResponse.js';
export async function serveStatic(req, res, baseDir) {

    const filePath = path.join(baseDir, 'public', 'index.html');
    
    try {
        const content = await fs.readFile(filePath);
        return sendResponse(res, 200, 'text/html', content); 
    } catch (error) {
        //Challenge requirement: Log the error in catch block
        console.error('❌ Failed to read index.html:', error.message);
    }
    //return filePath;
}