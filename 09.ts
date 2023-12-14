type Reverse<Word extends string> =
  // recursively called until the Tail is empty and just the Word is returned
  Word extends `${infer Head}${infer Tail}` ? `${Reverse<Tail>}${Head}` : Word;
