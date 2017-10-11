'use strict'
const log = require('debug')('osearch:engine')

/**
 * Otomat Search - Tìm kiếm mẫu xấp xỉ, động và mềm dẻo theo tiếp cận Otomat mờ
 * @author vunb
 * @version 1.0.0
 * @public 2017-Oct-12
 */
class OtomatSearch {

    constructor(options) {
        // tham số mặc định
        this.options = Object.assign({
            threshold: 4, // ngưỡng phạt của giải thuật
            searchApproximately: true
        }, options);

        // backtrack next position
        this.lastViolate = 0;
        this.lastPatternLength = 0;
        this.lastPositionFound = 0;
    }

    /**
     * Vị trí tìm kiếm tiếp theo trong văn bản
     * @public
     */
    get next() {
        return this.lastPositionFound + this.lastPatternLength + this.lastViolate;
    }

    /**
     * Độ dài đoạn văn bản tìm kiếm được
     * Tính từ vị trí tìm được @position
     * @public
     */
    get length() {
        return this.lastPatternLength + this.lastViolate;
    }

    get isFound() {
        return this.lastPositionFound > -1;
    }

    /**
     * Tìm (xấp xỉ) vị trí xuất hiện mẫu pattern trong văn bản
     * @param {string} text 
     * @param {string} pattern 
     * @param {integer} startIndex 
     */
    findIndex(text, pattern, startIndex = 0) {
        log('find text with pattern: ', pattern);
        if (!text || !pattern) {
            return -1;
        }

        let position = -1;
        let violate = Number.MAX_VALUE;
        let plen = pattern.length;
        let slen = text.length;

        // normalize pattern to upper
        pattern = pattern.toUpperCase()
        
        let next = this.createNextTable(pattern);
        let k = 0;
        let j = 0; // chỉ số trên mẫu p
        let i = 0; // chỉ số tại thời điểm xảy ra không khớp
        let e = 0; // lỗi phạm sai

        let m = startIndex;
        
        while ((k = m + j + e) < slen)  {
            let sk = text[k].toUpperCase();
            if (sk == pattern[j]) {
                j++; // inc j
                if (j == plen) {
                    if (e == 0) {
                        position = m;
                        break;
                    } else if (e < violate) {
                        violate = e;
                        position = m;
                    }
                    // tiếp tục tìm mới để được lỗi là nhỏ nhất
                    m += i - next[i];
                    j = next[i] > -1 ? next[i] : 0;
                    e = 0; // reset
                }
            } else if ((j + 1 < plen) && sk == pattern[j + 1]) {
                // TH này coi như không phạm lỗi
                if (++j == plen - 1) {
                    // lỗi phạm ít nhất 1 lỗi -> ko cần xét trường hợp (e == violate)
                    if (e < violate) {
                        violate = e;
                        position = m;
                    }
                    // tiếp tục tìm mới để được lỗi là nhỏ nhất
                    m += i - next[i];
                    j = next[i] > -1 ? next[i] : 0;
                    e = 0; // reset
                }
            } else {
                // mistakes or mismatches
                e++;
                // tìm mới nếu lỗi vượt ngưỡng cho phép threshold(4)
                if (e > this.options.threshold) {
                    m += i - next[i];
                    j = next[i] > -1 ? next[i] : 0;
                    e = 0
                } else if (e == 1) {
                    i = j;
                }
            }
        }

        // backtrack previous result
        this.lastViolate = violate;
        this.lastPatternLength = plen;
        this.lastPositionFound = position;
        return position;
    }

    createNextTable(pattern = '') {
        let plen = pattern.length;
        if (plen <= 1) {
            return [-1]
        }

        let pos = 2,
            cnd = 0;
        let nextTable = Array(plen); // .fill(0) ?

        nextTable[0] = -1;
        nextTable[1] = 0;

        while (pos < plen) {
            if (pattern[pos - 1] == pattern[cnd]) {
                nextTable[pos] = cnd + 1;
                pos++;
                cnd++;
            } else if (cnd > 0) {
                cnd = nextTable[cnd];
            } else {
                nextTable[pos] = 0;
                pos++;
            }
        }
        return nextTable;
    }
}

// export module
module.exports = function (options) {
    return new OtomatSearch(options)
}

// for test purpose
exports.OtomatSearch = OtomatSearch;