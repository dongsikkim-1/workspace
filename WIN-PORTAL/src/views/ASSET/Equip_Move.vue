<template >
    <div>
      <modals-container />
        <!-- 화면 Contents 영역 -->
        <div class="contents">
             <!-- 공통 버튼 영역 -->
            <div class="common-btnwrap">
                <b-button size="sm" variant="primary" @click="search">조회</b-button>&nbsp;
                <b-button size="sm" variant="primary" @click="add">추가</b-button>
            </div>
       <!-- 공통 검색 영역 -->
      <div class="common-schwrap">
        <fieldset>
          <div class="row">
             <div style="width : 260px; margin-top : 5px">
              <div>  
                <label class="control-label" style="float : left; min-width: 60px">기간: </label>
                 <input type="date" id="REG_SDATE" v-model="LB_REG_SDATE_DATE" class="form-control" style="width: 200px">
              </div>
            </div>
            <div id="EDATE_DIV" style="width: 280px; display: contents; ">
            <label class="control-label" style="margin-right: 10px; ; margin-top : 10px;text-align : center"> ~ </label>
            <input type="date" id="REG_EDATE" v-model="LB_REG_EDATE_DATE" class="form-control" style="width: 200px ; margin-top : 5px">
            </div>
            <div class="col-md-3 col-sm-6" style="margin-left : 20px">
              <label class="control-label" style="float : left; min-width: 60px">등록자 : </label>
              <div class="col-md-8 col-sm-8 col-xs-8">
                <b-form-input v-model="LB_REG_USER_TXT"></b-form-input>
              </div>
          </div>
          </div>
        </fieldset>
        </div>
        
            <!-- 그리드 영역 -->
            <grid
                ref="tuiGrid"
                :data="this.grid_data"
                :rowHeaders="gridProps.rowHeaders"
                :columns="gridProps.columns"
                :header="gridProps.header"
                :rowHeight="gridProps.rowHeight"
                :width="gridProps.width"
                :columnOptions="gridProps.columnOptions"
                :summary="gridProps.summary"
                :theme="gridProps.myTheme"
                :scrollY="gridProps.scrollY"
                :scrollX="gridProps.scrollX"
                :showDummyRows="gridProps.dummy"
                :pageOptions="gridProps.pageOptions"
                @click ="grid_Click"
            ></grid>
             <!-- 그리드 영역 -->

        </div><!-- END contents -->
    </div>
</template>

<script>
// import 영역
/*eslint-disable no-unused-vars, no-empty*/ // 변수 선언 후 사용하지 않거나, 무의미한 띄어쓰기가 코드에 들어간 경우 에러를 내뱉는 경우를 방지
import Vue from 'vue';
import "tui-pagination/dist/tui-pagination.css"; // tui-Grid Pagination Css
import "tui-grid/dist/tui-grid.css"; // tui-Grid Module Css
import { Grid } from "@toast-ui/vue-grid"; // tui-Grid Module
import { ASSET_MOVE_OUT} from "@/api/Asset_Out.js"; // 도서분류 콤보 , 도서현황 조회, 도서 대여
import { getToken } from "@/utils/Cookie"; // 로그인한 사용자 ID
import Utility from "../../assets/js/CommonUtility.js";   // 전 화면 공통으로 사용하는 함수
import GlobalValue from "../../assets/js/GlobalValue.js"; // 전 화면 공통으로 사용하는 변수
import {GridDefault} from "../../assets/js/GridDefault.js"; // 그리드 기본값 세팅
import moment from 'moment'

// Vue 핸들링 영역
export default {

  // Component 선언부
  components: {
    grid: Grid // import 한 tui-grid를 grid 태그로 사용가능하게 한다.
  },

  // 초기 데이터 변수 선언부
  data() {
    return {
   
      LB_REG_USER: "등록자 ",     // 조회조건 등록자  Label
      LB_REG_SDATE: "출고날짜 ",   // 조회조건 등록일시 Label
      LB_REG_EDATE: "~",   // 조회조건 등록일시 Label
      
      gridProps: [],  // 그리드 Column Setting 배열 변수
      
      grid_data: [], // 그리드에 바인딩 할 Data 배열 변수

      LB_REG_USER_TXT : "",     //검색조건 : 등록자
      LB_REG_SDATE_DATE : "",   //검색조건 : 시작날짜
      LB_REG_EDATE_DATE : "",   //검색조건 : 종료날짜

      Device_Type : "" // 장비타입
    };
  },

  // 화면이 로드될 때 실행되는 이벤트
  created() {
    // 그리드 Option Setting
    this.gridProps = {
      data: this.grid_data,
      scrollY: false,
      scrollX: false,
      dummy: false,
      columns: [
        { header: "등록번호", name: "RNF_CD", align: "center", width: "80", ellipsis:true},
        { header: "날짜", name: "REG_DATE", align: "center", width: "80" },
        { header: "내역",     name: "DETAIL_TXT", align: "left", width: "300" },
        { header: "사용자",   name: "USER_NAME", align: "center", width: "80" },
        { header: "PM_ID",   name: "CHARGE_PM", align: "center", width: "60" },
        { header: "PM",      name: "CHARGE_PM_NAME", align: "center", width: "60" },
        { header: "위치",     name: "LOC_NAME", align: "center", width: "80" },
        { header: "위치CODE", name: "LOC", align: "center", width: "80", hidden:true},
        { header: "본체",     name: "FORWARD_COM", align: "center", width: "50" },
        { header: "모니터",   name: "FORWARD_MNT", align: "center", width: "50" },
        { header: "등록자",   name: "REG_USER", align: "center", width: "60", ellipsis:true},
        { header: "비고",    name: "BIGO", align: "left", width: "150"}
      ],
      myTheme: {
        name: "mygrid",
        value: GridDefault.GridValue()
      },
      header: GridDefault.header,                // 헤더 정렬 (align: "center")
      rowHeight: GridDefault.rowHeight,          // Row크기 (Default : 30)
      bodyHeight: GridDefault.bodyHeight,        // 그리드 크기 (Default : 300)
      columnOptions : GridDefault.columnOptions, // 컬럼 사이즈 재조정 가능 여부 (resizable : true)
      pageOptions: GridDefault.pageOptions       // 사용자 pageOptions 설정 사용 여부 (useClient: true, perPage: 10)
    };
  },

  // 화면이 로드될 때 DOM 생성이 완료된 후 실행되는 이벤트 선언부
  mounted() {
    //텍스트 타입에 달력으로 표시하기 위함
    // var d = new Date()
    // var yyyy = d.getFullYear()
    // var smm = (d.getMonth() + 1).toString().length === 1 ? '0' + (d.getMonth()) : (d.getMonth())
    // var emm = (d.getMonth() + 1).toString().length === 1 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
    // var dd = (d.getDate().toString().length === 1) ? '0' + d.getDate() : d.getDate()


    var sDate = moment(new Date()).add(-1, 'month').format("YYYY-MM-DD")
    var eDate =  moment(new Date()).format("YYYY-MM-DD")

    if(this.$route.params.LB_REG_SDATE_DATE != undefined || this.$route.params.LB_REG_SDATE_DATE != null)
    {
      this.LB_REG_SDATE_DATE = this.$route.params.LB_REG_SDATE_DATE
    }
    else
    {
      this.LB_REG_SDATE_DATE = sDate
    }
    if(this.$route.params.LB_REG_EDATE_DATE != undefined || this.$route.params.LB_REG_EDATE_DATE != null)
    {
      this.LB_REG_EDATE_DATE = this.$route.params.LB_REG_EDATE_DATE
    }
    else
    {
      this.LB_REG_EDATE_DATE = eDate
    }
    this.search();
    Utility.fn_SetMenuPath(this); // 메뉴 Path 표시
    // window.addEventListener('load',  this.ScreenOnload(), false); // 초기 화면 Screen 설정 이벤트
    this.resize(); // 화면 사이즈 변경시 발생되는 이벤트
  
  },

  // 이벤트 선언부
  methods: {
    // 초기 시용자 Screen 설정 이벤트
    ScreenOnload(){
      Utility.fn_SetMenuPath(this); // 메뉴 Path 표시
      this.setgridcolumn(); // 그리드 컬럼 Visible 이벤트
    },

    // Screen 사이즈 변경시 발생되는 이벤트
    resize() {
      window.onresize = () => {
        this.setgridcolumn(); // 그리드 컬럼 Visible 이벤트
      };
    },

    // 사용자 Screen에 맞는그리드 컬럼 show/hide 이벤트
    setgridcolumn: function() {

      // 디바이스의 타입을 가져온다.
      this.Device_Type = Utility.fn_ScreenSize();

      // 사용자 디바이스가 Mobile (세로모드)인 경우
      if (this.Device_Type == '"Mobile_V"' || this.Device_Type == "Mobile_V") 
      {
        // 그리드 보여지는 컬럼(입고 날짜, 위치(NAME)) 
        Utility.fn_Grid_ShowColumn(this.$refs.tuiGrid, ["REG_DATE","LOC_NAME"]); 
        
        // 그리드 숨겨지는 컬럼(등록자, 담당PM(ID), 담당PM(NAME), 등록번호, 위치(VALUE),본체수, 모니터수, 내역, 비고 ) 
        Utility.fn_Grid_HideColumn(this.$refs.tuiGrid, ["RNF_CD","DETAIL_TXT","CHARGE_PM","CHARGE_PM_NAME","LOC","FORWARD_COM", "FORWARD_MNT","REG_USER","BIGO"]);
      }
      // 사용자 디바이스가 Mobile (가로모드)인 경우
      else if (this.Device_Type == '"Mobile_H"' || this.Device_Type == "Mobile_H") 
      {
       // 그리드 보여지는 컬럼(등록자, 입고날짜, 담당PM(NAME), 담당PM 이름, 위치(NAME),본체수, 모니터수) 
        Utility.fn_Grid_ShowColumn(this.$refs.tuiGrid, ["REG_USER","REG_DATE","CHARGE_PM_NAME","LOC_NAME","FORWARD_COM", "FORWARD_MNT"]); 
        
        // 그리드 숨겨지는 컬럼(등록번호, 위치(VALUE),담당PM(ID),내역, 비고 )  
        Utility.fn_Grid_HideColumn(this.$refs.tuiGrid, ["RNF_CD","LOC","CHARGE_PM","DETAIL_TXT","BIGO"]);
      }
      // 사용자 디바이스가 Tablet인 경우
      else if (this.Device_Type == '"Tablet"' || this.Device_Type == "Tablet") 
      {
        // 그리드 보여지는 컬럼(등록번호, 등록자, 입고날짜, 내역, 담당PM(NAME), 위치(NAME), 본체수, 모니터수) 
        Utility.fn_Grid_ShowColumn(this.$refs.tuiGrid, ["RNF_CD", "REG_USER","REG_DATE", "DETAIL_TXT","CHARGE_PM_NAME","LOC_NAME","FORWARD_COM", "FORWARD_MNT"]); 
        
        // 그리드 숨겨지는 컬럼(담당PM(ID),위치(VALUE),비고) 
        Utility.fn_Grid_HideColumn(this.$refs.tuiGrid, ["CHARGE_PM","LOC","REMARK"]);
      }
      // 그 외 Dsketop 모니터 또는 Dsketop 모니터보다 큰 경우
      else 
      {
         // 그리드 보여지는 컬럼(등록번호, 등록자, 입고날짜,내역, 담당PM(NAME),위치(NAME), 본체수, 모니터수, 비고 )
         Utility.fn_Grid_ShowColumn(this.$refs.tuiGrid, ["RNF_CD", "REG_USER","REG_DATE", "DETAIL_TXT","CHARGE_PM_NAME","LOC_NAME","FORWARD_COM", "FORWARD_MNT","REMARK" ]); 
         // 그리드 숨겨지는 컬럼(위치(VALUE),담당PM(ID)) 
         Utility.fn_Grid_HideColumn(this.$refs.tuiGrid, ["LOC","CHARGE_PM"]);
      }
    },

    // 조회 이벤트
    async search() {
      try
      {
        //파라미터로 등록자, 등록일시(시작날짜~종료날짜) 사용

        let grd_result = await ASSET_MOVE_OUT(this.LB_REG_USER_TXT.toString() ,this.LB_REG_SDATE_DATE.toString(),this.LB_REG_EDATE_DATE.toString())

         // 조회된 데이터가 null이거나 undefined 인 경우
        if(Utility.fn_IsNull(grd_result[0].RNF_CD))
        {
          this.$refs.tuiGrid.invoke("clear"); // 그리드에 바인딩 된 데이터 초기화(빈 값 row 1개 생성 방지)
          return;
        }
        this.$refs.tuiGrid.invoke("resetData", grd_result); // 그리드에 조회된 데이터 바인딩.
      }
      catch(err)
      {
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    // 추가 버튼 이벤트
    async add() {
      var msgBox
      // 로그인 정보가 없는 경우 추가/수정 불가
      if(Utility.fn_IsNull(getToken("USER_ID")))
      {
        try
        { 
          msgBox = await this.$bvModal.msgBoxOk('로그인 후 이용해 주세요.', GlobalValue.Err_option);
         
          if(msgBox)
          {
            this.$bvModal.close; // 알림창 닫기
          }
        }
        catch(err)
        { 
          this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
        }
       return;
      }
      else
      {
        this.$router.push({
        name: '장비 이동 추가/수정',
        params:{LB_REG_SDATE_DATE : this.LB_REG_SDATE_DATE,
                LB_REG_EDATE_DATE : this.LB_REG_EDATE_DATE}
        });
      }
      
    },

    // 그리드 클릭 이벤트
    grid_Click(ev){
      if(ev.targetType === "cell")
      {
        var msgBox
        // 장비 출고 추가(수정) 화면으로 이동합니다.
        this.$router.push({
        name: "장비 이동 추가/수정"  
        //넘길 파라미터
        ,params: {RNF_CD         : this.$refs.tuiGrid.invoke("getValue",ev.rowKey,"RNF_CD"),
                  LOC            : this.$refs.tuiGrid.invoke("getValue",ev.rowKey,"LOC"),
                  REG_DATE       : this.$refs.tuiGrid.invoke("getValue",ev.rowKey,"REG_DATE"),
                  CHARGE_PM      : this.$refs.tuiGrid.invoke("getValue",ev.rowKey,"CHARGE_PM"),
                  CHARGE_PM_NAME : this.$refs.tuiGrid.invoke("getValue",ev.rowKey,"CHARGE_PM_NAME"),
                  DETAIL_TXT     : this.$refs.tuiGrid.invoke("getValue",ev.rowKey,"DETAIL_TXT"),
                  BIGO           : this.$refs.tuiGrid.invoke("getValue",ev.rowKey,"BIGO"),
                  DST_CNT        : this.$refs.tuiGrid.invoke("getValue",ev.rowKey,"FORWARD_COM"),
                  MNT_CNT        : this.$refs.tuiGrid.invoke("getValue",ev.rowKey,"FORWARD_MNT"),
                  LB_REG_SDATE_DATE : this.LB_REG_SDATE_DATE,
                  LB_REG_EDATE_DATE : this.LB_REG_EDATE_DATE
                 }
        });
      }
    },


  }
};
</script>

<style lang="less" scoped>


</style>