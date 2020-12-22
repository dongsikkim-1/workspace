import request from '@/utils/request'

// 장비(본체) 조회조건 위치 콤보 조회
export function Asset_Location_COMBO(CODE) {
    return request({
        url: '/Asset_Location_COMBO?data={CODE:"'+CODE+'"}',
        method: 'get'
    })
}

// 장비(본체) 현황 조회
export function Search_Equip(TYPE, LOC_NO, SPEC) {
    return request({
        url: '/Desktop_Status?data={TYPE:"'+TYPE+'", LOC_NO:"' + LOC_NO +'",SPEC:"'+SPEC+'"}',
        method: 'get'
    })
}

// // 도서 대여/반납
// export function Book_Rent(data) {
//     return request({
//         url: '/Book_Rent',
//         data: data,
//         method: 'POST'
//     })
// }

// 장비 삭제
export function Asset_Delete(data) {
    return request({
        url: '/Asset_Delete',
        data: data,
        method: 'POST'
    })
}

