<template>
	<div>
		<modals-container />
		<div class="contents">

      <!-- 버튼 시작 -->
      <div class="common-btnwrap">
          <b-button size="sm" variant="primary" style="margin-right :10px;"  @click="btn_Search">조회</b-button>
          <b-button size="sm" variant="primary" style="margin-right :10px;" @click="btn_Save">저장</b-button>
          <b-button size="sm" variant="primary" style="margin: 0px;" @click="btn_MenuLink" v-text="msgtest"></b-button> 
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

        <!-- 코드리스트 영역 끝 -->
				<div class="imgdisplay" style="display:none; position:relative; float:left; position: absolute; z-index:100;">
					<img id="foodimg" style="width:400px; height:200px; margin-left: 50px"/>
				</div>
        <!-- 코드세부정보 영역 시작 -->
        <div class="code_list_item col-md-12 col-sm-12 col-xs-12">      
          <!-- 서브 그리드 시작 -->
          <grid
            id="grdMain"
            ref="MainGrid"
            :data="this.Grd_Data"
            :columns="Grid_Props.columns"
            :header="Grid_Props.header"
            :rowHeaders="Grid_Props.rowHeaders"
            :width="Grid_Props.width"
						:height="Grid_Props.bodyHeight"
            :scrollY="Grid_Props.scrollY"
            :scrollX="Grid_Props.scrollX"
            :theme="Grid_Props.myTheme"
						:summary="Grid_Props.summary"
						@editingStart="editstart"
						@editingFinish="CheckBox_Check"
          ></grid>
          <!-- 서브 그리드 끝 -->
        </div>
        <!-- 코드세부정보 영역 끝 -->
      </div> 
			
    </div>
	</div>
</template>

<script>
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable no-redeclare */
// import 영역
import GlobalValue from "@/assets/js/GlobalValue.js";  // 전 화면 공통으로 사용하는 변수
import { GridDefault, TextBoxEditor, NumberTextEditor,NumberComma } from "@/assets/js/GridDefault.js"; // 그리드 기본값 세팅, 그리드 EditOptions
import Utility from "@/assets/js/CommonUtility.js"; // 전 화면 공통으로 사용하는 함수
import { Grid } from "@toast-ui/vue-grid"; // tui-Grid Module
import { save_col_data, SEARCH_COL_MONTH, SEARCH_MENU_FOOD, SEARCH_STATUS } from '@/api/Col_Month.js'
import Modal from './FOOD_MENU_POP.vue'
import { getToken } from "@/utils/Cookie"; // 로그인 정보를 저장할 Cookie
import moment from 'moment'
var mouseX
var mouseY
var Food_img = 'https://www.hsd.co.kr/images/c40c2b4c3f88417ba70b84f252e4e31c20171025043356.jpg '

export default {
	components: {
		Grid
	},
	data() {
		return {
			status:'N',
			msgtest : '미리보기 ',
			beforeChangevalue: '',
			loginYN: false,
			Device_Type: '',
			today_combo_data: [],
			todayyyyy: new Date().getFullYear(),
			todaymm: new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1,
			todaydd: new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate(),
			combodata: [],
			todaycombodata: [],
			START_DTE: '',
			END_DTE: '',
			Search_GASName: '',  //검색조건 유해물질 명
			Grid_Props: [],      //그리드 정보
			Grd_Data: [],        //그리드 데이터
			Grd_Weight1: '',     //그리드 정보(매우나쁨)
			Grd_Weight2: '',     //그리드 정보(나쁨)
			Grd_Weight3: '',     //그리드 정보(보통)
			Grd_Weight4: '',     //그리드 정보(좋음)
			Grd_Weight5: '',     //그리드 정보(매우좋음)
			Grd_REMARK:'',       //그리드 정보(비고)
			Month_col: [],
			Month_complex: [],
			thisYear: '',
			thisMonth: '',
			thisColMonth: '',
			txt_Month: '1',
			cbo_Month: [
				{
					text: '1월',
					value: '1'
				},
				{
					text: '2월',
					value: '2'
				},
				{
					text: '3월',
					value: '3'
				},
				{
					text: '4월',
					value: '4'
				},
				{
					text: '5월',
					value: '5'
				},
				{
					text: '6월',
					value: '6'
				},
				{
					text: '7월',
					value: '7'
				},
				{
					text: '8월',
					value: '8'
				},
				{
					text: '9월',
					value: '9'
				},
				{
					text: '10월',
					value: '10'
				},
				{
					text: '11월',
					value: '11'
				},
				{
					text: '12월',
					value: '12'
				}
			]
		}
	},
	created() {
		
		this.FOOD_status()

		this.START_DTE = moment(new Date()).format("YYYY-MM-DD")
		this.END_DTE = moment(new Date()).add(4, 'days').format("YYYY-MM-DD")
		
		// 월말 찾기
		this.getEndDate()
		
		//그리드
		this.Grid_Props = {
			// data: this.Subgrd_Data,
			data: this.Subgrd_Data,
			rowHeaders: ['checkbox'],
			bodyHeight: GridDefault.bodyHeight,
			scrollY: false,
			scrollX: false,
			columns: this.Month_col,
			myTheme: {
				name: "mygrid",
				value: GridDefault.GridValue()
			},
			pageOptions: GridDefault.pageOptions, // 사용자 pageOptions 설정 사용 여부 (useClient: true, perPage: 10)
			summary: {
				height: 40,
				position: 'bottom',
				columnContent: {
				}
			}
		}
	},
	mounted() {

		if (getToken().USER_NM == undefined) {
			this.loginYN = false
		} else {
			this.loginYN = true
		}
		this.btn_Search()
		this.resize()
		scriptStart(this)
		Utility.fn_SetMenuPath(this); // 메뉴 Path 표시
		// window.addEventListener('message', this.test);
		window.addEventListener('message', function (event) { thisview.onRecieve_Message(event) });
		// window.addEventListener('message', function (e) {
		// 	console.log(e.data); //—> ‘hello’가 출력된다.  

		// 	//console.log(e.data); //—> ‘hello’가 출력된다.   
		// 	if(e.origin !== this.location.origin)
		// 		return;

		// 	if(e.data.page == undefined || e.data.page !== "rent_book")
		// 		return;

		// 	debugger;
		// 	this.selected2 = e.data;
		// 	//alert('rent'); 
		// });
	},
	methods: {
		// 주문 시작/ 종료 상태값 확인
		async FOOD_status(){
			// 주문시작/마감 구분 값을 조회한다.			
			let FOOD_status_value = await SEARCH_STATUS();			
			this.status = FOOD_status_value[0].GUBUN
		},
		onRecieve_Message(event) {
			if(CommonUtility.fn_IsNull(event.data.page))
				return;

			if(event.origin !== window.location.origin)
				return;

			if(event.data.page == undefined || event.data.page.toUpperCase() !== this.$route.path.toUpperCase())
				return;

			this.msgtest = event.data.data;
		},
		editstart(event) {
			this.beforeChangevalue = event.value
			var rowValue = this.$refs.MainGrid.invoke('getRow', event.rowKey)

			// 주문 시작인 경우
			if(this.status.toString().trim() =="Y")
			{
				if (this.loginYN == true) 
				{
					if (!getToken().USER_NM == rowValue.USER_NAME || !getToken().USER_NM.toUpperCase() == '관리자') 
					{
						event.stopped = true
					} 
					else 
					{
						event.stopped = false
					}
				}
				else 
				{
					// event.stopped = true
				}
			}
			else
			{
				event.stopped = true
				const h = this.$createElement
				
				// Using HTML string
				const titleVNode = h('div', { domProps: { innerHTML: '주문마감' } })
				// More complex structure
				
				const messageVNode = h('div', { class: ['foobar'] }, [
				h('p', { class: ['text-center'] }, [
					' 주문이 마감되었습니다. ',
				]),
				h('p', { class: ['text-center'] }, [
					h('strong', '김이슬 대리'),
					'에게 문의해주세요. ',
				])
				])
				// We must pass the generated VNodes as arrays
				this.$bvModal.msgBoxOk([messageVNode], {
				title: [titleVNode],
				buttonSize: 'sm',
				centered: true, size: 'sm'
				})
				return;
			}

			
		},
		setgridcolumn() {
			// 디바이스의 타입을 가져온다.
			this.Device_Type = Utility.fn_ScreenSize();
			var columnName = this.$refs.MainGrid.invoke('getColumns')
			for (var i = 0; i < columnName.length; i++) {
				if (columnName[i].name != ('COL_' + this.todayyyyy + '_' + this.todaymm + '_' + this.todaydd)){
					this.$refs.MainGrid.invoke('disableColumn', columnName[i].name)
				}
			}
			// 사용자 디바이스가 Mobile (세로모드)인 경우
      if (this.Device_Type == '"Mobile_V"' || this.Device_Type == "Mobile_V") {
				document.getElementById("datelong").style.display = "none"
        // 그리드 보여지는 컬럼(도서분류, 도서명, ISBN) 
        Utility.fn_Grid_ShowColumn(this.$refs.MainGrid, [columnName[0].name, columnName[2].name]);   
        
				// 그리드 숨겨지는 컬럼(출판사, 위치, 저자, 출판년도, 구매일) 
				if (columnName.length == 3) {
					Utility.fn_Grid_HideColumn(this.$refs.MainGrid, [columnName[1].name]);
				} else if (columnName.length == 4) {
					Utility.fn_Grid_HideColumn(this.$refs.MainGrid, [columnName[1].name, columnName[3].name]);
				} else if (columnName.length == 5) {
					Utility.fn_Grid_HideColumn(this.$refs.MainGrid, [columnName[1].name, columnName[3].name, columnName[4].name]);
				} else if (columnName.length == 6) {
					Utility.fn_Grid_HideColumn(this.$refs.MainGrid, [columnName[1].name, columnName[3].name, columnName[4].name, columnName[5].name]);
				} else if (columnName.length == 7) {
					Utility.fn_Grid_HideColumn(this.$refs.MainGrid, [columnName[1].name, columnName[3].name, columnName[4].name, columnName[5].name, columnName[6].name]);
				}
        // 
      }
      // 사용자 디바이스가 Mobile (가로모드)인 경우
      else if (this.Device_Type == '"Mobile_H"' || this.Device_Type == "Mobile_H") {
				document.getElementById("datelong").style.display = "none"
				if (columnName.length == 3) {
					Utility.fn_Grid_ShowColumn(this.$refs.MainGrid, [columnName[0].name, columnName[2].name]);   
				} else {
					Utility.fn_Grid_ShowColumn(this.$refs.MainGrid, [columnName[0].name, columnName[2].name, columnName[3].name]);   
				}
        
        // 그리드 숨겨지는 컬럼(위치, 저자, 출판년도) 
        if (columnName.length == 3) {
					Utility.fn_Grid_HideColumn(this.$refs.MainGrid, [columnName[1].name]);
				} else if (columnName.length == 4) {
					Utility.fn_Grid_HideColumn(this.$refs.MainGrid, [columnName[1].name,]);
				} else if (columnName.length == 5) {
					Utility.fn_Grid_HideColumn(this.$refs.MainGrid, [columnName[1].name, columnName[4].name]);
				} else if (columnName.length == 6) {
					Utility.fn_Grid_HideColumn(this.$refs.MainGrid, [columnName[1].name, columnName[4].name, columnName[5].name]);
				} else if (columnName.length == 7) {
					Utility.fn_Grid_HideColumn(this.$refs.MainGrid, [columnName[1].name, columnName[4].name, columnName[5].name, columnName[6].name]);
				}
			}
			else if (this.Device_Type == '"Tablet"' || this.Device_Type == "Tablet") {
				document.getElementById("datelong").style.display = "none"
			}
      // 그 외 Dsketop 모니터 또는 Dsketop 모니터보다 큰 경우
      else {
				document.getElementById("datelong").style.display = "block"
        // 그리드 보여지는 컬럼(도서분류, 도서명, 출판사, 위치, 저자, 출판년도, 구매일, ISBN)  
				if (columnName.length == 3) {
					Utility.fn_Grid_ShowColumn(this.$refs.MainGrid, [columnName[0].name, columnName[2].name])
				} else if (columnName.length == 4) {
					Utility.fn_Grid_ShowColumn(this.$refs.MainGrid, [columnName[0].name, columnName[2].name, columnName[3].name]);
				} else if (columnName.length == 5) {
					Utility.fn_Grid_ShowColumn(this.$refs.MainGrid, [columnName[0].name, columnName[2].name, columnName[3].name, columnName[4].name]);
				} else if (columnName.length == 6) {
					Utility.fn_Grid_ShowColumn(this.$refs.MainGrid, [columnName[0].name, columnName[2].name, columnName[3].name, columnName[4].name, columnName[5].name]);
				} else if (columnName.length == 7) {
					Utility.fn_Grid_ShowColumn(this.$refs.MainGrid, [columnName[0].name, columnName[2].name, columnName[3].name, columnName[4].name, columnName[5].name, columnName[6].name]);
				}
      }
		},
		resize() {
			window.onresize = () => {
        this.setgridcolumn(); // 그리드 컬럼 Visible 이벤트
      };
		},
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
		TreeColumn_Color(datarow) {
			if(Utility.fn_IsNull(datarow)) {
				return;
			} else {
				var today = new Date()
				var yyyy = today.getFullYear()
				var mm = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1
				var dd = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
				var test = 'COL_' + yyyy + '_' + mm + '_' + dd
				datarow.forEach(element => {
					// 속성이 없으면 만들면서 진행한다.
          if(element._attributes == undefined) {
            element["_attributes"]={}
          }

          // 스타일 속성이 없으면 만들면서 진행한다.
          if(element._attributes.className == undefined) {
            element._attributes["className"] = {}
          }

          // 컬럼 속성이 없으면 만들면서 진행한다.
          if(element._attributes.className.column == undefined) {
            element._attributes.className["column"] = {}
          }

          if(element._attributes.className.column[test] == undefined) {
            element._attributes.className.column[test] = []
          }
          // 권한 세부정보 Cell Color Update
          this.ColorUpdate(element, test)
				})
				return datarow;
			}
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
		getEndDate(data, dataParam, comboParam) {
			if (data == undefined) {
				this.Month_col.push(
					{
						header: '이름',
						name: 'USER_NAME'
					}
				)
				// 날짜
				var date = new Date()

				// 해당 날짜의 연도
				var yyyy = date.getFullYear()

				// 파라미터가 없을때 해당 월, 없을땐 1일
				if (data == undefined) {
					var mm = date.getMonth() + 1
				} else {
					var mm = data
				}

				// 선택된 월이 없을때
				if (this.txt_Month != '') {
					mm = this.txt_Month
				}

				// 달의 마지막날 구하기
				var dd = new Date(yyyy, mm, 0)

				if (mm < 10) {
					mm = '0' + mm
				}

				// 그리드 헤더 텍스트
				this.thisMonth = mm.toString() + '월'
				// 그리드 헤더 컬럼명
				this.thisColMonth = yyyy.toString() + mm.toString() 

				// 달의 마지막 날
				var endDate = dd.getDate() 

				// 달의 마지막 날의 배열
				for (var i = 0; i < endDate; i++) {
					var dayText = ''
					if ((i + 1) < 10) {
						dayText = '0' + (i + 1)
					} else {
						dayText = (i + 1)
					}
					var text = 'COL_' + yyyy.toString() + '_' + mm.toString() + '_' + dayText.toString()
					this.Month_complex.push(text)
					this.Month_col.push(
						{
							header: (i + 1).toString(),
							name: text,
							editor:{ type:TextBoxEditor, options:{ maxLength:10 }}
						}
					)
				}			
			} else {

				var startdte = this.START_DTE.replace(/-/g, '')
				var enddte = this.END_DTE.replace(/-/g, '')

				var startdte1 = new Date(this.START_DTE)
				var enddte1 = new Date(this.END_DTE)

				// 날짜차이 계산
				var diff1 = new Date(startdte1.getFullYear(), startdte1.getMonth(), startdte1.getDate())
				var diff2 = new Date(enddte1.getFullYear(), enddte1.getMonth(), enddte1.getDate())
				var diff = Math.abs(diff2.getTime() - diff1.getTime())
				// 날짜 차이값
				diff = diff / 1000 / 60 / 60 / 24

				// 콤보박스 바뀔때 배열 초기화
				this.Month_col = []
				this.Month_complex = []

				this.Month_col.push(
					{
						header: '이름',
						name: 'USER_NAME',
						width: '90'
					},
					{
						header: 'ID',
						name: 'USER_ID',
						hidden: true
					}
				)	

				// complex column 텍스트
				this.thisMonth = (startdte1.getMonth() + 1) < 10 ? '0' + (startdte1.getMonth() + 1) + ' 월' : (startdte1.getMonth() + 1) + ' 월'
				this.thisColMonth = (startdte1.getMonth() + 1) < 10 ? '0' + startdte1.getFullYear() + (startdte1.getMonth() + 1) : startdte1.getFullYear() + (startdte1.getMonth() + 1)
				
				
				for (var i = 0; i < diff + 1; i++) {
					var col = ''
					if (i == 0) {
						col = new Date(startdte1.setDate(startdte1.getDate()))
					} else {
						col = new Date(startdte1.setDate(startdte1.getDate() + 1))
					}
					var yyyy = col.getFullYear()
					var mm = (col.getMonth() + 1) < 10 ? '0' + (col.getMonth() + 1) : (col.getMonth() + 1)
					var dd = col.getDate() < 10 ? '0' + col.getDate() : col.getDate()
					var week = ['일', '월', '화', '수', '목', '금', '토']
					var dow = week[col.getDay()]
					var text = 'COL_' + yyyy.toString() + '_' + mm.toString() + '_' + dd.toString()
					this.Month_complex.push(text)					
					if (this.todayyyyy == yyyy && this.todaymm == mm && this.todaydd == dd) {
						this.Month_col.push(
							{
								header: mm + '월 ' + dd + '일 ' + dow + '요일',
								name: text,
								formatter: 'listItemText',
								editor: { 
									type: 'select',
									options: { 
										listItems: this.todaycombodata 
									}
								}
							}
						)
					} else {
						this.Month_col.push(
							{
								header: mm + '월 ' + dd + '일 ' + dow + '요일',
								name: text,
								formatter: 'listItemText',
								editor: { 
									type: 'select',
									options: { 
										listItems: this.combodata 
									}
								}
							}
						)
					}
					

					if (text == 'COL_' + this.todayyyyy + '_' + this.todaymm + '_' + this.todaydd) {
						var menuCount = []
						var menuPrice = []
						var foodstr = ''
						for (var j = 0; j < dataParam.length; j++) {
							if (dataParam[j][text] == '') {
							} else {
								menuCount.push(dataParam[j][text])
							}
						}
						// 메뉴 갯수 세기
						var res = menuCount.reduce((t,a) => {
							t[a] = (t[a] || 0) + 1 
							return t
						}, {})

						// 중복 제거하기 전에 가격을 계산함
						for (var m = 0; m < menuCount.length; m++) {
							for (var o = 0; o < comboParam.length; o++) {
								if (menuCount[m] == comboParam[o].VALUE) {
									menuPrice.push(parseInt(comboParam[o].PRICE))
									break;
								}
							}
						}
						
						// 가격의 합계 구하기, 천단위 콤마추가
						var priceSum = menuPrice.reduce((a,b) => a + b , 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
						// 메뉴 중복 제거
						menuCount = menuCount.reduce((a,b) => {
							if (a.indexOf(b) < 0) {
								a.push(b)
							}							
							return a
						}, [])

						var comboPam = ''
					
						for (var l = 0; l < menuCount.length; l++) {
							for (var n = 0; n < comboParam.length; n++) {
								if (comboParam[n].VALUE == menuCount[l]) {
									comboPam = comboParam[n].TEXT
									break;
								}
							}
							if (foodstr == '') {
								foodstr = comboPam + ' : ' + res[menuCount[l]]
							} else {
								foodstr = foodstr + '<br>' + comboPam + ' : ' + res[menuCount[l]]
							}
						}
						foodstr = foodstr + '<br> <div style="font-weight:bold; font-size:18px;">합계 : ' + priceSum + '</div>'
						this.$refs.MainGrid.invoke('setSummaryColumnContent', text, foodstr)
					} else {
					}
				}
			}
		},
		//메인 그리드 조회
		async btn_Search() {
			
			this.today_combo_data = []
			
			this.$refs.MainGrid.invoke("blur");
			var param1 = this.START_DTE.replace(/-/g, '')
			var param2 = this.END_DTE.replace(/-/g, '')
			// 데이터 조회			
			const Search_Code = await SEARCH_COL_MONTH(param1, param2)			
			const BindData = this.TreeColumn_Color(Search_Code);

			// row selectbox 조회
			const combo_data = await SEARCH_MENU_FOOD()
			
			// 콤보박스 데이터 convert
			this.combodata = [				
				{
					text: '',
					value: ''
				}
			]
			this.todaycombodata = [				
				{
					text: '',
					value: ''
				}
			]
			for (var j = 0; j < combo_data.length; j++) {
				if (combo_data[j].GUBUN == 'Y') {
					this.today_combo_data.push(combo_data[j])
					this.todaycombodata.push(
						{
							text: combo_data[j].TEXT,
							value: combo_data[j].VALUE
						}
					)
					this.combodata.push(
						{
							text: combo_data[j].TEXT,
							value: combo_data[j].VALUE
						}
					)
				} else {
					this.combodata.push(
						{
							text: combo_data[j].TEXT,
							value: combo_data[j].VALUE
						}
					)
				}
				
			}

			// 날짜형식으로 차이값 계산 후 메시지박스
			param1 = new Date(this.START_DTE)
			param2 = new Date(this.END_DTE)
			var diff1 = new Date(param1.getFullYear(), param1.getMonth(), param1.getDate())
			var diff2 = new Date(param2.getFullYear(), param2.getMonth(), param2.getDate())
			var diff = Math.abs(diff2.getTime() - diff1.getTime())
			// 날짜 차이값
			diff = diff / 1000 / 60 / 60 / 24
			this.$refs.MainGrid.invoke('clear')
			if (diff > 4) {
				this.$bvModal.msgBoxOk('최대 5일까지 조회가능합니다.', GlobalValue.Err_option)
				this.$refs.MainGrid.invoke('setSummaryColumnContent', 'COL_' + this.todayyyyy + '_' + this.todaymm + '_' + this.todaydd, '')
			} else {
				this.getEndDate('search', BindData, combo_data)
				this.$refs.MainGrid.invoke('setColumns', this.Month_col)

				if (BindData[0].USER_ID == '') {

				} else {
					this.$refs.MainGrid.invoke('resetData', BindData)
				}
			}
			
			this.setgridcolumn()
		},

		//저장 버튼
		async btn_Save() {
			var msgBox
			// 그리드에서 저장하기 전 마지막 edit cell에서 focus를 빠져 나와야 수정사항이 잘 반영 됩니다.
			this.$refs.MainGrid.invoke("blur");
			
			msgBox = await this.$bvModal.msgBoxConfirm("저장하시겠습니까?", GlobalValue.Info_option);
			if (msgBox) {

				// 주문시작/마감 구분 값을 조회한다.
				let FOOD_status_value = await SEARCH_STATUS();
				if(FOOD_status_value[0].GUBUN != "Y")
				{
					const h = this.$createElement
					
					// Using HTML string
					const titleVNode = h('div', { domProps: { innerHTML: '주문마감' } })
					// More complex structure
					
					const messageVNode = h('div', { class: ['foobar'] }, [
					h('p', { class: ['text-center'] }, [
						' 주문이 마감되었습니다. ',
					]),
					h('p', { class: ['text-center'] }, [
						h('strong', '김이슬 대리'),
						'에게 문의해주세요. ',
					])
					])
					// We must pass the generated VNodes as arrays
					this.$bvModal.msgBoxOk([messageVNode], {
					title: [titleVNode],
					buttonSize: 'sm',
					centered: true, size: 'sm'
					})
					return;
				}

				// 컬럼명 가져오기 위함
				var colData = this.$refs.MainGrid.invoke('getColumns')
				// 체크된 row값 가져옴
				var rowData = this.$refs.MainGrid.invoke("getCheckedRows");

				// 체크된 행이 없는 경우
				if(rowData.length < 1)
				{
					this.$bvModal.msgBoxOk('선택된 행이 없습니다. ', GlobalValue.Success_option);	
					return;
				}

				let user_id = ''
				var data = []

				var yyyy = new Date().getFullYear()
				var mm = this.txt_Month < 10 ? '0' + this.txt_Month : this.txt_Month

				// 체크된 row를 돌면서 저장 형식에 맞춤
				for (var i = 0; i < rowData.length; i++) {
					let str = '';
					for (var j = 0; j < colData.length; j++) {
						var val = rowData[i][colData[j].name]
						var colNM = ''
						// 컬럼명이 날짜가 아닐경우 pass
						if (colData[j].name == 'USER_NAME' || colData[j].name == 'USER_ID') {

						} else {
							if (str == '') {
								str = colData[j].name.replace('COL_','') + '^' + val
								user_id = rowData[i].USER_ID
							} else {
								str = str + '|'+ colData[j].name.replace('COL_','') + '^' + val
							}
						}
					}
					data[i] = {
						data: JSON.stringify({
							USER_ID: user_id,
							PARAM: str
						})
					}
				}
				const Save_Data = { data };

				const Result = await save_col_data(Save_Data)
				if (Result[0].query_success == 'N') {
					this.$bvModal.msgBoxOk(Result[0].query_err_msg, GlobalValue.Err_option);
				} else {
					this.$bvModal.msgBoxOk('저장이 완료되었습니다.', GlobalValue.Success_option);	
				}
				// 저장 후 재조회
				this.btn_Search()
				
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