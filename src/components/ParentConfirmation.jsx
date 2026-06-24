import { useState } from 'react';
import { CheckIcon } from './icons';
import { SEMESTER_LABEL, ENROLLMENT_DEADLINE } from '../data/families';

export default function ParentConfirmation({ family, onConfirm, onClose }) {
  const [step, setStep] = useState('confirm');
  const deadline = ENROLLMENT_DEADLINE.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  if (step === 'success') {
    return (
      <div className="parent-overlay">
        <div className="parent-phone">
          <div className="parent-screen parent-screen-success">
            <div className="success-icon">
              <CheckIcon />
            </div>
            <h2>You&apos;re all set!</h2>
            <p>
              {family.studentName} is confirmed for {SEMESTER_LABEL} at ABC Academy.
            </p>
            <p className="success-detail">
              Maria will see this update on her dashboard in real time.
            </p>
            <button type="button" className="btn btn-primary btn-full" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="parent-overlay">
      <div className="parent-phone">
        <div className="parent-status-bar">
          <span>9:41</span>
          <span className="parent-brand">brightwheel</span>
        </div>
        <div className="parent-screen">
          <div className="parent-header">
            <span className="parent-school">ABC Academy</span>
            <h2>Confirm re-enrollment</h2>
          </div>

          <div className="parent-card">
            <div className="parent-student-avatar">
              {family.studentName.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <p className="parent-student-name">{family.studentName}</p>
              <p className="parent-classroom">{family.classroom}</p>
            </div>
          </div>

          <div className="parent-details">
            <div className="parent-detail-row">
              <span>Semester</span>
              <strong>{SEMESTER_LABEL}</strong>
            </div>
            <div className="parent-detail-row">
              <span>Confirm by</span>
              <strong>{deadline}</strong>
            </div>
          </div>

          <p className="parent-note">
            One tap confirms your child&apos;s spot. No forms, no login required.
          </p>

          <button
            type="button"
            className="btn btn-primary btn-full btn-confirm"
            onClick={() => {
              onConfirm(family.id);
              setStep('success');
            }}
          >
            Confirm re-enrollment
          </button>

          <button type="button" className="btn btn-text" onClick={onClose}>
            I need to talk to the school first
          </button>
        </div>
      </div>
    </div>
  );
}
