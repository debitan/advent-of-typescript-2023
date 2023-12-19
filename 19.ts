type Gifts = ["🛹", "🚲", "🛴", "🏄"];

type WorkOutIndex<Index> = Index extends 0
  ? 1
  : Index extends 1
  ? 2
  : Index extends 2
  ? 3
  : Index extends 3
  ? 0
  : never;

type NumberOfGifts<
  Number,
  Index extends number,
  $Acc extends Array<unknown> = []
> = $Acc["length"] extends Number
  ? $Acc
  : NumberOfGifts<Number, Index, [...$Acc, Gifts[Index]]>;

type Rebuild<
  List,
  $Acc extends Array<unknown> = [],
  $Index extends number = 0
> = List extends [infer Head, ...infer Tail]
  ? Rebuild<
      Tail,
      [...$Acc, ...NumberOfGifts<Head, $Index>],
      WorkOutIndex<$Index>
    >
  : $Acc;

// TESTS
import { Expect, Equal } from "type-testing";

type test_0_actual = Rebuild<[2, 1, 3, 3, 1, 1, 2]>;
type test_0_expected = [
  "🛹",
  "🛹",
  "🚲",
  "🛴",
  "🛴",
  "🛴",
  "🏄",
  "🏄",
  "🏄",
  "🛹",
  "🚲",
  "🛴",
  "🛴"
];
type test_0 = Expect<Equal<test_0_expected, test_0_actual>>;

type test_1_actual = Rebuild<[3, 3, 2, 1, 2, 1, 2]>;
type test_1_expected = [
  "🛹",
  "🛹",
  "🛹",
  "🚲",
  "🚲",
  "🚲",
  "🛴",
  "🛴",
  "🏄",
  "🛹",
  "🛹",
  "🚲",
  "🛴",
  "🛴"
];
type test_1 = Expect<Equal<test_1_expected, test_1_actual>>;

type test_2_actual = Rebuild<[2, 3, 3, 5, 1, 1, 2]>;
type test_2_expected = [
  "🛹",
  "🛹",
  "🚲",
  "🚲",
  "🚲",
  "🛴",
  "🛴",
  "🛴",
  "🏄",
  "🏄",
  "🏄",
  "🏄",
  "🏄",
  "🛹",
  "🚲",
  "🛴",
  "🛴"
];
type test_2 = Expect<Equal<test_2_expected, test_2_actual>>;
