<template>
	<div>
		<div class="contents">

      <!-- 버튼 시작 -->
      <div class="common-btnwrap">
          <b-button size="sm" variant="primary" @click="btn_Search">조회</b-button>
      </div>
      <!-- 버튼 끝-->

      <!-- 조회조건 시작 -->
      <div class="common-schwrap">
        <fieldset>
          <div class="row">
            <div class="col-md-3 col-sm-6">
              <label class="col-md-4 col-sm-4 col-xs-4 control-label">코드명:</label>
              <div class="col-md-8 col-sm-8 col-xs-8">
                <b-form-input class="input" v-model="Search_CodeName" @keypress.enter="btn_Search" autocomplete="off"></b-form-input>
              </div>
            </div>
          </div>
          <b-form inline>
            <label class="sr-only" for="inline-form-input-name">Name</label>
            <b-form-input
              id="inline-form-input-name"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder="Heung-Min Son"
            ></b-form-input>

            <label class="sr-only" for="inline-form-input-username">사용자 이름</label>
            <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
              <b-form-input id="inline-form-input-username" placeholder="Username"></b-form-input>
            </b-input-group>

            <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">기억</b-form-checkbox>

            <b-button variant="primary" style="margin-left: 30px;">저장</b-button>
          </b-form>
          <div>
            <label for="range-1">Range Min Max Test</label>
            <b-form-input id="range-1" v-model="value" type="range" min="0" max="100"></b-form-input>
            <div class="mt-2">1값: {{ value }}</div>
            <b-form-input id="range-2" v-model="value2" type="range" min="0" max="100"></b-form-input>
            <div class="mt-2">2값: {{ value2 }}</div>
          </div>
          <div>
            <b-form-group label="Radio Button Test">
              <b-form-radio-group
                id="btn-radios-2"
                v-model="selected"
                :options="options"
                buttons
                button-variant="outline-primary"
                size="sm"
                name="radio-btn-outline"
              ></b-form-radio-group>
            </b-form-group>
          </div>
          <div>
            <b-form-radio-group v-model="value3" :options="options2" :state="state" name="radio-validation">
              <b-form-invalid-feedback :state="state">반드시 한가지를 선택해주세요</b-form-invalid-feedback>
              <b-form-valid-feedback :state="state">확인하였습니다</b-form-valid-feedback>
            </b-form-radio-group>
          </div>
        </fieldset>
        
      </div>
      <!-- 조회조건 끝-->

      <!-- 컨텐츠 시작 -->
      <div style="margin-top:20px;">
        <!-- 코드리스트 영역 시작 -->
        <div class="code_list col-md-3 col-sm-3 col-xs-3">
          <label style="float:left;">코드리스트</label>
          <div class="common-btnwrap">
            <b-button size="sm" variant="primary" @click="btn_MainAdd" style="margin-right:5px;">추가</b-button>
            <b-button size="sm" variant="primary" @click="btn_MainSave" style="margin-right:5px;">저장</b-button>
            <b-button size="sm" variant="primary" style="margin: 0px;" @click="btn_MainDelete">삭제</b-button>  
          </div>
          <!-- 메인 그리드 시작 -->
          <grid
            id="grdMain"
            ref="MainGrid"
            :data="this.Maingrd_Data"
            :columns="Maingrid_Props.columns"
            :header="Maingrid_Props.header"
			:scrollY="Maingrid_Props.scrollY"
            :scrollX="Maingrid_Props.scrollX"
            :rowHeaders="Maingrid_Props.rowHeaders"
            :width="Maingrid_Props.width"
            :theme="Maingrid_Props.myTheme"
            :pageOptions="Maingrid_Props.pageOptions"
            @click="grid_Click"
          ></grid>
          <!-- 메인 그리드 끝 -->
        </div>
        <!-- 코드리스트 영역 끝 -->

        <!-- 코드세부정보 영역 시작 -->
        <div class="code_list_item col-md-9 col-sm-9 col-xs-9">      
          <label style="float:left;">코드세부정보</label>
          <div class="common-btnwrap">
            <b-button size="sm" variant="primary" @click="btn_SubAdd" style="margin-right:5px;">추가</b-button>
            <b-button size="sm" variant="primary" @click="btn_SubSave" style="margin-right:5px;">저장</b-button>
            <b-button size="sm" variant="primary" style="margin: 0px;" @click="btn_SubDelete">삭제</b-button>
          </div>
          <!-- 서브 그리드 시작 -->
          <grid
            id="grdSub"
            ref="SubGrid"
            :data="this.Subgrd_Data"
            :columns="Subgrid_Props.columns"
            :header="Subgrid_Props.header"
            :rowHeaders="Subgrid_Props.rowHeaders"
            :width="Subgrid_Props.width"
            :scrollY="Subgrid_Props.scrollY"
            :scrollX="Subgrid_Props.scrollX"
            :theme="Subgrid_Props.myTheme"
            :pageOptions="Subgrid_Props.pageOptions"
            @editingFinish="Subgrid_EditFinish"
            @editingStart="Subgrid_editingStart"
            @click="grid_Click"
          ></grid>
          <!-- 서브 그리드 끝 -->
        </div>
        <!-- 코드세부정보 영역 끝 -->
      </div> 
    </div>
	</div>
</template>
<script>
import "tui-pagination/dist/tui-pagination.css"; // tui-Grid Pagination Css
import "tui-grid/dist/tui-grid.css"; // tui-Grid Module Css
import { GridDefault, TextBoxEditor, NumberTextEditor } from "@/assets/js/GridDefault.js"; // 그리드 기본값 세팅, 그리드 EditOptions
import { Grid } from "@toast-ui/vue-grid"; // tui-Grid Module

export default {
	components: {
		Grid
	},
	data() {
		return {
			Search_CodeName: '',
			Maingrd_Data: [],
			Maingrid_Props: [],
			Subgrid_Props: [],
			Subgrd_Data: [],
			Sub_Code_Dvn: '',
			Sub_Code_No: '',
			Sub_Code_Name: '',
			Sub_Sort_Num: '',
			Sub_Use_Yn: '',
			Sub_TEMP1: '',
			Sub_TEMP2: '',
			Sub_TEMP3: '',
			Sub_TEMP4: '',
			Sub_TEMP5: '',
			MainGridPage: '',
			SubGridPage: '',

			MainFocusedRow : '',

			Current_Rowkey: '9999',

      value: '0',
      value2: '0',
      value3: null,

      selected: 'radio1',
      options: [
        { text: 'Radio 1', value: 'radio1' },
        { text: 'Radio 3', value: 'radio2' },
        { text: 'Radio 3 (disabled)', value: 'radio3', disabled: true },
        { text: 'Radio 4', value: 'radio4' }
      ],
      options2: [
          { text: 'First radio', value: 'first' },
          { text: 'Second radio', value: 'second' },
          { text: 'Third radio', value: 'third' }
        ]
		}
  },
  computed: {
      state() {
        return Boolean(this.value3)
      }
  },
	created() {
		// 메인 그리드
		this.Maingrid_Props = {
      data: this.Maingrd_Data,
      rowHeaders: ['checkbox'],
			scrollY: false,
			scrollX: false,
			columns: [
				{ header: "코드분류",    name: "CODE_DVN",  align: "center", width: 120, validation:{required:true}, ellipsis: true, editor:{ type:TextBoxEditor, options:{ maxLength:10, upper:true }}},
				{ header: "코드분류 명", name: "CODE_DVN_NAME", align: "left",  width: 350, validation:{required:true}, ellipsis: true, editor:{ type:TextBoxEditor, options:{ maxLength:30 }}},
				{ header: "저장 구분",   name: "CODE_DVN_KEY", hidden: true },
			],
			myTheme: {
				name: "mygrid",
				value: GridDefault.GridValue()
			},
			pageOptions: GridDefault.pageOptions // 사용자 pageOptions 설정 사용 여부 (useClient: true, perPage: 10)
		},
		
		// 서브 그리드
		this.Subgrid_Props = {

			data: this.Subgrd_Data,
			rowHeaders: ['checkbox'],
			scrollY: false,
			scrollX: false,
			columns: [
				{ header: "공통코드", name: "CODE_DVN",     align: "center", hidden: true},
				{ header: "코드",     name: "CODE_NO",      align: "center", validation:{required:true}, ellipsis: true, editor:{ type:TextBoxEditor, options:{ maxLength:10, upper:true }}},
				{ header: "코드명",   name: "CODE_NAME",    align: "center", validation:{required:true}, ellipsis: true, editor:{ type:TextBoxEditor, options:{ maxLength:30 }}},
				{ header: "정렬",     name: "SORT_NUM",     align: "center", editor:{ type:NumberTextEditor, options:{ maxLength:3 }} },
				{ header: "사용유무",  name: "USE_YN",       align: "center", editor:{ type:'select', options:{listItems:[{text:'Y', value:'Y'}, {text:'N', value:'N'}]}} },
				{ header: "구분1",    name: "TEMP1",        align: "center", ellipsis: true, editor:{ type:TextBoxEditor, options:{ maxLength:30}} },
				{ header: "구분2",    name: "TEMP2",        align: "center", ellipsis: true, editor:{ type:TextBoxEditor, options:{ maxLength:30 }} },
				{ header: "구분3",    name: "TEMP3",        align: "center", ellipsis: true, editor:{ type:TextBoxEditor, options:{ maxLength:30 }} },
				{ header: "구분4",    name: "TEMP4",        align: "center", ellipsis: true, editor:{ type:TextBoxEditor, options:{ maxLength:30 }} },
				{ header: "구분5",    name: "TEMP5",        align: "center", ellipsis: true, editor:{ type:TextBoxEditor, options:{ maxLength:30 }} },
				{ header: "저장구분", name: "INSERT_TYPE", align: "center", hidden: true},
				{ header: "코드키",   name: "CODE_NO_KEY", align: "center", hidden: true}
			],
			myTheme: {
				name: "mygrid",
				value: GridDefault.GridValue()
			},
			pageOptions: GridDefault.pageOptions // 사용자 pageOptions 설정 사용 여부 (useClient: true, perPage: 10)
    }
    
  },
  mounted() {
      
  },

  methods: {
    grid_Click(ev){
      console.log('test', ev);
    }
  },
}
</script>

<style scoped>

</style>