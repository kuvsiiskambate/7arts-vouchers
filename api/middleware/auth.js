/**
 * Admin Authentication Middleware
 * Защитава административни endpoints с API key или Basic Auth
 */

/**
 * API Key Authentication
 * Използва X-API-Key header
 */
export function apiKeyAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }

  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ error: 'Invalid API key' });
  }

  next();
}

/**
 * Basic Authentication
 * Използва username и password
 */
export function basicAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({
      error: 'Authentication required',
      message: 'Please provide valid credentials'
    });
  }

  try {
    // Decode Base64
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    // Провери credentials
    const validUsername = process.env.ADMIN_USERNAME;
    const validPassword = process.env.ADMIN_PASSWORD;

    if (username !== validUsername || password !== validPassword) {
      return res.status(403).json({ error: 'Invalid credentials' });
    }

    // Добави username към request за logging
    req.adminUser = username;
    next();

  } catch (error) {
    return res.status(401).json({ error: 'Invalid authentication format' });
  }
}

/**
 * Комбинирана auth - поддържа и двата метода
 */
export function adminAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  const authHeader = req.headers.authorization;

  // Опитай API key auth първо
  if (apiKey) {
    return apiKeyAuth(req, res, next);
  }

  // Fallback към Basic Auth
  if (authHeader) {
    return basicAuth(req, res, next);
  }

  return res.status(401).json({
    error: 'Authentication required',
    message: 'Provide either X-API-Key header or Basic Auth credentials'
  });
}
