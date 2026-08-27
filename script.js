// ======================================
// 鹿巫女ちゃん 開運おみくじ
// 動作安定版
// ======================================


// ==============================
// 画面要素
// ==============================

const startSection =
  document.getElementById("start-section");

const startButton =
  document.getElementById("startButton");

const omikujiSection =
  document.getElementById("omikuji-section");

const loadingSection =
  document.getElementById("loading-section");

const resultSection =
  document.getElementById("result-section");

const lockSection =
  document.getElementById("lock-section");

const numberButtons =
  document.getElementById("numberButtons");

const selectedNumberText =
  document.getElementById("selectedNumber");

const fortuneButton =
  document.getElementById("fortuneButton");

const errorMessage =
  document.getElementById("errorMessage");

const loadingMessage =
  document.getElementById("loadingMessage");

const fortuneTitle =
  document.getElementById("fortuneTitle");

const fortuneImage =
  document.getElementById("fortuneImage");

const fortuneMessage =
  document.getElementById("fortuneMessage");

const recommendType =
  document.getElementById("recommendType");

const recommendGenre =
  document.getElementById("recommendGenre");

const recommendMaker =
  document.getElementById("recommendMaker");

  const specialImageBox =
  document.getElementById("specialImageBox");

const specialImage =
  document.getElementById("specialImage");

  const specialRecommend =
  document.getElementById("special-recommend");

const specialRecommendImage =
  document.getElementById("specialRecommendImage");

const specialRecommendMessage =
  document.getElementById("specialRecommendMessage");

const countdown =
  document.getElementById("countdown");


// ==============================
// 選択番号
// ==============================

let selectedNumber = null;


// ==============================
// ロック時間
// 現在は動作確認用10秒
// ==============================

const LOCK_TIME = 10 * 1000;


// ==============================
// 50個のおみくじ
// ==============================

const fortunes = {

  1: "末吉",
  2: "中吉",
  3: "最大凶",
  4: "吉",
  5: "小吉",

  6: "中凶",
  7: "大吉",
  8: "末吉",
  9: "中吉",
  10: "小凶",

  11: "吉",
  12: "小吉",
  13: "中吉",
  14: "凶",
  15: "末吉",

  16: "中吉",
  17: "小凶",
  18: "吉",
  19: "小吉",
  20: "中凶",

  21: "末吉",
  22: "大凶",
  23: "中吉",
  24: "吉",
  25: "小吉",

  26: "小凶",
  27: "中吉",
  28: "末吉",
  29: "大吉",
  30: "吉",

  31: "小吉",
  32: "中凶",
  33: "末吉",
  34: "中吉",
  35: "小凶",

  36: "吉",
  37: "小吉",
  38: "中吉",
  39: "末吉",
  40: "凶",

  41: "吉",
  42: "小吉",
  43: "中凶",
  44: "末吉",
  45: "最超吉",

  46: "小凶",
  47: "中吉",
  48: "吉",
  49: "小吉",
  50: "末吉"

};


// ==============================
// 運勢データ
// ==============================

const fortuneData = {

  "最超吉": {
  image: "images/saichokichi.png",
  message:
    "✨ 今日は神がかった1日に！？<br>" +
    "何をやっても上手くいくかも！？"
},

  "大吉": {
    image: "images/daikichi.png",
    message:
      "🎉 今日はかなり良い流れ！<br>" +
      "気になっていた台に挑戦するチャンスかも！"
  },

  "中吉": {
    image: "images/chukichi.png",
    message:
      "😊 なかなか良い感じ！<br>" +
      "いつもと少し違う選択もアリかも？"
  },

  "小吉": {
    image: "images/shokichi.png",
    message:
      "🙂 小さなラッキーを探す日！<br>" +
      "意外なところにお気に入りがあるかも！？"
  },

  "吉": {
    image: "images/kichi.png",
    message:
      "✨ 悪くないですよ！<br>" +
      "今日は自分の直感を信じてみよう！"
  },

  "末吉": {
    image: "images/suekichi.png",
    message:
      "😅 まだ本気を出していないだけ…！<br>" +
      "ここから流れが変わるかも！？"
  },

  "小凶": {
    image: "images/shokyo.png",
    message:
      "😟 あれれ…？<br>" +
      "今日は無理せず、気楽に楽しもう！"
  },

  "中凶": {
    image: "images/chukyo.png",
    message:
      "😢 ちょっと不穏な空気…<br>" +
      "でも鹿巫女ちゃんは、まだ諦めません！"
  },

  "凶": {
    image: "images/kyo.png",
    message:
      "😭 もう死んでいる……？<br>" +
      "いや待って！あなた、北斗真拳の使い手ですか！？"
  },

  "大凶": {
    image: "images/daikyo.png",
    message:
      "💧 かなり来ています……<br>" +
      "でも今日が底なら、あとは上がるだけ！？"
  },

 "最大凶": {
  image: "images/saidaikyo.png",
  message:
    "💀 運気も燃え尽きた……。<br>" +
    "でも、ここまで下がったなら、あとは上昇するだけだから……っ！"
}

};


// ==============================
// 50番号のおすすめ
// ==============================

const numberData = {

  1: {
    type: "今日は店内をゆっくり見て回ろう",
    genre: "メダル機",
    maker: "うっすら光が差している場所がある…かも？"
  },

  2: {
    type: "安定感のある定番タイプ",
    genre: "Aタイプ",
    maker: "いつものお気に入りメーカー"
  },

  3: {
    type: "ここからの大逆転を狙う",
    genre: "スマスロ",
    maker: "一撃に期待できるメーカー"
  },

  4: {
    type: "自分の直感を信じる",
    genre: "スマスロ",
    maker: "気になったメーカー"
  },

  5: {
    type: "気軽に楽しむ",
    genre: "Aタイプ",
    maker: "定番メーカー以外もチェック"
  },

  6: {
    type: "慎重にスタート",
    genre: "メダル機",
    maker: "昔からあるメーカー"
  },

   7: {
    type: "気軽に楽しめる定番タイプ",
    genre: "Aタイプ",
    maker: "光る瞬間を楽しもう！",
  },

  8: {
    type: "新しい発見を探す",
    genre: "マイナー機種",
    maker: "普段選ばないメーカー"
  },

  9: {
    type: "自分の右手と直感を信じる",
    genre: "人気スマスロ",
    maker: "今日は右手が疼くかも……",
  },

  10: {
    type: "無理せず遊ぶ",
    genre: "Aタイプ",
    maker: "安心できるメーカー"
  },

  11: {
    type: "今日はメダルの感触を楽しむ",
    genre: "メダル機",
    maker: "老舗メーカー"
  },

  12: {
    type: "少し変わった台に挑戦",
    genre: "マイナー機種",
    maker: "普段あまり選ばないメーカー"
  },

 13: {
    type: "食欲も運気も大盛りで！",
    genre: "人気スマスロ",
    maker: "今日は思い切って大盛りに挑戦！？",
  },

  14: {
    type: "今日は慎重派で",
    genre: "好きなジャンル",
    maker: "いつものメーカー"
  },

  15: {
    type: "まだまだここから",
    genre: "メダル機",
    maker: "何かが光る場所を探してみる…？"
  },

  16: {
    type: "新しい流れを作る",
    genre: "最新台",
    maker: "まずは新台コーナーをチェック"
  },

  17: {
    type: "遊びやすさ重視",
    genre: "Aタイプ",
    maker: "定番メーカー"
  },

   18: {
    type: "気合いを入れて挑戦！",
    genre: "人気スマスロ",
    maker: "まずは気合いのひと声！「押忍！」",
  },

19: {
  type: "いつもと違う選択",
  genre: "マイナー機種",
  maker: "今日はどうしても譲れないものがあるかも……",
  
},

  20: {
    type: "休憩しながらゆっくり",
    genre: "メダル機",
    maker: "安心感のあるメーカー"
  },

  21: {
    type: "気楽に遊技",
    genre: "Aタイプ",
    maker: "淡い光の気配を探してみよう…"
  },

  22: {
    type: "今日は逆転の発想",
    genre: "スマスロ",
    maker: "意外なメーカー"
  },

   23: {
    type: "心のままに楽しむ",
    genre: "人気スマスロ",
    maker: "今日はココロがとまらない……！",
  },


  24: {
    type: "自分の好きなスタイル",
    genre: "メダル機",
    maker: "気になるメーカー"
  },

  25: {
    type: "ちょっと冒険",
    genre: "マイナー機種",
    maker: "普段触らないメーカー"
  },

  26: {
    type: "慎重に楽しむ",
    genre: "Aタイプ",
    maker: "安心できるメーカー"
  },

 27: {
  type: "流れに乗る",
  genre: "スマスロ",
  maker: "今日は何だかワクワクが止まらない！",
  
},

  28: {
    type: "新しい発見",
    genre: "メダル機",
    maker: "隠れた名機を探してみよう"
  },

   29: {
    type: "今日は少し強気に！",
    genre: "人気スマスロ",
    maker: "強敵との出会いに縁がありそう……",
  },

  30: {
    type: "安定感重視",
    genre: "Aタイプ",
    maker: "定番メーカー"
  },

  31: {
    type: "のんびり楽しむ",
    genre: "メダル機",
    maker: "いつものメーカー"
  },

  32: {
    type: "気分転換",
    genre: "マイナー機種",
    maker: "新しいメーカーをチェック"
  },

  33: {
    type: "眠っている運気を探す",
    genre: "Aタイプ",
    maker: "淡い光が見える場所があるかも？"
  },

  34: {
    type: "王道で勝負",
    genre: "人気スマスロ",
    maker: "有名メーカー"
  },

  35: {
    type: "今日は無理せず",
    genre: "好きなジャンル",
    maker: "いつものメーカー"
  },

  36: {
    type: "気になる新台をチェック",
    genre: "最新台",
    maker: "新しいメーカー"
  },

  37: {
    type: "小さな冒険",
    genre: "マイナー機種",
    maker: "知らなかったメーカー"
  },

  38: {
  type: "今日は勢い重視",
  genre: "スマスロ",
  maker: "バトル系メーカー"
},

  
  39: {
    type: "焦らずゆっくり",
    genre: "メダル機",
    maker: "安心感のあるメーカー"
  },

  40: {
    type: "無理せず楽しむ",
    genre: "好きなジャンル",
    maker: "いつものメーカー"
  },

  41: {
    type: "直感で選ぶ",
    genre: "スマスロ",
    maker: "気になるメーカー"
  },

  42: {
    type: "新しい楽しみ方",
    genre: "Aタイプ",
    maker: "いつもと違うメーカー"
  },

  43: {
    type: "慎重にスタート",
    genre: "メダル機",
    maker: "落ち着いたメーカー"
  },

  44: {
    type: "まだ見つけていない台を探す",
    genre: "マイナー機種",
    maker: "隠れたメーカー"
  },

  45: {
    type: "今日は自由に選んでOK！",
    genre: "最新台・人気台",
    maker: "鹿巫女ちゃんが全部おすすめ！"
  },

  46: {
    type: "気楽に楽しむ",
    genre: "Aタイプ",
    maker: "定番メーカー"
  },

  47: {
    type: "今日は挑戦の日",
    genre: "スマスロ",
    maker: "普段選ばないメーカー"
  },

  48: {
    type: "新台をチェック",
    genre: "最新台",
    maker: "話題のメーカー"
  },

  49: {
    type: "意外な一台を探す",
    genre: "マイナー機種",
    maker: "知らなかったメーカー"
  },

  50: {
    type: "最後は自分の直感！",
    genre: "好きなジャンル",
    maker: "気になったメーカー"
  }

};
// ==============================
// 特殊版画像
// ==============================

const specialImages = {

  3: "images/images-saidaikyo-special.png",

  7: "images/images-juggler-special.png",

  9: "images/images-toaru-special.png",

  13: "images/images-godeater-special.png",

  18: "images/images-bancho-special.png",

  23: "images/images-monkey-special.png",

  29: "images/images-hokuto-special.png",

  38: "images/images-guspecial.png",

  45: "images/images-saichokichi-special.png"

};

// ==============================
// 画面切り替え
// ==============================

function showScreen(screen) {

  startSection.classList.add("hidden");
  omikujiSection.classList.add("hidden");
  loadingSection.classList.add("hidden");
  resultSection.classList.add("hidden");
  lockSection.classList.add("hidden");

  screen.classList.remove("hidden");

}


// ==============================
// 50個の番号ボタンを作る
// ==============================

function createNumberButtons() {

  numberButtons.innerHTML = "";

  for (let i = 1; i <= 50; i++) {

    const button =
      document.createElement("button");

    button.type = "button";
    button.textContent = i;
    button.className = "number-button";

    button.addEventListener(
      "click",
      function () {

        document
          .querySelectorAll(".number-button")
          .forEach(
            function (btn) {
              btn.classList.remove("selected");
            }
          );

        selectedNumber = i;

        button.classList.add("selected");

        selectedNumberText.textContent =
          "🎋 " + i + "番を選択中";

      }
    );

    numberButtons.appendChild(button);

  }

}


// ==============================
// おみくじ実行
// ==============================

function showFortune() {

  errorMessage.textContent = "";

  const number = selectedNumber;

  if (
    !Number.isInteger(number) ||
    number < 1 ||
    number > 50
  ) {

    errorMessage.textContent =
      "1〜50の番号を選択してください！";

    return;

  }

  const fortune =
    fortunes[number];

  const fortuneInfo =
    fortuneData[fortune];

  const recommendInfo =
    numberData[number];

  if (
    !fortune ||
    !fortuneInfo ||
    !recommendInfo
  ) {

    errorMessage.textContent =
      "運勢データが見つかりません。";

    return;

  }


  // ==============================
  // 特殊演出
  // ==============================

  resultSection.classList.remove(
    "saichokichi-effect",
    "saidaikyo-effect"
  );

  if (fortune === "最超吉") {

    resultSection.classList.add(
      "saichokichi-effect"
    );

  }

  if (fortune === "最大凶") {

    resultSection.classList.add(
      "saidaikyo-effect"
    );

  }


  // ==============================
  // 結果セット
  // ==============================

  fortuneTitle.textContent =
    "【 " + fortune + " 】";

  fortuneImage.src =
    fortuneInfo.image;

  fortuneMessage.innerHTML =
    fortuneInfo.message;

  recommendType.textContent =
    recommendInfo.type;

  recommendGenre.textContent =
    recommendInfo.genre;

  recommendMaker.textContent =
    recommendInfo.maker;
// ==============================
// 特殊版画像
// ==============================

// まず非表示にする
specialImageBox.classList.add("hidden");
specialImage.src = "";

// 特殊画像が設定されている番号なら表示
if (specialImages[number]) {

  specialImage.src =
    specialImages[number];

  specialImageBox.classList.remove("hidden");

}
    // 特殊おすすめをリセット

if (specialRecommend) {
  specialRecommend.classList.add("hidden");
}


// 特殊おすすめがある場合だけ表示

if (
  recommendInfo.specialImage &&
  specialRecommend
) {

  specialRecommendImage.src =
    recommendInfo.specialImage;

  specialRecommendMessage.textContent =
    recommendInfo.specialMessage || "";

  specialRecommend.classList.remove("hidden");

}


  // ==============================
  // 診断中
  // ==============================

  loadingMessage.innerHTML =
    "🔮 運気を確認中…";

  showScreen(
    loadingSection
  );


  setTimeout(
    function () {

      loadingMessage.innerHTML =
        "⛩ 鹿巫女ちゃんが<br>" +
        "神様にお願い中…！";

    },
    1000
  );


  setTimeout(
    function () {

      loadingMessage.innerHTML =
        "✨ 本日の運勢を<br>" +
        "決定中…！！";

    },
    2000
  );


  setTimeout(
    function () {

      showScreen(
        resultSection
      );

    },
    3000
  );

}


createNumberButtons();


// 秋のスタート画面
// ↓
// おみくじ番号選択画面

startButton.addEventListener(
  "click",
  function () {

    showScreen(omikujiSection);

  }
);


// 番号選択後の占うボタン

fortuneButton.addEventListener(
  "click",
  showFortune
);


// 最初に表示する画面

showScreen(startSection);


// 動作確認

console.log(
  "鹿巫女ちゃん script.js 読み込み完了"
);

console.log(
  "番号ボタン数:",
  numberButtons.children.length
);