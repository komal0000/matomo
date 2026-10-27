/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { shiftDateByPeriod } from './PeriodSelector.helpers';

describe('PeriodSelector.helpers', () => {
  describe('shiftDateByPeriod', () => {
    const shiftMonth = (date: string, direction: number) => {
      const shiftedDate = shiftDateByPeriod(new Date(`${date}T00:00:00`), 'month', direction);
      return [shiftedDate.getFullYear(), shiftedDate.getMonth() + 1];
    };

    it('moves to the adjacent month when the date is the last day of a long month', () => {
      expect(shiftMonth('2026-08-31', 1)).toEqual([2026, 9]);
      expect(shiftMonth('2026-01-31', 1)).toEqual([2026, 2]);
      expect(shiftMonth('2026-03-31', -1)).toEqual([2026, 2]);
      expect(shiftMonth('2026-12-31', 1)).toEqual([2027, 1]);
    });

    it('moves to the adjacent month from a mid-month date', () => {
      expect(shiftMonth('2026-08-15', 1)).toEqual([2026, 9]);
      expect(shiftMonth('2026-01-15', -1)).toEqual([2025, 12]);
    });
  });
});
