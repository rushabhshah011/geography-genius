
var page_name;		
var question_pointer = 0;		
var questions = [];
var answers = [];
var user_answers = [];
var myArray = [0,1,2,3,4,5,6,7,8,9];
shuffle(myArray);

function loadmap()
{				
	current = null;
	map = {};
	m = {};				
	attr = {
		fill: "#333",
		stroke: "#888",
		"stroke-width": .5,
		"stroke-linejoin": "round"
	};				

	width = document.getElementById('holder_1000').style.width;
	height = document.getElementById('holder_1000').style.height * 0.99;

	svgHeight = 400;
	svgWidth = 1000;

	R = Raphael("holder_1000", "100%", "100%");
				
	R.setViewBox(0, 0, svgWidth, svgHeight, true);

	render_map(R,map,attr);		
			
						
	for (var state in map) {							        
        map[state].color = Raphael.getColor();
        (function (st, state) {
			st[0].style.cursor = "pointer";
			st[0].onmouseover = function () {
				current && map[current].animate({fill: "#333", stroke: "#666"}, 300);
				st.animate({fill: st.color, stroke: "#ccc"}, 300);
				var e = window.event;
				var posX = e.pageX;
				var posY = e.pageY;
				if(posX>800)
				posX-=300;
				if(posY>400)
				posY-=200;	
				t = R.text(posX, posY, state.replace(/_/g, " "));
				t.scale(2,2);
				R.safari();
				current = state;
				};
			st[0].onmouseout = function () {
				st.animate({fill: "#333", stroke: "#666"}, 300);
				t.remove();
				R.safari();
			};
			st[0].onclick = function () {
				var country_url = "country.html?".concat(state);
				window.open(country_url,"", "location=0,menubar=0,status=0,scrollbars=0,width=250, height=600");
				document.getElementById(state).style.visibility = "visible";
			};
		})(map[state], state);
	}
}

function quizLoad(page_id)
{
	page_name = page_id;
	if (window.XMLHttpRequest)
		xmlhttp=new XMLHttpRequest();
	else
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");

	var page_xml = "xml/".concat(page_name.toString()).concat(".xml");

	xmlhttp.open("GET",page_xml,true);
	xmlhttp.send();
	xmlhttp.onreadystatechange=function()
	{
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			xmlDoc=xmlhttp.responseXML; 
			q=xmlDoc.getElementsByTagName("question");
			gen_question();
		}
	}
	loadmap();	
}

function gen_question()
{
	answers[myArray[question_pointer]]=q[myArray[question_pointer]].getAttribute('answer');
	question= q[myArray[question_pointer]].getElementsByTagName("question_text")[0].childNodes[0].nodeValue;
	document.getElementById('question').innerHTML = question;
	questions[myArray[question_pointer]] = question;
	document.getElementById('option1').innerHTML = q[myArray[question_pointer]].getElementsByTagName("option")[0].childNodes[0].nodeValue;
	document.getElementById('option2').innerHTML = q[myArray[question_pointer]].getElementsByTagName("option")[1].childNodes[0].nodeValue;
	document.getElementById('option3').innerHTML = q[myArray[question_pointer]].getElementsByTagName("option")[2].childNodes[0].nodeValue;
	document.getElementById('option4').innerHTML = q[myArray[question_pointer]].getElementsByTagName("option")[3].childNodes[0].nodeValue;
	document.getElementById('answer1').value = q[myArray[question_pointer]].getElementsByTagName("option")[0].childNodes[0].nodeValue;
	document.getElementById('answer2').value = q[myArray[question_pointer]].getElementsByTagName("option")[1].childNodes[0].nodeValue;
	document.getElementById('answer3').value = q[myArray[question_pointer]].getElementsByTagName("option")[2].childNodes[0].nodeValue;
	document.getElementById('answer4').value = q[myArray[question_pointer]].getElementsByTagName("option")[3].childNodes[0].nodeValue;
	/*
	for(var q_counter=0;q_counter<4;q_counter++)
	{
	var option = "option".concat(q_counter+1);
	var answer = "answer".concat(q_counter+1);
	document.getElementById(option).innerHTML = q[myArray[question_pointer]].getElementsByTagName("option")[q_counter].childNodes[0].nodeValue;
	document.getElementById(answer).value = q[myArray[question_pointer]].getElementsByTagName("option")[0].childNodes[0].nodeValue;
	}

	*/
}

function shuffle(o)
{
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
}	

function next_question(btn)
{
	if(btn.value.match("Retry"))
		location.reload();

	if (document.getElementById('answer1').checked)
	{
		user_answers[myArray[question_pointer]] = document.getElementById('answer1').value;
		question_pointer++;
		
		if(question_pointer==q.length)
		gen_result();
		
		gen_question();
		clear_radio();
	}else if (document.getElementById('answer2').checked) {
		user_answers[myArray[question_pointer]] = document.getElementById('answer2').value;
		question_pointer++;
				
			if(question_pointer==q.length)
				gen_result();
				
		gen_question();
		clear_radio();
	}else if (document.getElementById('answer3').checked) {
		user_answers[myArray[question_pointer]] = document.getElementById('answer3').value;
		question_pointer++;
			
		if(question_pointer==q.length)
			gen_result();
			
		gen_question();
		clear_radio();
	}else if (document.getElementById('answer4').checked) {
		user_answers[myArray[question_pointer]] = document.getElementById('answer4').value;
		question_pointer++;
			
		if(question_pointer==q.length)
			gen_result();
			
		gen_question();
		clear_radio();
	}
			
	if(question_pointer==q.length-1)
		document.getElementById('next').value = "Finish";
			
			
}

function clear_radio()
{
	document.getElementById('answer1').checked = false;
	document.getElementById('answer2').checked = false;
	document.getElementById('answer3').checked = false;
	document.getElementById('answer4').checked = false;
}
			
function gen_result()
{
	document.getElementById('holder_1000').innerHTML ="";
	document.getElementById('question_table').innerHTML ="";
	document.getElementById('next').value = "Retry";
	document.getElementById('q').innerHTML ="Questions";
	document.getElementById('a').innerHTML ="Answers";
	document.getElementById('ua').innerHTML ="Your Selection";
	document.getElementById('score_text').innerHTML ="Score";
	var score =0;
	for(q_no=0;q_no<myArray.length;q_no++)
		{
			q_id = "q".concat(q_no);
			document.getElementById(q_id).innerHTML = questions[myArray[q_no]];
			document.getElementById(q_id).style.color="#FFF";
			u_id = "u".concat(q_no);	
			document.getElementById(u_id).innerHTML = answers[myArray[q_no]];
			document.getElementById(u_id).style.color="#FFF";
			ua_id = "ua".concat(q_no);
			document.getElementById(ua_id).innerHTML = user_answers[myArray[q_no]];
			if(answers[myArray[q_no]].match(user_answers[myArray[q_no]]))
				{
					document.getElementById(ua_id).style.color="#0F0";						
					score++;
				}
			else
				document.getElementById(ua_id).style.color="#F00";
		}		
		
	score_num = score.toString().concat("/10");
	document.getElementById('score').innerHTML = score_num;
	if(score==myArray.length)
	{
		if(page_name.toString().match("continents"))
		newLevel_btn = "<a href='capitals.html'><input type='button' value='Level 2' class='btn' style='float: right;'></a>";		
		else if(page_name.toString().match("capitals"))
		newLevel_btn = "<a href='quiz.html'><input type='button' value='Level 3' class='btn' style='float: right;'></a>";
		else if(page_name.toString().match("quiz"))
		{
		newLevel_btn = "<a href='flag.html'><input type='button' value='Flag Quiz' class='btn' style='float: right;'></a>";
	    bootbox.alert("Congratulations, You have completed geography genius.");
		}
		document.getElementById('right_btns').innerHTML = newLevel_btn;
	}
	else
	    bootbox.alert("You Need to score 10 out of 10 in order to complete this level.");

}

						
function instructions()
{
	bootbox.alert("Welcome to Geography Genius Quiz.<br><br>There are 3 levels of quiz.<br><br>Level 1 : 10 Questions about Continents and Oceans.<br><br>Level 2 : 10 Questions about Countries and Capital.<br><br>Level 3 : 10 General Knowledge Questions.<br><br> You can always use exloper mode while answering questions.");
}

