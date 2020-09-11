// Rotate arrow upon click
var num_expand = document.getElementsByClassName("expand_btn")

for (var i = 0; i < num_expand.length; i++) {
  num_expand[i].addEventListener("click", function() {
    var icon = this.querySelector('.center i.fa');
    icon.classList.toggle('rotate');
  });
}
