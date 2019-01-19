export function flatten(arr) {
  return arr.reduce(function(prev, next) {
    return prev.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
}
export function toPercent(point) {
  var str = Number(point * 100).toFixed(2);
  // str += "%";
  return str;
}
