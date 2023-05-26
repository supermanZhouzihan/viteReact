import XLSX from "xlsx";
export const commonExcel={
  xdBug:false,
  dataExportExcel:function(json, name,filed,callback) {
    let that=this;
    /* convert state to workbook */
    var data = new Array();
    var keyArray = new Array();
    var callback = callback || function (result){  return result; };

    if(!filed.hasOwnProperty('tableColumn')){
      filed=false;
    }

    for (const key1 in json) {
      if (json.hasOwnProperty(key1)) {
        const element = (typeof callback == "function")?callback(json[key1]):json[key1];
        var rowDataArray = new Array();
        for (const key2 in element) {
              var val;
          if (element.hasOwnProperty(key2)) {
            if(filed !== false){
              let tableColumn=filed.tableColumn;
              if(filed.hasOwnProperty('showColumn')){
                let showColumn=filed.showColumn;
                if(showColumn.hasOwnProperty(key2) && showColumn[key2]){
                  val=  element[key2];
                }else{
                  continue;
                }
              }else{
                console.log(key2)
                if(tableColumn.hasOwnProperty(key2)){
                  val=  element[key2];
                }else{
                  continue;
                }
              }
            }else{
                val=  element[key2];
            }
            const element2 = val;
            rowDataArray.push(element2);
            if (keyArray.length < that.getLength(element) && key1==0) {
              if(filed !== false){
                let tableColumn=filed.tableColumn;
                    if(filed.hasOwnProperty('showColumn')){
                      let showColumn=filed.showColumn;
                      if(showColumn.hasOwnProperty(key2) && showColumn[key2]){
                        keyArray.push(tableColumn[key2]);
                      }else{
                        continue;
                      }
                    }else{
                      console.log(tableColumn,tableColumn.hasOwnProperty(key2),key2);

                      if(tableColumn.hasOwnProperty(key2)) {
                        keyArray.push(tableColumn[key2]);
                      }else{
                        continue;
                      }
                    }
              }else{

                    keyArray.push(key2);

              }
            }
          }
        }
        data.push(rowDataArray);
      }
    }
    data.splice(0, 0, keyArray);
    if(that.xdBug){
      console.log(keyArray);console.log(data);
      return false;
    }
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    /* generate file and send to client */
    XLSX.writeFile(wb, name + ".xlsx");
  },
  getLength:function(obj) {
    var count = 0;
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        count++;
      }
    }
    return count;
  }
};
