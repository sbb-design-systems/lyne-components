import fs from 'fs';

/**
 * @param {import("njs-types").NginxHTTPRequest} r
 */
function header(r) {
  const corsString =
    r.headersIn.Origin === 'https://digital.sbb.ch' ||
    r.headersIn.Origin === 'http://localhost:8080'
      ? r.headersIn.Origin
      : '';

  if (corsString) {
    r.headersOut['Access-Control-Allow-Origin'] = corsString;
    r.headersOut['Access-Control-Allow-Methods'] = `GET, POST, PUT, DELETE, OPTIONS`;
  }

  if (r.method === 'OPTIONS') {
    // OPTIONS requests will be cached for a month.
    r.headersOut['Access-Control-Max-Age'] = '2628000';
    return;
  }

  r.headersOut['Cache-Control'] = 'no-cache';

  // Prevents MIME type sniffing from browsers (Recommended by Cyber@SBB)
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/X-Content-Type-Options
  r.headersOut['X-Content-Type-Options'] = 'nosniff';
}

/**
 * @param {import("njs-types").NginxHTTPRequest} r
 */
function spa(r) {
  header(r);

  if (r.method === 'OPTIONS') {
    r.return(204);
    return;
  }

  const normalizedPath = r.variables.document_root + r.uri;
  const indexPath = `${r.variables.document_root}/index.html`;
  const filePath = fs.statSync(normalizedPath, { throwIfNoEntry: false })?.isFile()
    ? normalizedPath
    : indexPath;

  if (!filePath.endsWith('.html')) {
    return;
  }

  const nonce = crypto.randomUUID();
  r.headersOut['Content-Type'] = 'text/html';
  r.headersOut['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains; preload';
  r.headersOut['Content-Security-Policy'] =
    `default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'nonce-${nonce}'; font-src 'self' https://cdn.app.sbb.ch/; connect-src 'self' https://icons.app.sbb.ch/; frame-ancestors 'self' https://digital.sbb.ch; img-src 'self' data: https://cdn.img.sbb.ch;`;
  let content = fs.readFileSync(filePath, 'utf-8');
  const legacyVersions = process.env.LEGACY_VERSIONS;
  if (legacyVersions) {
    content = content.replace(
      '</head>',
      `<meta name="legacy-versions" content="${legacyVersions}" /></head>`,
    );
  }
  content = content.replaceAll('<script', `<script nonce="${nonce}"`);
  r.return(200, content);
}

export default { spa, header };
