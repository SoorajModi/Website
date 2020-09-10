// Change icon for more/reduce
var num_expand = document.getElementsByClassName("expand_btn")

for (var i = 0; i < num_expand.length; i++) {
  num_expand[i].addEventListener("click", function() {
    var icon = this.querySelector('.right i.fa');
    icon.classList.toggle('rotate');
  });
}
