// Mapping object that links file extensions to their standard MIME types
const MIME_TYPES = {
  '.html': 'text/html',
  '.htm':  'text/html',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.mjs':  'text/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.svg':  'image/svg+xml',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.pdf':  'application/pdf',
  '.txt':  'text/plain',
  '.xml':  'application/xml'
};

/**
 * Returns the correct MIME type for a given file extension.
 * This is used by serveStatic.js to set the `Content-Type` HTTP header.
 * 
 * @param {string} ext - File extension including the dot (e.g., '.css', '.png')
 * @returns {string} The corresponding MIME type string
 */
export function getContentType(ext) {
  // path.extname() preserves the original casing, but HTTP/MIME specs are case-insensitive.
  // Converting to lowercase ensures '.CSS' and '.css' resolve to the same type.
  const normalizedExt = ext.toLowerCase();

  // Return the mapped type if it exists, otherwise fall back to a generic binary stream.
  // 'application/octet-stream' tells the browser to treat it as a downloadable file.
  return MIME_TYPES[normalizedExt] || 'application/octet-stream';
}