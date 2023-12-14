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
