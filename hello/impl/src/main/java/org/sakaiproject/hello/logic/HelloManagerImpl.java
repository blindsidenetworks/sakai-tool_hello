package org.sakaiproject.hello.logic;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import org.sakaiproject.hello.logic.SakaiProxy;
import org.sakaiproject.hello.model.Hello;

/**
 * Implementation of {@link HelloManager}
 * 
 * @author Mike Jennings (mike_jennings@unc.edu)
 *
 */
public class HelloManagerImpl implements HelloManager {

    @Getter @Setter
    private SakaiProxy sakaiProxy;

    private static final Logger log = Logger.getLogger(HelloManagerImpl.class);

    
	/**
	 * {@inheritDoc}
	 */
	public List<Hello> getHellos() {
		
		List<Hello> hellos = new ArrayList<Hello>();
		
		hellos.add(new Hello(1,"hello", "Hello world"));
		hellos.add(new Hello(2,"bye", "Bye world"));
		
		return hellos;
		
	}
	
	/**
	 * init - perform any actions required here for when this bean starts up
	 */
	public void init() {
		log.info("init");
	}
	
    /**
     * {@inheritDoc}
     */
    public String getEntityPrefix(){
        return ENTITY_PREFIX;
    }

    /**
     * {@inheritDoc}
     */
    public SakaiProxy getSakaiProxy(){
        return sakaiProxy;
    }


}
