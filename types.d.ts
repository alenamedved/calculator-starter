interface QueryParams {
    first: number,
    second: number,
    operation: string,
  }

type Add = (first:number, second:number) => number