import {
  HomeIcon,
  SchoolIcon,
  MessageIcon,
  LearningIcon,
  DocumentsIcon,
  ReportingIcon,
  HelpIcon,
  ChevronDownIcon,
  EnrollmentIcon,
} from './icons';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'school', label: 'My School', icon: SchoolIcon, hasSubmenu: true },
  { id: 'messaging', label: 'Messaging', icon: MessageIcon },
  { id: 'learning', label: 'Learning', icon: LearningIcon },
  { id: 'documents', label: 'Documents', icon: DocumentsIcon },
  { id: 'reporting', label: 'Reporting', icon: ReportingIcon },
];

const SCHOOL_SUBMENU = [
  { id: 'enrollment', label: 'Enrollment' },
  { id: 're-enrollment', label: 'Re-enrollment', active: true },
  { id: 'classrooms', label: 'Classrooms' },
  { id: 'staff', label: 'Staff' },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-text">brightwheel</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isSchool = item.id === 'school';
          return (
            <div key={item.id} className="nav-group">
              <button
                type="button"
                className={`nav-item ${isSchool ? 'nav-item-expanded' : ''}`}
              >
                <Icon />
                <span>{item.label}</span>
                {item.hasSubmenu && <ChevronDownIcon />}
              </button>
              {isSchool && (
                <div className="nav-submenu">
                  {SCHOOL_SUBMENU.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      className={`nav-subitem ${sub.active ? 'nav-subitem-active' : ''}`}
                    >
                      {sub.id === 're-enrollment' && <EnrollmentIcon />}
                      <span>{sub.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button type="button" className="nav-item">
          <HelpIcon />
          <span>Help</span>
        </button>
        <div className="user-card">
          <div className="user-avatar">MF</div>
          <div className="user-info">
            <span className="user-name">Maria F.</span>
            <span className="user-school">ABC Academy</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
