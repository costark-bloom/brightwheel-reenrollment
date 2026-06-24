import { useState } from 'react';
import { CloseIcon, SendIcon } from './icons';
import { getNudgeMessage } from '../data/families';

export default function NudgeModal({ families, onClose, onSend }) {
  const [message, setMessage] = useState(
    families.length === 1 ? getNudgeMessage(families[0]) : ''
  );
  const [channels, setChannels] = useState({ inApp: true, sms: true });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const isBulk = families.length > 1;
  const bulkTemplate = `Hi [Parent Name], this is ABC Academy. We're preparing for Fall 2026 and haven't received your re-enrollment confirmation for [Student Name] yet. Please confirm by July 8 to secure their spot. Tap here to confirm in one step: [link]`;

  const displayMessage = isBulk ? bulkTemplate : message;

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => {
        onSend(families.map((f) => f.id));
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        <div className="modal-icon">
          <SendIcon />
        </div>

        <h2 className="modal-title">
          {isBulk ? `Send re-enrollment nudges (${families.length} families)` : 'Send re-enrollment nudge'}
        </h2>

        {isBulk ? (
          <p className="modal-subtitle">
            Each family will receive a personalized version of this message with their student&apos;s name.
          </p>
        ) : (
          <p className="modal-subtitle">
            To {families[0].parentName} · {families[0].studentName}
          </p>
        )}

        <div className="channel-toggles">
          <label className={`channel-toggle ${channels.inApp ? 'active' : ''}`}>
            <input
              type="checkbox"
              checked={channels.inApp}
              onChange={(e) => setChannels({ ...channels, inApp: e.target.checked })}
            />
            In-app message
          </label>
          <label className={`channel-toggle ${channels.sms ? 'active' : ''}`}>
            <input
              type="checkbox"
              checked={channels.sms}
              onChange={(e) => setChannels({ ...channels, sms: e.target.checked })}
            />
            SMS
          </label>
        </div>

        <div className="message-preview">
          <label className="field-label">Recommended message</label>
          {isBulk ? (
            <div className="message-readonly">{displayMessage}</div>
          ) : (
            <textarea
              className="message-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />
          )}
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={`btn btn-primary ${sent ? 'btn-success' : ''}`}
            onClick={handleSend}
            disabled={sending || sent || (!channels.inApp && !channels.sms)}
          >
            {sent ? 'Sent!' : sending ? 'Sending...' : isBulk ? `Send ${families.length} nudges` : 'Send nudge'}
          </button>
        </div>
      </div>
    </div>
  );
}
