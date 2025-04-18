/**
 * Represents the weekdays as relative indices starting from today.
 * 
 * - `FIRST` represents "Today".
 * - `SECOND` represents "Tomorrow".
 * - `THIRD` represents the day after tomorrow.
 * - ..
 * 
 * This enum is used to calculate weekdays dynamically based on the current date.
 */
export enum Weekday {
	FIRST,
	SECOND,
	THIRD,
	FOURTH,
	FIFTH,
	SIXTH,
	SEVENTH,
}
