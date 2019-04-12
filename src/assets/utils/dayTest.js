import dayjs from 'dayjs'

import calendar from 'dayjs/plugin/calendar'


let time = '2019-04-11T07:54:59.623+0000';
dayjs.extend(calendar)

dayjs().calendar(time)