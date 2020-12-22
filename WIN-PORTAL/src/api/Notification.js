import request from '@/utils/request'

// 사용자의 토큰 저장
export function SetPushToken(data) {
    return request({
        url: '/SetToken',
        data: data,
        method: 'POST'
    })
}

