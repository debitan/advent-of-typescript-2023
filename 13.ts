type Enumerate<
  Count extends number,
  Counter extends number[] = []
> = Counter["length"] extends Count
  ? Counter[number]
  : Enumerate<Count, [...Counter, Counter["length"]]>;

type DayCounter<FirstDay extends number, LastDay extends number> =
  | Exclude<Enumerate<LastDay>, Enumerate<FirstDay>>
  | LastDay;

// Enumerate<12>, Enumarate<1>

// [0]
// [0, 1]
// [0, 1, 2]
// [0, 1, 2, 3]
// [0, 1, 2, 3, 4]
// [0, 1, 2, 3, 4, 5]
// [0, 1, 2, 3, 4, 5, 6]
// [0, 1, 2, 3, 4, 5, 6, 7]
// [0, 1, 2, 3, 4, 5, 6, 7, 8]
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
// return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

// Exclude<[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], Enumerate<FirstDay>>

// [0]
// return [0]

// Exclude<[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0]>

// returns [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

// return a union of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] and 12

// TESTS
import { Expect, Equal } from "type-testing";

type TwelveDaysOfChristmas = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type test_0_actual = DayCounter<1, 12>;
//   ^?
type test_0_expected = TwelveDaysOfChristmas;
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type DaysUntilChristmas =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25;
type test_1_actual = DayCounter<1, 25>;
//   ^?
type test_1_expected = DaysUntilChristmas;
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;
