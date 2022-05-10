var board=new Array();//存放n*n个格子的数据
var score=0;    //当前的游戏分数
var maxscore=0;
var hasConflicted=new Array();//使每次最多叠加一次，不能重复叠加

documentWidth=window.screen.availWidth;//获取当前屏幕宽度
gridContainerWidth=0.92*documentWidth;
cellSideLength=0.18*documentWidth;
cellSpace=0.04*documentWidth;

var startx=0;
var starty=0;
var endx=0;
var endy=0;


$(document).ready(function(){//当整个游戏加载完成后运行的主函数
    prepareForMobile();//为移动端做适配
    newgame();//开始一个新游戏

});

function prepareForMobile(){

    if(documentWidth>1000){
        gridContainerWidth=1000;
        cellSpace=40;
        cellSideLength=200;
    }
    $('#grid-container').css('width',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);

    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius',0.02*cellSideLength);   $('#grid-container').css('border-radius',0.02*gridContainerWidth);
    $('h1').css('font-size',documentWidth*0.1);
    $('p').css('font-size',documentWidth*0.05);

    $('a').css('width',documentWidth*0.18);
    $('a').css('height',documentWidth*0.10);
    $('a').css('font-size',documentWidth*0.05);
}

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
        hasConflicted[i]=new Array();
        for(var j=0;j<4;j++){
            board[i][j]=0;
            hasConflicted[i][j]=false;
        }
    }
    updateBoardView();//根据board的值对前端grid-cell的值更新
    score=0;
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
                theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
                theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
            }else{
                theNumberCell.css('width',cellSideLength);
                theNumberCell.css('height',cellSideLength);
                //把numebrcell覆盖掉gridcell
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                //根据当前board[i][j]不同的值显示不同的颜色
                theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                //前景色
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(findword(board[i][j]));
            }

            hasConflicted[i][j]=false;
        }

        $(".number-cell").css('line-height',cellSideLength+'px');
        $(".number-cell").css('font-size',0.2*cellSideLength+'px');
    }



}

function findword(number){
    switch(number){
        case 2:return "小白";break;
        case 4:return "实习生";break;
        case 8:return "程序猿";break;
        case 16:return "项目经理";break;
        case 32:return "架构师";break;
        case 64:return "技术经理";break;
        case 128:return "高级经理";break;
        case 256:return "技术总监";break;
        case 512:return "副总裁";break;
        case 1024:return "CTO";break;
        case 2048:return "总裁";break;
        case 4096:return "董事长";break;
        case 8192:return "CEO";break;
        case 16384:return "外卖小哥";break;
    }

    return "0";
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

$(document).keydown(function(event){//基于玩家响应的游戏
    //console.log(event.keyCode);

    
    switch(event.keyCode){
        case 37://left
            if(moveLeft()){
                event.preventDefault();
                //阻挡原本按键的默认效果
                //即防止按上下左右，界面进行滚动
               setTimeout("generateOneNumber()",(210));
               setTimeout("isgameover()", 300); 
            }
            break;
        case 38://up
            if(moveUp()){
                event.preventDefault();
                setTimeout("generateOneNumber()",(210));
                setTimeout("isgameover()", 300); 
            }
            break;
        case 39://right
            if(moveRight()){
                event.preventDefault();
                setTimeout("generateOneNumber()",(210));
                setTimeout("isgameover()", 300); 
            }
            break;
        case 40://down
            if(moveDown()){
                event.preventDefault();
                setTimeout("generateOneNumber()",(210));
                setTimeout("isgameover()", 300); 
            }
            break;
        default:
            break;
    }
    
    
})

document.addEventListener('touchstart',function(event){
    startx=event.touches[0].pageX;
    starty=event.touches[0].pageY;
})

document.addEventListener('touchend',function(event){
    endx=event.changedTouches[0].pageX;
    endy=event.changedTouches[0].pageY;

     var deltax=endx-startx;
     var deltay=endy-starty;
    //防止游戏中不小心点击产生移动
    if(Math.abs(deltax)<30&&Math.abs(deltay)<30){
        return;
    }

    //x
     if(Math.abs(deltax)>Math.abs(deltay)){
        //右
        if(deltax>0){
            if(moveRight()){
                setTimeout("generateOneNumber()",(210));
                setTimeout("isgameover()", 300); 
            }
        }
        //左
        else{
            if(moveLeft()){
                setTimeout("generateOneNumber()",(210));
                setTimeout("isgameover()", 300); 
             }
        }
     }
    //y
     else{
         //下
        if(deltay>0){
            if(moveDown()){
                setTimeout("generateOneNumber()",(210));
                setTimeout("isgameover()", 300); 
            }
        }
        //上
        else{
            if(moveUp()){
                setTimeout("generateOneNumber()",(210));
                setTimeout("isgameover()", 300); 
            }
        }
     }
})

function isgameover(){
    if(nospace(board)&&nomove(board)){
        gameover();
    }
}

function gameover(){
    setTimeout("alert('Game Over!')", 300); 
}

function moveLeft(){
    if(!canMoveLeft(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=1;j<4;j++){

            for(k=0;k<j;k++){
                if(board[i][j]!=0&&board[i][k]==0&&noBlockHorizontal(i,k,j,board)){
                    //move
                    showMoveAnimation(i,j,i,k);
                    board[i][k]=board[i][j];
                    board[i][j]=0;
                    continue;
                }else if(board[i][j]!=0&&board[i][k]==board[i][j]&&noBlockHorizontal(i,k,j,board)&&!hasConflicted[i][k]){
                    showMoveAnimation(i,j,i,k);
                    board[i][k]+=board[i][j];
                    board[i][j]=0;
                    
                    score+=board[i][k]; 
                    updateScore(score);

                    hasConflicted[i][k]=true;
                }
            }
        }
    }
    
   setTimeout( "updateBoardView()",200);
    return true;
}

function moveRight(){
    if(!canMoveRight(board)){
        return false;
    }
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            for(var k=3;k>j;k--){
                if(board[i][j]!=0&&board[i][k]==0&&noBlockHorizontal(i,j,k,board)){
                     //move
                     showMoveAnimation(i,j,i,k);
                     board[i][k]=board[i][j];
                     board[i][j]=0;
                     continue;
                }else if(board[i][j]!=0&&board[i][k]==board[i][j]&&noBlockHorizontal(i,j,k,board)&&!hasConflicted[i][k]){
                    showMoveAnimation(i,j,i,k);
                    board[i][k]+=board[i][j];
                    board[i][j]=0;
                    
                    score+=board[i][k]; 
                    updateScore(score);

                    hasConflicted[i][k]=true;
                }
            }
        }
    }

    setTimeout( "updateBoardView()",200);
    return true;
}

function moveUp(){
    if(!canMoveUp(board)){
        return false;
    }
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            for(k=0;k<i;k++){
                if(board[i][j]!=0&&board[k][j]==0&&noBlockvertical(j,k,i,board)){
                    showMoveAnimation(i,j,k,j);
                    board[k][j]=board[i][j];
                    board[i][j]=0;
                    continue;
                }else if(board[i][j]!=0&&board[k][j]==board[i][j]&&noBlockvertical(j,k,i,board)&&!hasConflicted[k][j]){
                    showMoveAnimation(i,j,k,j);
                    board[k][j]+=board[i][j];
                    board[i][j]=0;

                    score+=board[k][j]; 
                    updateScore(score);

                    hasConflicted[k][j]=true;
                }
            }
        }
    }
    setTimeout( "updateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board)){
        return false;
    }
    for(var j=0;j<4;j++){//i j k j
        for(var i=2;i>=0;i--){
            for(k=3;k>i;k--){
                if(board[i][j]!=0&&board[k][j]==0&&noBlockvertical(j,i,k,board)){
                    showMoveAnimation(i,j,k,j);
                    board[k][j]=board[i][j];
                    board[i][j]=0;
                    continue;
                }else if(board[i][j]!=0&&board[k][j]==board[i][j]&&noBlockvertical(j,i,k,board)&&!hasConflicted[k][j]){
                    showMoveAnimation(i,j,k,j);
                    board[k][j]+=board[i][j];
                    board[i][j]=0;

                    score+=board[k][j]; 
                    updateScore(score);

                    hasConflicted[k][j]=true;
                }
            }
        }
    }
    setTimeout( "updateBoardView()",200);
    return true;
}