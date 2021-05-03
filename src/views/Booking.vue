<template>
    <div class="booking">
        <div class="hero is-primary">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title is-size-1">Welcome to Booking Schedule</h1>
                    <h2 class="title is-size-2">Please pick your time.</h2>
                </div>
            </div>
        </div>
        <div class="container">
        <p class="org-description is-size-4">1. booking: book time for test schedule in future schedule.</p>
        <p class="org-description is-size-4">2. logging: leave backlog for test schedule in the past schedule.</p>
        </div>
    
    <div>
        <select v-model="selectedView">
            <option v-for="(options, index) in viewModeOptions" :value="options.value" :key="index">
                {{ options.title }}
            </option>
        </select>
        <span @click="onClickNavi($event)">
            <button type="button" class="btn btn-default btn-sm move-today" data-action="move-today">Today</button>
            <button type="button" class="btn btn-default btn-sm move-day" data-action="move-prev">Prev</button>
            <button type="button" class="btn btn-default btn-sm move-day" data-action="move-next">Next</button>
        </span>
        <span class="render-range">{{dateRange}}</span>
    </div>
    <calendar  style="height: 800 px"
               ref="tuiCal"
               :useCreationPopup="useCreationPopup"
               :useDetailPopup="useDetailPopup"
               :view="selectedView"
               :calendars="calendarList"
               :schedules="scheduleList"
               :theme="theme"
               :template="template"
               :taskView="true"
               :scheduleView="true"
               :month="month"
               :week="week"
               :timezones="timezones"
               :disableDblClick="disableDblClick"
               :isReadOnly="isReadOnly"
               @clickSchedule="onClickSchedule"
               @clickDayname="onClickDayname"
               @beforeCreateSchedule="onBeforeCreateSchedule"
               @beforeDeleteSchedule="onBeforeDeleteSchedule"
               @beforeUpdateSchedule="onBeforeUpdateSchedule"
               @afterRenderSchedule="onAfterRenderSchedule"
               @clickTimezoneCollapseBtn="onClickTimezoneCollapseBtn"

    />
    </div>
</template>
<script>
import Chance from 'chance';
import 'tui-time-picker/dist/tui-time-picker.css';
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-calendar/dist/tui-calendar.css';
import '../components/calendar/app.css';
import {Calendar} from '../components/calendar/index.js';
import Theme from '../components/calendar/Theme';


const chance = new Chance();
const today = new Date();

const getDate = (type, start, value, operator) => {
    start = new Date(start);
    type = type.charAt(0).toUpperCase() + type.slice(1);

    if (operator === '+') {
        start[`set${type}`](start[`get${type}`]() + value);
    } else {
        start[`set${type}`](start[`get${type}`]() - value);
    }

    return start;
};

export default {
    name: 'booking',
    components: {
        'calendar': Calendar
    },
    data() {
        return {
            viewModeOptions: [
                {
                    title: 'Monthly',
                    value: 'month'
                },
                {
                    title: 'Weekly',
                    value: 'week'
                },
                {
                    title: 'Daily',
                    value: 'day'
                }
            ],
            dateRange: '',
            selectedView: 'month',
            calendarList: [
                {
                    id: '0',
                    name: 'Private',
                    bgColor: '#9e5fff',
                    borderColor: '#9e5fff'
                },
                {
                    id: '1',
                    name: 'Company',
                    bgColor: '#00a9ff',
                    borderColor: '#00a9ff'
                }
            ],
            scheduleList: [
                {
                    id: '1',
                    calendarId: '0',
                    title: 'SVP testing',
                    category: 'time',
                    dueDateClass: '',
                    start: today.toISOString(),
                    end: getDate('hours', today, 3, '+').toISOString()
                },
                {
                    id: '2',
                    calendarId: '1',
                    title: 'CU testing',
                    cateogry: 'time',
                    dueDateClass: '',
                    start: getDate('date', today, 1, '+').toISOString(),
                    end: getDate('date', today, 1, '+').toISOString(),
                    isReadOnly: true
                },
                {
                    id: '3',
                    calendarId: '1',
                    title: 'DU testing',
                    category: 'time',
                    dueDateClass: '',
                    start: getDate('date', today, 2, '-').toISOString(),
                    end: getDate('date', today, 1, '-').toISOString(),
                    isReadOnly: true
                },
                {
                    id: '4',
                    calendarId: '1',
                    title: 'Report',
                    category: 'time',
                    dueDateClass: '',
                    start:today.toISOString(),
                    end: getDate('hours', today, 1, '+').toISOString()
                }
            ],
            timezones: [{
                timezoneOffset: 540,
                displayLabel: 'GMT+08:00',
                tooltip: 'Taipei'
            }],
            theme: Theme,
            template: {
                milestone(schedule) {
                    return `<span style="color:#fff;background-color: ${schedule.bgColor};">${schedule.title}</span>`;
                },
                milestoneTitle() {
                    return 'Milestone';
                },
                allday(schedule) {
                    return `${schedule.title}<i class="fa fa-refresh"></i>`;
                },
                popupIsAllDay: function() {
                    return 'Alvin';
                },
                popupStateFree: function() {
                return '2021 Q2';
                },
                popupStateBusy: function() {
                return '2021 Q3';
          },
            },
            month: {
                startDayOfWeek: 0
            },
            week: {
                showTimezoneCollapseButton: true,
                timezonesCollapsed: true
            },
            taskView: true,
            scheduleView: true,
            useDetailPopup: true,
            disableDblClick: true,
            isReadOnly: false
        };
    },
    watch: {
        selectedView(newValue) {
            this.$refs.tuiCal.invoke('changeView', newValue, true);
            this.setRenderRangeText();
        }
    },
    methods: {
        init() {
            this.setRenderRangeText();
        },
        setRenderRangeText() {
            const {invoke} = this.$refs.tuiCal;
            const view = invoke('getViewName');
            const calDate = invoke('getDate');
            const rangeStart = invoke('getDateRangeStart');
            const rangeEnd = invoke('getDateRangeEnd');
            let year = calDate.getFullYear();
            let month = calDate.getMonth() + 1;
            let date = calDate.getDate();
            let dateRangeText = '';
            let endMonth, endDate, start, end;

            switch (view) {
                case 'month': 
                    dateRangeText = `${year}-${month}`;
                    break;
                case 'week':
                    year = rangeStart.getFullYear();
                    month = rangeStart.getMonth() + 1;
                    date = rangeStart.getDate();
                    endMonth = rangeEnd.getMonth() + 1;
                    endDate = rangeEnd.getDate();

                    start = `${year}-${month}-${date}`;
                    end = `${endMonth}-${endDate}`;
                    dateRangeText = `${start}~${end}`;
                    break;
                default:
                    dateRangeText = `${year}-${month}-${date}`;
            }
            this.dateRange = dateRangeText;
        },
        onClickNavi(event) {
            if (event.target.tagName === 'BUTTON') {
                const {target} = event;
                let action = target.dataset ? target.dataset.action : target.getAttribute('data-action');
                action = action.replace('move-', '');

                this.$refs.tuiCal.invoke(action);
                this.setRenderRangeText();
            }   
        },
        onClickSchedule(res) {
            console.group('onClickSchedule');
            console.log('MouseEvent : ', res.event);
            console.log('Calendar Info : ', res.calendar);
            console.log('Schedule Info : ', res.schedule);
            console.groupEnd();
        },
        onClickDayname(res) {
            // view : week, day
            console.group('onClickDayname');
            console.log(res.date);
            console.groupEnd();
        },
        onBeforeCreateSchedule(e) {

            console.log("[onBeforeCreateSchedule]", e);

            const { calendarId, title, location, start, end, isAllDay, state } = e;

            this.$refs.tuiCalendar.invoke("createSchedules", [
            {
                id: chance.guid(),
                calendarId,
                title,
                isAllDay,
                start,
                end,
                location,
                state,
                category: isAllDay ? "allday" : "time"
            }
            ]);

            this.$refs.tuiCalendar.invoke("render", true);
        },
        onBeforeDeleteSchedule(e) {
            console.log("[onBeforeDeleteSchedule]", e);

            this.$refs.tuiCalendar.invoke("deleteSchedule",
                                            e.schedule.id,
                                            e.schedule.calendarId
                                            );
        },
        onBeforeUpdateSchedule(e) {
            console.log("[onBeforeUpdateSchedule]", e);

            const { schedule, changes } = e;

            this.$refs.tuiCalendar.invoke("updateSchedule",
                                            schedule.id,
                                            schedule.calendarId,
                                            changes);
        },
        onAfterRenderSchedule(res) {
            console.group('onAfterRenderSchedule');
            console.log('Schedule Info : ', res.schedule);
            console.groupEnd();
        },
        onClickTimezonesCollapseBtn(timezonesCollapsed) {
            // view: week, day
            console.group('onClickTimezonesCollapsedBtn');
            console.log('Is Collapsed Timeszone ?', timezonesCollapsed);
            console.groupEnd();

            if (timezonesCollapsed) {
                this.theme['week.timegridLeft.width'] = '100px';
                this.theme['week.daygridLeft.width'] = '100px';
            } else {
                this.theme['week.timegridLeft.width'] = '50px';
                this.theme['week.daygridLeft.width'] = '50px';
            }
        }
    },
    mounted() {
        this.init();
    }
};
</script>
<style lang="scss" scoped> 
    ::v-deep .org-description {
    margin-top: 50px;
    color: #8B0000;
    }
</style>