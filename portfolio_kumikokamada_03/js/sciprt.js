// ====================
//ハンバーガーメニュー
// ====================
$(".hamburger-pc").click(function () {
  $(".hamburger-pc").toggleClass("open");
  $(".header__nav--pc").fadeToggle();
});

$(".hamburger-sp").click(function () {
  $(".hamburger-sp").toggleClass("open");
  $(".header__nav--sp").fadeToggle();
});

// ====================
//MVスライダー
// ====================
$(".main-visual").slick({
  arrows: false,
  autoplay: true,
  autoplaySpeed: 4000,
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
// 横スクロール (PCのみ適用・リサイズ時即時適用)
// ====================
const stickySections = [...document.querySelectorAll(".sticky_wrap")];
let isDesktop = window.innerWidth > 1000; // 初期判定
let isScrollActive = false; // スクロール適用状態を管理

function handleScroll() {
  stickySections.forEach((section) => {
    transform(section);
  });
}

function transform(section) {
  const offsetTop = section.parentElement.offsetTop;
  const sectionHeight = section.parentElement.scrollHeight;
  const scrollSection = section.querySelector(".horizontal_scroll");
  const maxScrollWidth = 16099; // 必要に応じて調整

  let percentage =
    ((window.scrollY - offsetTop) / (sectionHeight - window.innerHeight)) *
    maxScrollWidth;

  percentage = Math.max(0, Math.min(percentage, maxScrollWidth));

  scrollSection.style.transform = `translate3d(${-percentage}px, 0, 0)`;
}

// 横スクロールの有効・無効を切り替える関数
function toggleHorizontalScroll() {
  const newIsDesktop = window.innerWidth > 1000;

  if (newIsDesktop && !isScrollActive) {
    // PCでスクロールが未適用なら追加
    window.addEventListener("scroll", handleScroll);
    isScrollActive = true;
  } else if (!newIsDesktop && isScrollActive) {
    // SPになったらスクロールを解除
    window.removeEventListener("scroll", handleScroll);
    isScrollActive = false;

    // 横スクロール位置をリセット（SPでスクロールを戻す）
    stickySections.forEach((section) => {
      const scrollSection = section.querySelector(".horizontal_scroll");
      scrollSection.style.transform = "translate3d(0, 0, 0)";
    });
  }
}

// 初回適用
toggleHorizontalScroll();

// 画面リサイズ時にチェックして即時適用
window.addEventListener("resize", toggleHorizontalScroll);

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


// カーソルカスタムデザイン
const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

// マウスの動きに追従させる
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
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
