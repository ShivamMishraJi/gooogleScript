//Make grouping by a customer name, either send different mails for different customer's or
// one mail for all the customers but it should be segregated based on different customer's

//Chose only one date for excel Manual Trigger Day OR	Email/SMS Trigger day

//NI Merge cells like name, mobile and address for one customer with multiple medicines
//send SMS on Shopkeeper's mobile
function customerMedDetails()
{
  var sheet = getSheetByName("Customer_List");
  var data = sheet.getDataRange();
  var last_row = sheet.getLastRow();
   var last_column = sheet.getLastColumn();
//  var allData = data.getValues();

  var date = Utilities.formatDate(new Date(), "GMT+5.30", "dd/MM/yyyy 00:00:00");  // Today's Date
  
  var allData="";
  var excelDate;
  var rangeCount = 0;
  var x;
  //Logger.log("\n last_row : "+last_row);
   
  for(var i=2;i<=last_row;i++){

    var manualCellDate = data.getCell(i,9).getValue();
    var automaticCellDate = data.getCell(i,10).getValue();
    
    Logger.log("manualCellDate value is: "+manualCellDate+"\n"+"automaticCellDate value is: "+automaticCellDate )
    if(manualCellDate=""){
      excelDate = formatDate(automaticCellDate);        //Product finishing Date
    }else{
      excelDate = formatDate(manualCellDate);           //Product finishing Date
    }
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//    var range = sheet.getRange(2, last_row, 1, last_column)
//     
//    Logger.log("Value: "+data.getCell(i,2).getValue()+" : " +range.isPartOfMerge());
//    
//    var numRows = range.getNumRows();
//    
//    if(data.getCell(i,2).getValue() != ""){
//      var valueIs = ""+data.getCell(i,2).getValue();
//      rangeCount++;
//      var x = i;              //got the cell value of the first merge cell
//      //Logger.log("x is: "+x);
//    }else{
//      
//    }
//    Logger.log("x is: "+x);
//    //Logger.log("rangeCount is: "+rangeCount);
//    
////**************************************************************************************************************************
    
    if(date > excelDate)
    {
   ////////////////////////////////////////////////////////////////////////////
//      //var expiredRow = range.getValue();
//      var cell = i.getCurrentCell();
//      var expiredRow = cell.getRow();
//      Logger.log("expiredRow: "+expiredRow);
//      console.log("expiredRow: "+expiredRow);
  ///*************************************************************************
      var medicinesData;
      
      var shopkeeper_email;
      var customer_name,customer_mobile_number,customer_address,shopkeeper_name,shopkeeper_mobile;
      var count = 0;
      
      for(j=0; j<i ;j++){
         medicinesData = data.getCell(i, 1).getValue()+"";
         customer_name = data.getCell(i, 2).getValue();
        customer_mobile_number = ""+data.getCell(i, 3).getValue();
      }
      allData = allData + "\n"+"o   "+medicinesData+" : "+customer_name+" : "+customer_mobile_number ;
      
      if(count == 0){
        shopkeeper_email = data.getCell(i, 13).getValue();
        
        customer_name = data.getCell(i, 2).getValue();
        customer_mobile_number = ""+data.getCell(i, 3).getValue();
        customer_address = data.getCell(i, 12).getValue();
        shopkeeper_name = data.getCell(i, 15).getValue();
        
        shopkeeper_mobile = ""+data.getCell(i, 14).getValue();
        count++;
      }
    }
  }
  ////////////////////////////////////////////////////////////////////////////
   
  ///*************************************************************************
  
  //Logger.log("All finished medicines : "+medicines);
  var emailMsg = prepareMsgForEmail(shopkeeper_name,customer_name,allData,customer_mobile_number,customer_address);
  //Logger.log("\n emailMsg : "+emailMsg);  
  
  var rows = sheet.getLastRow()
  var cols = sheet.getLastColumn()
  var dataRange = sheet.getRange(2,1,rows-1,cols)   //getRange(startRow,startColumn,endRow,endColumn)
  var data = dataRange.getValues();
  
  var to = shopkeeper_email;
  
  sendEmail(to,'Customer Medicine Finished !',emailMsg);
  
  var textMsg = prepareTextMsg(shopkeeper_name,customer_name);
  //Logger.log("\n textMsg : "+textMsg);  
 // Logger.log(shopkeeper_mobile);
 sendSMS(shopkeeper_mobile,textMsg);
  
//  SpreadsheetApp.flush();
}
