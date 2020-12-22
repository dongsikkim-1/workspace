<template>
  <div>
    <div class="modal-header">
      <h4><label class="modal-title" id="myModalLabel" v-text="Title_ColumnName"></label></h4>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close" style="color:#fff;">
          <span aria-hidden="true" style="margin-right: 20px;">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <!-- modal 컨텐츠 영역 -->
      <div class="contents">{{Body_Contents}}</div>
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
            ></grid>
      <!--//modal 컨텐츠 영역 -->
    </div>
    <div class="btn_group">      
      <a type="button" @click="confirm" class="btn_confirm">취소</a>
      <a type="button" @click="apply" class="btn_confirm">적용</a>
    </div>
  </div>
  
</template>

<script>
import "tui-pagination/dist/tui-pagination.css"; // tui-Grid Pagination Css
import "tui-grid/dist/tui-grid.css"; // tui-Grid Module Css
import { Grid } from "@toast-ui/vue-grid"; // tui-Grid Module
import {GridDefault} from "../../assets/js/GridDefault.js"; // 그리드 기본값 세팅
import Utility from "../../assets/js/CommonUtility.js";   // 전 화면 공통으로 사용하는 함수
import GlobalValue from "../../assets/js/GlobalValue.js"; // 전 화면 공통으로 사용하는 변수
import {SEARCH_POP} from "@/api/Project_list.js"; // 조회 
import {select} from "./Project_List.vue"; // 그리드 바인딩 이벤트 

// vue 핸들링 영역 
export default {

  // Component 선언부
  components: {
    grid: Grid // import 한 tui-grid를 grid 태그로 사용가능하게 한다.
  },

  // 초기 데이터 변수 선언부
  data(){

    return {
      Title_ColumnName: "투입인원 선택",    // 선택한 cell의 해당하는 컬럼의 헤더 텍스트
      Body_Contents:  "",       // 선택한 cell의 내용

      grid_data: [],
      gridProps: []
    };
  },
created() {
    // 그리드 Option Setting
    this.gridProps = {
      rowHeaders: ["checkbox"], // Row 첫행 체크박스 설정
      data: this.grid_data,
      scrollY: false,
      scrollX: false,
      dummy: false,
      columns: [
        { header: "이름KEY", name: "USER_ID", align: "left", width: "80", hidden:true},        
        { header: "이름", name: "USER_NAME", align: "center", width: "80", ellipsis:true},        
        { header: "등급", name: "GRADE", align: "center", width: "300" },
        { header: "등급CODE", name: "GRADE_VAL", align: "center", width: "300", hidden:true },
        { header: "직책", name: "POSITION", align: "center", width: "50"},
        { header: "직책CODE", name: "POSITION_VAL", align: "center", width: "50", hidden:true},
        { header: "역할", name: "ROLE", align: "center", width: "80"},
        { header: "역할CODE", name: "ROLE_VAL", align: "center", width: "80", hidden:true}
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
  mounted() {
    this.search_pop();
  },
  methods: {    
    //조회
    async search_pop()
    {
      const result = await SEARCH_POP();      
        // 조회된 데이터가 null이거나 undefined 인 경우
        if(Utility.fn_IsNull(result[0].USER_ID))
        {
          this.$refs.tuiGrid.invoke("clear"); // 그리드에 바인딩 된 데이터 초기화(빈 값 row 1개 생성 방지)
          return;
        }                                                                          
        this.$refs.tuiGrid.invoke("resetData", result); // 그리드에 조회된 데이터 바인딩.			  
    },    
    // 확인 버튼
    confirm() {
        this.close();
    },
    //적용 버튼
    async apply()
    {
      var arr = []; //체크된 행을 담는 변수
          arr = this.$refs.tuiGrid.invoke("getCheckedRows");
          
        // 체크된 행이 없는 경우
        if(arr.length ===0)
        {          
            this.$bvModal.msgBox = await this.$bvModal.msgBoxOk('선택된 인원이 없습니다.', GlobalValue.Err_option);       
            return;               
        }        
        var data=[];
        for(var i=0; i<arr.length; i++)
        {
          data[i]= {data: JSON.stringify({ USER_ID:arr[i].USER_ID.toString(), USER_NAME:arr[i].USER_NAME.toString(), 
                          GRADE:arr[i].GRADE.toString(), GRADE_VAL:arr[i].GRADE_VAL.toString(), 
                          POSITION:arr[i].POSITION.toString(), POSITION_VAL:arr[i].POSITION_VAL.toString(), ROLE:arr[i].ROLE.toString(), ROLE_VAL:arr[i].ROLE_VAL.toString() })}              
        }      
        
        select(arr)
        this.close();
        
    },
    // 1시 방향 X 버튼 클릭 이벤트 
    close(){
      this.$emit("close");
    },
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

.modal-header .close {
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
    padding: 35px;
}

a.btn_confirm {
  width: 50%;
  display: block;
  float: left;
  height: 2.2em;
  text-align: center;
  line-height: 2.2em;
  font-weight: 600;
  text-decoration: none;
  -webkit-transition: background-color 0.3s ease;
  transition: background-color 0.3s ease;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  background:linear-gradient(to right, #00CFDB, #467ce1);
  font-size: 1.2em !important;
}

</style>