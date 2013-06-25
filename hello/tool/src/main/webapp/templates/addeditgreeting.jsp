<div id="eportfolio_addeditassignment_template" style="display:none;"><!--
<h3 id="eportfolio_addeditassignment_title"></h3>
<p class="instruction">\${eportfolio_addedit_instr}</p>
<div id="eportfolio_addeditassignment_content">

<div class="ui-widget">
    <div class="shorttext indnt2"><span class="reqStar">*</span> <label for="eportfolio_addedit_assignment_title">\${eportfolio_addedit_assignment_title_label}: </label>
        <input id="eportfolio_addedit_assignment_title" size="35" value="\${cur.title}">
    </div>
    <div class="shorttext indnt2"><label for="eportfolio_addedit_assignment_instructions">\${eportfolio_addedit_assignment_instructions_label}: </label>
        <textarea name="eportfolio_addedit_assignment_instructions" id="eportfolio_addedit_assignment_instructions" cols="80" rows="10" wrap="virtual" readonly="readonly">\${cur.description}</textarea>
    </div>
    <div class="shorttext indnt2"><label for="eportfolio_addedit_assignment_opendate">\${eportfolio_addedit_assignment_opendate_label}: </label>
        <input id="eportfolio_addedit_assignment_opendate" size="35" value="\${cur.start_date}" readonly="readonly">
    </div>
    <div class="instruction labelindnt">\${eportfolio_addedit_assignment_opendate_instr}</div>
    <div class="shorttext indnt2"><label for="eportfolio_addedit_assignment_duedate">\${eportfolio_addedit_assignment_duedate_label}: </label>
        <input id="eportfolio_addedit_assignment_duedate" size="35" value="\${cur.due_date}" readonly="readonly">
    </div>
    <div class="instruction labelindnt">\${eportfolio_addedit_assignment_duedate_instr}</div>
    <div class="shorttext indnt2"><label for="eportfolio_addedit_assignment_closedate">\${eportfolio_addedit_assignment_closedate_label}: </label>
        <input id="eportfolio_addedit_assignment_closedate" size="35" value="\${cur.cutoff_date}" readonly="readonly">
    </div>
    <div class="instruction labelindnt">\${eportfolio_addedit_assignment_closedate_instr}</div>
    
    <div class="checkbox indnt2"><input id="eportfolio_assignment_check_add_due_date" name="eportfolio_assignment_check_add_due_date" type="checkbox" value="add_due_date" {if cur.add_due_date}checked="checked"{/if} />
    <label for="eportfolio_assignment_check_add_due_date"> Add due date to Schedule </label></div>
    <div class="checkbox  indnt2"><input id="eportfolio_assignment_check_auto_announce" name="eportfolio_assignment_check_auto_announce" type="checkbox" value="auto_announce" {if cur.auto_announce}checked="checked"{/if} />
    <label for="eportfolio_assignment_check_auto_announce"> Add an announcement about the open date to Announcements </label></div>
</div>

<div class="act">
    <input id="eportfolio_addedit_save_button" type="submit" class="active" value="\${eportfolio_save}"/>
    <input id="eportfolio_addedit_save_button" type="button" value="\${eportfolio_cancel}" onclick="\$('#eportfolio_list_link').click(); return false;"/>
</div>


</div>
-->
</div>
