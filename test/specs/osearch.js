const test = require('tape')
const log = require('debug')('osearch:engine')
const osearch = require('../../index')()

/**
 * tìm kiếm xấp xỉ
 */
test('input pattern is approximately', function (t) {
    t.plan(3)

    let text = 'Cơ quan thu lệ phí cấp giấy phép quy hoạch có trách nhiệm đăng ký, kê khai nộp lệ phí vào ngân sách nhà nước theo quy định tại Thông tư số 63/2002/TT-BTC ngày 24/7/2002'
    let keyword = 'lê phí'

    let index = osearch.findIndex(text, keyword)
    t.equal(index, 12, 'find the first index of input pattern in text')

    let index2 = osearch.findIndex(text, keyword, osearch.next)
    t.equal(index2, 79, 'find the second index of input pattern in text')
    
    let index3 = osearch.findIndex(text, keyword, osearch.next)
    t.equal(index3, -1, 'find the pattern from index2 should not found')

})