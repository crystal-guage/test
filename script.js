var barCount = 1;

window.onload = function () {
    // ページ読み込み時に実行したい処理
    var test = document.getElementById('source');
    // URLパラメータ文字列を取得する
    var param = location.search.substring(1);
    var src = this.getSource(param);
    var html = this.convertHtml(src);
    test.insertAdjacentHTML('afterbegin', html);
}

function getSource(key) {
    var src = "<p>ERROR " + key + "</p>";
    switch (key) {
        case "kimitoiuhikari":
            src = "sec=Intro|key=D|code=1-2,4-4,3,2,5-1-2,6|sec=Aメロ|code=4,1-2,3-6"
            break;
        case "bokuradakenomirai":
            src = "<p>SUCCESS 僕らだけの未来</p>"
            break;
    }
    return src;
}

function convertHtml(src) {
    var items = src.split("|");

    var ret = '<div class="sec">';
    for (var i = 0; i < items.length; i++) {
        var item = items[i].split("=");
        var type = item[0];
        var value = item[1];

        switch (type) {
            case 'sec':
                ret += createSecTag(value);
                break;
            case 'key':
                ret += createKeyTag(value);
                break;
            case 'code':
                ret += createCodeTag(value);
                break;
        }
    }
    ret += '</div>';

    return ret;
}


function createSecTag(value) {
    return '<div class="sec-header"><p>' + value + '</p></div>';
}

function createKeyTag(value) {
    key = "ERROR";
    switch (value) {
        case 'C':
            key = "C";
            break;
        case 'D':
            key = "D (##)";
            break;
    }
    return '<div class="sec-header-info"><p>Key=' + key + '</p></div>';
}


function createCodeTag(value) {
    var bars = value.split(',');

    var ret = '';
    ret += '<div class="sec-body">';
    for (var i = 0; i < bars.length; i++) {
        ret += '<div class="bar-wrap">';
        ret += '<div class="bar-top"><p>'+ zeroPadding(barCount) +'</p></div>';
        ret += '<div class="bar-bottom">';
        var codes = bars[i].split('-');
        for (var j = 0; j < codes.length; j++) {

            if (codes.length == 1) {
                ret += '<div class="box box-one">';
            } else if (j == 0) {
                ret += '<div class="box box-left">';
            } else if (j == codes.length - 1) {
                ret += '<div class="box box-right">';
            } else {
                ret += '<div class="box box-middle">';
            }
            ret += '<div class="code"><p>' + codes[j] + '</p></div>';
            ret += '</div>';
        }
        ret += '</div>';
        ret += '</div>';
        barCount ++;
    }
    ret += '</div>';

    return ret;
}

function zeroPadding(num){
    return ('000' + num).slice(-3);
}