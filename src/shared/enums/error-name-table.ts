import { statusCode } from "../status-code/status-code";

export const errorNamesToStatusCode = {
  CANNOT_UPDATE: statusCode.INTERNAL_SERVER_ERROR,
  OK: statusCode.OK,
  CREATED: statusCode.CREATED,
  NO_CONTENT: statusCode.NO_CONTENT,
  BAD_REQUEST: statusCode.BAD_REQUEST,
  UNAUTHORIZED: statusCode.UNAUTHORIZED,
  FORBIDDEN: statusCode.FORBIDDEN,
  NOT_FOUND: statusCode.NOT_FOUND,
  CONFLICT: statusCode.CONFLICT,
  INTERNAL_SERVER_ERROR: statusCode.INTERNAL_SERVER_ERROR,
};
