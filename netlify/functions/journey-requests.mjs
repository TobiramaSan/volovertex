import { handleJourneyRequest } from '../../server/handler.js';

export default (request) => handleJourneyRequest(request);

export const config = { path: '/api/journey-requests' };
