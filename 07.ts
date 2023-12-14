type AppendGood<List extends Record<string, unknown>> = {
  [Key in string & keyof List as `good_${Key}`]: List[Key];
};
