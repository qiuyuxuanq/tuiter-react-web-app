const NavigationSidebar = () => {
    return(`
    <nav class="nav flex-column nav-pills">
    <a class="nav-link" aria-current="page" href="#">
        <i class="bi bi-house-door-fill"></i>
        <span class="d-none d-md-block">Home</span>
    </a>
    <a class="nav-link  active" href="#">
        <i style="font-weight:bold;">#</i>
        <span class="d-none d-md-block">Explore</span>
    </a>
    <a class="nav-link" href="#">
        <i class="bi bi-bell-fill"></i>
        <span class="d-none d-md-block">Notifications</span>
    </a>
    <a class="nav-link">
        <i class="bi bi-envelope-fill"></i>
        <span class="d-none d-md-block">Messages</span>
    </a>
    <a class="nav-link">
        <i class="bi bi-bookmark-fill"></i>
        <span class="d-none d-md-block">Bookmarks</span></a>
    <a class="nav-link">
        <i class="bi bi-list-ul"></i>
        <span class="d-none d-md-block">Lists</span>
    </a>
    <a class="nav-link">
        <i class="bi bi-person-fill"></i>
        <span class="d-none d-md-block">Profile</span>
    </a>
    <a class="nav-link">
        <i class="bi bi-record-fill"></i>
        <span class="d-none d-md-block">More</span>
    </a>
  </nav>
  <button class="t_button">Tweet</button>
    `);
   }
   export default NavigationSidebar;
   