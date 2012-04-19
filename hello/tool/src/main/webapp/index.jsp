<jsp:directive.include file="/templates/includes.jsp"/>
<jsp:directive.include file="/templates/header.jsp"/>
<jsp:directive.include file="/templates/toolbar.jsp" />

    <div id="content">
        <!-- Temporaty code -->
        Hello World Servlet </br>
        Current Site ID : ${currentSiteId} </br>
        User Display Name : ${userDisplayName} </br>
        Hello Manager Content : ${helloManager} </br>
    </div>

    <!-- Third-Party Libraries (Order matters) -->
    <script type="text/javascript" language="JavaScript" src="./assets/js/libs/jquery/1.6.1/jquery.min.js"></script>
    <script type="text/javascript" language="JavaScript" src="./assets/js/libs/json2/20110223/json2.js"></script>
    <script type="text/javascript" language="JavaScript" src="./assets/js/libs/underscore.js/1.1.6/underscore-min.js"></script>
    <script type="text/javascript" language="JavaScript" src="./assets/js/libs/backbone.js/0.3.3/backbone-min.js"></script>

    <!-- Application core (Order matters) -->
    <script type="text/javascript" language="JavaScript" src="./src/application.js"></script>

    <!-- Modules (Order does not matter) -->
    <script type="text/javascript" language="JavaScript" src="./src/modules/greeting.js"></script>
    <script type="text/javascript" language="JavaScript" src="./src/modules/message.js"></script>

<jsp:directive.include file="/templates/footer.jsp"/>

