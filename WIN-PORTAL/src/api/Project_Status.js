import request from '@/utils/request'

// 간트 ROW 조회
export function GET_GANTT_ROW(PJT_CLIENT_HEAD,PJT_CLIENT_DETAIL,PJT_NAME, SDATE,EDATE,SEARCH_TYPE) {
    return request({
        url: '/GET_GANTT_ROW?data={PJT_CLIENT_HEAD:"' + PJT_CLIENT_HEAD  +'",PJT_CLIENT_DETAIL:"'+PJT_CLIENT_DETAIL +'",PJT_NAME:"'+PJT_NAME
                                    +'",SDATE:"'+SDATE+'",EDATE:"'+EDATE+'",SEARCH_TYPE:"'+SEARCH_TYPE+'"}',
        method: 'get'
    })
}

// 간트 ITEM 조회
export function GET_GANTT_ITEM(PJT_CLIENT_HEAD,PJT_CLIENT_DETAIL,PJT_NAME, SDATE,EDATE,SEARCH_TYPE) {
    return request({
        url: '/GET_GANTT_ITEM?data={PJT_CLIENT_HEAD:"' + PJT_CLIENT_HEAD  +'",PJT_CLIENT_DETAIL:"'+PJT_CLIENT_DETAIL +'",PJT_NAME:"'+PJT_NAME
                                    +'",SDATE:"'+SDATE+'",EDATE:"'+EDATE+'",SEARCH_TYPE:"'+SEARCH_TYPE+'"}',
        method: 'get'
    })
}

// 고객사 세부 조직 조회
export function GET_CLIENT_DETAIL(PJT_CLIENT_HEAD) {
    return request({
        url: '/GET_CLIENT_DETAIL?data={PJT_CLIENT_HEAD:"' + PJT_CLIENT_HEAD +'"}',
        method: 'get'
    })
}
