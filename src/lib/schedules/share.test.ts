import { describe, expect, it, vi } from 'vitest';
import { generateVisibleMonthSchedule } from './engine';
import { buildScheduleShareUrl, copyShareLink, printSchedule, restoreScheduleStateFromUrl } from './share';

describe('schedule share and print actions', () => {
	it('builds a share URL with schedule, start date, Parent A, and Parent B', () => {
		const url = buildScheduleShareUrl('https://custodyschedulegenerator.com/', {
			schedule: '223',
			start: '2026-06-01',
			parentAName: 'Parent A',
			parentBName: 'Parent B',
		});

		expect(url).toBe('https://custodyschedulegenerator.com/?schedule=223&start=2026-06-01&a=Parent+A&b=Parent+B');
	});

	it('copy link writes the current URL when no explicit state is provided', async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);
		const currentUrl = 'https://example.com/?schedule=2255&start=2026-06-01&a=Alex&b=Jordan';

		const copiedUrl = await copyShareLink({
			currentUrl,
			clipboard: { writeText },
		});

		expect(copiedUrl).toBe(currentUrl);
		expect(writeText).toHaveBeenCalledWith(currentUrl);
	});

	it('copy link writes a generated share URL when state is provided', async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);

		const copiedUrl = await copyShareLink({
			currentUrl: 'https://example.com/',
			clipboard: { writeText },
			state: {
				schedule: 'week-on-week-off',
				start: '2026-06-05',
				parentAName: 'Alex',
				parentBName: 'Jordan',
			},
		});

		expect(copiedUrl).toBe('https://example.com/?schedule=week-on-week-off&start=2026-06-05&a=Alex&b=Jordan');
		expect(writeText).toHaveBeenCalledWith(copiedUrl);
	});

	it('copy link can generate a share URL from a clean page URL', async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);

		const copiedUrl = await copyShareLink({
			currentUrl: 'https://example.com/50-50-custody-schedule',
			clipboard: { writeText },
			state: {
				schedule: '223',
				start: '2026-08-01',
				parentAName: 'Parent A',
				parentBName: 'Parent B',
			},
		});

		expect(copiedUrl).toBe('https://example.com/50-50-custody-schedule?schedule=223&start=2026-08-01&a=Parent+A&b=Parent+B');
		expect(writeText).toHaveBeenCalledWith(copiedUrl);
	});

	it('normalizes 60/40 share links to the canonical schedule id', () => {
		const url = buildScheduleShareUrl('https://example.com/60-40-custody-schedule', {
			schedule: '60/40',
			start: '2026-06-01',
			parentAName: 'Alex',
			parentBName: 'Jordan',
		});

		expect(url).toBe('https://example.com/60-40-custody-schedule?schedule=60-40&start=2026-06-01&a=Alex&b=Jordan&pattern=4-3');
		expect(restoreScheduleStateFromUrl(url)).toMatchObject({
			schedule: '60-40',
			pattern: '4-3',
		});
	});

	it('preserves selected 60/40 pattern in share links', () => {
		const url = buildScheduleShareUrl('https://example.com/60-40-custody-schedule', {
			schedule: '60-40',
			start: '2026-06-01',
			parentAName: 'Alex',
			parentBName: 'Jordan',
			pattern: 'extended-weekend',
		});

		expect(url).toBe('https://example.com/60-40-custody-schedule?schedule=60-40&start=2026-06-01&a=Alex&b=Jordan&pattern=extended-weekend');
		expect(restoreScheduleStateFromUrl(url)).toMatchObject({
			schedule: '60-40',
			pattern: 'extended-weekend',
		});
	});

	it('print action calls window.print-compatible callback', () => {
		const print = vi.fn();

		printSchedule(print);

		expect(print).toHaveBeenCalledOnce();
	});

	it('restored query params reproduce schedule, names, calendar coloring data, and stats', () => {
		const restored = restoreScheduleStateFromUrl('https://example.com/?schedule=5225&start=2026-06-05&a=Alex&b=Jordan');

		expect(restored).toEqual({
			schedule: '5225',
			start: '2026-06-05',
			parentAName: 'Alex',
			parentBName: 'Jordan',
		});

		const schedule = generateVisibleMonthSchedule({
			scheduleType: restored!.schedule,
			startDate: restored!.start,
			monthDate: restored!.start,
			parentAName: restored!.parentAName,
			parentBName: restored!.parentBName,
		});

		expect(schedule.days[0]).toMatchObject({
			date: '2026-06-05',
			parent: 'A',
			parentName: 'Alex',
		});
		expect(schedule.days.some((day) => day.parent === 'B' && day.parentName === 'Jordan')).toBe(true);
		expect(schedule.summary).toEqual({
			parentADays: 14,
			parentBDays: 12,
			parentAPercentage: 54,
			parentBPercentage: 46,
			totalDays: 26,
		});
	});
});
