//  js二级菜单 

let liTags = document.querySelectorAll(".nav > ul > li");
for (let i=0; i<liTags.length;i++){
    liTags[i].onmouseenter = function (e) {
        let li = e.currentTarget;
        li.classList.add("active");
    }
    liTags[i].onmouseleave = function (e) {
        let li = e.currentTarget;
        li.classList.remove("active");
    }
}

// 倒计时

let d = document.querySelector("#day"),
    h = document.querySelector("#hour"),
    m = document.querySelector("#minute"),
    s = document.querySelector("#second");

function count(times){
    let today = new Date().getTime();

    if(today >= times){
        return {
            day:00,
            hour:00,
            minute:00,
            second:00,
            result:true
        }
    }

    let timeDiff = times - today;
    //    s m h d 
    let d = parseInt(timeDiff /1000 /60 / 60 /24 ,10),
        h = parseInt(timeDiff / 1000 / 60 /60 % 24 , 10),
        m = parseInt(timeDiff / 1000 / 60 %60 , 10),
        s = parseInt(timeDiff / 1000 %60 ,10);
    
    // 若数值仅一位数则补充一个0
    d = d < 9 ? "0"+d : d;
    h = h < 9 ? "0"+h : h;
    m = m < 9 ? "0"+m : m;
    s = s < 9 ? "0"+s : s;

    return {
        day:d,
        hour:h,
        minute:m,
        second:s,
        result:false
    }

}
    // 设置截止时间
const times = new Date('2020/9/1 0:00').getTime();

var con = count(times);
d.innerHTML = con.day;
h.innerHTML = con.hour;
m.innerHTML = con.minute;
s.innerHTML = con.second;

let interval = setInterval(function(){
    var con = count(times);
    if (con.result){
        clearInterval(interval)
    }
    d.innerHTML = con.day;
    h.innerHTML = con.hour;
    m.innerHTML = con.minute;
    s.innerHTML = con.second;
} , 1000)


//qrcode to_top效果
var qrcode = document.querySelectorAll('.qrcode');
var to_top = document.querySelector(".to_top");
var fire = document.documentElement.querySelector(".fire");

window.addEventListener(
    'scroll',
    function(){
        var topScroll = document.documentElement.scrollTop;
        
        if( topScroll >= 182){
            to_top.style.zIndex = "1";
            for(let i=0;i<qrcode.length;i++){
                qrcode[i].style.position = "fixed";
                qrcode[i].style.top = "7.031vw";
                qrcode[i].style.zIndex = "1";
                qrcode[i].style.animationName = "qrcode"
            }
            if( topScroll >= 3820){
            to_top.style.position = "absolute";
            to_top.style.zIndex = "1";
            to_top.style.top = "326.563vw";
            }else{
                to_top.style = "";
                to_top.style.zIndex = "1"
            }
        }else{
            to_top.style = "";
            for(let i=0;i<qrcode.length;i++){
                qrcode[i].style=''
            }
        }
    }
);



to_top.addEventListener(
    'mouseover',
    function(){
        fire.style.animationName = "fire";
    }
)
to_top.addEventListener(
    'mouseout',
    function(){
        fire.style.animationName = "";
    }
)



//标题珠子效果
let wrap = document.getElementsByClassName("con");
let bead = document.getElementsByClassName("bead");

for(let i =0;i<wrap.length;i++){
    wrap[i].addEventListener(
        'mouseover',
        function(){
            bead[i].style.display = "block";
        }
    )
    wrap[i].addEventListener(
        'mouseout',
        function(){
            bead[i].style.display = "none";
        }
    )
}


//输入框清除效果
let map_search_text = document.querySelector(".map_title").getElementsByTagName("input")[0];
let map_clear = document.querySelector("#clear");

map_clear.addEventListener(
    "click" ,
    function(){
        map_search_text.value = ""
    },
    false
)



//map效果
let container = document.querySelector(".map_container");

    //标记函数
function map_marker(x,y,boxName){
    let div = document.createElement("div");
    div.className = "map_marker";
    div.style.left = x - 7 + "px";
    div.style.top = y - 7 + "px";
    img.style.transformOrigin = x +"px " + y + "px";
    let box = document.querySelector(boxName);    
    box.appendChild(div);

    let marker = document.getElementsByClassName("map_marker");
    for(let i =0;i<marker.length;i++){
        marker[i].onclick = function(e){
            let ev = e || window.event;
            if(ev && ev.stopPropagation) {
            //非IE浏览器
            ev.stopPropagation();
            } else {
            //IE浏览器(IE11以下)
            ev.cancelBubble = true;
            }

            box.removeChild(this)
            }
    }
}


    //获取位置x,y;及点击事件
container.onclick = function (e) {
    e = e || window.event;
    
    var x = e.offsetX  ,
        y = e.offsetY ;
    map_marker(x,y,".map_tips_box");
}

    //放缩按钮
let img = document.querySelector("#map_img"),
    enlarge = document.querySelector(".enlarge"),
    narrow = document.querySelector(".narrow");
    
let scale_n = .5,  //设置固定放缩比例
    scale_num = 1; //记录实际放缩比例

enlarge.onclick = function(){
    scale_num = scale_num+scale_n;
    img.style.transform = "scale("+scale_num+","+scale_num+")"
}
narrow.onclick = function(){
    scale_num = scale_num-scale_n;
    scale_num = scale_num>1?scale_num:1;
    img.style.transform = "scale("+scale_num+","+scale_num+")"
}

//地点按钮及输入查找功能
    //按钮定位
let places = document.querySelector(".places").getElementsByTagName("a");

for(let i = 0; i < places.length; i++){
    places[i].onclick = ()=>{
        let text = places[i].innerText;
        searchPlaces(text)
    }
}

function searchPlaces(text){
    let x = 0 , y = 0;
    switch (text) {
        case "中心食堂":
            x = 265;
            y = 205;
            break;
        case "新校门":
            x = 112;
            y = 281;
            break;
        case "太极操场":
            x = 242;
            y = 127;
            break;
        case "老校门":
            x = 236;
            y = 304;
            break;
        case "红岩网校":
            x = 208;
            y = 156;
            break;
        case "校史馆":
            x = 65;
            y = 220;
            break;
        case "信科大楼":
            x = 341;
            y = 270;
            break;
        case "教务处":
            x = 55;
            y = 161;
            break;
        case "二教":
            x = 204;
            y = 222;
            break;
        case "老图书馆":
            x = 288;
            y = 226;
            break;
        default:
            alert("抱歉，学校并无该地点，请检查搜索地点")
            return;
    }
    map_marker(x,y,".map_tips_box")
    img.style.transformOrigin = x +"px " + y + "px";
    img.style.transform = "scale(2)"
}

    //查找定位功能
let map_search = document.querySelector(".search");
map_search.onclick = ()=>{
    searchPlaces(map_search_text.value)
}



//地图拖拽