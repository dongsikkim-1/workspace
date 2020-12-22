import request from '@/utils/request'

// 공지사항 세부내용 조회
export function SEARCH_COL_MONTH(start_dte, end_dte) {
    return request({
        url: '/SEARCH_COL_MONTH?data={START_DTE:"'+ start_dte +'",END_DTE:"' + end_dte + '"}',
        method: 'get'
    })
}

// 메뉴 콤보조회
export function SEARCH_MENU_FOOD() {
  return request({
      url: '/SEARCH_MENU_FOOD',
      method: 'get'
  })
}

// 주문시작/마감 상태값 조회
export function SEARCH_STATUS() {
  return request({
      url: '/SEARCH_STATUS',
      method: 'get'
  })
}


// 센서데이터 저장
export function save_col_data(data) {
    return request({
      url: '/SAVE_COL_MONTH',
      method: 'post',
      data: data
    });
  }