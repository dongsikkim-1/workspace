import request from '@/utils/request'

// 메뉴 조회
export function getMenu(MENU_AUTH) {
    return request({
        url: '/getMenu?data={MENU_AUTH:"'+ MENU_AUTH+'"}', 
        method: 'get'
    })
}

// 메뉴 조회
export function getCommonCode(CODE_DVN) {
    return request({
        url: '/Get_CommonCode?data={CODE_DVN:"'+ CODE_DVN+'"}', 
        method: 'get'
    })
}