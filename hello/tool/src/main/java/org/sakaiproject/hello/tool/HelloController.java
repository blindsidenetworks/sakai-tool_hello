package org.sakaiproject.hello.tool;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import lombok.Getter;
import lombok.Setter;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import org.sakaiproject.hello.logic.HelloManager;
import org.sakaiproject.hello.logic.SakaiProxy;

public class HelloController implements Controller {

    private Logger logger = Logger.getLogger(HelloController.class);

	@Setter @Getter
	private HelloManager helloManager = null;

	//@Getter @Setter
    //private SakaiProxy sakaiProxy = null;
	
	public ModelAndView handleRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
        SakaiProxy sakaiProxy = helloManager.getSakaiProxy();

        // check if Sakai proxy was successfully initialized
        if(sakaiProxy == null) throw new Exception("sakaiProxy MUST be initialized.");

        // check if user is logged in
        String userId = sakaiProxy.getCurrentUserId();
        if(userId == null) throw new Exception("You must be logged in to use this tool.");

        String userEid = sakaiProxy.getCurrentUserEid();
        String userDisplayId = sakaiProxy.getCurrentUserDisplayId();

        Map<String, Object> map = new HashMap<String, Object>();

        ///////////////////////////////////
        //  Controller logic starts here   //
        ///////////////////////////////////
        
        // Minimal data required to show the tool in a proper way
        map.put("userId", userId);
        map.put("userEid", userEid);
        map.put("userDisplayId", userDisplayId);
        map.put("siteId", sakaiProxy.getCurrentSiteContext());
        map.put("language", sakaiProxy.getUserLanguageCode());
        map.put("toolSkinCSS", sakaiProxy.getToolSkinCSS(sakaiProxy.getSkinRepoProperty()));

        
        // build url
        StringBuilder url = new StringBuilder("/hello-tool/hello.html?");
        url.append("&siteId=").append(sakaiProxy.getCurrentSiteId());
        //url.append("&timestamp=").append(sakaiProxy.getServerTimeInUserTimezone());
        //url.append("&timezoneoffset=").append(sakaiProxy.getUserTimezone());
        url.append("&language=").append(sakaiProxy.getUserLanguageCode());
        url.append("&skin=").append(sakaiProxy.getSakaiSkin());

        logger.debug("doGet(): " + url.toString());
        
        // redirect...
        //response.sendRedirect(url.toString());
		
        //return null;
		
		
		map.put("currentSiteId", sakaiProxy.getCurrentSiteId());
		map.put("userDisplayName", sakaiProxy.getCurrentUserDisplayName());
        map.put("currentToolId", sakaiProxy.getCurrentToolId());
        map.put("helloManager", helloManager.getHellos().toString() );
        
        return new ModelAndView("hello", map);
	}

}
