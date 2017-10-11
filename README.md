# osearch 

Otomat Search - Tìm kiếm mẫu xấp xỉ, động và mềm dẻo theo tiếp cận Otomat mờ

# Usage

```js
const osearch = require('osearch')

let text = 'Cơ quan thu lệ phí cấp giấy phép quy hoạch có trách nhiệm đăng ký, kê khai nộp lệ phí vào ngân sách nhà nước theo quy định tại Thông tư số 63/2002/TT-BTC ngày 24/7/2002'
let mispell_keyword = 'lê phí'

let index = osearch.findIndex(text, keyword)
console.log('Result: ', index, osearch.next, osearch.length)
// Result:  12 19 7
```