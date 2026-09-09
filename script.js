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

  const numberImageBox =
  document.getElementById("number-image-box");

const numberFortuneImage =
  document.getElementById("numberFortuneImage");

const numberFortuneMessage =
  document.getElementById("numberFortuneMessage");

const recommendType =
  document.getElementById("recommendType");

const recommendGenre =
  document.getElementById("recommendGenre");

const maker1Stars = document.getElementById("maker1Stars");
const maker1Name = document.getElementById("maker1Name");

const maker2Stars = document.getElementById("maker2Stars");
const maker2Name = document.getElementById("maker2Name");
const maker1Row = document.getElementById("maker1Row");
const maker2Row = document.getElementById("maker2Row");

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
    type: "演出を楽しむタイプ",
    genre: "王道・演出重視",
    maker1: "ビスティ",
    maker1Stars: 5,
    maker2: "サミー",
    maker2Stars: 3
  },

  2: {
    type: "展開を楽しむタイプ",
    genre: "王道・演出重視",
    maker1: "ビスティ",
    maker1Stars: 5,
    maker2: "平和",
    maker2Stars: 4
  },

  3: {
    type: "一発逆転を狙うタイプ",
    genre: "逆転・勝負系",
    maker1: "―",
    maker1Stars: 5,
    maker2: "サミー",
    maker2Stars: 3
  },

  4: {
    type: "のんびり楽しむタイプ",
    genre: "ゆったり・海系",
    maker1: "三洋物産",
    maker1Stars: 5,
    maker2: "京楽",
    maker2Stars: 3
  },

  5: {
    type: "展開を楽しむタイプ",
    genre: "チャンス重視",
    maker1: "大都技研",
    maker1Stars: 5,
    maker2: "藤商事",
    maker2Stars: 3
  },

  6: {
    type: "気軽に楽しむタイプ",
    genre: "シンプル・告知系",
    maker1: "北電子",
    maker1Stars: 5,
    maker2: "SANKYO",
    maker2Stars: 3
  },

  7: {
    type: "気軽に楽しむタイプ",
    genre: "シンプル・告知系",
    maker1: "北電子",
    maker1Stars: 5,
    maker2: "平和",
    maker2Stars: 3
  },

  8: {
    type: "のんびり楽しむタイプ",
    genre: "ゆったり・海系",
    maker1: "三洋物産",
    maker1Stars: 5,
    maker2: "サミー",
    maker2Stars: 3
  },

  9: {
    type: "展開を楽しむタイプ",
    genre: "能力・右手系",
    maker1: "藤商事",
    maker1Stars: 5,
    maker2: "平和",
    maker2Stars: 3
  },

  10: {
    type: "無理せず楽しむタイプ",
    genre: "波のあるタイプ",
    maker1: "藤商事",
    maker1Stars: 5,
    maker2: "京楽",
    maker2Stars: 3
  },

  11: {
    type: "演出を楽しむタイプ",
    genre: "チャンス・能力系",
    maker1: "藤商事",
    maker1Stars: 5,
    maker2: "サミー",
    maker2Stars: 3
  },

  12: {
    type: "流れを楽しむタイプ",
    genre: "スピード感重視",
    maker1: "藤商事",
    maker1Stars: 5,
    maker2: "SANKYO",
    maker2Stars: 3
  },

  13: {
    type: "勢い重視タイプ",
    genre: "バトル・挑戦系",
    maker1: "山佐",
    maker1Stars: 5,
    maker2: "平和",
    maker2Stars: 3
  },

  14: {
    type: "無理せず楽しむタイプ",
    genre: "バトル・挑戦系",
    maker1: "山佐",
    maker1Stars: 5,
    maker2: "京楽",
    maker2Stars: 3
  },

  15: {
    type: "展開を楽しむタイプ",
    genre: "ファンタジー系",
    maker1: "大都技研",
    maker1Stars: 5,
    maker2: "サミー",
    maker2Stars: 3
  },

  16: {
    type: "演出を楽しむタイプ",
    genre: "魔法・ファンタジー系",
    maker1: "メーシー",
    maker1Stars: 5,
    maker2: "SANKYO",
    maker2Stars: 3
  },

  17: {
    type: "遊びやすさ重視",
    genre: "漢気・勝負系",
    maker1: "大都技研",
    maker1Stars: 5,
    maker2: "平和",
    maker2Stars: 3
  },

  18: {
    type: "勢い重視タイプ",
    genre: "漢気・バトル系",
    maker1: "大都技研",
    maker1Stars: 5,
    maker2: "サミー",
    maker2Stars: 3
  },

  19: {
    type: "本能で楽しむタイプ",
    genre: "怪獣・バトル系",
    maker1: "SANKYO",
    maker1Stars: 5,
    maker2: "京楽",
    maker2Stars: 3
  },

  20: {
    type: "ゆっくり楽しむタイプ",
    genre: "レース・勝負系",
    maker1: "山佐",
    maker1Stars: 5,
    maker2: "平和",
    maker2Stars: 3
  },

  21: {
    type: "演出を楽しむタイプ",
    genre: "電撃・能力系",
    maker1: "藤商事",
    maker1Stars: 5,
    maker2: "京楽",
    maker2Stars: 3
  },

  22: {
    type: "一発逆転を狙うタイプ",
    genre: "バトル・勝負系",
    maker1: "サミー",
    maker1Stars: 5,
    maker2: "大都技研",
    maker2Stars: 3
  },

  23: {
    type: "勢い重視タイプ",
    genre: "レース・スピード系",
    maker1: "山佐",
    maker1Stars: 5,
    maker2: "SANKYO",
    maker2Stars: 3
  },

  24: {
    type: "展開を楽しむタイプ",
    genre: "能力・電撃系",
    maker1: "藤商事",
    maker1Stars: 5,
    maker2: "サミー",
    maker2Stars: 3
  },

  25: {
    type: "勢い重視タイプ",
    genre: "戦国・乙女系",
    maker1: "平和",
    maker1Stars: 5,
    maker2: "京楽",
    maker2Stars: 3
  },

  26: {
    type: "無理せず楽しむタイプ",
    genre: "魔法・ファンタジー系",
    maker1: "メーシー",
    maker1Stars: 5,
    maker2: "サミー",
    maker2Stars: 3
  },

  27: {
    type: "展開を楽しむタイプ",
    genre: "能力・バトル系",
    maker1: "藤商事",
    maker1Stars: 5,
    maker2: "平和",
    maker2Stars: 3
  },

  28: {
    type: "演出を楽しむタイプ",
    genre: "怪獣・バトル系",
    maker1: "SANKYO",
    maker1Stars: 5,
    maker2: "サミー",
    maker2Stars: 3
  },

  29: {
    type: "勢い重視タイプ",
    genre: "バトル・勝負系",
    maker1: "サミー",
    maker1Stars: 5,
    maker2: "京楽",
    maker2Stars: 3
  },

  30: {
    type: "演出を楽しむタイプ",
    genre: "激アツ・演出系",
    maker1: "SANKYO",
    maker1Stars: 5,
    maker2: "平和",
    maker2Stars: 3
  },

  31: {
    type: "のんびり楽しむタイプ",
    genre: "待ち・保留系",
    maker1: "藤商事",
    maker1Stars: 5,
    maker2: "京楽",
    maker2Stars: 3
  },

  32: {
    type: "展開を楽しむタイプ",
    genre: "能力・電撃系",
    maker1: "藤商事",
    maker1Stars: 5,
    maker2: "サミー",
    maker2Stars: 3
  },

  33: {
    type: "勢い重視タイプ",
    genre: "戦国・バトル系",
    maker1: "平和",
    maker1Stars: 5,
    maker2: "大都技研",
    maker2Stars: 3
  },

  34: {
    type: "ボタン演出を楽しむタイプ",
    genre: "PUSH・演出系",
    maker1: "SANKYO",
    maker1Stars: 5,
    maker2: "京楽",
    maker2Stars: 3
  },

  35: {
    type: "演出を楽しむタイプ",
    genre: "激アツ・演出系",
    maker1: "SANKYO",
    maker1Stars: 5,
    maker2: "藤商事",
    maker2Stars: 3
  },

  36: {
    type: "じっくり楽しむタイプ",
    genre: "ハマり・粘り系",
    maker1: "サミー",
    maker1Stars: 5,
    maker2: "平和",
    maker2Stars: 3
  },

  37: {
    type: "直感重視タイプ",
    genre: "台選び・運試し系",
    maker1: "―",
    maker1Stars: 5,
    maker2: "サミー",
    maker2Stars: 4
  },

  38: {
    type: "本能で楽しむタイプ",
    genre: "バトル・サバイバル系",
    maker1: "SANKYO",
    maker1Stars: 5,
    maker2: "藤商事",
    maker2Stars: 3
  },

  39: {
    type: "のんびり楽しむタイプ",
    genre: "待ち・保留系",
    maker1: "藤商事",
    maker1Stars: 5,
    maker2: "三洋物産",
    maker2Stars: 3
  },

  40: {
    type: "無理せず楽しむタイプ",
    genre: "バトル・サバイバル系",
    maker1: "SANKYO",
    maker1Stars: 5,
    maker2: "サミー",
    maker2Stars: 3
  },

  41: {
    type: "ボタン演出を楽しむタイプ",
    genre: "PUSH・演出系",
    maker1: "京楽",
    maker1Stars: 5,
    maker2: "平和",
    maker2Stars: 3
  },

  42: {
    type: "勢い重視タイプ",
    genre: "レバー・操作系",
    maker1: "ユニバーサル",
    maker1Stars: 5,
    maker2: "大都技研",
    maker2Stars: 3
  },

  43: {
    type: "タイミング重視タイプ",
    genre: "目押し・リズム系",
    maker1: "北電子",
    maker1Stars: 5,
    maker2: "山佐",
    maker2Stars: 3
  },

  44: {
    type: "直感重視タイプ",
    genre: "台選び・運試し系",
    maker1: "―",
    maker1Stars: 5,
    maker2: "平和",
    maker2Stars: 4
  },

  45: {
    type: "自由に楽しむタイプ",
    genre: "なんでもアリ",
    maker1: "SANKYO",
    maker1Stars: 5,
    maker2: "サミー",
    maker2Stars: 5
  },

  46: {
    type: "勢いを抑えて楽しむタイプ",
    genre: "レバー・操作系",
    maker1: "ユニバーサル",
    maker1Stars: 5,
    maker2: "山佐",
    maker2Stars: 3
  },

  47: {
    type: "タイミング重視タイプ",
    genre: "目押し・リズム系",
    maker1: "北電子",
    maker1Stars: 5,
    maker2: "ユニバーサル",
    maker2Stars: 3
  },

  48: {
    type: "じっくり楽しむタイプ",
    genre: "ハマり・粘り系",
    maker1: "サミー",
    maker1Stars: 5,
    maker2: "SANKYO",
    maker2Stars: 3
  },

  49: {
    type: "周りの勢いも楽しむタイプ",
    genre: "連チャン・波系",
    maker1: "SANKYO",
    maker1Stars: 5,
    maker2: "サミー",
    maker2Stars: 3
  },

  50: {
    type: "マイペース重視タイプ",
    genre: "連チャン・波系",
    maker1: "SANKYO",
    maker1Stars: 5,
    maker2: "平和",
    maker2Stars: 3
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
// 50番号ごとの通常イラスト
// ==============================

const fortuneImages = {

  1: "images/エヴァ凶.png",
  2: "images/エヴァ吉.png",
  4: "images/海吉.png",
  5: "images/リゼロ吉.png",
  6: "images/ジャグラー凶.png",
  7: "images/ジャグラー吉.png",
  8: "images/海凶.png",
  9: "images/とある（パチ）吉.png",
  10: "images/とある（パチ）凶.png",

  11: "images/レールガン吉.png",
  12: "images/アクセラレータ吉.png",
  13: "images/ゴッドイーター吉.png",
  14: "images/ゴッドイーター凶.png",
  15: "images/リゼロ凶.png",
  16: "images/魔法少女吉.png",
  17: "images/番長凶.png",
  18: "images/番長吉.png",
  19: "images/怪獣・バトル吉.png",
  20: "images/モンキー凶.png",

  21: "images/レールガン凶.png",
  22: "images/北斗凶.png",
  23: "images/モンキー吉.png",
  24: "images/アクセラレータ凶.png",
  25: "images/戦国乙女吉.png",
  26: "images/魔法少女凶.png",
  27: "images/とある（スマスロ）吉.png",
  28: "images/怪獣・バトル凶.png",
  29: "images/北斗吉.png",
  30: "images/激アツ演出吉.png",
  31: "images/保留・演出待ち吉.png",
  32: "images/とある（スマスロ）凶.png",
  33: "images/戦国乙女凶.png",
  34: "images/PUSHボタン吉.png",
  35: "images/激アツ演出凶.png",
  36: "images/ハマり吉.png",
  37: "images/台選び吉.png",
  38: "images/東京喰種吉.png",
  39: "images/保留・演出待ち凶.png",
  40: "images/東京喰種凶.png",

  41: "images/PUSHボタン凶.png",
  42: "images/レバーON吉.png",
  43: "images/目押し凶.png",
  44: "images/台選び凶.png",
  45: "images/最超吉.png",
  46: "images/レバーON凶.png",
  47: "images/目押し吉.png",
  48: "images/ハマり吉.png",
  49: "images/隣が爆連吉.png",
  50: "images/隣が爆連凶.png"


};
// ==============================
// 50番号ごとのコメント
// ==============================

const fortuneMessages = {

  1:
    "🧹 今日はちょっとしたトラブルに注意！<br>" +
    "身の回りのものが突然「暴走」するかも……！？",

  2:
    "✨ 今日は神がかった流れが来ているかも！？<br>" +
    "思い切った行動が、思わぬラッキーにつながりそう！",

  3:
    "💀 運気も燃え尽きた……。<br>" +
    "でも、ここまで下がったなら、あとは上昇するだけだから……っ！",

  4:
    "🌊 今日はゆったり構えるのが吉！<br>" +
    "果報は寝て待て！？<br>" +
    "焦らず楽しんでいれば、思わぬチャンスがやってくるかも！？",

  5:
    "✨ 小さなチャンスを見逃さないで！<br>" +
    "今日はいつもより少しだけ大胆にいってみよう！",

  6:
    "😱 なんだか嫌な夢を見そうな予感……。<br>" +
    "今日は無理せず、のんびり楽しむのが吉かも！？",

  7:
    "🎉 今日はかなり期待できそう！<br>" +
    "鹿巫女ちゃんも思わずテンションMAX！？",

  8:
    "☀️ 遊びすぎにはご用心！<br>" +
    "今日は無理せず、休憩をはさみながら楽しもう！",

  9:
    "⚡ 今日は自分の右手と直感を信じてみよう！<br>" +
    "思わぬ展開が待っているかも……！？",

  10:
    "😵 今日はちょっとした不幸に注意！<br>" +
    "無理をすると「不幸だぁ～っ！」となるかも……。",

  11:
    "⚡ 鹿巫女ちゃんがあなたの運気を改竄！？<br>" +
    "今日は悪い流れを吹き飛ばせそう！",

  12:
    "🚀 今日は運気も向上！<br>" +
    "このまま一方通行で、良い流れに乗っていこう！",

  13:
    "🍖 今日は食欲も運気も大盛りで！<br>" +
    "思い切って挑戦すれば、良い結果が待っているかも！？",

  14:
    "🍚 これは……ちょっと無理しすぎ！？<br>" +
    "今日は欲張らず、自分のペースで楽しもう……！",

  15:
    "👹 今日はちょっと災難続きかも……。<br>" +
    "でも大丈夫！鬼を乗り越えれば、流れは変わる！？",

  16:
    "✨ 奇跡も魔法もあるんです！<br>" +
    "今日は思いがけないラッキーが起こるかも！？",

  17:
    "😭 漢気で負けた…いや、私女の子ですしっ！！",

  18:
    "🔥 今日は気合い十分！<br>" +
    "「押忍！」のひと声で、運気も上向くかも！？",

  19:
    "🦖 今日は本能のままに楽しもう！<br>" +
    "眠っていたパワーを解き放つチャンス！？",

  20:
    "😭 買いすぎ・欲張りには要注意……！<br>" +
    "今日は一度落ち着いて、じっくり楽しもう。",

  21:
    "⚡ 静電気にも運気にも注意！？<br>" +
    "今日は思わぬところで「ビリッ」とくるかも……。",

  22:
    "💥 まさかの「あべしっ！！」！？<br>" +
    "今日は足元から身の回りまで、いつも以上に慎重に！",

  23:
    "🏁 今日はココロがとまらない！？<br>" +
    "勢いに乗って楽しめば、良い流れがやってくるかも！",

  24:
    "🚃 あれ……その選択で大丈夫！？<br>" +
    "今日は思わぬ方向に進んでしまうかも。",

  25:
    "🧹 強くて可愛い鹿巫女ちゃん！<br>" +
    "今日は小さな厄も吹き飛ばして、スッキリ楽しもう！",

  26:
    "😢 勢いだけじゃダメ！<br>" +
    "助六…安易は注意！！",

  27:
    "⚡ 今日はふざけた幻想をぶち壊す！？<br>" +
    "悪い流れを自分の力で変えるチャンス！",

  28:
    "😨 今日は予想外の展開に注意！<br>" +
    "思い通りにならなくても、焦らずいこう……！",

  29:
    "💥 今日は強敵との出会いに期待！<br>" +
    "その出会いは一生ものになるかも！？",

  30:
    "🔥 これは……激アツの予感！？<br>" +
    "今日はテンション高めで楽しんじゃおう！",

  31:
    "🔴 まだかな……そろそろ来るかな……？<br>" +
    "焦らず待てば、思わぬ展開があるかも！？",

  32:
    "😭 今日は何をやっても空回り！？<br>" +
    "「不幸だぁ～っ！」となる前に、いったん落ち着こう……。",

  33:
    "🔥 これが鹿浜の本能寺の変！？<br>" +
    "今日は火の元と勢いの出しすぎに注意！",

  34:
    "🔴 押せば何かが起こるかも！？<br>" +
    "今日は思い切って一歩踏み出してみよう！",

  35:
    "🔥 激アツ……なのは間違いない。<br>" +
    "ただし今日は「熱すぎる」ものには要注意！？",

  36:
    "✨ あと少し、もってくれれば……！？<br>" +
    "長い道の先には、まだ何かが待っているかも！",

  37:
    "🃏 その選択に神意が宿る！！<br>" +
    "今日は直感を信じて選んでみよう！",

  38:
    "🥀 今日は自分の本能を信じて！<br>" +
    "迷ったときこそ、心の声に従ってみよう。",

  39:
    "🔴 「……まだ？」<br>" +
    "待てど暮らせど何も起こらない……今日は焦らず気長に！",

  40:
    "😭 上手くいかないときは悔しいもの……。<br>" +
    "今日は無理に完璧を目指さず、楽しむことを忘れずに！",

  41:
    "🔴 押したらまさかの金ダライ！？<br>" +
    "今日は何が起こるか分からない……慎重にいこう！",

  42:
    "🔥 レバーONッ!!<br>" +
    "今日は思い切った一手が、良い流れを呼び込むかも！？",

  43:
    "😵 タイミングが……合わないッ！！<br>" +
    "今日は焦らず、ゆっくりいきましょう……。",

  44:
    "🃏 ダメな時はどうしてもダメッ！！<br>" +
    "今日は選択に迷ったら、いったん深呼吸！",

  45:
    "✨ 今日は神がかった1日に！？<br>" +
    "何をやっても上手くいくかも！？",

  46:
    "😱 レバーONッ……のはずが「ポキッ」！？<br>" +
    "今日は力の入れすぎにご注意を……！",

  47:
    "🎯 PERFECT！！<br>" +
    "今日はタイミングばっちり！直感を信じて楽しもう！",

  48:
    "✨ 長い道のりも、あと少し！？<br>" +
    "諦めずに楽しんでいれば、良い展開が待っているかも！",

  49:
    "🎉 隣がすごいことになってる！？<br>" +
    "今日は周りの勢いにもあやかって、楽しくいこう！",

  50:
    "😭 隣が凄すぎてやれる気がしませんッ……！<br>" +
    "今日は周りを気にしすぎず、自分のペースで楽しもう！"

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

  // ==============================
// 番号別イラスト・コメント
// ==============================

numberImageBox.classList.add("hidden");
numberFortuneImage.src = "";
numberFortuneMessage.innerHTML = "";

if (fortuneImages[number]) {

  numberFortuneImage.src =
    fortuneImages[number];

  numberFortuneMessage.innerHTML =
    fortuneMessages[number] || "";

  numberImageBox.classList.remove("hidden");

}

  recommendType.textContent = recommendInfo.type;
recommendGenre.textContent = recommendInfo.genre;

// メーカー表示をリセット
maker1Row.style.display = "";
maker2Row.style.display = "";

// メーカー情報を表示
maker1Stars.textContent =
  "★".repeat(recommendInfo.maker1Stars) +
  "☆".repeat(5 - recommendInfo.maker1Stars);

maker1Name.textContent = recommendInfo.maker1;

maker2Stars.textContent =
  "★".repeat(recommendInfo.maker2Stars) +
  "☆".repeat(5 - recommendInfo.maker2Stars);

maker2Name.textContent = recommendInfo.maker2;

// 3番（最大凶）はメーカー1を表示しない
if (number === 3) {
  maker1Row.style.display = "none";
}
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
