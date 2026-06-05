import { normalizeScheduleType } from './patterns';
import type { ScheduleInputType, ScheduleType } from './types';

export interface ScheduleShareState {
	schedule: ScheduleInputType;
	start: string;
	parentAName: string;
	parentBName: string;
}

export interface RestoredScheduleShareState {
	schedule: ScheduleType;
	start: string;
	parentAName: string;
	parentBName: string;
}

export interface ClipboardLike {
	writeText(text: string): Promise<void>;
}

export function buildScheduleShareUrl(baseUrl: string, state: ScheduleShareState) {
	const url = new URL(baseUrl);

	url.searchParams.set('schedule', normalizeScheduleType(state.schedule));
	url.searchParams.set('start', state.start);
	url.searchParams.set('a', state.parentAName);
	url.searchParams.set('b', state.parentBName);

	return url.toString();
}

export function restoreScheduleStateFromUrl(url: string): RestoredScheduleShareState | null {
	const parsedUrl = new URL(url);
	const schedule = parsedUrl.searchParams.get('schedule');
	const start = parsedUrl.searchParams.get('start');
	const parentAName = parsedUrl.searchParams.get('a');
	const parentBName = parsedUrl.searchParams.get('b');

	if (!schedule || !start || !parentAName || !parentBName) {
		return null;
	}

	return {
		schedule: normalizeScheduleType(schedule),
		start,
		parentAName,
		parentBName,
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
