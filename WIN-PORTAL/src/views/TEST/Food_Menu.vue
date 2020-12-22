<template  style="overflow:auto">
  <div>
    <div id="remote_grid" style = "position: fixed; margin-left:82%;  margin-rigth:10%; margin-top: 25%;">  
      <div style="width:100%; height : 100%;  float:right;"> 
        <!-- 그리드 영역 -->
        <grid
          ref="tuiGrid"
          :data="this.grid_data"
          :rowHeaders="gridProps.rowHeaders"
          :columns="gridProps.columns"
          :header="gridProps.header"
          :rowHeight="gridProps.rowHeight"
          :bodyHeight="gridProps.bodyHeight"
          :width="gridProps.width"
          :columnOptions="gridProps.columnOptions"
          :summary="gridProps.summary"
          :theme="gridProps.myTheme"
          :scrollY="gridProps.scrollY"
          :scrollX="gridProps.scrollX"
          :showDummyRows="gridProps.dummy"
          @uncheck="tuiGrid_uncheck"
          @uncheckAll="tuiGrid_uncheckAll"
        ></grid>
      </div>
    </div> 
    <!-- 화면 Contents 영역 -->
    <div class="contents">
      <div class="modal_form" style="width:90%;">
        <div v-for="(options2, i) in options" v-bind:key="i">
          <b-form-group
            :label="options2[0].gubun2"
            style="font-size:20px; font-weight:bold; text-decoration:underline;"
          ></b-form-group>

          <div style="display:flex; flex-flow:wrap;">
            <div v-for="(options3, j) in options2" v-bind:key="j">
              <b-img v-bind:src="options3.gubun3" style="width:350px; height:250px; margin-left: 30px"/>
              <b-form-checkbox v-model="selected" :id="options3.value" :value="options3.value" @change="validation_check(options3.value)" >{{ options3.text }}</b-form-checkbox>
              <br>
            </div>
          </div>
        </div>
      </div>
    </div>
 
    <!-- 하단 Footer 영역 -->

    <footer style="width:100%; bottom:0px; height : 50px; background-color:green; position:fixed;" id="footer_test"> 
        <a type="button" class="btn_cancle" @click="reset">초기화</a>
        <a type="button" class="btn_apply" @click="apply">적용</a>  
        <a id="btnstart" ref="btnstart_1" type="button" class="btn_start" @click="start">주문시작</a>
        <a id="btnfinish" ref="btnfinish_1" type="button" class="btn_finish" @click="finish">주문마감</a>  
    </footer>
    <footer style="width:100%; height : 50px; background-color:red; position:absolute;" id="footer_test2"> 
        <a type="button" class="btn_cancle" @click="reset">초기화</a>
        <a type="button" class="btn_apply" @click="apply">적용</a>  
        <a id="btnstart" ref="btnstart_2" type="button" class="btn_start" @click="start">주문시작</a>
        <a id="btnfinish" ref="btnfinish_2" type="button" class="btn_finish" @click="finish">주문마감</a>  
    </footer>
  </div>
</template>
<script>
import { getCommonCode } from "@/api/Common.js"; // 공통코드
import Utility from "@/assets/js/CommonUtility.js"; // 전 화면 공통으로 사용하는 함수
import GlobalValue from "../../assets/js/GlobalValue.js"; // 전 화면 공통으로 사용하는 변수
import { SELECT_FOOD_TODAY, FOOD_SAVE, ORDER_STATUS_SAVE } from "@/api/FOOD_MENU.js"; // 오늘의식사 메뉴 조회, 식사 메뉴 저장, 주문시작/마감 구분값 저장
import "tui-grid/dist/tui-grid.css"; // tui-Grid Module Css
import { Grid } from "@toast-ui/vue-grid"; // tui-Grid Module
import {GridDefault} from "../../assets/js/GridDefault.js"; // 그리드 기본값 세팅
import { SEARCH_STATUS } from '@/api/Col_Month.js' // 주문 시작 주문 마감


let menu_kind; // 식사 메뉴 체크박스 조회 데이터 전역변수 선언(적용 버튼 이벤트에서 재사용을 위해서 입니다.)

export default {
  
  // Component 선언부
  components: {
    grid: Grid // import 한 tui-grid를 grid 태그로 사용가능하게 한다.
  },
  data() {
    return {
      selected: [], // CHECKBOX 선택된 값을 담는 배열 변수
      options: [], // 체크박스를 구성 할 데이터를 담는 배열 변수
      gridProps: [],  // 그리드 Column Setting 배열 변수
      grid_data: [], // 그리드에 바인딩 할 Data 배열 변수
    };
  },
  created() {
    // 그리드 Option Setting
    this.gridProps = {
      data: this.grid_data,
      scrollY: true,
      scrollX: false,
      dummy: false,
      width:300,
      rowHeaders: ["checkbox"], // Row 첫행 체크박스 설정
      columns: [
        { header: "오늘의 메뉴", name: "CODE_NAME", align: "left", ellipsis:true},
        { header: "오늘의 메뉴", name: "CODE_NO", align: "left", ellipsis:true, hidden:true }
      ],
      myTheme: {
        name: "mygrid",
        value: GridDefault.GridValue()
      },
      header: GridDefault.header, // 헤더 정렬 (align: "center")
      rowHeight: GridDefault.rowHeight, // Row크기 (Default : 30)
      columnOptions : GridDefault.columnOptions, // 컬럼 사이즈 재조정 가능 여부 (resizable : true)
      bodyHeight: 250
    };
  },
  mounted() {
    this.FOOD_status() // 주문 시작 / 마감 구분값 조회
    window.addEventListener('load',  this.ScreenOnload(), false); // 초기 화면 Screen 설정 이벤트
    this.resize(); // 화면 사이즈 변경시 발생되는 이벤트
    document.getElementById("div_Path_title").style.display = "block";
    this.search(); // 식사 메뉴 조회
    this.get_Menu(); // 선택된 메뉴 조회 이벤트
  },
  methods: {

    // 초기 시용자 Screen 설정 이벤트
    ScreenOnload(){
      Utility.fn_SetMenuPath(this); // 메뉴 Path 표시
      this.setremote(); // 그리드 컬럼 Visible 이벤트
    },

    // Screen 사이즈 변경시 발생되는 이벤트
    resize() {
      window.onresize = () => {
        this.setremote(); // 그리드 컬럼 Visible 이벤트
      };
    },

    // 사용자 Screen에 맞는그리드 컬럼 show/hide 이벤트
    setremote: function()  {

      // 디바이스의 타입을 가져온다.
      this.Device_Type = Utility.fn_ScreenSize();

      // 사용자 디바이스가 Dsketop 모니터 또는 Dsketop 모니터보다 큰 경우
      if (this.Device_Type == '"Desktop"' || this.Device_Type == "Desktop" || this.Device_Type == '"Desktop_L"' || this.Device_Type == "Desktop_L") 
      {
        document.getElementById("remote_grid").style.display = "block";
      }
      // 그 외 Dsketop 모니터 또는 Dsketop 모니터보다 작은 경우
      else 
      {
        document.getElementById("remote_grid").style.display= "none";
      }
    },

    // 그리트 체크 해제 이벤트
    tuiGrid_uncheck(evt){
      var row_data = this.$refs.tuiGrid.invoke("getRow", evt.rowKey)
      this.selected.splice(this.selected.indexOf(row_data.CODE_NO), 1); 
      this.$refs.tuiGrid.invoke("removeRow", evt.rowKey)
    },

    // 그리트 전체 체크 해제 이벤트
    tuiGrid_uncheckAll(){
      this.reset();
    },

    // 주문 시작/ 종료 상태값 확인
		async FOOD_status(){
			// 주문시작/마감 구분 값을 조회한다.
			let FOOD_status_value = await SEARCH_STATUS();
      
      // 주문 시작인 경우
      if(FOOD_status_value[0].GUBUN === "Y")
      {
        this.$refs.btnstart_1.className = "btn_finish"
        this.$refs.btnstart_2.className = "btn_finish"
        this.$refs.btnfinish_1.className = "btn_Proceeding"
        this.$refs.btnfinish_2.className = "btn_Proceeding"
      }
      // 주문 마감인 경우
      else
      {
        this.$refs.btnstart_1.className = "btn_start"
        this.$refs.btnstart_2.className = "btn_start"
        this.$refs.btnfinish_1.className = "btn_finish"
        this.$refs.btnfinish_2.className = "btn_finish"  
      }
    },
    
    // 주문시작 버튼 클릭 이벤트
    start(){
      this.$refs.btnstart_1.className = "btn_finish"
      this.$refs.btnstart_2.className = "btn_finish"
      this.$refs.btnfinish_1.className = "btn_Proceeding"
      this.$refs.btnfinish_2.className = "btn_Proceeding"
      this.Save_ORDER_STATUS("Y") // 주문시작/마감 상태값 저장 메서드
    },
    
    // 주문마감 버튼 클릭 이벤트
    finish(){
      this.$refs.btnstart_1.className = "btn_start"
      this.$refs.btnstart_2.className = "btn_start"
      this.$refs.btnfinish_1.className = "btn_finish"
      this.$refs.btnfinish_2.className = "btn_finish"
      this.Save_ORDER_STATUS("N") // 주문시작/마감 상태값 저장 메서드
    },

     // 주문시작/마감 상태값 저장 메서드
    async Save_ORDER_STATUS(value){
      try {
        // 파라미터로 시작/마감 구분 값
        var data=[];
            data[0]= {data: JSON.stringify({
                                            VALUE: value.toString().trim() 
                                          })}
            
        var Save_Data={data}; // 저장할 데이터를 담는 변수(식사메뉴 코드)

        // 주문시작/마감 구분 저장 결과를 save_status 변수에 담는다. 
        let save_status = await ORDER_STATUS_SAVE(Save_Data);

        if (save_status[0].query_success != "Y") // 저장이 실패인 경우
        {
          try
          {
            var msgBox = await this.$bvModal.msgBoxOk(save_status[0].query_err_msg,GlobalValue.Err_option)
            if(msgBox)
            {
              this.$bvModal.close; // 알림창 닫기
            }                                    
          }
          catch(err)
          {
            this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
          }
        }

      } catch (err) {
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    

     // 선택된 메뉴 조회 이벤트
    async get_Menu(){
      try {
        
        //파라미터로 식사코드 사용
        var today_menu = await SELECT_FOOD_TODAY("FOOD");

         // 조회된 데이터가 없는 경우 return
        if (Utility.fn_IsNull(today_menu[0].CODE_NO)) {
          return;
        }
        var arr = []

        // 조회된 데이터가 있는 경우 체크 박스 값 체크한다.
        for(var i = 0; i < today_menu.length; i++)
        {
          this.selected.push(today_menu[i].CODE_NO)
          arr[i] = {
              CODE_NO: today_menu[i].CODE_NO,
              CODE_NAME: today_menu[i]["CODE_NAME"] + " (" + today_menu[i]["GUBUN4"] + "원) "
          }
        }
        this.$refs.tuiGrid.invoke("resetData", arr); // 그리드에 조회된 데이터 바인딩.
        this.$refs.tuiGrid.invoke("checkAll"); // 그리드에 바인딩된 데이터 전체 체크.
      } catch (err) {
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },
    
    async search() { //식사메뉴 체크박스 데이터 조회

      try {
        //파라미터로 식사코드 사용
        menu_kind = await getCommonCode("FOOD");
        
        // 조회된 데이터가 없는 경우 return
        if (Utility.fn_IsNull(menu_kind[0].CODE_NO)) {
          return;
        }

        var gubun_arr = []; // 식사메뉴 구분 (타이틀) 배열

        // 식사메뉴 구분 (타이틀)을 중복 제거 하여 배열에 담는다.
        for (var i = 0; i < menu_kind.length; i++) {
          // 식사메뉴 구분 (타이틀) 배열에 값이 없는 경우 push
          if (gubun_arr.includes(menu_kind[i]["GUBUN2"]) == false && menu_kind[i]["CODE_NO"] !="MENU0") {
            gubun_arr.push(menu_kind[i]["GUBUN2"]); // 도서 분류 구분 배열에 값을 넣는다.
          }
        }

        var Temp_ChkBox = []; // 식사메뉴 구분 (타이틀)에 맞는 체크박스 데이터가 담기는 배열 임시 변수 선언
        let ChkBox = []; // 식사메뉴 구분 (타이틀)에 맞는 체크박스 데이터가 담기는 배열 변수 선언
        // 식사메뉴 구분 (타이틀)에 맞게 체크 박스값을 넣을 배열 변수를 생성한다.
        for (var arr_i = 0; arr_i < gubun_arr.length; arr_i++) {
          ChkBox[arr_i] = []; // 첫번째 체크박스 배열 생성
          for (var idx = 0; idx < menu_kind.length; idx++) {
            // 나누어 둔 식사메뉴 구분 (타이틀)이 조회된 식사메뉴 구분 (타이틀) 구분과 일치하는 경우
            if (gubun_arr[arr_i] === menu_kind[idx]["GUBUN2"]) {
              // 임시 배열 변수에 값을 넣는다.
              Temp_ChkBox = {
                text: menu_kind[idx]["CODE_NAME"] + " (" + menu_kind[idx]["GUBUN4"] + "원) ",
                value: menu_kind[idx]["CODE_NO"],
                gubun2: menu_kind[idx]["GUBUN2"],
                gubun3: menu_kind[idx]["GUBUN3"].toString().trim(),
                Origin_text: menu_kind[idx]["CODE_NAME"]
              };

              ChkBox[arr_i].push(Temp_ChkBox); // 임시 배열변수 값을 체크박스 데이터가 담기는 배열 변수에 넣는다.

              Temp_ChkBox = []; // 임시 변수를 초기화 한다.
            }
          }
        }
        this.options = ChkBox; // 체크박스 List에 조회된 데이터를 넣는다.
      } catch (err) {
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    // 체크박스 갯수 제한 이벤트
    validation_check(data) {
      
      // 체크인 경우
      if(document.getElementById(data).checked) 
      {
        this.selected.push(data);
       
        var arr = []
        for(var i = 0; i < this.options.length; i++)
        {
          for(var j = 0; j < this.options[i].length; j++)
          {
            if(data === this.options[i][j].value)
            {
              arr[0] = {
                CODE_NO: this.options[i][j].value,
                CODE_NAME: this.options[i][j].text
              }
              this.$refs.tuiGrid.invoke("appendRows", arr)
              this.$refs.tuiGrid.invoke("checkAll")
              
              var add_row = this.$refs.tuiGrid.invoke("getRowAt", this.$refs.tuiGrid.invoke("getRowCount")-1)
              this.$refs.tuiGrid.invoke("focus", add_row.rowKey, "CODE_NAME") // 그리드 추가된 행에 포커스
              break;
            }
          }
        }
      }
      // 체크해제인 경우
      else 
      {
        this.selected.splice(this.selected.indexOf(data), 1); 

        var row_data = this.$refs.tuiGrid.invoke("getData")

        for(var idx = 0; idx < row_data.length; idx++)
        {
          if(row_data[idx].CODE_NO === data)
          {
            this.$refs.tuiGrid.invoke("removeRow", row_data[idx].rowKey)   
            break;
          }
        }
      }
    },

    // 리셋 버튼 클릭 이벤트
    reset(){
      this.selected =[];
      this.$refs.tuiGrid.invoke("clear"); // 그리드에 조회된 데이터 초기화
    },

    async apply(){ // 적용 버튼 클릭 이벤트
      try
      {
        // 선택된 메뉴가 없는 경우
        if(this.selected.length === 0)
        {
          msgBox = await this.$bvModal.msgBoxOk('선택된 메뉴가 없습니다.',GlobalValue.Err_option)
          return;
        }
        // 선택된 메뉴가 있는 경우
        else
        {
          var confirm_menu = ""; // 선택된 메뉴 text를 담는 변수

          // 선택한 메뉴 체크박스 갯수 만큼
          for(var x = 0; x < this.selected.length; x++)
          {
            // 바인딩되어있는 메뉴 체크박스(이중 배열) 갯수 만큼
            for(var y = 0; y < this.options.length; y++) 
            {
              // 바인딩되어있는 메뉴 체크박스(이중 배열)의 상세 메뉴 갯수 만큼
              for(var z = 0; z < this.options[y].length; z++)
              {  
                // 선택한 메뉴코드가 같은 경우
                if(this.selected[x] === this.options[y][z].value)
                {
                  confirm_menu = confirm_menu + "<"+this.options[y][z].Origin_text +">"+ ", ";
                }
              }
            }
          }
          confirm_menu= confirm_menu.slice(0,-2)  // 선택한 메뉴명들의 마지막 문자 ',' 를 제거 해준다.              
          var msgBox = await this.$bvModal.msgBoxConfirm(confirm_menu.toString() + "오늘의 메뉴로 선정하시겠습니까?", GlobalValue.Info_option);
          
          if(msgBox) // 식사 메뉴 저장 알림창 확인버튼
          {
            var CODE_CD = "";

            // 체크된 값을 데이터베이스에 저장하기 위한 String 형식으로 변환
            for(var i=0;  i < this.selected.length; i++)
            {
              for(var idx = 0; idx < menu_kind.length; idx++)
              {
                if(this.selected[i] === menu_kind[idx]["CODE_NO"])
                {
                    CODE_CD= CODE_CD + menu_kind[idx]["CODE_NO"] +","; // 체크된 체크박스 값 도서분류 코드를 String 형식 으로 만들어준다.
                }
              }
            }
            CODE_CD= CODE_CD.slice(0,-1)  // 도서 분류 코드 마지막 문자 ',' 를 제거 해준다.
            var data=[];
            data[0]= {data: JSON.stringify({
                                            CODE_NO: CODE_CD.toString().trim() 
                                          })}
            
            var Save_Data={data}; // 저장할 데이터를 담는 변수(식사메뉴 코드)

              // 식사 메뉴  저장 결과를 bookdelete 변수에 담는다. 
              let foodsave = await FOOD_SAVE(Save_Data);
              
              if (foodsave[0].query_success == "Y") // 정상적인 저장인 경우
              {
                try
                {
                  msgBox = await this.$bvModal.msgBoxOk('저장 되었습니다.',GlobalValue.Success_option)
                }
                catch(err)
                {
                  this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
                }
              }
              else // 식사 메뉴 저장 결과가 에러일 경우
              {
                try
                {
                  msgBox = await this.$bvModal.msgBoxOk(foodsave[0].query_err_msg,GlobalValue.Err_option)
                  if(msgBox)
                  {
                    this.$bvModal.close; // 알림창 닫기
                  }                                    
                }
                catch(err)
                {
                  this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
                }
              }
          }
        }
      }
      // 식사 메뉴 저장 중 에러 발생시
      catch(err)
      {
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    }
  },
};
</script>

<style>

.custom-checkbox{
  width: 350px;
  margin-left: 30px;
}

a.btn_cancle {
  width: 25%;
  display: block;
  float: left;
  height: 3.2em;
  text-align: center;
  line-height: 3.2em;
  color: #333;
  font-weight: 600;
  text-decoration: none;
  -webkit-transition: background-color 0.3s ease;
  transition: background-color 0.3s ease;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #f7f8fa;
  font-size: 1.2em !important;
}

a.btn_apply {
  width: 25%;
  display: block;
  float: left;
  height: 3.2em;
  text-align: center;
  line-height: 3.2em;
  font-weight: 600;
  text-decoration: none;
  -webkit-transition: background-color 0.3s ease;
  transition: background-color 0.3s ease;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  background: linear-gradient(to right, #00cfdb, #467ce1);
  font-size: 1.2em !important;
}

a.btn_start {
  width: 25%;
  display: block;
  float: left;
  height: 3.2em;
  text-align: center;
  line-height: 3.2em;
  font-weight: 600;
  text-decoration: none;
  -webkit-transition: background-color 0.3s ease;
  transition: background-color 0.3s ease;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  background-color: #5aa800;
  font-size: 1.2em !important;
}

a.btn_finish {
  width: 25%;
  display: block;
  float: left;
  height: 3.2em;
  text-align: center;
  line-height: 3.2em;
  font-weight: 600;
  text-decoration: none;
  -webkit-transition: background-color 0.3s ease;
  transition: background-color 0.3s ease;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #333;
  background-color: #595e54;
  font-size: 1.2em !important;
}

a.btn_Proceeding {
  width: 25%;
  display: block;
  float: left;
  height: 3.2em;
  text-align: center;
  line-height: 3.2em;
  font-weight: 600;
  text-decoration: none;
  -webkit-transition: background-color 0.3s ease;
  transition: background-color 0.3s ease;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #333;
  background-color: #f7176d;
  font-size: 1.2em !important;
}

</style>