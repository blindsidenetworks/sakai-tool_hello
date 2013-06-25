var EPortfolioUtils;

(function() {

	if(EPortfolioUtils == null)
		EPortfolioUtils = new Object();
		
    var eportfolioUserSelectionOptions = null;
	var eportfolioTrimpathModifiers = null;
	var eportfolioTrimpathMacros = null;

	// Custom calls
	EPortfolioUtils.getTest = function() {
		var response = "";
		jQuery.ajax( {
	 		url : "/direct/" + eportfolioSettings.tool.entityPrefix + "/test.json",
	   		dataType : "text",
			type:"GET",
            async : false,
		   	success : function(t) {
				response = t;
			},
			error : function(xmlHttpRequest,status,error) {
				EPortfolioUtils.handleError(eportfolio_err_internal, xmlHttpRequest.status, xmlHttpRequest.statusText);
			}
	  	});

		return response;
		
	}
	
	EPortfolioUtils.getSiteOptions = function(siteId) {
		var response = new Object();
		jQuery.ajax( {
	 		url : "/direct/" + eportfolioSettings.tool.entityPrefix + "/getSiteOptions.json?siteid=" + siteId,
	   		dataType : "json",
            async : false,
		   	success : function(r) {
		   		response = r;
			},
			error : function(xmlHttpRequest,status,error) {
				EPortfolioUtils.handleError(eportfolio_err_internal, xmlHttpRequest.status, xmlHttpRequest.statusText);
			}
	  	});

		return response;
	}

    // Set the site options
	EPortfolioUtils.setSiteOptions = function(cur, successCallback, errorCallback) {
        jQuery.ajax( {
            url : "/direct/" + eportfolioSettings.tool.entityPrefix + "/setSiteOptions?siteid=" + cur.siteId + "&deptid=" + cur.departmentId + "&coursegroupid=" + cur.coursegroupId,
            type : 'GET',
            async : false,
            dataType: 'text',
            success : function(data) {
                if(successCallback) successCallback();
            },
            error : function(xmlHttpRequest,status,error) {
            	EPortfolioUtils.handleError(eportfolio_err_set_options, xmlHttpRequest.status, xmlHttpRequest.statusText);
                if(errorCallback) errorCallback();
            }
        });
        return false;
    }
	
	EPortfolioUtils.getDepartmentListRemote = function() {
		var response = new Array();
		jQuery.ajax( {
	 		url : "/direct/" + eportfolioSettings.tool.entityPrefix + "/getDepartmentListRemote.json",
	   		dataType : "json",
            async : false,
		   	success : function(r) {
		   		if(r.department){
			   		var departments = r.department;
			   		if( $.isArray(departments)) {
			   			for(i=0; i<departments.length; i++){
			   				response.push( { label: departments[i].name, value: departments[i].name, id: departments[i].id } )
			   			}
			   		} else {
		   				response.push( { label: departments.name, value: departments.name, id: departments.id } )
			   		}
		   		}
			},
			error : function(xmlHttpRequest,status,error) {
				EPortfolioUtils.handleError(eportfolio_err_internal, xmlHttpRequest.status, xmlHttpRequest.statusText);
			}
	  	});

		return response;
	}

	EPortfolioUtils.getCourseGroupListRemote = function(deptid) {
		var response = new Array();
		jQuery.ajax( {
	 		url : "/direct/" + eportfolioSettings.tool.entityPrefix + "/getGroupListRemote.json?deptid=" + deptid,
	   		dataType : "json",
            async : false,
		   	success : function(r) {
		   		if(r.group){
			   		var groups = r.group;
			   		if( $.isArray(groups)) {
			   			for(i=0; i<groups.length; i++){
			   				response.push( { label: groups[i].title, value: groups[i].title, id: groups[i].id } )
			   			}
			   		} else {
		   				response.push( { label: groups.title, value: groups.title, id: groups.id } )
			   		}
		   		}
		   				
			},
			error : function(xmlHttpRequest,status,error) {
				EPortfolioUtils.handleError(eportfolio_err_internal, xmlHttpRequest.status, xmlHttpRequest.statusText);
			}
	  	});

		return response;
	}
	
	EPortfolioUtils.getAssignmentListRemote = function(siteid) {
		var response = new Array();
		jQuery.ajax( {
	 		url : "/direct/" + eportfolioSettings.tool.entityPrefix + "/getAssignmentListRemote.json?siteid=" + siteid,
	   		dataType : "json",
            async : false,
		   	success : function(r) {
		   		if(r.assignment){
			   		var assignments = r.assignment;
			   		if( $.isArray(assignments)) {
			   			for(i=0; i<assignments.length; i++){
			   				response.push( { 
			   					label: assignments[i].name, 
			   					value: assignments[i].name, 
			   					id: assignments[i].id, 
			   					description: assignments[i].description, 
			   					start_date: assignments[i].start_date,
			   					due_date: assignments[i].due_date,
			   					cutoff_date: assignments[i].cutoff_date
			   					} )
			   			}
			   		} else {
		   				response.push( { 
		   					label: assignments.name, 
		   					value: assignments.name, 
		   					id: assignments.id, 
		   					description: assignments.description, 
		   					start_date: assignments.start_date,
		   					due_date: assignments.due_date,
		   					cutoff_date: assignments.cutoff_date
		   					} )
			   		}
		   		}
		   				
			},
			error : function(xmlHttpRequest,status,error) {
				EPortfolioUtils.handleError(eportfolio_err_internal, xmlHttpRequest.status, xmlHttpRequest.statusText);
			}
	  	});

		return response;

	}

	EPortfolioUtils.getAssignmentRemote = function(aid, siteid) {
		var response = new Array();
		jQuery.ajax( {
	 		url : "/direct/" + eportfolioSettings.tool.entityPrefix + "/getAssignmentRemote.json?siteid=" + siteid + "&id=" + aid,
	   		dataType : "json",
            async : false,
		   	success : function(r) {
		   		response=r;
			},
			error : function(xmlHttpRequest,status,error) {
				EPortfolioUtils.handleError(eportfolio_err_internal, xmlHttpRequest.status, xmlHttpRequest.statusText);
			}
	  	});

		return response;

	}
	
	EPortfolioUtils.getGrades = function(aid, siteid) {
		var response = new Array();
		jQuery.ajax( {
	 		url : "/direct/" + eportfolioSettings.tool.entityPrefix + "/getGradeListMixed.json?siteid=" + siteid + "&id=" + aid,
	   		dataType : "json",
            async : false,
		   	success : function(g) {
		   		response=g;
			},
			error : function(xmlHttpRequest,status,error) {
				EPortfolioUtils.handleError(eportfolio_err_internal, xmlHttpRequest.status, xmlHttpRequest.statusText);
			}
	  	});

		return response;

	}
	
	EPortfolioUtils.importGrades = function(aid, siteid, successCallback, errorCallback) {
        jQuery.ajax( {
            url : "/direct/" + eportfolioSettings.tool.entityPrefix + "/importGrades?siteid=" + siteid + "&id=" + aid,
            type : 'GET',
            async : false,
            dataType: 'text',
            success : function(data) {
                if(successCallback) successCallback();
                return true;
            },
            error : function(xmlHttpRequest,status,error) {
            	EPortfolioUtils.handleError(eportfolio_err_set_options, xmlHttpRequest.status, xmlHttpRequest.statusText);
                if(errorCallback) errorCallback();
                return false;
            }
        });
		
	}
	
	EPortfolioUtils.releaseGrades = function(aid, siteid, successCallback, errorCallback) {
        jQuery.ajax( {
            url : "/direct/" + eportfolioSettings.tool.entityPrefix + "/releaseGrades?siteid=" + siteid + "&id=" + aid,
            type : 'GET',
            async : false,
            dataType: 'text',
            success : function(data) {
                if(successCallback) successCallback();
                return true;
            },
            error : function(xmlHttpRequest,status,error) {
            	EPortfolioUtils.handleError(eportfolio_err_set_options, xmlHttpRequest.status, xmlHttpRequest.statusText);
                if(errorCallback) errorCallback();
            }
        });
        return false;
		
	}
	
	EPortfolioUtils.getAssignmentList = function(siteid, userid) {
		var response = new Array();
		jQuery.ajax( {
	 		url : "/direct/" + eportfolioSettings.tool.entityPrefix + "/getAssignmentList.json?siteid=" + siteid + "&userid=" + userid,
	   		dataType : "json",
            async : false,
		   	success : function(r) {
		   		if(r.assignment){
			   		var assignments = r.assignment;
		   			for(i=0; i<assignments.length; i++){
		   				response.push( { 
		   					id: assignments[i].assignmentId, 
		   					title: assignments[i].title, 
		   					description: assignments[i].instructions, 
		   					start_date: new Date(assignments[i].openDate),
		   					due_date: new Date(assignments[i].dueDate),
		   					cutoff_date: new Date(assignments[i].acceptDate),
	   						ownerId: assignments[i].ownerId
		   					} )
		   			}
		   		}
		   				
			},
			error : function(xmlHttpRequest,status,error) {
				EPortfolioUtils.handleError(eportfolio_err_internal, xmlHttpRequest.status, xmlHttpRequest.statusText);
			}
	  	});

		return response;

	}

	EPortfolioUtils.saveAssignment = function(cur, successCallback, errorCallback) {
		var qs = "/direct/" + eportfolioSettings.tool.entityPrefix + "/saveAssignment?siteid=" + cur.siteid 
		 + "&id=" + cur.id 
		 + "&title=" + escape(cur.title) 
		 + "&description=" + escape(cur.description) 
		 + "&opendate=" + cur.start_date
		 + "&duedate=" + cur.due_date
		 + "&closedate=" + cur.cutoff_date
		 + "&schedule=" + cur.add_due_date
		 + "&announce=" + cur.auto_announce;

        jQuery.ajax( {
            url : qs,
            type : 'GET',
            async : false,
            dataType: 'text',
            success : function(data) {
                if(successCallback) successCallback();
                return true;
            },
            error : function(xmlHttpRequest,status,error) {
            	EPortfolioUtils.handleError(eportfolio_err_set_options, xmlHttpRequest.status, xmlHttpRequest.statusText);
                if(errorCallback) errorCallback();
            }
        });
        return false;
    }
	
	EPortfolioUtils.removeAssignment = function(assignmentId, successCallback, errorCallback) {
        jQuery.ajax( {
            url : "/direct/" + eportfolioSettings.tool.entityPrefix + "/removeAssignment?id=" + assignmentId,
            type : 'GET',
            async : false,
            dataType: 'text',
            success : function(data) {
                if(successCallback) successCallback();
                return true;
            },
            error : function(xmlHttpRequest,status,error) {
            	EPortfolioUtils.handleError(eportfolio_err_set_options, xmlHttpRequest.status, xmlHttpRequest.statusText);
                if(errorCallback) errorCallback();
            }
        });
        return false;
		
	}
	
	EPortfolioUtils.getAssignmentJoinURL = function(assignmentId, siteId, successCallback, errorCallback) {
		var response = "";
        jQuery.ajax( {
            url : "/direct/" + eportfolioSettings.tool.entityPrefix + "/getAssignmentJoinURL?id=" + assignmentId + "&siteid=" + siteId,
            type : 'GET',
            async : false,
            dataType: 'text',
            success : function(url) {
                if(successCallback) successCallback();
                response = url;
            },
            error : function(xmlHttpRequest,status,error) {
            	EPortfolioUtils.handleError(eportfolio_err_set_options, xmlHttpRequest.status, xmlHttpRequest.statusText);
                if(errorCallback) errorCallback();
            }
        });
        return response;
		
	}
	
	EPortfolioUtils.joinAssignment = function(assignmentId, siteId, linkSelector) {
		var joinUrl = "/direct/" + eportfolioSettings.tool.entityPrefix + "/getAssignmentJoinURL?id=" + assignmentId + "&siteid=" + siteId;
        jQuery.ajax( {
            url : joinUrl,
            async : false,
            success : function(u) {
            	EPortfolioUtils.hideMessage();
            	if(linkSelector) {
            		jQuery(linkSelector).attr('href', u);
            	}
            	return true;
            },
            error : function(xmlHttpRequest,status,error) {
            	EPortfolioUtils.handleError(eportfolio_err_get_assignmenturl, xmlHttpRequest.status, xmlHttpRequest.statusText);
                if(linkSelector) {
                	jQuery(linkSelector).removeAttr('href');
                }
                return false;
            }
        });
    }

	EPortfolioUtils.getAssignment = function(assignmentId, successCallback, errorCallback) {
		var assignment = Object();

        jQuery.ajax( {
            url : "/direct/" + eportfolioSettings.tool.entityPrefix + "/getAssignment.json?id=" + assignmentId,
            type : 'GET',
            async : false,
            dataType: 'json',
            success : function(a) {
		   		if(a.assignment) assignment = a.assignment;
                if(successCallback) successCallback();
            },
            error : function(xmlHttpRequest,status,error) {
            	EPortfolioUtils.handleError(eportfolio_err_set_options, xmlHttpRequest.status, xmlHttpRequest.statusText);
                if(errorCallback) errorCallback();
            }
        });
        return assignment;
		
	}

	// Get the current user from EB
	EPortfolioUtils.getCurrentUser = function() {
		var user = null;
		jQuery.ajax( {
	 		url : "/direct/user/current.json",
	   		dataType : "json",
	   		async : false,
		   	success : function(u) {
				user = u;
			},
			error : function(xmlHttpRequest,status,error) {
				EPortfolioUtils.handleError(eportfolio_err_curr_user, xmlHttpRequest.status, xmlHttpRequest.statusText);
			}
	  	});

		return user;
	}

	// Get the current site from EB and returns its maintainRole
	EPortfolioUtils.getMaintainRole = function() {
		var maintainRole = null;
		jQuery.ajax( {
	 		url : "/direct/site/" + eportfolioSettings.SiteId + ".json",
	   		dataType : "json",
	   		async : false,
		   	success : function(site) {
				maintainRole = site.maintainRole;
			},
			error : function(xmlHttpRequest,status,error) {
				EPortfolioUtils.handleError(eportfolio_err_maintain_role, xmlHttpRequest.status, xmlHttpRequest.statusText);
			}
	  	});

		return maintainRole;
	}
	
    
    // Get user selection types
    EPortfolioUtils.getUserSelectionTypes = function() {
    	var selTypes = {
            all:    {id: 'all', title: eportfolio_seltype_all},
            user:   {id: 'user', title: eportfolio_seltype_user},
            group:  {id: 'group', title: eportfolio_seltype_group},
            role:   {id: 'role', title: eportfolio_seltype_role}
    	};
    	return selTypes;
    }
	
	// Get user selection options from EB
    EPortfolioUtils.getUserSelectionOptions = function() {
        if(eportfolioUserSelectionOptions == null) {
            jQuery.ajax( {
                url : "/direct/eportfolio/getUserSelectionOptions.json?siteId=" + eportfolioSiteId,
                dataType : "json",
                async : false,
                success : function(data) {
                    eportfolioUserSelectionOptions = data;
                },
                error : function(xmlHttpRequest,status,error) {
                    EPortfolioUtils.handleError(eportfolio_err_user_sel_options, xmlHttpRequest.status, xmlHttpRequest.statusText);
                }
            });
        }

        return eportfolioUserSelectionOptions;
    }
	
	// Get the user permissions
	EPortfolioUtils.getUserPermissions = function() {
		var perms = Object();
        jQuery.ajax( {
            url: "/direct/site/" + eportfolioSettings.site.siteId + "/userPerms.json",
            dataType : "json",
            async : false,
            success : function(userPermissions) {
            	if(userPermissions != null) perms = userPermissions.data;
            	if(eportfolioSettings.user.userId == 'admin') perms.push("eportfolio.admin");
            },
            error : function(xmlHttpRequest,status,error) {
            	if(eportfolioSettings.user.userId == 'admin') {
            		// Workaround for SAK-18534
            		perms = ["eportfolio.admin", "eportfolio.create", "eportfolio.edit.any", "eportfolio.delete.any",
                             "site.upd", "site.viewRoster", "calendar.new", "calendar.revise.any", "calendar.delete.any"];
            	}else{
                    EPortfolioUtils.handleError(eportfolio_err_get_user_permissions, xmlHttpRequest.status, xmlHttpRequest.statusText);
            	}
            }
        });
        return perms;
    }


    // Get the site permissions
	EPortfolioUtils.getSitePermissions = function() {
        var perms = [];
        jQuery.ajax( {
            url : "/direct/site/" + eportfolioSettings.site.siteId + "/perms/eportfolio.json",
            dataType : "json",
            async : false,
            success : function(p) {
                for(role in p.data) {
                    var permSet = {'role':role};

                    for(var i=0,j=p.data[role].length;i<j;i++) {
                        var perm = p.data[role][i].replace(/\./g,"_");
                        eval("permSet." + perm + " = true");
                    }

                    perms.push(permSet);
                }
            },
            error : function(xmlHttpRequest,status,error) {
            	EPortfolioUtils.handleError(eportfolio_err_get_permissions, xmlHttpRequest.status, xmlHttpRequest.statusText);
            }
        });

        return perms;
    }

    // Set the site permissions
    EPortfolioUtils.setSitePermissions = function(boxesSelector, successCallback, errorCallback) {
        var boxes = $(boxesSelector);
        var myData = {};
        for(var i=0,j=boxes.length;i<j;i++) {
            var box = boxes[i];
            if(box.checked)
                myData[box.id] = 'true';
            else
                myData[box.id] = 'false';
        }
        jQuery.ajax( {
            url : "/direct/site/" + eportfolioSettings.site.siteId + "/setPerms",
            type : 'POST',
            data : myData,
            async : false,
            dataType: 'text',
            success : function(data) {
                if(successCallback) successCallback();
            },
            error : function(xmlHttpRequest,status,error) {
            	EPortfolioUtils.handleError(eportfolio_err_set_permissions, xmlHttpRequest.status, xmlHttpRequest.statusText);
                if(errorCallback) errorCallback();
            }
        });
        return false;
    }
	
	// Convenience function for rendering a trimpath template
	EPortfolioUtils.render = function(templateName, contextObject, output) {
		contextObject._MODIFIERS = EPortfolioUtils.getTrimpathModifiers();
		
		var templateNode = document.getElementById(templateName);
		var firstNode = templateNode.firstChild;
		var template = EPortfolioUtils.getTrimpathMacros();

		if ( firstNode && ( firstNode.nodeType === 8 || firstNode.nodeType === 4))
  			template += templateNode.firstChild.data.toString();
   	 	 else
   			template += templateNode.innerHTML.toString();
		
		var trimpathTemplate = TrimPath.parseTemplate(template,templateName);
   		var render = trimpathTemplate.process(contextObject);
   		if (output)
			document.getElementById(output).innerHTML = render;

		return render;
	}
	
	// Convenience function for grabbing the url parameters
	EPortfolioUtils.getParameters = function() {
		var arg = new Object();
		var href = document.location.href;

		if ( href.indexOf('?') != -1) {
			var paramString = href.split('?')[1];
			
			if(paramString.indexOf('#') != -1)
				paramString = paramString.split("#")[0];
				
			var params = paramString.split('&');

			for (var i = 0; i < params.length; ++i) {
				var name = params[i].split('=')[0];
				var value = params[i].split('=')[1];
				arg[name] = unescape(value);
			}
		}
	
		return arg;
	}
    
    /** Setup defaults for Ajax */
    EPortfolioUtils.setupAjax = function() {
        jQuery.ajaxSetup({
            async: true,
            cache: false,
            timeout: 30000,
            complete: function (request, textStatus) {
                try{
                    if(request.status
                            && request.status != 200 && request.status != 201 
                            && request.status != 204 && request.status != 404 && request.status != 1223){
                        if(request.status == 403) {
                            EPortfolioUtils.handleError(eportfolio_err_no_permissions, request.status, request.statusText);
                        	jQuery('#eportfolio_content').empty();
                        }else{
                            // Handled by error() callbacks
                        }
                   }
                }catch(e){}
            }
        }); 
    }
	
	/** Handle communication errors */
	EPortfolioUtils.handleError = function(message, statusCode, statusMessage) {
		var severity = 'error';
		var description = '';
		if(statusCode || statusMessage) {
			description += eportfolio_err_server_response + ': ';
            if(statusMessage) description += statusMessage;
            if(statusCode) description += ' ['+eportfolio_err_code+': ' + statusCode + ']';
		}
		if(message && (statusCode || statusMessage)) {
		    EPortfolioUtils.showMessage(description, severity, message);
		}else if(message) {
		    EPortfolioUtils.showMessage(description, severity, message);
		}else{
			EPortfolioUtils.showMessage(description, severity);
		}
	}
	
	/** 
	 * Render a message with a specific severity
	 * @argument msgBod: The message to be displayed
	 * @argument severity: Message severity [optional, defaults to 'information')
	 * @argument msgTitle: Message title [optional, defaults to nothing] 
	 */
    EPortfolioUtils.showMessage = function(msgBody, severity, msgTitle, hideMsgBody) {
    	var useAlternateStyle = true;
    	if(typeof hideMsgBody == 'undefined' && msgTitle && msgBody) hideMsgBody = true;
    	
    	if( !eportfolioErrorLog[msgBody] ){
			eportfolioErrorLog[msgBody] = true;

	        // severity
	        var msgClass = null;
	        if(!severity || severity == 'info' || severity == 'information')
	            msgClass = !useAlternateStyle ? 'information' : 'messageInformation';
	        else if(severity == 'success')
	            msgClass = !useAlternateStyle ? 'success' : 'messageSuccess';
	        else if(severity == 'warn' || severity == 'warning' || severity == 'error' || severity == 'fail') 
	            msgClass = !useAlternateStyle ? 'alertMessage' : 'messageError';
	        
	        // add contents
	        var id = Math.floor(Math.random()*1000);
	        var msgId = 'msg-'+id;
	        var msgDiv = jQuery('<div class="eportfolio_message" id="'+msgId+'"></div>');
	        var msgsDiv = jQuery('#eportfolio_messages').append(msgDiv);
	        var message = jQuery('<div class="'+msgClass+'"></div>');
	        if(msgTitle && msgTitle != '') {
	            message.append('<h4>'+msgTitle+'</h4>');
	            if(hideMsgBody) message.append('<span id="msgShowDetails-'+id+'">&nbsp;<small>(<a href="#" onclick="jQuery(\'#msgBody-'+id+'\').slideDown();jQuery(\'#msgShowDetails-'+id+'\').hide();EPortfolioUtils.adjustFrameHeight();return false;">'+eportfolio_err_details+'</a>)</small></span>');
	        }
	        jQuery('<p class="closeMe">  (x) </p>').click(function(){ EPortfolioUtils.hideMessage(msgId); }).appendTo(message);
	        if(msgBody) {
	            var msgBodyContent = jQuery('<div id="msgBody-'+id+'" class="content">'+msgBody+'</div>');
	            message.append(msgBodyContent);
	            if(hideMsgBody) msgBodyContent.hide();
	        }
	        
	        // display, adjust frame height, scroll to top
	        msgDiv.html(message);
	        msgsDiv.fadeIn(function(){ EPortfolioUtils.adjustFrameHeight(); });
	        jQuery('html, body').animate({scrollTop:0}, 'slow');
			
    	}

    }
        
    /** Hide message box */
    EPortfolioUtils.hideMessage = function(id) {
    	delete eportfolioErrorLog;
    	eportfolioErrorLog = new Object();
    	if(id) {
    		jQuery('#'+id).fadeOut();
    	}else{
            jQuery('#eportfolio_messages').empty().hide();
    	}
    }
    
    /** Show an ajax indicator at the following DOM selector */
    EPortfolioUtils.showAjaxIndicator = function(outputSelector) {
    	jQuery(outputSelector).empty()
            .html('<img src="images/ajaxload.gif" alt="..." class="eportfolio_imgIndicator"/>')
            .show();
    }

    /** Hide the ajax indicator at the following DOM selector */
    EPortfolioUtils.hideAjaxIndicator = function(outputSelector) {
    	jQuery(outputSelector).hide();
    }
    
    /** Adjust frame height (if in an iframe) */
    EPortfolioUtils.adjustFrameHeight = function() {
    	if(window.frameElement && window.frameElement.id)
    	   setMainFrameHeightNow(window.frameElement.id);
    }
    
    /** Transform a textarea element on to a FCKEditor, uppon user click */
    EPortfolioUtils.makeInlineFCKEditor = function(textAreaId, toolBarSet, width, height) {
        var textArea = jQuery('#'+textAreaId);
        var textAreaContents = jQuery(textArea).text();
        var fakeTextAreaId = textAreaId + '-' + 'fake';
        var fakeTextAreaInstrId = textAreaId + '-' + 'fakeInstr';
        if(jQuery('#'+fakeTextAreaId).length > 0) {
            jQuery('#'+fakeTextAreaId).remove();
        }
        jQuery(textArea)
           .hide()
           .before('<div id="'+fakeTextAreaId+'" class="inlineFCKEditor"><span id="'+fakeTextAreaInstrId+'" class="inlineFCKEditorInstr">'+eportfolio_click_to_edit+'</span>'+textAreaContents+'</div>');
        
        // Apply FCKEditor 
        var applyFCKEditor = function() {
            jQuery('#'+fakeTextAreaId).hide();
            jQuery(this).unbind('click');
            jQuery('#'+fakeTextAreaInstrId).unbind('mouseenter').unbind('mouseleave');
            jQuery('#eportfolio_meeting_name_field').unbind('keydown');
            // add FCKeditor
            width = !width ? '600' : width;
            height = !height ? '320' : height;
            var oFCKeditor = new FCKeditor(textAreaId);
            var collectionId = '/group/' + eportfolioSiteId + '/';
            oFCKeditor.BasePath = "/library/editor/FCKeditor/";
            oFCKeditor.Width = width;
            oFCKeditor.Height = height ;
            oFCKeditor.ToolbarSet = !toolBarSet ? 'Default' : toolBarSet;
            oFCKeditor.Config['ImageBrowserURL'] = oFCKeditor.BasePath + "editor/filemanager/browser/default/browser.html?Connector=/sakai-fck-connector/filemanager/connector&Type=Image&CurrentFolder=" + collectionId;
            oFCKeditor.Config['LinkBrowserURL'] = oFCKeditor.BasePath + "editor/filemanager/browser/default/browser.html?Connector=/sakai-fck-connector/filemanager/connector&Type=Link&CurrentFolder=" + collectionId;
            oFCKeditor.Config['FlashBrowserURL'] = oFCKeditor.BasePath + "editor/filemanager/browser/default/browser.html?Connector=/sakai-fck-connector/filemanager/connector&Type=Flash&CurrentFolder=" + collectionId;
            oFCKeditor.Config['ImageUploadURL'] = oFCKeditor.BasePath + "/sakai-fck-connector/filemanager/connector?Type=Image&Command=QuickUpload&Type=Image&CurrentFolder=" + collectionId;
            oFCKeditor.Config['FlashUploadURL'] = oFCKeditor.BasePath + "/sakai-fck-connector/filemanager/connector?Type=Flash&Command=QuickUpload&Type=Flash&CurrentFolder=" + collectionId;
            oFCKeditor.Config['LinkUploadURL'] = oFCKeditor.BasePath + "/sakai-fck-connector/filemanager/connector?Type=File&Command=QuickUpload&Type=Link&CurrentFolder=" + collectionId;
            oFCKeditor.Config['CurrentFolder'] = collectionId;
            oFCKeditor.Config['CustomConfigurationsPath'] = "/library/editor/FCKeditor/config.js";
            oFCKeditor.ReplaceTextarea(); 
            EPortfolioUtils.adjustFrameHeight();
        };
           
        // events
        jQuery('#'+fakeTextAreaId).bind('mouseenter', function() {
            jQuery('#'+fakeTextAreaInstrId).fadeIn();
        }).bind('mouseleave', function() {
            jQuery('#'+fakeTextAreaInstrId).fadeOut();
        }).one('click', applyFCKEditor);
        jQuery('#eportfolio_meeting_name_field').bind('keydown', function(e){
            if(e.keyCode == 9 /* TAB key */) {
            	applyFCKEditor();
            }
        });
    }
            
    /** Update data from inline FCKEditor */
    EPortfolioUtils.updateFromInlineFCKEditor = function(textAreaId) {
        if(typeof FCKeditorAPI != "undefined") {
            var editor = FCKeditorAPI.GetInstance(textAreaId);
            if(editor != null) {
                var ta_temp = document.createElement("textarea");
                ta_temp.innerHTML = editor.GetData().replace(/</g,"&lt;").replace(/>/g,"&gt;");
                var decoded_html = ta_temp.value;
                jQuery('#'+textAreaId).text(decoded_html);   
            }
        }
    }
    
    /** Trimpath modifiers :) */
    EPortfolioUtils.getTrimpathModifiers = function() {
    	if(!eportfolioTrimpathModifiers) {
    	   	eportfolioTrimpathModifiers = {};
    	}
    	return eportfolioTrimpathModifiers;
    }
    
    /** Trimpath macros :) */
    EPortfolioUtils.getTrimpathMacros = function() {
        if(!eportfolioTrimpathMacros) {
            eportfolioTrimpathMacros = '';
        }
        return eportfolioTrimpathMacros;
    }
	
}) ();


/** Protoypes */
Array.prototype.indexOfMeeting=function(meeting){
    if(meeting && meeting.id) {
        for (var i=0; i<this.length; i++){
            if (this[i].id != null && this[i].id==meeting.id) return i;
        }
    }
    return -1;
}
Array.prototype.addUpdateMeeting=function(meeting){
    if(meeting && meeting.id) {
        var index = this.indexOfMeeting(meeting);
        if(index >= 0) {
            this[index] = meeting;
        }else{
            this.push(meeting);
        }
    }else if(meeting) {
        this.push(meeting);
    }
}
Array.prototype.addDepartment=function(department){
    if(department && department.id) {
        var index = this.indexOfMeeting(meeting);
        if(index >= 0) {
            this[index] = meeting;
        }else{
            this.push(meeting);
        }
    }else if(meeting) {
        this.push(meeting);
    }
}

Date.prototype.toISO8601String = function (format, offset) {
    /** From: http://delete.me.uk/2005/03/iso8601.html */
    /* Accepted values for the format [1-6]:
     1 Year:
       YYYY (eg 1997)
     2 Year and month:
       YYYY-MM (eg 1997-07)
     3 Complete date:
       YYYY-MM-DD (eg 1997-07-16)
     4 Complete date plus hours and minutes:
       YYYY-MM-DDThh:mmTZD (eg 1997-07-16T19:20+01:00)
     5 Complete date plus hours, minutes and seconds:
       YYYY-MM-DDThh:mm:ssTZD (eg 1997-07-16T19:20:30+01:00)
     6 Complete date plus hours, minutes and seconds (without 'T' and '+'):
       YYYY-MM-DDThh:mmTZD (eg 1997-07-16 19:20:00)
     7 Complete date plus hours, minutes, seconds and a decimal
       fraction of a second
       YYYY-MM-DDThh:mm:ss.sTZD (eg 1997-07-16T19:20:30.45+01:00)
    */
    if (!format) { var format = 6; }
    if (!offset) {
        var offset = 'Z';
        var date = this;
    } else {
        var d = offset.match(/([-+])([0-9]{2}):([0-9]{2})/);
        var offsetnum = (Number(d[2]) * 60) + Number(d[3]);
        offsetnum *= ((d[1] == '-') ? -1 : 1);
        var date = new Date(Number(Number(this) + (offsetnum * 60000)));
    }

    var zeropad = function (num) { return ((num < 10) ? '0' : '') + num; }

    var str = "";
    str += date.getUTCFullYear();
    if (format > 1) { str += "-" + zeropad(date.getUTCMonth() + 1); }
    if (format > 2) {
        if(format == 6) {
            str += "-" + zeropad(date.getDate());
        }else{
            str += "-" + zeropad(date.getUTCDate());
        }
    }
    if (format > 3) {
        if(format == 6) {
            str += " " + zeropad(date.getHours()) +
                   ":" + zeropad(date.getMinutes());
        }else{
            str += "T" + zeropad(date.getUTCHours()) +
                   ":" + zeropad(date.getUTCMinutes());
        }
    }
    if (format > 5) {
        var secs = Number(date.getUTCSeconds() + "." +
                   ((date.getUTCMilliseconds() < 100) ? '0' : '') +
                   zeropad(date.getUTCMilliseconds()));
        str += ":" + zeropad(secs);
    } else if (format > 4) { str += ":" + zeropad(date.getUTCSeconds()); }

    if (format > 3 && format != 6) { str += offset; }
    return str;
}

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

/** Automatically transfer focus to FCKEditor when loaded */
function FCKeditor_OnComplete(editorInstance) {editorInstance.Focus();}

