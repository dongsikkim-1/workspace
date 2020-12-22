<template>
  <div>
    <div class="modal-header">
      <h4 class="modal-title" id="myModalLabel">작업 상세</h4>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close" style="color:#fff; margin-top: 1px;">
        <span aria-hidden="true" style="margin-right: 20px;">&times;</span>
      </button>
    </div>
    <div class="modal-body"> 
      <!-- modal 컨텐츠 영역 -->
      <div class="contents">
        
      </div>
      <!--//modal 컨텐츠 영역 -->
    </div>
  </div>
</template>

<script>
/*eslint-disable no-unused-vars, no-empty*/ // 변수 선언 후 사용하지 않거나, 무의미한 띄어쓰기가 코드에 들어간 경우 에러를 내뱉는 경우를 방지
/*eslint-disable no-undef*/ // 변수 선언 후 사용하지 않거나, 무의미한 띄어쓰기가 코드에 들어간 경우 에러를 내뱉는 경우를 방지
// import 영역
// import GlobalValue from "../../assets/js/GlobalValue.js"; // 전 화면 공통으로 사용하는 변수
import Utility from "../../assets/js/CommonUtility.js";   // 전 화면 공통으로 사용하는 함수
import "tui-pagination/dist/tui-pagination.css"; // tui-Grid Pagination Css
import "tui-grid/dist/tui-grid.css"; // tui-Grid Module Css
import GlobalValue from "../../assets/js/GlobalValue.js"; // 전 화면 공통으로 사용하는 변수


// Vue 핸들링 영역
export default {
  
  // vue props 선언부
  props:["TARGET"],

    // Component 선언부
  components: {
  },

  // 초기 데이터 변수 선언부
  data(){
    return{
      USER_DATA : [{}],
      Grid_Data : [],
      FOOD_DATA : []
    }
  },
  created(){
    
  },

  // 화면이 로드될 때 DOM 생성이 완료된 후 실행되는 이벤트 선언부
  mounted(){ 
    
    
  },
  // 이벤트 선언부
  methods:{
    

    // 닫기 버튼 클릭 이벤트
    close(){
      this.$emit("close");
    }
  }
};

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
  height: 650px;
  }

}

/* // 데스크탑 보다 큰 */
@media all and (min-width:1200px){ 
 .modal-body > .contents {
  overflow-y: scroll;
  height: 650px;
  }
}



</style>