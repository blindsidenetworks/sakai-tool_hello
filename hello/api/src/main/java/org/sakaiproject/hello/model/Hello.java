package org.sakaiproject.hello.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * An example item
 * 
 * @author Mike Jennings (mike_jennings@unc.edu)s
 * 
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hello {

	private String id = null;
	private String name = null;
	private String siteId = null;
	private String ownerId = null;
	private String ownerDisplayName = null;
	private Date startDate = null;
	private Date endDate = null;
	
	public Hello(String id, String name){
		this.id = id;
		this.name = name;
		
	}

}
