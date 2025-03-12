// ====================
//nav 回転停止用
// ====================
document.querySelectorAll(".header00 a").forEach((item) => {
  let isAnimating = false; // アニメーション中かどうかを管理
  let originalText = item.textContent; // 初期テキストを保存
  let hoverText = item.getAttribute("data-hover"); // `after` に設定されたテキストを取得

  item.addEventListener("mouseenter", () => {
    if (isAnimating) return; // すでにアニメーション中ならスキップ
    isAnimating = true; // アニメーション開始

    // 一旦 transform をリセットして再適用
    item.style.transition = "none";
    item.style.transform = "translateY(0)";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // テキストを入れ替え
        item.setAttribute("data-hover", originalText);
        item.textContent = hoverText;

        // スライドアニメーションを再適用
        item.style.transition = "transform 0.35s ease";
        item.style.transform = "translateY(-100%)";

        // 次のホバーで動作するように更新
        setTimeout(() => {
          originalText = item.textContent;
          hoverText = item.getAttribute("data-hover");
          isAnimating = false; // 次のホバーで再度動作可能に
        }, 350);
      });
    });
  });
});

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
  dots: false,
});

$(".main-visual").on(
  "beforeChange",
  function (event, slick, currentSlide, nextSlide) {
    let nextImg = $(slick.$slides[nextSlide]).find("img").attr("src");

    if (nextImg.includes("mv_nuance.jpg")) {
      $(".main-visual__tsuki img").hide(); // 一瞬で非表示
    }
  }
);

$(".main-visual").on("afterChange", function (event, slick, currentSlide) {
  let currentImg = $(".main-visual .slick-current img").attr("src");

  if (!currentImg.includes("mv_nuance.jpg")) {
    $(".main-visual__tsuki img").fadeIn(1000); // ゆっくり表示
  }
});

// ====================
//aboutページスライダー
// ====================
$("#moonandsun").slick({
  dots: true,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: "linear",
});

// ====================
// 横スクロール (PCのみ適用・リサイズ時即時適用)
// ====================
document.addEventListener("DOMContentLoaded", () => {
  const stickySections = [...document.querySelectorAll(".sticky_wrap")];
  let isDesktop = window.innerWidth > 1000;
  let isScrollActive = false;
  let currentScroll = 0;
  let targetScroll = 0;
  const scrollFactor = 0.02; // スクロールの緩やかさ調整
  let isFixed = false; // fixed 状態管理

  function handleScroll() {
    currentScroll += (targetScroll - currentScroll) * scrollFactor;

    stickySections.forEach((section) => {
      transform(section);
    });

    requestAnimationFrame(handleScroll);
  }

  function transform(section) {
    const offsetTop = section.parentElement.offsetTop;
    const sectionHeight = section.parentElement.scrollHeight;
    const scrollSection = section.querySelector(".horizontal_scroll");

    if (!scrollSection) return;

    const maxScrollWidth = scrollSection.scrollWidth - window.innerWidth;
    let percentage =
      ((currentScroll - offsetTop) / (sectionHeight - window.innerHeight)) *
      maxScrollWidth;

    percentage = Math.max(0, Math.min(percentage, maxScrollWidth));
    scrollSection.style.transform = `translate3d(${-percentage}px, 0, 0)`;

    // スクロールが終点に達したら `fixed` クラスを付与
    if (percentage >= maxScrollWidth - 10 && !isFixed) {
      scrollSection.classList.add("fixed");
      isFixed = true;
    }

    // 上にスクロールして最後の部分に差し掛かったら `fixed` クラスを削除
    if (isFixed && percentage < maxScrollWidth - 100) {
      scrollSection.classList.remove("fixed");
      isFixed = false;
    }
  }

  // 縦スクロールと連動して滑らかに横スクロールを適用
  function syncScroll() {
    if (!isDesktop) return;
    targetScroll = window.scrollY;
  }

  // 横スクロールの有効・無効を切り替える関数
  function toggleHorizontalScroll() {
    const newIsDesktop = window.innerWidth > 1000;

    if (newIsDesktop && !isScrollActive) {
      requestAnimationFrame(handleScroll);
      window.addEventListener("scroll", syncScroll);
      isScrollActive = true;
    } else if (!newIsDesktop && isScrollActive) {
      window.removeEventListener("scroll", syncScroll);
      isScrollActive = false;

      stickySections.forEach((section) => {
        const scrollSection = section.querySelector(".horizontal_scroll");
        if (scrollSection) {
          scrollSection.style.transform = "translate3d(0, 0, 0)";
          scrollSection.classList.remove("fixed"); // クラス削除
          isFixed = false;
        }
      });
    }
  }

  // 初回ページ読み込み時にスクロールを適用
  window.addEventListener("load", toggleHorizontalScroll);
  window.addEventListener("resize", toggleHorizontalScroll);
});

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
        transform: "translate(-50%, -50%) scale(1)",
      });
    } else {
      circle.css({
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%) scale(" + scaleValue + ")",
      });
    }
  }

  // `.circle-area` の上に戻ったら `absolute` に戻して小さくする
  if (scrollTop + windowHeight < areaTop) {
    circle.css({
      position: "absolute",
      top: "calc(50% - 50px)",
      left: "calc(50% - 50px)",
      transform: "scale(1)",
    });
  }
});

// ====================
//文字が右から出てくる（円が広がる箇所）
// ====================
document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.querySelector(".circle-area__text");
  const triggerPosition =
    textElement.getBoundingClientRect().top +
    window.scrollY -
    window.innerHeight * 0.8;

  window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    let progress = (scrollY - triggerPosition) / 800;
    progress = Math.min(Math.max(progress, 0), 1); // 0 ~ 1 の範囲に制限

    let translateX = 100 - progress * 100; // 100% → 0% へ変化
    let opacity = progress; // 0 → 1 へ変化

    textElement.style.transform = `translate(${translateX}%, 0)`;
    textElement.style.opacity = opacity;
  });
});


// ====================
// カーソルカスタムデザイン
const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

// マウスの動きに追従させる
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});




// ===lead文の文字色が変わるアニメーション===
// 1. 各pタグ内の文字をspanタグでラップ（日本語と英語）
    const paragraphs = document.querySelectorAll(".lead-container__text-area--ja p, .lead-container__text-area--en p");

    paragraphs.forEach(p => {
      let text = p.innerHTML;
      p.innerHTML = ""; // 元の内容を削除

      // 文字を1つずつspanでラップ
      const newText = text.split(/(<br\s*\/?>)/g).map(item => {
        if (item === "<br>" || item === "<br />") {
          return item; // <br>はそのままにする
        }
        return item.split("").map(char => `<span>${char}</span>`).join(""); // 文字をspanでラップ
      }).join(""); // 文字をspanでラップした後、全体を再構成

      p.innerHTML = newText; // 再度、pタグに適用
    });

    // 2. スクロールイベントで文字色を変化（日本語と英語）
    const spans = document.querySelectorAll(".lead-container__text-area--ja p span, .lead-container__text-area--en p span");

    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = scrollY / maxScroll; // スクロール量の割合

      spans.forEach((span, index) => {
        const threshold = (index + 1) / spans.length; // 各文字が変わるタイミング

        // スクロール量がthresholdを越えたら色を変化
        span.style.color = percentage > threshold ? "#333333" : "#C6C5C4"; // 薄いグレー (#C6C5C4) -> 黒 (#333333)

      });
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
