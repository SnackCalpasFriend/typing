const $Sample = document.getElementsByClassName("Sample");
const $Input = document.getElementById("Input");

// ひらがなとローマ字の対応辞書
// 例えば、「つ」と入力したいとき、"tu"か"tsu"と入力される場合がある。
// "t"の後に"u"が来るとき、dictionary["つ"][0]を使って、
// "t"の後に"s"が来るとき、dictionary["つ"][1]を使うようにしたい。

const dictionary = {
  あ: ["a"],
  い: ["i"],
  う: ["u"],
  え: ["e"],
  お: ["o"],
  か: ["ka"],
  き: ["ki"],
  く: ["ku"],
  け: ["ke"],
  こ: ["ko"],
  さ: ["sa"],
  し: ["si", "shi", "ci"],
  す: ["su"],
  せ: ["se"],
  そ: ["so"],
  た: ["ta"],
  ち: ["ti", "chi"],
  つ: ["tu", "tsu"],
  て: ["te"],
  と: ["to"],
  な: ["na"],
  に: ["ni"],
  ぬ: ["nu"],
  ね: ["ne"],
  の: ["no"],
  は: ["ha"],
  ひ: ["hi"],
  ふ: ["hu"],
  へ: ["he"],
  ほ: ["ho"],
  ま: ["ma"],
  み: ["mi"],
  む: ["mu"],
  め: ["me"],
  も: ["mo"],
  や: ["ya"],
  ゆ: ["yu"],
  よ: ["yo"],
  ら: ["ra"],
  り: ["ri"],
  る: ["ru"],
  れ: ["re"],
  ろ: ["ro"],
  わ: ["wa"],
  を: ["wo"],
  ん: ["n", "xn", "nn"],
  が: ["ga"],
  ぎ: ["gi"],
  ぐ: ["gu"],
  げ: ["ge"],
  ご: ["go"],
  ざ: ["za"],
  じ: ["zi", "ji"],
  ず: ["zu"],
  ぜ: ["ze"],
  ぞ: ["zo"],
  だ: ["da"],
  ぢ: ["di"],
  づ: ["du"],
  で: ["de"],
  ど: ["do"],
  ば: ["ba"],
  び: ["bi"],
  ぶ: ["bu"],
  べ: ["be"],
  ぼ: ["bo"],
  ぱ: ["pa"],
  ぴ: ["pi"],
  ぷ: ["pu"],
  ぺ: ["pe"],
  ぽ: ["po"],
  っ: ["ltu"],
  ゃ: ["lya", "xya"],
  ゅ: ["lyu", "xyu"],
  ょ: ["lyo", "xyo"],
  きゃ: ["kya"],
  きゅ: ["kyu"],
  きょ: ["kyo"],
  しゃ: ["sya", "sha"],
  しゅ: ["syu", "shu"],
  しょ: ["syo", "sho"],
  ちゃ: ["tya", "cha"],
  ちゅ: ["tyu", "chu"],
  ちょ: ["tyo", "cho"],
  にゃ: ["nya"],
  にゅ: ["nyu"],
  にょ: ["nyo"],
  ひゃ: ["hya"],
  ひゅ: ["hyu"],
  ひょ: ["hyo"],
  みゃ: ["mya"],
  みゅ: ["myu"],
  みょ: ["myo"],
  りゃ: ["rya"],
  りゅ: ["ryu"],
  りょ: ["ryo"],
  ぎゃ: ["gya"],
  ぎゅ: ["gyu"],
  ぎょ: ["gyo"],
  じゃ: ["ja", "zya", "jya"],
  じゅ: ["ju", "zyu", "jyu"],
  じょ: ["jo", "zyo", "jyo"],
  ぢゃ: ["dya"],
  ぢゅ: ["dyu"],
  ぢょ: ["dyo"],
  びゃ: ["bya"],
  びゅ: ["byu"],
  びょ: ["byo"],
  ぴゃ: ["pya"],
  ぴゅ: ["pyu"],
  ぴょ: ["pyo"],
  ー: ["-"],
  "・": ["/"],
  ぁ: ["la"],
  ぃ: ["li"],
  ぅ: ["lu"],
  ぇ: ["le"],
  ぉ: ["lo"],
  "。": ["."],
  "、": [","],
};
let Q = [
  {
    kanji: "コンパスと分度器",
    hira: "こんぱすとぶんどき",
  },
  {
    kanji: "雑誌・ノンノ",
    hira: "ざっし・のんの",
  },
  {
    kanji: "河童の川流れ",
    hira: "かっぱのかわながれ",
  },
  {
    kanji: "通り魔には気を付けて",
    hira: "とおりまにはきをつけて",
  },
];

// 入力見本の処理
function sampleInput(quizIndex) {
  // 入力見本　漢字・ひらがな
  qHira = Q[quizIndex]["hira"];
  $Sample[0].innerHTML = Q[quizIndex]["kanji"];
  $Sample[1].innerHTML = qHira;
  let inputSample = [];

  // 入力見本　ローマ字
  let romeSample = "";
  for (let i = 0; i < qHira.length; i++) {
    if (qHira[i + 1] == "ゃ" || qHira[i + 1] == "ゅ" || qHira[i + 1] == "ょ") {
      romeSample += dictionary[qHira[i] + qHira[i + 1]][0];
      inputSample.push(dictionary[qHira[i] + qHira[i + 1]]);
      i++;
    }
    // 「ん」の処理
    else if (
      (qHira[i] == "ん" &&
        (qHira[i + 1] == "な" ||
          qHira[i + 1] == "に" ||
          qHira[i + 1] == "ぬ" ||
          qHira[i + 1] == "ね" ||
          qHira[i + 1] == "の" ||
          qHira[i + 1] == "あ" ||
          qHira[i + 1] == "い" ||
          qHira[i + 1] == "う" ||
          qHira[i + 1] == "え" ||
          qHira[i + 1] == "お" ||
          qHira[i + 1] == "や" ||
          qHira[i + 1] == "ゆ" ||
          qHira[i + 1] == "よ")) ||
      (qHira[i] == "ん" && i == qHira.length - 1)
    ) {
      romeSample += dictionary[qHira[i]][2]; //nn
      inputSample.push([dictionary["ん"][1], dictionary["ん"][2]]);
    } else if (qHira[i] == "ん") {
      // 後の文字とくっつけて一文字と判断すればよくね？ベンツの場合be [nntu,ntu]
      let nlist = [];
      for (let a = 0; a < dictionary[qHira[i]].length; a++) {
        for (let b = 0; b < dictionary[qHira[i + 1]].length; b++) {
          nlist.push(dictionary[qHira[i]][a] + dictionary[qHira[i + 1]][b]);
        }
      }
      console.log(nlist);
      inputSample.push(nlist);
      console.log(inputSample);
      romeSample += nlist[0];
      i++;
    }
    //「っ」の処理
    else if (qHira[i] == "っ") {
      romeSample += dictionary[qHira[i + 1]][0][0];
      smallTsu = [dictionary[qHira[i + 1]][0][0], dictionary[qHira[i]][0]];
      inputSample.push(smallTsu);
    } else {
      romeSample += dictionary[qHira[i]][0];
      inputSample.push(dictionary[qHira[i]]);
    }
  }

  $Sample[2].innerHTML = romeSample;
  return inputSample;
}

// 入力ゾーン
let romeIndex = 0; // romeIndex: 入力ローマ字index　消しゴム: => kesigomu k=0,e=1,s=0,i=1,g=0,o=1,m=20,u=1
let keyInput = "";
let hiraIndex = 0; // hiraIndex: ひらがなindex 消しゴム: =>　けしごむ　け=0,し=1,ご=2,む=4
let quizIndex = 0; // quizIndex: 何問目か、
let qHira = Q[quizIndex]["hira"];

inputSample = sampleInput(quizIndex);
let cList1 = [];
let cList2 = [];
let count = 0;

document.addEventListener("keydown", function (e) {
  let key = e.key;
  count++;
  console.log(count);
  let selectIndex = 0;
  let romeIndexFlag = false;

  if (cList1.length == 1) {
    if (inputSample[hiraIndex][cList1[0]][romeIndex] == key) {
      romeIndexFlag = true;
    }
  } else if (cList2.length == 1) {
    if (inputSample[hiraIndex][cList2[0]][romeIndex] == key) {
      romeIndexFlag = true;
    }
  } else {
    if (romeIndex == 0) {
      for (let i = 0; i < inputSample[hiraIndex].length; i++) {
        if (inputSample[hiraIndex][selectIndex][romeIndex] == key) {
          romeIndexFlag = true;
          cList1.push(selectIndex);
        }
        selectIndex++;
      }
      cList2 = [];
    } else if (cList2.length == 0 && cList1.length > 0) {
      for (let i = 0; i < cList1.length; i++) {
        if (inputSample[hiraIndex][cList1[i]][romeIndex] == key) {
          romeIndexFlag = true;
          cList2.push(cList1[i]);
          cList1 = [];
        }
      }
    } else {
      for (let i = 0; i < cList2.length; i++) {
        if (inputSample[hiraIndex][cList2[i]][romeIndex] == key) {
          romeIndexFlag = true;
          cList1.push(cList2[i]);
          cList2 = [];
        }
      }
    }
  }
  console.log(inputSample[hiraIndex]);

  if (romeIndexFlag) {
    romeIndex++;
    keyInput += key;
    $Input.textContent = keyInput;
    if (cList1.length == 1) {
      if (romeIndex == inputSample[hiraIndex][cList1[0]].length) {
        romeIndex = 0;
        hiraIndex++;
        cList1 = [];
      }
    } else if (cList2.length == 1) {
      if (romeIndex == inputSample[hiraIndex][cList2[0]].length) {
        romeIndex = 0;
        hiraIndex++;
        cList2 = [];
      }
    }
    if (hiraIndex == inputSample.length) {
      if (quizIndex == Q.length - 1) {
        console.log("終了");
        for (let i = 0; i < $Sample.length; i++) {
          $Sample[i].textContent = "終了";
        }
        $Input.textContent = count;
      } else {
        console.log("OK");
        quizIndex++;
        inputSample = sampleInput(quizIndex);
        romeIndex = 0;
        keyInput = "";
        hiraIndex = 0;
        $Input.textContent = keyInput;
      }
    }
  } else {
    count = 0;
    $Input.innerHTML = keyInput + '<font color="red">' + key + "</font>";
  }
});
