<div id="eportfolio_assignmentlist_template" style="display:none;"><!--
<h3>\${eportfolio_list_label}</h3>
<table id="eportfolio_assignmentlist_table" class="listHier lines tableList" summary="">
    <tr>
        <th id="title"><a href="#" onclick="location='#'; return false;" title="\${eportfolio_list_title_tooltip}">\${eportfolio_list_title_label}</a></th>
        <th id="status"><a href="#" onclick="location='#'; return false;" title="\${eportfolio_list_status_tooltip}">\${eportfolio_list_status_label}</a></th>
        <th id="openDate"><a href="#" onclick="location='#'; return false;" title="\${eportfolio_list_open_tooltip}">\${eportfolio_list_open_label}</a></th>
        <th id="dueDate"><a href="#" onclick="location='#'; return false;" title="\${eportfolio_list_due_tooltip}">\${eportfolio_list_due_label}</a></th>
    </tr>
{for a in cur.list}
  {if cur.userPerms.eportfolioViewAssignmentList || cur.userPerms.eportfolioAdmin }
    <tr>
        <td headers="title">
          {if cur.userPerms.eportfolioParticipate}
            <h4>
            <span id="meeting_joinlink_${meeting.id}" style="${displayLink}">
                <a id="eportfolio_assignment_join_link_\${a.id}" target="_blank" href="javascript:;" onclick="return EPortfolioUtils.joinAssignment('\${a.id}', '\${cur.siteId}', '#eportfolio_assignment_join_link_\${a.id}');">\${a.title}</a>
                <img src="/library/image/silk/user_go.png" alt=">" style="vertical-align:middle"/>
            </span>
            </h4>
          {else}
            <h4>\${a.title}</h4>
          {/if}
        <div class="itemAction">
          {if cur.userPerms.eportfolioEditAny || (cur.userPerms.eportfolioEditOwn && a.ownerId == cur.userId )  }
            <a id="eportfolio_assignment_list_update_link" value="\${a.id}" title="\${eportfolio_update_tooltip}" href="javascript: updateAssignment('\${a.id}');">\${eportfolio_update}</a>
          {/if}
          {if cur.userPerms.eportfolioDeactivateAny || (cur.userPerms.eportfolioDeactivateOwn && a.ownerId == cur.userId )  }
            <a id="eportfolio_assignment_list_remove_link" value="\${a.id}" title="\${eportfolio_remove_tooltip}" href="javascript: removeAssignment('\${a.id}');">\${eportfolio_remove}</a>
          {/if}
          {if cur.userPerms.eportfolioGradeAny || (cur.userPerms.eportfolioGradeOwn && a.ownerId == cur.userId )  }
            <a id="eportfolio_assignment_list_grade_link" value="\${a.id}" title="\${eportfolio_grade_tooltip}" href="javascript: gradeAssignment('\${a.id}');">\${eportfolio_grade}</a>
          {/if}
        </div>
        </td>
        <td headers="status">Open</td>
        <td headers="openDate">\${(new Date(a.start_date).toISO8601String())}</td>
        <td headers="dueDate">\${(new Date(a.due_date).toISO8601String())}</td>
    </tr>
  {/if}
{/for}    
</table>
-->
</div>
