//动画效果逻辑

documentWidth=window.screen.availWidth;//获取当前屏幕宽度
gridContainerWidth=0.92*documentWidth;
cellSideLength=0.18*documentWidth;
cellSpace=0.04*documentWidth;

function showNumberWithAnimation(i,j,randNumber){//出现新数字动画
    var numberCell=$('#number-cell-'+i+'-'+j);
    numberCell.css('background-color',getNumberBackgroundColor(randNumber));
    numberCell.css('color',getNumberColor(randNumber));
    numberCell.text(findword(randNumber));

    numberCell.animate({
        width:cellSideLength,
        height:cellSideLength,
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    })
    

}

function showMoveAnimation(fromx,fromy,tox,toy){//移动，叠加动画
    var numberCell=$('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200)//在200毫秒完成动画效果
}

function updateScore(score){
    $('#score').text(score);
}