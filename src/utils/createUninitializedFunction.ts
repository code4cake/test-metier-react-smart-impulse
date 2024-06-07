export function createUninitializedFunction(name: string): () => never {
  return () => {
    throw new Error(`${name} was called before it was initialized`);
  };
}
