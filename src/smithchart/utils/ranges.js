// https://stackoverflow.com/a/66902484
export function linspace(start, stop, num, endpoint = true) {
    const div = endpoint ? (num - 1) : num
    const step = (stop - start) / div
    return Array.from({ length: num }, (_, i) => start + step * i)
}
