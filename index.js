var r = 0;
var RA = false;
var Sh = [false,false,false,false,false,false,false,false];
var ACancel = false;
var selected = -1;
var locked = -1;
var adress = [0,0,0,0,0,0,0,0];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
	
	myanim.setAttribute("from",r+" 318.15 317.5"); 
	if(to == null){
		myanim.setAttribute("to",(360+r)+" 318.15 317.5"); 
	}
	else{
		myanim.setAttribute("to",to+" 318.15 317.5"); 
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

function go () {
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

function coloration(){
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
	var isCorrectValues = isIdCorrect(id);
	var isCorrect = isCorrectValues[0];
	var find = isCorrectValues[1];
	console.log(selected + " " + ACancel);
	if(selected<7 && isCorrect){
		var tmpS = selectFind();
		ButtonSelect(id);
		selected = selected + 1;
		
		adress[tmpS] = id;
		document.getElementById("A"+(tmpS+1)).setAttribute('src',"Synvols/S" + id + ".svg");
		if(RA){
			
		}
		else{
			ACancel = false;
			toSynvol(id);
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

async function toSynvol(id){
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
		document.getElementById("ShColorB").setAttribute('class','st3');
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
}

