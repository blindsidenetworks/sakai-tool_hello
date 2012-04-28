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
	
	public ModelAndView handleRequest(HttpServletRequest request, HttpServletResponse response) 
			throws Exception {
		
		if(logger.isDebugEnabled()) logger.debug("handleRequest");

		Map<String, Object> map = new HashMap<String,Object>();

		// Minimal data required to show the tool in a proper way
		map.put("siteId", sakaiProxy.getCurrentSiteId());
		map.put("language", sakaiProxy.getUserLanguageCode());
		map.put("skin", sakaiProxy.getSakaiSkin());
        
        return new ModelAndView("hello", map);
	}

}
