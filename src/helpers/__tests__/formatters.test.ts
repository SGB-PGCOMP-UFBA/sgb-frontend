import { formatDate, formatPhone } from '../formatters';

describe('formatDate', () => {
  it('should format the date correctly', () => {
    const date = '2022-01-01T10:00:00Z'
    const formattedDate = formatDate(date)
    expect(formattedDate).toBe('01/01/2022')
  })
})

describe('formatPhone', () => {
  it('should format the phone number correctly', () => {
    const phone = '71940028922';
    const formattedPhone = formatPhone(phone);
    expect(formattedPhone).toBe('(71) 94002-8922');
  });
});
