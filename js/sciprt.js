

// $(function (){
// ▼ハンバーガーメニュー
// $(".hamburger").click(function () {
// $(".hamburger").toggleClass("open");
// $(".header_nav-sp").fadeToggle();
// });
// ハンバーガーメニュー▲

//  MVスライダー↓
$(".main-visual").slick({
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  dots: true,
});

//横スクロール
const stickySections = [...document.querySelectorAll(".sticky_wrap")];
window.addEventListener("scroll", (e) => {
  for (let i = 0; i < stickySections.length; i++) {
    transform(stickySections[i]);
  }
});
function transform(section) {
  const offsetTop = section.parentElement.offsetTop;
  const scrollSection = section.querySelector(".horizontal_scroll");
  let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
  percentage = percentage < 0 ? 0 : percentage > 300 ? 300 : percentage;
  scrollSection.style.transform = `translate3d(${-percentage}vw, 0, 0)`;
}


// 🟨 スライダー反映されない🟨↓
$('.moonandsun__slider').slick({
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: 'linear'
});





// コンタクトフォーム
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const action = "https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/formResponse";

  fetch(action, {
    method: "POST",
    body: formData,
    mode: "no-cors"
  }).then(() => {
    alert("送信しました！");
    form.reset();
  }).catch(error => console.error("Error:", error));
});


