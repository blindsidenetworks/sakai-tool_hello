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

	@Setter	@Getter
	private SakaiProxy sakaiProxy = null;
	@Setter	@Getter
	private HelloManager helloManager = null;
	
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) 
			throws Exception {
		
		if(logger.isDebugEnabled()) logger.debug("handleRequest");

		Map<String, Object> map = new HashMap<String,Object>();
		map.put("currentSiteId", sakaiProxy.getCurrentSiteId());
		map.put("userDisplayName", sakaiProxy.getCurrentUserDisplayName());
        map.put("currentToolId", sakaiProxy.getCurrentToolId());
        map.put("helloManager", helloManager.getHellos().toString() );

		map.put("siteId", sakaiProxy.getCurrentSiteId());
		map.put("language", sakaiProxy.getUserLanguageCode());
		map.put("skin", sakaiProxy.getSakaiSkin());
		//map.put("timezoneoffset", sakaiProxy.getUserTimezone());
        
        return new ModelAndView("hello", map);
	}

}
