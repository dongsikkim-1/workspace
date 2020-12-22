import request from '@/utils/request'


// 출.퇴근 데이터 조회
export function SELECT_ATTENDANCE(USER_ID) {
    return request({
        url: '/SELECT_ATTENDANCE?data={USER_ID:"' + USER_ID + '"}',
        method: 'get'
    })
}

// 출.퇴근 저장
export function SAVE_ATTENDANCE(data) {
    return request({
        url: '/SAVE_ATTENDANCE',
        data: data,
        method: 'POST'
    })
}

