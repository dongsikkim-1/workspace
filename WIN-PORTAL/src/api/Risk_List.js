import request from '@/utils/request'

// 위험 관리 조회
export function Select_Risk(ENROLL_DATE_F, ENROLL_DATE_T, PJT_NAME, RISK_TYPE, RISK_CAUSE) {
    return request({
        url: '/Select_Risk?data={ENROLL_DATE_F:"' + ENROLL_DATE_F +'",ENROLL_DATE_T:"' + ENROLL_DATE_T +'",PJT_NAME:"'+PJT_NAME+'",RISK_TYPE:"'+RISK_TYPE+'",RISK_CAUSE:"'+RISK_CAUSE+'"}',
        method: 'get'
    })
}

// 위험 관리 조회
export function Select_Risk_No(RISK_NO) {
    return request({
        url: '/Select_Risk_No?data={RISK_NO:"' + RISK_NO + '"}',
        method: 'get'
    })
}

// 위험관리 상세 저장
export function Save_Risk(data) {
    return request({
        url: '/Save_Risk',
        data: data,
        method: 'POST'
    })
}

// 위험관리 상세 삭제
export function Delete_Risk(data) {
    return request({
        url: '/Delete_Risk',
        data: data,
        method: 'POST'
    })
}


