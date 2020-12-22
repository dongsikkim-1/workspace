<template style="overflow:auto">
  <div>
    <!-- 모달 설정  -->
    <modals-container />
    <!-- 화면 Contents 영역 -->
    <div class="contents">
      <!-- 공통 버튼 영역 -->
      <div class="common-btnwrap">
        <b-button size="sm" variant="primary" @click="search">조회</b-button>
        <b-button size="sm" variant="primary" @click="scan">Scan</b-button>
      </div>
      <!-- 공통 검색 영역 -->
      <div class="common-schwrap">
        <fieldset>
          <div class="row">
            <div class="col-md-2 col-sm-6">
              <label class="col-md-5 col-sm-6 col-xs-4 control-label" v-text="this.cboTASK_SEQ"></label>
                <div class="col-md-7 col-sm-6 col-xs-8">
                  <b-form-select v-model="selected1" :options="cboTASK_SEQ_LIST" class="form-control"></b-form-select>
                </div>
            </div>
            <div class="col-md-2 col-sm-6">
              <label class="col-md-5 col-sm-6 col-xs-4 control-label" v-text="this.cboDATE_YEAR"></label>
                <div class="col-md-7 col-sm-6 col-xs-8">
                  <b-form-select v-model="selected2" class="form-control">
                    <option v-for="(year, i) in getYears" :key="i" :value="year">{{ year }}</option>
                    </b-form-select>
                </div>
            </div>
            <div class="col-md-2 col-sm-6">
              <label class="col-md-5 col-sm-6 col-xs-4 control-label" v-text="this.cboDATE_MONTH"></label>
                <div class="col-md-7 col-sm-6 col-xs-8">
                  <b-form-select v-model="selected3" class="form-control">
                    <option value="">전체</option>
                    <option v-for="(month, i) in getMonths" :key="i" :value="month">{{ month }}</option>
                  </b-form-select>
                </div>
            </div>
            <div class="col-md-2 col-sm-6">
              <label class="col-md-5 col-sm-6 col-xs-4 control-label" v-text="this.txtUSER"></label>
                <div class="col-md-7 col-sm-6 col-xs-8">
                  <b-form-input v-model="selected4"></b-form-input>
                </div>
            </div>
          </div>
        </fieldset>
      </div>     

      <!-- Android - Test div -->
      <hr/> 
      <p id="textMessageFromApp" style="height:100px; overflow-y:auto;"></p>
      <hr/>
    
      <div id="myMap" style="width:100%; height:100%; floay:left; position:fixed;">
      </div>

      <div id="calledpopup" class="my-ol-popup" style="display:none;">  
      </div>

    </div>
  </div>
</template>

<script>
// import 영역
/*eslint-disable no-unused-vars, no-empty*/ // 변수 선언 후 사용하지 않거나, 무의미한 띄어쓰기가 코드에 들어간 경우 에러를 내뱉는 경우를 방지
import { TASK_SEQ_COMBO, SEARCH_BUSINESS } from "@/api/Status_Business.js"; // 콤보, 조회
import Utility from "../../assets/js/CommonUtility.js";     // 전 화면 공통으로 사용하는 함수
import GlobalValue from "../../assets/js/GlobalValue.js";   // 전 화면 공통으로 사용하는 변수

// Openlayers
import "ol/ol.css";
import Overlay from "ol/Overlay";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM"

// Vector Layer
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";

// transform
import { transform } from "ol/proj.js";

// Point
import { Point, MultiPoint, LineString, Polygon } from "ol/geom.js";

// Feature
import Feature from "ol/Feature";

// Style
import { Style, Fill, Stroke, Circle, Text, Icon } from "ol/style";

import proj4 from "proj4";
import { register } from "ol/proj/proj4.js";

import XYZ from "ol/source/XYZ";

// 맵 회전 불가
import { defaults as defaultInteractions, DragRotateAndZoom } from "ol/interaction";

// Vue 핸들링 영역
export default { 

// 초기 데이터 변수 선언부
  data() {
    return {
      cboTASK_SEQ: "과제: ",            // 조회조건 과제 Label
      cboDATE_YEAR: "년도:",             // 조회조건 년도 Label
      cboDATE_MONTH: "월:",              // 조회조건 월 Label
      txtUSER: "사용자:",                // 조회조건 사용자 Label

      cboTASK_SEQ_LIST: [{}],           // 과제 콤보 바인딩 배열 변수

      selected1: "",                    // 과제 콤보 초기값
      selected2: "",                    // 기간 콤보 초기값
      selected3: "",                    // 기간 콤보 초기값
      selected4: "",                    // 사용자 콤보 초기값  
    };
  },

  // 화면이 로드될 때 실행되는 이벤트
  created() {

  },

  // 화면이 로드될 때 DOM 생성이 완료된 후 실행되는 이벤트 선언부
  mounted() {
    window.setMessage = this.setMessage // Android - 

    this.selected2 = new Date().getFullYear().toString();         // 현재 날짜의 년도
    this.selected3 = (new Date().getMonth()+1).toString();        // 현재 날짜의 월(월은 0부터 시작해서 +1)
    window.addEventListener('load',  this.ScreenOnload(), false); // 초기 화면 Screen 설정 이벤트

    this.resize();   // 화면 사이즈 변경시 발생되는 이벤트
    this.setcombo(); // 조회조건 콤보 바인딩 이벤트

    this.projDefs(); // 정반을 그릴때 1M 단위로 수월하게 선을 그리기 위한 메서드

    this.getPin();
    // 지도 생성.
    this.map = new Map({
      // 맵 회전 불가
      interactions: defaultInteractions({altShiftDragRotate: true, pinchRotate: false}).extend([new DragRotateAndZoom()]),

      // 지도의 표시 또는 동작에 영향
      controls: [],

      // 레이어 요소로 설정할 CSS 클래스 이름
      layers: totLayers,

      target: "myMap", // div id와 일치해야한다.

      // 해상도 제약 조건 , 회전 제약 조건 및 중심 제약 조건 생성
      view: new View({
        projection: "EPSG:3857", // 위/경도 지리 좌표계
        // center: [14327870, 4147381], // 지도 가운데 좌표 설정
        // center: [14365932.716394072, 4177256.041887956],
        center: [14236017.382844053, 4213696.726687736],
        constrainOnlyCenter: true,
        // rotation: 0.355,
        // minZoom: 14, 
        // maxZoom: 22,
        zoom: 8.5
        // rotation: this.dangle,
        // minZoom: 14, 
        // maxZoom: 22,
        // zoom: 14.5
      })
      , overlays: [overlay, overlay_R]       // 사용되는 tooltip 
    });

    // 마우스 클릭시 차량 tooltip을 open / close 하기 위한 featureClick
    this.map.on("click", evt => {
      this.featureClick(evt);
    });
    
    // 지도의 zoom level 변화에 따른 text 및 icon등의 변화
    this.map.getView().on("change:resolution", evt => {
      this.checkZoom(evt);
    });
  },

  // 이벤트 선언부
  methods: {  
    projDefs() {
      var projCode = {
        "EPSG:5176": "+proj=tmerc +lat_0=38 +lon_0=129.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43"
      };

      Object.keys(projCode).forEach(function(key) {
        // 브라우저 호환성 - ie9~, chrome
        proj4.defs(key, projCode[key]);
        register(proj4);
      });
    },

    // 초기 시용자 Screen 설정 이벤트
    ScreenOnload(){
      Utility.fn_SetMenuPath(this); // 메뉴 Path 표시
    },

    // Screen 사이즈 변경시 발생되는 이벤트
    resize() {
      
    },  

    // 조회조건 콤보 바인딩 이벤트
    async setcombo() {
      try
      {        
        // 과제 콤보
        let task_seq_combo = await TASK_SEQ_COMBO();
        if(task_seq_combo.length != 0)
        {
          // 첫번째 콤보에 전체를 추가한다.
          var arr = [{ text: "전체", value: "%" }];
          for(var i = 1; i < task_seq_combo.length + 1; i++)
          {
            arr[i] = {
              text: task_seq_combo[i - 1]["TEXT"],
              value: task_seq_combo[i - 1]["VALUE"]
            };
          }
          this.cboTASK_SEQ_LIST = arr;                              
          this.selected1 = "%";         // 조회조건 도서분류 초기값 '전체' 설정
        }               
      }
      catch(err)
      {
          this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    // 그리드 조회
    async search() {
      try
      {
        overlay.setPosition(undefined);
        overlay_R.setPosition(undefined);

        let Status_Busi = await SEARCH_BUSINESS(this.selected1.toString(), this.selected2.toString(), this.selected3.toString(), this.selected4.toString())

        // 조회된 데이터가 null이거나 undefined 인 경우
        if(Status_Busi[0]["TASK_SEQ"] == null){
          // "결과가 없습니다."
        }
        // 조회된 데이터가 있는 경우
        else
        {
            pinVectorSource.clear();
            var HSEfeatures = pinLayers.getSource().getFeatures();

            var default_cnt = 0;
            var dsme_cnt = 0;
            var hanjin_cnt = 0;
            var stx_cnt = 0;
            var cn_uni_cnt = 0;
            var m_hd_cnt = 0;

            var default_arr = [];
            var dsme_arr = [];
            var hanjin_arr = [];
            var stx_arr = [];
            var cn_uni_arr = [];
            var m_hd_arr = [];

            for (var i = 0; i < Status_Busi.length; i++)
            {
              console.log(Status_Busi[i]);
              var place = Status_Busi[i]["PLACE"];
              var overlap_cnt = 0;
              var overlap_arr = [];
              
              var lonlat;
              // 

              if (place.includes("한진"))
              {
                lonlat = [129.049813, 35.096267];   // 한진
                hanjin_cnt++;
                hanjin_arr.push(i);

                overlap_cnt = hanjin_cnt;
                overlap_arr = hanjin_arr;
              }
              else if (place.includes("STX"))
              {
                lonlat = [128.598541, 35.207192];   // STX
                stx_cnt++;
                stx_arr.push(i);

                overlap_cnt = stx_cnt;
                overlap_arr = stx_arr;
              }
              else if (place.includes("충남대"))
              {
                lonlat = [127.345663, 36.369252];   // 충남대
                cn_uni_cnt++;
                cn_uni_arr.push(i);

                overlap_cnt = cn_uni_cnt;
                overlap_arr = cn_uni_arr;
              }
              else if (place.includes("현대삼호중공업"))
              {
                lonlat = [126.3811701, 34.7416873];   // 목포 현대삼호중공업
                m_hd_cnt++;
                m_hd_arr.push(i);

                overlap_cnt = m_hd_cnt;
                overlap_arr = m_hd_arr;
              }
              else if (place.includes("대우조선"))
              {
                lonlat = [128.702002, 34.873352];   // 대우조선
                dsme_cnt++;
                dsme_arr.push(i);

                overlap_cnt = dsme_cnt;
                overlap_arr = dsme_arr;
              }
              else 
              {
                lonlat = [129.345621, 35.535861];   // default
                default_cnt++;
                default_arr.push(i);

                overlap_cnt = default_cnt;
                overlap_arr = default_arr;
              }

              lonlat = transform(lonlat, "EPSG:4326", "EPSG:3857");

              var hsePIN = getPointFromCoord("Point", lonlat);

              hsePIN.num = overlap_cnt;
              hsePIN.task_seq = Status_Busi[i]["TASK_SEQ"];
              hsePIN.place = place;
              hsePIN.user = Status_Busi[i]["USER_ID"];
              hsePIN.datefrom = Status_Busi[i]["DATE_FROM"];
              hsePIN.dateto = Status_Busi[i]["DATE_TO"];
              hsePIN.text = "";

              if (overlap_cnt > 1)
              {
                for (var n = 0; n < overlap_cnt; n++)
                {
                  var num = overlap_arr[n];
                  hsePIN.text = hsePIN.text 
                    + (n + 1) + '. [' 
                    + Status_Busi[num]["TASK_SEQ"] + ' - '
                    + Status_Busi[num]["PLACE"] + ']<br>' 
                    + Status_Busi[num]["USER_ID"] + '<br>' 
                    + Status_Busi[num]["DATE_FROM"] + ' ~ ' 
                    + Status_Busi[num]["DATE_TO"] + '<br>';
                }
              }
              else
              {
                hsePIN.text = hsePIN.text + overlap_cnt + '. [' + hsePIN.task_seq + ' - '+ hsePIN.place + ']' + '<br>' + hsePIN.user + '<br>' + hsePIN.datefrom + ' ~ ' + hsePIN.dateto;
              }

              hsePIN.clickYN = 'Y';

              // 핀 스타일 설정
              var src = "../win-logo.png"; // icon 이미지
              
              var style = new Style({
                image: new Icon({
                  anchorXUnits: "fraction",
                  anchorYUnits: "fraction",
                  src: src,     // icon 이미지
                  scale: 0.35,  // icon 사이즈
                  opacity: 1    // icon 투명도
                })
              });

              // HSE 핀 스타일 적용
              hsePIN.setStyle(style);

              // HSEfeatures에 HSE 핀 적용 
              HSEfeatures.push(hsePIN);
            }

            // HSELayers에 HSE 핀 적용 
            pinLayers.getSource().addFeatures(HSEfeatures);
        }            
      }
      catch(err)
      {
        this.$bvModal.msgBoxOk(err, GlobalValue.Err_option);
      }
    },

    // 지도 줌 In 이벤트
    zoomIn() {
      this.map.getView().setZoom(this.map.getView().getZoom() + 0.5);
    },

    // 지도 줌 Out 이벤트
    zoomOut() {
      this.map.getView().setZoom(this.map.getView().getZoom() - 0.5);
    },

    // 지도 상하좌우 이벤트
    goTo(Lpixel, Vpixel) {
      var view = this.map.getView();
      var center = view.getCenter();
      var centerInPx = this.map.getPixelFromCoordinate(center);
      var newCenterInPx = [centerInPx[0] + Lpixel, centerInPx[1] + Vpixel];
      var newCenter = this.map.getCoordinateFromPixel(newCenterInPx);
      view.setCenter(newCenter);
    },

    getPin() {
      this.search();
    },

    // 차량 Pin 클릭 시 툴팁 상태 변경
    featureClick(evt) {
      overlay.setPosition(undefined);
      overlay_R.setPosition(undefined);

      var feature = this.map.forEachFeatureAtPixel(evt.pixel, function(feature) 
      {
        return feature;
      });

      // Feature(차량 툴팁 정보)가 없는 경우
      if (feature === undefined || feature === null) 
      {
        return;
      }

      if (feature.clickYN === undefined || feature.clickYN === null) 
      {
        return;
      } 
      else if (feature.clickYN === 'Y') {
        // 관리자가 아닐경우 권한이 없습니다 . tooltip 표시
        var coordinate = evt.coordinate;  
        container = document.getElementById('calledpopup');
        container.style.display = "none";
        
        if (container === undefined || container === null) {
          return;
        }

        var pop_text = "";

        pop_text = feature.text;

        container.style.display = "block";
        container.innerHTML = pop_text
        overlay = new Overlay(({ element: container }));
        this.map.addOverlay(overlay);
        overlay.setPosition(coordinate);
      }
    },

    // 지도의 zoom level 변화 이벤트
    checkZoom(evt) {
      var newZoomLevel = this.map.getView().getZoom();
      var Features = pinLayers.getSource().getFeatures();
      var Iconscale = "";
      
      // zoom 배율에 따른 글자 font size 변경
      if (newZoomLevel > 17) 
      {
        Iconscale = 1.3;
      }
      else if (newZoomLevel > 16) 
      {
        Iconscale = 0.9;
      } 
      else if (newZoomLevel > 15) 
      {
        Iconscale = 0.7;
      } 
      else if (newZoomLevel > 13) 
      {
        Iconscale = 0.5;
      } 
      else 
      {
        Iconscale = 0.0;
      }
      
      // console.log(newZoomLevel, Iconscale)

      // zoom 배율에 따른 차량 Pin 사이즈 변경
      // for (var i in Features) 
      // {
      //   Features[i].getStyle().image_.setScale(Iconscale);
      // }
    },
    
    // Android - Scan
    async scan() {
      callAndroid();
    },


    // Android - WebView : QR Code Test
    setMessage(arg){
      var mainFrame = document.getElementById('textMessageFromApp');
      var createFrame = document.createElement("div");
      createFrame.innerHTML = arg;
      mainFrame.appendChild(createFrame);
    }
  },

  // computed: 계산된 값을 캐시에 저장 후 사용
  computed: {
    getYears () {
      const year = new Date().getFullYear()                                 // 현재 날짜의 년도
      return Array.from({length: 6}, (value, index) => (year-5) + index)    // 배열의 길이 : 6, v-for (year, i) 바인딩 (value, index), value = (year-5) + index, value = 현재 년도 - 5년부터 현재 년도까지, index = 0~5
    },

    getMonths () {
      return Array.from({length: 12}, (value, index) => 1 + index)    // 배열의 길이 : 12, v-for (month, i) 바인딩 (value, index), value = (year-) + index, value = 1~12월, index = 0~11
    },
  }
};

var container = document.getElementById('calledpopup');
var content = document.getElementById('popup-content');

var overlay = new Overlay(({ 
  element: container }));
// context box overlay
var overlay_R = new Overlay(({ 
  element: container }));

var mapTypeUrl = "http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}";

// googleLayers
var googleLayers = new TileLayer({
  source: new XYZ({
    url : mapTypeUrl
  })
});

// pinLayers / VectorLayer
var pinVectorSource = new VectorSource({});

var pinLayers = new VectorLayer({
  id: "pin_layer",
  visible: true,
  source: pinVectorSource, // Feature들의 집합
  clickout: false,
  renderIntent: "select"
});

// Layer 올라오는 순서대로 배열을 만들어야함.
var totLayers = [googleLayers, pinLayers];

// coordinate 좌표로 feature point 생성
function getPointFromCoord(geomType, coord) {
  var shape = {
    Point: new Point(coord),
    Polygon: new Polygon([coord]) // MultiPoint
  };
  var feature = new Feature({
    geometry: shape[geomType]
  });
  return feature;
}


// Android WebView : QR Code Test
// function setMessage(arg){
//   var mainFrame = document.getElementById('textMessageFromApp');
//   var createFrame = document.createElement("div");
//   createFrame.innerHTML = arg;
//   mainFrame.appendChild(createFrame);
// }

// Android - callAndroid()
function callAndroid(){
  var str = 'test';
  window.myJs.callAndroid(str);
  return false;
}

</script>

<style lang="less" scoped>


.my-ol-popup {
  /* //display:inline-block; */
  position: absolute;
  background-color: rgb(54, 54, 54);
  padding: 5px;
  border-radius: 10px;
  border: 3px solid rgb(220, 220, 220);
  bottom: 15px;
  /* //left: -50px; */
  // left: -35px;
  width: 350px;
  min-width: 145px;
  max-width: 500px;
  color: rgb(219, 219, 219);
  text-align: center;
  /* // z-index:9999  */
  font-size: 1em;
}

.my-ol-popup:after,
.my-ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.my-ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.my-ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.my-ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.my-ol-popup-closer:after {
  content: "✖";
}

</style>>

