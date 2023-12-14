type SantasList<
  Bads extends readonly unknown[],
  Goods extends readonly unknown[]
> = [...Bads, ...Goods];
