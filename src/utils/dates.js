import moment from "moment";

const dates = {
  merge(date, time) {
    if (date === null && time === null) return null;
    if (time === null) time = new Date();
    if (date === null) date = new Date();
    // 取得date的开始，加上min的时分秒
    date = moment(date).startOf("day");
    date = moment(date).hours(moment(time).hours());
    date = moment(date).minute(moment(time).minute());
    date = moment(date).second(moment(time).second());
    return date.toDate();
  },
  diff(dateA, dateB, unit) {
    const a = moment(dateA);
    const b = moment(dateB);
    return Math.abs(a.diff(b, unit));
  }
};

export default dates;
