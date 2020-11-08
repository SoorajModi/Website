// // Rotate Arrow icons upon click
// var num_collapse = document.getElementsByClassName("about_sub_header");
//
// for (var i = 0; i < num_collapse.length; i++) {
//   num_collapse[i].addEventListener("click", function() {
//     var icon = this.querySelector('div h4 i.fa');
//     icon.classList.toggle('rotateNeg90');
//   });
// }

$( ".about_sub_header" ).click(function() {
  $(this).find("i").toggleClass("fa-plus fa-minus");
});
