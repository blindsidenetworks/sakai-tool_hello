/*
 * Copyright (c) 2010-2009 The Sakai Foundation
 *
 * Licensed under the Educational Community License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *             http://www.osedu.org/licenses/ECL-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var HelloUtils;

(function() {

	if(HelloUtils == null)
		HelloUtils = new Object();
		
    var helloUserSelectionOptions = null;
	var helloTrimpathModifiers = null;
	var helloTrimpathMacros = null;

	// Get the current user from EB
	HelloUtils.getCurrentUser = function() {
		var user = null;
		jQuery.ajax( {
	 		url : "/direct/user/current.json",
	   		dataType : "json",
	   		async : false,
		   	success : function(u) {
				user = u;
			},
			error : function(xmlHttpRequest,status,error) {
				HelloUtils.handleError(hello_err_curr_user, xmlHttpRequest.status, xmlHttpRequest.statusText);
			}
	  	});

		return user;
	}

	// Get the current site from EB and returns its maintainRole
	HelloUtils.getMaintainRole = function() {
		var maintainRole = null;
		jQuery.ajax( {
	 		url : "/direct/site/" + helloSettings.SiteId + ".json",
	   		dataType : "json",
	   		async : false,
		   	success : function(site) {
				maintainRole = site.maintainRole;
			},
			error : function(xmlHttpRequest,status,error) {
				HelloUtils.handleError(hello_err_maintain_role, xmlHttpRequest.status, xmlHttpRequest.statusText);
			}
	  	});

		return maintainRole;
	}
	
    
    // Get tool version
    HelloUtils.getToolVersion = function() {

    	var response = Object();

    	jQuery.ajax( {
            url: "/direct/hello-tool/getToolVersion.json",
            dataType : "json",
            async : false,
            success : function(version) {
            	response = version;
            }
        });

    	return response;
    }

    
    // Get user selection types
    HelloUtils.getUserSelectionTypes = function() {
    	var selTypes = {
            all:    {id: 'all', title: hello_seltype_all},
            user:   {id: 'user', title: hello_seltype_user},
            group:  {id: 'group', title: hello_seltype_group},
            role:   {id: 'role', title: hello_seltype_role}
    	};
    	return selTypes;
    }
	
	// Get user selection options from EB
    HelloUtils.getUserSelectionOptions = function() {
        if(helloUserSelectionOptions == null) {
            jQuery.ajax( {
                url : "/direct/hello-meeting/getUserSelectionOptions.json?siteId=" + helloSiteId,
                dataType : "json",
                async : false,
                success : function(data) {
                    helloUserSelectionOptions = data;
                },
                error : function(xmlHttpRequest,status,error) {
                    HelloUtils.handleError(hello_err_user_sel_options, xmlHttpRequest.status, xmlHttpRequest.statusText);
                }
            });
        }

        return helloUserSelectionOptions;
    }
	
	// Get the user permissions
	HelloUtils.getUserPermissions = function() {
		var perms = Object();
        jQuery.ajax( {
            url: "/direct/site/" + helloToolSettings.siteId + "/userPerms.json",
            dataType : "json",
            async : false,
            success : function(userPermissions) {
            	if(userPermissions != null) perms = userPermissions.data;
            	if(helloToolSettings.userId == 'admin') perms.push("hello.admin");
            },
            error : function(xmlHttpRequest,status,error) {
            	if(helloToolSettings.userId == 'admin') {
            		// Workaround for SAK-18534
            		perms = ["hello.admin", "hello.create", "hello.edit.any", "hello.delete.any", "hello.participate",
                             "site.upd", "site.viewRoster", "calendar.new", "calendar.revise.any", "calendar.delete.any"];
            	}else{
                    HelloUtils.handleError(hello_err_get_user_permissions, xmlHttpRequest.status, xmlHttpRequest.statusText);
            	}
            }
        });
        return perms;
    }

	// Get notice message to be displayed on the UI (first time access)
    HelloUtils.autorefreshInterval = function() {
		var interval = [];
		interval.meetings = 30000;
		interval.recordings = 60000;
        jQuery.ajax( {
            url: "/direct/hello-meeting/getAutorefreshInterval.json",
            dataType : "json",
            async : false,
            success : function(autorefresh) {
            	if(autorefresh) {
            		interval.meetings = autorefresh.meetings;
            		interval.recordings = autorefresh.recordings;
            	}
            }
        });
        return interval;
    }
    
	// Convenience function for rendering a trimpath template
	HelloUtils.render = function(templateName, contextObject, output) {	
		contextObject._MODIFIERS = HelloUtils.getTrimpathModifiers();
		var templateNode = document.getElementById(templateName);
		var firstNode = templateNode.firstChild;
		var template = HelloUtils.getTrimpathMacros();
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
	HelloUtils.getParameters = function() {
		var arg = new Object();
		var href = document.location.href;

		if ( href.indexOf( "?") != -1) {
			var paramString = href.split( "?")[1];
			
			if(paramString.indexOf("#") != -1)
				paramString = paramString.split("#")[0];
				
			var params = paramString.split("&");

			for (var i = 0; i < params.length; ++i) {
				var name = params[i].split( "=")[0];
				var value = params[i].split( "=")[1];
				arg[name] = unescape(value);
			}
		}
	
		return arg;
	}
    
    /** Setup defaults for Ajax */
    HelloUtils.setupAjax = function() {
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
                            HelloUtils.handleError(hello_err_no_permissions, request.status, request.statusText);
                        	jQuery('#hello_content').empty();
                        }else{
                            // Handled by error() callbacks
                        }
                   }
                }catch(e){}
            }
        }); 
    }
	
	/** Handle communication errors */
	HelloUtils.handleError = function(message, statusCode, statusMessage) {
		var severity = 'error';
		var description = '';
		if(statusCode || statusMessage) {
			description += hello_err_server_response + ': ';
            if(statusMessage) description += statusMessage;
            if(statusCode) description += ' ['+hello_err_code+': ' + statusCode + ']';
		}
		if(message && (statusCode || statusMessage)) {
		    HelloUtils.showMessage(description, severity, message);
		}else if(message) {
		    HelloUtils.showMessage(description, severity, message);
		}else{
			HelloUtils.showMessage(description, severity);
		}
	}
	
	/** 
	 * Render a message with a specific severity
	 * @argument msgBod: The message to be displayed
	 * @argument severity: Message severity [optional, defaults to 'information')
	 * @argument msgTitle: Message title [optional, defaults to nothing] 
	 */
    HelloUtils.showMessage = function(msgBody, severity, msgTitle, hideMsgBody) {
    	var useAlternateStyle = true;
    	if(typeof hideMsgBody == 'undefined' && msgTitle && msgBody) hideMsgBody = true;
    	
    	if( !helloErrorLog[msgBody] ){
			helloErrorLog[msgBody] = true;

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
	        var msgDiv = jQuery('<div class="hello_message" id="'+msgId+'"></div>');
	        var msgsDiv = jQuery('#hello_messages').append(msgDiv);
	        var message = jQuery('<div class="'+msgClass+'"></div>');
	        if(msgTitle && msgTitle != '') {
	            message.append('<h4>'+msgTitle+'</h4>');
	            if(hideMsgBody) message.append('<span id="msgShowDetails-'+id+'">&nbsp;<small>(<a href="#" onclick="jQuery(\'#msgBody-'+id+'\').slideDown();jQuery(\'#msgShowDetails-'+id+'\').hide();HelloUtils.adjustFrameHeight();return false;">'+hello_err_details+'</a>)</small></span>');
	        }
	        jQuery('<p class="closeMe">  (x) </p>').click(function(){ HelloUtils.hideMessage(msgId); }).appendTo(message);
	        if(msgBody) {
	            var msgBodyContent = jQuery('<div id="msgBody-'+id+'" class="content">'+msgBody+'</div>');
	            message.append(msgBodyContent);
	            if(hideMsgBody) msgBodyContent.hide();
	        }
	        
	        // display, adjust frame height, scroll to top
	        msgDiv.html(message);
	        msgsDiv.fadeIn(function(){ HelloUtils.adjustFrameHeight(); });
	        jQuery('html, body').animate({scrollTop:0}, 'slow');
			
    	}

    }
        
    /** Hide message box */
    HelloUtils.hideMessage = function(id) {
    	delete helloErrorLog;
    	helloErrorLog = new Object();
    	if(id) {
    		jQuery('#'+id).fadeOut();
    	}else{
            jQuery('#hello_messages').empty().hide();
    	}
    }
    
    /** Show an ajax indicator at the following DOM selector */
    HelloUtils.showAjaxIndicator = function(outputSelector) {
    	jQuery(outputSelector).empty()
            .html('<img src="images/ajaxload.gif" alt="..." class="hello_imgIndicator"/>')
            .show();
    }

    /** Hide the ajax indicator at the following DOM selector */
    HelloUtils.hideAjaxIndicator = function(outputSelector) {
    	jQuery(outputSelector).hide();
    }
    
    /** Adjust frame height (if in an iframe) */
    HelloUtils.adjustFrameHeight = function() {
    	if(window.frameElement && window.frameElement.id)
    	   setMainFrameHeightNow(window.frameElement.id);
    }
    
    /** Transform a textarea element on to a FCKEditor, uppon user click */
    HelloUtils.makeInlineFCKEditor = function(textAreaId, toolBarSet, width, height) {
        var textArea = jQuery('#'+textAreaId);
        var textAreaContents = jQuery(textArea).text();
        var fakeTextAreaId = textAreaId + '-' + 'fake';
        var fakeTextAreaInstrId = textAreaId + '-' + 'fakeInstr';
        if(jQuery('#'+fakeTextAreaId).length > 0) {
            jQuery('#'+fakeTextAreaId).remove();
        }
        jQuery(textArea)
           .hide()
           .before('<div id="'+fakeTextAreaId+'" class="inlineFCKEditor"><span id="'+fakeTextAreaInstrId+'" class="inlineFCKEditorInstr">'+hello_click_to_edit+'</span>'+textAreaContents+'</div>');
        
        // Apply FCKEditor 
        var applyFCKEditor = function() {
            jQuery('#'+fakeTextAreaId).hide();
            jQuery(this).unbind('click');
            jQuery('#'+fakeTextAreaInstrId).unbind('mouseenter').unbind('mouseleave');
            jQuery('#hello_meeting_name_field').unbind('keydown');
            // add FCKeditor
            width = !width ? '600' : width;
            height = !height ? '320' : height;
            var oFCKeditor = new FCKeditor(textAreaId);
            var collectionId = '/group/' + helloSiteId + '/';
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
            HelloUtils.adjustFrameHeight();
        };
           
        // events
        jQuery('#'+fakeTextAreaId).bind('mouseenter', function() {
            jQuery('#'+fakeTextAreaInstrId).fadeIn();
        }).bind('mouseleave', function() {
            jQuery('#'+fakeTextAreaInstrId).fadeOut();
        }).one('click', applyFCKEditor);
        jQuery('#hello_meeting_name_field').bind('keydown', function(e){
            if(e.keyCode == 9 /* TAB key */) {
            	applyFCKEditor();
            }
        });
    }
            
    /** Update data from inline FCKEditor */
    HelloUtils.updateFromInlineFCKEditor = function(textAreaId) {
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
    HelloUtils.getTrimpathModifiers = function() {
    	if(!helloTrimpathModifiers) {
    	   	helloTrimpathModifiers = {    	   		
    	   	};
    	}
    	return helloTrimpathModifiers;
    }
    
    /** Trimpath macros :) */
    HelloUtils.getTrimpathMacros = function() {
        if(!helloTrimpathMacros) {
            helloTrimpathMacros = '';
        }
        return helloTrimpathMacros;
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

/** Automatically transfer focus to FCKEditor when loaded */
function FCKeditor_OnComplete(editorInstance) {editorInstance.Focus();}

