/**
 * Created by Administrator on 2017/4/15 0015.
 */

export function formatTime(rateTime) {
  if (rateTime) {
    let date = new Date(rateTime);
    let dateStr = '' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    let minu = date.getMinutes();
    let timeStr = '';
    if (minu < 10) {
      timeStr = '' + (date.getHours() + 1) + ':0' + minu;
    } else {
      timeStr = '' + (date.getHours() + 1) + ':' + minu;
    }
    let result = dateStr + '  ' + timeStr;
    return result;
  } else {
    return '';
  }
};
