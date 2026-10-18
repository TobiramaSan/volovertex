import { handleJourneyRequest } from '../server/handler.js';

export function POST(request) {
  return handleJourneyRequest(request);
}
