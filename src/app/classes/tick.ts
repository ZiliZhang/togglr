import { DateTime } from 'luxon';

export class Tick {
    tickInAt: DateTime;
    tockOutAt: DateTime;
    duration: number;
    note: string;
}
