package org.sakaiproject.hello.logic;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import org.sakaiproject.hello.model.Item;

/**
 * Implementation of {@link ProjectLogic}
 * 
 * @author Mike Jennings (mike_jennings@unc.edu)
 *
 */
public class ProjectLogicImpl implements ProjectLogic {

	private static final Logger log = Logger.getLogger(ProjectLogicImpl.class);

	
	/**
	 * {@inheritDoc}
	 */
	public List<Item> getItems() {
		
		List<Item> items = new ArrayList<Item>();
		
		items.add(new Item(1,"hello"));
		items.add(new Item(2,"world"));
		
		return items;
		
	}
	
	/**
	 * init - perform any actions required here for when this bean starts up
	 */
	public void init() {
		log.info("init");
	}

}
