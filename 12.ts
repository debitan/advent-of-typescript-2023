type FindSanta<
  Forest extends Array<unknown>,
  Acc extends Array<unknown> = []
> = Forest extends [infer Head, ...infer Tail]
  ? Head extends "🎅🏼"
    ? Acc["length"]
    : FindSanta<Tail, [...Acc, Head]>
  : never;
