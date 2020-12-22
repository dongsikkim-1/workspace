import request from '@/utils/request'

//코드분류 조회
export function SELECT_CODE_HEADER(CODE_NAME) {
  return request({
  url: '/SELECT_CODE_HEADER?data={CODE_NAME:"' + CODE_NAME + '"}',
  method: 'get'
  });
}

//코드 세부목록 조회
export function SELECT_CODE_DETAIL(CODE_DVN) {
  return request({
    url: '/SELECT_CODE_DETAIL?data={CODE_DVN:"' + CODE_DVN + '"}',
    method: 'get'
  });
}

//코드분류 저장
export function SAVE_CODE_HEADER(data) {
  return request ({
    url: '/SAVE_CODE_HEADER',
    data: data,
    method: 'POST'
  });
}

//코드 세부 목록 저장
export function SAVE_CODE_DEATIL(data) {
  return request ({
    url: '/SAVE_CODE_DEATIL',
    data: data,
    method: 'POST'
  });
}

//코드 분류 삭제
export function DELETE_CODE_HEADER(data) {
  return request({
    url: '/DELETE_CODE_HEADER',
    data: data,
    method: 'POST'
  });
}

//코드 세부 목록 삭제
export function DELETE_CODE_DETAIL(data) {
  return request({
    url: '/DELETE_CODE_DETAIL',
    data: data,
    method: "POST"
  });

}