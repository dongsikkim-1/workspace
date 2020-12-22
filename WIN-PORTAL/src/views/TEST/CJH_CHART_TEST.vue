<template>
  <div>
    <div id="chart"></div>
  </div>
</template>
<script>
import tui from "tui-chart";
export default {
  // mounted 단계에서 만들것.  
  mounted() {
    var container = document.getElementById('chart');
    var data = {
        categories: ['최정해','권오윤','손홍락','신명진'],
        series: [
            {
                name: '건설',
                data: [[7.15, 7.18], [7.15, 7.19], [7.18, 7.20], [7.22,7.25]]
            },
            {
                name: '용접',
                data: [[7.18, 7.21], [7.18, 7.22], [7.20, 7.23], [7.25,7.28]]
            },
            {
                name: '휴식',
                data: [[7.21, 7.23], [7.22, 7.24], [7.23, 7.25], [7.28,7.31]]
            }
        ]
    };
    var options = {
       // width, height, title 옵션을 사용하여 차트의 너비 , 제목을 설정할 수 있습니다.
        // 차트 제목은 차트 상단에 배치됩니다.
        chart: {
            width: 1160,
            height: 650,
            title: '업무 일정 관리'
        },
        xAxis: {
            title: {
                text : '2020/07',  // X 축 제목을 설정할 수 있습니다.
                offsetX : 0,
                offsetY : 0
            },
            labelInterval: "auto",

        },
        yAxis: {
            title: {
                text : '이름',  // X 축 제목을 설정할 수 있습니다.
                offsetX : 0,
                offsetY : 0
            },
        },
        series: {
            showLabel: false,        // 시리즈 영역에 라벨을 표시 할 수 있습니다.
            barWidth: 25,           // 시리즈 막대의 너비를 조정할 수 있습니다.
        },
        
        legend : {
            align : 'top',          // 'top', 'bottom', 'left' ,'right' 로 범례 위치를 변경 할 수 있습니다.
            visible : true,         // 범례를 숨길 수 있습니다.
            showCheckbox : false,   // 범례의 체크박스를 숨길수 있습니다.
            // maxWidth : 1            // maxWidth옵션을 사용 하면 길이를 초과하는 범례 이름을 생략 할 수 있습니다.
        },
        plot : { 
            hideLine : false         // barchart인 경우 hideLine옵션을 사용하면 플롯 영역의 선을 숨길 수 있습니다.
        }, 
    };
    tui.barChart(container, data, options);
  },
};
</script>
<style scoped>
</style>