// The Readonly<> utility type could replace the use of readonly on the key
type SantaListProtector<ArbitaryType> = {
  readonly [Key in keyof ArbitaryType]: ArbitaryType[Key] extends
    | Record<string, unknown>
    | unknown[]
    ? SantaListProtector<ArbitaryType[Key]>
    : ArbitaryType[Key];
};
