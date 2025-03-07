// ====================
//ハンバーガーメニュー
// ====================
// $(function (){
// $(".hamburger").click(function () {
// $(".hamburger").toggleClass("open");
// $(".header_nav-sp").fadeToggle();
// });

// ====================
//MVスライダー
// ====================
$(".main-visual").slick({
  arrows: false,
  // autoplay: true,
  autoplaySpeed: 3000,
  dots: false
});

// ====================
//aboutページスライダー
// ====================
$("#moonandsun").slick({
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: "linear"
});

// ====================
//横スクロール
// ====================
const stickySections = [...document.querySelectorAll(".sticky_wrap")];
window.addEventListener("scroll", () => {
  stickySections.forEach((section) => {
    transform(section);
  });
});
function transform(section) {
  const offsetTop = section.parentElement.offsetTop;
  const scrollSection = section.querySelector(".horizontal_scroll");
  const maxScrollWidth = 9731; // 必要に応じて調整
  let percentage =
    ((window.scrollY - offsetTop) / window.innerHeight) * maxScrollWidth;
  percentage = Math.max(0, Math.min(percentage, maxScrollWidth));
  scrollSection.style.transform = `translate3d(${-percentage}px, 0, 0)`;
}

// ====================
//円が広がる実装
// ====================
$(window).on("scroll", function () {
  let circleArea = $(".circle-area");
  let circle = $(".circle");

  let areaTop = circleArea.offset().top;
  let areaHeight = circleArea.outerHeight();
  let scrollTop = $(this).scrollTop();
  let windowHeight = $(window).height();
  let pageBottom = areaTop + areaHeight;
  let circleStartPos = areaTop + areaHeight / 2 - windowHeight / 2;

  let maxScale = 30;
  let progress = (scrollTop - circleStartPos) / (areaHeight * 0.3);
  progress = Math.max(0, Math.min(progress, 1));

  let scaleValue = 1 + progress * maxScale;

  if (scrollTop + windowHeight >= areaTop && scrollTop < pageBottom) {
    if (scrollTop < circleStartPos) {
      circle.css({
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(1)"
      });
    } else {
      circle.css({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(" + scaleValue + ")"
      });
    }
  }

  // `.circle-area` の上に戻ったら `absolute` に戻して小さくする
  if (scrollTop + windowHeight < areaTop) {
    circle.css({
      position: "absolute",
      top: "calc(50% - 50px)",
      left: "calc(50% - 50px)",
      transform: "scale(1)"
    });
  }
});

// // コンタクトフォーム
// document
//   .getElementById("contactForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault();

//     const form = event.target;
//     const formData = new FormData(form);
//     const action =
//       "https://docs.google.com/forms/d/e/YOUR_GOOGLE_FORM_ID/formResponse";

//     fetch(action, {
//       method: "POST",
//       body: formData,
//       mode: "no-cors"
//     })
//       .then(() => {
//         alert("送信しました！");
//         form.reset();
//       })
//       .catch((error) => console.error("Error:", error));
//   });
