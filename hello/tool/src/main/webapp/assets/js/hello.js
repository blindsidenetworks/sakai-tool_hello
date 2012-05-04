/* Stuff that we always expect to be setup */
var helloErrorLog = new Object();

(function() {
	// Process parameters
	var arg = HelloUtils.getParameters();
	if (!arg || !helloToolSettings.siteId) {
		HelloUtils.showMessage(hello_err_no_siteid, 'error');
		return;
	}

	// Process permissions
	var permissions = HelloUtils.getUserPermissions();
	helloToolSettings.userPerms = new HelloPermissions(permissions);

	// We need the toolbar in a template so we can swap in the translations
	HelloUtils.render('hello_toolbar_template', {}, 'hello_toolbar');

	// If user is allowed to site updates render the footer
	if (helloToolSettings.userPerms.siteUpdate) {
		HelloUtils.render('hello_footer_template', { 'versionTag' : helloToolSettings.version + '_' + helloToolSettings.buildSerial	}, 
			'hello_footer');
	}

	$('#hello_list_link').bind('click', function(e) {
		return switchState('listItems');
	});

	$('#hello_add_item_link').bind('click', function(e) {
		return switchState('addUpdateItem');
	});

	$('#hello_options_link').bind('click', function(e) {
		return switchState('options');
	});

	$('#hello_permissions_link').bind('click', function(e) {
		return switchState('permissions');
	});

	$('#hello_test_link').bind('click', function(e) {
		return switchState('test');
	});

	// This is always showing in every state.
	$('#hello_home_link').show();

	// Now switch into the requested state
	if (arg.state) {
		if (helloToolSettings.userId != null) {
			switchState(arg.state, arg);
		} else {
			HelloUtils.showMessage(hello_err_no_user, 'error');
			$('#hello_container').empty();
		}
	} else {
		$('#hello_container').empty();

	}

})();

function switchState(state, arg) {
	HelloUtils.hideMessage();
	if ('listItems' === state) {

	} else if ('addUpdateItem' === state) {

	} else if ('options' === state) {

	} else if ('permissions' === state) {

	} else if ('test' === state) {
		
        var contextData = {
                'testQuery' : HelloUtils.getTest()
        	};
		HelloUtils.render('hello_test_template', contextData, 'hello_container');
		
		HelloUtils.adjustFrameHeight();
	}

}
