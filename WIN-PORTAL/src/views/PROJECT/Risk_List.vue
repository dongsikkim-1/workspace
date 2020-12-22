<template >
    <div>
      <modals-container />
        <!-- 화면 Contents 영역 -->
        <div class="contents">
             <!-- 프로젝트 정보 버튼 -->
            <div class="common-btnwrap">
                <b-button size="sm" variant="primary" @click="search">조회</b-button>&nbsp;
                <b-button size="sm" variant="primary" @click="add">등록</b-button>&nbsp;
                <b-button size="sm" variant="primary" @click="del">삭제</b-button>
            </div>
            <!-- 프로젝트 정보 버튼 END -->

       <!-- 공통 검색 영역 -->
      <div class="common-schwrap">
        <fieldset>
          <div class="row">
            
            <div class="col-md-3 col-sm-6">
              <label class="col-md-4 col-sm-4 col-xs-4 control-label" v-text="LB_ENROLL_DATE"></label>
              <div class="col-md-8 col-sm-8 col-xs-8">                                
                 <input type="date" id="ENROLL_DATE" v-model="DTE_ENROLL_DATE_F" class="form-control">
              </div>
            </div>
            <div class="col-md-3 col-sm-6">
              <label class="col-md-1 col-sm-1 col-xs-1 control-label">~</label>
              <div class="col-md-8 col-sm-8 col-xs-8">
                 <input type="date" id="ENROLL_DATE" v-model="DTE_ENROLL_DATE_T" class="form-control">
              </div>
            </div>
            <div class="col-md-3 col-sm-6">
              <label class="col-md-2 col-sm-2 col-xs-2 control-label" v-text="LB_RISK_TYPE"></label>  
              <div class="col-md-8 col-sm-8 col-xs-8">
                <b-form-select
                  v-model="selected1"
                  :options="cboRISK_TYPE_List"
                  class="form-control"
                ></b-form-select>
              </div>
            </div>
            <div class="col-md-3 col-sm-6">
              <label class="col-md-3 col-sm-3 col-xs-3 control-label" v-text="LB_RISK_CAUSE"></label>  
              <div class="col-md-8 col-sm-8 col-xs-8">
                <b-form-select
                  v-model="selected2"
                  :options="cboRISK_CAUSE_List"
                  class="form-control"
                ></b-form-select>
              </div>
            </div>
            <div class="col-md-3 col-sm-6">
              <label class="col-md-4 col-sm-4 col-xs-4 control-label" v-text="LB_PJT_NAME"></label>  
              <div class="col-md-8 col-sm-8 col-xs-8">
                <b-form-input v-model="TXT_PJT_NAME"></b-form-input>
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
import { getCommonCode } from "@/api/Common.js"; // 공통코드
import { Select_Risk, Delete_Risk} from "@/api/Risk_List.js"; // 위험관리 조회
import { Grid } from "@toast-ui/vue-grid"; // tui-Grid Module
import { ASSET_MOVE_IN} from "@/api/Asset_In.js"; // 입고 조회
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
   
      LB_PJT_NAME: "프로젝트명 ",     // 조회조건 프로젝트명  Label
      LB_ENROLL_DATE: "등록일 ",      // 조회조건 등록일 Label
      LB_RISK_TYPE: "유형 ",          // 조회조건 유형 Label
      LB_RISK_CAUSE: "원인 ",         // 조회조건 원인 Label
      
      cboRISK_TYPE_List: [{}],  // 조회조건 유형 콤보 바인딩 배열 변수
      cboRISK_CAUSE_List: [{}], // 조회조건 원인 콤보 바인딩 배열 변수
      selected1: '',            // 조회조건 유형 콤보 세팅
      selected2: '',            // 조회조건 원인 콤보 세팅

      DTE_ENROLL_DATE_F : "",     // 검색조건 : 시작날짜
      DTE_ENROLL_DATE_T : "",     // 검색조건 : 종료날짜
      TXT_PJT_NAME : "",          // 검색조건 : 프로젝트명

      gridProps: [],  // 그리드 Column Setting 배열 변수
      grid_data: [],  // 그리드에 바인딩 할 Data 배열 변수

      Device_Type : "" // 스크린 사이즈
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
      rowHeaders: ["checkbox"], // Row 첫행 체크박스 설정
      columns: [
        { header: "No.", name: "RISK_NO", align: "center", width: "30", ellipsis:true},
        { header: "프로젝트명", name: "PJT_NAME", align: "center", width: "120" },
        { header: "유형", name: "RISK_TYPE", align: "center", width: "80" },
        { header: "원인", name: "RISK_CAUSE", align: "center", width: "110" },
        { header: "위험요소", name: "RISK_FACTORS", align: "center", width: "200" },
        { header: "등록일", name: "ENROLL_DATE", align: "center", width: "80" },
        { header: "처리일", name: "PROCESS_DATE", align: "center", width: "80" }
      ],
      myTheme: {
        name: "mygrid",
        value: GridDefault.GridValue()
      },
      header: GridDefault.header, // 헤더 정렬 (align: "center")
      rowHeight: GridDefault.rowHeight, // Row크기 (Default : 30)
      bodyHeight: GridDefault.bodyHeight, // 그리드 크기 (Default : 300)
      columnOptions : GridDefault.columnOptions, // 컬럼 사이즈 재조정 가능 여부 (resizable : true)
      pageOptions: GridDefault.pageOptions // 사용자 pageOptions 설정 사용 여부 (useClient: true, perPage: 10)
    };
  },

  // 화면이 로드될 때 DOM 생성이 완료된 후 실행되는 이벤트 선언부
  mounted() {

    // 등록일 현재 일자로 세팅
    this.DTE_ENROLL_DATE_F = moment(new Date()).add(-1, 'month').format("YYYY-MM-DD");
    this.DTE_ENROLL_DATE_T = moment(new Date()).format("YYYY-MM-DD");

    window.addEventListener('load',  this.ScreenOnload(), false); // 초기 화면 Screen 설정 이벤트
    this.setcombo(); // 조회조건 콤보 바인딩 이벤트
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
        Utility.fn_Grid_ShowColumn(this.$refs.tuiGrid, ["RISK_NO", "PJT_NAME","RISK_TYPE", "RISK_CAUSE", "RISK_FACTORS", "ENROLL_DATE", "PROCESS_DATE"]); 
        
        // 그리드 숨겨지는 컬럼(등록자, 담당PM(ID), 담당PM(NAME), 등록번호, 위치(VALUE),본체수, 모니터수, 내역, 비고 ) 
        //Utility.fn_Grid_HideColumn(this.$refs.tuiGrid, ["REG_USER","RNF_CD","LOC","RECEIV_COM", "RECEIV_MNT","DETAIL_TXT","BIGO"]);
      }
      // 사용자 디바이스가 Mobile (가로모드)인 경우
      else if (this.Device_Type == '"Mobile_H"' || this.Device_Type == "Mobile_H") 
      {
       // 그리드 보여지는 컬럼(입고 날짜, 위치(NAME)) 
        Utility.fn_Grid_ShowColumn(this.$refs.tuiGrid, ["RISK_NO", "PJT_NAME","RISK_TYPE", "RISK_CAUSE", "RISK_FACTORS", "ENROLL_DATE", "PROCESS_DATE"]); 
        
        // 그리드 숨겨지는 컬럼(등록번호, 위치(VALUE),담당PM(ID),내역, 비고 )  
        //Utility.fn_Grid_HideColumn(this.$refs.tuiGrid, ["RNF_CD","LOC","DETAIL_TXT","BIGO"]);
      }
      // 사용자 디바이스가 Tablet인 경우
      else if (this.Device_Type == '"Tablet"' || this.Device_Type == "Tablet") 
      {
        // 그리드 보여지는 컬럼(입고 날짜, 위치(NAME)) 
        Utility.fn_Grid_ShowColumn(this.$refs.tuiGrid, ["RISK_NO", "PJT_NAME","RISK_TYPE", "RISK_CAUSE", "RISK_FACTORS", "ENROLL_DATE", "PROCESS_DATE"]); 
        
        // 그리드 숨겨지는 컬럼(담당PM(ID),위치(VALUE),비고) 
        //Utility.fn_Grid_HideColumn(this.$refs.tuiGrid, ["LOC","BIGO"]);
      }
      // 그 외 Dsketop 모니터 또는 Dsketop 모니터보다 큰 경우
      else 
      {
         // 그리드 보여지는 컬럼(입고 날짜, 위치(NAME)) 
         Utility.fn_Grid_ShowColumn(this.$refs.tuiGrid, ["RISK_NO", "PJT_NAME","RISK_TYPE", "RISK_CAUSE", "RISK_FACTORS", "ENROLL_DATE", "PROCESS_DATE"]); 
         // 그리드 숨겨지는 컬럼(위치(VALUE),담당PM(ID)) 
         //Utility.fn_Grid_HideColumn(this.$refs.tuiGrid, ["LOC"]);
      }
    },

    // 조회조건 위험 유형 콤보 바인딩 이벤트
    async setcombo() {
      try
      {
        let risk_type_combo = await getCommonCode("RISKTYPE");
        let risk_cause_combo = await getCommonCode("RISKCAUSE");

        // 조회된 데이터가 null이거나 undefined 인 경우
        if(Utility.fn_IsNull(risk_type_combo[0].CODE_NO))
        {
          return;
        }

        // 조회된 데이터가 null이거나 undefined 인 경우
        if(Utility.fn_IsNull(risk_cause_combo[0].CODE_NO))
        {
          return;
        }

        // 첫번째 콤보에 전체를 추가한다.
        var arr1 = [{ text: "전체", value: "%" }];
        var arr2 = [{ text: "전체", value: "%" }];
        
        // 조회된 데이터를 배열에 값에 맞게 추가한다.
        for (var i = 1; i < risk_type_combo.length + 1; i++) 
        {
          arr1[i] = {
            text: risk_type_combo[i - 1]["CODE_NAME"], // 코드명
            value: risk_type_combo[i - 1]["CODE_NO"] // 코드
          };
        }

        // 조회된 데이터를 배열에 값에 맞게 추가한다.
        for (var j = 1; j < risk_cause_combo.length + 1; j++) 
        {
          arr2[j] = {
            text: risk_cause_combo[j - 1]["CODE_NAME"], // 코드명
            value: risk_cause_combo[j - 1]["CODE_NO"] // 코드
          };
        }

        this.cboRISK_TYPE_List = arr1; // 조회조건 위험 유형 콤보 바인딩
        this.cboRISK_CAUSE_List = arr2; // 조회조건 위험 원인 콤보 바인딩

        this.selected1 = "%";          // 조회조건 위험 유형 초기값 '전체' 설정
        this.selected2 = "%";          // 조회조건 위험 유형 초기값 '전체' 설정

        this.search(); // 그리드 조회 이벤트
      }
      catch(err)
      {
         this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    // 조회 이벤트
    async search() {
      try
      {
        //파라미터로 등록자, 등록일시(시작날짜~종료날짜) 사용
        let grd_result = await Select_Risk(moment(this.DTE_ENROLL_DATE_F).format("YYYYMMDD"), moment(this.DTE_ENROLL_DATE_T).format("YYYYMMDD"), this.TXT_PJT_NAME.toString(), this.selected1, this.selected2)

         // 조회된 데이터가 null이거나 undefined 인 경우
        if(Utility.fn_IsNull(grd_result[0].RISK_NO))
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
        name: "위험 관리 상세",
        params: {RISK_NO : null}
        });
      }
    },

    // 삭제 버튼 클릭 이벤트
    async del(){
      var msgBox;
      try
      {
        var arr = []; //체크된 행을 담는 변수
        arr = this.$refs.tuiGrid.invoke("getCheckedRows");
         // 체크된 행이 없는 경우
        if(arr.length ===0)
        {
          try
          {
            msgBox = await this.$bvModal.msgBoxOk('선택된 행이 없습니다.', GlobalValue.Err_option);
            if(msgBox)
            {
              this.$bvModal.close; // 알림창 닫기
              return;
            }                                      
          }
          catch(err)
          { 
            this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
          }
        }
        else // 체크된 행이 있는 경우 
        {
          try
          {
            msgBox = await this.$bvModal.msgBoxConfirm("선택된 행을 삭제하시겠습니까?", GlobalValue.Info_option);
        
            if(msgBox)
            {
              var data=[];
              for(var i=0; i<arr.length; i++)
              {
                 data[i]= {data: JSON.stringify({ RISK_NO:arr[i].RISK_NO.toString() })}
              }            
              var Del_Data={data}; // 삭제할 데이터를 담는 변수(등록번호키)

              let risk_del = await Delete_Risk(Del_Data);

              if (risk_del[0].query_success == "Y") // 정상적인 삭제인 경우
              {
                msgBox = await this.$bvModal.msgBoxOk('삭제 되었습니다.',GlobalValue.Success_option)
                if(msgBox)
                {
                  this.$bvModal.close; // 알림창 닫기
                  this.search();
                }
              }
              else // 삭제 결과가 에러일 경우
              {
                try
                {
                  var msgbox = await this.$bvModal.msgBoxOk(risk_del[0].query_err_msg,GlobalValue.Err_option)
                  if(msgBox)                                      
                  this.$bvModal.close; // 알림창 닫기
                }
                catch(err)
                {
                  this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
                }
              }
            }
          }
          catch(err)
          {
            this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
          }
        }
      }
      // 도서 삭제 시작 부분 에러 발생시
      catch(err)
      {
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    // 그리드 클릭 이벤트
    grid_Click(ev){
      if(ev.targetType === "cell")
      {
        var msgBox
        // 장비 입고 추가(수정) 화면으로 이동합니다.
        this.$router.push({
        name: "위험 관리 상세"  
        //넘겨줄 파라미터
        ,params: {RISK_NO : this.$refs.tuiGrid.invoke("getValue",ev.rowKey,"RISK_NO")}
      });
      }
    },


  }
};
</script>

<style lang="less" scoped>


</style>