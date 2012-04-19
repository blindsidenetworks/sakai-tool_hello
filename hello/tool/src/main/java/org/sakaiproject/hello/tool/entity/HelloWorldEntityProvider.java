package org.sakaiproject.hello.tool.entity;

import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.sakaiproject.entitybroker.EntityReference;
import org.sakaiproject.entitybroker.entityprovider.capabilities.RESTful;
import org.sakaiproject.entitybroker.util.AbstractEntityProvider;
import org.sakaiproject.entitybroker.EntityReference;
import org.sakaiproject.entitybroker.EntityView;
import org.sakaiproject.entitybroker.entityprovider.CoreEntityProvider;
import org.sakaiproject.entitybroker.entityprovider.annotations.EntityCustomAction;
import org.sakaiproject.entitybroker.entityprovider.capabilities.ActionsExecutable;
import org.sakaiproject.entitybroker.entityprovider.capabilities.AutoRegisterEntityProvider;
import org.sakaiproject.entitybroker.entityprovider.capabilities.CollectionResolvable;
import org.sakaiproject.entitybroker.entityprovider.capabilities.Createable;
import org.sakaiproject.entitybroker.entityprovider.capabilities.Deleteable;
import org.sakaiproject.entitybroker.entityprovider.capabilities.Describeable;
import org.sakaiproject.entitybroker.entityprovider.capabilities.Inputable;
import org.sakaiproject.entitybroker.entityprovider.capabilities.Outputable;
import org.sakaiproject.entitybroker.entityprovider.capabilities.Resolvable;
import org.sakaiproject.entitybroker.entityprovider.capabilities.Statisticable;
import org.sakaiproject.entitybroker.entityprovider.capabilities.Updateable;
import org.sakaiproject.entitybroker.entityprovider.extension.ActionReturn;
import org.sakaiproject.entitybroker.entityprovider.extension.Formats;
import org.sakaiproject.entitybroker.entityprovider.search.Restriction;
import org.sakaiproject.entitybroker.entityprovider.search.Search;
import org.sakaiproject.entitybroker.exception.EntityException;
import org.sakaiproject.entitybroker.exception.EntityNotFoundException;

import org.sakaiproject.hello.logic.HelloManager;
import org.sakaiproject.hello.model.Hello;

public class HelloWorldEntityProvider extends AbstractEntityProvider implements RESTful {

	private static final Logger log = Logger.getLogger(HelloWorldEntityProvider.class);

	public String getEntityPrefix()
	{
		return HelloManager.ENTITY_PREFIX;
	}
	
	public String createEntity(EntityReference ref, Object entity, Map<String, Object> params) {
		
		return "Hello Hello";
	}

	public Object getSampleEntity()
	{
		return new Hello();
	}

	public void updateEntity(EntityReference ref, Object entity, Map<String, Object> params)
	{

	}
	
	public Object getEntity(EntityReference ref) {		
		return new Hello();
	}

	public void deleteEntity(EntityReference ref, Map<String, Object> params)
	{
		
	}
	
	public List<Hello> getEntities(EntityReference ref, Search search)
	{
		List<Hello> hellos = null;
		return hellos;
	}
	
	// --- Outputable, Inputable -----------------------------------------------------
	public String[] getHandledOutputFormats() {
	    return new String[] { Formats.JSON };
	}
	
	public String[] getHandledInputFormats() {
        return new String[] { Formats.HTML, Formats.JSON, Formats.FORM };
    }

	// --- ActionsExecutable (Custom actions) ----------------------------------------
	@EntityCustomAction(viewKey=EntityView.VIEW_LIST)
	public String test(Map<String,Object> params)
	{
		if(log.isDebugEnabled()) log.debug("test");
		
		return "Direct queries are actually working!";
	}

	

}
