<h1>Just static text</h1>
<p>Here is a simple case <%=it.f1+it.f3%>
</p>
<div class="<%=it.f1%>"> Next we will use a JavaScript block: </div>
<div>
<% for(var i=0; i < it.f2; i++) { %>
<div><%=it.f3%></div>
<% }; %>
</div>
