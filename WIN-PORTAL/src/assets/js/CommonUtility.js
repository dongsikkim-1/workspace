/*eslint-disable no-unused-vars, no-empty*/
import PushJS from "@/utils/Notification.js"; // 푸쉬 알람을 위한 참조

export default {

    // 널체크
    fn_IsNull(obj)
    {
        debugger
        if(obj == null || obj == 'null' || obj == undefined || obj == 'undefined' || obj == "" || obj == ''||obj.toString().trim() == "" || obj.toString().trim() == '' )
            return true;
        else 
            return false;
    },

    // 널체크 후 널이면 빈값반환
    fn_ObjToStr(obj)
    {
        if(this.fn_IsNull(obj))
            return "";
        else 
            return obj;
    },

    // 컨트롤의 필수입력 벨리데이션을 체크한다.
    fn_Check_EmptyValidation(obj){

        if(this.fn_IsNull(obj))
        {
           return false;
        }
        else
        {
          return true;
        }
    },

    // 컨트롤의 숫자 벨리데이션을 체크한다. (0보다 크고 소수점 없음)
    fn_Check_NumberValidation(obj){
        var reg = /^(\s|\d)+$/;

        if(reg.test(obj))
        {
          return true;
        }
        else
        {
          return false;
        }
    },

    // 디바이스 사이즈 변경시 실행되어야 하는 이벤트 
    fn_SizeChanged_Exec(window, func)
    {
        if(this.fn_IsNull(window) || this.fn_IsNull(func))
            return;
        
        window.addEventListener('load',  func, false); // 초기 화면 Screen 설정 이벤트
        window.addEventListener('resize',  func, false); // 초기 화면 Screen 설정 이벤트
        
    },

    // 디바이스의 사이즈를 가져온다. [Mobile_V, Mobile_H, Tablet, Desktop, Desktop_L]
    fn_ScreenSize()
    {
        return window.getComputedStyle(document.querySelector(".Screen_size"), ":before").getPropertyValue("content")
    },

    // 현재 화면의 메뉴명을 경로 공간에 입력한다.
    fn_SetMenuPath(screen)
    {
        var found = screen.$router.options.routes.find(element => element.path == screen.$route.path);
        document.getElementById("path_div").innerText = found.name;
    },

    // 메뉴공간 또는 경로공간의 숨김여부
    fn_SetUserInfo(thisview, Token) {
      thisview.$store.commit('Common/Set_MenuVisible', Token);
    },

    // 그리드의 현재 포커스된 Row를 반환한다.
    fn_Grid_Focus_Row(grid){
        if(this.fn_IsNull(grid))
            return "";
        else{
            const rowkey = this.fn_Grid_Focus_Rowkey(grid);
            return grid.invoke("getRow", rowkey);
        }
    },
    
    // 그리드의 현재 포커스된 Row의 Rowkey를 반환한다.
    fn_Grid_Focus_Rowkey(grid){
        if(this.fn_IsNull(grid))
            return "";
        else
            return grid.invoke("getFocusedCell").rowKey;
    }, 
    
    // 그리드의 컬럼을 보여준다.
    fn_Grid_ShowColumn(grid, Columns)
    {
        if(this.fn_IsNull(grid) || this.fn_IsNull(Columns))
            return;

        if(Columns.length <= 0)
            return;

        Columns.forEach(element => {
            grid.invoke("showColumn", element);    
        });
    },

    // 그리드의 컬럼을 숨긴다.
    fn_Grid_HideColumn(grid, Columns)
    {
        if(this.fn_IsNull(grid) || this.fn_IsNull(Columns))
            return;

        if(Columns.length <= 0)
            return;

        Columns.forEach(element => {
            grid.invoke("hideColumn", element);    
        });
    },

    // 머지해야할 데이터 가공
    fn_Data_Merge(data, Columns)
    {
        // 컬럼만큼 Loop시작
        Columns.forEach(col => {

            // 컬럼의 중복 제거된 Array를 구한다.
            let unique_value = this.fn_Unique_data(data, col);

            // 중복 제거된 값으로 Loop
            unique_value.forEach(uk_value => {

                // 중복 제거된 값으로 필터링 된 Array를 구한다.
                let Merge_rows = data.filter(x=>x[col.toString()] == uk_value);

                // Merge 속성은 Merge 시작 행에만 속성을 부여하기 때문에 0번째를 사용한다.
                let Merge_first_row = Merge_rows[0];
                
                // 속성이 없을 경우 추가
                if(Merge_first_row._attributes == undefined)
                {
                    Merge_first_row["_attributes"] = {};

                    // 속성이 없을 경우 추가
                    if(Merge_first_row._attributes.rowSpan == undefined)
                        Merge_first_row._attributes["rowSpan"] = {};
                }

                // Merge 시작행에 Merge 속성을 부여한다.
                Merge_first_row._attributes.rowSpan[col.toString()] = Merge_rows.length;
            });
        });
    },

    // 배열의 Unique값을 Array로 반환한다.
    fn_Unique_data(data, col_name)
    {
        // 반환할 배열
        var return_array = [];

        // 데이터 만큼 Loop시작
        data.filter(function (data_row) {

            // 반환할 배열에 값이 없을 경우에만 Push
            if (return_array.indexOf(data_row[col_name]) < 0) {

                if(data_row[col_name] != undefined)
                    return_array.push(data_row[col_name]);
            }
        });

        return return_array;
    },

    // 포커스된 행의 정보와 세부정보를 비교하여 값이 바뀐항목이 있는지 체크한다. 값이 바뀌었으면 True 그대로면 False
    fn_IsRowItemChange(grid, compare){
        let IsChange = false;
        let Focus_Data_Index = grid.invoke("getFocusedCell").rowKey;        // 포커스된 노드 Index
        const gridPagination = grid.invoke("getPagination"); // 그리드의 페이지네이션
         if(this.fn_IsNull(Focus_Data_Index)) {
            Focus_Data_Index = 0;
        }
         if(!this.fn_IsNull(gridPagination)) {
        
            // SIOS의 페이지당 기본 데이터 갯수는 10개임
            // 10개 이상일 경우는 페이지를 계산해서 Rowkey를 구함
            const PerPage = grid.$attrs.pageOptions.perPage;
             if(Focus_Data_Index < PerPage) {
                // 포커스된 Row의 RowKey
                Focus_Data_Index = (gridPagination._currentPage - 1) * PerPage + Focus_Data_Index;
            }
        }
         var keys = Object.keys(compare);
        for(var i=0; i<keys.length; i++){
            var key = keys[i];
            
            let GridValue = this.fn_ObjToStr(grid.invoke("getValue",Focus_Data_Index, key));
            let ItemValue = this.fn_ObjToStr(compare[key]);
             if(GridValue != ItemValue)
            {
              IsChange = true;
              break;
            }
        }
        return IsChange;
    },

    // 알람 Token을 가져온다.
    async fn_GetNoti_Token() {
      const token = await PushJS.getToken();
      return token;
    }

}

