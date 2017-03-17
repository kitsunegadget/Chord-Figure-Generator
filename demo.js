function onload(){
    if (HTMLCanvasElement) {
        var cv = document.querySelector("#cv");
        var c = cv.getContext("2d")

        var flags = [];
        //フラグ初期化 & イベントリスナ追加
        for(var i = 0; i < 12; ++i){
            flags.push(false);

            var mid = "m" + String(i);
            var moji = document.getElementById(mid);
            moji.addEventListener("click", listener, false);

            var left = 135+120*Math.sin((i)*Math.PI/6);
            var top = 15+120-(120*Math.cos((i)*Math.PI/6));
            moji.style = "left: "+left+"px; top: "+top+"px";
        }

        document.getElementById("reset").addEventListener("click", function(){
            for(var i = 0; i < 12; ++i){
                flags[i] = false;
                var nid = "m" + String(i);
                document.getElementById(nid).children[0].firstChild.style = "color: #000";
                draw();
            }
        },false);

        draw();

        //図形の描画ポイント指定
        function moveToflag(){
            var first = true;
            flags.forEach(function (item, index, array){
                //12角形なので30°ごとに進む
                if(item && first){
                    c.moveTo(150+100*Math.sin((index)*Math.PI/6),50+100-(100*Math.cos((index)*Math.PI/6)));
                    first = false;
                }
                else if (item){
                    c.lineTo(150+100*Math.sin((index)*Math.PI/6),50+100-(100*Math.cos((index)*Math.PI/6)));
                }
            });
        }

        //描画
        function draw(){
            //キャンバスサイズは300x300     
            c.clearRect(0,0,300,300);//初期化

            c.strokeStyle = "red";
            c.fillStyle = "green"
            c.lineWidth = "2";
            c.globalAlpha = "0.5"

            c.beginPath();
            c.arc(150,150, 100, 0, 2*Math.PI, false);
            c.stroke();

            c.strokeStyle = "purple";
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
            c.fillText(choad(flags,0), 150,150+10);
        }

        function listener(e){
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
    }
};

function choad(fls,rt){
    //とりあえずルートCのときの設定
    var root = 0; //とりあえずC
    var letter = "";
    var i = 0;
    switch(root){
        case 0: letter = "C"; break;
        default:
    }
    root++;
    i++;
    var third = 0;
    var seventh = 0;
    while (i < 12) {
        var index = root % 12;
        if(i === 3 && fls[index]){
            letter += "m";
            third = 1;
        }
        else if (i === 4 && fls[index]){
            if(third){
                letter = "?";
                third = 0;
            }
            else {
                third = 1;
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
        ++i;
        ++root;
    }
    return letter;
};