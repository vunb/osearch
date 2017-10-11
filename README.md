# osearch 

Otomat Search - Tìm kiếm mẫu xấp xỉ, động và mềm dẻo theo tiếp cận Otomat mờ

[![npm version](https://img.shields.io/npm/v/osearch.svg?style=flat)](https://www.npmjs.com/package/osearch)
[![Travis](https://travis-ci.org/vunb/osearch.svg?branch=master)](https://travis-ci.org/vunb/osearch)

# Usage

```js
const osearch = require('osearch')

let text = 'Cơ quan thu lệ phí cấp giấy phép quy hoạch có trách nhiệm đăng ký, kê khai nộp lệ phí vào ngân sách nhà nước theo quy định tại Thông tư số 63/2002/TT-BTC ngày 24/7/2002'
let mispell_keyword = 'lê phí'

let index = osearch.findIndex(text, keyword)
console.log('Result: ', index, osearch.next, osearch.length)
// Result:  12 19 7
```

License
=======

Apache-2.0