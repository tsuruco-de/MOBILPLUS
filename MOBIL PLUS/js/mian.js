$(function () {
    /*=================================================
    スマホメニュー
===================================================*/
// $(".toggle_btn").on("click", function () {
//     ($("#header").toggleClass("open"));
//     });
//     $("#mask").on("click", function () {
//     $("#header").toggleClass("open");
//     });
//     $("#navi a").on("click", function () {
//     $("#header").toggleClass("open");
//     });


    $(".toggle_btn , #mask , #navi a").on("click", function () {
        ($("#header").toggleClass("open"));
    });
/*=================================================
スムーススクロール
===================================================*/
    // ページ内リンクのイベント
    $('a[href^="#"]').click(function () {
      // aタグのhref属性の値が#で始まる要素をクリックした時に実行する
      // 'a[href^=#]'：「aタグのhref属性で値が#で始まる要素だったとき」
      // リンクを取得 クリックされたaタグのhref属性の中身をhrefという変数に代入する （#menuなど）をhrefという変数に代入する
    let href = $(this).attr("href");
      // this: クリックされたaタグ $('a[href^=#]')
      // .attr()は、要素の属性の値を取得する

      // ジャンプ先のid名をセット href == "#" 】 変数hrefの値が"#"【 || 】 または【href == ""】  であれば（【？】）
      // 【 $('html'); 】 へのリンク（≒ページトップ）,そうでなければ（【:】）【 $(href); 】 変数hrefの中身が到着地点になる
    let target = $(href == "#" || href == "" ? "html" : href);

      // トップからジャンプ先の要素までの距離を取得 （id=menuなどがページの一番上から何pxかを取得）
    let position = target.offset().top;
      // offset()は表示位置を取得する offset().topでページの一番上から何pxかを取得

      // animateでスムーススクロールを行う ページトップからpositionだけスクロールする
      // 600はスクロール速度で単位はミリ秒 swingはイージングのひとつ
    $("html, body").animate({ scrollTop: position }, 600, "swing");
    return false;
    });
    // {scrollTop:position}で、ページトップからposition分だけスクロールするという指定をしているいる。
    // linear：常に同じ速さで動く swing：始めはゆっくり動いて、途中はちょっと速め、最後はゆっくりと動く
    // 出発地点をクリックすると、URLの末尾にIDタグ(例.https://coffee.com#menu)が付与されてしまう。
    // これを防ぐために、最後に１文return falseを追加します。
});
/*=================================================
下からフェードイン
===================================================*/
$(window).scroll(function () {
  // fadeinクラスに対して順に処理を行う
  $(".fadein").each(function () {
    // スクロールした距離
    let scroll = $(window).scrollTop();
    // fadeinクラスの要素までの距離
    let target = $(this).offset().top;
    // 画面の高さ
    let windowHeight = $(window).height();
    // fadeinクラスの要素が画面下にきてから〇px通過した
    // したタイミングで要素を表示
    if (scroll > target - windowHeight + 60) {
      $(this).css("opacity", "1");
      $(this).css("transform", "translateY(0)");
    }
  });
});

/*=================================================
跳ねてに戻る
===================================================*/
function delayScrollAnime() {
  var time = 0.2; // 遅延時間を増やす秒数の値
  var value = time;
  $('.delayscroll').each(function () {
      var parent = this; // 親要素を取得
      var elemPos = $(this).offset().top; // 要素の位置まで来たら
      var scroll = $(window).scrollTop(); // スクロール値を取得
      var windowHeight = $(window).height(); // 画面の高さを取得
      var childs = $(this).children(); // 子要素を取得

      if (scroll >= elemPos - windowHeight && !$(parent).hasClass("play")) { // 指定領域内にスクロールが入ったらまた親要素にクラスplayがなければ
          $(childs).each(function () {

              if (!$(this).hasClass("floatUp")) { // アニメーションのクラス名が指定されているかどうかをチェック

                  $(parent).addClass("play"); // 親要素にクラス名playを追加
                  $(this).css("animation-delay", value + "s"); // アニメーション遅延のCSS animation-delayを追加し
                  $(this).addClass("floatUp"); // アニメーションのクラス名を追加
                  value = value + time; // delay時間を増加させる

                  // 全ての処理を終わったらplayを外す
                  var index = $(childs).index(this);
                  if ((childs.length - 1) == index) {
                      $(parent).removeClass("play");
                  }
              }
          });
      } else {
          $(childs).removeClass("floatUp"); // アニメーションのクラス名を削除
          value = time; // delay初期値の数値に戻す
      }
  });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  delayScrollAnime(); /* アニメーション用の関数を呼ぶ */
});
function animateOnScroll() {
  $('.used-img').each(function () {
      var elemPos = $(this).offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      
      if (scroll >= elemPos - windowHeight + 100) {
          $(this).addClass('rotateX');
      } else {
          $(this).removeClass('rotateX');
      }
  });
}

// 画面をスクロールしたら動かしたい場合の記述
$(window).scroll(function () {
  animateOnScroll();
});

// ページが読み込まれたときにも動かしたい場合の記述
$(window).on('load', function () {
  animateOnScroll();
});
