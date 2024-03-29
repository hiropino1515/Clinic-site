
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
  // ドロワーメニュー
  $(".js-hamburger").click(function () {
    if ($(".js-hamburger").hasClass("is-active")) {
      $(".js-hamburger").removeClass('is-active');
      $("body").removeClass('is-active');
      $(".js-sp-nav").fadeOut(300);
      $(".header").css('background', '#FFFFFF');
    } else {
      $(".js-hamburger").addClass('is-active');
      $("body").addClass('is-active');
      $(".js-sp-nav").fadeIn(300);
      $(".header").css('background', '#0060A0');
    }
  });

  // グローバルナビメニューのリンクをクリックしたらページを閉じる
  $(function () {
    $(".js-sp-nav ul li a").on("click", function () {
      $(".js-hamburger").removeClass('is-active');
      $(".js-sp-nav").fadeOut(300);
      $(".header").css('background', '#FFFFFF');
    });
  });

  // fv__swiper
  var swiper = new Swiper(".js-fv-swiper", {
    loop: true,
    clickable: true,
    effect: 'fade', // フェードのエフェクト
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 2000, // 2.5秒かけながら次の画像へ移動
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });

  // ページトップボタン
  $(function () {
    const pageTop = $("#to-top");
    pageTop.hide();
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        pageTop.fadeIn();
      } else {
        pageTop.fadeOut();
      }
    });
    pageTop.click(function () {
      $("body,html").animate(
        {
          scrollTop: 0,
        },
        500
      );
      return false;
    });
  });

  // ページ内リンクの処理
  $(function () {
    $('a[href*="#"]').on('click', function () {
      var scrollSpeed = 400;
      var navigationHeight = $(".header").innerHeight();
      var scrollToTarget = $(this.hash === '#' || '' ? 'html' : this.hash);
      if (!scrollToTarget.length) return;
      var scrollPosition = scrollToTarget.offset().top - navigationHeight - 60;
      $('html, body').animate({
        scrollTop: scrollPosition
      }, scrollSpeed, 'swing');
      return false;
    });
  });

  // ページ読み込み時の処理
  $(document).ready(function () {
    var navigationHeight = $(".header").innerHeight();
    var hash = window.location.hash;
    if (hash && $(hash).length) {
      var scrollPosition = $(hash).offset().top - navigationHeight - 60;
      $('html, body').animate({
        scrollTop: scrollPosition
      }, 400, 'swing');
    }
  });



  // director__swiper
  const newSwiper = new Swiper('.director__swiper', {
    loop: true,
    slidesPerView: "auto",
    autoplay: {
        delay: 0,
    },
    speed: 3000,

    spaceBetween: 10,
    breakpoints: {
      768: {
        spaceBetween: 20,
      },
    },
  });

  // ContactForm
  $(function() {
    // 全てのアラート文を非表示にする
    $(".alert").hide();

    // 各入力フィールドの変更イベントを監視し、エラーメッセージを非表示にする
    $("#contactText, #contactText2, #contactTel, #contactEmail, #contactTextarea").change(function() {
        // エラーメッセージを非表示にする
        $(this).closest('.form__item').find('.alert').hide();
    });

    function validateForm() {
        // チェック用の変数sendFlag
        var sendFlag = true;

        // textフィールドのチェック
        if(!$("#contactText").val()){
            $("#contactTextSection .alert").show();
            sendFlag = false;
        }else{
            $("#contactTextSection .alert").hide();
        }

        // textフィールドのチェック
        if(!$("#contactText2").val()){
            $("#contactTextSection2 .alert").show();
            sendFlag = false;
        }else{
            $("#contactTextSection2 .alert").hide();
        }

        // telフィールドのチェック
        if(!$("#contactTel").val()){
            $("#contactTelSection .alert").show();
            sendFlag = false;
        }else{
            $("#contactTelSection .alert").hide();
        }

        // emailフィールドのチェック
        if(!$("#contactEmail").val()){
            $("#contactEmailSection .alert").show();
            sendFlag = false;
        }else{
            $("#contactEmailSection .alert").hide();
        }

        // ラジオボタンのチェック
        var radioChk = $('input[name="contactRadio"]:checked').length;
        if(radioChk === 0) {
            $("#contactRadioSection .alert").show();
            sendFlag = false;
        }else{
            $("#contactRadioSection .alert").hide();
        }

        // チェックボックスのチェック
        var checkboxChk = $('input[name="contactCheckbox"]:checked').length;
        if(checkboxChk === 0){
            $("#contactCheckSection .alert").show();
            sendFlag = false;
        }else{
            $("#contactCheckSection .alert").hide();
        }

        // セレクトボックスのチェック
        if($("#contactSelect").val() == "none") {
            $("#contactSelectSection .alert").show();
            sendFlag = false;
        }else{
            $("#contactSelectSection .alert").hide();
        }

        // 複数行入力フィールドのチェック
        if(!$("#contactTextarea").val()) {
            $("#contactTextareaSection .alert").show();
            sendFlag = false;
        }else{
            $("#contactTextareaSection .alert").hide();
        }

        return sendFlag;
      }
      $("#contactSubmitBtn").click(function(event) {
        event.preventDefault(); // フォームのデフォルトの送信を防ぐ

        if (validateForm()) {
            console.log("フォームが正常に送信されました");
            alert("送信成功！");
            // フォームが送信された後に特定のページにリダイレクトする
            window.location.href = "page-contact-thanks.html"; // 送信成功時にリダイレクト
        } else {
            console.log("送信がキャンセルされました");
            // エラーメッセージを追加
            $(".form__button").append('<p class="alert-message">入力に問題があります。確認して再度お試しください。</p>');
        }
    });
  });

  // ReservationForm
  $(function() {
    // 全てのアラート文を非表示にする
    $(".alert").hide();

    // 各入力フィールドの変更イベントを監視し、エラーメッセージを非表示にする
    $("#text, #text2, #tel, #email, input[name='radio'], input[name='checkbox'], select, #textarea").change(function() {
      // エラーメッセージを非表示にする
      $(this).closest('.form__item').find('.alert').hide();
    });

      $("#submitBtn").click(function() {
        // チェック用の変数sendFlag
        var sendFlag = true;

        // textフィールドのチェック
        if(!$("#text").val()){
          $("#textSection .alert").show();
          sendFlag = false;
        }else{
          $("#textSection .alert").hide();
        }

        // textフィールドのチェック
        if(!$("#text2").val()){
          $("#textSection2 .alert").show();
          sendFlag = false;
        }else{
          $("#textSection2 .alert").hide();
        }

        // telフィールドのチェック
        if(!$("#tel").val()){
          $("#telSection .alert").show();
          sendFlag = false;
        }else{
          $("#telSection .alert").hide();
        }

        // emailフィールドのチェック
        if(!$("#email").val()){
          $("#emailSection .alert").show();
          sendFlag = false;
        }else{
          $("#emailSection .alert").hide();
        }

        // ラジオボタンのチェック
        var radioChk = $('input[name="radio"]:checked').length;
        if(radioChk === 0) {
          $("#radioSection .alert").show();
          sendFlag = false;
        }else{
          $("#radioSection .alert").hide();
        }

        // チェックボックスのチェック
        var checkboxChk = $('input[name="checkbox"]:checked').length;
        if(checkboxChk === 0){
          $("#checkSection .alert").show();
          sendFlag = false;
        }else{
          $("#checkSection .alert").hide();
        }

        // セレクトボックスのチェック
        if($("select").val() == "none") {
          $("#selectSection .alert").show();
          sendFlag = false;
        }else{
          $("#selectSection .alert").hide();
        }

        // 複数行入力フィールドのチェック
        if(!$("#textarea").val()) {
          $("#textareaSection .alert").show();
          sendFlag = false;
        }else{
          $("#textareaSection .alert").hide();
        }

        // 変数sendFlagの値をチェック
        if(sendFlag === false){
          if($(".alert-message").length === 0) { // エラーメッセージがまだ表示されていない場合のみ追加
              $(".form__button").append('<p class="alert-message">入力に問題があります。確認して再度お試しください。</p>');
          }
          return false; // フォーム送信をキャンセル
        } else {
            alert("送信成功！");
            window.location.href = "page-reservation-thanks.html"; // 送信成功時にリダイレクト
            // フォームが送信された後に特定のページにリダイレクトする
            return true; // フォーム送信を許可
        }
      });
  });
});

