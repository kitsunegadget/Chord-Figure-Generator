function onload(){
    if (HTMLCanvasElement) {
        var cv = document.querySelector("#cv");
        var c = cv.getContext("2d")

        var flags = [];
        var root = 0;
        //フラグ初期化 & イベントリスナ追加
        for(var i = 0; i < 12; ++i){
            flags.push(false);

            var mid = "m" + String(i);
            var rid = "r" + String(i);
            var moji = document.getElementById(mid);
            var root_moji = document.getElementById(rid);
            moji.addEventListener("click", listenerM, false);
            root_moji.addEventListener("click", listenerR, false);

            var left = 185+120*Math.sin((i)*Math.PI/6);
            var top = 65+120-(120*Math.cos((i)*Math.PI/6));
            moji.style = "left: "+left+"px; top: "+top+"px";

            var left_ = 185+155*Math.sin((i)*Math.PI/6);
            var top_ = 65+120-(155*Math.cos((i)*Math.PI/6));
            root_moji.style = "left: "+left_+"px; top: "+top_+"px";
        }

        document.getElementById("reset").onclick=function(){
            for(var i = 0; i < 12; ++i){
                flags[i] = false;
                var nid = "m" + String(i);
                document.getElementById(nid).children[0].firstChild.style = "color: #000";
                draw();
            }
        };
        document.getElementById("r0").children[0].firstChild.style = "color: #f00";
        draw();

        //図形の描画ポイント指定
        function moveToflag(){
            var first = true;
            flags.forEach(function (item, index, array){
                //12角形なので30°ごとに進む
                if(item && first){
                    c.moveTo(200+100*Math.sin((index)*Math.PI/6),100+100-(100*Math.cos((index)*Math.PI/6)));
                    first = false;
                }
                else if (item){
                    c.lineTo(200+100*Math.sin((index)*Math.PI/6),100+100-(100*Math.cos((index)*Math.PI/6)));
                }
            });
        }

        //描画
        function draw(){
            //キャンバスサイズは400x400     
            c.clearRect(0,0,400,400);//初期化

            c.strokeStyle = "red";
            c.lineWidth = "2";
            c.globalAlpha = "0.5"

            c.beginPath();
            c.arc(200,200, 100, 0, 2*Math.PI, false);
            c.stroke();

            var style = choad(flags,root);//コード識別

            c.strokeStyle = "purple";
            c.fillStyle = style[1];
            var st = 50*Math.sqrt(3);
            c.beginPath();
            moveToflag();
            c.closePath();
            c.stroke();
            c.fill();

            c.fillStyle = "blue"
            c.globalAlpha = "1"
            c.textAlign = "center"
            c.font = "bold 20px Meryo";
            c.fillText(style[0], 200,200+10);
        }

        function listenerM(e){
            var vid = e.currentTarget.id.split("m")[1];
            flags[vid] = !flags[vid];
            if(flags[vid]){
                e.target.style = "color: #f00";
            }
            else{
                e.target.style = "color: #000";
            }
            //console.log(flags);
            //console.log(e.currentTarget.id.split("m")[1]);
            draw();
        }
        function listenerR(e){
            var vid = e.currentTarget.id.split("r")[1];
            root = Number(vid);
            for(var i = 0; i < 12; ++i){
                var rid = "r" + String(i);
                document.getElementById(rid).children[0].firstChild.style = "color: #000";
            }
            e.target.style = "color: #f00";
            draw();
        }
    }
};

function choad(fls,rt){
    //とりあえずルートCのときの設定
    var root = rt; //とりあえずC
    var letter = "";
    var fillcolor = "";
    var i = 0;
    if (!fls[root] ) {
        return [letter, fillcolor];
    }
    switch(root){
        case 0: letter="C"; break;
        case 1: letter="C#"; break;
        case 2: letter="D"; break;
        case 3: letter="D#"; break;
        case 4: letter="E"; break;
        case 5: letter="F"; break;
        case 6: letter="F#"; break;
        case 7: letter="G"; break;
        case 8: letter="G#"; break;
        case 9: letter="A"; break;
        case 10: letter="A#"; break;
        case 11: letter="B"; break;
        default:
        console.log("error");
    }
    root++;
    i++;
    var outscale = false;
    var second = 0;
    var third = 0;
    var fifth = 0;
    var sixth = 0;
    var seventh = 0;
    while (i < 12) {
        var index = root % 12;
        if(i === 1 && fls[index]){
            letter = "?"
            outscale = true;
        }
        if(!outscale){
            if(i === 3 && fls[index]){
                letter += "m";
                third = 1;
            }
            else if (i === 4 && fls[index]){
                if(third){
                    letter = "?";
                    third = 0;
                    fillcolor = "gray"
                }
                else {
                    third = 1;
                    fillcolor = "orange"
                }
            }

            if(i === 10 && fls[index] && third){
                letter += "7"
                seventh = 1;
            }
            else if(i === 11 && fls[index] && third){
                if(seventh){
                    letter = "?";
                    tseventh = 0;
                }
                else {
                    letter += "M7"
                    seventh = 1;
                }
            }
        }
        ++i;
        ++root;
    }
    return [letter, fillcolor];
};