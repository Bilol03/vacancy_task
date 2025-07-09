/**
 * Butun ilova bo'ylab ishlatiladigan konstantalar
 */

export const DATABASE = {
  SYNC_TIMEOUT_MS: 2000
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
};

export const AUTH = {
  TOKEN_EXPIRY: '1h',
  JWT_ALGORITHM: 'HS256'
};

export const ROUTES = {
  API_PREFIX: '/api',
  VERSION: 'v1'
};
