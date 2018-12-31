<template>
  <div class="comp-full-calendar">
    <fc-header
      :current-month="currentMonth"
      :first-day="firstDay"
      :locale="locale"
      @change="emitChangeMonth"
    >
    </fc-header>
      <div>
            <div class="ibbox">顯示：</div>

          <el-checkbox-group class="ibbox" v-model="isShowData">
              <el-checkbox :label="1">数量</el-checkbox>
              <el-checkbox class="ml15" :label="2">毛利率</el-checkbox>
              <el-checkbox class="ml15" :label="3">銷售額</el-checkbox>
          </el-checkbox-group>
      </div>
    <div class="full-calendar-body">
      <div class="weeks">
        <strong
          class="week"
          :key="i"
          v-for="(dayIndex,i) in 7"
        >{{ (dayIndex - 1) | localeWeekDay(firstDay, locale) }}</strong>
      </div>
      <div
        class="dates"
        ref="dates"
      >
        <div class="dates-bg">
          <div
            class="week-row"
            :key="i"
            v-for="(week,i) in currentDates"
          >
            <div
              class="day-cell"
              :key="index"
              v-for="(day,index) in week"
              :class="{'today' : day.isToday,
              'not-cur-month' : !day.isCurMonth}"
            >
              <p class="day-number">{{ day.monthDay }}</p>
              <p
                v-if="day.data && isShowData.includes(1)"
                class="fz12"
              > &nbsp;&nbsp;&nbsp;数量：<span class=" dataColor">{{day.data.quantity}}</span></p>
              <p
                v-if="day.data && isShowData.includes(2)"
                class="fz12"
              >毛利率：<span class=" dataColor">{{(day.data.marginPercent * 100).toFixed(2)}}%</span></p>
              <p
                v-if="day.data && isShowData.includes(3)"
                class="fz12"
              >销售额：<span class=" dataColor">{{day.data.revenue}} {{day.data.currency}}</span></p>
              <slot name="body"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dateFunc from "./dateFunc";
import moment from "moment";
import header from "./header";
export default {
  props: {
    value: {
      type: Array
    },
    events: {
      type: Array,
      default() {
        return [];
      }
    },
    locale: {
      type: String,
      default: "en"
    },
    firstDay: {
      type: [Number, String],
      validator(val) {
        let res = parseInt(val);
        return res >= 0 && res <= 6;
      },
      default: 0
    }
  },
  components: {
    "fc-header": header
  },
  mounted() {
    this.emitChangeMonth(this.currentMonth);
  },
  data() {
    return {
      isShowData: [1, 2, 3],
      currentMonth: moment().startOf("month"),
      isLismit: true,
      eventLimit: 3,
      showMore: false,
      morePos: {
        top: 0,
        left: 0
      },
      selectDay: {}
    };
  },
  computed: {
    currentDates() {
      return this.getCalendar();
    }
  },
  methods: {
    emitChangeMonth(firstDayOfMonth) {
      this.currentMonth = firstDayOfMonth;

      // let start = dateFunc.getMonthViewStartDate(
      //   firstDayOfMonth,
      //   this.firstDay
      // );
      // let end = dateFunc.getMonthViewEndDate(firstDayOfMonth, this.firstDay);
      this.$emit("changeMonth", firstDayOfMonth);
    },
    moreTitle(date) {
      if (!date) return "";
      return moment(date).format("ll");
    },
    getCalendar() {
      let monthViewStartDate = dateFunc.getMonthViewStartDate(
        this.currentMonth,
        this.firstDay
      );
      let calendar = [];
      for (let perWeek = 0; perWeek < 6; perWeek++) {
        let week = [];

        for (let perDay = 0; perDay < 7; perDay++) {
          week.push({
            monthDay: monthViewStartDate.date(),
            isToday: monthViewStartDate.isSame(moment(), "day"),
            isCurMonth: monthViewStartDate.isSame(this.currentMonth, "month"),
            weekDay: perDay,
            date: moment(monthViewStartDate).format("YYYY-MM-DD"),
            events: this.slotEvents(monthViewStartDate),
            data: this.value.find(v => {
              return v.date == moment(monthViewStartDate).format("YYYY-MM-DD");
            })
          });

          monthViewStartDate.add(1, "day");
        }

        calendar.push(week);
      }
      return calendar;
    },
    slotEvents(date) {
      let thisDayEvents = this.events.filter(day => {
        let st = moment(day.start);
        let ed = moment(day.end ? day.end : st);

        return date.isBetween(st, ed, null, "[]");
      });

      // sort by duration
      thisDayEvents.sort((a, b) => {
        if (!a.cellIndex) return 1;
        if (!b.cellIndex) return -1;
        return a.cellIndex - b.cellIndex;
      });

      // mark cellIndex and place holder
      for (let i = 0; i < thisDayEvents.length; i++) {
        thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || i + 1;
        thisDayEvents[i].isShow = true;
        if (thisDayEvents[i].cellIndex == i + 1 || i > 2) continue;
        thisDayEvents.splice(i, 0, {
          title: "holder",
          cellIndex: i + 1,
          start: date.format(),
          end: date.format(),
          isShow: false
        });
      }

      return thisDayEvents;
    },
    selectThisDay(day, jsEvent) {
      this.selectDay = day;
      this.showMore = true;
      this.morePos = this.computePos(event.target);
      this.morePos.top -= 100;
      let events = day.events.filter(item => {
        return item.isShow == true;
      });
      this.$emit("moreClick", day.date, events, jsEvent);
    },
    computePos(target) {
      let eventRect = target.getBoundingClientRect();
      let pageRect = this.$refs.dates.getBoundingClientRect();
      return {
        left: eventRect.left - pageRect.left,
        top: eventRect.top + eventRect.height - pageRect.top
      };
    },
    dayClick(day, jsEvent) {
      this.$emit("dayClick", day, jsEvent);
    },
    eventClick(event, jsEvent) {
      if (!event.isShow) return;

      jsEvent.stopPropagation();
      let pos = this.computePos(jsEvent.target);
      this.$emit("eventClick", event, jsEvent, pos);
    }
  },
  filters: {
    localeWeekDay(weekday, firstDay, locale) {
      firstDay = parseInt(firstDay);
      const localMoment = moment().locale(locale);
      return localMoment.localeData().weekdaysShort()[(weekday + firstDay) % 7];
    }
  }
};
</script>
<style lang="scss" scoped>
.dataColor {
  color: #7a71ca;
}
.comp-full-calendar {
  padding-bottom: 10px;
  background: #fff;
  ul,
  p {
    margin: 0;
    padding: 0;
  }
}

.full-calendar-body {
  margin-top: 20px;
  .weeks {
    display: flex;
    border-top: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    .week {
      flex: 1;
      text-align: center;
      border-right: 1px solid #ebeef5;
      color: #62717e;
      background: #edf1f5;
    }
  }
  .dates {
    position: relative;
    .week-row {
      border-left: 1px solid #ebeef5;
      display: flex;
      .day-cell {
        flex: 1;
        min-height: 60px;
        padding: 4px;
        border-right: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        .day-number {
          text-align: right;
        }
        &.today {
          background-color: #fcf8e3;
        }
        &.not-cur-month {
          .day-number {
            color: rgba(0, 0, 0, 0.24);
          }
        }
      }
    }
    .dates-events {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      .events-week {
        display: flex;
        .events-day {
          cursor: pointer;
          flex: 1;
          min-height: 112px;
          overflow: hidden;
          text-overflow: ellipsis;
          .day-number {
            text-align: right;
            padding: 4px 5px 4px 4px;
            opacity: 0;
          }
          &.not-cur-month {
            .day-number {
              color: rgba(0, 0, 0, 0.24);
            }
          }
          .event-box {
            .event-item {
              cursor: pointer;
              font-size: 12px;
              background-color: #c7e6fd;
              margin-bottom: 2px;
              color: rgba(0, 0, 0, 0.87);
              padding: 0 0 0 4px;
              height: 18px;
              line-height: 18px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              &.is-start {
                margin-left: 4px;
              }
              &.is-end {
                margin-right: 4px;
              }
              &.is-opacity {
                opacity: 0;
              }
            }
            .more-link {
              cursor: pointer;
              padding-left: 8px;
              padding-right: 2px;
              color: rgba(0, 0, 0, 0.38);
              font-size: 14px;
            }
          }
        }
      }
    }
    .more-events {
      position: absolute;
      width: 150px;
      z-index: 2;
      border: 1px solid #eee;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      .more-header {
        background-color: #eee;
        padding: 5px;
        display: flex;
        align-items: center;
        font-size: 14px;
        .title {
          flex: 1;
        }
        .close {
          margin-right: 2px;
          cursor: pointer;
          font-size: 16px;
        }
      }
      .more-body {
        height: 146px;
        overflow: hidden;
        .body-list {
          height: 144px;
          padding: 5px;
          overflow: auto;
          background-color: #fff;
          .body-item {
            cursor: pointer;
            font-size: 12px;
            background-color: #c7e6fd;
            margin-bottom: 2px;
            color: rgba(0, 0, 0, 0.87);
            padding: 0 0 0 4px;
            height: 18px;
            line-height: 18px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
