import request from '@/utils/request'



// 오늘의 메뉴 조회
export function SELECT_FOOD_TODAY(CODE_DVN) {
    return request({
        url: '/SELECT_FOOD_TODAY?data={CODE_DVN:"'+ CODE_DVN+'"}', 
        method: 'get'
    })
}

// 식사 메뉴 저장
export function FOOD_SAVE(data) {
    return request({
        url: '/FOOD_SAVE',
        data: data,
        method: 'POST'
    })
}

// 주문시작/마감 구분값 저장
export function ORDER_STATUS_SAVE(data) {
    debugger
    return request({
        url: '/ORDER_STATUS_SAVE',
        data: data,
        method: 'POST'
    })
}



