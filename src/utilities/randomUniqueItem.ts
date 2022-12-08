export default function (array: string[]) {
    const options = Math.floor(Math.random() * array.length);
    const removed = array.splice(options, 1);
    return removed[0];
}