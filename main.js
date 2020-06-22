var board=new Array();
var result=32;//达到2048显示成功
var score=0;//分数显示
var victory=false;//判断是否胜利
var hasConflicted=new Array();//判断当前格子是否已计算
$(document).ready(function(){
	newgame();
});
//Start new Game
function newgame(){
	//初始化棋盘格
	init();
	//随机两个格子产生数字
	generateOneNumber();
	generateOneNumber();//初始化时需产生两个数字
}
function init(){
	if(victory)
	{
		$("#vic2048").remove();
		for(var i=0;i<4;i++)
		{
			for(var j=0;j<4;j++)
			{
				$("#grid-container").append('<div class="grid-cell"  id="grid-cell-'+i+'-'+j+'"><img src="images/0.gif" id="gridP-cell-'+i+'-'+j+'"></div>');
				var gridCell=$("#grid-cell-"+i+"-"+j);
				gridCell.css('top',getPosTop(i,j));
				gridCell.css('left',getPosLeft(i,j));
			}
		}
	}
    else{
		for(var i=0;i<4;i++)
		{
		    for(var j=0;j<4;j++)
		    {
		        $("#gridP-cell-"+i+'-'+j).attr('src',"images/0.gif");
		    }
		}
		for (var i=0;i<4;i++)
		{
			for (var j=0;j<4;j++)
			{
			var gridCell=$("#grid-cell-"+i+"-"+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
			}
		}
	}
	victory=false;
	score=0;
	opdateScore(score);
    for(var i=0;i<4;i++)
	{
        board[i]=new Array();
        hasConflicted[i]=new Array();
		for(var j=0;j<4;j++)
		{
            board[i][j]=0;
            hasConflicted[i][j]=false;
		}
    }
    updateBoardView();
}
//更新显示数据
function updateBoardView(){
    $(".number-cell").remove();
    for(var i=0;i<4;i++)
    {
       for(var j=0;j<4;j++)
       {
        $("#grid-container").append('<div class="number-cell"  id="number-cell-'+i+'-'+j+'"><img src="" id="numberP-cell-'+i+'-'+j+'"></div>');
        var theNumberCell=$('#number-cell-'+i+'-'+j);
        if(board[i][j]==0)
        {
            theNumberCell.css('top',getPosTop(i,j));
            theNumberCell.css('left',getPosLeft(i,j));
        }
        else
        {
            theNumberCell.css('top',getPosTop(i,j));
            theNumberCell.css('left',getPosLeft(i,j));
            $('#numberP-cell-'+i+'-'+j).attr('src','images/'+board[i][j]+'.gif');
        }
        hasConflicted[i][j]=false;
       }
    }
}

function generateOneNumber(){
	if(nospace(board))
		return false;
		//随机一个位置
		var randx=parseInt(Math.floor(Math.random()*4));
		var randy=parseInt(Math.floor(Math.random()*4));
		while(1)
		{
			if(board[randx][randy]==0)
			break;
			
			randx=parseInt(Math.floor(Math.random()*4));
			randy=parseInt(Math.floor(Math.random()*4));
		}
		//一个数字
		var randNumber=Math.random()<0.5?2:4;
		board[randx][randy]=randNumber;
		showNumberWithAnimation(randx,randy,randNumber);
	
	return true;
}

$(document).keydown(function(event){
	switch(event.keyCode){
		case 37: //left
		if(moveLeft())
		{
			setTimeout("generateOneNumber()",210);
			setTimeout("isgameover()",300);
		}
		break;
		case 38://up
		if(moveUp())
		{
			setTimeout("generateOneNumber()",210);
			setTimeout("isgameover()",300);
		}
		break;
		case 39://right
		if(moveRight())
		{
			setTimeout("generateOneNumber()",210);
			setTimeout("isgameover()",300);
		}
		break;
		case 40://dowm
		if(moveDown())
		{
			setTimeout("generateOneNumber()",210);
			setTimeout("isgameover()",300);
		}
		break;
		default:
		break;
	}
});

function isgameover(){
	if(nospace(board) && nomove(board))
	{
		gameover();
	}
}

function gameover(){
	alert("GameOver!-Score:"+score);
}

function moveLeft(){
	if(!canMoveLeft(board))
	return false;
	
	//moveLeft
	for(var i=0;i<4;i++)
	{
		for(var j=1;j<4;j++)
		{
			if(board[i][j]!=0)
			{
				for(var k=0;k<j;k++)
				{
					if(board[i][k]==0 && noBlockHoriznontal(i,k,j,board))
					{
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j] && noBlockHoriznontal(i,k,j,board) && !hasConflicted[i][k])
					{
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//add score
						score+=board[i][k];
						opdateScore(score);
						hasConflicted[i][k]=true;
						if(board[i][k]==result)
						{
							victory=true;
                            setTimeout("Win()",200);
                        break;
                        }
						continue;
					}
				}
			}
			if(victory)
			break;
		}
		if(victory)
		break;
	}
	if(!victory)
	setTimeout("updateBoardView()",200);
	return true;
}
function moveUp(){
	if(!canMoveUp(board))
	return false;
	//moveUp
	for(var i=1;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			if(board[i][j]!=0)
			{
				for(var k=0;k<i;k++)
				{
					if(board[k][j]==0 && noBlockVertical(j,k,i,board))
					{
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j])
					{
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j]+=board[i][j];
						board[i][j]=0;
						//add score
						score+=board[k][j];
						opdateScore(score);
						hasConflicted[k][j]=true;
						if(board[k][j]==result)
						{
                            victory=true;
                            setTimeout("Win()",200);
							break;
						}
						continue;
					}
				}
			}
			if(victory)
			break;
		}
		if(victory)
		break;
	}
	if(!victory)
	setTimeout("updateBoardView()",200);
	return true;
}

function moveRight(){
	if(!canMoveRight(board))
	return false;
	
	//moveRight
	for(var i=0;i<4;i++)
	{
		for(var j=2;j>=0;j--)
		{
			if(board[i][j]!=0)
			{
				for(var k=3;k>j;k--)
				{
					if(board[i][k]==0 && noBlockHoriznontal(i,j,k,board))
					{
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[i][k]==board[i][j] && noBlockHoriznontal(i,j,k,board) && !hasConflicted[i][k])
					{
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k]+=board[i][j];
						board[i][j]=0;
						//add score
						score+=board[i][k];
						opdateScore(score);
						hasConflicted[i][k]=true;
						if(board[i][j]==result)
						{
							victory=true;
							setTimeout("Win()",200);
							break;
						
						}
						continue;
					}
				}
			}
			if(victory)
			break;
		}
		if(victory)
		break;
	}
	if(!victory)
	setTimeout("updateBoardView()",200);
	return true;
}

function moveDown(){
	if(!canMoveDown(board))
	return false;
	//moveDown
	for(var i=2;i>=0;i--)
	{
		for(var j=0;j<4;j++)
		{
			if(board[i][j]!=0)
			{
				for(var k=3;k>i;k--)
				{
					if(board[k][j]==0 && noBlockVertical(j,i,k,board))
					{
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;
						continue;
					}
					else if(board[k][j]==board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j])
					{
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j]+=board[i][j];
						board[i][j]=0;
						//add score
						score+=board[k][j];
						opdateScore(score);
						hasConflicted[k][j]=true;
						if(board[k][j]==result)
						{
							victory=true;
							setTimeout("Win()",200);
							break;
						}
						continue;
					}
				}
			}
			if(victory)
			break;
		}
		if(victory)
		break;
	}
	if(!victory)
	setTimeout("updateBoardView()",200);
	return true;
}
