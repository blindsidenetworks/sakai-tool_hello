package org.sakaiproject.hello.logic;

import java.util.List;

import org.sakaiproject.hello.model.Hello;

public interface HelloManager {

    /** Entity prefix */
    public static final String ENTITY_PREFIX = "hello-tool";

	/**
	 * Get a list of Items
	 * @return
	 */
	public List<Hello> getHellos();
}
