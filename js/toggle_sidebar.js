const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');

sidebarToggle.addEventListener('click', () => 
{
  sidebar.classList.toggle('active');
  const expanded = sidebar.classList.contains('active');
  sidebarToggle.setAttribute('aria-expanded', expanded);
});
