<div id="eportfolio_permissions_template" style="display:none;"><!--
<h3>\${eportfolio_permissions_label}</h3>
<p class="instruction">\${eportfolio_permissions_instr}</p>
<table id="eportfolio_permissions_table" class="listHier lines tableList">
    <thead>
        <tr class="listHier">
            <th align="left">\${eportfolio_permissions_role}</th>
            <th style="text-align:center;">\${eportfolio_permissions_activate}</th>
            <th style="text-align:center;">\${eportfolio_permissions_deactivate_any}</th>
            <th style="text-align:center;">\${eportfolio_permissions_deactivate_own}</th>
            <th style="text-align:center;">\${eportfolio_permissions_edit_any}</th>
            <th style="text-align:center;">\${eportfolio_permissions_edit_own}</th>
            <th style="text-align:center;">\${eportfolio_permissions_grade_any}</th>
            <th style="text-align:center;">\${eportfolio_permissions_grade_own}</th>
            <th style="text-align:center;">\${eportfolio_permissions_participate}</th>
        </tr>
    </thead>
<tbody>
{for p in permissions}
<tr>
    <td align="left">\${p.role}</td>
    <td align="center"><input type="checkbox" class="eportfolio_permission_checkbox" {if p.eportfolio_activate}checked="checked"{/if} id="\${p.role}:eportfolio.activate"/></td>
    <td align="center"><input type="checkbox" class="eportfolio_permission_checkbox" {if p.eportfolio_deactivate_any}checked="checked"{/if} id="\${p.role}:eportfolio.deactivate.any"/></td>
    <td align="center"><input type="checkbox" class="eportfolio_permission_checkbox" {if p.eportfolio_deactivate_own}checked="checked"{/if} id="\${p.role}:eportfolio.deactivate.own"/></td>
    <td align="center"><input type="checkbox" class="eportfolio_permission_checkbox" {if p.eportfolio_edit_any}checked="checked"{/if} id="\${p.role}:eportfolio.edit.any"/></td>
    <td align="center"><input type="checkbox" class="eportfolio_permission_checkbox" {if p.eportfolio_edit_own}checked="checked"{/if} id="\${p.role}:eportfolio.edit.own"/></td>
    <td align="center"><input type="checkbox" class="eportfolio_permission_checkbox" {if p.eportfolio_grade_any}checked="checked"{/if} id="\${p.role}:eportfolio.grade.any"/></td>
    <td align="center"><input type="checkbox" class="eportfolio_permission_checkbox" {if p.eportfolio_grade_own}checked="checked"{/if} id="\${p.role}:eportfolio.grade.own"/></td>
    <td align="center"><input type="checkbox" class="eportfolio_permission_checkbox" {if p.eportfolio_participate}checked="checked"{/if} id="\${p.role}:eportfolio.participate"/></td>
</tr>
{/for}
</tbody>
</table>
<div class="act">
    <input id="eportfolio_permissions_save_button" type="submit" class="active" value="\${eportfolio_save}"/>
    <input type="button" value="\${eportfolio_cancel}" onclick="\$('#eportfolio_list_link').click(); return false;"/>
</div>
-->
</div>
