/* お問い合わせフォーム：送る前の入力チェック */
(function () {
  "use strict";
  var form = document.getElementById("contact-form");
  if (!form) return;

  var err = document.getElementById("form-error");
  function showError(msg, el) {
    err.textContent = msg;
    err.hidden = false;
    if (el) el.focus();
  }

  form.addEventListener("submit", function (e) {
    err.hidden = true;
    var name = form.querySelector("#f-name");
    var mail = form.querySelector("#f-mail");
    var line = form.querySelector("#f-line");
    var ig = form.querySelector("#f-ig");
    var trap = form.querySelector('input[name="_gotcha"]');

    if (trap && trap.value) { e.preventDefault(); return; } // スパム
    if (!name.value.trim()) { e.preventDefault(); return showError("お名前を入力してください。", name); }
    if (!mail.value.trim() && !line.value.trim() && !ig.value.trim()) {
      e.preventDefault(); return showError("メールアドレス・LINEの表示名・InstagramのIDの、どれか1つを入力してください。", mail);
    }
    if (mail.value.trim() && !mail.checkValidity()) {
      e.preventDefault(); return showError("メールアドレスの形をご確認ください。", mail);
    }
    if (form.getAttribute("action").indexOf("【") !== -1) {
      e.preventDefault(); return showError("（準備中）フォームの送信先がまだ設定されていません。お手数ですがLINEかInstagramのDMでご連絡ください。");
    }
  });
})();
