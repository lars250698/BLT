export function padToSize<T>(arr: Array<T>, filler: T, size: number): Array<T> {
  for (let i = arr.length; i < size; i++) {
    arr.push(filler)
  }
  return arr
}
