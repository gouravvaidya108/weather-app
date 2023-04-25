import { MONTHS, DAYS } from './DateConstants';

const date: Date = new Date();

export function getWeekDays(): string[] {
  const dayInAWeek: number = new Date().getDay();
  const days: string[] = [...DAYS.slice(dayInAWeek), ...DAYS.slice(0, dayInAWeek)];
  return days;
}

export function getDayMonthFromDate(): string {
  const month: string = MONTHS[date.getMonth()].slice(0, 3);
  const day: number = date.getUTCDate();
  return `${day} ${month}`;
}

export function transformDateFormat(): string {

 date.setDate(date.getDate() + 1); 


  const month: string = date.toLocaleString('en-US', { month: '2-digit' });
  const day: string = date.toLocaleString('en-US', { day: '2-digit' });
  const year: number = date.getFullYear();
  const time: string = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  });

  const newFormatDate: string = `${year}-${month}-${day} ${time}`;
  return newFormatDate;
}

export function getUTCDatetime(): string {
  const utcTime: string = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: 'UTC',
  });

  const isoDateString: string = new Date().toISOString();
  const utcDate: string = `${isoDateString.split('T')[0]} ${utcTime}`;
  return utcDate;
}

export function getUTCTime(): string {
  const utcTime: string = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
    timeZone: 'UTC',
  });

  return utcTime;
}


function getOrdinalSuffix(n: number): string {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  }
  
  export function getCurrentDateFormatted(): string {
    const currentDate = new Date();
    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentDate);
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const ordinalSuffix = getOrdinalSuffix(day);
  
    return `${weekday}, ${month} ${day}${ordinalSuffix} ${year}`;
  }

  export function capitalize(text: string): string {
    if (!text) {
      return '';
    }
    const firstChar = text.charAt(0);
    return `${firstChar.toUpperCase()}${text.slice(1)}`;
  }