<template >
  <div>
    <modals-container/>
      <!-- 화면 Contents 영역 -->
    <div class="contents">  
    <!-- 공통 검색 영역 -->
      <div class="common-schwrap">
        <fieldset>
          <div class="row">
            <div class="col-md-12 col-sm-6"> 
              <label class="col-md-1 col-sm-4 col-xs-4 control-label" v-text="LB_MOVE_NO"></label> <!--등록번호-->
              <div class="col-md-11 col-sm-8 col-xs-8">
                <b-form-input id="MOVE_NO" v-model="LB_MOVE_NO_TXT" readonly></b-form-input>
              </div>
            </div>
            <div class="col-md-12 col-sm-6"> 
              <label class="col-md-1 col-sm-4 col-xs-4 control-label" v-text="LB_BF_LOC"></label> <!--현재위치--> 
              <div class="col-md-11 col-sm-8 col-xs-8">
                <b-form-select
                  id="BF_LOC" 
                  v-model="LB_BF_LOC_TXT" 
                  :options="cboBF_LOC"
                  class="form-control" 
                ></b-form-select>
              </div>
            </div>           
            <div class="col-md-12 col-sm-6">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label" v-text="LB_NW_LOC"></label> <!--이동장소-->
              <div class="col-md-11 col-sm-8 col-xs-8">
                <b-form-select
                  id="NW_LOC"
                  v-model="LB_NW_LOC_TXT"
                  :options="cboNW_LOC"
                  class="form-control"
                ></b-form-select>
              </div>
            </div>
            <div class="col-md-12 col-sm-6">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label" v-text="LB_MOVE_DATE"></label> <!--이동일자-->
              <div class="col-md-11 col-sm-8 col-xs-8">
                <input type="date" id="MOVE_DATE" v-model="LB_MOVE_DATE_TXT" class="form-control">
              </div>
            </div>
            <div class="col-md-12 col-sm-6">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label" v-text="LB_REMARK"></label> <!--비고-->
              <div class="col-md-11 col-sm-8 col-xs-8">
                <b-textarea  v-model="LB_REMARK_TXT" rows="2" max-rows="3"></b-textarea>
              </div>
            </div>
            <div class="col-md-12 col-sm-6">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label" v-text="LB_EQUIP"></label> <!--장비대수-->
              <div class="col-md-9 col-sm-9 col-xs-4">
                <b-form-input v-model="LB_EQUIP_TXT"  readonly></b-form-input>
              </div>
              <div class="col-md-2 col-sm2 col-xs-4">
                <b-button variant="primary" id="EQUIP_SELECT" @click="EQUIP_SELECT">선택</b-button>&nbsp;&nbsp;
                <b-button variant="primary" id="EQUIP_STATUS" @click="EQUIP_STATUS">장비 확인</b-button>
              </div>           
            </div>    
          </div>
        </fieldset>
      </div>
      <div class="col-md-12 col-sm-12" style="text-align: center;" >
        <b-button variant="primary" @click="save" >저장</b-button>&nbsp;&nbsp;
        <b-button @click="cancel">취소</b-button>
      </div>
    </div><!-- END contents -->
  </div>
</template>

<script>
// import 영역
/*eslint-disable no-unused-vars, no-empty*/ // 변수 선언 후 사용하지 않거나, 무의미한 띄어쓰기가 코드에 들어간 경우 에러를 내뱉는 경우를 방지
import { getToken } from "@/utils/Cookie"; // 로그인한 사용자 ID
import moment from 'moment';
import Utility from "../../assets/js/CommonUtility.js";         // 전 화면 공통으로 사용하는 함수
import { Search_Equip, Asset_Delete } from "@/api/Enrollment_Asset.js"; // 현위치 콤보, 장비(본체)조회, 삭제
import { getCommonCode } from "@/api/Common.js"; // 공통코드
import CommonUtility from "../../assets/js/CommonUtility.js";   // 전 화면 공통으로 사용하는 함수
import GlobalValue from "../../assets/js/GlobalValue.js";       // 전 화면 공통으로 사용하는 변수
import {ASSET_LOCATION_COMBO} from "@/api/Status_Asset.js"; 
import {SEARCH_EQUIP_MOVE, ASSET_SELECT_DST_OUT, SAVE_EQUIP_MOVE} from "@/api/Equip_Move.js"; // 장비입출고, 등록/수정, 상세
import Modal_Pop_Equip from "./Equip_Select_Pop.vue";     // 장비선택 팝업
import Modal_Pop_Detail from "./Equip_Status_Detail.vue"; // 선택장비 상세정보 팝업 2020.10.13 MJH

//전역변수 선언
let equip_count = "";

var SELECTED_EQUIP_LIST = [{}];
var SELECTED_ASSET      = [{}];

// Vue 핸들링 영역
export default {
  component() {
    Modal_Pop_Equip;  //장비선택 팝업
    Modal_Pop_Detail; //선택된 장비 상세정보 팝업 2020.10.13 MJH
  },
  // Component 선언부
  components: {
  },

  // 초기 데이터 변수 선언부
  data() {
    return {
      LB_MOVE_NO : "등록번호",
      LB_BF_LOC  : "현재위치",
      LB_NW_LOC  : "이동장소",  
      LB_MOVE_DATE : "이동일자",             
      LB_REMARK : "비고",
      LB_EQUIP  : "장비",
      
      NEW_YN : "", //추가, 변경(수정)구분 변수
      
      LB_MOVE_NO_TXT: "",
      LB_BF_LOC_TXT : "",
      LB_NW_LOC_TXT : "",
      LB_MOVE_DATE_TXT: "",
      LB_REMARK_TXT:"",
      LB_EQUIP_TXT : equip_count,

      cboBF_LOC : [{}],  //현재위치 콤보박스 배열
      cboNW_LOC : [{}],  //이동장소 콤보박스 배열
      Device_Type : "",  //스크린 사이즈

      SELECTED_EQUIP_LIST : [{}],
      SELECTED_ASSET : [{}],

      VUE_NAME : "EQUIP_INOUT_MNT"

    };
  },

  // 화면이 로드될 때 실행되는 이벤트
  created() {
      this.setcombo();
  },

  // 화면이 로드될 때 DOM 생성이 완료된 후 실행되는 이벤트 선언부
  mounted() {
    //수정의 경우 등록번호, 현재위치 변경불가
    if(this.$route.params.MOVE_NO != undefined || this.$route.params.MOVE_NO != null){
      this.LB_MOVE_NO_TXT = this.$route.params.MOVE_NO;     //등록번호
      this.LB_BF_LOC_TXT  = this.$route.params.LOC_CD;      //현재위치
      this.LB_MOVE_DATE_TXT = this.$route.params.MOVE_DATE; //이동일자
      this.LB_REMARK_TXT  = this.$route.params.REMARK;      //비고
      this.LB_EQUIP_TXT   = this.$route.params.EQUIP_CNT;   //장비대수
      this.NEW_YN = "N" ;             
    }
    else //신규추가의 경우 등록번호, 현재위치(본사로 고정), 등록일자(당일로 고정)
    {
      this.NEW_YN = "Y";       
      this.LB_BF_LOC_TXT = "LO1"; //현재위치 "본사" 로 고정 2020.10.13 MJH   
      this.LB_MOVE_DATE_TXT = moment(new Date()).format("YYYY-MM-DD"); 
      document.getElementById("EQUIP_STATUS").disabled = true;       //신규일경우 장비 확인 버튼 사용 불가
    }
    document.getElementById("BF_LOC").disabled = true;

    this.LB_REG_SDATE_DATE = this.$route.params.LB_REG_SDATE_DATE; //호출시 검색조건 시작일자
    this.LB_REG_EDATE_DATE = this.$route.params.LB_REG_EDATE_DATE; //호출시 검색조건 종료일자
    
    window.addEventListener('load',  this.ScreenOnload(), false); // 초기 화면 Screen 설정 이벤트
    this.resize();      //화면 사이즈 변경시 발생되는 이벤트
    this.SEARCH_LIST(); //등록된 장비 정보를 미리 조회한다.
},

  // 이벤트 선언부
  methods: {   
    // 초기 시용자 Screen 설정 이벤트
    ScreenOnload(){
      Utility.fn_SetMenuPath(this); // 메뉴 Path 표시
    },

    // Screen 사이즈 변경시 발생되는 이벤트
    resize() {
      window.onresize = () => {
        this.setgridcolumn(); // 그리드 컬럼 Visible 이벤트
      };
    },  

    // 콤보박스 조회 START
    async setcombo() {
      try{
        let BF_LOC = await ASSET_LOCATION_COMBO();
        // 조회된 데이터가 null이거나 undefined 인 경우
        if(Utility.fn_IsNull(BF_LOC[0].TEXT)) {
          return;
        }
        //현재위치 콤보에 전체를 추가한다.
        var bf_arr = [{}];
        
        // 조회된 데이터를 배열에 값에 맞게 추가한다.
        for (var j = 0; j < BF_LOC.length; j++){
          bf_arr[j] = {
            id:BF_LOC[j]["ID"],       // 코드명
            text: BF_LOC[j]["TEXT"],  // 코드명
            value: BF_LOC[j]["VALUE"] // 코드
          };
        }
        this.cboBF_LOC = bf_arr; //  콤보 바인딩    
        //현재위치 에서 선택된 장소를 제외한 데이터를 이동장소 콤보에 바인딩
        let NW_LOC = BF_LOC.filter(it => !it.VALUE.includes(this.LB_BF_LOC_TXT));   
        var nw_arr = [{}];
        
        // 조회된 데이터를 배열에 값에 맞게 추가한다.
        for (var k = 0; k < NW_LOC.length; k++){
          nw_arr[k] = {
            id:NW_LOC[k]["ID"],       // 코드명
            text: NW_LOC[k]["TEXT"],  // 코드명
            value: NW_LOC[k]["VALUE"] // 코드
          };
        }
        this.cboNW_LOC = nw_arr; //  콤보 바인딩  
      }
      catch(err){
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    }, // 콤보박스 조회 END

    //(수정의 경우)장비 정보 조회
    async SEARCH_LIST(){
      let EQUIP_LIST = await SEARCH_EQUIP_MOVE(this.LB_MOVE_NO_TXT, this.LB_BF_LOC_TXT);

      // 조회된 데이터가 null이거나 undefined 인 경우
      if(Utility.fn_IsNull(EQUIP_LIST[0].EQUIP_NO)){
        return;
      }
      this.SELECTED_EQUIP_LIST = EQUIP_LIST; // 장비 리스트 
    },

    // 선택 버튼 누를시 팝업창 호출 (장비현황조회)
    async EQUIP_SELECT(){ 
      this.Device_Type = Utility.fn_ScreenSize();
      var widthsize;
      var heightsize;
      var selected_list = this.SELECTED_EQUIP_LIST;
      if (this.Device_Type == '"Mobile_V"' || this.Device_Type == "Mobile_V"){
        this.widthsize =  "350px"
        this.heightsize = "500px"
      }
      else if (this.Device_Type == '"Mobile_H"' || this.Device_Type == "Mobile_H"){
        this.widthsize =  "600px"
        this.heightsize = "300px"
      }
      else{
        this.widthsize = "1000px"
        this.heightsize = "650px"
      }

      jQuery(document).ready(function($) {
        $('html, body').css({'height': '100%'}); // 모달팝업 중 html,body의 scroll을 hidden시킴
        $('.v--modal-box').on('scroll touchmove mousewheel', function(event) { // 터치무브와 마우스휠 스크롤 방지
        event.preventDefault();
        event.stopPropagation();
        return false;
       });
      });
      //팝업창 보이기
      this.$modal.show(
        Modal_Pop_Equip, // 호출할 모달 선언
        {
          TARGET : this,
          MOVE_NO : this.LB_MOVE_NO_TXT,
          LOC_CD : this.LB_BF_LOC_TXT,
          modal: this.$Modal_Pop_Equip,  
          SELECTED_LIST : this.SELECTED_EQUIP_LIST      
        },
        {
          // 호출한 팝업 Style 선언
          name: "dynamic-modal2",
          width: this.widthsize,    // 팝업창 너비 설정
          height: this.heightsize,  // 팝업창 높이 설정
          draggable: false          // 팝업창 드래그 설정
        }
      );
    },

    // 장비확인 버튼 누를시 팝업창 호출 2020.10.13 MJH
    async EQUIP_STATUS(){ 
      this.Device_Type = Utility.fn_ScreenSize();
      var widthsize;
      var heightsize;

      if (this.Device_Type == '"Mobile_V"' || this.Device_Type == "Mobile_V"){
        this.widthsize =  "350px"
        this.heightsize = "500px"
      }
      else if (this.Device_Type == '"Mobile_H"' || this.Device_Type == "Mobile_H"){
        this.widthsize =  "600px"
        this.heightsize = "300px"
      }
      else{
        this.widthsize = "1000px"
        this.heightsize = "650px"
      }

      jQuery(document).ready(function($) {
        $('html, body').css({'height': '100%'}); // 모달팝업 중 html,body의 scroll을 hidden시킴
        $('.v--modal-box').on('scroll touchmove mousewheel', function(event) { // 터치무브와 마우스휠 스크롤 방지
          event.preventDefault();
          event.stopPropagation();
          return false;
        });
      });
        //팝업창 보이기
      this.$modal.show(
        Modal_Pop_Detail, // 호출할 모달 선언
        {
          //파라미터 전송
          MOVE_NO:  this.LB_MOVE_NO_TXT,
          modal: this.$Modal_Pop_Detail                         
        },
        {
            // 호출한 팝업 Style 선언
          name: "dynamic-modal2",
          width: this.widthsize,    // 팝업창 너비 설정
          height: this.heightsize,  // 팝업창 높이 설정
          draggable: false          // 팝업창 드래그 설정
        }
      );
    },

    // 저장 버튼 클릭 이벤트
    async save(){
      try {  
        if(CommonUtility.fn_IsNull(getToken("USER_ID"))) {  //로그인 필수
          this.$bvModal.msgBoxOk("로그인 후 이용해 주세요.", GlobalValue.Err_option);
          return;
        }
        if(this.LB_NW_LOC_TXT.toString() == null || this.LB_NW_LOC_TXT.toString() == "") {  //이동할 장소
          this.$bvModal.msgBoxOk("이동할 장소를 선택하세요.", GlobalValue.Err_option);
          return;
        }
        let this_user_id = getToken("USER_ID");

        //선택된 장비 배열 추가
        if(this.SELECTED_EQUIP_LIST[0].EQUIP_NO != null){
          for(var k = 0 ; k <this.SELECTED_EQUIP_LIST.length; k++) {
            //선택된 장비가 없어도 SELECTED_EQUIP[0]이 존재함, 값을 넣었는지 확인
            if(k==0){
              if(this.SELECTED_EQUIP_LIST[0].EQUIP_NO == null){
                break;
              }
            }
            this.SELECTED_ASSET[k] = this.SELECTED_EQUIP_LIST[k];
          }
        }

        if(this.SELECTED_ASSET[0].EQUIP_NO == null) { //장비선택 필수
          this.$bvModal.msgBoxOk("선택된 장비가 없습니다.", GlobalValue.Err_option);
          return;
        }
        let msgBox = await this.$bvModal.msgBoxConfirm("저장하시겠습니까?", GlobalValue.Info_option);

        if(msgBox) {// 저장 알림창 확인버튼
          var data=[];
          var EQUIP ="";
          for(var i=0; i<this.SELECTED_ASSET.length; i++) {
            if(i==0){
              EQUIP = this.SELECTED_ASSET[i].EQUIP_NO.toString();
            }else{
              EQUIP += "," + this.SELECTED_ASSET[i].EQUIP_NO.toString();
            }
          }
   
          data[0]= {data: JSON.stringify({  // key 값(오라클 I 값):value 값 -> 파라미터를 오라클과 항상 맞춰야 실행이 가능하다.
                                            MOVE_NO : this.LB_MOVE_NO_TXT,     //등록번호
                                            MOVE_DATE : this.LB_MOVE_DATE_TXT, //이동일자
                                            NEW_YN : this.NEW_YN,              //신규구분
                                            LOC_CD :this.LB_NW_LOC_TXT,        //이동할 위치
                                            EQUIP_NO :EQUIP,                   //장비 코드
                                            REMARK:this.LB_REMARK_TXT,         //비고
                                            USER:this_user_id                  //등록자(로그인유저)
                                        })}

          var Save_Data={data}; // 저장할 데이터를 담는 변수(장비구분키, 장비명)

          // 장비 등록 저장 결과를 asset_save 변수에 담는다. 
          const asset_save = await SAVE_EQUIP_MOVE(Save_Data);

          if (asset_save[0].query_success == "Y") { // 정상적인 저장인 경우
            await this.$bvModal.msgBoxOk('저장 되었습니다.',GlobalValue.Success_option);  
            this.$bvModal.close;  
            this.$router.push('/Equip_Move');  // 저장한 후 조회 페이지로 전환
          }
          else {// 장비 저장 결과가 에러일 경우
            await this.$bvModal.msgBoxOk(asset_save[0].query_err_msg, GlobalValue.Err_option);
            this.$bvModal.close; 
          }                    
        }           
      }      
      catch(err){
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    // 취소 버튼 클릭
    cancel() {
      this.$router.push({
                          name : "장비이동관리", // 장비 이동 화면으로 이동
                          params:{
                                  LB_REG_SDATE_DATE : this.LB_REG_SDATE_DATE,
                                  LB_REG_EDATE_DATE : this.LB_REG_EDATE_DATE
                                  }
                        });
    }
  }
};

// 팝업창에서 선택한 값을 배열로 가진다.
// 인자값:(Array)선택된 값 배열
export function Select_Equip_Count(Select_Data,TARGET_VUE){
  TARGET_VUE.SELECTED_EQUIP_LIST = Select_Data;
  TARGET_VUE.LB_EQUIP_TXT = Select_Data.length.toString();
}

</script>

<style lang="less" scoped>


</style>