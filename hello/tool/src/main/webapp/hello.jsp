<jsp:directive.include file="/templates/includes.jsp"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <!-- External Css -->
    <link media="all" href="assets/css/libs/jquery.datepick/4.0.6/redmond.datepick.css" rel="stylesheet" type="text/css" />
    <link media="all" href="assets/css/libs/jquery-ui-lightness/1.8.21/jquery-ui.custom.css" rel="stylesheet" type="text/css" />

    <!-- Sakai Css -->
    <link media="all" href="/library/skin/tool_base.css" rel="stylesheet" type="text/css" />
    <link media="all" href="/library/skin/default/tool.css" rel="stylesheet" type="text/css" />

    <!-- Tool Css -->
    <link media="all" href="assets/css/hello.css" rel="stylesheet" type="text/css" />

    <!-- External Libraries -->
    <script type="text/javascript" language="JavaScript" src="assets/js/libs/jquery/1.3.2/jquery-1.3.2.js"></script>
    <script type="text/javascript" language="JavaScript" src="assets/js/libs/jquery.i18n.properties/1.0.9/jquery.i18n.properties.js"></script>
    <script type="text/javascript" language="JavaScript" src="assets/js/libs/jquery.tablesorter/2.0.5/jquery.tablesorter.min.js"></script>
    <script type="text/javascript" language="JavaScript" src="assets/js/libs/jquery.datepick/4.0.6/jquery.datepick.min.js"></script>
    <script type="text/javascript" language="JavaScript" src="assets/js/libs/jquery.timePicker/0.3.0/jquery.timePicker.min.js"></script>
    <script type="text/javascript" language="JavaScript" src="assets/js/libs/jquery.tipTip/1.3.0/jquery.tipTip.minified.js"></script>
    <script type="text/javascript" language="JavaScript" src="assets/js/libs/trimpath/1.0.38/trimpath.js"></script>
    <script type="text/javascript" language="JavaScript" src="assets/js/libs/jquery-ui/1.8.21/jquery-ui.custom.min.js"></script>

    <!-- Sakai Libraries -->
    <script type="text/javascript" language="JavaScript" src="/library/editor/FCKeditor/fckeditor.js"></script>
    <script type="text/javascript" language="JavaScript" src="/library/editor/fckeditor.launch.js"></script>
    <script type="text/javascript" language="JavaScript" src="/library/js/headscripts.js"></script>

    <!-- Tool Libraries -->
    <script type="text/javascript" language="JavaScript" src="assets/js/hello_utils.js"></script>
    <script type="text/javascript" language="JavaScript" src="assets/js/hello_perms.js"></script>
    
    <script type="text/javascript" language="JavaScript">
    var helloSettings = Object();
    $(document).ready(function(){
        // load Settings
        $.ajax({
            url: '/direct/hello-tool/getSettings.json',
            success: function(settings) {
            	helloSettings = settings;
            },
            async: false,
            dataType: 'json'
        });
        
        var arg = EPortfolioUtils.getParameters();
        helloSettings.tool.toolId=arg['sakai.tool.placement.id'];
        helloSettings.site.siteId='${siteId}';
        helloSettings.user.userId='${userId}';
        helloSettings.user.userEid='${userEid}';
        helloSettings.user.userDisplayId='${userDisplayId}';
        // load Sakai skin
        $.ajax({
            url: '${toolSkinCSS}',
            success: function(data, textStatus) {
                $('head').append('<style type="text/css" rel="stylesheet">'+data+'</style>');
            },
            async: false,
            dataType: 'text/css'
        });
        // load I18N files
        jQuery.i18n.properties({
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
    
    <title>hello Tool</title>
</head>

<body onload="<%=request.getAttribute("sakai.html.body.onload")%>">

<div id="hello_toolbar" class="portletBody"></div>
<div id="hello_messages" style="display: none"></div>
<div id="hello_container" class="portletBody">
    <div id="hello_content"></div>
</div>
<div id="hello_footer"></div>

 
<jsp:directive.include file="/templates/toolbar.jsp"/>
<jsp:directive.include file="/templates/test.jsp"/>
<jsp:directive.include file="/templates/footer.jsp"/>
<jsp:directive.include file="/templates/greetinglist.jsp"/>
<jsp:directive.include file="/templates/addeditgreeting.jsp"/>
<jsp:directive.include file="/templates/permissions.jsp"/>

</body>
</html>
