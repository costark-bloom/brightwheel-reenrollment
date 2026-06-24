import { useMemo, useState } from 'react';
import {
  INITIAL_FAMILIES,
  daysSince,
  daysUntilDeadline,
  formatDate,
  ENROLLMENT_DEADLINE,
  SEMESTER_LABEL,
} from '../data/families';
import NudgeModal from './NudgeModal';
import ParentConfirmation from './ParentConfirmation';

const STATUS_LABELS = {
  confirmed: { label: 'Confirmed', className: 'status-confirmed' },
  pending: { label: 'Pending', className: 'status-pending' },
  unconfirmed: { label: 'Unconfirmed', className: 'status-unconfirmed' },
};

function StatCard({ label, value, sublabel, variant }) {
  return (
    <div className={`stat-card ${variant ? `stat-card-${variant}` : ''}`}>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
      {sublabel && <span className="stat-sublabel">{sublabel}</span>}
    </div>
  );
}

export default function Dashboard() {
  const [families, setFamilies] = useState(INITIAL_FAMILIES);
  const [selected, setSelected] = useState(new Set());
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');
  const [nudgeTargets, setNudgeTargets] = useState(null);
  const [previewFamily, setPreviewFamily] = useState(null);
  const [toast, setToast] = useState(null);

  const stats = useMemo(() => {
    const confirmed = families.filter((f) => f.status === 'confirmed').length;
    const pending = families.filter((f) => f.status === 'pending').length;
    const unconfirmed = families.filter((f) => f.status === 'unconfirmed').length;
    const atRisk = families.filter(
      (f) => f.status === 'unconfirmed' && daysSince(f.lastContact) >= 7
    ).length;
    const revenueAtRisk = families
      .filter((f) => f.status !== 'confirmed')
      .reduce((sum, f) => sum + f.monthlyRevenue, 0);
    return { confirmed, pending, unconfirmed, atRisk, revenueAtRisk, total: families.length };
  }, [families]);

  const filteredFamilies = useMemo(() => {
    let list = [...families];
    if (statusFilter !== 'all') {
      list = list.filter((f) => f.status === statusFilter);
    }
    list.sort((a, b) => {
      if (sortBy === 'priority') {
        const statusOrder = { unconfirmed: 0, pending: 1, confirmed: 2 };
        if (statusOrder[a.status] !== statusOrder[b.status]) {
          return statusOrder[a.status] - statusOrder[b.status];
        }
        const daysDiff = daysSince(b.lastContact) - daysSince(a.lastContact);
        if (daysDiff !== 0) return daysDiff;
        return b.monthlyRevenue - a.monthlyRevenue;
      }
      if (sortBy === 'revenue') return b.monthlyRevenue - a.monthlyRevenue;
      if (sortBy === 'lastContact') return daysSince(b.lastContact) - daysSince(a.lastContact);
      return a.familyName.localeCompare(b.familyName);
    });
    return list;
  }, [families, statusFilter, sortBy]);

  const unconfirmedSelectable = filteredFamilies.filter((f) => f.status === 'unconfirmed');
  const allUnconfirmedSelected =
    unconfirmedSelectable.length > 0 &&
    unconfirmedSelectable.every((f) => selected.has(f.id));

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (allUnconfirmedSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(unconfirmedSelectable.map((f) => f.id)));
    }
  };

  const handleSendNudges = (ids) => {
    const today = '2026-06-24';
    setFamilies((prev) =>
      prev.map((f) =>
        ids.includes(f.id) && f.status === 'unconfirmed'
          ? { ...f, status: 'pending', lastContact: today }
          : f
      )
    );
    setSelected(new Set());
    showToast(`Nudge sent to ${ids.length} ${ids.length === 1 ? 'family' : 'families'}`);
  };

  const handleConfirm = (id) => {
    setFamilies((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: 'confirmed', lastContact: '2026-06-24' } : f))
    );
    showToast('Family confirmed re-enrollment');
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const openBulkNudge = () => {
    const targets = families.filter((f) => selected.has(f.id) && f.status === 'unconfirmed');
    if (targets.length) setNudgeTargets(targets);
  };

  const daysLeft = daysUntilDeadline();
  const deadlineStr = ENROLLMENT_DEADLINE.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="dashboard">
      <header className="page-header">
        <div>
          <h1>Re-enrollment</h1>
          <p className="page-subtitle">{SEMESTER_LABEL} · Deadline {deadlineStr}</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={openBulkNudge}
          disabled={selected.size === 0}
        >
          + Send nudges
        </button>
      </header>

      <div className={`deadline-banner ${daysLeft <= 14 ? 'deadline-banner-urgent' : ''}`}>
        <div className="deadline-banner-content">
          <strong>{stats.unconfirmed} families haven&apos;t confirmed</strong>
          <span>
            Last bulk reminder sent 10 days ago · {daysLeft} days until deadline
          </span>
        </div>
        <button
          type="button"
          className="btn btn-banner"
          onClick={() => {
            const targets = families.filter((f) => f.status === 'unconfirmed');
            setNudgeTargets(targets);
          }}
        >
          Nudge all unconfirmed
        </button>
      </div>

      <div className="stats-row">
        <StatCard label="Confirmed" value={stats.confirmed} sublabel={`of ${stats.total} families`} variant="green" />
        <StatCard label="Pending" value={stats.pending} sublabel="Nudged, awaiting response" variant="yellow" />
        <StatCard label="Unconfirmed" value={stats.unconfirmed} sublabel="Need a nudge" variant="red" />
        <StatCard
          label="Revenue at risk"
          value={`$${stats.revenueAtRisk.toLocaleString()}`}
          sublabel={`${stats.atRisk} families not contacted in 7+ days`}
          variant="neutral"
        />
      </div>

      <div className="filters-bar">
        <div className="filter-group">
          <label htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All families</option>
            <option value="unconfirmed">Unconfirmed</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="sort-by">Sort by</label>
          <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="priority">Priority (status, contact, revenue)</option>
            <option value="lastContact">Days since last contact</option>
            <option value="revenue">Monthly revenue</option>
            <option value="name">Family name</option>
          </select>
        </div>
        <button type="button" className="btn btn-secondary btn-apply">
          Apply
        </button>
      </div>

      <div className="table-container">
        <table className="family-table">
          <thead>
            <tr>
              <th className="col-check">
                <input
                  type="checkbox"
                  checked={allUnconfirmedSelected}
                  onChange={toggleSelectAll}
                  aria-label="Select all unconfirmed"
                />
              </th>
              <th>Family</th>
              <th>Student</th>
              <th>Classroom</th>
              <th>Monthly revenue</th>
              <th>Status</th>
              <th>Last contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFamilies.map((family) => {
              const status = STATUS_LABELS[family.status];
              const days = daysSince(family.lastContact);
              const isStale = family.status === 'unconfirmed' && days >= 7;
              return (
                <tr key={family.id} className={isStale ? 'row-at-risk' : ''}>
                  <td className="col-check">
                    {family.status === 'unconfirmed' && (
                      <input
                        type="checkbox"
                        checked={selected.has(family.id)}
                        onChange={() => toggleSelect(family.id)}
                        aria-label={`Select ${family.familyName}`}
                      />
                    )}
                  </td>
                  <td>
                    <span className="family-name">{family.familyName}</span>
                    <span className="parent-name">{family.parentName}</span>
                  </td>
                  <td>{family.studentName}</td>
                  <td>{family.classroom}</td>
                  <td className="revenue">${family.monthlyRevenue.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${status.className}`}>{status.label}</span>
                  </td>
                  <td>
                    <span className={isStale ? 'contact-stale' : ''}>
                      {formatDate(family.lastContact)}
                    </span>
                    <span className="days-ago">{days === 0 ? 'Today' : `${days}d ago`}</span>
                  </td>
                  <td>
                    <div className="row-actions">
                      {family.status === 'unconfirmed' && (
                        <button
                          type="button"
                          className="btn btn-sm btn-teal"
                          onClick={() => setNudgeTargets([family])}
                        >
                          Send nudge
                        </button>
                      )}
                      {family.status === 'pending' && (
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          onClick={() => setNudgeTargets([family])}
                        >
                          Follow up
                        </button>
                      )}
                      <button
                        type="button"
                        className="btn btn-sm btn-ghost"
                        onClick={() => setPreviewFamily(family)}
                        title="Preview parent confirmation flow"
                      >
                        Preview
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {nudgeTargets && (
        <NudgeModal
          families={nudgeTargets}
          onClose={() => setNudgeTargets(null)}
          onSend={handleSendNudges}
        />
      )}

      {previewFamily && (
        <ParentConfirmation
          family={previewFamily}
          onConfirm={handleConfirm}
          onClose={() => setPreviewFamily(null)}
        />
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
