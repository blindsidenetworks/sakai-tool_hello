package org.sakaiproject.hello.logic;

import java.util.List;

import org.sakaiproject.hello.logic.SakaiProxy;
import org.sakaiproject.hello.model.Hello;

public interface HelloManager {

    /** Entity prefix */
    public static final String ENTITY_PREFIX = "hello-tool";

    /** Meetings tool ID */
    public final static String TOOL_ID = "sakai.hello";

    /** Meetings tool Webapp */
    public final static String TOOL_WEBAPP = "/hello";

    // Permissions
    public static final String FN_PREFIX        = "hello.";
    public static final String FN_ACTIVATE      = "add";
    public static final String FN_EDIT_OWN      = "edit.own";
    public static final String FN_EDIT_ANY      = "edit.any";
    public static final String FN_DELETE_OWN = "delete.own";
    public static final String FN_DELETE_ANY = "delete.any";
    public static final String FN_VIEW   = "view";
    public static final String[] FUNCTIONS      = new String[] { 
        FN_ACTIVATE, 
        FN_DELETE_ANY, FN_DELETE_OWN, 
        FN_EDIT_ANY, FN_EDIT_OWN, 
        FN_VIEW };

    public String getEntityPrefix();

    public SakaiProxy getSakaiProxy();

	/**
	 * Get a list of Items
	 * @return
	 */
	public List<Hello> getHellos();
	
}
