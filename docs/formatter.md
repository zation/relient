# Formatter

Relient provides common formatters to display date, time, price and percentage.

### date, time

date

```js
(formatter = 'YYYY-MM-DD') => (date: Date | String | Number) => String
```

time

```js
(formatter = 'YYYY-MM-DD HH:mm:ss') => (time: Date | String | Number) => String
```

Format any value which could be parsed to date into formatted date with predefined formatter:

| Unit                            | Pattern | Result examples                   | Notes |
|---------------------------------|---------|-----------------------------------|-------|
| Era                             | G..GGG  | AD, BC                            |       |
|                                 | GGGG    | Anno Domini, Before Christ        | 2     |
|                                 | GGGGG   | A, B                              |       |
| Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
|                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
|                                 | yy      | 44, 01, 00, 17                    | 5     |
|                                 | yyy     | 044, 001, 1900, 2017              | 5     |
|                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
|                                 | yyyyy   | ...                               | 3,5   |
| Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
|                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
|                                 | YY      | 44, 01, 00, 17                    | 5     |
|                                 | YYY     | 044, 001, 1900, 2017              | 5     |
|                                 | YYYY    | 0044, 0001, 1900, 2017            | 5     |
|                                 | YYYYY   | ...                               | 3,5   |
| ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
|                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
|                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
|                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
|                                 | RRRRR   | ...                               | 3,5,7 |
| Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
|                                 | uu      | -43, 01, 1900, 2017               | 5     |
|                                 | uuu     | -043, 001, 1900, 2017             | 5     |
|                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
|                                 | uuuuu   | ...                               | 3,5   |
| Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
|                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
|                                 | QQ      | 01, 02, 03, 04                    |       |
|                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
|                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
|                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
| Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
|                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
|                                 | qq      | 01, 02, 03, 04                    |       |
|                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
|                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
|                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
| Month (formatting)              | M       | 1, 2, ..., 12                     |       |
|                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
|                                 | MM      | 01, 02, ..., 12                   |       |
|                                 | MMM     | Jan, Feb, ..., Dec                |       |
|                                 | MMMM    | January, February, ..., December  | 2     |
|                                 | MMMMM   | J, F, ..., D                      |       |
| Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
|                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
|                                 | LL      | 01, 02, ..., 12                   |       |
|                                 | LLL     | Jan, Feb, ..., Dec                |       |
|                                 | LLLL    | January, February, ..., December  | 2     |
|                                 | LLLLL   | J, F, ..., D                      |       |
| Local week of year              | w       | 1, 2, ..., 53                     |       |
|                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
|                                 | ww      | 01, 02, ..., 53                   |       |
| ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
|                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
|                                 | II      | 01, 02, ..., 53                   | 7     |
| Day of month                    | d       | 1, 2, ..., 31                     |       |
|                                 | do      | 1st, 2nd, ..., 31st               | 7     |
|                                 | dd      | 01, 02, ..., 31                   |       |
| Day of year                     | D       | 1, 2, ..., 365, 366               |       |
|                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
|                                 | DD      | 01, 02, ..., 365, 366             |       |
|                                 | DDD     | 001, 002, ..., 365, 366           |       |
|                                 | DDDD    | ...                               | 3     |
| Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Su            |       |
|                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
|                                 | EEEEE   | M, T, W, T, F, S, S               |       |
|                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
| ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
|                                 | io      | 1st, 2nd, ..., 7th                | 7     |
|                                 | ii      | 01, 02, ..., 07                   | 7     |
|                                 | iii     | Mon, Tue, Wed, ..., Su            | 7     |
|                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
|                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
|                                 | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 7     |
| Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
|                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
|                                 | ee      | 02, 03, ..., 01                   |       |
|                                 | eee     | Mon, Tue, Wed, ..., Su            |       |
|                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
|                                 | eeeee   | M, T, W, T, F, S, S               |       |
|                                 | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
| Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
|                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
|                                 | cc      | 02, 03, ..., 01                   |       |
|                                 | ccc     | Mon, Tue, Wed, ..., Su            |       |
|                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
|                                 | ccccc   | M, T, W, T, F, S, S               |       |
|                                 | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
| AM, PM                          | a..aaa  | AM, PM                            |       |
|                                 | aaaa    | a.m., p.m.                        | 2     |
|                                 | aaaaa   | a, p                              |       |
| AM, PM, noon, midnight          | b..bbb  | AM, PM, noon, midnight            |       |
|                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
|                                 | bbbbb   | a, p, n, mi                       |       |
| Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
|                                 | BBBB    | at night, in the morning, ...     | 2     |
|                                 | BBBBB   | at night, in the morning, ...     |       |
| Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
|                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
|                                 | hh      | 01, 02, ..., 11, 12               |       |
| Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
|                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
|                                 | HH      | 00, 01, 02, ..., 23               |       |
| Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
|                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
|                                 | KK      | 1, 2, ..., 11, 0                  |       |
| Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
|                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
|                                 | kk      | 24, 01, 02, ..., 23               |       |
| Minute                          | m       | 0, 1, ..., 59                     |       |
|                                 | mo      | 0th, 1st, ..., 59th               | 7     |
|                                 | mm      | 00, 01, ..., 59                   |       |
| Second                          | s       | 0, 1, ..., 59                     |       |
|                                 | so      | 0th, 1st, ..., 59th               | 7     |
|                                 | ss      | 00, 01, ..., 59                   |       |
| Fraction of second              | S       | 0, 1, ..., 9                      |       |
|                                 | SS      | 00, 01, ..., 99                   |       |
|                                 | SSS     | 000, 0001, ..., 999               |       |
|                                 | SSSS    | ...                               | 3     |
| Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
|                                 | XX      | -0800, +0530, Z                   |       |
|                                 | XXX     | -08:00, +05:30, Z                 |       |
|                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
|                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
| Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
|                                 | xx      | -0800, +0530, +0000               |       |
|                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
|                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
|                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
| Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
|                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
| Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
|                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
| Seconds timestamp               | t       | 512969520                         | 7     |
|                                 | tt      | ...                               | 3,7   |
| Milliseconds timestamp          | T       | 512969520900                      | 7     |
|                                 | TT      | ...                               | 3,7   |
| Long localized date             | P       | 05/29/1453                        | 7     |
|                                 | PP      | May 29, 1453                      | 7     |
|                                 | PPP     | May 29th, 1453                    | 7     |
|                                 | PPPP    | Sunday, May 29th, 1453            | 2,7   |
| Long localized time             | p       | 12:00 AM                          | 7     |
|                                 | pp      | 12:00:00 AM                       | 7     |
|                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
|                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
| Combination of date and time    | Pp      | 05/29/1453, 12:00 AM              | 7     |
|                                 | PPpp    | May 29, 1453, 12:00 AM            | 7     |
|                                 | PPPppp  | May 29th, 1453 at ...             | 7     |
|                                 | PPPPpppp| Sunday, May 29th, 1453 at ...     | 2,7   |

### price

```js
({ currency = '￥', digit = 2, defaultDisplay = '--' }) => (value: Number) => String
```

* currency: The currency symbol
* digit: The digit to keep
* defaultDisplay: the default display when value is not a valid number

### percentage

```js
({ digit = 2, symbol = '%', defaultDisplay = '--' }) => (value: Number) => String
```
* symbol: The percentage symbol
* digit: The digit to keep
* defaultDisplay: the default display when value is not a valid number
