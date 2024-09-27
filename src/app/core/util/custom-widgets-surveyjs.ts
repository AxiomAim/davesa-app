import * as $ from 'jquery';
import 'jquery-datetimepicker';
import moment from "moment";
export var jqueryDateTimePickerWidget = {
  //the widget name. It should be unique and written in lowercase.
  name: "dateTimePicker",
  //SurveyJS library calls this function for every question to check 
  //if this widget should apply to the particular question.
  isFit: function (question) {
      //We are going to apply this widget for datetime-local
      return question.getType() === "text" && question.inputType === "datetime-local";
  },
  //We will change the default rendering, but do not override it completely
  isDefaultRender: false,
  //"question" parameter is the question we are working with and "el" parameter is HTML textarea in our case
  afterRender: function (question, el) {
    console.log("after render",question);
    console.log('el',el);
      
      // Create a div with an input text and a button inside
      var mainDiv = document.createElement("div");
      // mainDiv.className = "sv_qstn datetimepicker-wrapper"; // Optional class for styling

      var uniqueId = 'datetime-picker-input-' + question.id;
      var inputEle = document.createElement("input");
      inputEle.className = "sd-input sd-text ng-star-inserted"
      inputEle.setAttribute('type', 'text');
      inputEle.setAttribute('id', uniqueId);  
      mainDiv.appendChild(inputEle);
      el.parentElement.insertBefore(mainDiv, el);


      $('#' + uniqueId).datetimepicker({
        format: 'd M Y H:i',
        step: 5
      })

             // Bind datetime picker value to SurveyJS question value
             $('#' + uniqueId).on('change.datetimepicker', function (e) {
              console.log('e.target.value',e.target.value);
              question.value = e.target.value;
          });
  
          // Bind SurveyJS question value to datetime picker value
        
            console.log('question.value',question.value);
              $('#' + uniqueId).val(question.value);
       
  
  },
};




// export const jqueryDatePickerWidget= {
//     //the widget name. It should be unique and written in lowercase.
//     name: "datePicker",
//     //SurveyJS library calls this function for every question to check 
//     //if this widget should apply to the particular question.
//     isFit: function (question) {
//         //We are going to apply this widget for datetime-local
//         return question.getType() === "text" && question.inputType === "date";
//     },
//     //We will change the default rendering, but do not override it completely
//     isDefaultRender: false,
//     //"question" parameter is the question we are working with and "el" parameter is HTML textarea in our case
//     afterRender: function (question, el) {
//       console.log("after render",question);
//       console.log('el',el);
//         //Create a div with an input text and a button inside
//         var mainDiv = document.createElement("div");
//         // mainDiv.className = "sv_qstn datetimepicker-wrapper";
//         var inputEle = document.createElement("input");
//         inputEle.className = "sd-input sd-text ng-star-inserted"
//         inputEle.setAttribute('type', 'text');
//         inputEle.setAttribute('id' ,"date-picker-input")  
//         mainDiv.appendChild(inputEle);
//         el.parentElement.insertBefore(mainDiv, el);


//         $('#date-picker-input').datetimepicker({
//           format: 'd M Y',
//           timepicker:false,
//         })
        
//                // Bind datetime picker value to SurveyJS question value
//                $('#date-picker-input').on('change.datetimepicker', function (e) {
//                 question.value = e.target.value;
//             });
//             console.log('question.value before',question.value);
//             // Bind SurveyJS question value to datetime picker value
//                 $('#date-picker-input').val(question.value);
//     },
//   }