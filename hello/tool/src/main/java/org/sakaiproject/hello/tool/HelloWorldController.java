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

public class HelloWorldController implements Controller {

    private Logger logger = Logger.getLogger(HelloWorldController.class);

	@Setter
	@Getter
	private SakaiProxy sakaiProxy = null;

	@Setter
	@Getter
	private HelloManager helloManager = null;
	
	public ModelAndView handleRequest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
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
		
		
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("currentSiteId", sakaiProxy.getCurrentSiteId());
		map.put("userDisplayName", sakaiProxy.getCurrentUserDisplayName());
        map.put("currentToolId", sakaiProxy.getCurrentToolId());
        map.put("helloManager", helloManager.getHellos().toString() );
        
        return new ModelAndView("index", map);
	}

}
