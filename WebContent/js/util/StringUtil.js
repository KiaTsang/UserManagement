/**
 * 自定义js工具类（依赖MyJsonUtil）
 * @namespace StringUtil
 * @author  zengqingyue.
 * @since   2015-06-01.
 *
 */
var StringUtil = new Object();

/**
 * getUUID() 自动生成32位随机id
 * @return {String}
 */
StringUtil.getUUID = function() {
    var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

    var chars = CHARS, uuid = new Array(32), rnd=0, r;
    for (var i = 0; i < 32; i++) {
       if (i==12) {
            uuid[i] = '4';
        } else {
            if (rnd <= 0x02) rnd = 0x2000000 + (Math.random()*0x1000000)|0;
            r = rnd & 0xf;
            rnd = rnd >> 4;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
    }
    return uuid.join('');
};

/**
 * 封装用于后台请求的数据格式
 * @param type
 * @param value
 * @return {*}
 */
StringUtil.decorateRequestData = function(type,value){
    var dataType = new Object();
    dataType['dataTypeName'] = type;
    dataType['dataTypeValue'] = MyJsonUtil.obj2str(value);
    return MyJsonUtil.obj2str(dataType);
}