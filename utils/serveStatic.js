import path from 'node:path';
import fs from 'node:fs/promises';
import { sendResponse } from './sendResponse.js';
import { getContentType } from './getContentType.js';

export async function serveStatic(req, res, baseDir) {

    // isolating the path of public directory
    const publicDir = path.join(baseDir, 'public');

    // implementing ternary operator to serve index.html or other requested files
    const filePath = path.join(
            publicDir, 
            req.url === '/' ? 'index.html' : req.url
            );
    
    // using extname method to extract the file extention type
    const ext = path.extname(filePath);

    const contentType = getContentType(ext);
    
    try {
        const content = await fs.readFile(filePath);
        sendResponse(res, 200, contentType, content); 
    } catch (error) {
        //Challenge requirement: Log the error in catch block
        console.error('❌ Failed to read index.html:', error.message);
    }
    
}