<template >
    <div>
      <modals-container />
        <!-- 화면 Contents 영역 -->
        <div class="contents">
             <!-- 프로젝트 정보 버튼 START-->
            <div class="common-btnwrap">
                <b-button size="sm" variant="primary" @click="Search">조회</b-button>
            </div>
            <!-- 프로젝트 정보 버튼 END -->
            <!-- 검색조건 START-->    
            <div class="common-schwrap">
                <fieldset>
                <div class="row">
                    <!-- 고객사 명 -->
                    <div class="col-md-3 col-sm-4 ">
                    <label class="col-md-3 col-sm-4 col-xs-4 control-label">고객사</label>
                    <div class="col-md-9 col-sm-8 col-xs-8">  
                      <b-form-select
                        id="cbo_CLIENT_HEAD_ID"
                        v-model="PJT_CLIENT_HEADER"
                        :options="cboCLIENT_HEADER"
                        class="form-control"
                        @change="cboCLIENT_CHANGE"
                        @keypress.enter="Search"
                      ></b-form-select>                              
                    </div>
                    </div>
                    <!-- 부서 -->
                    <div class="col-md-3 col-sm-4 ">
                    <label class="col-md-3 col-sm-4 col-xs-4 control-label">부서</label>
                    <div class="col-md-9 col-sm-8 col-xs-8">
                        <b-form-select
                        id="cbo_CLIENT_DETAIL_ID"
                        v-model="PJT_CLIENT_DETAIL"
                        :options="cboCLIENT_DETAIL"
                        class="form-control"
                        @keypress.enter="Search"
                      ></b-form-select>   
                    </div>
                    </div>
                    <!-- 프로젝트 명 -->
                    <div class="col-md-6 col-sm-4 ">
                    <label class="col-md-2 col-sm-4 col-xs-4 control-label">프로젝트 명</label>
                    <div class="col-md-10 col-sm-8 col-xs-8">                                
                        <b-form-input  id = "txtPJT_NAME" v-model="PJT_NAME" maxlength="50" @keypress.enter="Search"></b-form-input>
                    </div>
                    </div>
                </div>
                <div class="row" >
                    <!-- 타입 -->
                    <div class="col-md-3 col-sm-4 ">
                    <label class="col-md-3 col-sm-4 col-xs-4 control-label">타입</label>
                    <div class="col-md-9 col-sm-8 col-xs-8">                                
                      <b-form-select
                        id="SEARCH_TYPE_ID"
                        v-model="SEARCH_TYPE"
                        :options="cboSEARCH_TYPE"
                        class="form-control"
                      ></b-form-select>
                    </div>
                    </div>
                    <!-- 계약기간 FROM -->
                    <div class="col-md-2 col-sm-4 ">
                    <label class="col-md-4 col-sm-4 col-xs-4 control-label">기간</label>
                    <div class="col-md-8 col-sm-8 col-xs-8">                                
                        <input type="date" id="DATE_FROM" v-model="SDATE" class="form-control" @keypress.enter="Search">
                    </div>
                    </div>
                    <!-- 계약기간 TO -->
                    <div class="col-md-2 col-sm-4 ">
                    <label class="col-md-2 col-sm-4 col-xs-4 control-label">~</label>
                    <div class="col-md-8 col-sm-8 col-xs-8">                                
                        <input type="date" id="DATE_TO" v-model="EDATE" class="form-control" @keypress.enter="Search">
                    </div>
                    </div>
                    <div class="col-md-2 col-sm-4 " style="align-self: center">
                    <b-form-group >
                      <b-form-radio-group v-model="Cal_Type" 
                       :options="[{text: '일별', value : 'DAY'},{text: '월별', value : 'MONTH'}]"
                       size="lg"
                       name="radio-inline" value="DAY"
                       ></b-form-radio-group>
                    </b-form-group>
                    </div>
                    <!-- 범례 --> 
                    <div class="col-md-3 col-sm-4 ">
                      <LEGEND :legend_list = "legend"></LEGEND>
                    </div>    
                </div>
                </fieldset>          
            </div>       
            <!-- 검색조건 END-->
                         
            <!-- 프로젝트 현황(간트) START-->
            <div style="width:100%; float:left; position:relative ">
                <!-- 간트 차트 -->
                <div class="contents" style="width:100%; text-align:center;">
                  <GSTC :config="config" @state="onState" style="height : 400px;" />
                </div>
            </div>
        </div><!-- END contents -->        
    </div>
</template>

<script>
// import 영역
/*eslint-disable no-unused-vars, no-empty*/ // 변수 선언 후 사용하지 않거나, 무의미한 띄어쓰기가 코드에 들어간 경우 에러를 내뱉는 경우를 방지
import Vue from 'vue';
import envs from "@/envs";
import GSTC from "vue-gantt-schedule-timeline-calendar"; // GanttChart
import WeekendHighlight from "gantt-schedule-timeline-calendar/dist/WeekendHighlight.plugin"; // 주말 Highlight Plugin
import { getToken } from "@/utils/Cookie"; // 로그인한 사용자 ID
import {getCommonCode} from "@/api/Common.js" // 공통코드 가져오기(콤보 바인딩용)
import {GET_GANTT_ROW,GET_GANTT_ITEM,GET_CLIENT_DETAIL} from "@/api/Project_Status.js"
import Utility from "../../assets/js/CommonUtility.js";   // 전 화면 공통으로 사용하는 함수
import GlobalValue from "../../assets/js/GlobalValue.js"; // 전 화면 공통으로 사용하는 변수
import LEGEND from "./wLegend.vue" // 범례 컴포넌트
import moment from 'moment'  //시간관련 컴포넌트


// Vue 핸들링 영역
export default {

  // Component 선언부
  components: {
    GSTC,
    LEGEND
  },

  // 초기 데이터 변수 선언부
  data() {
    return {
        //조회 조건
        PJT_NAME : '',             // 프로젝트 명
        PJT_CLIENT_HEADER : '',    // 고객사
        PJT_CLIENT_DETAIL : '',    // 부서
        SDATE : '',                // 시작일자
        EDATE : '',                // 종료일자
        SEARCH_TYPE : 'ALL',       // 검색 타입값(전체,계약,투입)
        cboSEARCH_TYPE : [{}],      // 검색 타입 콤보
        cboCLIENT_HEADER : [{text: "전체", value: ""}],    // 고객사 콤보
        cboCLIENT_DETAIL : [{text: "전체", value: ""}],    // 고객사 세부조직 콤보

        Cal_Type : 'DAY', // 간트 차트 타입(기본값 :일별)

        //범례 (wLegend.vue 에 넘겨줄 값)
        legend : [{NAME: "계약", COLOR : "background-color : YELLOWGREEN"},
                  {NAME: "투입", COLOR : "background-color : LIGHTGREEN"}],  

        // 간트 차트
        startOfDate:"",  // 간트 차트 시작일자
        endOfDate:"",    // 간트 차트 종료일자
        config: {},      // 간트차트 속성
        state:""         // 간트차트 state update용 변수
    };
  },

  // 화면이 로드될 때 실행되는 이벤트
  created() {
    
    Utility.fn_SetMenuPath(this); // 메뉴 Path 표시

    //텍스트 타입에 달력으로 표시하기 위함
    let sDate = moment().format("YYYY-MM-DD");
    let eDate = moment().add("month",2) .format("YYYY-MM-DD");

    //화면 호출시 넘겨온 날짜값이 있으면 바인딩, 없을시 현재시간 바인딩
    if(this.$route.params.SDATE != undefined || this.$route.params.SDATE != null)
    {
      this.SDATE = this.$route.params.SDATE
    }
    else
    {
      this.SDATE = sDate
    }
    if(this.$route.params.EDATE != undefined || this.$route.params.EDATE != null)
    {
      this.EDATE = this.$route.params.EDATE
    }
    else
    {
      this.EDATE = eDate
    }

    //간트차트 시간범위 설정
    this.startOfDate = moment(this.SDATE).toDate();
    this.endOfDate = moment(this.EDATE).toDate();

    //간트 기본값 생성
    this.CreateChart()

    this.setCombo() //콤보박스 조회
  },

  // 화면이 로드될 때 DOM 생성이 완료된 후 실행되는 이벤트 선언부
  mounted() {
    this.Search()  // 간트차트 Items 조회
  },

   // 브라우저에서 해당 url을 벗어날때 실행되는 이벤트
  destroyed() {

  },
  // 이벤트 선언부
  methods: {
    
    //콤보박스 설정(고객사, 부서 바인딩?)
    async setCombo(){
      let arr = [];
        arr[0] = {text : "계획" , value : "CONT"}
        arr[1] = {text : "투입" , value : "WORK"}
        arr[2] = {text : "전체" , value : "ALL"}
      this.cboSEARCH_TYPE = arr; 

      let arr2 = [];
      let result =  await getCommonCode("CORP")
      arr2[0] = {text: "전체", value : ""}
        for(var i = 0 ; i< result.length; i++){
          arr2[i+1] = {text: result[i].CODE_NAME, value : result[i].CODE_NO}
        }
      this.cboCLIENT_HEADER = arr2; 
      this.PJT_CLIENT_HEADER = arr2[0].value

    },

    //고객사 변경시 세부 목록 변경
    async cboCLIENT_CHANGE(ev){
        this.PJT_CLIENT_DETAIL = "";

        let arr3 = [];
        let result =  await GET_CLIENT_DETAIL(this.PJT_CLIENT_HEADER)
        arr3[0] = {text: "전체", value : ""}

        for(var i = 0 ; i< result.length; i++)
        {
          arr3[i+1] = {text: result[i].CODE_NAME, value : result[i].CODE_NO}
        }
        this.cboCLIENT_DETAIL = arr3; 
        this.PJT_CLIENT_DETAIL = arr3[0].value
    },

    //간트차트 생성
    CreateChart() {
      this.config = {
        height: 895,
        list: {
          toggle: { display: false }, // Column 접었다 펼치는 기능 toggle display 숨김
          rows: {},
          columns: {
            // list columns header resize 제거
            resizer: {
              width: 0,
              inRealTime: false,
              dots: 0 
            },
            data: {
              label: {
                id: "label",
                data: "label",
                width: 150,
                expander : true,
                header: {
                  content: "사용자"
                }
              }
            }
          }
        },
        chart: {
          items: {},
          // day 단위로 calendar 표시
          time: {
            period: "day",
            calculatedZoomMode: false, // Ctrl + Mouse Wheel 동작 시 Calendar에 표기된 일자가 zoom 배율에 따라 time / day / month로 표기되는거 방지
            from: new Date(this.startOfDate).getTime(), // 조회조건 시작일
             to:  new Date(this.endOfDate).getTime(),   // 조회조건 종료일
            zoom: 21 // Default Zoom
          },

          // calendar 데이터 타입 설정부
          calendar: {
            expand: false,
            levels: [
              {
                // Day 상단 Month,Year 표기
                formats: [
                  {
                    zoomTo: 21,
                    period: "month",
                    format({ timeStart }) {
                      return timeStart.format("MM월");
                    }
                  }
               ]
              },
              {
                // Day 표기
                main: true,
                formats: [
                  {
                    zoomTo: 21,
                    period: "day",
                    format({ timeStart, vido, className }) {
                      return vido.html`<div class="${className}-content gstc-date-top">${timeStart.format("DD")}
                            </div><div class="${className}-content gstc-date-small">${timeStart.format("ddd")}</div>`;
                    }
                  }
                ]
              }
            ]
          }
        },
        // Calendar 표기 설정 (Kor)
        locale: {
          name: "ko",
          weekdaysShort: "(일)_(월)_(화)_(수)_(목)_(금)_(토)".split("_"),
          months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
          monthsShort: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
          weekStart: 0 // 시작일 (0 = 일요일)
        },
        // 차트 이벤트 선언
        actions: {
          "chart-timeline-items-row-item": [ItemClickAction], //itme(task) 속성,이벤트
          "list-column-row": [list_column_style] //칼럼 높이 설정
        },
        scroll: {
          bodyClassName: 'gstc-scrolling',
          horizontal: {
            size: 20,
            minInnerSize: 40,
            data: null,
            posPx: 0,
            maxPosPx: 0,
            area: 0,
            multiplier: 3,
            offset: 0,
            precise: false,
          },
          vertical: {
            size: 20,
            minInnerSize: 40,
            data: null,
            posPx: 0,
            maxPosPx: 0,
            area: 0,
            multiplier: 3,
            offset: 0,
            precise: false,
          },
        },
        //주말 날짜 HighLight Plugin
        plugins : [ 
          WeekendHighlight ( { 
            weekdays : [0, 6] 
          } ) 
        ] 
      };
    },

    //조회버튼 클릭
    Search(){
      //검색조건 값을 변수에 입력
      this.startOfDate = moment(this.SDATE).toDate();
      this.endOfDate = moment(this.EDATE).toDate();

      //종료시간이 시작일자보다 빠를시 return
      if(this.endOfDate < this.startOfDate)
      {
        this.$bvModal.msgBoxOk("종료시간이 시작시간보다 빠를 수 없습니다.", GlobalValue.Err_option);
        return;
      }

      //두 기간 날짜 차이 계산
      const difDate = moment.duration(moment(this.EDATE).diff(moment(this.SDATE)))

      //최대 조회기간 5년
      if(difDate._data.years >=5)
      {
        this.$bvModal.msgBoxOk("최대 조회 기간은 5년 입니다.", GlobalValue.Err_option);
        return;
      }
      // 간트차트 calendar 날짜 업데이트
      this.config.chart.time.from = new Date(this.startOfDate).getTime() // caledar 시작시간
      this.config.chart.time.to = new Date(this.endOfDate).getTime()     // caledar 종료시간
      // 간트차트 날짜 형식 변경
      if(this.Cal_Type == "DAY"){
        this.config.chart.time.calculatedZoomMode = false;
        this.config.chart.calendar.levels = 
          [
            {
              // 상단 Month,Year 표기
              formats: [
                {
                  zoomTo: 21,
                  period: "month",
                  format({ timeStart }) {
                    return timeStart.format("MM월");
                  }
                }
             ]
            },
            {
              // DAY 표기
              main: true,
              formats: [
                {
                  zoomTo: 21,
                  period: "day",
                  format({ timeStart, vido, className }) {
                    return vido.html`<div class="${className}-content gstc-date-top">${timeStart.format("DD")}
                          </div><div class="${className}-content gstc-date-small">${timeStart.format("ddd")}</div>`;
                  }
                }
              ]
            }
          ]
      }
      else{
        this.config.chart.time.calculatedZoomMode = true;
        this.config.chart.calendar.levels = 
          [
            {
              // Day 상단 Month,Year 표기
              formats: [
                {
                  zoomTo: 21,
                  period: "year",
                  format({ timeStart }) {
                    return timeStart.format("YYYY년");
                  }
                },
                {
                  zoomTo: 27,
                  period: "year",
                  format({ timeStart }) {
                    return timeStart.format("YYYY년");
                  }
                },
             ]
            },
            {
              // MONTH 표기
              main: true,
              formats: [
                {
                  zoomTo: 21,
                  period: 'month',
                  default: true,
                  className: 'gstc-date-month-level-1',
                  format({ timeStart, vido, className }) {
                      return vido.html `<div class="${className}-content gstc-date-top">${timeStart.format('MMM')}</div><div class="${className}-content gstc-date-small gstc-date-bottom">${timeStart.format('MM')}</div>`;},
                },
                {
                  zoomTo: 25,
                  period: 'month',
                  default: true,
                  className: 'gstc-date-month-level-1',
                  format({ timeStart, vido, className }) {
                      return vido.html `<div class="${className}-content gstc-date-top">${timeStart.format('MMM')}</div>`;},
                },
                {
                  zoomTo: 27,
                  period: 'month',
                  default: true,
                  className: 'gstc-date-month-level-1',
                  format({ timeStart, vido, className }) {
                      return vido.html `<div class="${className}-content gstc-date-top">${timeStart.format('MM')}</div>`;},
                },
              ]
            }
          ]
      }


      //간트 조회
      this.Select_Item()
    },

    // GANTT ROW 조회
    async Select_Row() {
      try{

        //간트ROW(좌측트리) 조회
        let response =  await GET_GANTT_ROW(this.PJT_CLIENT_HEADER,this.PJT_CLIENT_DETAIL,this.PJT_NAME, this.SDATE,this.EDATE,this.SEARCH_TYPE)

        // 서버에서 결과값이 있으면 실행
        if(response.length > 0) 
        {
        var new_rows = {};
        for (var i = 0; i < response.length; i++) {
          // 최상위 노드가 아닌 경우 parentId 생성
          if(response[i]["PARENT_ID"] != "0") {
            new_rows[response[i]["ROW_ID"].toString()] = {
              id: response[i]["ROW_ID"],
              label: response[i]["ROW_NAME"],
              parentId: response[i]["PARENT_ID"],
              expanded: true
            };  
          }
          // 최상위 노드인 경우 parentId 미생성
          else {
            new_rows[response[i]["ROW_ID"].toString().trim()] = {
              id: response[i]["ROW_ID"].trim(),
              label: response[i]["ROW_NAME"].trim(),
              expanded: true
            };
          }
        }
        this.config.list.rows = new_rows; // row 바인딩
        this.state.update('config.list.rows', rows => { rows = new_rows;})
        }
      }
      catch(err)
      {
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }   
    },

    // GANTT ITEM 조회
    async Select_Item() {
      
      this.startOfDate = moment(this.SDATE).toDate();
      this.endOfDate = moment(this.EDATE).toDate();

      // 간트차트 calendar 날짜 업데이트
      this.config.chart.time.from = new Date(this.startOfDate).getTime() // caledar 시작시간
      this.config.chart.time.to = new Date(this.endOfDate).getTime()     // caledar 종료시간

      let response =  await GET_GANTT_ITEM(this.PJT_CLIENT_HEADER,this.PJT_CLIENT_DETAIL,this.PJT_NAME, this.SDATE,this.EDATE,this.SEARCH_TYPE) 
      // 서버에서 결과값이 있으면 실행
      if(response[0].ITEM_ID != "undefind" || response[0].ITEM_ID != null) 
      {
        var new_items = {};
        // 서버에서 결과값이 있으면 실행
        for (var i = 0; i < response.length; i++) 
        {
          new_items[response[i]["ITEM_ID"].toString().trim()] = {
            id: response[i]["ITEM_ID"].toString().trim(),
            rowId: response[i]["ROW_ID"].toString().trim(),
            label: response[i]["ROW_NAME"].toString().trim(),
            time: {
              start: new Date(response[i]["DATE_FROM"]).getTime(),
              end: new Date(response[i]["DATE_TO"]).getTime(),
            },
            style:{background : response[i]["ITEM_COLOR"], color : 'black'}
          };
        }
        this.config.chart.items = new_items
        this.state.update('config.chart.items', items => { items = new_items;})

        this.Select_Row(); // rows 조회
      }
      // 서버에서 결과값이 없으면 초기화
      else
      {
        this.config.chart.items = undefined
        this.state.update('config.chart.items', items => { items = undefined;})
        this.config.list.rows = undefined
        this.state.update('config.list.rows', rows => { rows = undefined;})
      }
    },

    // Gantt Chart 상태 이벤트
    onState(state) {
      this.state = state;
    },

    //enter 키 입력시 조회
    Search_when_Enter(){
      this.Search();
    }
  }
};

// 간트차트 아이템 클릭 이벤트
class ItemClickAction {
  constructor(element, data) {
    this.data = data;
    this.onClick = this.onClick.bind(this);
    element.addEventListener("click", this.onClick);
  }

  update(element, data) {
    this.data = data;
  }

  destroy(element, data) {
    element.removeEventListener("click", this.onClick);
  }

  onClick(event) {
  
  }
}

// 간트차트 영역 속성
function list_column_style(element, data) {
  return {
    update(element, data) {},
    destroy(element, data) {
      element.style.height = "30px";
    },
  };
}

// 현재 시스템 시간 10 이하인 경우
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
</script>

<style lang="less" scoped>
/* Gantt Chart CSS */
// /* Gantt Chart x축 Scroll */
// .gantt-schedule-timeline-calendar__horizontal-scroll {
//   overflow: hidden; 
//   overflow-x: hidden; 
// }
// .gantt-schedule-timeline-calendar__horizontal-scroll > * {
//   will-change: scroll-position; 
// }

// /* Gantt Chart Y축 Scroll */
// .gantt-schedule-timeline-calendar__vertical-scroll {
//   overflow: hidden; 
//   overflow-y: visible; 
//   flex-shrink: 0; 
//   right: 0px; 
//   position: relative;
// }
// .gantt-schedule-timeline-calendar__vertical-scroll > * {
//   will-change: scroll-position; 
// }

/* Gantt Chart Weekend HighLight Cell Color */
.gantt-schedule-timeline-calendar__chart-timeline-grid-row-block--weekend{
  background:#88898a33;
}

/* Gantt Chart today Cell Color */
.gantt-schedule-timeline-calendar__chart-timeline-grid-row-block.current {
    background: rgb(44 61 114 / 46%);
    
}

.gantt-schedule-timeline-calendar__chart-calendar-date--level-1.gstc-current{
    color: #0c3f8c;
    border-bottom: 3px solid #042347;
    background: #e5e5e6;
    font-weight: bold;
}

</style>