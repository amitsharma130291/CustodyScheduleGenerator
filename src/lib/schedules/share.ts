import { normalizeScheduleType } from './patterns';
import { normalizeEightyTwentyPattern, normalizeSeventyThirtyPattern, normalizeSixtyFortyPattern } from './engine';
import type { RatioSchedulePatternId, ScheduleInputType, ScheduleType } from './types';

export interface ScheduleShareState {
	schedule: ScheduleInputType;
	start: string;
	parentAName: string;
	parentBName: string;
	pattern?: RatioSchedulePatternId;
}

export interface RestoredScheduleShareState {
	schedule: ScheduleType;
	start: string;
	parentAName: string;
	parentBName: string;
	pattern?: RatioSchedulePatternId;
}

export interface ClipboardLike {
	writeText(text: string): Promise<void>;
}

export function buildScheduleShareUrl(baseUrl: string, state: ScheduleShareState) {
	const url = new URL(baseUrl);

	const schedule = normalizeScheduleType(state.schedule);
	url.searchParams.set('schedule', schedule);
	url.searchParams.set('start', state.start);
	url.searchParams.set('a', state.parentAName);
	url.searchParams.set('b', state.parentBName);
	if (schedule === '60-40') {
		url.searchParams.set('pattern', normalizeSixtyFortyPattern(state.pattern));
	} else if (schedule === '70-30') {
		url.searchParams.set('pattern', normalizeSeventyThirtyPattern(state.pattern));
	} else if (schedule === '80-20') {
		url.searchParams.set('pattern', normalizeEightyTwentyPattern(state.pattern));
	} else {
		url.searchParams.delete('pattern');
	}

	return url.toString();
}

export function restoreScheduleStateFromUrl(url: string): RestoredScheduleShareState | null {
	const parsedUrl = new URL(url);
	const schedule = parsedUrl.searchParams.get('schedule');
	const start = parsedUrl.searchParams.get('start');
	const parentAName = parsedUrl.searchParams.get('a');
	const parentBName = parsedUrl.searchParams.get('b');
	const pattern = parsedUrl.searchParams.get('pattern');

	if (!schedule || !start || !parentAName || !parentBName) {
		return null;
	}

	const normalizedSchedule = normalizeScheduleType(schedule);

	return {
		schedule: normalizedSchedule,
		start,
		parentAName,
		parentBName,
		pattern: normalizedSchedule === '60-40'
			? normalizeSixtyFortyPattern(pattern)
			: normalizedSchedule === '70-30'
				? normalizeSeventyThirtyPattern(pattern)
				: normalizedSchedule === '80-20'
					? normalizeEightyTwentyPattern(pattern)
					: undefined,
	};
}

export async function copyShareLink({
	currentUrl,
	clipboard,
	state,
}: {
	currentUrl: string;
	clipboard: ClipboardLike;
	state?: ScheduleShareState;
}) {
	const shareUrl = state ? buildScheduleShareUrl(currentUrl, state) : currentUrl;
	await clipboard.writeText(shareUrl);
	return shareUrl;
}

export function printSchedule(print: () => void) {
	print();
}
