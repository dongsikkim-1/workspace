<template>
  <div id="app" style="width: 50%; margin-top : 20px ;margin-right : 50px;">
    <GSTC :config="config"/>
  </div>
</template>

<script>
/*eslint-disable no-unused-vars, no-empty*/ // 변수 선언 후 사용하지 않거나, 무의미한 띄어쓰기가 코드에 들어간 경우 에러를 내뱉는 경우를 방지
import GSTC from "../../components/GSTC.vue";
// import GSTC from "vue-gantt-schedule-timeline-calendar";
import Index from  "gantt-schedule-timeline-calendar"
import Utility from "../../assets/js/CommonUtility.js";   // 전 화면 공통으로 사용하는 함수
import {SELECT_ITEMS,SELECT_ROWS} from "@/api/CJH_Scheduler_TEST.js"; //DB조회 참조
import moment, { months } from 'moment'

var startOfWeek = moment().startOf("week").toDate();
var endOfWeek = moment().endOf("week").toDate();

   
export default {
  name: "app",
  components: {
    GSTC
  },
  data() {
    return {
      plan_from :
      startOfWeek.getFullYear().toString() +
      addZero(startOfWeek.getMonth() + 1).toString() +
      addZero(startOfWeek.getDate()),
      plan_to :
        endOfWeek.getFullYear().toString() +
        addZero(endOfWeek.getMonth() + 1).toString() +
        addZero(endOfWeek.getDate()),
      config: {
        height : 600,
        list: {
          toggle : {
            display : false
          },
          rows: {},
          columns: {
            data: {
              label: {
                id: "label",
                data: "label",
                width: 150,
                header: {
                  content: "이름"
                }
              }
            }
          }
        },
        chart: {
          time: {
            from: startOfWeek.getTime(),
            to :endOfWeek.getTime(),
            period : "day",
            calculatedZoomMode: true
          },
          calendar:{
            levels: [
              {
                expand: true,
                formats: [
                  {
                    zoomTo: 23,
                    period: 'month',
                    format({ timeStart }) {
                      return timeStart.format('YYYY MMMM ');
                    }
                  },
                ]
              },
              {
                main: true,
                formats: [
                  {
                    zoomTo: 28,
                    period: 'day',
                    format({ timeStart, className, vido }) {
                      return vido.html `<div class="${className}-content gstc-date-top">${timeStart.format('DD')}</div><div class="${className}-content gstc-date-extra-small" style = "font-size : 13pt"> ${timeStart.format('ddd')}</div>`;
                    }
                  },
                ],
              }
            ],
          },
          items: {},
        },
        locale : {
          name: 'en',
          months: '1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월'.split('_'),
          weekdaysShort: '(일)_(월)_(화)_(수)_(목)_(금)_(토)'.split('_'),
          weekdaysMin: '(일)_(월)_(화)_(수)_(목)_(금)_(토)'.split('_')
        },
        actions: {
          'chart-timeline-items-row-item': [ItemClickAction], //itme(task) 속성,이벤트 
        }
      }
    };
  },
  mounted() {
    this.ScreenOnload();
    this.resize(); // 화면 사이즈 변경시 발생되는 이벤트
    this.Createdata();
  },
  methods: {
    async Createdata(){
      //row 생성
      let rows = {};
      let items = {};

      let row_data = await SELECT_ROWS();
      let items_data = await SELECT_ITEMS(this.plan_from,this.plan_to);
      console.log("list_before",this.config.list)

      // for (let i = 0; i < 11; i++) {
      //     const idx = i.toString();
      //     rows[idx] = {
      //       id : idx.toString(),
      //       label: "ROW_"+ i,
      //       expanded: false,
      //       height : 100
      //    };
      // }

      for (let i = 0; i < row_data.length; i++) {
          rows[row_data[i].ROW_ID] = {
            id : row_data[i].ROW_ID,
            label: row_data[i].ROW_NAME,
            parentId : row_data[i].PARENT_ROW,
            expanded: true,
            height : 100
         };
      }
      this.config.list.rows = rows;

      for (let j = 0; j < items_data.length; j++) {
         const idx2 = j.toString();
         items[idx2] = {
          id : items_data[j].ROW_NUM,
          rowId : items_data[j].ROW_ID,
          label: items_data[j].WRK_TYPE,
          MGMT_CD : items_data[j].MGMT_CD,
          REAL_NAME : items_data[j].REAL_NAME,
          ATTACH_KEY : items_data[j].ATTACH_KEY,
          time: {
              start: new Date(items_data[j].ACT_FROM).getTime(),
              end: new Date(items_data[j].ACT_TO).getTime()
            },
          style : {background: items_data[j].WRK_STATUS_COLOR}
        };
      }
      
      this.config.chart.items = items;

      console.log("TEST",this.config)
      
    },

    ScreenOnload(){
      Utility.fn_SetMenuPath(this); // 메뉴 Path 표시
    },

    // Screen 사이즈 변경시 발생되는 이벤트
    resize() {
      window.onresize = () => {
        this.setgridcolumn(); // 그리드 컬럼 Visible 이벤트
      };
    },

  }
};

// 현재 시스템 시간 10 이하인 경우
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

//차트 아이템 속성,이벤트 클래스
class ItemClickAction {
  constructor(element, data) {
    this.data = data;
    this.element = element;
    this.onClick = this.onClick.bind(this);
    element.addEventListener('click', this.onClick);
  }
 
  update(element, data) {
    this.data = data;
    this.element = element
    element.style.borderRadius = '10px';
    element.style.fontSize = "20pt";
    element.style.fontWeight = "Bold";
    element.style.textAlign = "center";
  }
 
  destroy(element, data) {
    element.removeEventListener('click', this.onClick);
  }
 
  onClick(event) {
    alert(`사번: ${this.data.item.id} / 이름: ${this.data.item.label} / 작업번호: ${this.data.item.wrk_code}`);
  }
}

</script>