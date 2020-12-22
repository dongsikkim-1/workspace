<template >
    <div>
      <modals-container />
        <!-- 화면 Contents 영역 -->
        <div class="contents">
          <label style="float:left; font-size:20px;"> 프로젝트 정보</label>  
             <!-- 프로젝트 정보 버튼 START-->
            <div class="common-btnwrap">
                <b-button size="sm" variant="primary" @click="del_project">취소</b-button>&nbsp;
                <b-button size="sm" variant="primary" @click="save_project">등록</b-button>
            </div>
            <!-- 프로젝트 정보 버튼 END -->      
       <!-- 프로젝트 정보 START-->       
      <div class="common-schwrap">
        <fieldset>          
          <div class="row">
            <!-- 프로젝트 번호 -->            
            <div class="col-md-6 col-sm-6">
              <label class="col-md-2 col-sm-2 col-xs-2 control-label">프로젝트 번호</label>
              <div class="col-md-9 col-sm-9 col-xs-9">                                
               <b-form-input  id = "txtPJT_NO" v-model="PJT_NO" maxlength="10" readonly ></b-form-input>
              </div>
            </div>
            <!-- 구축플랫폼 -->
            <div class="col-md-6 col-sm-6">
              <label class="col-md-2 col-sm-2 col-xs-2 control-label">구축플랫폼</label>
              <div class="col-md-9 col-sm-9 col-xs-9">                                                
                 <div class="selectBox" @click="showCheckboxes">
                    <select id = "selectControl2" class = "form-control">
                        <option>{{CODE_NAME}}</option>
                      </select>
                    <div class="overSelect"></div>
                 </div> <!--end select box- -->
                    <div id="checkboxes2" :style="{width : checkwidth}" >
                      <div>
                        <label  v-for="options in cboPJT_PLATFORM" v-bind:key="options.value"  :for="options.text"><input type="checkbox" :id="options.text" :value="options.value"  @change="Loc_change"/>{{options.text}}</label>
                      </div>
                  </div>
              </div>
            </div>      
          </div>
          <div class="row">
            <!-- 프로젝트 명 -->
            <div class="col-md-6 col-sm-6">
              <label class="col-md-2 col-sm-2 col-xs-2 control-label">프로젝트 명</label>
              <div class="col-md-9 col-sm-9 col-xs-9">                                
                 <b-form-input  id = "txtPJT_NAME" v-model="PJT_NAME" maxlength="50"></b-form-input>
              </div>
            </div>
            <!-- 고객사 명 -->
            <div class="col-md-6 col-sm-6">
              <label class="col-md-2 col-sm-2 col-xs-2 control-label">고객사 명</label>
              <div class="col-md-4 col-sm-8 col-xs-8">                                                 
                   <b-form-select v-model="PJT_CLIENT_HEAD" :options="cboPJT_CLIENT_HEAD" class="form-control" @change="SEARCH_CORP()"></b-form-select>
              </div>            
            <!-- 부서 -->          
             <label class="col-md-1 col-sm-1 col-xs-1 control-label" style="text-align:center"></label>
             <div class="col-md-4 col-sm-4 col-xs-4">
              <b-form-select v-model="PJT_CLIENT_DETAIL" :options="cboPJT_CLIENT_DETAIL" class="form-control"></b-form-select>
             </div>
            </div>
          </div>
          <div class="row">
            <!-- 계약기간 FROM -->
            <div class="col-md-6 col-sm-6">
              <label class="col-md-2 col-sm-2 col-xs-2 control-label">계약기간</label>
              <div class="col-md-4 col-sm-4 col-xs-4">                                
                 <input type="date" id="dteCONTRACT_DATE_FROM" v-model="CONTRACT_DATE_FROM" class="form-control">
              </div>            
              <!-- 계약기간 TO -->            
              <label class="col-md-1 col-sm-1 col-xs-1 control-label" style="text-align:center">~</label>
              <div class="col-md-4 col-sm-4 col-xs-4">                                
                 <input type="date" id="dteCONTRACT_DATE_TO" v-model="CONTRACT_DATE_TO" class="form-control">
              </div>
            </div>
             <!-- 투입기간 FROM -->
            <div class="col-md-6 col-sm-6">            
              <label class="col-md-2 col-sm-2 col-xs-2 control-label">투입기간</label>
              <div class="col-md-4 col-sm-4 col-xs-4">                                
                 <input type="date" id="dteWORK_DATE_FROM" v-model="WORK_DATE_FROM" class="form-control">                         
              </div>
             <!-- 투입기간 TO -->            
              <label class="col-md-1 col-sm-1 col-xs-1 control-label" style="text-align:center">~</label>
              <div class="col-md-4 col-sm-4 col-xs-4">                                
                 <input type="date" id="dteWORK_DATE_TO" v-model="WORK_DATE_TO" class="form-control">
              </div>
            </div> 
          </div>
          <div class="row">
            <!-- 계약금액 -->
            <div class="col-md-6 col-sm-6">
              <label class="col-md-2 col-sm-2 col-xs-2 control-label">계약금액</label>
              <div class="col-md-9 col-sm-9 col-xs-9">                                
                  <b-form-input numberOnly  v-model="PJT_PRICE"  maxlength="15" autocomplete="off" style="ime-mode:disabled;"></b-form-input>
              </div>
            </div>
            <!-- 진행상태 -->
            <div class="col-md-6 col-sm-6">
              <label class="co4-md-2 col-sm-2 col-xs-2 control-label">진행상태</label>
              <div class="col-md-9 col-sm-9 col-xs-9">                                                 
                <b-form-select v-model="PJT_STATE" :options="cboPJT_STATE" class="form-control"></b-form-select>
              </div>
            </div>
          </div>
           <div class="row">
             <!-- PM -->
            <div class="col-md-6 col-sm-6">
              <label class="col-md-2 col-sm-2 col-xs-2 control-label">PM</label>
              <div class="col-md-9 col-sm-9 col-xs-9">                                                 
                 <b-form-select v-model="PJT_MANAGER" :options="cboPJT_MANAGER" class="form-control"></b-form-select>
              </div>
            </div>          
          </div>
        <!-- 프로젝트 정보 END-->
        </fieldset>             
        </div>                                         
            <label style="float:left; font-size:20px;"> 투입 계획</label>          
            <!-- 투입 계획 버튼 START-->            
            <div class="common-btnwrap"> 
                <b-button size="sm" variant="primary" @click="add">추가</b-button>&nbsp;
                <b-button size="sm" variant="primary" @click="save_user">저장</b-button>&nbsp;
                <b-button size="sm" variant="primary" @click="del">삭제</b-button>            
            </div>
            <!-- 투입 계획 버튼 END -->          

            <!-- 투입 계획 그리드 영역 START-->
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
                @editingFinish= "CheckBox_Check"
                @focusChange="grid_foucsedchange"
            ></grid>
             <!--투입 계획 그리드 영역 END-->  
        <label style="font-size:20px"> 직원 정보</label>     
        <div class="common-schwrap">                
          <fieldset>
          <div class="row">
            <!-- 이름 -->
            <div class="col-md-6 col-sm-6">
              <label class="col-md-2 col-sm-2 col-xs-2 control-label">이름</label>
              <div class="col-md-9 col-sm-9 col-xs-9">                                
               <b-form-input  id = "txtUSER_NAME" v-model="lbUSER_NAME" readonly></b-form-input>
              </div>
            </div>
            <!-- 직급-->
            <div class="col-md-6 col-sm-6">
              <label class="col-md-2 col-sm-2 col-xs-2 control-label">직급</label>
              <div class="col-md-9 col-sm-9 col-xs-9">                                
                <b-form-input  id = "txtPOSITION" v-model="lbPOSITION" readonly></b-form-input>
              </div>
            </div>      
          </div>
          <div class="row">
            <!-- 기술등급 -->
            <div class="col-md-6 col-sm-6">
              <label class="col-md-2 col-sm-2 col-xs-2 control-label">기술등급</label>
              <div class="col-md-9 col-sm-9 col-xs-9">                                
                 <b-form-input  id = "txtGRADE" v-model="lbGRADE" readonly></b-form-input>
              </div>
            </div>
            <!-- 역할 -->
            <div class="col-md-6 col-sm-6">
              <label class="col-md-2 col-sm-2 col-xs-2 control-label">역할</label>
              <div class="col-md-9 col-sm-9 col-xs-9">                                                 
                 <b-form-input  id = "txtROLE" v-model="lbROLE" readonly></b-form-input>
              </div>
            </div>            
          </div>
          <div class="row">
            <!-- 계약공수 -->
            <div class="col-md-6 col-sm-6">
              <label class="col-md-2 col-sm-2 col-xs-2 control-label">계약공수</label>
              <div class="col-md-9 col-sm-9 col-xs-9">
                <b-form-input numberOnly v-model="CONTRACT_MM" maxlength="15" autocomplete="off" style="ime-mode:disabled;" @input="change_value"></b-form-input>                
              </div>
            </div>            
            <!-- 투입공수 FROM -->
            <div class="col-md-6 col-sm-6">
              <label class="col-md-2 col-sm-2 col-xs-2 control-label">투입공수</label>
              <div class="col-md-3 col-sm-3 col-xs-3">                                
                 <input type="date" id="dteACT_FROM" v-model="ACT_FROM" class="form-control" @input="change_value">
              </div>            
             <!-- 투입공수 TO -->            
              <label class="col-md-1 col-sm-1 col-xs-1 control-label" style="text-align:center">~</label>
              <div class="col-md-3 col-sm-3 col-xs-3">                                
                 <input type="date" id="dteACT_TO" v-model="ACT_TO" class="form-control" @input="change_act_to">
              </div>            
             <!-- 투입공수 MM -->            
              <label class="col-md-1 col-sm-1 col-xs-1 control-label" style="text-align:center">MM</label>
              <div class="col-md-1 col-sm-1 col-xs-1">                                
                 <!-- <b-form-input  v-model="ACT_MM"  maxlength="4" autocomplete="off"  style="ime-mode:disabled;" @input="change_value"></b-form-input> -->
                 <input type="number"  min="0" max="12" step="0.5" v-model="ACT_MM" autocomplete="off" style="ime-mode:disabled;"  onkeydown="return false" @input="change_mm"/>
              </div>
            </div>           
          </div>
          <div class="row">
            <!-- 비고 -->
            <div class="col-md-6 col-sm-6">
              <label class="col-md-2 col-sm-2 col-xs-2 control-label">비고</label>
              <div class="col-md-9 col-sm-9 col-xs-9">                                
                  <b-form-input v-model="REMARK" maxlength="200" @input="change_value"></b-form-input>
              </div>
            </div>
          </div>             
        <!-- 프로젝트 정보 END-->
        </fieldset>   
        </div>                                   
        </div><!-- END contents -->        
     </div>
</template>

<script>
let expanded = false;

// import 영역
/*eslint-disable no-unused-vars, no-empty*/ // 변수 선언 후 사용하지 않거나, 무의미한 띄어쓰기가 코드에 들어간 경우 에러를 내뱉는 경우를 방지
import Vue from 'vue';
import "tui-pagination/dist/tui-pagination.css"; // tui-Grid Pagination Css
import "tui-grid/dist/tui-grid.css"; // tui-Grid Module Css
import { Grid } from "@toast-ui/vue-grid"; // tui-Grid Module
import { getToken } from "@/utils/Cookie"; // 로그인한 사용자 ID
import Utility from "../../assets/js/CommonUtility.js";   // 전 화면 공통으로 사용하는 함수
import GlobalValue from "../../assets/js/GlobalValue.js"; // 전 화면 공통으로 사용하는 변수
import {GridDefault} from "../../assets/js/GridDefault.js"; // 그리드 기본값 세팅
import Modal from "./Project_List_modal.vue";
import {SEARCH_COMBO, SEARCH_PM, SEARCH_CORP_ORG, SAVE_PROJECT, SAVE_PROJECT_USER, DEL_PROJECT_USER, DEL_PROJECT} from "@/api/Project_list.js";         //데이터 조회, 저장, 삭제
import moment from 'moment';

//모든 콤마 제거
function removeCommas(x) {
    if(!x || x.length == 0) return "";
    else return x.split(",").join("");
}

//3자리 단위마다 콤마 생성
function addCommas(x) {
    var test = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var this_ = null;
// Vue 핸들링 영역
export default {

  // Component 팝업
  component: {
    Modal
  },
  // Component 그리드
  components: {
    grid: Grid // import 한 tui-grid를 grid 태그로 사용가능하게 한다.
  },

  // 초기 데이터 변수 선언부
  data() {
    return {
   
      //프로젝트 정보 변수 START
      PJT_NO: "",                         //프로젝트번호
      PJT_PLATFORM: "",                   //구축플랫폼 선택값     
      cboPJT_PLATFORM: [{}],              //조회 Data 배열            
      CODE_NAME :"",                      //구축 플랫폼 코드명변수 
      CODE_NO :"",                        //구축 플랫폼 코드변수

      PJT_NAME: "",                       //프로젝트 명
      PJT_CLIENT_HEAD:"",                 //고객사 명
      cboPJT_CLIENT_HEAD:[{}],
      PJT_CLIENT_DETAIL:"",               //부서
      cboPJT_CLIENT_DETAIL:[{}],               
      CONTRACT_DATE_FROM : "",            //계약기간 from
      CONTRACT_DATE_TO : "",              //계약기간 to
      WORK_DATE_FROM:"",                  //투입기간 from
      WORK_DATE_TO:"",                    //투입기간 to
      PJT_PRICE:"",                       //계약금액
      PJT_STATE:"",                       //진행상태
      cboPJT_STATE:[{}],
      PJT_MANAGER:"",                     //PM
      cboPJT_MANAGER:[{}],
      //프로젝트 정보 변수 END

      //직원정보 변수 START      
      lbUSER_ID:"",                         //유저id
      lbUSER_NAME:"",                       //이름      
      lbPOSITION:"",                        //직급
      lbGRADE:"",                           //등급
      lbROLE:"",                            //역할
      CONTRACT_MM:"",                     //계약공수
      ACT_FROM:"",                        //투입공수 from
      ACT_TO:"",                          //투입공수 to
      ACT_MM:"0",                          //투입공수 mm
      REMARK:"",                          //비고
      //직원정보 변수 END      

      gridProps: [],  // 그리드 Column Setting 배열 변수      
      grid_data: [], // 그리드에 바인딩 할 Data 배열 변수      
      Device_Type : "", // 스크린 사이즈

      row_key :"",
      checkwidth:""
    };
  },

  // 화면이 로드될 때 실행되는 이벤트
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
        { header: "역할", name: "ROLE", align: "center", width: "80" },
         { header: "역할VAL", name: "ROLE", align: "center", width: "80", hidden:true },
        { header: "등급",     name: "GRADE", align: "center", width: "300" },
        { header: "등급VAL",     name: "GRADE_VAL", align: "left", width: "300", hidden:true },
        { header: "투입기간FROM",   name: "ACT_FROM", align: "center", width: "100" },
        { header: "투입기간TO",     name: "ACT_TO", align: "center", width: "80" },
        { header: "M/M", name: "ACT_MM", align: "center", width: "80" },
        { header: "직책",     name: "POSITION", align: "center", width: "50", hidden:true },
        { header: "직책VAL",     name: "POSITION_VAL", align: "center", width: "50", hidden:true },
        { header: "계약공수",   name: "CONTRACT_MM", align: "center", width: "50", hidden:true },
        { header: "비고",   name: "REMARK", align: "center", width: "60",hidden:true},        
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

    this_ = this;
    // //텍스트 타입에 달력으로 표시하기 위함
    // var d = new Date()
    // var yyyy = d.getFullYear()
    // var smm = (d.getMonth() + 1).toString().length === 1 ? '0' + (d.getMonth()) : (d.getMonth())
    // var emm = (d.getMonth() + 1).toString().length === 1 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
    // var dd = (d.getDate().toString().length === 1) ? '0' + d.getDate() : d.getDate()
    // var sDate = yyyy.toString() + '-' + smm.toString() + '-' + dd.toString()
    // var eDate = yyyy.toString() + '-' + emm.toString() + '-' + dd.toString()

    // if(this.$route.params.LB_REG_SDATE_DATE != undefined || this.$route.params.LB_REG_SDATE_DATE != null)
    // {
    //   this.LB_REG_SDATE_DATE = this.$route.params.LB_REG_SDATE_DATE
    // }
    // else
    // {
    //   this.LB_REG_SDATE_DATE = sDate
    // }
    // if(this.$route.params.LB_REG_EDATE_DATE != undefined || this.$route.params.LB_REG_EDATE_DATE != null)
    // {
    //   this.LB_REG_EDATE_DATE = this.$route.params.LB_REG_EDATE_DATE
    // }
    // else
    // {
    //   this.LB_REG_EDATE_DATE = eDate
    // }
    
    // window.addEventListener('load',  this.ScreenOnload(), false); // 초기 화면 Screen 설정 이벤트

    //this.resize(); // 화면 사이즈 변경시 발생되는 이벤트
    //this.search(); // 그리드 조회 이벤트



    // 계약금액 입력시 숫자만 입력 가능하게 하고, focus in 했을 때는 (,)가 안보이게, focus out 했을 때는 (,)가 보이게 함
    jQuery(document).ready(function($) {
      $("input:text[numberOnly]").on("focus", function() {
          var x = $(this).val();
          x = removeCommas(x);
          $(this).val(x);
      }).on("focusout", function() {
          var x = $(this).val();
          if(x && x.length > 0) {
              if(!$.isNumeric(x)) {
                  x = x.replace(/[^0-9]/g,"");
              }
              x = addCommas(x);
              $(this).val(x);
          }
      }).on("keyup", function() {
          $(this).val($(this).val().replace(/[^0-9]/g,""));
      });
    });

    this.search_combo();
  },

  // 이벤트 선언부
  methods: {
    
    //프로젝트 삭제
    async del_project()
    {
       try
       {               
        // 프로젝트 번호가 없는경우
        if(Utility.fn_IsNull(this.PJT_NO))
        {          
            this.$bvModal.msgBox = await this.$bvModal.msgBoxOk('삭제할 프로젝트가 없습니다.', GlobalValue.Err_option);       
            return;               
        } 

        // 프로젝트에 등록 된 인원이 있을 경우
        if(this.$refs.tuiGrid.invoke('getRowCount') > 0)
        {          
            this.$bvModal.msgBox = await this.$bvModal.msgBoxOk('투입인원을 먼저 삭제해주세요.', GlobalValue.Err_option);       
            return;               
        } 
        let msgBox = await this.$bvModal.msgBoxConfirm("프로젝트를 삭제하시겠습니까?", GlobalValue.Info_option);

        if (!msgBox)
          return;

            var data=[];   
                data[0] = {data: JSON.stringify({ PJT_NO:this.PJT_NO})}                    
            var Del_Data2 = {data}; // 삭제할 데이터를 담는 변수(PRJ_NO)
            
            // 삭제
            const Result = await DEL_PROJECT(Del_Data2);            

            // 삭제 실패시 DB에 작성한 에러메세지를 나타낸다.
            if(Result.query_success == "N") 
            {
              this.$bvModal.msgBoxConfirm(Result.query_err_msg, GlobalValue.Err_option);
              return;
            }
            else 
            {            
              this.PJT_NO = null;
              this.$bvModal.msgBoxOk("삭제되었습니다.", GlobalValue.Info_option);             
            }         
        }
        catch(err)
        {
            this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
        }
    },

    //프로젝트에 유저 저장
    async save_user()
    {
       try 
       {
        //validation check
        var arr = []; //체크된 행을 담는 변수
            arr = this.$refs.tuiGrid.invoke("getCheckedRows");
            
          // 체크된 행이 없는 경우
          if(arr.length ===0)
          {          
              this.$bvModal.msgBox = await this.$bvModal.msgBoxOk('선택된 인원이 없습니다.', GlobalValue.Err_option);       
              return;               
          }        
          //투입 공수 from이 to보다 큰 경우
          if(this.ACT_FROM > this.ACT_TO)
          {
            this.$bvModal.msgBoxOk('올바르지 않은 날짜입니다.', GlobalValue.Err_option);       
            return;               
          }

          let msgBox = await this.$bvModal.msgBoxConfirm("인원정보를 저장하시겠습니까?", GlobalValue.Info_option);
      
          if(msgBox) // 장비 저장 알림창 확인버튼
          {            
            let user_id = getToken("USER_ID");
            if(Utility.fn_IsNull(user_id)) {
              user_id = "empty"
            }           
            var data = [];
            for(var i = 0; i < arr.length ; i++)
            {
              data[i]= {data: JSON.stringify({                                                 
                                            PJT_NO:Utility.fn_ObjToStr(this.PJT_NO),           //프로젝트번호    
                                            USER_ID:Utility.fn_ObjToStr(arr[i].USER_ID),         //유저 아이디
                                            GRADE:Utility.fn_ObjToStr(arr[i].GRADE_VAL),             //기술등급
                                            ROLE:Utility.fn_ObjToStr(arr[i].ROLE_VAL),               //기술역할
                                            CONTRACT_MM:Utility.fn_ObjToStr(arr[i].CONTRACT_MM), //계약공수
                                            ACT_FROM:Utility.fn_ObjToStr(arr[i].ACT_FROM),       //투입공수FROM
                                            ACT_TO:Utility.fn_ObjToStr(arr[i].ACT_TO),           //투입공수TO
                                            ACT_MM:Utility.fn_ObjToStr(arr[i].ACT_MM),           //투입MM
                                            REMARK:Utility.fn_ObjToStr(arr[i].REMARK),           //비고
                                            USER:user_id                                       //등록 USER 정보
                                          })}
            }            
            var Save_Data={data}; // 저장할 데이터를 담는 변수(장비구분키, 장비명)

            // 장비 등록 저장 결과를 asset_save 변수에 담는다. 
            const result = await SAVE_PROJECT_USER(Save_Data);
            if (result[0].query_success == "Y") { // 정상적인 저장인 경우
              this.PJT_NO = result[0].query_err_msg
              await this.$bvModal.msgBoxOk('저장 되었습니다.',GlobalValue.Success_option)  
              //this.$bvModal.close; // 알림창 닫기
              //this.$router.push('/Project_List.vue')    // 저장한 후 재조회
            }
            else {//저장 결과가 에러일 경우
              await this.$bvModal.msgBoxOk(result[0].query_err_msg,GlobalValue.Err_option)
              this.$bvModal.close;   // 알림창 닫기
            }
        }
      } 
      catch(err) {
        //저장 시작 부분 에러 발생시
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },
    //고객사 header 변경시 detail 조회
    async SEARCH_CORP()
    {      
      let result = await SEARCH_CORP_ORG(this.PJT_CLIENT_HEAD)              
      if(Utility.fn_IsNull(result))
      {
        return;
      }
      else
      {  
        var arr1 =[];
        for(var i = 0; i<result.length; i++)
        {
          arr1[i] = {text : result[i].CODE_NAME, value : result[i].CODE_NO};
        }
        this.cboPJT_CLIENT_DETAIL = arr1;
      }  
    },

    //삭제 버튼 클릭 이벤트
    async del()
    {           
      var arr = []; //체크된 행을 담는 변수
      arr = this.$refs.tuiGrid.invoke("getCheckedRows"); //체크 된 행
        
      // 체크된 행이 없는 경우
      if(arr.length ===0)
      {          
          this.$bvModal.msgBox = await this.$bvModal.msgBoxOk('삭제할 인원이 없습니다.', GlobalValue.Err_option);       
          return;               
      } 
      let msgBox = await this.$bvModal.msgBoxConfirm("해당인원을 삭제하시겠습니까?", GlobalValue.Info_option);

      if (!msgBox)
        return;

          var data=[];
          for(var j = 0; j <arr.length; j++)
          {
              data[j]= {data: JSON.stringify({ PJT_NO:this.PJT_NO, USER_ID:arr[j].USER_ID})}                 
          }            
          var Del_Data ={data}; // 삭제할 데이터를 담는 변수(PRJ_NO, USER_ID )
                    
          // 삭제
          const Result = await DEL_PROJECT_USER(Del_Data);

          // 삭제 실패시 DB에 작성한 에러메세지를 나타낸다.
          if(Result.query_success == "N") 
          {
            this.$bvModal.msgBoxConfirm(Result.query_err_msg, GlobalValue.Err_option);
            return;
          }
          else 
          {            
            for(var i = 0; i < arr.length ; i++)
            {                       
              // 한건이 남았을때 지우면 에러가 나서 클리어처리함.
              if(this.$refs.tuiGrid.invoke('getRowCount') == 1)
              {
                this.$refs.tuiGrid.invoke("clear");
              }
              else
              {
                this.$refs.tuiGrid.invoke("removeRow", arr[i].rowKey);
              }              
            }
            this.$bvModal.msgBoxOk("삭제되었습니다.", GlobalValue.Info_option);             
          }                    					
    },

     //투입공수 MM max length 
    change_mm(){
      // Maxlength 제한
      if(this.ACT_MM.length > 4){
        this.ACT_MM = this.ACT_MM.slice(0, 4);
      }
      this.change_value()
    },
    change_act_to(){      
      this.ACT_TO = this.ACT_TO;
    },    

    //인원정보 <> 투입인원 동기화
    change_value(){      
      //포커스 된 행의 HANDLE 이 있을 경우
      if(this.row_key != null && this.row_key != undefined)
      { 
        if(!Utility.fn_IsNull(this.ACT_FROM))
        {        
          if(!Utility.fn_IsNull(this.ACT_MM))
          {
             var act_cnt = (this.ACT_MM * 2) * 15;
             var date = new Date(document.getElementById("dteACT_FROM").value);
             date.setDate(date.getDate() + parseInt(act_cnt));
             this.ACT_TO = moment(date).format('YYYY-MM-DD');
          }
        }
        
        

        this.$refs.tuiGrid.invoke("setValue", this.row_key, "ACT_FROM", this.ACT_FROM)          //투입공수FROM
        this.$refs.tuiGrid.invoke("setValue", this.row_key, "ACT_TO", this.ACT_TO)              //투입공수TO
        this.$refs.tuiGrid.invoke("setValue", this.row_key, "ACT_MM", this.ACT_MM)              //투입공수MM        
        this.$refs.tuiGrid.invoke("setValue", this.row_key, "CONTRACT_MM", this.CONTRACT_MM)    //계약공수        
        this.$refs.tuiGrid.invoke("setValue", this.row_key, "REMARK", this.REMARK)              //비고
      }      
    },
    //그리드 포커스 변경 시 
    grid_foucsedchange(evt){

      //그리드의 포커스 된 행 handle(전역변수에 넣는다.)
      this.row_key = evt.rowKey

      //포커스 된 행 데이터
      var row_data = this.$refs.tuiGrid.invoke("getRow", evt.rowKey);       
      if(!Utility.fn_IsNull(row_data))
      {
        this.lbUSER_NAME = row_data.USER_NAME.toString();                  
        this.lbGRADE = row_data.GRADE.toString();
        this.lbROLE = row_data.ROLE.toString();
        this.lbPOSITION = row_data.POSITION.toString();
      }      
    },
  
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
        Utility.fn_Grid_ShowColumn(this.$refs.tuiGrid, ["REG_DATE","CODE_NAME"]); 
        
        // 그리드 숨겨지는 컬럼(등록자, 담당PM(ID), 담당PM(NAME), 등록번호, 위치(VALUE),본체수, 모니터수, 내역, 비고 ) 
        Utility.fn_Grid_HideColumn(this.$refs.tuiGrid, ["REG_USER","RNF_CD","LOC","RECEIV_COM", "RECEIV_MNT","DETAIL_TXT","BIGO"]);
      }
      // 사용자 디바이스가 Mobile (가로모드)인 경우
      else if (this.Device_Type == '"Mobile_H"' || this.Device_Type == "Mobile_H") 
      {
       // 그리드 보여지는 컬럼(등록자, 입고날짜, 담당PM(NAME), 담당PM 이름, 위치(NAME),본체수, 모니터수) 
        Utility.fn_Grid_ShowColumn(this.$refs.tuiGrid, ["REG_USER","REG_DATE","CODE_NAME","RECEIV_COM", "RECEIV_MNT"]); 
        
        // 그리드 숨겨지는 컬럼(등록번호, 위치(VALUE),담당PM(ID),내역, 비고 )  
        Utility.fn_Grid_HideColumn(this.$refs.tuiGrid, ["RNF_CD","LOC","DETAIL_TXT","BIGO"]);
      }
      // 사용자 디바이스가 Tablet인 경우
      else if (this.Device_Type == '"Tablet"' || this.Device_Type == "Tablet") 
      {
        // 그리드 보여지는 컬럼(등록번호, 등록자, 입고날짜, 내역, 담당PM(NAME), 위치(NAME), 본체수, 모니터수) 
        Utility.fn_Grid_ShowColumn(this.$refs.tuiGrid, ["RNF_CD", "REG_USER","REG_DATE", "DETAIL_TXT","CODE_NAME","RECEIV_COM", "RECEIV_MNT"]); 
        
        // 그리드 숨겨지는 컬럼(담당PM(ID),위치(VALUE),비고) 
        Utility.fn_Grid_HideColumn(this.$refs.tuiGrid, ["LOC","BIGO"]);
      }
      // 그 외 Dsketop 모니터 또는 Dsketop 모니터보다 큰 경우
      else 
      {
         // 그리드 보여지는 컬럼(등록번호, 등록자, 입고날짜,내역, 담당PM(NAME),위치(NAME), 본체수, 모니터수, 비고 )
         Utility.fn_Grid_ShowColumn(this.$refs.tuiGrid, ["RNF_CD", "REG_USER","REG_DATE", "DETAIL_TXT","CODE_NAME","RECEIV_COM", "RECEIV_MNT","BIGO" ]); 
         // 그리드 숨겨지는 컬럼(위치(VALUE),담당PM(ID)) 
         Utility.fn_Grid_HideColumn(this.$refs.tuiGrid, ["LOC"]);
      }
    },
    async search_combo()
    {
      //구축 플랫폼 체크드 콤보박스
      let result = await SEARCH_COMBO("PLATFORM");      
      if(Utility.fn_IsNull(result))
      {
        return;
      }
      else
      {  
        var arr1 =[{id: "all", text: "전체", value: "all"}];
        for(var i = 0; i<result.length; i++)
        {
          arr1[1+i] = {text : result[i].CODE_NAME, value : result[i].CODE_NO};
        }
        this.cboPJT_PLATFORM = arr1;
      }      

      //PM 조회
      let result2 = await SEARCH_PM();      
      if(Utility.fn_IsNull(result2))
      {
        return;
      }
      else
      {  
        var arr2 =[];
        for(var J = 0; J<result2.length; J++)
        {
          arr2[J] = {text : result2[J].CODE_NAME, value : result2[J].CODE_NO};
        }
        this.cboPJT_MANAGER = arr2;
      }      

      //진행 상태
      let result3 = await SEARCH_COMBO("STATE");      
      if(Utility.fn_IsNull(result3))
      {
        return;
      }
      else
      {  
        var arr3 =[];
        for(var k = 0; k< result3.length; k++)
        {
          arr3[k] = {text : result3[k].CODE_NAME, value : result3[k].CODE_NO};
        }
        this.cboPJT_STATE = arr3;
      }      

      //고객사 HEADER
      let result4 = await SEARCH_COMBO("CORP");      
      if(Utility.fn_IsNull(result4))
      {
        return;
      }
      else
      {  
        var arr4 =[];
        for(var L = 0; L< result4.length; L++)
        {
          arr4[L] = {text : result4[L].CODE_NAME, value : result4[L].CODE_NO};
        }
        this.cboPJT_CLIENT_HEAD = arr4;
      }  
    },

    //위치 콤보박스 드롭다운 클릭시
    showCheckboxes() {
          var checkboxes = document.getElementById("checkboxes2");
          var check_width = document.getElementById("selectControl2").offsetWidth +"px";
          this.Device_Type = Utility.fn_ScreenSize();
          if (!expanded) {
            checkboxes.style.display = "block";
            if (this.Device_Type == '"Mobile_V"' || this.Device_Type == "Mobile_V") 
              this.checkwidth = check_width;
            else
              this.checkwidth = check_width;
            expanded = true;
          } else {
            checkboxes.style.display = "none";
            expanded = false;
          }
        },

      setDefalutValue(){

      //바인딩후 초기값 설정
      var checkboxes = document.getElementById("checkboxes2");

      checkboxes.style.display = "block";

      var LOC = "";
      //반복문 돌면서 나머지 항목 체크 =true로 변경, value값 추가
      for(var i = 0; i<document.getElementById("checkboxes2").children["0"].children.length;i++)
      {
        document.getElementById("checkboxes2").children["0"].children[i].children["0"].checked = true
        if(i == 1)
        {
          LOC = document.getElementById("checkboxes2").children["0"].children[i].children["0"].id 
          this.CODE_NO = document.getElementById("checkboxes2").children["0"].children[i].children["0"].value
        }
        else if(i > 1)
        {
          LOC =LOC + ","+ document.getElementById("checkboxes2").children["0"].children[i].children["0"].id 
          this.CODE_NO = this.CODE_NO + ","+ document.getElementById("checkboxes2").children["0"].children[i].children["0"].value
        }
                  
        }
        this.CODE_NAME=LOC;

      checkboxes.style.display = "none";      
    },

    // 체크박스 체크
    CheckBox_Check(ev){
      try{
        if (this.$refs.tuiGrid.invoke("getRowCount") > 0){
        var foc_row = this.$refs.tuiGrid.invoke("getRow", ev.rowKey);
        foc_row._attributes["checked"] = true;
        this.$refs.tuiGrid.invoke("setRow", ev.rowKey, foc_row);
        }
      }catch(err){
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    //체크드 콤보박스 관련 함수
    Loc_change(ev){

            //전체 선택시
            if( ev.currentTarget.defaultValue == "all")
            {     
              
              //체크 여부 확인
              if(ev.target.checked)
              {
                //텍스트 변수 선언
                var LOC = "";
               //반복문 돌면서 나머지 항목 체크 =true로 변경, value값 추가
               for(var i = 1; i<document.getElementById("checkboxes2").children["0"].children.length;i++)
               {
                 document.getElementById("checkboxes2").children["0"].children[i].children["0"].checked = true
                 if(i == 1)
                 {
                    LOC = document.getElementById("checkboxes2").children["0"].children[i].children["0"].id 
                    this.CODE_NO = document.getElementById("checkboxes2").children["0"].children[i].children["0"].value
                 }
                 else
                 {
                    LOC =LOC + ","+ document.getElementById("checkboxes2").children["0"].children[i].children["0"].id 
                    this.CODE_NO = this.CODE_NO + ","+ document.getElementById("checkboxes2").children["0"].children[i].children["0"].value
                 }
                  
               }
                this.CODE_NAME=LOC;
              }
              else
              {
                for(var j = 1; document.getElementById("checkboxes2").children["0"].children.length;j++)
                {
                  document.getElementById("checkboxes2").children["0"].children[j].children["0"].checked = false
                  this.CODE_NAME=""
                  this.CODE_NO=""
                }
                  
              }
            }//end if(전체)
            else
            {
              //전체가 체크되어 있는 상태에서 따른 항목 선택시 전체 체크 해제
                if(document.getElementById("checkboxes2").children["0"].children["0"].children["0"].checked == true){
                    document.getElementById("checkboxes2").children["0"].children["0"].children["0"].checked = false
                  }
                  
              if(this.CODE_NAME == "")
              {
                  this.CODE_NAME = ev.currentTarget.id
                  this.CODE_NO = this.CODE_NO + ev.currentTarget.value
              }
              else
              { 
                //항목 선택시
                if(ev.target.checked)
                {
                    this.CODE_NAME =   this.CODE_NAME +',' +ev.currentTarget.id
                    this.CODE_NO = this.CODE_NO + "," + ev.currentTarget.defaultValue
                }
                //선택 해제시
                else
                {
                    if(this.CODE_NAME.replace(ev.currentTarget.id,"") ==="")
                    {
                      this.CODE_NAME = ""
                      this.CODE_NO = ""
                    }
                    else if(this.CODE_NAME.indexOf(ev.currentTarget.id) == 0)
                    {
                      this.CODE_NAME = this.CODE_NAME.replace(ev.currentTarget.id + ",","")
                      this.CODE_NO = this.CODE_NO.replace(ev.currentTarget.defaultValue+ ",","")
                    }
                    else
                    {
                      this.CODE_NAME = this.CODE_NAME.replace(","+ev.currentTarget.id,"")
                      this.CODE_NO = this.CODE_NO.replace(","+ ev.currentTarget.defaultValue,"")
                    }
                }   
              }
            }
        },        
    // 조회 이벤트
    async search() {
      try
      {
        //파라미터로 등록자, 등록일시(시작날짜~종료날짜) 사용
        // let grd_result = await ASSET_MOVE_IN(this.LB_REG_USER_TXT.toString() ,this.LB_REG_SDATE_DATE.toString(),this.LB_REG_EDATE_DATE.toString())

        //  // 조회된 데이터가 null이거나 undefined 인 경우
        // if(Utility.fn_IsNull(grd_result[0].RNF_CD))
        // {
        //   this.$refs.tuiGrid.invoke("clear"); // 그리드에 바인딩 된 데이터 초기화(빈 값 row 1개 생성 방지)
        //   return;
        // }
        // this.$refs.tuiGrid.invoke("resetData", grd_result); // 그리드에 조회된 데이터 바인딩.
      }
      catch(err)
      {
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    // 추가 버튼 이벤트
    add() {

        if(Utility.fn_IsNull(this.PJT_NO))
        {
           this.$bvModal.msgBox = this.$bvModal.msgBoxOk('먼저 프로젝트를 저장해주세요', GlobalValue.Err_option);       
          return;               
        }
        // 팝업 클릭 또는 스케줄 이벤트 클릭시
        this.$modal.show(
          Modal, // 호출할 모달 선언
          {
            // 파라미터 전송            
            modal: this.$modal                                                  
          },
          {
            // 호출한 팝업 Style 선언
            name: "dynamic-modal",
            width: "1200px",   // 팝업창 너비 설정
            height: "auto",   // 팝업창 높이 설정
            draggable: true   // 팝업창 드래그 설정
          }
        );
    },

    //프로젝트 저장(등록)
    async save_project()
    {
      try {

        //validation check
        if(Utility.fn_IsNull(this.CODE_NO)) {    // 필수 입력 사항(구축플랫폼) 입력 되지 않았을 시 MSG, Validation Check
          this.$bvModal.msgBoxOk("구축플랫폼을 선택하세요.", GlobalValue.Err_option);
          return;
        }

        if(Utility.fn_IsNull(this.PJT_NAME)) {        // 필수 입력 사항(프로젝트명) 입력 되지 않았을 시 MSG, Validation Check
          this.$bvModal.msgBoxOk("프로젝트명을 입력하세요", GlobalValue.Err_option);
          return;
        }

        if(this.CONTRACT_DATE_FROM > this.CONTRACT_DATE_TO) //계약기간 from이 계약기간 to보다 클 경우
        {
          this.$bvModal.msgBoxOk("올바르지 않은 계약기간입니다.", GlobalValue.Err_option);
          return;
        }
        if(this.WORK_DATE_FROM > this.WORK_DATE_TO)  //투입기간 from이 투입기간 to보다 클 경우
        {
          this.$bvModal.msgBoxOk("올바르지 않은 투입기간입니다.", GlobalValue.Err_option);
          return;
        }

        let msgBox = await this.$bvModal.msgBoxConfirm("프로젝트를 저장하시겠습니까?", GlobalValue.Info_option);
    
        if(msgBox) // ok 버튼 클릭 시
        {
          var data=[];
          let user_id = getToken("USER_ID");
          if(Utility.fn_IsNull(user_id)) {
            user_id = "empty"
          }
          data[0]= {data: JSON.stringify({                                                 
                                          PJT_NO:Utility.fn_ObjToStr(this.PJT_NO),                              //프로젝트번호    
                                          PJT_PLATFORM:Utility.fn_ObjToStr(this.CODE_NO),                       //구축플랫폼
                                          PJT_NAME:Utility.fn_ObjToStr(this.PJT_NAME),                          //프로젝트 명
                                          PJT_CLIENT_HEAD:Utility.fn_ObjToStr(this.PJT_CLIENT_HEAD),            //고객사 명
                                          PJT_CLIENT_DETAIL:Utility.fn_ObjToStr(this.PJT_CLIENT_DETAIL),        //부서
                                          CONTRACT_DATE_FROM:Utility.fn_ObjToStr(this.CONTRACT_DATE_FROM),      //계약기간from
                                          CONTRACT_DATE_TO:Utility.fn_ObjToStr(this.CONTRACT_DATE_TO),          //계약기간tp
                                          WORK_DATE_FROM:Utility.fn_ObjToStr(this.WORK_DATE_FROM),              //투입기간from
                                          WORK_DATE_TO:Utility.fn_ObjToStr(this.WORK_DATE_TO),                  //투입기간to
                                          PJT_PRICE:Utility.fn_ObjToStr(this.PJT_PRICE),                        //계약금액
                                          PJT_STATE:Utility.fn_ObjToStr(this.PJT_STATE),                        //진행상태
                                          PJT_MANAGER:Utility.fn_ObjToStr(this.PJT_MANAGER),                    //PM
                                          USER:user_id
                                        })}

          var Save_Data={data}; // 저장할 데이터를 담는 변수(장비구분키, 장비명)

          // 장비 등록 저장 결과를 asset_save 변수에 담는다. 
          const result = await SAVE_PROJECT(Save_Data);
          if (result[0].query_success == "Y") { // 정상적인 저장인 경우
            this.PJT_NO = result[0].query_err_msg
            await this.$bvModal.msgBoxOk('저장 되었습니다.',GlobalValue.Success_option)  
            this.$bvModal.close; // 알림창 닫기
            //this.$router.push('/Project_List.vue')    // 저장한 후 재조회
          }
          else {// 장비 저장 결과가 에러일 경우
            await this.$bvModal.msgBoxOk(result[0].query_err_msg,GlobalValue.Err_option)
            this.$bvModal.close;   // 알림창 닫기
          }
        }
      } 
      catch(err) {
        //저장 시작 부분 에러 발생시
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    }   
  }
};

export function select(data){  
  var gridData =  this_.$refs.tuiGrid.invoke("getData")
  // 그리드에 바인딩되어있는 데이터가 없는 경우 그리드에 바인딩
  if(gridData.length < 1)
  {
     this_.$refs.tuiGrid.invoke("resetData", data)
  }
  // 그리드에 바인딩 데이터가 있는 경우 동일 사번의 유저는 제외하고, 추가한다.
  else
  {    
    for(var i = 0; i < data.length; i++)
    {
      for(var j = 0 ; j < gridData.length ; j++)
      {
        if(data[i].USER_ID == gridData[j].USER_ID)
        {          
          data.splice(i,1)
        }
      }
    }        
    this_.$refs.tuiGrid.invoke("appendRows", data)
  }
  //this_.$refs.tuiGrid.invoke("focus", 0, "USER_NAME");   // 포커스 index 0 적용
  this_.$refs.tuiGrid.invoke("focusAt", 0, 0);   // 포커스 index 0 적용
}
</script>

<style lang="less" scoped>

.overSelect {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#checkboxes2 {
  width: 98.5%;
  height: 200px;
  overflow-y: auto;
  z-index: 100;
  position: absolute;
  display: none;
  border: 1px #DADADA solid;
  background-color: white;
}
#checkboxes2 label {
  display: block;
}
#checkboxes2 label:hover {
  background-color: #1E90FF;
}
</style>