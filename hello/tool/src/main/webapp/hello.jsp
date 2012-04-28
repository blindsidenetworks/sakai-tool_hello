<jsp:directive.include file="/templates/includes.jsp"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <!-- External Css -->
    <link media="all" href="assets/css/libs/jquery.datepick/4.0.6/redmond.datepick.css" rel="stylesheet" type="text/css" />

    <!-- Sakai Css -->
    <link media="all" href="/library/skin/tool_base.css" rel="stylesheet" type="text/css" />
    <link media="all" href="/library/skin/default/tool.css" rel="stylesheet" type="text/css" />

    <!-- Tool Css -->
    <link media="all" href="assets/css/hello.css" rel="stylesheet" type="text/css" />

    <!-- External Libraries -->
    <script type="text/javascript" language="JavaScript" src="assets/js/libs/jquery/1.6.1/jquery.min.js"></script>
    <script type="text/javascript" language="JavaScript" src="assets/js/libs/jquery.i18n.properties/1.0.9/jquery.i18n.properties.min.js"></script>
    <script type="text/javascript" language="JavaScript" src="assets/js/libs/jquery.tablesorter/2.0.5/jquery.tablesorter.min.js"></script>
    <script type="text/javascript" language="JavaScript" src="assets/js/libs/jquery.datepick/4.0.6/jquery.datepick.min.js"></script>
    <script type="text/javascript" language="JavaScript" src="assets/js/libs/jquery.timePicker/0.3.0/jquery.timePicker.min.js"></script>
    <script type="text/javascript" language="JavaScript" src="assets/js/libs/jquery.tipTip/1.3.0/jquery.tipTip.minified.js"></script>
    <script type="text/javascript" language="JavaScript" src="assets/js/libs/trimpath/1.0.38/trimpath.js"></script>

    <!-- Sakai Libraries -->
    <script type="text/javascript" language="JavaScript" src="/library/editor/FCKeditor/fckeditor.js"></script>
    <script type="text/javascript" language="JavaScript" src="/library/editor/fckeditor.launch.js"></script>
    <script type="text/javascript" language="JavaScript" src="/library/js/headscripts.js"></script>

    <!-- Tool Libraries -->
    <script type="text/javascript" language="JavaScript" src="assets/js/hello_utils.js"></script>
    <script type="text/javascript" language="JavaScript" src="assets/js/hello_perms.js"></script>
    
    <script type="text/javascript" language="JavaScript">
    var helloToolSettings = Object();
    $(document).ready(function(){
        // load Tool Settings
        $.ajax({
            url: '/direct/hello-tool/${siteId}/getSettings.json',
            success: function(settings) {
            	helloToolSettings = settings;
            },
            async: false,
            dataType: 'json'
        });

        var arg = HelloUtils.getParameters();
        helloToolSettings.siteId='${siteId}';
        helloToolSettings.skin='${skin}';
        helloToolSettings.language='${language}';
        helloToolSettings.toolId=arg['sakai.tool.placement.id'];

        // load Sakai skin
        $.ajax({
            url: '/library/skin/${skin}/tool.css',
            success: function(data, textStatus) {
                $('head').append('<style type="text/css" rel="stylesheet">'+data+'</style>');
            },
            async: false,
            dataType: 'text/css'
        });
        // load I18N files
        $.i18n.properties({
            name:       'ToolMessages', 
            path:       'lang/', 
            language:   '${language}', 
            mode:       'vars', 
            callback:   function() {
                // start tool
                jQuery.ajax({
                    async: false,
                    type: 'GET',
                    url: 'assets/js/hello.js',
                    dataType: 'script'
                });
            }
        });
    });
    </script>
    
    <title>Hello Tool</title>
</head>
<body onload="<%=request.getAttribute("sakai.html.body.onload")%>">

<div id="hello_toolbar" class="portletBody">
    <!-- Toolbar Start -->
    <ul class="navIntraTool actionToolBar" role="menu">
       <li class="firstToolBarItem" role="menuitem"><span><a href="/portal/tool/${currentToolId}/index.htm?op=hello-list" title="Hello Item List">Hello Item List</a></span></li>
       <li role="menuitem"><span><a href="/portal/tool/${currentToolId}/index.htm?op=hello-new" title="Add Hello Item">Add Hello Item</a></span></li>
       <li role="menuitem"><span><a href="/portal/tool/${currentToolId}/index.htm?op=permissions-edit" title="Permissions">Permissions</a></span></li>
       <li role="menuitem"><span><a href="/direct/hello-tool/test" title="Test">Test</a></span></li>
    </ul>
</div>
<br />
<div id="hello_messages" style="display: none"></div>
<div id="hello_container">
    <div id="hello_content">
    This is a test
    </div>
</div>
<div id="hello_footer"></div>

 
<jsp:directive.include file="/templates/footer.jsp"/>


</body>
</html>
