package org.sakaiproject.hello.logic;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import org.sakaiproject.hello.model.Hello;

/**
 * Implementation of {@link HelloManager}
 * 
 * @author Mike Jennings (mike_jennings@unc.edu)
 *
 */
public class HelloManagerImpl implements HelloManager {

	private static final Logger log = Logger.getLogger(HelloManagerImpl.class);

	
	/**
	 * {@inheritDoc}
	 */
	public List<Hello> getHellos() {
		
		List<Hello> hellos = new ArrayList<Hello>();
		
		hellos.add(new Hello(1,"hello"));
		hellos.add(new Hello(2,"world"));
		
		return hellos;
		
	}
	
	/**
	 * init - perform any actions required here for when this bean starts up
	 */
	public void init() {
		log.info("init");
	}

}
