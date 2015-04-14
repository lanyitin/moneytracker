Date.prototype.isLeapYear = function () {return this.getFullYear()%4?0:this.getFullYear()%100?1:this.getFullYear%400?0:1}
Date.prototype.getDaysInMonthOfYear = function(){
	month = this.getMonth();
	if(month === 1){
		return this.isLeapYear()? 29:28;
	}else{
		if(month>=8){
			return month%2? 31:30;
		}else{
			return month%2? 31:30;
		}
	}
}
Date.prototype.addDays = function(days){
	return new Date(this.getTime() + days*24*60*60*1000);
}
Date.prototype.addMonths = function(months){
	return new Date(this.getTime() + months*this.getDaysInMonthOfYear()*24*60*60*1000);
}

Date.prototype.addYears = function(year){
	return new Date(this.getTime() + year*24*60*60*1000*(this.isLeapYear()?366:365));
}
