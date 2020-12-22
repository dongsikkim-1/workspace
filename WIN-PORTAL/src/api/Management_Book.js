import request from '@/utils/request'

// 도서 관리 도서 목록 조회
export function Book_Management(BOOK_KIND, BOOK_NM) {
    return request({
        url: '/Book_Management?data={BOOK_KIND:"' + BOOK_KIND +'",BOOK_NM:"'+BOOK_NM+'"}',
        method: 'get'
    })
}

// 신규 도서 저장
export function Book_SAVE(data) {
    return request({
        url: '/Book_SAVE',
        data: data,
        method: 'POST'
    })
}

// 도서 삭제
export function Book_DELETE(data) {
    return request({
        url: '/Book_DELETE',
        data: data,
        method: 'POST'
    })
}
