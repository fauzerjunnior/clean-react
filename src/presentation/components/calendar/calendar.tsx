import React from 'react';
import * as Helper from '@/presentation/helper';
import Styles from './calendar-styles.scss';

type Props = {
  date: Date;
  className?: string;
};

const Calendar: React.FC<Props> = ({ date, className }: Props) => {
  return (
    <time className={[Styles.calendarWrap, className].join(' ')}>
      <span data-testid="day" className={Styles.day}>
        {Helper.formatDay(date)}
      </span>
      <span data-testid="month" className={Styles.month}>
        {Helper.formatMonth(date)}
      </span>
      <span data-testid="year" className={Styles.year}>
        {Helper.formatYear(date)}
      </span>
    </time>
  );
};

export default Calendar;
