import request from '@/utils/request'

// 입출고 조회
export function SEARCH_EQUIP_MOVE(USER, REG_SDATE, REG_EDATE,GUBUN) {
    return request({
        url: '/SEARCH_EQUIP_MOVE?data={USER:"' + USER +'",REG_SDATE:"'+REG_SDATE+'",REG_EDATE:"'+REG_EDATE+'",GUBUN:"'+GUBUN+'"}',
        method: 'get'
    })
}

// 신규 출고 등록번호 생성
export function NEW_MOVE_NO() {
    return request({
        url: '/NEW_MOVE_NO', 
        method: 'get'
    })
}

// 장비 선택 화면 조회(컴퓨터)
export function ASSET_SELECT_DST_OUT(RNF_CD) {
    return request({
        url: '/ASSET_SELECT_DST_OUT?data={RNF_CD:"' + RNF_CD +'"}',
        method: 'get'
    })
}

// 장비 선택 화면 조회(모니터)
export function ASSET_SELECT_MNT_OUT(RNF_CD) {
    return request({
        url: '/ASSET_SELECT_MNT_OUT?data={RNF_CD:"' + RNF_CD +'"}',
        method: 'get'
    })
}

// 장비 이동 저장
export function SAVE_EQUIP_MOVE(data) {

    return request({
        url: '/SAVE_EQUIP_MOVE',
        data: data,
        method: 'POST'
    })
}