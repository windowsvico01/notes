/**
 * @param str {string} 要计算的字符串，全角为1，半角为0.5
 */
export const countNum = (str) => {
  let count = 0;
  const re = /[\u4e00-\u9fa5]/;
  const uFF61 = 0xFF61;
  const uFF9F = 0xFF9F;
  const uFFE8 = 0xFFE8;
  const uFFEE = 0xFFEE;
  if (str) {
    for (let i = 0, len = str.length; i < len; i += 1) {
      if (re.test(str[i])) {
        count += 1;
      } else {
        const c = +str.charCodeAt(i);
        if (c < 256) {
          count += 0.5;
        } else if ((uFF61 <= c) && (c <= uFF9F)) {
          count += 0.5;
        } else if ((uFFE8 <= c) && (c <= uFFEE)) {
          count += 0.5;
        } else {
          count += 1;
        }
      }
    } }
  return count;
}
/**
 * @param str {string} 要分析的字符串
 */
export const isNumber = (str) => {
  const regPos = /^\d+(\.\d+)?$/; //非负浮点数
  const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  if (regPos.test(str) || regNeg.test(str)) return true;
  else return false;
}
