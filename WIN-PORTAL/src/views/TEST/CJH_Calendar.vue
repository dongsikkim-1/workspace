<template>
<div>
    
<div style="margin-top : 30px; padding-left : 150px; padding-right :150px; ">
   <div>
        <b-button size="sm" variant="primary" @click="btn_prev">이전</b-button>
        <b-button size="sm" variant="primary" style="margin-left :10px"  @click="btn_next">다음</b-button>
        <label v-text="selected_momth" style="margin-left : 30px; font-size : 16pt; font-weight:bold" ></label>
        <label v-text="login_user" style="margin-left : 30px; font-size : 16pt; font-weight:bold" ></label>
        <b-button v-if="admin_yn" v-text="txt_attend" variant="primary" style="margin-right :10px; float:right"  @click="btn_attend">출석</b-button>
   </div>
  <div id="cal" style=" margin-top :10px;"></div>
</div>
</div>
</template>
<script>
/*eslint-disable no-unused-vars, no-empty*/ // 변수 선언 후 사용하지 않거나, 무의미한 띄어쓰기가 코드에 들어간 경우 에러를 내뱉는 경우를 방지
import Calendar from 'tui-calendar'; /* ES6 */
import "tui-calendar/dist/tui-calendar.css";
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';
import Utility from "../../assets/js/CommonUtility.js";   // 전 화면 공통으로 사용하는 함수
import {getToken} from "@/utils/Cookie"; // 로그인 정보를 저장할 Cookie
import GlobalValue from "@/assets/js/GlobalValue.js";
import {SELECT_ATTENDANCE, SAVE_ATTENDANCE} from "@/api/CJH_Calendar.js" //출퇴근 정보 조회,
import moment from 'moment'

export default {
    data() {
    return {
        dayname : ['일', '월', '화', '수', '목', '금', '토'],
        calendar : new Calendar(),
        selected_momth : '',//선택된 날짜
        login_user : '', //로그인 유저 이름
        scheduler_data : [{}], //스케줄 데이터
        admin_yn : true,   //관리자 여부
        txt_attend : '출근',   //출근 or 퇴근 텍스트
    };
  },
  // mounted 단계에서 만들것.  
  mounted() {
    Utility.fn_SetMenuPath(this); // 메뉴 Path 표시
    
    //관리자는 출석 불가
    if(getToken("USER_ID").toUpperCase() == "ADMIN" || getToken("USER_ID").toUpperCase() == "ADMIN@WBMS.CO.KR") { this.admin_yn = false;}
    this.calendar.destroy() //달력 초기화
    //날짜옆 사용자 이름 출력
    if (Utility.fn_IsNull(getToken("USER_ID")) != null){
      this.login_user = getToken("USER_NM");
    }
    this.SetCalendar();  //달력 생성
    var Default_Date = this.set_Date(new Date())
    this.calendar.setDate(Default_Date) //시작날짜 설정
    this.selected_momth = moment(Default_Date).format("YYYY-MM")

    this.calendar.createSchedules([this.scheduler_data]);   //조회데이터 달력에 생성
    this.Select_Attend(); //출퇴근 데이터 조회
  },

  destroyed(){
    this.calendar.clear();
  },
  methods:{
    //달력 생성
    SetCalendar(){
        this.calendar = new Calendar('#cal', {
            defaultView: 'month',  //월단위
            taskView: true,
            isReadOnly: true,
            //텍스트 옵션 적용
            theme :{ 
                'month.dayname.borderLeft': '2px solid #e5e5e5',
                'month.dayname.fontSize': '13pt',
                'month.dayname.fontWeight': 'bold',
                'month.dayname.textAlign': 'center',
                'month.dayname.backgroundColor': '#E5DC60',

                'month.holidayExceptThisMonth.color': 'rgba(255, 64, 64, 0.4)',  //이전,다음월 날짜 연하게(휴일)
                'month.dayExceptThisMonth.color': 'rgba(51, 51, 51, 0.4)',    //이전,다음월 날짜 연하게(평일)
                'month.weekend.backgroundColor': 'rgba(100, 100, 100, 0.2)',  //주말 영역 배경색 회색
            }, 
            month: {
                daynames: this.dayname,
                startDayOfWeek: 0, // 일요일 시작
                moreLayerSize: {
                    height: 'auto'
                },
                grid: {
                    header: {
                        header: 34
                    },
                    footer: {
                        height: 10
                    }
                },
                narrowWeekend: true,
                visibleScheduleCount: 4,
                isAlways6Week : false
            },
            
            template: {
                monthDayname: function(dayname) {
                return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
                },
            }
        });    
        //달력 내용 생성
        this.calendar.createSchedules(this.scheduler_data)     
    },
     
    //출퇴근 정보 조회
    async Select_Attend(){
        //조회전 초기화
        this.calendar.clear()

        const Attend_Result = await SELECT_ATTENDANCE(getToken("USER_ID"))
        var arr = [];
        for(var i = 0; i < Attend_Result.length ; i++){
            arr[i] = {
                id: Attend_Result[i].SEQ ,
                calendar_id : '1',
                title: Attend_Result[i].GUBUN + "  "+ Attend_Result[i].ATTEND_TIME,
                category: 'time',
                start: moment(Attend_Result[i].ATTEND_DATE).format("YYYY-MM-DD"),
                end : moment(Attend_Result[i].ATTEND_DATE).format("YYYY-MM-DD"),
                customStyle: 'background-color: #FFFFFF; color: #FF0000;'
            }
        }
        this.scheduler_data = arr;
        this.calendar.createSchedules(this.scheduler_data,true);   //조회데이터 달력에 생성
        this.calendar.render()
        this.chk_attend(); //버튼 텍스트 변경
    },

    //날짜 설정(해당월의 첫날로 설정)
    set_Date(date){
        //받은 날짜의 첫날짜를 반환
        var d = date
        var yyyy = d.getFullYear()
        var mm = (d.getMonth() + 1).toString().length === 1 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
        var dd = '01'
        var NEW_Date = yyyy.toString() + '-' + mm.toString() + '-' + dd.toString()

        return NEW_Date
    },

    //이전버튼
    btn_prev(){
        var prev_date = this.calendar.getDateRangeStart()
        var new_date = this.set_Date(prev_date)
        this.calendar.prev()
        this.selected_momth = moment(this.selected_momth).add("month",-1).format("YYYY-MM")
        // this.calendar.setDate(new_date)
    },
    
    //다음버튼
    btn_next(){
        var next_date = this.calendar.getDateRangeEnd()
        var new_date = this.set_Date(next_date)
        this.calendar.next()
        this.selected_momth = moment(this.selected_momth).add("month",1).format("YYYY-MM")
        // this.calendar.setDate(next_date)
    },
    
    //출석 버튼
    async btn_attend(){
        if(Utility.fn_IsNull(getToken("USER_ID")) == null){
            this.$bvModal.msgBoxOk("로그인 후 이용해 주세요.", GlobalValue.Err_option);
        }

        //출근 데이터 존재시 퇴근 저장 여부 묻기
        if(this.chk_attend()){
            let msgBox = await this.$bvModal.msgBoxConfirm("퇴근 하시겠습니까?", GlobalValue.Info_option);
            if(!msgBox) {
                return;
            }
        }
        
        var data=[];
        data[0]= {data: JSON.stringify({ USER_ID:getToken("USER_ID"), WORK_DATE: moment(this.calendar.getDate()).format('YYYY-MM-DD')})}
        var Save_Data={data}; // 저장할 데이터를 담는 변수(로그인유저, 오늘날짜)

        var new_attend = await SAVE_ATTENDANCE(Save_Data)
        if(new_attend[0].query_success != "Y"){
            this.$bvModal.msgBoxOk(new_attend[0].query_err_msg ,GlobalValue.Err_option)
            return;
        }

        this.scheduler_data = await this.Select_Attend(getToken("USER_ID"))

        this.Select_Attend()
        this.$bvModal.msgBoxOk("저장 되었습니다.", GlobalValue.Err_option);
    
    },
  
    //오늘자 출근 기록 확인
    chk_attend(){
        //출근 데이터 확인
        let flag = false
        this.txt_attend = '출근'
        for(var i = 0 ; i < this.scheduler_data.length; i++){
            console.log(this.scheduler_data[i].start)
            if(this.scheduler_data[i].start == moment(this.calendar.getDate()).format('YYYY-MM-DD')){
                flag = true
                this.txt_attend ='퇴근'
            }
        }
        return flag
    }
  }
};
</script>
<style scoped>

</style>