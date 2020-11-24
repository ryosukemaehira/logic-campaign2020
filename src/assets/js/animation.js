// scrollしてwindowに入ったら発火させるアニメーション

var scrollAnimationTarget = document.querySelectorAll('.js-animation-parent')
var scrollAnimationTargetTop = document.querySelectorAll('.js-animation-parent--top-section')

document.addEventListener('onload', (event) => {
  Array.prototype.map.call(scrollAnimationTargetTop, function(ele) {
    if (checkView(ele)) {
      ele.classList.add('js-animation-fire');
    }
  });
});


document.addEventListener('scroll', function(){
  Array.prototype.map.call(scrollAnimationTarget, function(ele) {
    if (checkView(ele)) {
      ele.classList.add('js-animation-fire');
    }
  });
});

// テキストをバラしてspanの中に格納
document.querySelectorAll('.js-split-letters-target').forEach(function (ele) {
  var text = ele.textContent;
  ele.innerHTML = null;
  text.split('').forEach(function (c) {
    ele.innerHTML += '<div>'+c+'</div>';
  });
})


function checkView(ele) {
  var windowHeight = window.innerHeight;
  var scrollY = window.scrollY || window.pageYOffset;
  var scrollPosition = scrollY + windowHeight;
  var elementPosition = ele.getBoundingClientRect().top + scrollY + 100;
  if (scrollPosition > elementPosition) {
    return true;
  }
  return false;
}
