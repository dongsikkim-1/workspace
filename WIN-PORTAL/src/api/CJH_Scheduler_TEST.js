import request from '@/utils/request'


// 도서 분류 콤보 조회
export function SELECT_ROWS() {
    return request({
        url: '/SELECT_ROWS',
        method: 'get'
    })
}

// 도서 분류 콤보 조회
export function SELECT_ITEMS(ACT_FROM,ACT_TO) {
    return request({
        url: '/SELECT_ITEMS?data={ACT_FROM :"' + ACT_FROM + '", ACT_TO :"'+ ACT_TO +'"}',
        method: 'get'
    })
}
