var r = 0;
var defaultShevronColorClass = "st5"
var RA = false;
var isOpenGate = false;
var isAuto = true;
var Sh = [false,false,false,false,false,false,false,false];
var ACancel = false;
var isClearFunction = false;
var isPlaneToClear = false;
var isTimeOut = false;
var selected = -1;
var locked = -1;
var adress = [0,0,0,0,0,0,0,0];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function AutoTurn(){
	isAuto = !isAuto;
	var autoButton = document.getElementById("AutoButton")
	if(isAuto){
		autoButton.setAttribute('class','FButton SelectedButton');
		//powerButton.textContent = 'OFF';
		//powerOn();
	}
	else{
		autoButton.setAttribute('class','FButton');
		//powerButton.textContent = 'ON';
		ACancel = true;
	}
}

function TurnGate(){
	if(!isClearFunction){
		if(locked == 7){
			turnButtonGate();
			turnOpenGate();
		}
		else{
			if(selected == 7 && !isOpenGate){
				turnButtonGate();
				powerOn();
			}
			else if(isOpenGate){
				
			}
			else if(selected != 7){
				errorAnimation();
			}
			
		}
	}
	
	
}

function turnButtonGate(){
	isOpenGate = !isOpenGate;
	var gbutton = document.getElementById("TurnGateButton");
	if(isOpenGate){
		gbutton.setAttribute("class","FButton SelectedButton");
	}
	else{
		gbutton.setAttribute("class","FButton");
	}
}
async function turnOpenGate(){
	var gate = document.getElementById("Portall");
	if(isOpenGate){
		document.getElementById("ShColorB").setAttribute('class','stS');
		BaseShevronAnimate();
		await sleep(750);
		gate.setAttribute("class","stP");
	}
	else{
		gate.setAttribute("class","st0");
		BaseShevronAnimate();
		await sleep(375);
		if(isPlaneToClear){
			await sleep(375);
			clearAdress();
		}
		else{
			document.getElementById("ShColorB").setAttribute('class',defaultShevronColorClass);
		}
		
	}
}

async function errorAnimation(){
	var gbutton = document.getElementById("TurnGateButton");
	for(let i = 0; i <  7 - selected; i++ ){
		gbutton.setAttribute("class","FButton ErrorButton");
		await sleep(500);
		gbutton.setAttribute("class","FButton");
		await sleep(500);
	}
}


function powerOn(){
	if(locked<selected){
		ACancel = false;
		toSynvol(adress[locked + 1]);
	}
}

function createShevron(){
	var Base = document.getElementById("BaseShevron");
	//console.log(Base.getScreenCTM().inverse();
	var myanim = document.createElementNS("http://www.w3.org/2000/svg", 'animateTransform');
	myanim.setAttribute("id","myShevronAnimation"); 
	myanim.setAttribute("attributeName","transform"); 
	myanim.setAttribute("type","translate");
	myanim.setAttribute("from","0,0"); 
	myanim.setAttribute("to","0,-5"); 
	myanim.setAttribute("dur","0.75s"); 
	myanim.setAttribute("values","0,0; 0,-7.5; 0,0");
	myanim.setAttribute("keyTimes","0;0.5;1");
	myanim.setAttribute("fill","freeze"); 
	myanim.setAttribute("begin","indefinite");
	myanim.setAttribute("repeatCount","1");	
	Base.appendChild(myanim);
	
}
createShevron();

function create(to,dur){
	var myanim=document.createElementNS("http://www.w3.org/2000/svg", 'animateTransform');
	myanim.setAttribute("id","myAnimation"); 
	myanim.setAttribute("attributeType","XML"); 
	myanim.setAttribute("attributeName","transform"); 
	myanim.setAttribute("type","rotate");
	
	myanim.setAttribute("from",r+" 282.902  268.802"); 
	if(to == null){
		myanim.setAttribute("to",(360+r)+" 282.902  268.802"); 
	}
	else{
		myanim.setAttribute("to",to+" 282.902  268.802"); 
	}
	if(dur == null){dur = 10;}
	myanim.setAttribute("dur",dur+"s"); 
	
	myanim.setAttribute("calcMode","spline");
	myanim.setAttribute("keyTimes","0;1");
	//cubic-bezier(.59,.2,.34,.78)
	myanim.setAttribute("keySplines","0.42,0 0.58,1");
	
	myanim.setAttribute("fill","freeze"); 
	myanim.setAttribute("begin","indefinite"); 
	myanim.setAttribute("repeatCount","1"); 
	var myPath = document.getElementById("SynvolCircle");
	//myanim.beginElement()
	myPath.appendChild(myanim);
}

function del(){
	var element = document.getElementById("myAnimation");
	if (element != null) {
		element.parentNode.removeChild(element);
	}
}

function test() {
	del();
	create();
	var anim = document.getElementById("myAnimation").beginElement();
}

function stop(){
	var anim = document.getElementById("myAnimation").endElement();
	r = document.getElementById("SynvolCircle").transform.animVal[0].angle
}

function colorSynvolSet(id,color){
	var items = document.getElementById("S"+id).children
	for(let i = 0; i < items.length; i++ ){
		items[i].setAttribute('fill',color);//#1B1BB3
	}
}

function colorButtonSet(id,color){
	var items = document.getElementById("BS"+id).children
	for(let i = 0; i < items.length; i++ ){
		items[i].setAttribute('fill',color);//#1B1BB3
	}
}

function ButtonSelect(id){
	var items = document.getElementById("Button"+id).setAttribute('class','SelectedButton')
}

function ButtonUnselect(id){
	var items = document.getElementById("Button"+id).setAttribute('class',' ')
}

function testColoration(){
	colorSet(1,"#1B1BB3");
}

function BaseShevronAnimate(){
	
	var anim = document.getElementById("myShevronAnimation").beginElement();
}

function isIdCorrect(id){
	for(let i = 0; i < adress.length; i++ ){
		if(adress[i] == id){
			return [false, i];
		}
	}
	return [true, 0];
}

function selectFind(){
	for(let i = 0; i < adress.length; i++ ){
		if(adress[i] == 0){
			return i;
		}
	}
}

function AdressSet(id){
	if(!isClearFunction && !isOpenGate){
		var isCorrectValues = isIdCorrect(id);
		var isCorrect = isCorrectValues[0];
		var find = isCorrectValues[1];
		//console.log(selected + " " + ACancel);
		if(selected<7 && isCorrect){
			var tmpS = selectFind();
			ButtonSelect(id);
			selected = selected + 1;
			
			adress[tmpS] = id;
			document.getElementById("A"+(tmpS+1)).setAttribute('src',"Synvols/S" + id + ".svg");
			if(RA){
				
			}
			else{
				if(isAuto){
					ACancel = false;
					toSynvol(adress[locked + 1]);
				}
			}
		}
		else{
			//console.log(isCorrect == false); //loaded + 1 < find) " " + find + " ] " + adress);
			//console.log(locked + 1 < find);
			if(!isCorrect && locked + 1 <= find){
				if (locked + 1 == find){
					//stop();
					ACancel = true;
				}
				ButtonUnselect(adress[find]);
				document.getElementById("A"+(find+1)).setAttribute('src',"");
				adress[find] = 0;
				selected = selected - 1;
				
				
			}
		}
	}
	
}

async function clearAdress(){
	var clsButton = document.getElementById("CLSButton");
	if(!isClearFunction && !isOpenGate){
		isClearFunction = true;
		clsButton.setAttribute('class','FButton SelectedButton');
		ACancel = true;
		if(locked<selected){
			delSelectSynvols()
		}
		
		del();
		create(null,11);
		document.getElementById("myAnimation").beginElement();
		timeOut();
		document.getElementById("ShColorB").setAttribute('class','stR');
		var str = "";
		for(let i = 0; i < adress.length; i++ ){
			str = str + (360-(((adress[i]-1)*5.63)+2.81)) + " ";
		}
		console.log(str);
		do {
			await sleep(1);
			var tmpR = document.getElementById("SynvolCircle").transform.animVal[0].angle;
			//console.log(tmpR);
			if(tmpR>360){tmpR = tmpR - 360;}
			if(tmpR<0){tmpR = tmpR + 360;}
			var checkVaule = checkedAdressItem(tmpR);
			if(checkVaule[0]){
				for(let i = 0; i < checkVaule[1].length; i++ ){
					colorSynvolSet(checkVaule[1][i],"#FF0000");
					delSynvol(checkVaule[1][i])
				}
				
			}
		} while (!isTimeOut);
		isTimeOut = false;
		//console.log("FF");
		r = document.getElementById("SynvolCircle").transform.animVal[0].angle;
		locked = -1;
		selected = -1;
		document.getElementById("ShColorB").setAttribute('class', defaultShevronColorClass);
		adress = [0,0,0,0,0,0,0,0];
		Sh = [false,false,false,false,false,false,false,false];
		clsButton.setAttribute('class','FButton');
		isClearFunction = false;
		if(isPlaneToClear){isPlaneToClear = !isPlaneToClear;}
	}
	else if(isOpenGate){
		isPlaneToClear = !isPlaneToClear;
		if(isPlaneToClear){
			clsButton.setAttribute('class','FButton SelectedButton');
		}
		else{
			clsButton.setAttribute('class','FButton');
		}
	}
	
}

async function timeOut(){
	await sleep(11000);
	isTimeOut = true;
}

function delSynvol(id){
	var tmp = 0;
	var bid = false;
	for(let i = 0; i < adress.length; i++ ){
		if(adress[i] == id){
			tmp = i;
			bid = true;
		}
	}
	if(bid){
		//console.log(id);
		document.getElementById("A"+(tmp+1)).setAttribute('class',"adressImg");
		document.getElementById("A"+(tmp+1)).setAttribute('src',"");
		document.getElementById("ShColor"+(tmp+1)).setAttribute('class',defaultShevronColorClass);
		colorSynvolSet(id,"#000000");
		colorButtonSet(id,"#000000");
		//ButtonUnselect(id)
	}
}

function delSelectSynvols(){
	for(let i = locked+1; i < adress.length; i++ ){
		if(adress[i] != 0){
			ButtonUnselect(adress[i]);
			document.getElementById("A"+(i+1)).setAttribute('src',"");
			document.getElementById("A"+(i+1)).setAttribute('class',"adressImg");
			adress[i]=0;
		}
	}
}

function checkedAdressItem(rc){
	var ret = [];
	var j = 0;
	var bret = false;
	for(let i = 0; i < adress.length; i++ ){
		if(adress[i] != 0){
			var rid = 360-(((adress[i]-1)*5.63)+2.81);
			if(rc <= rid+5 && rc >= rid-5){
				bret = true;
				ret[j] = adress[i];
				j = j + 1;
			}
		}
		
	}
	return [bret, ret];
}

async function toSynvol(id){
	if(id == 0){return;}
	RA = true;
	if(!ACancel){
		del();
		var to = 360-(((id-1)*5.63)+2.81)
		var dur = (Math.abs(to-r)/(360/10))+1;
		create(to,dur);
	}
	if(!ACancel){
		var anim = document.getElementById("myAnimation").beginElement();
		document.getElementById("A"+(locked+2)).setAttribute('class',"adressImg imgWork");
		await sleep(dur*1000);
	}
	
	r = document.getElementById("SynvolCircle").transform.animVal[0].angle;
	
	if(!ACancel){
		document.getElementById("ShColorB").setAttribute('class','stS');
		BaseShevronAnimate();
		await sleep(750);
		document.getElementById("ShColorB").setAttribute('class', defaultShevronColorClass);
	}
	
	if(!ACancel){
		colorSynvolSet(id,"#1B1BB3");
		document.getElementById("A"+(locked+2)).setAttribute('class',"adressImg imgLock");
		locked = locked + 1;
		LockShevron();
		RA = false;
		loadsynvol();
	}
	else{
		
		ACancel = false;
		RA = false;
		loadsynvol();
	}
	
}

function LockShevron(){
	for(let i = 0; i < Sh.length; i++ ){
		if(Sh[i] != true){
			Sh[i] = true;
			document.getElementById("ShColor"+(i+1)).setAttribute('class','stS');
			
			break;
		}
	}
	//document.getElementById("")
	ButtonUnselect(adress[locked]);
	colorButtonSet(adress[locked],"#1B1BB3");
}

function loadsynvol(){
	//console.log(locked + " " + selected);
	//console.log(adress);
	if(locked != selected){
		if(adress[locked+1] == 0){
			
		}
		else{
			toSynvol(adress[locked + 1]);
		}
	}
	else if(locked == 7 && isOpenGate){
		turnOpenGate();
	}
}

