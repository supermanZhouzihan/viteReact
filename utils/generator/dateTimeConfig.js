import moment from 'moment';

//返回两个日期之间所有的日期数组
function enumerateDaysBetweenDates(startDate, endDate) { // 假定你已经保证了startDate 小于endDate，且二者不相等
  let daysList = [];
  let SDate = moment(startDate);
  let EDate = moment(endDate);
  daysList.push(SDate.format("MM-DD"));
  while (SDate.add(1, "days").isBefore(EDate)) { // 注意这里add方法处理后SDate对象已经改变。      
    daysList.push(SDate.format("MM-DD"));
  }
  daysList.push(EDate.format("MM-DD"));
  return daysList;
}

//折线图 本日，本周，本月，本年  X轴option
export const dateTimeOptions = {
  today: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
  month: enumerateDaysBetweenDates(moment().startOf("month").format("YYYY-MM-DD"), moment().endOf("month").format("YYYY-MM-DD")), //本月所有日期
  week: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  year: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
}


//时间 默认YYYY-MM-DD HH:mm:ss
export const formatDate = {
  dayStartDate: function (format) {
    return moment().startOf("day").format(format || "YYYY-MM-DD HH:mm:ss") //今日开始时间 
  },
  dayEndDate: function (format) {
    return moment().endOf("day").format(format || "YYYY-MM-DD HH:mm:ss") //今日结束时间
  },

  weekStartDate: function (format) {
    return moment().startOf("week").format(format || "YYYY-MM-DD HH:mm:ss") //本周开始时间
  },
  weekEndDate: function (format) {
    return moment().endOf("week").format(format || "YYYY-MM-DD HH:mm:ss") //本周结束时间
  },

  monthStartDate: function (format) {
    return moment().startOf("month").format(format || "YYYY-MM-DD HH:mm:ss") //本月开始时间 
  },
  monthEndDate: function (format,date) {
    return moment(date).endOf("month").format(format || "YYYY-MM-DD HH:mm:ss") //本月结束时间
  },
  quarterStartDate:function (format) {
    return moment().startOf("quarter").format(format || "YYYY-MM-DD HH:mm:ss") //本季度开始时间 
  },
  quarterEndDate:function (format) {
    return moment().endOf("quarter").format(format || "YYYY-MM-DD HH:mm:ss") //本季度结束时间 
  },

  yearStartDate: function (format) {
    return moment().startOf("year").format(format || "YYYY-MM-DD HH:mm:ss") //今年开始时间 
  },
  yearEndDate: function (format) {
    return moment().endOf("year").format(format || "YYYY-MM-DD HH:mm:ss") //今年结束时间
  },

  lastYearStartDate: function (format) {
    return moment().year(moment().year() - 1).startOf("year").format(format || "YYYY-MM-DD HH:mm:ss") //去年开始时间 
  },
  lastYearEndDate: function (format) {
    return moment().year(moment().year() - 1).endOf("year").format(format || "YYYY-MM-DD HH:mm:ss") //去年结束时间
  },

  lastWeekStartDate: function (format) {
    return moment().startOf("week").subtract(7, 'days').format(format || "YYYY-MM-DD HH:mm:ss") //上周开始时间
  },
  lastWeekEndDate: function (format) {
    return moment().endOf("week").subtract(7, 'days').format(format || "YYYY-MM-DD HH:mm:ss") //上周结束时间
  },

  lastMonthStartDate: function (format) {
    return moment().month(moment().month() - 1).startOf('month').format(format || "YYYY-MM-DD HH:mm:ss") //上月开始时间 
  },
  lastMonthEndDate: function (format) {
    return moment().month(moment().month() - 1).endOf('month').format(format || "YYYY-MM-DD HH:mm:ss") //上月结束时间
  },

  lastQuarterStartDate: function (format) {
    return moment().quarter(moment().quarter() - 1).startOf('quarter').format(format || "YYYY-MM-DD HH:mm:ss") //上季度开始时间 
  },
  lastQuarterEndDate: function (format) {
    return moment().quarter(moment().quarter() - 1).endOf('quarter').format(format || "YYYY-MM-DD HH:mm:ss") //上季度结束时间 
  },

  nowFormat:function(format){
    return moment().format(format || "YYYYMMDD") //当前时间
  },

  
}
