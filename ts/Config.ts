import {RateLimitsConfig} from "./types";
import path = require("path");

export default class Config {
	/** A Riot Games API key (https://developer.riotgames.com/) */
	public static readonly riotApiKey: string = process.env.RIOT_API_KEY;

	/** Riot API key rate limits */
	public static readonly rateLimits: RateLimitsConfig = {
		/** Application rate limits for the API key. Intervals are in seconds. */
		application: [
			// Default development key limits
			/*
			{interval: 10, maxRequests: 10},
			{interval: 600, maxRequests: 500}
			*/

			// Default production key limits
			{interval: 10, maxRequests: 3000},
			{interval: 600, maxRequests: 180000}
		],
		/** Method rate limits for the API key. Intervals are in seconds. */
		method: {
			summoner: [
				{interval: 1, maxRequests: 2000}
			],
			championMastery: [
				{interval: 1, maxRequests: 2000}
			]
		}
	};

	public static readonly announcement: {message: string, link: string} = {
		/** A message that should be displayed at the top of every page on the site. If set to a falsy value, no message will be displayed */
		message: process.env.ANNOUNCEMENT_MESSAGE,
		/** The URL the message should link to. If set to a falsy value, the message will not link to anything. Has no effect if no message is displayed */
		link: process.env.ANNOUNCEMENT_LINK
	};

	/** If a message should be logged to the console every time a summoner's ranking changes on the highscores */
	public static readonly logHighscoreChanges: boolean = true;
	/** If a message should be logged to the console every time the name or score of a summoner on the highscores is updated (but the summoner's position does not change) and when the highscores file is saved */
	public static readonly logHighscoreUpdates: boolean = false;
	/**
	 * If errors from the API that are non-critical (not occurring during startup) and unexpected (e.g. does not include a 404 when looking up a summoner by name) should be logged.
	 * Does not log 429 errors caused by exceeded user rate limit
	 */
	public static readonly logApiErrors: boolean = true;

	/** The IP address to listen on */
	public static readonly serverAddress: string = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
	/** The port to listen on */
	public static readonly serverPort: number = process.env.OPENSHIFT_NODEJS_PORT || 8080;

	/** How long responses from each API should be cached for (in seconds). */
	public static readonly cacheDurations = {
		summoner: 3600,
		championMastery: 600
	};

	/** How many highscores to use for each champion */
	public static readonly highscoreCount: {display: number, track: number} = {
		/** How many scores should be displayed to users */
		display: 20,
		/** How many scores should be kept on the list */
		track: 30
	};

	/** Where the highscore data JSON file should be saved */
	public static readonly highscoreDataPath: string = path.join((process.env.OPENSHIFT_DATA_DIR || path.join(__dirname, "..")), "highscoreData.json");
	/** How often to save highscores to a file (in seconds) */
	public static readonly saveInterval: number = 120;

	/** How often to update list of available champions (in minutes) */
	public static readonly staticDataUpdateInterval = 60;
}
