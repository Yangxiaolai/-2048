function showNumberWithAnimation(i,j,randNumber){
	var numberCell=$('#numberP-cell-'+i+'-'+j);
    numberCell.attr('src','images/'+randNumber+'.gif');
	numberCell.animate({
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},80);
}
function showMoveAnimation(fromx,fromy,tox,toy){
	var numberCell=$('#number-cell-'+fromx+'-'+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);
}