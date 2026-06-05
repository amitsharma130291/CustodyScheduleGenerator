import { format } from 'date-fns';
import { describe, expect, it } from 'vitest';
import { getDefaultStartDate } from './format';

describe('schedule date formatting helpers', () => {
	it('defaults to today in yyyy-MM-dd format', () => {
		expect(getDefaultStartDate()).toBe(format(new Date(), 'yyyy-MM-dd'));
	});
});
