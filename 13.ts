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
