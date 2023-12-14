type FilterOutStartingWith<
  FullString,
  Prefix extends string
> = FullString extends `${Prefix}${infer _RestOfString}` ? never : FullString;

type RemoveNaughtyChildren<SantasList> = {
  [Key in keyof SantasList as FilterOutStartingWith<
    Key,
    "naughty_"
  >]: SantasList[Key];
};

// TESTS
import { Expect, Equal } from "type-testing";

type SantasList = {
  naughty_tom: { address: "1 candy cane lane" };
  good_timmy: { address: "43 chocolate dr" };
  naughty_trash: { address: "637 starlight way" };
  naughty_candace: { address: "12 aurora" };
};
type test_wellBehaved_actual = RemoveNaughtyChildren<SantasList>;
//   ^?
type test_wellBehaved_expected = {
  good_timmy: { address: "43 chocolate dr" };
};
type test_wellBehaved = Expect<
  Equal<test_wellBehaved_expected, test_wellBehaved_actual>
>;

type Unrelated = {
  dont: "cheat";
  naughty_play: "fair";
};
type test_Unrelated_actual = RemoveNaughtyChildren<Unrelated>;
//   ^?
type test_Unrelated_expected = {
  dont: "cheat";
};
type test_Unrelated = Expect<
  Equal<test_Unrelated_expected, test_Unrelated_actual>
>;
