// Rotate Arrow icons upon click
var num_collapse = document.getElementsByClassName("about_sub_header");

for (var i = 0; i < num_collapse.length; i++) {
  num_collapse[i].addEventListener("click", function() {
    var icon = this.querySelector('h4 .about_arrow .right i.fa');
    icon.classList.toggle('rotateNeg90');
  });
}
