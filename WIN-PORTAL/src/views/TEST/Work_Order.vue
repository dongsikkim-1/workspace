<template>
	<div>
		<modals-container />
		<div class="contents">

      <!-- 버튼 시작 -->
      <div class="common-btnwrap">
          <b-button size="sm" variant="primary" style="margin-right :10px;"  @click="btn_Search">조회</b-button>
          <b-button size="sm" variant="primary" style="margin-right :10px;" @click="btn_Save">저장</b-button>          
      </div>
      <!-- 버튼 끝-->

      <!-- 조회조건 시작 -->
      <div  id="datelong" class="common-schwrap">
        <fieldset>
          <div class="row">
            <div class="col-md-3 col-sm-6">
              <label class="col-md-4 col-sm-4 col-xs-4 control-label">기간</label>
              <div class="col-md-8 col-sm-8 col-xs-8">                                
                 <input type="date" id="REG_SDATE" v-model="START_DTE" class="form-control">
              </div>
            </div>
            <div class="col-md-3 col-sm-6">
              <label class="col-md-1 col-sm-4 col-xs-4 control-label">~</label>
              <div class="col-md-8 col-sm-8 col-xs-8">                                
                 <input type="date" id="REG_EDATE" v-model="END_DTE" class="form-control">
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <!-- 조회조건 끝-->

      <!-- 컨텐츠 시작 -->
      <div style="margin-top:20px;">

        <div class="code_list_item col-md-12 col-sm-12 col-xs-12">      
          <!-- 그리드 시작 -->
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
          <!-- 그리드 끝 -->
        </div>
        
      </div> 
			
    </div>
	</div>
</template>

<script>
/*eslint-disable no-unused-vars, no-empty*/ // 변수 선언 후 사용하지 않거나, 무의미한 띄어쓰기가 코드에 들어간 경우 에러를 내뱉는 경우를 방지
// import 영역
import Vue from 'vue';
import "tui-pagination/dist/tui-pagination.css"; // tui-Grid Pagination Css
import "tui-grid/dist/tui-grid.css"; // tui-Grid Module Css
import { getCommonCode } from "@/api/Common.js"; // 공통코드
import GlobalValue from "@/assets/js/GlobalValue.js";  // 전 화면 공통으로 사용하는 변수
import { GridDefault, TextBoxEditor, NumberTextEditor, NumberComma } from "@/assets/js/GridDefault.js"; // 그리드 기본값 세팅, 그리드 EditOptions
import Utility from "@/assets/js/CommonUtility.js"; // 전 화면 공통으로 사용하는 함수
import { Grid } from "@toast-ui/vue-grid"; // tui-Grid Module
// import {  } from '@/api/Col_Month.js'
import Modal from './Work_Order_POP.vue'
import { getToken } from "@/utils/Cookie"; // 로그인 정보를 저장할 Cookie
import moment from 'moment'
import { unitOfTime } from 'moment';

var mouseX
var mouseY

var now = moment();
var day = now.day();
var week = [['monday',0],['tuesday',1],['wednesday',2],['thursday',3],['friday',4],['saturday',5],['sunday',6]];
var monday = moment().day(-(week[0][0] - day));

export default {
	components: {
		grid: Grid // import 한 tui-grid를 grid 태그로 사용가능하게 한다.
	},
	data() {
		return {
			status:'N',
			msgtest : '미리보기 ',
			beforeChangevalue: '',
			loginYN: false,
			Device_Type: '',
			today_combo_data: [],

			combodata: [],
			todaycombodata: [],
			START_DTE: '',
			END_DTE: '',
			grid_data: [],  // 그리드에 바인딩 할 Data 배열 변수
			gridProps: [],  // 그리드 Column Setting 배열 변수      		
			Month_col: [],
			Month_complex: [],
			thisYear: '',
			thisMonth: '',
			thisColMonth: '',
			txt_Month: '1',
		}
	},
	created() {
	
		// this.START_DTE = moment(new Date()).format("YYYY-MM-DD")
		// this.END_DTE = moment(new Date()).add(4, 'days').format("YYYY-MM-DD")

		this.START_DTE = moment(monday).format("YYYY-MM-DD")
		this.END_DTE = moment(monday).add(4, 'days').format("YYYY-MM-DD")
		
	
		//그리드
		this.gridProps = {
			// data: this.Subgrd_Data,
			data: this.grid_data,					
			scrollY: false,
			scrollX: false,
			dummy: false,
			rowHeaders: ['checkbox'],	
			columns: this.Month_col,
			myTheme: {
				name: "mygrid",
				value: GridDefault.GridValue()
			},
			header: GridDefault.header, // 헤더 정렬 (align: "center")
			rowHeight: GridDefault.rowHeight, // Row크기 (Default : 30)
			bodyHeight: GridDefault.bodyHeight, // 그리드 크기 (Default : 300)
			columnOptions : GridDefault.columnOptions, // 컬럼 사이즈 재조정 가능 여부 (resizable : true)
			pageOptions: GridDefault.pageOptions // 사용자 pageOptions 설정 사용 여부 (useClient: true, perPage: 10)
		}

	},
	mounted() {

		// if (getToken().USER_NM == undefined) {
		// 	this.loginYN = false
		// } else {
		// 	this.loginYN = true
		// }
		
		// // this.resize()
		// Utility.fn_SetMenuPath(this); // 메뉴 Path 표시
		// // window.addEventListener('message', this.test);
		// // window.addEventListener('message', function (event) { thisview.onRecieve_Message(event) });
		// // window.addEventListener('message', function (e) {
		// // 	console.log(e.data); //—> ‘hello’가 출력된다.  

		// // 	//console.log(e.data); //—> ‘hello’가 출력된다.   
		// // 	if(e.origin !== this.location.origin)
		// // 		return;

		// // 	if(e.data.page == undefined || e.data.page !== "rent_book")
		// // 		return;

		// // 	debugger;
		// // 	this.selected2 = e.data;
		// // 	//alert('rent'); 
		// // });
	},
	methods: {

		btn_MenuLink() {
			// window.open('https://www.hsd.co.kr/menu/menu_list')
			this.$modal.show(
				Modal,
				{
					TARGET: this,
					modal: this.$modal
				},
				{
					// 호출한 팝업 Style 선언
					// name: "FOOD_POP",
					// id: "USER_POP_ID",
					width: '550px',   // 팝업창 너비 설정
					height: '650px',   // 팝업창 높이 설정
					draggable: false  // 팝업창 드래그 설정
				}
			)
		},
		//권한세부정보의 Cell Color Update
		ColorUpdate(DataRow, test){
			DataRow._attributes.className.column[test]=["USE_N"]
		},
		CheckBox_Check(event) {
			if (this.$refs.MainGrid.invoke('getRowCount') > 0) {
				if (event.value != this.beforeChangevalue) {
					this.$refs.MainGrid.invoke("check", event.rowKey);
				}
			}
		},
		
		//메인 그리드 조회
		async btn_Search() {
			
			this.today_combo_data = []
			
			this.$refs.MainGrid.invoke("blur");
			var param1 = this.START_DTE.replace(/-/g, '')
			var param2 = this.END_DTE.replace(/-/g, '')
			
			
		},

		//저장 버튼
		async btn_Save() {
			var msgBox
			// 그리드에서 저장하기 전 마지막 edit cell에서 focus를 빠져 나와야 수정사항이 잘 반영 됩니다.
			this.$refs.MainGrid.invoke("blur");
			
			msgBox = await this.$bvModal.msgBoxConfirm("저장하시겠습니까?", GlobalValue.Info_option);
			if (msgBox) {

				
			}
		}                       
	}
}
function scriptStart(_this) {
	$(document).mousemove(function (e) {
		if (e.target.className == 'tui-select-box-item tui-select-box-highlight' || e.target.className == 'tui-select-box-item tui-select-box-selected tui-select-box-highlight') {
			var today_food_img = _this.today_combo_data
			
			var comboValue = e.target.attributes[2].value
			
			mouseX = e.pageX
			mouseY = e.pageY
			if (mouseY > 800) {
				mouseY = mouseY - 180
			}
			
			if (_this.Device_Type == '"Desktop_L"' || _this.Device_Type == '"Desktop"') {
				for (var i = 0; i < today_food_img.length; i++) {
					if (today_food_img[i].VALUE == comboValue) {
						if (today_food_img[i].VALUE == 'MENU0') {
							document.getElementById('foodimg').src = undefined
							$('.imgdisplay').hide();
						} else {
							document.getElementById('foodimg').src = today_food_img[i].FOOD_IMG
							$('.imgdisplay').show();
							$('.imgdisplay').css({ 'top': mouseY, 'left': mouseX }).fadeIn('slow');
						}	
					
					} else {
						// $('.imgdisplay').hide();
					}
				}
			}

			
		} else {
			$('.imgdisplay').hide();
			// $('.imgdisplay').css({ 'top': mouseY, 'left': mouseX }).fadeIn('slow');
		}
	});
}



// $(document).ready(function (event) {
// 	$('tui-select-box-item').on('mouseenter', 'option', function (e) {
// 		//your logic here
// 		// this refers to the option so you can do this.value if you need..
// 		//$(".classForHoverEffect").mouseover(function () {
// 			$('.imgdisplay').show();
// 			$('.imgdisplay').css({ 'top': mouseY, 'left': mouseX }).fadeIn('slow');
// 	});
// });
</script>

<style>
  .USE_Y{background-color: #CEF6F5 !important;}
  .USE_N{background-color: #F8E0E0 !important;}
	.testclass{font-size: 13px;}
	.tui-grid-cell-disabled {
		background-color: #f9f9f9;
    color: #333 !important;
	}
</style>