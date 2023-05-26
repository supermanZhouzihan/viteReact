module.exports.com={
  xDebug:false,
  FileType: ["png", "jpg", "jpeg", "gif"],
  /**
   * 12-采购退货收入、51-采购订单支出、52-运费支出、53-预付款支出、2-其它收入、98-其它支出
   * @param key
   * @returns {{"12": {color: string, name: string}, "2": {color: string, name: string}, "51": {color: string, name: string}, "52": {color: string, name: string}, "53": {color: string, name: string}, "98": {color: string, name: string}}|*}
   */
  paymentType:function(key){
    var key=key || 0;
    let type={
              "12":{name:"采购退货收入","color":"#860b2f"},
              "51":{name:"采购订单支出",color:"#7c1f8d"},
              "52":{name:"运费支出",color:"#521193"},
              "53":{name:"预付款支出",color:"#402072"},
              "2":{name:"其它收入",color:"#27530c"},
              "98":{name:"其它支出",color:"#1a0e44"},
            };
    if(type.hasOwnProperty(key)){
      return type[key];
    }else{
      return type;
    }
  },
  /**
   *    // 1-待审核、2-审核通过、3-作废
   * @param key
   * @returns {{"1": {color: string, name: string}, "2": {color: string, name: string}, "3": {color: string, name: string}}|*}
   */
  paymentState:function(key){
    var key=key || 0;
    let type={
      "1":{name:"待审核",color:"#00afff"},
      "2":{name:"审核通过",color:"#1ab394"},
      "3":{name:"已作废",color:"#5a5e66"}
    };
    if(type.hasOwnProperty(key)){
      return type[key];
    }else{
      return type;
    }
  },

  // 1-采购申请;2-采购审核驳回;3-采购审核通过;4-供应商驳回;5-供应商确认(已发货/待入库);6-入库（完成）;7-完成对账;8-完成结算;9-开票
  orderStatus:function(key){
    var key=key || 0;
    let status={
      "1":{"name":"采购申请","color":"#00afff"},
      "2":{"name":"采购审核驳回","color":"#340352"},
      "3":{"name":"采购审核通过","color":"#0035c7"},
      "4":{"name":"供应商驳回","color":"#610508"},
      "5":{"name":"供应商确认(已发货/待入库)","color":"#046a46"},
      "6":{"name":"入库（完成）","color":"#0b6801"},
      "7":{"name":"完成对账","color":"#018269"},
      "8":{"name":"完成结算","color":"#01823b"},
      "9":{"name":"开票","color":"#00ff75"}
    };
    if(status.hasOwnProperty(key)){
      return status[key];
    }else{
      return status;
    }
  },
  // 1自营统采 2自营零采 3自营在库 4入驻代购 5 入驻零采 6入驻在库
  purchasingPattern:function(key){
   var key=key || 0;
   var purchasingPattern = {
     "1":{"name":"自营统采","color":"#00afff"},
     "2":{"name":"自营零采","color":"#340352"},
     "3":{"name":"自营在库","color":"#0035c7"},
     "4":{"name":"入驻代购","color":"#046a46"},
     "5":{"name":"入驻零采","color":"#0b6801"},
     "6":{"name":"入驻在库","color":"#610508"},
   };
    if(purchasingPattern.hasOwnProperty(key)){
      return purchasingPattern[key];
    }else{
      return purchasingPattern;
    }
  },
  /**
   * 收付款结算状态
   * @param key
   * @returns {{"0": {color: string, name: string}, "1": {color: string, name: string}, "2": {color: string, name: string}}|*}
   */
  paymentSettlement:function(key){
    //0=未结算 1=结算中 2=已结算
    var key=key || 0;
    var settlement={
        '0':{"name":"未结算","color":"#bf0120"},
        '1':{"name":"结算中","color":"#0072d5"},
        '2':{"name":"已结算","color":"#008604"},
    };
    if(settlement.hasOwnProperty(key)){
      return settlement[key];
    }else{
      return settlement;
    }
  },
  payment: function (){

  },
  /**
   *订单核销状态
   * @param key
   * @returns {{"0": {color: string, name: string}, "1": {color: string, name: string}, "2": {color: string, name: string}}|*}
   */
  writeOffStatus:function(key){
    var key=key || 0; // 0=未核销 1=核销中 2=已核销
    var data={
      '0':{"name":"未核销","color":"#d9a401"},
      '1':{"name":"核销中","color":"#0072d5"},
      '2':{"name":"已核销","color":"#008604"},
    };
    if(data.hasOwnProperty(key)){
      return data[key];
    }else{
      return data;
    }
  },
  freightStatus:function(key){
    var key=key || 1; //1待结算 2结算中 3结算完成
    var data={
      '1':{"name":"未核销","color":"#d9a401"},
      '2':{"name":"核销中","color":"#0072d5"},
      '3':{"name":"已核销","color":"#008604"},
    };
    if(data.hasOwnProperty(key)){
      return data[key];
    }else{
      return data;
    }
  },
}
