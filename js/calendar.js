(function( $ ){
	$.fn.Calendar = function(es, onResize, onMouseOnDay, onDayClick, onDayDblClick){
		var methods = {
			rander : function(){
				methods.clearViews();
				onResize();
				//methods.adjustDaysSize();
				methods.displayDaysOnCalendar();
				methods.displayEventsFromEventsSources();
				methods.showMore();
			},

			adjustDaysSize : function () {
				_width = $this.width();
				_height = $this.height();
				$(".calDay").each(function () {
					$(this).width(Math.floor(_width/7) - parseInt($(this).css("border-left-width")) -  parseInt($(this).css("border-right-width")));
					$(this).height(Math.floor((_height - $(".calNavBar").outerHeight() - $(".calDayTitle").outerHeight())/6) - parseInt($(this).css("border-top-width")) - parseInt($(this).css("border-bottom-width")));
				});
				$(".calDayTitle").each(function (index) {
					$(this).width(Math.floor(_width/7) - parseInt($(this).css("border-left-width")) -  parseInt($(this).css("border-right-width")));
				});
			},

			clearViews : function (){
				$(".calToday, .calInMonth").removeClass("calToday calInMonth");
				$(".calDay ul").empty();
			},

			displayDaysOnCalendar : function (){
				displayRange = methods.getDisplayDays(selectedDate);
				for(i = 0 ; i < 42 ; i++){
					d_a = displayRange[i].toDateString().split(" ")
					$("#calDay" + i + " .year").html(d_a[3])
					$("#calDay" + i + " .month").html(d_a[1])
					$("#calDay" + i + " .date").html(d_a[2]);
					if(displayRange[i].toDateString() === now.toDateString()){
						$("#calDay" + i).addClass("calToday").addClass("calSelectedDay");
					}
					if(displayRange[i].getMonth() === selectedDate.getMonth()){
						$("#calDay" + i).addClass("calInMonth");
					}
				}
				$(".calNavBar span").html(selectedDate.toDateString().split(" ")[1] + " " + selectedDate.toDateString().split(" ")[3]);
			},
		
			fetchEventsFromEventsSources : function(){
				for(i=0;i<eventsSources.length;i++){
					if(eventsSources[i] !== null && eventsSources[i] !== undefined){
						methods.fetchEventsFromEventsSource(eventsSources[i]);
					}
				}
			},
			
			fetchEventsFromEventsSource:function(eventsSource){
				var cate = eventsSource;
				$.ajax({
					url:"API/fetchEventsFromEventsSource",
					type:"POST",
					data:"id=" + cate.id,
					success:function(data){
						cate.events.length = 0;
						cate.sum = 0;
						$(JSON.parse(data)).each(function (index, data){
							data.date = new Date();
							data.date.setYear(data.year);
							data.date.setMonth(data.month -1);
							data.date.setDate(data.day);
							cate.events.push(data);
							cate.sum += parseInt(data.amount);
						});
					},
					error:function(){
						console.log("faild to fetch events from " + this.url);
					}
				});
			},

			displayEventsFromEventsSources:function(){
				displayRange = methods.getDisplayDays(selectedDate);
				$(".calDay .sum").html("");
				for(i=0;i<eventsSources.length;i++){
					var eventsSource = eventsSources[i]
					for(j=0;j<eventsSource.events.length;j++){
						var _event = eventsSource.events[j];
						var k;
						for(k=0;k<displayRange.length;k++){
							var date = displayRange[k];
							if(date.toDateString() === _event.date.toDateString() && eventsSource.visible){
								function onEventDeleteBtnClick(event){
									function onEventDeleteSuccess(){
										event.target.parentNode.parentNode.removeChild(event.target.parentNode);
										eventsSource.events[eventsSource.events.indexOf(_event)] = null;
										console.log(event);
									}
									$.ajax({
										type:"POST",
										url:"API/deleteEvent",
										data:"id="+_event.id,
										success:onEventDeleteSuccess
									});
									console.log(_event);
								}
								li = createHTMLElement("li", {"class":"event"}, {}, "<span class=\"description\" style=\"color:"+eventsSource.RGB+"\">"+_event.description+"</span><span class=\"amount\">"+_event.amount+"</span>");
								$("#calDay" + k + " ul").append(li);
								if($("#calDay" + k + " .sum").html() === ""){
									$("#calDay" + k + " .sum").html(_event.amount);
								}else{
									$("#calDay" + k + " .sum").html(parseInt($("#calDay" + k + " .sum").html()) + parseInt(_event.amount));
								}
							}
						}
					}
				}
			},
		
			showMore:function(){
				$(".calDay").each(function(index, data){
					if((length = data.getElementsByClassName("event").length) > 1){
						$("#calDay"+index+" ul").append("<li class=\"more\">" + (length - 1) + " more</li>");
					}
				});
			},
			
			createDayViewer: function (index){
				elem = document.createElement("div");
				$(elem).addClass("calDay")
				       .attr("id", "calDay" + index)
				       .html("<span class=\"year\"></span><span class=\"month\"></span><span class=\"date\"></span><span class=\"sum\"></span><ul></ul>")
				       .dblclick(function(event){onDayDblClick(event)})	
				       .click(function(event){$(".calSelectedDay").removeClass("calSelectedDay"); $(event.target).addClass("calSelectedDay");})
                       .mouseover(onDayClick)
				return elem;
			},
	
			getDisplayDays: function(date){
				start = new Date(date.getTime());
				start.setDate(1);
				start = start.addDays(-start.getDay());
				range = [];	
				for(i = 0 ; i < 42; i++){
					d = start.addDays(i);
					range.push(d);
				}
				return range;
			},

			viewPreviousMonth: function(){
				selectedDate = selectedDate.addMonths(-1);
				$(".calSelectedDay").removeClass("calSelectedDay");
				methods.rander();
			},

			viewNextMonth: function (){
				selectedDate = selectedDate.addMonths(1);
				$(".calSelectedDay").removeClass("calSelectedDay");
				methods.rander();
			},
	
			viewPreviousYear: function(){
				selectedDate = selectedDate.addYears(-1);
				$(".calSelectedDay").removeClass("calSelectedDay");
				methods.rander();
			},

			viewNextYear: function (){
				selectedDate = selectedDate.addYears(1);
				$(".calSelectedDay").removeClass("calSelectedDay");
				methods.rander();
			},

			fillDays:function (){
				for(i = 0 ; i < 6 * 7; i++){
					var dElem = methods.createDayViewer(i);
					if(i <= 6){
						$(dElem).addClass("calTopDays");
					}
					if(i % 7 === 0){
						$(dElem).addClass("calLeftDays");
					}
					$this.append(dElem);
				}
			},

			fillNavBar:function(){
				cal_nav_bar = document.createElement("div");
				$(cal_nav_bar).addClass("calNavBar");
				$(cal_nav_bar).html("<div id=\"nav_bar\"></div><div id=\"dayTitle\"></div>");
				cal_next_month_btn = document.createElement("button");
				cal_next_year_btn = document.createElement("button");
				cal_pre_month_btn = document.createElement("button");
				cal_pre_year_btn = document.createElement("button");
				$(cal_next_month_btn).addClass("ui_border_radius ui_blue_background").html(">").click(methods.viewNextMonth);
				$(cal_next_year_btn).addClass("ui_border_radius ui_blue_background").html(">>").click(methods.viewNextYear);
				$(cal_pre_month_btn).addClass("ui_border_radius ui_blue_background").html("<").click(methods.viewPreviousMonth);
				$(cal_pre_year_btn).addClass("ui_border_radius ui_blue_background").html("<<").click(methods.viewPreviousYear);
				$($(cal_nav_bar).children()[0]).append(cal_pre_year_btn);
				$($(cal_nav_bar).children()[0]).append(cal_pre_month_btn);
				$($(cal_nav_bar).children()[0]).append("<span></span>")
				$($(cal_nav_bar).children()[0]).append(cal_next_month_btn);
				$($(cal_nav_bar).children()[0]).append(cal_next_year_btn);
				$($(cal_nav_bar).children()[1]).append("<div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>");
				$($(cal_nav_bar).children()[1]).children().addClass("calDayTitle");
				$this.append(cal_nav_bar);
			},

			init : function (){
				$this.addClass("Calendar");
				methods.fillNavBar();
				methods.fillDays();
				setInterval(function (){methods.fetchEventsFromEventsSources();}, 5000);
				setInterval(function (){methods.rander();}, 500);
				methods.fetchEventsFromEventsSources();
				methods.rander();
			}
		};
		var $this = this;
		var now = new Date();
		var selectedDate = now;
		var eventsSources = es;
		$(window).resize(function (){
			methods.rander();
		})
		methods.init();
	}
})( jQuery )
