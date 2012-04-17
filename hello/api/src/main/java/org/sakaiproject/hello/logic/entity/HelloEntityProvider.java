package org.sakaiproject.hello.logic.entity;

//import org.sakaiproject.entitybroker.entityprovider.EntityProvider;
import org.sakaiproject.entitybroker.entityprovider.CoreEntityProvider;

public interface HelloEntityProvider extends CoreEntityProvider {

    /** Entity prefix */
    public static final String ENTITY_PREFIX = "hello-tool";
	
	String getEntityPrefix();
	
	boolean entityExists(String id);

}
