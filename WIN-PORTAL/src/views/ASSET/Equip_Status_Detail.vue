<template>
  <div>
    <div class="modal-header">
      <h4 class="modal-title" id="myModalLabel">장비 상세정보</h4>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close" style="color:#fff; margin-top: 1px;">
        <span aria-hidden="true" style="margin-right: 20px;">&times;</span>
      </button>
    </div>
    <div class="modal-body"> 
      <!-- modal 컨텐츠 영역 -->
      <div class="contents">
        <div class="mobile_modal_form">
          <div class="modal_form">
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
              :scrollX="gridProps.scrollX"
              :scrollY="gridProps.scrollY"
              :showDummyRows="gridProps.dummy"
              :pageOptions="gridProps.pageOptions"
              @dblclick ="grid_Click"
            ></grid> 
          </div>
        </div>
      </div>
      <!--//modal 컨텐츠 영역 -->
    </div>
  </div>
</template>

<script>
// import 영역
import Utility from "../../assets/js/CommonUtility.js";   // 전 화면 공통으로 사용하는 함수
import "tui-pagination/dist/tui-pagination.css";          // tui-Grid Pagination Css
import "tui-grid/dist/tui-grid.css";                      // tui-Grid Module Css
import { Grid } from "@toast-ui/vue-grid";                // tui-Grid Module
import GlobalValue from "../../assets/js/GlobalValue.js"; // 전 화면 공통으로 사용하는 변수
import {GridDefault} from "../../assets/js/GridDefault.js"; // 그리드 기본값 세팅
import{SEARCH_EQUIP_MOVE} from  "@/api/Equip_Move.js"; 
/*eslint-disable no-unused-vars, no-empty*/ // 변수 선언 후 사용하지 않거나, 무의미한 띄어쓰기가 코드에 들어간 경우 에러를 내뱉는 경우를 방지

//Vue 핸들링 영역
export default {
  // vue props 선언부
  props:["MOVE_NO"],

  // Component 선언부
  components: {
    grid: Grid // import 한 tui-grid를 grid 태그로 사용가능하게 한다.
  },

  // 초기 데이터 변수 선언부
  data(){
    return{
      selected: [], // CHECKBOX 선택된 값을 담는 배열 변수
      options: []   // 체크박스를 구성 할 데이터를 담는 배열 변수
    }
  },
  created(){
    // 그리드 Option Setting
    var Device_Type = Utility.fn_ScreenSize();
    var grd_width;  //그리드 가로 크기
    var grd_height;
    var rowCount;  // 그리드 한페이지 행 갯수
    // 사용자 디바이스가 Mobile (세로모드)인 경우
    if (Device_Type == '"Mobile_V"' || Device_Type == "Mobile_V"){
      grd_width = 500;
      grd_height = 700;
      rowCount = 6;
    }
    // 사용자 디바이스가 Mobile (가로모드)인 경우
    else if (Device_Type == '"Mobile_H"' || Device_Type == "Mobile_H"){
      grd_width = 500;
      grd_height = 200;
      rowCount = 6;
    }
    // 사용자 디바이스가 Tablet인 경우
    else if (Device_Type == '"Tablet"' || Device_Type == "Tablet"){
      grd_width = 700;
      grd_height = 700;
      rowCount = 8;
    }
    // 그 외 Dsketop 모니터 또는 Dsketop 모니터보다 큰 경우
    else{ 
      grd_width = 950;
      grd_height = 700;
      rowCount = 10;
    }
  
    this.gridProps = {
        data: this.grid_data,
        scrollX: false,
        scrollY: false,
        dummy: false,
        columns: [
                  { header: "등록번호", name: "MOVE_NO",    align: "center", width: 120,ellipsis:true, hidden:true},
                  { header: "장비코드", name: "EQUIP_NO",   align: "center", width: 100, ellipsis:true},
                  { header: "장비명",   name: "EQUIP_NM",   align: "left",   width: 150,ellipsis:true},
                  { header: "구분",     name: "EQUIP_TYPE", align: "center", width: 80, ellipsis:true}, 
                  { header: "현재위치", name: "EQUIP_LOC",  align: "left",   width: 100 },
                  { header: "사양",     name: "EQUIP_DESC", align: "left",   width: 230, ellipsis:true}, 
                  { header: "비고",     name: "REMARK",     align: "left",   width: 200, ellipsis:true}, 
                 ],
        myTheme: {
           name: "mygrid",
          value: GridDefault.GridValue()
      },
      header: GridDefault.header,       // 헤더 정렬 (align: "center")
      rowHeight: GridDefault.rowHeight, // Row크기 (Default : 30)
      bodyHeight: "auto",               // 그리드 크기 (Default : 300)
      width : grd_width,
      columnOptions : GridDefault.columnOptions, // 컬럼 사이즈 재조정 가능 여부 (resizable : true)
      pageOptions: {useClient: true, perPage: rowCount}
    };
  },

  // 화면이 로드될 때 DOM 생성이 완료된 후 실행되는 이벤트 선언부
  mounted(){ 
    this.setgridcolumn();
    this.search(); // (등록)장비 상세
  },

  // 이벤트 선언부
  methods:{
    // 데이터 상세 조회
    async search(){        
      try{                        
        let grdData = await SEARCH_EQUIP_MOVE(this.MOVE_NO);

         // 조회된 데이터가 null이거나 undefined 인 경우
        if(Utility.fn_IsNull(grdData[0].MOVE_NO)){
          return;
        }
        else {
          this.$refs.tuiGrid.invoke("resetData", grdData); // 그리드에 조회된 데이터 바인딩.
        }
      }
      catch(err) {
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    // 사용자 Screen에 맞는그리드 컬럼 show/hide 이벤트
    setgridcolumn: function() {
      // 디바이스의 타입을 가져온다.
      this.Device_Type = Utility.fn_ScreenSize();
      var rowCount = this.gridProps.pageOptions.perPage-1;

      // 사용자 디바이스가 Mobile (세로모드)인 경우
      if (this.Device_Type == '"Mobile_V"' || this.Device_Type == "Mobile_V") {
        // 그리드 보여지는 컬럼(장비명, 구분, 사양) 
        Utility.fn_Grid_ShowColumn(this.$refs.tuiGrid, ["EQUIP_NM", "EQUIP_TYPE","EQUIP_DESC"]);   
        // 그리드 숨겨지는 컬럼(등록번호, 장비코드, 현재위치, 비고) 
        Utility.fn_Grid_HideColumn(this.$refs.tuiGrid, ["MOVE_NO", "EQUIP_NO", "EQUIP_LOC", "REMARK" ]);        
      }
      // 사용자 디바이스가 Mobile (가로모드)인 경우
      else if (this.Device_Type == '"Mobile_H"' || this.Device_Type == "Mobile_H"){
        // 그리드 보여지는 컬럼(장비명, 구분, 현재위치, 사양) 
        Utility.fn_Grid_ShowColumn(this.$refs.tuiGrid, ["EQUIP_NM", "EQUIP_TYPE","EQUIP_LOC","EQUIP_DESC"]);   
        // 그리드 숨겨지는 컬럼(등록번호, 장비코드,  비고) 
        Utility.fn_Grid_HideColumn(this.$refs.tuiGrid, ["MOVE_NO", "EQUIP_NO", "REMARK" ]);
      }
      // 사용자 디바이스가 Tablet인 경우
      else if (this.Device_Type == '"Tablet"' || this.Device_Type == "Tablet"){
        // 그리드 보여지는 컬럼(장비코드, 장비명, 구분, 현재위치, 사양) 
        Utility.fn_Grid_ShowColumn(this.$refs.tuiGrid, ["EQUIP_NO","EQUIP_NM", "EQUIP_TYPE","EQUIP_LOC","EQUIP_DESC"]);   
        // 그리드 숨겨지는 컬럼(등록번호,  비고) 
        Utility.fn_Grid_HideColumn(this.$refs.tuiGrid, ["MOVE_NO", "REMARK" ]);
      }
      // 그 외 Dsketop 모니터 또는 Dsketop 모니터보다 큰 경우
      else{
        // 그리드 보여지는 컬럼(위치,데스크탑,노트북,모니터,합계) 
        Utility.fn_Grid_ShowColumn(this.$refs.tuiGrid, ["EQUIP_NO", "EQUIP_NM", "EQUIP_TYPE","EQUIP_LOC","EQUIP_DESC", "REMARK"]);   
        this.gridProps.pageOptions.perPage = rowCount;
        this.gridProps.width = 300;
      }
    },
    // 닫기 버튼 클릭 이벤트
    close(){
      this.$emit("close");
    }
  }
}
</script>

<style lang="less" scoped>
.modal_form {
    position: relative;
    display: inline-block;
    width: 100%;
    color: #333;
    padding-bottom: 20px;
    margin-left: 20px;
}

.modal_form .modal_checkbox{
    margin-left: 20px;
}

.close:hover,
.close:focus {
    color: #fff;
    text-decoration: none;
    cursor: pointer;
    opacity: .5;
}

button.close {
    font-size: 28px;
    line-height: 24px;
    font-weight: normal;
    -webkit-appearance: none;
    padding: 0;
    cursor: pointer;
    background: transparent;
    border: 0;
}

.modal-open {
    overflow: hidden;
}

.modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1050;
    display: none;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    outline: 0;
}

.modal.fade .modal-dialog {
    -webkit-transition: -webkit-transform .3s ease-out;
    -o-transition: -o-transform .3s ease-out;
    transition: transform .3s ease-out;
    -webkit-transform: translate(0, -25%);
    -ms-transform: translate(0, -25%);
    -o-transform: translate(0, -25%);
    transform: translate(0, -25%);
}

.modal.in .modal-dialog {
    -webkit-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    -o-transform: translate(0, 0);
    transform: translate(0, 0);
}

.modal-open .modal {
    overflow-x: hidden;
    overflow-y: auto;
}

.modal-dialog {
    position: relative;
    width: auto;
    margin: 15px;
}

.modal-content {
    position: relative;
/*    background-color: #fff;*/
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid #999;
    border: 1px solid rgba(0, 0, 0, .2);
    border-radius: 0;
    outline: 0;
    -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, .5);
    box-shadow: 0 0 8px rgba(0, 0, 0, .5);
    // overflow-y: auto;

}

.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1040;
    background-color: #000;
}

.modal-backdrop.fade {
    filter: alpha(opacity=0);
    opacity: 0;
}

.modal-backdrop.in {
    filter: alpha(opacity=50);
    opacity: .5;
}

.modal-header {
    padding: 13px 15px 13px 20px;
    background: linear-gradient(to right, #00CFDB, #467ce1);
    color: #fff;
}

.modal-header.close {
    margin-top: 0;
}

.modal-title {
    margin: 0;
    line-height: 1.42857143;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.05em;
}

.modal-body {
    position: relative;
    padding: 0;
    // overflow-y: scroll
}


.mobile_modal_form {
    position: relative;
    display: inline-block;
    width: 100%;
    color: #333;
    padding-bottom: 20px;
    // overflow-y: auto;
}

/* // 모바일 (세로) */
@media all and (min-width:0px) and (max-width:575px){
 .modal-body > .contents {
  overflow-y: scroll;
  height: 400px;
  }
}

/* // 모바일(가로) */
@media all and (min-width:576px) and (max-width:767px){ 
 .modal-body > .contents {
  overflow-y: scroll;
  height: 300px;
  }

}

/* // 태블릿 */
@media all and (min-width:768px) and (max-width:991px){ 
 .modal-body > .contents {
  overflow-y: scroll;
  height: 300px;
  }

}

/* // 데스크탑 */
@media all and (min-width:992px) and (max-width:1199px){ 
 .modal-body > .contents {
  overflow-y: scroll;
  height: 600px;
  }

}

/* // 데스크탑 보다 큰 */
@media all and (min-width:1200px){ 
 .modal-body > .contents {
  overflow-y: scroll;
  height: 600px;
  }
}

</style>