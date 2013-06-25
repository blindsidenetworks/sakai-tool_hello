function EPortfolioPermissions(data) {
	if(data) {
		for(var i=0,j=data.length;i<j;i++) {
			
			// EPortfolio specific permissions
			if('eportfolio.admin' === data[i]) {
				this.eportfolioAdmin = true;
				this.eportfolioViewAssignmentList = true;
			}else if('eportfolio.activate' === data[i]) {
				this.eportfolioActivate = true;
				this.eportfolioViewAssignmentList = true;
			}else if('eportfolio.edit.own' === data[i]) {
				this.eportfolioEditOwn = true;
				this.eportfolioViewAssignmentList = true;
			}else if('eportfolio.edit.any' === data[i]) {
				this.eportfolioEditAny = true;
				this.eportfolioViewAssignmentList = true;
			}else if('eportfolio.grade.own' === data[i]) {
				this.eportfolioGradeOwn = true;
				this.eportfolioViewAssignmentList = true;
			}else if('eportfolio.grade.any' === data[i]) {
				this.eportfolioGradeAny = true;
				this.eportfolioViewAssignmentList = true;
			}else if('eportfolio.deactivate.own' === data[i]) {
				this.eportfolioDeactivateOwn = true;
				this.eportfolioViewAssignmentList = true;
			}else if('eportfolio.deactivate.any' === data[i]) {
				this.eportfolioDeactivateAny = true;
				this.eportfolioViewAssignmentList = true;
			}else if('eportfolio.participate' === data[i]) {
				this.eportfolioParticipate = true;
				this.eportfolioViewAssignmentList = true;
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

		if(this.eportfolioAdmin) {
			this.eportfolioParticipate = false;
		}

	}	
}