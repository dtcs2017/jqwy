/**
*      ��ȡһ�������ڵı����ݣ�ת��Ϊ��������
*   ����pΪһ��������������
*              target : �����ID
*              lineMode : ʶ��һ�е�CSSѡ����
*              filterName : �ж��Ƿ���˵�Ԫ��name �����������filter���ԣ�����ˣ� 
*              startRowNum : �ӵڼ��п�ʼ��ȡ���ݣ���0��ʼ���� 
*              name : ѡ��nameΪ����ı�Ԫ��
*/
function generateRequestData(p){
        var l = [];
        var rownum = 0;
        var target = jQuery(p.target);
        if(p.nth)
                target = target.eq(p.nth);
        target.find(p.lineMode||"tr").each( function(i){
                if( i >= ( p.startRowNum||0 ) && i <= ( p.endRowNum||99999 )){
                       if(p.filterName){
                             //�ж��Ƿ����
                             if( jQuery(this).find("[name='"+p.filterName+"']").attr("filter") ){
                                     return;
                             }
                       }
                       var d = {};
                       var count=0;
                       jQuery(this).find(":input[type!='button']").each(function(){
                               if(jQuery(this).attr("name")){
                                     if( (p.name && jQuery(this).attr("name") == p.name) 
                                              || !p.name ) {
                                             d[jQuery(this).attr("name")] = (!!p.noId) ? jQuery(this).val() : jQuery(this).attr("auto_val")||jQuery(this).val();
                                             count++;
                                     }else{
                                             return;
                                     }
                               }
                       });
                       if(count==0) return;
                       if(p.extendObj) d = jQuery.extend(true, d, p.extendObj);
                       d.rownum = rownum+1;
                       l.push(d);
                       rownum++;
                }
        } );
        return l;
}


/**
*      ��ȡһ�������ڵı����ݣ�ת��ΪKEY-VALUE����
*   ����pΪһ��������������
*              target : �����ID
*              filterName : �����������filter���ԣ�����ˣ� 
*/
function generateRequestKVData(p) {
        var l = [];
        jQuery(p.target).find(":input[type!='button']").each(function() {
                if(p.filterName) {
                       //�ж��Ƿ����
                       if(jQuery(this).attr(p.filterName)) {
                               return;
                       }
                }
                var d = {};
                if(jQuery(this).attr("name")) {
                       d.name = jQuery(this).attr("name");
                       d.value = (!!p.noId) ? jQuery(this).val() : jQuery(this).attr("auto_val") || jQuery(this).val();
                       if(p.extendObj){
                               d = jQuery.extend(true, d, p.extendObj);
                       }
                       l.push(d);
                }
        });
        if(p.pushObj){
                l.push(jQuery.extend(true, p.pushObj, p.extendObj))
        }
        return l;
}


/**
* ��ȡһ��Ŀ���ڵı�Ԫ��ת��Ϊ���󣨺���
* @param  {[type]} p [description]
* @return {[type]}   [description]
*/
function generateRequestMap(p){
        var m = {};
        var target = jQuery(p.target);
        if(p.nth)
                target = target.eq(p.nth);
        target.find(":input[type!='button']").each(function(){
                if(jQuery(this).attr("name")){
                       if(jQuery(this).attr("type")=="radio" ){
                             if(jQuery(this).attr("checked"))
                                     m[jQuery(this).attr("name")] = jQuery(this).val();
                       }else{
                             m[jQuery(this).attr("name")] = jQuery(this).attr("auto_val")||jQuery(this).val();
                       }
                       
                 }
        });
        if(p.extendObj) m = jQuery.extend(true, m, p.extendObj);  
        return m;
}
