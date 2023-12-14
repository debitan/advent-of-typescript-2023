type DecipherNaughtyList<
  List extends string,
  Acc extends string[] = []
> = List extends `${infer Name}/${infer Rest}`
  ? DecipherNaughtyList<Rest, [...Acc, Name]>
  : Acc[number] | List;
