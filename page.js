$("#multiplecarer").select2({
  placeholder: "Select Carer",
  allowClear: true,
  closeOnSelect: false
});
console.log("Page loaded");
$(document).on('click', '#next', function() {
  const nextStartDate = new Date(currentWeek.startDate);
  nextStartDate.setDate(currentWeek.startDate.getDate() + 7); // Adding 7 days for next week
  const nextEndDate = new Date(currentWeek.endDate);
  nextEndDate.setDate(currentWeek.endDate.getDate() + 7); // Adding 7 days for next week
  currentWeek = { startDate: nextStartDate, endDate: nextEndDate };
  displayWeekDetails(nextStartDate, nextEndDate);
});
// Current Button Function
$(document).on('click', '#current', function(){
  currentWeek = getCurrentWeekDetails();
  displayWeekDetails(currentWeek.startDate, currentWeek.endDate);
});

// Function to handle previous week button click
$(document).on('click', '#previous', function(){
  const previousStartDate = new Date(currentWeek.startDate);
  previousStartDate.setDate(currentWeek.startDate.getDate() - 7); // Subtracting 7 days for previous week
  const previousEndDate = new Date(currentWeek.endDate);
  previousEndDate.setDate(currentWeek.endDate.getDate() - 7); // Subtracting 7 days for previous week
  currentWeek = { startDate: previousStartDate, endDate: previousEndDate };
  displayWeekDetails(previousStartDate, previousEndDate);
});

// $(document).on('click', '#getsp', function(){
//   console.log("****");
//   DisplayShiftDetails_Func();
// });

function DisplayShiftDetails_Func() {
  $('#datesBody').empty();
  carerArr.forEach(Empelement => {
    console.log("********************************************");
    console.log("Empelement:",Empelement);
    const empName=Empelement.carerName.trim();
    console.log("element EMP:",empName);
    var bodyhtml="<td class=`emp_td`>"+empName+"</td>";
    $('#datesRow th').each(function() {
      var DateCurrent=$(this).attr("currentdate");
      console.log("DateCurrent:",DateCurrent);
      const searchResult = searchRecord(shiftDataArr,empName,DateCurrent);
      console.log("searchResult:",searchResult);
      if (searchResult.length>0)
      {
        console.log(searchResult);
        var divcontent="";
        for (let sp = 0; sp < searchResult.length; sp++)
        {
          const ShiftName = searchResult[sp].concat_shift_name;
          var splitParts = ShiftName.split(/\[|\]/);
          var shiftname = splitParts[0].trim();
          var shiftdate = splitParts[1].trim();
          divcontent+="<div class='empdiv' >"+shiftname+ "<br>"+shiftdate+"</div>";
        }
        bodyhtml+="<td>"+divcontent+"</td>";
      }
      else
      {
        bodyhtml+="<td>-</td>";
      }
    });
    $('#datesBody').append("<tr>"+bodyhtml+"</tr>");
  });
}


function searchRecord(shiftData, EmployeeName, SearchDate) {
  var searchDate1 = new Date(SearchDate);
  console.log("searchDate1:",shiftData);
  const filteredItems = shiftData.filter(item => {
    console.log("startDateTemp:",item.schstartdt);
    const startDate = new Date(item.schstartdt);
    console.log("startDate:",startDate);
    const endDate=new Date(item.schenddt);
    return searchDate1 >= startDate && searchDate1 <= endDate && item.EmpName === EmployeeName
  });

  return filteredItems;
}

// async function DisplayFilterData_Func(){
//   const carer_response = await ZOHO.CREATOR.API.getAllRecords({ 
//     appName : "hcd-admin",
//     reportName : "Carers_Report", 
//     page : 1
//   });
//   console.log("carer_response:",carer_response);
// }

