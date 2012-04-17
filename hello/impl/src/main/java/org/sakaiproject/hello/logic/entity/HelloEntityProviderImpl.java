package org.sakaiproject.hello.logic.entity;

import org.sakaiproject.entitybroker.entityprovider.capabilities.AutoRegisterEntityProvider;
import org.sakaiproject.entitybroker.entityprovider.CoreEntityProvider;

import org.sakaiproject.hello.logic.entity.HelloEntityProvider;

public class HelloEntityProviderImpl implements HelloEntityProvider, AutoRegisterEntityProvider {

	public String getEntityPrefix()
	{
		return HelloEntityProvider.ENTITY_PREFIX;
	}

	public boolean entityExists(String id){
		return false;
	}

}
