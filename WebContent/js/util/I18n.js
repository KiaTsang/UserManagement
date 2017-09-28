 /*
 * I18n静态类，实现I18n功能
 *
 * 接口：
 * getI18nPropByKey()
 *
 * 例子：
 * I18n.getI18nPropByKey("key")
 * ……
 * @author  曾庆越
 * @since   2014-5-07
 */
function I18n() { }

/**
 * 根据name属性获取国际化资源
 */
I18n.getI18nPropByKey = function (key){
     return $.i18n.prop(key);
};
