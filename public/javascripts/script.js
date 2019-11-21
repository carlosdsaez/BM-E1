
document.addEventListener('DOMContentLoaded', () => {

  $('.modal').modal('show');
 
  $(function() {
    $( "#datepicker" ).datepicker();
    });

  $('#popupButton').click(()=>{
    $('.modal').toggleClass('invisible')
  })
    
}, false);
