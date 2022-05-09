var board=new Array();//存放n*n个格子的数据
var score=0;    //当前的游戏分数

$(document).ready(function(){//当整个游戏加载完成后运行的主函数
    newgame();//开始一个新游戏
});

function newgame(){
    //初始化棋盘格
    init();
    //随机在两个格子里面生成数字
}

function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){

            var gridcell=$("#grid-cell-"+i+"-"+j);
            gridcell.css('top',getPosTop(i,j));
            gridcell.css('left',getPosLeft(i,j));
        }
    }
}