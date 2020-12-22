import request from '@/utils/request'

// 콤보 조회
export function SEARCH_COMBO(CODE_DVN) {
    return request({
        url: '/SEARCH_COMBO?data={CODE_DVN:"' + CODE_DVN + '"}',        
        method: 'get'
    })
}

// PM 콤보 조회
export function SEARCH_PM() {
    return request({
        url: '/SEARCH_PM',
        method: 'get'
    })
}

// 고객사 detail 조회
export function SEARCH_CORP_ORG(CODE_NO) {
    return request({
        url: '/SEARCH_CORP_ORG?data={CODE_NO:"' + CODE_NO + '"}',
        method: 'get'
    })
}

// 팝업 조회
export function SEARCH_POP() {
    return request({
        url: '/SEARCH_POP',
        method: 'get'
    })
}

// 프로젝트 저장
export function SAVE_PROJECT(data) {
    return request({
        url: '/SAVE_PROJECT',
        data: data,
        method: 'POST'
    })
}

// 프로젝트 멤버 저장
export function SAVE_PROJECT_USER(data) {
    return request({
        url: '/SAVE_PROJECT_USER',
        data: data,
        method: 'POST'
    })
}

// 프로젝트 멤버 삭제
export function DEL_PROJECT_USER(data) {    
    return request({
        url: '/DEL_PROJECT_USER',
        data: data,
        method: 'POST'
    })
}

// 프로젝트 멤버 삭제
export function DEL_PROJECT(data) {
    console.log("data", data)
    return request({
        url: '/DEL_PROJECT',
        data: data,
        method: 'POST'
    })
}
