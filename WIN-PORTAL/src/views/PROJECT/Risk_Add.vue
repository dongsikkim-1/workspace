<template>
  <div>
    <modals-container />
    <!-- 화면 Contents 영역 -->
    <div class="contents">
      <!-- 공통 검색 영역 -->
      <div class="common-schwrap">
        <fieldset>
          <div class="row">
            <!-- 위험유형 -->
            <div class="col-md-6 col-sm-6">
              <label
                class="col-md-2 col-sm-4 col-xs-4 control-label"
                v-text="LB_RISK_TYPE"
              ></label>
              <div class="col-md-6 col-sm-8 col-xs-8">
                <b-form-select
                  id="RISK_TYPE"
                  v-model="valRISK_TYPE"
                  :options="cboRISK_TYPE_List"
                  class="form-control"
                ></b-form-select>
              </div>
            </div>
            <!-- 위험원인 -->
            <div class="col-md-6 col-sm-6">
              <label
                class="col-md-2 col-sm-4 col-xs-4 control-label"
                v-text="LB_RISK_CAUSE"
              ></label>
              <div class="col-md-6 col-sm-8 col-xs-8">
                <b-form-select
                  id="RISK_CAUSE"
                  v-model="valRISK_CAUSE"
                  :options="cboRISK_CAUSE_List"
                  class="form-control"
                ></b-form-select>
              </div>
            </div>
            <!-- 등록일 -->
            <div class="col-md-6 col-sm-6">
              <label
                class="col-md-2 col-sm-4 col-xs-4 control-label"
                v-text="LB_ENROLL_DATE"
              ></label>
              <div class="col-md-6 col-sm-8 col-xs-8">
                <input
                  type="date"
                  id="ENROLL_DATE"
                  v-model="dteENROLL_DATE"
                  class="form-control"
                />
              </div>
            </div>
            <!-- 처리일 -->
            <div class="col-md-6 col-sm-6">
              <label
                class="col-md-2 col-sm-4 col-xs-4 control-label"
                v-text="LB_PROCESS_DATE"
              ></label>
              <div class="col-md-6 col-sm-8 col-xs-8">
                <input
                  type="date"
                  id="PROCESS_DATE"
                  v-model="dtePROCESS_DATE"
                  class="form-control"
                />
              </div>
            </div>
            <!-- 프로젝트명 -->
            <div class="col-md-12 col-sm-6">
              <label
                class="col-md-1 col-sm-4 col-xs-4 control-label"
                v-text="LB_PJT_NAME"
              ></label>
              <div class="col-md-11 col-sm-8 col-xs-8">
                <b-form-input id="PJT_NAME" v-model="txtPJT_NAME"></b-form-input>
              </div>
            </div>
            <!-- 위험요소 -->
            <div class="col-md-12 col-sm-6">
              <label
                class="col-md-1 col-sm-4 col-xs-4 control-label"
                v-text="LB_RISK_FACTORS"
              ></label>
              <div class="col-md-11 col-sm-8 col-xs-8">
                <b-form-input id="RISK_FACTORS" v-model="txtRISK_FACTORS"></b-form-input>
              </div>
            </div>
            <!-- 처리내용 -->
            <div class="col-md-12 col-sm-6">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label">처리내용</label>
              <div class="col-md-11 col-sm-8 col-xs-8">
                <b-textarea
                  id="PROCESS_DESC"
                  v-model="txtPROCESS_DESC"
                  rows="5"
                  max-rows="5"
                ></b-textarea>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="col-md-12 col-sm-12" style="text-align: center">
        <b-button @click="save" variant="primary">저장</b-button>&nbsp;&nbsp;
        <b-button @click="cancel">취소</b-button>
      </div>
    </div>
    <!-- END contents -->
  </div>
</template>

<script>
// import 영역
/*eslint-disable no-unused-vars, no-empty*/ // 변수 선언 후 사용하지 않거나, 무의미한 띄어쓰기가 코드에 들어간 경우 에러를 내뱉는 경우를 방지
import { getToken } from "@/utils/Cookie"; // 로그인한 사용자 ID
import Utility from "../../assets/js/CommonUtility.js"; // 전 화면 공통으로 사용하는 함수
import GlobalValue from "../../assets/js/GlobalValue.js"; // 전 화면 공통으로 사용하는 변수
import { getCommonCode } from "@/api/Common.js"; // 공통코드
import { Select_Risk, Select_Risk_No, Save_Risk } from "@/api/Risk_List.js"; // 위험관리 조회
import moment from "moment";

// import Modal from "./Asset_Select_POP.vue"; // 장비선택 팝업
// import Modal2 from "./Asset_User_POP.vue"; // 유저 팝업

// Vue 핸들링 영역
export default {
  component() {},
  // Component 선언부
  components: {},

  // 초기 데이터 변수 선언부
  data() {
    return {
      valRISK_NO: "", // 등록번호

      // 라벨
      LB_RISK_TYPE: "유형",
      LB_RISK_CAUSE: "원인",
      LB_ENROLL_DATE: "등록일",
      LB_PROCESS_DATE: "처리일",
      LB_PJT_NAME: "프로젝트명",
      LB_RISK_FACTORS: "위험요소",
      LB_PROCESS_DESC: "처리내용",

      // 입력부분
      cboRISK_TYPE_List: [{}], // 유형 콤보 바인딩 배열 변수
      cboRISK_CAUSE_List: [{}], // 원인 콤보 바인딩 배열 변수

      valRISK_TYPE: "", // 유형 콤보 값
      valRISK_CAUSE: "", // 원인 콤보 값

      dteENROLL_DATE: "", // 검색조건 : 시작날짜
      dtePROCESS_DATE: null, // 검색조건 : 종료날짜

      txtPJT_NAME: "", // 프로젝트명
      txtRISK_FACTORS: "", // 위험요소
      txtPROCESS_DESC: "", // 처리내용
    };
  },

  // 화면이 로드될 때 실행되는 이벤트
  created() {
    this.setcombo();
  },

  // 화면이 로드될 때 DOM 생성이 완료된 후 실행되는 이벤트 선언부
  mounted() {
    // 등록일 현재 일자로 세팅
    this.dteENROLL_DATE = moment(new Date()).format("YYYY-MM-DD");
    //this.dtePROCESS_DATE = moment(new Date()).format("YYYY-MM-DD");

    //수정의 경우
    if (this.$route.params.RISK_NO != undefined || this.$route.params.RISK_NO != null) {
      
      this.valRISK_NO = this.$route.params.RISK_NO; //등록번호
      this.SEARCH_LIST(); //해당 등록번호로 위험 관리번호 조회
    } //신규추가의 경우
    else {
      this.dteENROLL_DATE = moment(new Date()).format("YYYY-MM-DD");
      this.dtePROCESS_DATE = null;
    }

    this.resize();
    window.addEventListener("load", this.ScreenOnload(), false); // 초기 화면 Screen 설정 이벤트
  },

  // 이벤트 선언부
  methods: {
    // 초기 시용자 Screen 설정 이벤트
    ScreenOnload() {
      Utility.fn_SetMenuPath(this); // 메뉴 Path 표시
    },
    // Screen 사이즈 변경시 발생되는 이벤트
    resize() {
      window.onresize = () => {
        this.setgridcolumn(); // 그리드 컬럼 Visible 이벤트
      };
    },

    // 콤보조회 이벤트
    async setcombo() {
      try {
        let risk_type_combo = await getCommonCode("RISKTYPE");
        let risk_cause_combo = await getCommonCode("RISKCAUSE");

        // 조회된 데이터가 null이거나 undefined 인 경우
        if (
          Utility.fn_IsNull(risk_type_combo[0].CODE_NO) ||
          Utility.fn_IsNull(risk_cause_combo[0].CODE_NO)
        ) {
          return;
        }

        // 첫번째 콤보에 전체를 추가한다.
        var arr1 = [{}];
        var arr2 = [{}];

        // 조회된 데이터를 배열에 값에 맞게 추가한다.
        for (var i = 0; i < risk_type_combo.length; i++) {
          arr1[i] = {
            text: risk_type_combo[i]["CODE_NAME"], // 코드명
            value: risk_type_combo[i]["CODE_NO"], // 코드
          };
        }

        // 조회된 데이터를 배열에 값에 맞게 추가한다.
        for (var j = 0; j < risk_cause_combo.length; j++) {
          arr2[j] = {
            text: risk_cause_combo[j]["CODE_NAME"], // 코드명
            value: risk_cause_combo[j]["CODE_NO"], // 코드
          };
        }

        this.cboRISK_TYPE_List = arr1; // 조회조건 위험 유형 콤보 바인딩
        this.cboRISK_CAUSE_List = arr2; // 조회조건 위험 원인 콤보 바인딩

        this.valRISK_TYPE = risk_type_combo[0]["CODE_NO"]; // 조회조건 위험 유형 초기값 '전체' 설정
        this.valRISK_CAUSE = risk_cause_combo[0]["CODE_NO"]; // 조회조건 위험 유형 초기값 '전체' 설정

        //this.search(); // 그리드 조회 이벤트
      } catch (err) {
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    //수정의 경우 컴퓨터, 모니터 정보 조회
    async SEARCH_LIST() {
      try {
        let RISK_LIST = await Select_Risk_No(this.valRISK_NO);

        // 조회된 데이터가 null이거나 undefined 인 경우
        if (Utility.fn_IsNull(RISK_LIST[0].RISK_NO)) {
          return;
        }

        var pdate = '';
        if (!Utility.fn_IsNull(RISK_LIST[0].PROCESS_DATE)) {
            pdate = moment(RISK_LIST[0].PROCESS_DATE).format("YYYY-MM-DD")
        }

        // 조회한 프로젝트 번호 상세 정보 바인딩
        for (var i = 0; i < RISK_LIST.length; i++) {
          this.valRISK_TYPE = RISK_LIST[0].RISK_TYPE;
          this.valRISK_CAUSE = RISK_LIST[0].RISK_CAUSE;
          this.dteENROLL_DATE = moment(RISK_LIST[0].ENROLL_DATE).format("YYYY-MM-DD");
          this.dtePROCESS_DATE = pdate;
          this.txtPJT_NAME = RISK_LIST[0].PJT_NAME;
          this.txtRISK_FACTORS = RISK_LIST[0].RISK_FACTORS;
          this.txtPROCESS_DESC = RISK_LIST[0].PROCESS_DESC;
        }
      } catch (err) {
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    // 저장 버튼 클릭 이벤트
    async save() {
      var msgBox;
      try {
        //로그인 필수
        if (Utility.fn_IsNull(getToken("USER_ID"))) {
          msgBox = this.$bvModal.msgBoxOk(
            "로그인 후 이용해 주세요.",
            GlobalValue.Err_option
          );

          if (msgBox) {
            this.$bvModal.close; // 알림창 닫기
          }
          return;
        }

        msgBox = await this.$bvModal.msgBoxConfirm(
          "저장하시겠습니까?",
          GlobalValue.Info_option
        );

        if (msgBox) {
          var edate = '';
          var pdate = '';
           
          if (!Utility.fn_IsNull(this.dteENROLL_DATE)){
            edate = moment(this.dteENROLL_DATE).format("YYYYMMDD")
          }

          if (!Utility.fn_IsNull(this.dtePROCESS_DATE)) {
              pdate = moment(this.dtePROCESS_DATE).format("YYYYMMDD")
          }

          var data = [];
          data[0] = {
            data: JSON.stringify({
              RISK_NO      : this.valRISK_NO,         // 등록번호
              RISK_TYPE    : this.valRISK_TYPE,       // 위험 유형
              RISK_CAUSE   : this.valRISK_CAUSE,      // 위험 원인
              ENROLL_DATE  : edate,                   // 등록일
              PROCESS_DATE : pdate,                   // 처리일
              PJT_NAME     : this.txtPJT_NAME,        // 프로젝트명
              RISK_FACTORS : this.txtRISK_FACTORS,    // 위험요소
              PROCESS_DESC : this.txtPROCESS_DESC,    // 처리내용
              USER_ID      : getToken("USER_ID"),     // 유저 아이디
            }),
          };
        

        var Save_Data = { data }; // 저장할 데이터를 담는 변수

        // 저장 결과를 변수에 담는다.
        let risk_save = await Save_Risk(Save_Data);
        
        if (risk_save[0].query_success == "Y") {
          // 정상적인 결과
          try {
            msgBox = await this.$bvModal.msgBoxOk(
              "저장 되었습니다.",
              GlobalValue.Success_option
            );
            if (msgBox) {
              this.$bvModal.close; // 알림창 닫기
              this.cancel();
            }
            const arr = risk_save[0].query_err_msg.toString().split("|");

            this.valRISK_NO = arr[0];
            this.dtePROCESS_DATE = arr[1];
          } catch (err) {
            this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
          }
        } // 저장 결과가 에러일 경우
        else {
          try {
            var msgbox = await this.$bvModal.msgBoxOk(
              risk_save[0].query_err_msg,
              GlobalValue.Err_option
            );
            if (msgBox) {
              this.$bvModal.close; // 알림창 닫기
            }
          } catch (err) {
            this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
          }
        }
          
        }        
      } catch (err) {
        // 에러 발생시
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    // 취소 버튼 클릭
    cancel() {
      this.$router.push({
        name: "위험 관리",
        params: {
          
        },
      });
    },
  },
};

</script>

<style lang="less" scoped></style>
