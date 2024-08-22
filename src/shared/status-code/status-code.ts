/**
 * HTTP status codes and their respective numeric values.
 *
 * @constant
 * @readonly
 * @enum {number}
 */
export const statusCode = {
  /** The request has succeeded. */
  OK: 200,

  /** The request has succeeded and a new resource has been created as a result. */
  CREATED: 201,

  /** There is no content to send for this request, but the headers may be useful. */
  NO_CONTENT: 204,

  /** The server could not understand the request due to invalid syntax. */
  BAD_REQUEST: 400,

  /** The client must authenticate itself to get the requested response. */
  UNAUTHORIZED: 401,

  /** The client does not have access rights to the content. */
  FORBIDDEN: 403,

  /** The server can not find the requested resource. */
  NOT_FOUND: 404,

  /** This response is sent when a request conflicts with the current state of the server. */
  CONFLICT: 409,

  /** The server has encountered a situation it doesn't know how to handle. */
  INTERNAL_SERVER_ERROR: 500,
} as const;
