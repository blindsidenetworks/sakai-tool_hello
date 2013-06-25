package org.sakaiproject.hello.tool.entity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.Getter;
import lombok.Setter;

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
import org.sakaiproject.util.ResourceLoader;

import org.sakaiproject.hello.logic.HelloManager;
import org.sakaiproject.hello.model.Hello;
import org.sakaiproject.hello.logic.SakaiProxy;

public class HelloWebEntityProvider extends AbstractEntityProvider implements RESTful {

	private static final Logger logger = Logger.getLogger(HelloWebEntityProvider.class);
	
	   // --- Spring ------------------------------------------------------------
    @Setter @Getter
    private HelloManager helloManager = null;

    /**
     * init - perform any actions required here for when this bean starts up
     */
    public void init() {
        logger.info("init");
    }

    // --- Outputable, Inputable -----------------------------------------------------
    public String[] getHandledOutputFormats() {
        return new String[] { Formats.JSON };
    }
    
    public String[] getHandledInputFormats() {
        return new String[] { Formats.HTML, Formats.JSON, Formats.FORM };
    }

    // --- EntityProvider, CoreEntityProvider, Resolvable -----------------------------
	public String getEntityPrefix()
	{
		return HelloManager.ENTITY_PREFIX;
	}
	
	public String createEntity(EntityReference ref, Object entity, Map<String, Object> params) {
		
		return "Entity created";
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
	
	// --- CRUDable ------------------------------------------------------------------  
    public Object getSampleEntity()
    {
        return new Hello();
    }
	
	// --- ActionsExecutable (Custom actions) ----------------------------------------
    @EntityCustomAction(viewKey=EntityView.VIEW_LIST)
    public ActionReturn getSettings(Map<String,Object> params)
    {
        if(logger.isDebugEnabled()) logger.debug("getSettings");
        logger.info("getSettings");

        Map<String, Object> response = new HashMap<String, Object>();
        try {
            Map<String, String> resTool = new HashMap<String, String>();
            Map<String, String> resUser = new HashMap<String, String>();
            Map<String, String> resSite = new HashMap<String, String>();

            ResourceLoader toolParameters = new ResourceLoader("Tool");
            resTool.put("version", toolParameters.getString("hello_version") );
            resTool.put("buildSerial", toolParameters.getString("hello_buildSerial") );
            if( helloManager != null ){
                SakaiProxy sakaiProxy = helloManager.getSakaiProxy();
                resTool.put("entityPrefix", getEntityPrefix());
                
                resUser.put("userId", sakaiProxy.getCurrentUserId()); 
                resUser.put("userDisplayName", sakaiProxy.getCurrentUserDisplayName());
            }

            response.put("tool", resTool);
            response.put("user", resUser);
            response.put("site", resSite);
            
        } catch(Exception e) {
            logger.error("there was an error " + e.toString());
        
        }
        
        return new ActionReturn( response );
    }

	

}
