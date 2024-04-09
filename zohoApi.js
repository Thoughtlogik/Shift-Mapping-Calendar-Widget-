async function DisplayFilterData_Func(){
  try {
    const carerReport = Carer_Filter_Func(); // Call your first asynchronous function
    const clientReport = Client_Filter_Func(); // Call your second asynchronous function
    const careFaciReport = CareFaci_Filter_Func(); // Call your third asynchronous function
    const VisitScheduleReport = VisitSchedule_Func();

    const results = await Promise.all([VisitScheduleReport]);
    return results;

} catch (error) {
    console.error('Error:', error);
}
}
async function Carer_Filter_Func() {
  try
  {
    const carer_response = await ZOHO.CREATOR.API.getAllRecords({ 
      appName : "hcd-admin",
      reportName : "Carers_Report", 
      page : 1
    });
    const recordArr = await carer_response.data;
    var CarerList = [];
    for(var index in recordArr){
      var rec_id = recordArr[index].ID;
      var carerName = recordArr[index].Name.display_value;
      var Care_Facilitators = recordArr[index].Care_Facilitier || 0;
      
      $('.carerdataDD').append($('<option>', {
        value: rec_id,
        text: carerName,
        'cr_rec_id':rec_id,  // Example additional attribute
        'carer_name': carerName   // Another example additional attribute
      }));

      var temp={
        "carerID":rec_id,
        "carerName":carerName.trim(),
        "care_faci":Care_Facilitators
      }
      CarerList.push(temp);
    }
    const uniqueArrayvalue = [...new Set(CarerList)];
    console.log("uniqueArrayvalue:",uniqueArrayvalue);

    carerArr=uniqueArrayvalue;
  }catch (error)
  {
    console.log("error found:",error);
  }
  return 0;
}
async function Client_Filter_Func() {
  // Your code here
  return 0;
}
async function CareFaci_Filter_Func() {
  // Your code here
  return 0;
}
async function VisitSchedule_Func() {
  var emplist=[];
  for (let i = 1; i <=10; i++)
  {
    var Visitconfig = { 
      appName : "hcd-admin",
      reportName : "Important_of_Visit_Schedules", 
      page : i
    }
    try{
      const cust_response = await ZOHO.CREATOR.API.getAllRecords(Visitconfig);
      const recordArr = await cust_response.data;
      console.log("recordArr:",recordArr);
      for(var index in recordArr){
        var rec_id = recordArr[index].ID;
        var start_date = recordArr[index].Start_Date;
        var end_date = recordArr[index].End_Date;
        var carer =recordArr[index].Carers.display_value.trim();
        var care_facilitators = recordArr[index]["Carers.Care_Facilitier"];
        if (care_facilitators !="")
        {
          care_facilitators = recordArr[index]["Carers.Care_Facilitier"].trim();
        }
        var shiftcount = recordArr[index].Numberofshift || 0;
        var schstartdt= recordArr[index].Scheduled_Start_Date;
        var schenddt= recordArr[index].Scheduled_End_Date;
        var Shiftcancad =recordArr[index].Concat_Shift_Info;
        var shift_temp= recordArr[index].Shift;
        var shiftid34=shift_temp.ID;
        var shiftName=shift_temp.display_value;
        var clientData= recordArr[index].Clients.display_value.trim();
  
  
        // var temparr=[];        
        // temparr["EmpName"]=carer;
        // temparr["end_date"]=end_date;
        // temparr["start_date"]=start_date;
        // temparr["shift"]=shiftName;
        // temparr["client"]=clientData;
        // temparr["rec_id"] = rec_id;
        // temparr["care_facilitators"] = care_facilitators;
        // temparr["shift_count"] = shiftcount;
        // temparr["shiftid"] = shiftid34;
        // temparr["schstartdt"]=moment(schstartdt).format('DD-MMM-YYYY');
        // temparr["schenddt"]=moment(schenddt).format('DD-MMM-YYYY');
        // temparr["concat_shift_name"]=Shiftcancad;
        shiftDataArr.push(
          {
            "EmpName":carer,
            "start_date":start_date,
            "shift":shiftName,
            "client":clientData,
            "rec_id":rec_id,
            "care_facilitators":care_facilitators,
            "shiftid":shiftid34,
            "schstartdt":moment(schstartdt).format('DD-MMM-YYYY'),
            "schenddt":moment(schenddt).format('DD-MMM-YYYY'),
            "concat_shift_name":Shiftcancad
          }
        );
      }
    } catch (error){
      console.log("error:",error)
    }
  }
  // Your code here
  return emplist;
}