/**
 * @fileOverview model管理工厂，可方便的对Model进行缓存和更新
 * @author 行列
 * @version 1.1
 **/
KISSY.add("magix/mmanager", function(S, Magix, Event) {
    /*
        #begin mm_fetchall_1#
        KISSY.add('testMM',function(S,MM,Model){
        #end#

        #begin mm_fetchall_2#
        },{
            requires:["magix/mmanager","magix/model"]
        });
        #end#

        #begin mm_fetchall_3#
        KISSY.use('testMM',function(S,TM){
        #end#
     */
    eval(Magix.include('../tmpl/mmanager', 1));
    return MManager;
}, {
    requires: ["magix/magix", "magix/event"]
});