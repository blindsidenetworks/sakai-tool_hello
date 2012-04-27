function HelloPermissions(data) {
	if(data) {
		for(var i=0,j=data.length;i<j;i++) {
			
			// Hello specific permissions
			if('hello.admin' === data[i]) {
				this.helloAdmin = true;
			}else if('hello.create' === data[i]) {
				this.helloCreate = true;
			}else if('hello.edit.own' === data[i]) {
				this.helloEditOwn = true;
				this.helloViewMeetingList = true;
			}else if('hello.edit.any' === data[i]) {
				this.helloEditAny = true;
				this.helloViewMeetingList = true;
			}else if('hello.delete.own' === data[i]) {
				this.helloDeleteOwn = true;
				this.helloViewMeetingList = true;
			}else if('hello.delete.any' === data[i]) {
				this.helloDeleteAny = true;
				this.helloViewMeetingList = true;
			}else if('hello.participate' === data[i]) {
				this.helloParticipate = true;
				this.helloViewMeetingList = true;
			}
			
			// Sakai permissions
			// Site Info:
			else if('site.upd' === data[i]) {
				this.siteUpdate = true;
			}else if('site.viewRoster' === data[i]) {
				this.siteViewRoster = true;
			// Calendar:
			}else if('calendar.new' === data[i]) {
				this.calendarNew = true;
			}else if('calendar.revise.own' === data[i]) {
				this.calendarReviseOwn = true;
			}else if('calendar.revise.any' === data[i]) {
				this.calendarReviseAny = true;
			}else if('calendar.delete.own' === data[i]) {
				this.calendarDeleteOwn = true;
			}else if('calendar.delete.any' === data[i]) {
				this.calendarDeleteAny = true;
			}
		}
	}	
}