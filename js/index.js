function random(m,n){
	return Math.floor(Math.random()*(n-m+1)+m)
}
let imgList = document.getElementsByClassName("imgOut")
for(let i=0;i<imgList.length;i++){
	imgList[i].style.transform="translateY("+random(0,30)+"%)"
	console.log(imgList[i].getAttribute("id"))
}
let ballList = document.getElementsByClassName("ball")
let fire = document.getElementsByClassName("fireOut")[0]
let button = document.getElementsByClassName("btn")[0]
var clickBol = true
var deg=0
var timer
var rotateBol = true
var bulletOut = document.getElementsByClassName("bulletOut")[0]
var maxDeg = degCount()
var fireTimer
window.onresize=function(){
	maxDeg = degCount()
}
button.onclick=function(){
	if(clickBol){
		clearInterval(fireTimer)
		bulletOut.innerHTML=""
		timer=setInterval(function(){
			if(rotateBol){
				deg++
			}else{
				deg--
			}
			if(deg>=maxDeg){
				rotateBol=false
			}
			if(deg<=-maxDeg){
				rotateBol=true
			}
			fire.style.transform="rotateZ("+deg+"deg )"
		},33)
		this.innerHTML="End"
	}else{
		clearInterval(timer)
		this.innerHTML="Start"
		fireBegin()
	}
	clickBol=!clickBol
}

function bevel(straight, oblique) {
  const sinOfAngleX = straight / oblique;
  const angle = Math.round((Math.asin(sinOfAngleX) * 180) / Math.PI);
  return angle;
}
function degCount(){
	let a = window.innerWidth/2
	let b = window.innerHeight-(document.getElementsByClassName("imgList")[0].offsetTop-0+document.getElementsByClassName("imgList")[0].offsetHeight)
	let c = Math.sqrt(a*a+b*b)
	console.log(c)
	bulletOut.style.minHeight=c+"px"
	return bevel(a,c)
}
var hz = 0
function fireBegin(){
	var div = document.createElement("div")
	div.classList.add('bullet')
	bulletOut.appendChild(div)
	fireTimer = setInterval(function(){
		let bullets = document.getElementsByClassName("bullet")
		for(let i=0;i<bullets.length;i++){
			let x = bullets[i].getBoundingClientRect().x
			let y = bullets[i].getBoundingClientRect().y
			for(let j=0;j<ballList.length;j++){
				pengzhuang(ballList[j],x,y)
			}
		}
	},33)
}
function pengzhuang(ele, x, y) {
	let xl = ele.getBoundingClientRect().x + ele.getBoundingClientRect().width
	let yh = ele.getBoundingClientRect().y + ele.getBoundingClientRect().height
	let xl2 = ele.getBoundingClientRect().x
	let yh2 = ele.getBoundingClientRect().y + ele.getBoundingClientRect().height
	if (x >= ele.getBoundingClientRect().x && x <= xl && y >= ele.getBoundingClientRect().y && y <= yh) {
		bulletOut.innerHTML=""
		document.getElementById("num").value=document.getElementById("num").value+ele.getAttribute("count")
		
	}
}