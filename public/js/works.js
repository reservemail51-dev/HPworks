/* 制作実績の一覧（works.html）と詳細（work.html）を data/works.js から表示する */
(function () {
  "use strict";
  var WORKS = window.WORKS || [];
  var LABEL = window.WORK_TYPE_LABEL || {};
  var card = window.renderWorkCard;
  var esc = window.escHtml;
  var FILTER_NAME = { client: "制作実績", sample: "自主制作サンプル", design: "デザイン" };
  var BRAND = "【仮：屋号】";

  /* ---------- 一覧 ---------- */
  var grid = document.getElementById("works-list");
  var filter = document.getElementById("works-filter");
  if (grid && card) {
    // 新しい順（同じ年はデータの順のまま）
    var list = WORKS.slice().sort(function (a, b) { return (b.year || 0) - (a.year || 0); });

    var render = function (type) {
      var items = type === "all" ? list : list.filter(function (w) { return w.type === type; });
      grid.innerHTML = items.length
        ? items.map(card).join("")
        : '<p class="works-empty">ただいま準備中です。少しずつ増やしていきます。</p>';
    };

    if (filter) {
      // 0件の種類はボタンを出さない。種類が1つだけなら絞り込み自体を出さない
      var types = ["client", "sample", "design"].filter(function (t) {
        return list.some(function (w) { return w.type === t; });
      });
      if (types.length > 1) {
        var html = '<button type="button" data-type="all" aria-pressed="true">すべて<span>' + list.length + "</span></button>";
        types.forEach(function (t) {
          var n = list.filter(function (w) { return w.type === t; }).length;
          html += '<button type="button" data-type="' + t + '" aria-pressed="false">' + FILTER_NAME[t] + "<span>" + n + "</span></button>";
        });
        filter.innerHTML = html;
        filter.addEventListener("click", function (e) {
          var btn = e.target.closest("button");
          if (!btn) return;
          filter.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
          render(btn.getAttribute("data-type"));
        });
      } else {
        filter.hidden = true;
      }
    }
    render("all");
  }

  /* ---------- 詳細 ---------- */
  var detail = document.getElementById("work-detail");
  if (detail) {
    var id = new URLSearchParams(location.search).get("id") || decodeURIComponent(location.hash.slice(1));
    var w = WORKS.filter(function (x) { return x.id === id; })[0];
    if (!w) {
      detail.innerHTML =
        "<h1>お探しの実績が見つかりませんでした</h1>" +
        "<p>URLが変わったか、掲載を終了した可能性があります。</p>" +
        '<p><a class="link-arrow" href="works.html">制作実績の一覧へ</a></p>';
      return;
    }
    document.title = w.title + "｜制作実績｜" + BRAND;
    var crumb = document.getElementById("crumb-title");
    if (crumb) crumb.textContent = w.title;

    var imgs = w.images || [];
    var pc = imgs.filter(function (p) { return /pc\./.test(p); })[0] || imgs[0];
    var sp = imgs.filter(function (p) { return /sp\./.test(p); })[0] || imgs[1];
    var dummy = function (label) { return '<div class="dummy">画像準備中<br>images/works/' + esc(w.id) + "/（" + label + "）</div>"; };

    var html = "";
    html += '<div class="work-detail__head"><span class="badge badge--' + esc(w.type) + '">' + esc(LABEL[w.type] || "") + "</span>" +
            '<span class="small">' + esc(w.industry) + "</span></div>";
    html += '<h1 class="work-detail__title">' + esc(w.title) + "</h1>";
    if (w.type === "sample") {
      html += '<p class="fict-box"><strong>このお店は実在しない架空の店舗です。</strong>ホームページの制作例としてつくったサンプルで、店名・住所・電話番号・人物・メニュー・写真などはすべて架空のものです（写真はAIで生成したイメージです）。</p>';
    }
    html += '<p class="work-detail__summary">' + esc(w.summary).replace(/^【架空の店舗】/, "") + "</p>";

    html += '<div class="work-detail__shots">' +
      '<figure class="shot-pc"><div class="shot-pc__bar" aria-hidden="true"><span></span><span></span><span></span></div>' +
        (pc ? '<img src="' + esc(pc) + '" alt="' + esc(w.title) + 'のサイトをパソコンで見た画面" width="1600" height="1000">' : dummy("パソコン")) +
        "<figcaption>パソコンで見たとき</figcaption></figure>" +
      '<figure class="shot-sp"><div class="work-card__phone">' +
        (sp ? '<img src="' + esc(sp) + '" alt="' + esc(w.title) + 'のサイトをスマホで見た画面" width="390" height="844">' : dummy("スマホ")) +
        "</div><figcaption>スマホで見たとき</figcaption></figure>" +
      "</div>";

    html += '<div class="work-detail__body"><div>';
    if (w.points && w.points.length) {
      html += '<h2>こだわったところ</h2><ul class="checks">' + w.points.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>";
    }
    if (w.voice) {
      html += '<div class="voice"><h2>お客様の声</h2><p>' + esc(w.voice) + "</p></div>";
    }
    html += "</div><div>";
    html += '<dl class="spec">' +
      "<div><dt>業種</dt><dd>" + esc(w.industry) + "</dd></div>" +
      "<div><dt>地域</dt><dd>" + esc(w.area) + "</dd></div>" +
      "<div><dt>規模</dt><dd>" + esc(w.plan) + "</dd></div>" +
      "<div><dt>制作年</dt><dd>" + esc(w.year) + "年</dd></div>" +
      "</dl>";
    if (w.url) {
      html += '<p><a class="btn btn--main btn--block" href="' + esc(w.url) + '" target="_blank" rel="noopener">' +
        (w.type === "sample" ? "サンプルサイトを見る（架空の店舗）" : "サイトを見る") + "</a></p>";
    }
    html += "</div></div>";
    html += '<p class="sec-more"><a class="link-arrow" href="works.html">制作実績の一覧へ</a></p>';
    detail.innerHTML = html;
  }
})();
