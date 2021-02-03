// Rotate arrow upon click
const num_expand = document.getElementsByClassName('expand-btn');

for (let i = 0; i < num_expand.length; i++) {
  num_expand[i].addEventListener('click', function () {
    const icon = this.querySelector('.expand-btn i.fa');
    icon.classList.toggle('rotate');
  });
}
