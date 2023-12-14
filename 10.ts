type StreetSuffixTester<
  Address extends string,
  Suffix extends string
> = Address extends `${string}${Suffix}` ? true : false;
