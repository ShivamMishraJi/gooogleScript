function prepareTextMsg(shopkeeper_name,customer_name){
  var sheet = getSheetByName('Message_Templates');
  var dataRange = sheet.getRange(1,6,1,6);
  data = dataRange.getValues();
  var msg = data[0][0];
  
  //replace items
  msg = msg.replace("%shopkeeper_name%",shopkeeper_name);
  msg = msg.replace("%customer_name%",customer_name);
  
  return msg;
}

function sendSMS(mobileNumber,msg){
  //Your authentication key medicalStore
  var authKey = "291910AP8RBvo25d74c0ae";

  //Sender ID,While using route4 sender id should be 6 characters long.
  var senderId = "SHIVAM";

  //Define route
//  var route = 4;
  var route = 1;
//  var route = "default";

  var payload = {
        "authkey": authKey,
        'mobiles' : mobileNumber,
        'message' : msg,
        'sender' : senderId,
        'route' : route
  };

  var options = {
    "method": "post",
    "payload": payload
  };
  try{
    var res = UrlFetchApp.fetch("http://api.msg91.com/api/sendhttp.php?", options);
    var resAsTxt = '' + res + '';
    //Logger.log("resAsTxt : "+resAsTxt)
  }
  catch(e){
    Logger.log("error values is : "+e);
    Logger.log("Got Error");
  }
}

function sendEmail(recipient,subject,body){
  GmailApp.sendEmail(recipient,subject,body)
}

function prepareMsgForEmail(shopkeeper_name,customer_name,allData,customer_mobile_number,customer_address){
  var sheet = getSheetByName('Message_Templates');
  var dataRange = sheet.getRange(1,1,1,1);
  data = dataRange.getValues();
  var msg = data[0][0];
  
  //replace items
  msg = msg.replace("%shopkeeper_name%",shopkeeper_name);
  //msg = msg.replace("%customer_name%",customer_name);
  //msg = msg.replace("%customer_Name%",customer_name);
  msg = msg.replace("%allData%",allData);
 // msg = msg.replace("%customer_mobile_number%",customer_mobile_number);
 // msg = msg.replace("%customer_address%",customer_address);

  return msg;
}

function getSheetByName(name){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  for(var n in sheets){
    if(name==sheets[n].getName()){
      return sheets[n];
    }
  }
  return ss[0];
}

function formatDate(date){
    var dd = date.getDate();
    var mm = date.getMonth()+1; 
    var yyyy = date.getFullYear();
    if(dd<10) 
    {
      dd='0'+dd;
    } 
    if(mm<10) 
    {
      mm='0'+mm;
    } 
    var formattedDate = dd+'/'+mm+'/'+yyyy;
    //Logger.log("formatted_date : "+formattedDate);
  return formattedDate;
}