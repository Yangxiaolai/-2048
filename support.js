//初始化小格子位置
function getPosTop(i,j){
	return 20+130*i;
}
function getPosLeft(i,j){
	return 20+130*j;
}
//判断是否还有空格子
function nospace(board){
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			if(board[i][j]==0)
			return false;
		}
	}
	return true;
}
//判断同一行内两个格子中间是否有障碍物
function noBlockHoriznontal(row,col1,col2,board){
	for(var i=col1+1; i<col2; i++)
	{
		if(board[row][i]!=0)
		return false;
	}
	return true;
}

function noBlockVertical(col,row1,row2,board){
	for(var i=row1+1; i<row2; i++)
	{
		if(board[i][col]!=0)
		return false;
	}
	return true;
}
//判断是否可以向左移动
function canMoveLeft(board){
	for(var i=0;i<4;i++)
	{
		for(var j=1;j<4;j++)
		{
			if(board[i][j]!=0)
			{
				if(board[i][j-1]==0||board[i][j-1]==board[i][j])
				return true;
			}
		}
	}
	return false;
}
//判断是否可以向上移动
function canMoveUp(board){
	for(var i=1;i<4;i++)
	{
		for(var j=0;j<4;j++)
		{
			if(board[i][j]!=0)
			{
				if(board[i-1][j]==0||board[i-1][j]==board[i][j])
				return true;
			}
		}
	}
	return false;
}
//判断是否可以向右移动
function canMoveRight(board){
	for(var i=0;i<4;i++)
	{
		for(var j=0;j<3;j++)
		{
			if(board[i][j]!=0)
			{
				if(board[i][j+1]==0||board[i][j+1]==board[i][j])
				return true;
			}
		}
	}
	return false;
}
//判断是否可以向下移动
function canMoveDown(board){
	for(var i=0;i<3;i++)
	{
		for(var j=0;j<4;j++)
		{
			if(board[i][j]!=0)
			{
				if(board[i+1][j]==0||board[i+1][j]==board[i][j])
				return true;
			}
		}
	}
	return false;
}
//显示分数
function opdateScore(score){
	$("#score").text(score);
}
//判断是否还可以移动
function nomove(board){
	if(canMoveLeft(board) || canMoveUp(board) || canMoveRight(board) || canMoveDown(board))
	return false;
	
	return true;
}
//成功得出2048
function Win(){
	$(".grid-cell").remove();
	$(".number-cell").remove();
	$("#grid-container").append('<img id="vic2048" src="images/2048.gif">');
}