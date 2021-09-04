/**
 * Represents the Nomination API endpoints for search and reverse search.
 */
export const NominatimEndpoint = {
	/**
	 * The common search by city name, address, etc.
	 */
	SEARCH: "https://nominatim.openstreetmap.org/search?",

	/**
	 * The reverse search by geolocation.
	 */
	REVERSE_SEARCH: "https://nominatim.openstreetmap.org/reverse?",
};
