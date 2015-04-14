eventsSources = [];
window.onload = function(){
	getCateList();
        if ($("#content").length)$("#content").Calendar(eventsSources, resizeContent, null, onDayClick, onDayDblClick);
	$("#cross").click(function (){
		closeDialog();
	});
	$("#logout_btn").click(function(){
		window.location.assign("logout");
	});
	if(getCookie("email")){
		$("#email").val(getCookie("email"));
	}
	$("#create_cate_btn").click(onCateCreateBtnClick);
	$("#RegisterBtn").click(onRegisterBtnClick);
	$("#dayDetailBtn").click(onDayDetailBtnClick);
	$("#weekDetailBtn").click(onWeekDetailBtnClick);
	$("#monthDetailBtn").click(onMonthDetailBtnClick);
	$("#month_detail, #week_detail").css("display", "none");
}
function getCookie(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++){
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name){
			return unescape(y);
		}
	}
	return undefined;
}
function resizeContent(){
        $("#content").width($(window).width() - $("#side_bar").outerWidth() - parseInt($("#content").css("padding-right")) -parseInt($("#content").css("padding-left")));
        $("#content").height($(window).height() - $("#head_wrap").outerHeight() - parseInt($("#content").css("padding-top")) - parseInt($("#content").css("padding-bottom")));
}
function randerCateList(){
	var cateid;
	$("#cate_list ul").empty();
	$(eventsSources).each(function (index, data){
		function onCateDeleteBtnClick(event){
			function onCateDeleteSuccess(){
				document.getElementById("cate_list").children[0].removeChild(event.target.parentNode)
				closeDialog();
			}
			function onCateDeleteFailed(){}
			function onCateDeleteComfirmBtnClick(){
				$.ajax({
					type:"POST",
					url:"API/deleteCate",
					data:"id="+cateid,
					success:onCateDeleteSuccess,
					failed:onCateDeleteFailed
				});
			}
			var btn = createHTMLElement("button", {}, {"click":onCateDeleteComfirmBtnClick}, "OK");
			var div = createHTMLElement("div", {}, {}, "Delete Cate will delete all Expenses in this cate");
			div.appendChild(btn);
			showDialog(div);
		}
		function onCateEditBtnClick(event){
			function onCateEditComfirmBtnClick(){
				var name_pattern = /^[\w]*$/g;
				var RGB_pattern = /^(#[0-9a-fA-F]{6}|rgb\(\ *[0-9]{1,3}\ *,\ *[0-9]{1,3}\ *,\ *[0-9]{1,3}\ *\))/g;
				if(name_input.value !== "" && RGB_input.value !== "" && name_pattern.exec(name_input.value) && RGB_pattern.exec(RGB_input.value)){
					$.ajax({
						type:"POST",
						url:"API/editCate",
						data:"name="+name_input.value+"&RGB="+RGB_input.value+"&id="+cateid,
						success:onCateEditSuccess,
						failed:onCateEditFailed
					});
				}else{
					alert("invalidated value");
				}
			}
			function onCateEditSuccess(data){
				closeDialog();
				getCateList();
				console.log(data);
			}
			function onCateEditFailed(data){}
			var cateid = event.target.parentNode.id.split("cate")[1];
			var btn = createHTMLElement("button", {}, {"click":onCateEditComfirmBtnClick}, "OK");
			var name_input = createHTMLElement("input", {"type":"text", "value":data.name});
			var RGB_input = createHTMLElement("input", {"type":"text", "value":data.RGB});
			var div = createHTMLElement("div");
			$(div).append("Name:").append(name_input).append("<br/>").append("RGB Color:").append(RGB_input).append("<br/>").append(btn).append(getColorScheme(RGB_input));
			showDialog(div);
		}
		function onCateClick(event){
			$(status_div).toggleClass("statusShow statusHide");
			data.visible = !data.visible;
			event.stopPropagation()
		}
		var cateid = data.id;
		var eventsSource = data;
		data.events = [];
		data.visible = true;
		var li = createHTMLElement("li", {"class":"cate", "id":"cate"+data.id, "style":"color:"+ data.RGB});
		var span = createHTMLElement("span", {"class":"name"}, {}, data.name);
		var del_btn = createIconButton("images/icon_delete.png", {}, {"click":onCateDeleteBtnClick}, "");
		var edit_btn = createIconButton("images/icon_edit.png", {}, {"click":onCateEditBtnClick}, "");
		var status_div = createHTMLElement("div", {"class": "status statusShow"}, {}, "");
		var div = createHTMLElement("div",{},{"click":onCateClick})
		$(div).append(status_div).append(span);
		li.appendChild(div);
		li.appendChild(del_btn);
		li.appendChild(edit_btn);
		$("#cate_list ul").append(li);
	});
}

function getColorScheme(RGB_input){
	var color_scheme = createHTMLElement("div", {"style":"width:32px;height:32px"}, {}, "");
	for(i=1;i<8;i++){
		color = createHTMLElement("div", {"style":"float:left;width:4px;height:4px;background-color:rgb("+i*32+","+i+","+i+")"}, {"click":function(event){RGB_input.value = event.target.style.getPropertyValue("background-color")}});
		color_scheme.appendChild(color);
		color = createHTMLElement("div", {"style":"float:left;width:4px;height:4px;background-color:rgb("+i+","+i*32+","+i+")"}, {"click":function(event){RGB_input.value = event.target.style.getPropertyValue("background-color")}});
		color_scheme.appendChild(color);
		color = createHTMLElement("div", {"style":"float:left;width:4px;height:4px;background-color:rgb("+i+","+i+","+i*32+")"}, {"click":function(event){RGB_input.value = event.target.style.getPropertyValue("background-color")}});
		color_scheme.appendChild(color);
		color = createHTMLElement("div", {"style":"float:left;width:4px;height:4px;background-color:rgb("+i*32+","+i*32+","+i+")"}, {"click":function(event){RGB_input.value = event.target.style.getPropertyValue("background-color")}});
		color_scheme.appendChild(color);
		color = createHTMLElement("div", {"style":"float:left;width:4px;height:4px;background-color:rgb("+i*32+","+i+","+i*32+")"}, {"click":function(event){RGB_input.value = event.target.style.getPropertyValue("background-color")}});
		color_scheme.appendChild(color);
		color = createHTMLElement("div", {"style":"float:left;width:4px;height:4px;background-color:rgb("+i+","+i*32+","+i*32+")"}, {"click":function(event){RGB_input.value = event.target.style.getPropertyValue("background-color")}});
		color_scheme.appendChild(color);
		color = createHTMLElement("div", {"style":"float:left;width:4px;height:4px;background-color:rgb("+i+","+i+","+i+")"}, {"click":function(event){RGB_input.value = event.target.style.getPropertyValue("background-color")}});
		color_scheme.appendChild(color);
		color = createHTMLElement("div", {"style":"float:left;width:4px;height:4px;background-color:rgb("+i*32+","+i*32+","+i*32+")"}, {"click":function(event){RGB_input.value = event.target.style.getPropertyValue("background-color")}});
		color_scheme.appendChild(color);
	}	
	return color_scheme;
}
function getCateList(){
	function onGetCateListSuccess(data){
		eventsSources.length = 0;
		if(data.toString === "unknow user"){return false};
		try{
			$(JSON.parse(data.toString())).each(function (index, data){
				eventsSources.push(data);
			});
			randerCateList();
		}catch(e){

		}
	}
	function onGetCateListFailed(data){}
	$.ajax({
		url:"API/getCateList",
		type:"POST",
		success:onGetCateListSuccess,
		failed:onAjaxFailed
	});
}
function createHTMLElement(tag_name, property_obj, eventListeners, innerHTML){
	htmlElem = document.createElement(tag_name);	
	for(property in property_obj){
		htmlElem.setAttribute(property, property_obj[property]);
	}
	for(listener in eventListeners){
		htmlElem.addEventListener(listener, eventListeners[listener]);
	}
	if(typeof innerHTML === "string"){
		htmlElem.innerHTML = innerHTML;
	}else if(typeof innerHTML === "Object"){
		htmlElem.appendChild(innerHTML)
	}
	return htmlElem;
}

function createIconButton(img_str, property_obj, eventListener){
	btn = createHTMLElement("image", property_obj, eventListener, "");
	btn.src = img_str;
	return btn;
}

var showDialog = function (message){
	$("#dialog #window #message").append(message);
	$("#dialog").css("display","block");
}

function closeDialog(){
	$("#dialog").css("display","none");
	$("#dialog #window #message").html("");
}

//Start of handlers
function onAjaxFailed(data){
	console.log(data);
}
function randerEventList(target, startDate, duration){
	function onEventDeleteBtnClick(event){
		function onEventDeleteSuccess(){
			document.getElementById("day_detail").children[0].children[0].removeChild(event.srcElement.parentNode);
			source.events[source.events.indexOf(_event)] = null;
		}
		function onEventDeleteFailed(){}
		$.ajax({
			type:"POST",
			url:"API/deleteEvent",
			data:"id="+_event.id,
			success:onEventDeleteSuccess,
			failed:onEventDeleteFailed
		});
	}
	target.empty();
	for(d=0;d<=duration;d++){
		var date = startDate.addDays(d);
		for(i=0;i<eventsSources.length;i++){
			var source = eventsSources[i];
			for(j=0;j<source.events.length;j++){
				var _event = source.events[j];
				if(_event.date.toDateString() === date.toDateString() && source.visible){
					var li_elem = createHTMLElement("li", {"class":"event"}, {}, "");
					var btn_elem = createIconButton("images/icon_delete.png", {}, {"click":onEventDeleteBtnClick});
					li_elem.appendChild(createHTMLElement("div", {"class":"description", "style":"color:"+source.RGB}, {}, _event.description));
					li_elem.appendChild(createHTMLElement("div", {"class":"amount"}, {}, _event.amount));
					li_elem.appendChild(btn_elem);
					target.append(li_elem);
				}
			}
		}
	}
}
function onDayClick(event){
	if(!event.target.id.match("calDay")){
		return false;
	}
	$("#day_detail .event_list ul").empty()
	var css_id_selector = "#" + event.target.id;
	var year = $(css_id_selector + " .year").html();
	var month = $(css_id_selector + " .month").html();
	var day = $(css_id_selector + " .date").html();
	var date = new Date([year,month,day].join(" "));
	randerEventList($("#day_detail .event_list ul"), date, 0);
	randerEventList($("#week_detail .event_list ul"), date.addDays(-date.getDay()), 6);
	randerEventList($("#month_detail .event_list ul"), date.addDays(-date.getDate() + 1), date.getDaysInMonthOfYear() - 1);
}

function onDayDblClick(event){
	function onEventCreateBtnClick(event){
		var desc_pattern = /^[\w]*$/g;
		var amount_pattern = /^[0-9.]*$/;
		if(desc_input.value != "" && amount_input.value != "" &&desc_pattern.exec(desc_input.value) && amount_pattern.exec(amount_input.value)){
			$.ajax({
				type:"POST",
				url:"API/createEvent",
				data:"description="+desc_input.value+"&amount="+amount_input.value+"&cateid="+cate_select.value+"&year="+date.getFullYear()+"&month="+(date.getMonth()+1)+"&day="+date.getDate(),
				success:onEventCreateSuccess,
				failded:onEventCreateFailed
			});
		}else{
			alert("invalidated value");
		}
	}
	function onEventCreateSuccess(data){
		closeDialog();
		var _event = JSON.parse(data.toString())
		_event.date = new Date();
		_event.date.setYear(_event.year);
		_event.date.setMonth(parseInt(_event.month)-1);
		_event.date.setDate(_event.day);
		for(i=0;i<eventsSources.length;i++){
			if(eventsSources[i].id == _event.cateid){
				eventsSources[i].events.push(_event);
			}
		}
		randerEventList($("#day_detail .event_list ul"), _event.date, 0);
		randerEventList($("#week_detail .event_list ul"), _event.date.addDays(-_event.date.getDay()), 6);
		randerEventList($("#month_detail .event_list ul"), _event.date.addDays(-_event.date.getDate() + 1), _event.date.getDaysInMonthOfYear() - 1);
	}
	function onEventCreateFailed(data){}
	var id = event.target.id;
	var date = new Date($("#" + id + " .year").html() + " " + $("#" + id + " .month").html() + " " + $("#" + id + " .date").html())
	var desc_input = createHTMLElement("input", {"name":"description","type":"text"});
	var amount_input = createHTMLElement("input", {"name":"amount","type":"text"});
	var btn = createHTMLElement("button", {}, {"click":onEventCreateBtnClick}, "OK");
	var year_input = createHTMLElement("input", {"type":"hidden","value":date.getFullYear()});
	var month_input = createHTMLElement("input", {"type":"hidden","value":date.getMonth()});
	var date_input = createHTMLElement("input", {"type":"hidden","value":date.getDate()});
	var cate_select = createHTMLElement("select");
	$("#cate_list ul li").each(function(index, data){
		cate_select.appendChild(createHTMLElement("option", {"value":data.id.split("cate")[1]}, {}, data.innerHTML));
	});
	var div = createHTMLElement("div");
	$(div).append("Description:").append(desc_input).append("<br/>").append("Amount:").append(amount_input).append("<br/>").append(cate_select).append("<br/>").append(btn);
	showDialog(div);
	
}

function onRegisterBtnClick(event){
	function onRegisterSuccess(data){
		alert("Thank you for your registeration");
		window.location.assign("rander");
	}
	function onRegisterFailed(data){}

	var username_value = document.getElementById("username").value;
	var email_value = document.getElementById("email").value;
	var username_pattern = /^[a-zA-Z\ ]+$/g;
	var email_pattern = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g
	if(username_pattern.exec(username_value) && email_pattern.exec(email_value)){
		$.ajax({
			url:"API/register",
			type:"POST",
			data:"email="+email_value+"&username="+username_value,
			success:onRegisterSuccess,
			failed:onRegisterFailed,
		});	
	}else{
		alert("invalidated value");
	}
}

function onLogoutBtnClick(event){
	window.location.assign("logout");
}

function onDialogCloseBtnClick(event){
	closeDialog()
}

function onCateCreateBtnClick(event){
	function onCateCreateComfirmBtnClick(){
		var name_pattern = /^[\w]*$/g;
		var RGB_pattern = /^(#[0-9a-fA-F]{6}|rgb\(\ *[0-9]{1,3}\ *,\ *[0-9]{1,3}\ *,\ *[0-9]{1,3}\ *\))/g;
		if(name_input.value !== "" && RGB_input.value !== "" && name_pattern.exec(name_input.value) && RGB_pattern.exec(RGB_input.value)){
			$.ajax({
				type:"POST",
				url:"API/createCate",
				data:"name="+name_input.value+"&RGB="+RGB_input.value,
				success:onCateCreateSuccess,
				failed:onCateCreateFailed
			});
		}else{
			alert("invalidated value");
			return false;
		}
	}
	function onCateCreateSuccess(data){
		closeDialog();
		getCateList();
		console.log(data)
	}
	function onCateCreateFailed(data){}
	
	var btn = createHTMLElement("button", {}, {"click":onCateCreateComfirmBtnClick}, "OK");
	var name_input = createHTMLElement("input", {"type":"text"});
	var RGB_input = createHTMLElement("input", {"type":"text"});
	var div = createHTMLElement("div");
	$(div).append("Name:").append(name_input).append("<br/>").append("RGB Color:").append(RGB_input).append("<br/>").append(btn).append(getColorScheme(RGB_input));
	showDialog(div);
}
function onDayDetailBtnClick(event){
	$("#week_detail, #month_detail").css("display","none");
	$("#day_detail").css("display", "block");
}
function onWeekDetailBtnClick(event){
	$("#day_detail, #month_detail").css("display","none");
	$("#week_detail").css("display","block");
}
function onMonthDetailBtnClick(event){
	$("#day_detail, #week_detail").css("display","none");
	$("#month_detail").css("display","block");
}
