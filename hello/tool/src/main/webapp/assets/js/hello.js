/* Stuff that we always expect to be setup */
var eportfolioErrorLog = new Object();

(function() {
    // Setup Ajax defaults
	EPortfolioUtils.setupAjax();

    // Process parameters
	var arg = EPortfolioUtils.getParameters();
	if (!arg || !eportfolioSettings.site.siteId) {
		EPortfolioUtils.showMessage(eportfolio_err_no_siteid, 'error');
		return;
	}

	// Process permissions
	var permissions = EPortfolioUtils.getUserPermissions();
	eportfolioSettings.userPerms = new EPortfolioPermissions(permissions);

	// Process permissions
	eportfolioSettings.site.options = EPortfolioUtils.getSiteOptions(eportfolioSettings.site.siteId);

	// We need the toolbar in a template so we can swap in the translations
	EPortfolioUtils.render('eportfolio_toolbar_template', {}, 'eportfolio_toolbar');

	// If user is allowed to site updates render the footer
	if (eportfolioSettings.userPerms.siteUpdate) {
		EPortfolioUtils.render('eportfolio_footer_template', { 'versionTag' : eportfolioSettings.tool.version + '_' + eportfolioSettings.tool.buildSerial	}, 
			'eportfolio_footer');
	}

	$('#eportfolio_list_link').bind('click', function(e) {
		return switchState('assignmentList');
	});

	$('#eportfolio_add_assignment_link').bind('click', function(e) {
		return switchState('addAssignment');
	});

	$('#eportfolio_options_link').bind('click', function(e) {
		return switchState('options', arg);
	});

	$('#eportfolio_permissions_link').bind('click', function(e) {
		return switchState('permissions');
	});

	$('#eportfolio_test_link').bind('click', function(e) {
		return switchState('test');
	});

	// This is always showing in every state.
	$('#eportfolio_home_link').show();

	// Now switch into the requested state
	if (eportfolioSettings.user.userId != null) {
		if (arg.state) {
			switchState(arg.state, arg);
		} else {
			switchState('assignmentList');
		}
	} else {
		EPortfolioUtils.showMessage(eportfolio_err_no_user, 'error');
		$('#eportfolio_container').empty();
	}

})();

function switchState(state, arg) {

	$('#eportfolio_content').empty();
	
    // show permissions and configuration links only if site maintainer
    if(eportfolioSettings.userPerms.siteUpdate) {
        $('#eportfolio_options_link').parent().parent().show();
        $('#eportfolio_permissions_link').parent().parent().show();
        $('#eportfolio_test_link').parent().parent().show();
    }else{
        $('#eportfolio_options_link').parent().parent().hide();
        $('#eportfolio_permissions_link').parent().parent().hide();
        $('#eportfolio_test_link').parent().parent().hide();
    }
    // show maintaining links only if allowed to
    if(eportfolioSettings.userPerms.eportfolioActivate) {
        $('#eportfolio_add_assignment_link').parent().parent().show();
    } else {
        $('#eportfolio_add_assignment_link').parent().parent().hide();
    }

	if ('assignmentList' === state) {
		EPortfolioUtils.hideMessage();
        
		if(eportfolioSettings.userPerms.eportfolioViewAssignmentList) {
        	var cur = Object();
        	cur.siteId = eportfolioSettings.site.siteId;
        	cur.toolId = eportfolioSettings.tool.toolId;
        	cur.userId = eportfolioSettings.user.userId;
        	cur.userEid = eportfolioSettings.user.userEid;
        	cur.userPerms = eportfolioSettings.userPerms;
        	cur.list = Array();
        	cur.list = EPortfolioUtils.getAssignmentList(cur.siteId, cur.userEid);
        	
    		EPortfolioUtils.render('eportfolio_assignmentlist_template', { "cur" : cur }, 'eportfolio_content');
    		
        }else{
            // warn about lack of permissions
            if(eportfolioSettings.userPerms.siteUpdate) {
            	EPortfolioUtils.showMessage(eportfolio_err_no_tool_permissions_maintainer);
            }else{
            	EPortfolioUtils.showMessage(eportfolio_err_no_tool_permissions);
            }
            $('#eportfolio_content').empty();
        }

        EPortfolioUtils.adjustFrameHeight();

	} else if ('addAssignment' === state ) {

		if( eportfolioSettings.site.options.departmentId != "" && eportfolioSettings.site.options.coursegroupId != "" ){
			var cur = Object();
			cur.siteid = eportfolioSettings.site.siteId;
			cur.id = "";
			cur.title = "";
        	cur.description = "";
        	cur.start_date = "";
        	cur.due_date = "";
        	cur.cutoff_date = "";
        	cur.add_due_date = false;
        	cur.auto_announce = true;
        	
			EPortfolioUtils.render('eportfolio_addeditassignment_template', { "cur": cur }, 'eportfolio_content');
			$('#eportfolio_addeditassignment_title').text(eportfolio_add_assignment_label);

	    	$(document).ready(function() {

	    		if( cur.title != "" )
	        		$('#eportfolio_addedit_assignment_title').val(cur.departmentLabel);

	        	$('#eportfolio_addedit_assignment_title').autocomplete({
					disabled: 	false,
					autoFocus: 	true,
					minLength:	0,
					select: 	function(event, ui) { 
						cur.id = ui.item.id;
						cur.title = ui.item.label;
			        	cur.description = ui.item.description;
			        	cur.start_date = ui.item.start_date;
			        	cur.due_date = ui.item.due_date;
			        	cur.cutoff_date = ui.item.cutoff_date;
						$('#eportfolio_addedit_assignment_instructions').val(cur.description);
						$('#eportfolio_addedit_assignment_opendate').val(cur.start_date);
						$('#eportfolio_addedit_assignment_duedate').val(cur.due_date);
						$('#eportfolio_addedit_assignment_closedate').val(cur.cutoff_date);
						eportfolio_assignment_check_add_due_date
					},
					change:		function(event, ui) {
			        	//cur.opendate = "";
			        	//cur.duedate = "";
			        	//cur.closedate = "";
			        	//cur.instructions = "";
						//$('#eportfolio_addedit_assignment_instructions').val(cur.instructions);
					}
	    		}).focus( function(){
					$(this).autocomplete('option', 'source', EPortfolioUtils.getAssignmentListRemote(cur.siteid));
					if(this.value != "")
						$(this).autocomplete("search", this.value);
	        	});
	        	

	        	$('#eportfolio_addedit_save_button').bind('click', function() {
	        		cur.add_due_date = $('#eportfolio_assignment_check_add_due_date:checked').val();
	        		cur.add_due_date = (cur.add_due_date != undefined);
	        		cur.auto_announce = $('#eportfolio_assignment_check_auto_announce:checked').val();
	        		cur.auto_announce = (cur.auto_announce != undefined);

	        		////////////////////////////
	        		/// For development only ///
                    ////////////////////////////
	        		if(cur.description == ""){
	        			cur.description = "Description for testing";
	        		}
	        		if (cur.start_date == "" ){
	        			cur.start_date = "2012-05-10";
	        		} 
	        		if (cur.due_date == "" ){
	        			cur.due_date = "2012-05-12";
	        		} 
	        		if (cur.cutoff_date == "" ){
	        			cur.cutoff_date = "2012-05-13";
	        		}
                    ////////////////////////////
                    ////////////////////////////

	        		cur.start_date = new Date(cur.start_date);
	        		cur.start_date = cur.start_date/1000;
	        		cur.due_date = new Date(cur.due_date);
	        		cur.due_date = cur.due_date/1000;
	        		cur.cutoff_date = new Date(cur.cutoff_date);
	        		cur.cutoff_date = cur.cutoff_date/1000;

	        		if(cur.description == ""){
	                    EPortfolioUtils.showMessage(eportfolio_addedit_assignment_warn_nodescription, 'warn');
	        		} else if (cur.start_date == "" ){
	                    EPortfolioUtils.showMessage(eportfolio_addedit_assignment_warn_noopendate, 'warn');
	        		} else if (cur.due_date == "" ){
	                    EPortfolioUtils.showMessage(eportfolio_addedit_assignment_warn_noduedate, 'warn');
	        		} else if (cur.cutoff_date == "" ){
	                    EPortfolioUtils.showMessage(eportfolio_addedit_assignment_warn_noclosedate, 'warn');
	        		} else {
		                EPortfolioUtils.saveAssignment(cur, function() {
		                    // success callback
		                	
		                    EPortfolioUtils.showMessage(eportfolio_addedit_assignment_saved, 'success');
		                    switchState('assignmentList');
		                })
	        		}
	             });
	            
	            EPortfolioUtils.adjustFrameHeight();
	        });
	        
	        
		
		} else {
        	EPortfolioUtils.showMessage(eportfolio_err_no_tool_options_maintainer);
            $('#eportfolio_content').empty();

            EPortfolioUtils.adjustFrameHeight();
		}
	} else if ('updateAssignment' === state) {
		if( eportfolioSettings.site.options.departmentId != "" && eportfolioSettings.site.options.coursegroupId != "" ){
			var cur = Object();
			cur.siteid = eportfolioSettings.site.siteId;
			cur.id = arg.assignmentId;
			cur.title = arg.title;
        	cur.description = arg.instructions;
        	cur.start_date = new Date(arg.openDate);
        	cur.due_date = new Date(arg.dueDate);
        	cur.cutoff_date = new Date(arg.acceptDate);
        	cur.add_due_date = arg.isSchedulable;
        	cur.auto_announce = arg.isAnnounceable;
        	
			EPortfolioUtils.render('eportfolio_addeditassignment_template', { 'cur': cur }, 'eportfolio_content');
			$('#eportfolio_addeditassignment_title').text(eportfolio_edit_assignment_label);
			$('#eportfolio_addedit_assignment_title').attr('readonly', 'readonly');
			
	    	$(document).ready(function() {

	    		if( cur.title != "" ) $('#eportfolio_addedit_assignment_title').val(cur.departmentLabel);

	        	$('#eportfolio_addedit_save_button').bind('click', function() {
	        		cur.add_due_date = $('#eportfolio_assignment_check_add_due_date:checked').val();
	        		cur.add_due_date = (cur.add_due_date != undefined);
	        		cur.auto_announce = $('#eportfolio_assignment_check_auto_announce:checked').val();
	        		cur.auto_announce = (cur.auto_announce != undefined);

	        		////////////////////////////
	        		/// For development only ///
                    ////////////////////////////
	        		if(cur.description == ""){
	        			cur.description = "Description for testing";
	        		}
	        		if (cur.start_date == "" ){
	        			cur.start_date = "2012-05-10";
	        		} 
	        		if (cur.due_date == "" ){
	        			cur.due_date = "2012-05-12";
	        		} 
	        		if (cur.cutoff_date == "" ){
	        			cur.cutoff_date = "2012-05-13";
	        		}
                    ////////////////////////////
                    ////////////////////////////

	        		cur.start_date = new Date(cur.start_date);
	        		cur.start_date = cur.start_date/1000;
	        		cur.due_date = new Date(cur.due_date);
	        		cur.due_date = cur.due_date/1000;
	        		cur.cutoff_date = new Date(cur.cutoff_date);
	        		cur.cutoff_date = cur.cutoff_date/1000;

	        		if(cur.description == ""){
	                    EPortfolioUtils.showMessage(eportfolio_addedit_assignment_warn_nodescription, 'warn');
	        		} else if (cur.start_date == "" ){
	                    EPortfolioUtils.showMessage(eportfolio_addedit_assignment_warn_noopendate, 'warn');
	        		} else if (cur.due_date == "" ){
	                    EPortfolioUtils.showMessage(eportfolio_addedit_assignment_warn_noduedate, 'warn');
	        		} else if (cur.cutoff_date == "" ){
	                    EPortfolioUtils.showMessage(eportfolio_addedit_assignment_warn_noclosedate, 'warn');
	        		} else {
		                EPortfolioUtils.saveAssignment(cur, function() {
		                    // success callback
		                	
		                    EPortfolioUtils.showMessage(eportfolio_addedit_assignment_saved, 'success');
		                    switchState('assignmentList');
		                })
	        		}
	             });
	            
	            EPortfolioUtils.adjustFrameHeight();
	        });
	        
	        
		
		} else {
        	EPortfolioUtils.showMessage(eportfolio_err_no_tool_options_maintainer);
            $('#eportfolio_content').empty();

            EPortfolioUtils.adjustFrameHeight();
		}
		
	} else if ('gradeAssignment' === state) {
		var assignmentid = arg; 
		var cur = Object();
		cur = EPortfolioUtils.getAssignmentRemote(assignmentid, eportfolioSettings.site.siteId);
		var grades = EPortfolioUtils.getGrades(assignmentid, eportfolioSettings.site.siteId);
		cur.grades = grades.grades;
		cur.siteid = eportfolioSettings.site.siteId;
		
		EPortfolioUtils.render('eportfolio_gradelist_template', { "cur": cur }, 'eportfolio_content');
		$('#eportfolio_gradelist_title').text(eportfolio_gradelist_label + ": " + cur.assignment.name );

		$(document).ready(function() {

    		$('#eportfolio_gradelist_import_button').bind('click', function() {
    			EPortfolioUtils.hideMessage();

    			EPortfolioUtils.importGrades(cur.assignment.id, cur.siteid, function() {
    				EPortfolioUtils.showMessage(eportfolio_gradelist_import_grades_success, 'success');
        			switchState('gradeAssignment', cur.assignment.id);
                }, function() {
    				EPortfolioUtils.showMessage(eportfolio_gradelist_import_grades_error, 'error');
                });

            });

    		$('#eportfolio_gradelist_release_button').bind('click', function() {
    			EPortfolioUtils.hideMessage();

    			EPortfolioUtils.releaseGrades(cur.assignment.id, cur.siteid, function() {
    				EPortfolioUtils.showMessage(eportfolio_gradelist_release_grades_success, 'success');
        			switchState('gradeAssignment', cur.assignment.id);
                }, function() {
    				EPortfolioUtils.showMessage(eportfolio_gradelist_release_grades_error, 'error');
                });

    			switchState('gradeAssignment', cur.assignment.id);

            });
    		
    		EPortfolioUtils.adjustFrameHeight();
        });


	} else if ('options' === state) {
		EPortfolioUtils.render('eportfolio_options_template', {}, 'eportfolio_content');
		
    	var cur = Object();
        $(document).ready(function() {
        	
    		var firstTime = ( eportfolioSettings.site.options.departmentId == "" && eportfolioSettings.site.options.coursegroupId == "" );
    		var optionsChanged = false;

    		cur.siteId = eportfolioSettings.site.siteId;
        	cur.departmentId = eportfolioSettings.site.options.departmentId;
        	cur.departmentLabel = eportfolioSettings.site.options.departmentLabel;
        	cur.coursegroupId = eportfolioSettings.site.options.coursegroupId;
        	cur.coursegroupLabel = eportfolioSettings.site.options.coursegroupLabel;
        	
        	if( cur.departmentLabel != "" )
        		$('#eportfolio_options_department').val(cur.departmentLabel);
        	
        	if( cur.coursegroupLabel != "" )
        		$('#eportfolio_options_coursegroup').val(cur.coursegroupLabel);

        	$('#eportfolio_options_department').autocomplete({
				disabled: 	false,
				autoFocus: 	true,
				minLength:	0,
				select: 	function(event, ui) { 
					cur.departmentId = ui.item.id;
					cur.departmentLabel = ui.item.label;
				},
				change:		function(event, ui) {
					cur.coursegroupId = "";
					cur.coursegroupLabel = "";
					$('#eportfolio_options_coursegroup').val(cur.coursegroupLabel);
					optionsChanged = true;					
				}
    		}).focus( function(){
				$(this).autocomplete('option', 'source', EPortfolioUtils.getDepartmentListRemote());
				if(this.value != "")
					$(this).autocomplete("search", this.value);
        	});
        	
    		$('#eportfolio_options_coursegroup').autocomplete({
				disabled: 	false,
				autoFocus: 	true,
				minLength:	0,
				select: 	function(event, ui) { 
					cur.coursegroupId = ui.item.id;
					cur.coursegroupLabel = ui.item.label;
				},
				change:		function(event, ui) {
					optionsChanged = true;					
				}
    		}).focus( function(){
				$(this).autocomplete('option', 'source', EPortfolioUtils.getCourseGroupListRemote(cur.departmentId));
				if(this.value != "")
					$(this).autocomplete("search", this.value);
        	});

    		$('#eportfolio_options_save_button').bind('click', function() {
    			var doSave = false;
    			if( optionsChanged ){
    				if( firstTime ){
    	    			doSave = true;
    				} else {
        				doSave = confirm(eportfolio_options_save_confirmation);
    				}
    			}
    					
    			if( doSave ) {
    				//Delete all the assignments previously added
    				if( !firstTime ){
    					//EPortfolioUtils.removeAllAssignments();
    		        	assignmentList = Array();
    		        	assignmentList = EPortfolioUtils.getAssignmentList(eportfolioSettings.site.siteId, eportfolioSettings.user.userEid);
    				    for(i=0; i<assignmentList.length; i++){
    				    	EPortfolioUtils.removeAssignment(assignmentList[i].id);
    				   	}

    				}
    				//Save the new options
                    EPortfolioUtils.setSiteOptions(cur, function() {
                        // success callback
                    	eportfolioSettings.site.options.departmentId = cur.departmentId;
                    	eportfolioSettings.site.options.departmentLabel = cur.departmentLabel;
                    	eportfolioSettings.site.options.coursegroupId = cur.coursegroupId;
                    	eportfolioSettings.site.options.coursegroupLabel = cur.coursegroupLabel;
                    	
                        EPortfolioUtils.showMessage(eportfolio_options_saved, 'success');
                        //switchState('assignmentList');
                    });
    			}
    				
             });
            
            EPortfolioUtils.adjustFrameHeight();
        });

	} else if ('permissions' === state) {

		EPortfolioUtils.render('eportfolio_permissions_template', {'permissions': EPortfolioUtils.getSitePermissions()}, 'eportfolio_content');
        
        $(document).ready(function() {
            $('#eportfolio_permissions_save_button').bind('click', function() {
               EPortfolioUtils.setSitePermissions('.eportfolio_permission_checkbox', function() {
                   // success callback
            	   eportfolioSettings.userPerms = new EPortfolioPermissions(EPortfolioUtils.getUserPermissions());

            	   EPortfolioUtils.showMessage(eportfolio_permissions_saved, 'success');
               })
            });

            EPortfolioUtils.adjustFrameHeight();
        });
		
		
	} else if ('test' === state) {
		
        var contextData = {
                'testQuery' : EPortfolioUtils.getTest()
        	};
		EPortfolioUtils.render('eportfolio_test_template', contextData, 'eportfolio_content');
		
		EPortfolioUtils.adjustFrameHeight();
	}

}

function updateAssignment(assignmentId) {
	var assignment = Object();
	assignment = EPortfolioUtils.getAssignment(assignmentId);
	return switchState('updateAssignment', assignment);
}

function removeAssignment(assignmentId) {
	if (confirm(eportfolio_list_remove_assignment_confirmation(assignmentId))) {
		EPortfolioUtils.removeAssignment(assignmentId);
	}
	return switchState('assignmentList');
}

function gradeAssignment(assignmentId) {
	return switchState('gradeAssignment', assignmentId);
}

function ImportGrades(assignmentId) {
	return switchState('gradeAssignment', assignmentId);
}
