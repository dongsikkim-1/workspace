<template >
    <div>
      <modals-container />
        <!-- 화면 Contents 영역 -->
        <div class="contents">
          
       <!-- 공통 검색 영역 -->
      <div class="common-schwrap">
        <fieldset>
          <div class="row">     
            <div class="col-md-12 col-sm-6">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label">장비 코드</label>
              <div class="col-md-9 col-sm-9 col-xs-8">
                <b-form-input id="EQUIP_CD" v-model="LB_EQUIP_CD_TXT" disabled = "true"></b-form-input>
              </div>
            </div>
            <div class="col-md-12 col-sm-6">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label">장비 구분</label>
              <div class="col-md-9 col-sm-9 col-xs-8">
                <b-form-select id="EQUIP_GUBUN_ID" v-model="LB_EQUIP_GUBUN_TXT" :options="cboEQUIPGUBUN" class="form-control"  v-on:change="gubun_changed"></b-form-select>
              </div>
            </div>
            <div class="col-md-12 col-sm-6">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label">장비명</label>
              <div class="col-md-9 col-sm-9 col-xs-8">
                <b-form-input id="input-live" v-model="LB_EQUIP_NM_TXT" :state="nameState" placeholder="장비명을 입력하세요 (한 글자 이상 입력)" class="form-control" trim ></b-form-input>
              </div>
           </div>
            <div class="col-md-12 col-sm-6">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label">현위치</label>
              <div class="col-md-9 col-sm-9 col-xs-8">
                <b-form-select id="CURRENT_LOC" v-model="LB_EQUIP_LOC_TXT" :state="LOCState" :options="cboLOCATION" class="form-control" ></b-form-select>
              </div>
            </div>
            <div class="col-md-12 col-sm-6" v-show="IsComputer">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label">CPU</label>
              <div class="col-md-9 col-sm-9 col-xs-8">
                <b-form-input v-model="LB_CPU_TXT" :state="CPUState" placeholder="CPU를 입력하세요" ></b-form-input>
              </div>
            </div>
            <div class="col-md-12 col-sm-6" v-show="IsComputer">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label">RAM</label>
              <div class="col-md-9 col-sm-9 col-xs-8">
                <b-form-input v-model="LB_RAM_TXT" :state="RAMState" placeholder="RAM을 입력하세요" ></b-form-input>
              </div>
            </div>
            <div class="col-md-12 col-sm-6" v-show="IsComputer">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label">저장장치</label>
              <div class="col-md-9 col-sm-9 col-xs-8">
                <b-form-checkbox-group size=lg v-model="LB_STORAGE_DV_TXT" :checked="LB_STORAGE_DV_TXT" :options="Storage_Options" name="storage" ></b-form-checkbox-group>
              </div>
            </div>
              <div class="col-md-12 col-sm-6" v-show="IsMonitor">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label">Inch</label>
              <div class="col-md-9 col-sm-9 col-xs-8">
                <b-form-select v-model="LB_INCH_TXT" :state="INCHState" :options="cboINCH" class="form-control"></b-form-select>
              </div>
            </div>
            <div class="col-md-12 col-sm-6" v-show="IsMonitor">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label">출력단자</label> 
              <div class="col-md-9 col-sm-9 col-xs-8">
                <b-form-checkbox-group size=lg v-model="LB_TERMINAL_TXT" :checked="LB_TERMINAL_TXT" :options="Teminal_Options" name="terminal" ></b-form-checkbox-group>
              </div>
            </div>
            <div class="col-md-12 col-sm-6">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label">고장 유무</label>
              <div class="col-md-9 col-sm-9 col-xs-8">
                <b-form-select v-model="LB_BROKEN_YN_TXT" :options="cboBROKENYN" class="form-control"></b-form-select>
              </div>
            </div>
            <div class="col-md-12 col-sm-6">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label">고장 이유</label>
              <div class="col-md-9 col-sm-9 col-xs-8">
                <b-form-input v-model="LB_BROKEN_REASON_TXT"></b-form-input>
              </div>
            </div>
            <div class="col-md-12 col-sm-6">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label">비고</label>
              <div class="col-md-9 col-sm-9 col-xs-8">
                <b-form-input v-model="LB_REMARK_TXT"></b-form-input>
              </div>
            </div>
          </div>
        </fieldset>
        <!-- 저장, 취소 버튼 -->
        </div>
        <div class="col-md-12 col-sm-12" style="text-align: center;" >
            <b-button variant="primary" @click="save">저장</b-button>&nbsp;&nbsp;
            <b-button variant="secondary" @click="cancel">취소</b-button>
        </div>

        </div><!-- END contents -->
    </div>
</template>

<script>
// import 영역
import { getToken } from "@/utils/Cookie";                             // 로그인한 사용자 ID
import CommonUtility from "../../assets/js/CommonUtility.js";                // 전 화면 공통으로 사용하는 함수
import GlobalValue from "../../assets/js/GlobalValue.js";              // 전 화면 공통으로 사용하는 변수
import { getCommonCode } from "@/api/Common.js"; // 공통코드
import { Asset_Save,  Asset_Add_Search} from "@/api/Enrollment_Add.js"; // 장비 저장, 종류, 고장 유무, 기존 data search
/*eslint-disable no-unused-vars, no-empty, no-unreachable*/ // 변수 선언 후 사용하지 않거나, 무의미한 띄어쓰기가 코드에 들어간 경우 에러를 내뱉는 경우를 방지


// Vue 핸들링 영역
export default {
  // Component 선언부
  components: {
  },
  // 복잡한 계산이나 연산을 하기 위해 사용하는 속성
  computed: {
    nameState() {
      return this.LB_EQUIP_NM_TXT.length > 0 ? true : false 
    },
    LOCState() {
      return CommonUtility.fn_ObjToStr(this.LB_EQUIP_LOC_TXT).length > 0 ? true : false 
    },
    CPUState() {
      return this.LB_CPU_TXT.length > 0 ? true : false 
    },
    INCHState() {
      return CommonUtility.fn_ObjToStr(this.LB_INCH_TXT).length > 0 ? true : false 
    },
    RAMState() {
      return CommonUtility.fn_ObjToStr(this.LB_RAM_TXT).length > 0 ? true : false 
    },
  },

  // 초기 데이터 변수 선언부
  data() {
    return {      
      cboLOCATION : [{}],       // 장소 콤보박스 배열
      cboEQUIPGUBUN : [{}],     // 장비 구분 콤보박스 배열
      cboBROKENYN : [{}],       // 고장 유무 콤보박스 배열
      cboINCH : [{}],           // 고장 유무 콤보박스 배열


      LB_EQUIP_GUBUN_TXT : "",  // 장비 구분 입력창
      LB_EQUIP_CD_TXT : "",     // 장비 코드 입력창
      LB_EQUIP_NM_TXT : "",     // 장비명 입력창
      LB_EQUIP_LOC_TXT : "",  // 현위치 입력창
      LB_CPU_TXT : "",          // PC CPU 입력창
      LB_RAM_TXT : "",          // PC RAM 입력창
      LB_STORAGE_DV_TXT : [],   // PC 저장장치 입력창
      LB_INCH_TXT : "",         // 모니터인치 입력창
      LB_TERMINAL_TXT : [],     // 모니터 아웃풋타입 입력창
      LB_BROKEN_YN_TXT : "",    // 고장 유무 입력창
      LB_BROKEN_REASON_TXT : "",// 고장 이유 입력창
      LB_REMARK_TXT : "",       // 비고 입력창

      IsComputer : true, // 장비구분이 데스크탑, 노트북이면 true
      IsMonitor : false,   // 장비구분이 모니터면 true

      Teminal_Options: [
        {text:"RGB", value:"RGB"},
        {text:"DVI", value:"DVI"},
        {text:"HDMI", value:"HDMI"},
      ],

      Storage_Options: [
        {text:"SSD", value:"SSD"},
        {text:"HDD", value:"HDD"},
      ],

    };
  },

  // 화면이 로드될 때 실행되는 이벤트
  created() {
    
  },

  // 화면이 로드될 때 DOM 생성이 완료된 후 실행되는 이벤트 선언부
  mounted() {
    this.SetInit();

    window.addEventListener('load',  this.ScreenOnload(), false); // 초기 화면 Screen 설정 이벤트
  },

  // 이벤트 선언부
  methods: {
    gubun_changed(NewValue){
      if(CommonUtility.fn_IsNull(NewValue))
        return;

      if(NewValue === "MNT") {
        this.IsComputer = false;
        this.IsMonitor = true;
      } 
      else {
        this.IsComputer = true;
        this.IsMonitor = false;
      }

      // 데스크탑, 노트북 관련 초기화
      this.LB_EQUIP_CD_TXT = "";    // 장비코드
      this.LB_EQUIP_NM_TXT = "";    // 장비명
      this.LB_EQUIP_LOC_TXT = ""; // 현위치
      this.LB_CPU_TXT = "";         // CPU
      this.LB_RAM_TXT = "";         // RAM
      this.LB_STORAGE_DV_TXT = [];  // 저장장치
      this.LB_INCH_TXT = null;        // INCH
      this.LB_TERMINAL_TXT = [];    // 출력단자

      this.LB_BROKEN_YN_TXT = "N";    // 고장여부
      this.LB_BROKEN_REASON_TXT = ""; // 고장이유
      this.LB_REMARK_TXT = "";        // 비고
    },
    async SetInit(){
      await this.setcombo();

      // 입력 키 값(장비코드)이 undefined, null이 아닐 경우 
      if(!CommonUtility.fn_IsNull(this.$route.params.EQUIP_NO)) {
        this.LB_EQUIP_CD_TXT = this.$route.params.EQUIP_NO  
        this.search();
        //this.search();
        document.getElementById("EQUIP_GUBUN_ID").disabled = true         // 수정시에는 장비 구분을 선택할 수없게 disabled        
      }
    },
    async setcombo(){
      await this.Set_LocCombo();
      await this.Set_TypeCombo();
      await this.Set_BrokenCombo();
      await this.Set_InchCombo();
    },
    cancel() {
      this.LB_STORAGE_DV_TXT = [];
      this.LB_TERMINAL_TXT = [];
      this.$router.push('/Enrollment_Asset')    // 추가 버튼을 누를시 라우터가 가리키는 곳으로 페이지 전환
    },
    
    // 초기 시용자 Screen 설정 이벤트
    ScreenOnload(){
      CommonUtility.fn_SetMenuPath(this); // 메뉴 Path 표시
    },

    // 현위치 콤보 조회
    async Set_LocCombo() {
      try
      {
        let asset_location_combo = await getCommonCode("A01");

        // 조회된 데이터가 null이거나 undefined 인 경우
        if(CommonUtility.fn_IsNull(asset_location_combo[0].CODE_NO)) {
          return;
        }

        // 첫번째 콤보에 전체를 추가한다.
        var arr = [{text: "위치를 선택하세요", value: null, disabled: true }];
        
        // 조회된 데이터를 배열에 값에 맞게 추가한다.
        for (var i = 1; i < asset_location_combo.length + 1; i++) 
        {
          arr[i] = {
            text: asset_location_combo[i - 1]["CODE_NAME"], // 코드명
            value: asset_location_combo[i - 1]["CODE_NO"] // 코드
          };
        }

        this.cboLOCATION = arr;
        this.LB_EQUIP_LOC_TXT = null;
      }
      catch(err)
      {
         this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    }, 
    
    // 장비 구분(데스크탑, 노트북) 콤보 조회
    async Set_TypeCombo() {
      try
      {
        let asset_type_combo = await getCommonCode("A02");

        // 조회된 데이터가 null이거나 undefined 인 경우
        if(CommonUtility.fn_IsNull(asset_type_combo[0].CODE_NO))
        {
          return;
        }

        // 첫번째 콤보에 전체를 추가한다.
        var arr = [{text: "장비 구분을 선택하세요", value: null, disabled: true }];        // 장비 구분 콤보를 선택할 때 해당 행은 선택 안되게함
        
        // 조회된 데이터를 배열에 값에 맞게 추가한다.
        for (var i = 1; i < asset_type_combo.length + 1; i++) 
        {
          arr[i] = {
            text: asset_type_combo[i - 1]["CODE_NAME"], // 코드명
            value: asset_type_combo[i - 1]["CODE_NO"] // 코드
          };
        }
        this.cboEQUIPGUBUN = arr;       // 
        this.LB_EQUIP_GUBUN_TXT = "DST";         // 데스크탑을 기본으로 한다.
      }
      catch(err)
      {
         this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    // 고장 유무 콤보 조회
    async Set_BrokenCombo() {
      try
      {
        let asset_broken_combo = await getCommonCode("A10");

        // 조회된 데이터가 null이거나 undefined 인 경우
        if(CommonUtility.fn_IsNull(asset_broken_combo[0].CODE_NO))
        {
          return;
        }

        // 첫번째 콤보에 전체를 추가한다.
        var arr = [{text: "고장 유무를 선택하세요", value: null, disabled: true }];          // 고장 유무 콤보를 선택할 때 해당 행은 선택 안되게함
        
        // 조회된 데이터를 배열에 값에 맞게 추가한다.
        for (var i = 1; i < asset_broken_combo.length + 1; i++) 
        {
          arr[i] = {
            text: asset_broken_combo[i - 1]["CODE_NAME"], // 코드명
            value: asset_broken_combo[i - 1]["CODE_NO"] // 코드
          };
        }
        this.cboBROKENYN = arr;       // 
        this.LB_BROKEN_YN_TXT = 'N';         // 
      }
      catch(err)
      {
         this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    // 인치 콤보 조회
    async Set_InchCombo() {
      try
      {
        let asset_inch_combo = await getCommonCode("A05");

        // 조회된 데이터가 null이거나 undefined 인 경우
        if(CommonUtility.fn_IsNull(asset_inch_combo[0].CODE_NO))
        {
          return;
        }

        // 첫번째 콤보에 전체를 추가한다.
        var arr = [{text: "Inch를 선택하세요", value: null, disabled: true }];          // Inch 콤보를 선택할 때 해당 행은 선택 안되게함
        
        // 조회된 데이터를 배열에 값에 맞게 추가한다.
        for (var i = 1; i < asset_inch_combo.length + 1; i++) 
        {
          arr[i] = {
            text: asset_inch_combo[i - 1]["CODE_NAME"], // 코드명
            value: asset_inch_combo[i - 1]["CODE_NO"] // 코드
          };
        }
        this.cboINCH = arr;      // 
        this.LB_INCH_TXT = null; // 
      }
      catch(err) {
         this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    // 장비(본체)추가 화면 조회 이벤트(기존에 있는 데이터 조회)
    async search() {
      try {
         // 파라미터로 장비코드 사용(장비코드 키 값을 던지면 조회)
        let asset_add_search = await Asset_Add_Search(CommonUtility.fn_ObjToStr(this.LB_EQUIP_CD_TXT))
        this.LB_EQUIP_GUBUN_TXT = asset_add_search[0].EQUIP_GUBUN_CD
        this.gubun_changed(this.LB_EQUIP_GUBUN_TXT);

        this.LB_EQUIP_CD_TXT = asset_add_search[0].EQUIP_NO
        this.LB_EQUIP_NM_TXT = asset_add_search[0].EQUIP_NM
        this.LB_EQUIP_LOC_TXT = asset_add_search[0].CURRENT_LOC_CD
        this.LB_CPU_TXT = asset_add_search[0].CPU
        this.LB_RAM_TXT = asset_add_search[0].RAM
      
        //this.LB_STORAGE_DV_TXT.push(asset_add_search[0].STORAGE_DV)
        if(!CommonUtility.fn_IsNull(asset_add_search[0].STORAGE_DV)) {
          const asset_arr = asset_add_search[0].STORAGE_DV.split(',');
          asset_arr.forEach(element => {
            this.LB_STORAGE_DV_TXT.push(element);
          })
        }

        this.LB_INCH_TXT = asset_add_search[0].INCH

        if(!CommonUtility.fn_IsNull(asset_add_search[0].TERMINAL)) {
          const asset_arr = asset_add_search[0].TERMINAL.split(',');
          asset_arr.forEach(element => {
            this.LB_TERMINAL_TXT.push(element);
          })
        }
        this.LB_BROKEN_YN_TXT = asset_add_search[0].BROKEN_YN
        this.LB_BROKEN_REASON_TXT = asset_add_search[0].BROKEN_REASON
        this.LB_REMARK_TXT = asset_add_search[0].REMARK
      }
      catch(err) {
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    // 저장 버튼 클릭 이벤트
    async save(){
      try {
        if(CommonUtility.fn_IsNull(this.LB_EQUIP_GUBUN_TXT)) {    // 필수 입력 사항(장비 구분) 입력 되지 않았을 시 MSG, Validation Check
          this.$bvModal.msgBoxOk("장비 구분을 선택하세요.", GlobalValue.Err_option);
          return;
        }

        if(CommonUtility.fn_IsNull(this.LB_EQUIP_NM_TXT)) {    // 필수 입력 사항(장비명) 입력 되지 않았을 시 MSG, Validation Check
          this.$bvModal.msgBoxOk("장비명을 입력하세요", GlobalValue.Err_option);
          return;
        }

        if(CommonUtility.fn_IsNull(this.LB_EQUIP_LOC_TXT)) {   // 필수 입력 사항(위치) 입력 되지 않았을 시 MSG, Validation Check
          this.$bvModal.msgBoxOk("위치를 선택하세요", GlobalValue.Err_option);
          return;
        }

        if(this.IsComputer) {
          if(CommonUtility.fn_IsNull(this.LB_CPU_TXT)) { // 노트북이나 데스크탑일때 CPU체크
            this.$bvModal.msgBoxOk("CPU를 입력하세요", GlobalValue.Err_option);
            return;
          }

          if(CommonUtility.fn_IsNull(this.LB_RAM_TXT)) { // 노트북이나 데스크탑일때 RAM체크
            this.$bvModal.msgBoxOk("RAM을 입력하세요", GlobalValue.Err_option);
            return;
          }

          if(CommonUtility.fn_IsNull(this.LB_STORAGE_DV_TXT)) { // 노트북이나 데스크탑일때 저장장치체크
            this.$bvModal.msgBoxOk("저장장치를 입력하세요", GlobalValue.Err_option);
            return;
          }
        }
        else if (this.IsMonitor) {
          if(CommonUtility.fn_IsNull(this.LB_INCH_TXT)) { // 모니터일때 인치체크
            this.$bvModal.msgBoxOk("인치를 선택하세요", GlobalValue.Err_option);
            return;
          }
          if(CommonUtility.fn_IsNull(this.LB_TERMINAL_TXT)) {  // 모니터일때 출력단자체크
            this.$bvModal.msgBoxOk("출력단자를 선택하세요", GlobalValue.Err_option);
            return;
          }
        }

        if(CommonUtility.fn_IsNull(this.LB_BROKEN_YN_TXT)) {    // 필수 입력 사항(고장 유무) 입력 되지 않았을 시 MSG, Validation Check
          this.$bvModal.msgBoxOk("고장유무를 선택하세요", GlobalValue.Err_option);
          return;
        }

        let msgBox = await this.$bvModal.msgBoxConfirm("장비를 저장하시겠습니까?", GlobalValue.Info_option);
    
        if(msgBox) // 장비 저장 알림창 확인버튼
        {
          var data=[];
          let user_id = getToken("USER_ID");
          if(CommonUtility.fn_IsNull(user_id)) {
            user_id = "empty"
          }
          data[0]= {data: JSON.stringify({                                                         // key 값(오라클 I 값):value 값 -> 파라미터를 오라클과 항상 맞춰야 실행이 가능하다.
                                          EQUIP_TYPE:CommonUtility.fn_ObjToStr(this.LB_EQUIP_GUBUN_TXT),      // 장비구분(DST, NTB)
                                          EQUIP_NO:CommonUtility.fn_ObjToStr(this.LB_EQUIP_CD_TXT),
                                          EQUIP_NM:CommonUtility.fn_ObjToStr(this.LB_EQUIP_NM_TXT),
                                          EQUIP_LOC:CommonUtility.fn_ObjToStr(this.LB_EQUIP_LOC_TXT),
                                          CPU:CommonUtility.fn_ObjToStr(this.LB_CPU_TXT),
                                          RAM:CommonUtility.fn_ObjToStr(this.LB_RAM_TXT),
                                          STORAGE_DV:CommonUtility.fn_ObjToStr(this.LB_STORAGE_DV_TXT).toString(),
                                          INCH:CommonUtility.fn_ObjToStr(this.LB_INCH_TXT),
                                          TERMINAL:CommonUtility.fn_ObjToStr(this.LB_TERMINAL_TXT).toString(),
                                          BROKEN_YN:CommonUtility.fn_ObjToStr(this.LB_BROKEN_YN_TXT),
                                          BROKEN_REASON:CommonUtility.fn_ObjToStr(this.LB_BROKEN_REASON_TXT),
                                          REMARK:CommonUtility.fn_ObjToStr(this.LB_REMARK_TXT),
                                          USER:user_id
                                        })}

          var Save_Data={data}; // 저장할 데이터를 담는 변수(장비구분키, 장비명)

          // 장비 등록 저장 결과를 asset_save 변수에 담는다. 
          const asset_save = await Asset_Save(Save_Data);
          if (asset_save[0].query_success == "Y") { // 정상적인 저장인 경우
            await this.$bvModal.msgBoxOk('저장 되었습니다.',GlobalValue.Success_option)  
            this.$bvModal.close; // 알림창 닫기
            this.$router.push('/Enrollment_Asset')    // 저장한 후 조회 페이지로 전환
          }
          else {// 장비 저장 결과가 에러일 경우
            await this.$bvModal.msgBoxOk(asset_save[0].query_err_msg,GlobalValue.Err_option)
            this.$bvModal.close;   // 알림창 닫기
          }
        }
      } 
      catch(err) {
        // 장비(본체) 저장 시작 부분 에러 발생시
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    }
  }
};
</script>

<style lang="less" scoped>


</style>