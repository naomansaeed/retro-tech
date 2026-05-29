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
        // Log the error in catch block
        console.error(`❌ Failed to read ${req.url}: ${error.message}`);

        if (error.code === 'ENOENT') {
            //File not found → serve custom 404 page
            const notFoundPath = path.join(publicDir,'404.html');
            try {
                const content404 = await fs.readFile(notFoundPath);
                sendResponse(res, 404, 'text/html', content404);
            } catch (err) {
                // Fallback if 404.html is also missing
                const fallback404 = '<html><body><h1>404 - File Not Found</h1></body></html>';
                sendResponse(res, 404, 'text/html', fallback404);
            }
        } else {
            // Any other error → serve 500 response
            const errorHtml = `<html><body><h1>500 - Server Error</h1><p>${error.message}</p></body></html>`;
            sendResponse(res, 500, 'text/html', errorHtml);
        }
    }
    
}