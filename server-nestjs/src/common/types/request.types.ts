import type { Request } from "express";

/**
 * Request with loggable request ID
 *
 * NOTE: Requires request ID to be set by global middleware
 */
export interface LoggedRequest extends Request {
  /**
   * Request correlation ID
   *
   * Attached at request initiation and can be used to associate various logs/events with each other
   *   based on the 'req.requestId'.
   */
  requestId: string;
}
