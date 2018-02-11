// //需要用到的工具类js
// export function format(timestamp, fmt = 'yyyy-MM-dd hh:mm:ss') {
//     timestamp = parseInt(timestamp);
//
//     if (!timestamp || typeof (timestamp) !== 'number') {
//         console.warn('时间戳类型错误')
//         return timestamp;
//     }
//
//     let millisecs = timestamp.toString().length == 10 ? (timestamp * 1000) : timestamp,
//         time_obj = new Date(millisecs), //参数是 时间戳转换的毫秒
//         o = {
//             'M+': time_obj.getMonth() + 1, //月份
//             'd+': time_obj.getDate(), //日
//             'h+': time_obj.getHours(), //小时
//             'm+': time_obj.getMinutes(), //分
//             's+': time_obj.getSeconds(), //秒
//             'q+': Math.floor((time_obj.getMonth() + 3) / 3), //季度
//             'S': time_obj.getMilliseconds(), //毫秒
//         };
//
//     if (/(y+)/.test(fmt))
//         fmt = fmt.replace(RegExp.$1, (time_obj.getFullYear() + '').substr(4 - RegExp.$1.length));
//     for (let k in o)
//         if (new RegExp('(' + k + ')').test(fmt))
//             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
//     return fmt;
// }
//
// // 金钱格式化（三位小数分割, 两位小数点）
// export function priceFormat(price) {
//     return Number(price).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
// }
//
// export function priceFormat4(price, type) {
//     if (type == 'int') {
//         return Number(price).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
//     }
//     let numList = price.toString().split('.');
//     let intNum = numList[0];
//     let floatNum = numList[1];
//     floatNum = floatNum && floatNum.length == 1 ? floatNum + '0' : floatNum;
//     let tail = floatNum ? `.${floatNum}` : '.00';
//     return intNum.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + tail;
// }
//
// // 判断是否空Object
// export function isEmptyObject(e) {
//     let t;
//     for (t in e)
//         return !1;
//     return !0
// }
//
// export function dayZero(days = 0) {
//     const Now = new Date();
//     Now.setDate(Now.getDate() + days);
//     const y = Now.getFullYear()
//     const m = Now.getMonth() + 1
//     const d = Now.getDate()
//     return new Date(`${y}/${m}/${d}`)
// }
//
// // json转get
// export function jsonToGet(json) {
//     let g = Object.keys(json).map((k) => {
//         return encodeURIComponent(k) + '=' + encodeURIComponent(json[k])
//     }).join('&');
//     return g;
// };
//
// export function getToJson(data) {
//     var args = {};
//     var match = null;
//     var reg = /(?:([^&]+)=([^&]+))/g;
//     while ((match = reg.exec(data)) !== null) {
//         args[match[1]] = unescape(match[2]);
//     }
//     return args;
// };
//
// export function getSearch(search) {
//     const searchNew = decodeURIComponent(search.substring(1));
//     return getToJson(searchNew);
// };
//
// // 去掉前后空格
// export function trim(s) {
//     return s.replace(/(^\s*)|(\s*$)/g, "");
// }
//
// // 去掉字符串所有的空格
// export function trimAll(s) {
//     return s.replace(/\s/g, "");
// }
//
// // 获取对象的值
// export function objectGet(o, p, defaultValue) {
//     p = Array.isArray(p) ? p : p.split('.')
//     return p.reduce((xs, x) => {
//         return xs && xs[x] ? xs[x] : (defaultValue || null)
//     }, o);
// }
//
// export function storeSet(key, value) {
//     if (window.localStorage) {
//         localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value)
//     }
// }
//
// export function storeGet(key, value) {
//     if (window.localStorage) {
//         let data = ''
//         try {
//             data = JSON.parse(localStorage.getItem(key))
//         } catch (error) {
//         }
//         return data
//     }
//     return ''
// }
//
// //时间差
// //传时间戳
// //startTime 开始时间 [必传]
// //endTime 结束时间 [非必传] 默认为当前时间
// export function timeDiff(startTime, endTime) {
//     let _date = new Date(); //结束时间
//
//     if (!startTime) {
//         console.warn('请传入开始时间')
//         return;
//     }
//
//     let end = endTime ? endTime : _date.getTime();
//
//     let diff = end - startTime //时间差的毫秒数
//
//     //计算出相差天数
//     let days = Math.floor(diff / (24 * 3600 * 1000))
//     //计算出小时数
//     let leave1 = diff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
//     let hours = Math.floor(leave1 / (3600 * 1000))
//     //计算相差分钟数
//     let leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
//     let minutes = Math.floor(leave2 / (60 * 1000))
//     //计算相差秒数
//     let leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
//     let seconds = Math.round(leave3 / 1000)
//
//     return ((days > 0 ? days + '天' : '') + (hours < 0 ? 0 : hours) + '小时' + (minutes < 0 ? 0 : minutes) + '分钟')
// }
//
// // 日期，在原有日期基础上，增加days天数，默认增加1天
// export function addDate(dateTime, days, fmt) {
//     if (days == undefined || days == '') {
//         days = 1;
//     }
//     let date = new Date(dateTime);
//
//     date.setTime(date.getDate() + days); //注意:这里修改了原来的date
//
//     if (fmt) return format(date, fmt);
//
//     let month = date.getMonth() + 1,
//         day = date.getDate();
//
//     return date.getFullYear() + '/' + getFormatDate(month) + '/' + getFormatDate(day);
// }
//
// // 日期月份/天的显示，如果是1位数，则在前面加上'0'
// export function getFormatDate(arg) {
//     if (arg == undefined || arg == '') {
//         return '';
//     }
//
//     let re = arg + '';
//     if (re.length < 2) {
//         re = '0' + re;
//     }
//
//     return re;
// }
//
// /**
//  * 将数值四舍五入(保留2位小数)后格式化成金额形式
//  *
//  * @param num 数值(Number或者String)
//  * @return 金额格式的字符串,如'1,234,567.45'
//  * @type String
//  */
// export function formatMoney(num) {
//     if (!num)
//         return "0";
//     num = num.toString().replace(/\$|\,/g, '');
//     if (isNaN(num))
//         num = "0";
//     let sign = (num == (num = Math.abs(num)));
//     num = Math.floor(num * 100 + 0.50000000001);
//     let cents = num % 100;
//     num = Math.floor(num / 100).toString();
//     if (cents < 10)
//         cents = "0" + cents;
//     for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
//         num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
//     return (((sign) ? '' : '-') + num + '.' + cents);
// }
//
// // 替换邮箱字符
// export function regEmail(email) {
//     if (String(email).indexOf('@') > 0) {
//         var str = email.split('@'),
//             _s = '';
//         // if (str[0].length > 3) {
//         //     for (var i = 0; i < str[0].length - 3; i++) {
//         //         _s += '*';
//         //     }
//         // }
//         // var new_email = str[0].substr(0, 3) + _s + '@' + str[1]
//         var new_email = str[0].substr(0, 3) + '****' + '@' + str[1]
//     }
//     return new_email
// }
//
// // 替换手机字符
// export function regMobile(mobile) {
//     if (mobile.length > 7) {
//         var new_mobile = mobile.substr(0, 3) + '****' + mobile.substr(7)
//     }
//     return new_mobile
// }
//
// export function textTruncated(str, length, truncation) {
//     var chinese_pattern = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
//     // [\u4E00-\u9FA5]表示汉字，[\uFE30-\uFFA0]表示全角
//     str = str || " ";
//     length = length || 30;
//     truncation = typeof truncation === "string" ? truncation : "...";
//     var chineseIn = function (s) {
//         return chinese_pattern.exec(s) ? true : false;
//     };
//     var calcSize = function (source) {
//         var strTemp = source.replace(chinese_pattern, "aa");
//         return strTemp.length;
//     };
//     var recursion = function (source, length) {
//         if (calcSize(source) <= length || (!chineseIn(source))) {
//             return source;
//         } else {
//             return recursion(source.slice(0, source.length - 1), length);
//         }
//     };
//     var sliceLength = length - truncation.length;
//     return calcSize(str) > length ? recursion(str.slice(0, sliceLength), sliceLength) + truncation : String(str);
// }
//
// var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
//
// //将Ansi编码的字符串进行Base64编码
// export function encode64(input) {
//     var output = "";
//     var chr1, chr2, chr3 = "";
//     var enc1, enc2, enc3, enc4 = "";
//     var i = 0;
//     do {
//         chr1 = input.charCodeAt(i++);
//         chr2 = input.charCodeAt(i++);
//         chr3 = input.charCodeAt(i++);
//         enc1 = chr1 >> 2;
//         enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
//         enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
//         enc4 = chr3 & 63;
//         if (isNaN(chr2)) {
//             enc3 = enc4 = 64;
//         } else if (isNaN(chr3)) {
//             enc4 = 64;
//         }
//         output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
//             keyStr.charAt(enc3) + keyStr.charAt(enc4);
//         chr1 = chr2 = chr3 = "";
//         enc1 = enc2 = enc3 = enc4 = "";
//     } while (i < input.length);
//     return output;
// }
//
// export function decode64(input) {
//     var output = "";
//     var chr1, chr2, chr3 = "";
//     var enc1, enc2, enc3, enc4 = "";
//     var i = 0;
//     if (input.length % 4 != 0) {
//         return "";
//     }
//     var base64test = /[^A-Za-z0-9\+\/\=]/g;
//     if (base64test.exec(input)) {
//         return "";
//     }
//     do {
//         enc1 = keyStr.indexOf(input.charAt(i++));
//         enc2 = keyStr.indexOf(input.charAt(i++));
//         enc3 = keyStr.indexOf(input.charAt(i++));
//         enc4 = keyStr.indexOf(input.charAt(i++));
//         chr1 = (enc1 << 2) | (enc2 >> 4);
//         chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
//         chr3 = ((enc3 & 3) << 6) | enc4;
//         output = output + String.fromCharCode(chr1);
//         if (enc3 != 64) {
//             output += String.fromCharCode(chr2);
//         }
//         if (enc4 != 64) {
//             output += String.fromCharCode(chr3);
//         }
//         chr1 = chr2 = chr3 = "";
//         enc1 = enc2 = enc3 = enc4 = "";
//     } while (i < input.length);
//     return output;
// }
//
// export function utf16to8(str) {
//     var out, i, len, c;
//     out = "";
//     len = str.length;
//     for (i = 0; i < len; i++) {
//         c = str.charCodeAt(i);
//         if ((c >= 0x0001) && (c <= 0x007F)) {
//             out += str.charAt(i);
//         } else if (c > 0x07FF) {
//             out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
//             out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
//             out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
//         } else {
//             out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
//             out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
//         }
//     }
//     return out;
// }
//
// export function utf8to16(str) {
//     var out, i, len, c;
//     var char2, char3;
//     out = "";
//     len = str.length;
//     i = 0;
//     while (i < len) {
//         c = str.charCodeAt(i++);
//         switch (c >> 4) {
//             case 0:
//             case 1:
//             case 2:
//             case 3:
//             case 4:
//             case 5:
//             case 6:
//             case 7:
//                 // 0xxxxxxx
//                 out += str.charAt(i - 1);
//                 break;
//             case 12:
//             case 13:
//                 // 110x xxxx 10xx xxxx
//                 char2 = str.charCodeAt(i++);
//                 out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
//                 break;
//             case 14:
//                 // 1110 xxxx 10xx xxxx 10xx xxxx
//                 char2 = str.charCodeAt(i++);
//                 char3 = str.charCodeAt(i++);
//                 out += String.fromCharCode(((c & 0x0F) << 12) |
//                     ((char2 & 0x3F) << 6) |
//                     ((char3 & 0x3F) << 0));
//                 break;
//         }
//     }
//     return out;
// }
//
// export function getUrlParam(name, url) {
//     var search = url || location.search.substr(1);
//
//     if (search != '') {
//         var re = new RegExp('(^|&|\\?)' + name + '=([^&]*)($|&)');
//         var arr = search.match(re);
//         if (arr !== null) {
//             return decodeURI(arr[2]);
//         }
//     }
//     return '';
// }
//
// export function formatPercent(num) {
//     return `${(Math.round(num * 10000) / 100).toFixed(2)} %`;
// }
//
// //判断一个变量是数组还是对象
// export function getDataType(e) {
//     if (typeof e == 'object') {
//         if (typeof e.length == 'number') {
//             return 'arr';
//         } else {
//             return 'obj';
//         }
//     } else {
//         return 'param is no object type';
//     }
// }
//
// export function isArr(e) {
//     return getDataType(e) == 'arr'
// }
//
// export default {}
