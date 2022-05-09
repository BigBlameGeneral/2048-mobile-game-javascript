var board=new Array();//存放n*n个格子的数据
var score=0;    //当前的游戏分数

$(document).ready(function(){//当整个游戏加载完成后运行的主函数
    newgame();//开始一个新游戏
});

function newgame(){
    //初始化棋盘格
    init();
    //随机在两个格子里面生成数字
    generateOneNumber();
    generateOneNumber();
}

function init(){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){

            var gridcell=$("#grid-cell-"+i+"-"+j);
            gridcell.css('top',getPosTop(i,j));
            gridcell.css('left',getPosLeft(i,j));
        }
    }
    for(var i=0;i<4;i++){//初始化board
        board[i]=new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0;
        }
    }
    updateBoardView();//根据board的值对前端grid-cell的值更新
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell=$('#number-cell-'+i+'-'+j);
            
            if(board[i][j]==0){
                //不让numbercell块显示
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                //把numebrcell放在gridcell中间
                theNumberCell.css('top',getPosTop(i,j)+50);
                theNumberCell.css('left',getPosLeft(i,j)+50);
            }else{
                theNumberCell.css('width','100px');
                theNumberCell.css('height','100px');
                //把numebrcell覆盖掉gridcell
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                //根据当前board[i][j]不同的值显示不同的颜色
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                //前景色
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
    }
}

function generateOneNumber(){
    if(nospace(board)){//判断是否有空间存放新生成的数字
        return false;
    }

    //随机一个位置
    var randx=parseInt( Math.floor( Math.random()*4));
    var randy=parseInt( Math.floor( Math.random()*4));
    while(true){
        if(board[randx][randy]==0){
            break;
        }
        randx=parseInt( Math.floor( Math.random()*4));
        randy=parseInt( Math.floor( Math.random()*4));
    }
    //随机一个数
    var randNumber=Math.random()<0.5?2:4;

    //在随机位置上显示随机数
    board[randx][randy]=randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    return true;
}