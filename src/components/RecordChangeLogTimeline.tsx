/**
 * RecordChangeLogTimeline.tsx
 * 
 * Displays a chronological, auditable timeline of all previous edits, 
 * OCR corrections, sanctions, and field rectifications made to a land record.
 */

import React, { useState, useMemo } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  ArrowDownUp, 
  Clock, 
  User, 
  ShieldCheck, 
  Stamp, 
  Edit3, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Terminal, 
  PlusCircle, 
  Check, 
  X,
  ChevronDown,
  ChevronUp,
  Cpu,
  GitCommit,
  ShieldAlert,
  Calendar
} from 'lucide-react';
import { ExtractedLandRecord, ChangeLogEntry, UserRole } from '../types';
import { 
  getRecordChangeLog, 
  formatChangeLogDate, 
  getActionMeta,
  appendChangeLogEntry
} from '../utils/changeLogUtils';

interface RecordChangeLogTimelineProps {
  record: ExtractedLandRecord;
  userRole?: UserRole;
  onUpdateRecord?: (updated: ExtractedLandRecord) => void;
  onSelectFieldToEdit?: (fieldKey: string) => void;
  isInline?: boolean;
}

export const RecordChangeLogTimeline: React.FC<RecordChangeLogTimelineProps> = ({
  record,
  userRole = 'VERIFICATION_SPECIALIST',
  onUpdateRecord,
  onSelectFieldToEdit,
  isInline = false
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [sortDescending, setSortDescending] = useState<boolean>(true);
  const [expandedEntryIds, setExpandedEntryIds] = useState<Record<string, boolean>>({});

  // Quick Audit Note state
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>('Field Ground-Truthing Note');
  const [noteText, setNoteText] = useState<string>('');
  const [noteSuccess, setNoteSuccess] = useState<boolean>(false);

  // Retrieve complete normalized changeLog array
  const changeLogList = useMemo(() => {
    return getRecordChangeLog(record);
  }, [record]);

  // Filter and sort entries
  const filteredEntries = useMemo(() => {
    return changeLogList
      .filter((entry) => {
        const meta = getActionMeta(entry.action);

        // Filter by category
        if (filterCategory !== 'ALL') {
          if (filterCategory === 'EDIT' && meta.category !== 'EDIT') return false;
          if (filterCategory === 'SANCTION' && meta.category !== 'SANCTION') return false;
          if (filterCategory === 'SYSTEM' && meta.category !== 'SYSTEM') return false;
          if (filterCategory === 'ENCUMBRANCE' && meta.category !== 'ENCUMBRANCE') return false;
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchOfficer = entry.officerName?.toLowerCase().includes(q);
          const matchLabel = entry.fieldLabel?.toLowerCase().includes(q);
          const matchAction = entry.action?.toLowerCase().includes(q);
          const matchOld = entry.oldValue?.toLowerCase().includes(q);
          const matchNew = entry.newValue?.toLowerCase().includes(q);
          const matchReason = entry.reason?.toLowerCase().includes(q);
          const matchRemarks = entry.remarks?.toLowerCase().includes(q);
          return matchOfficer || matchLabel || matchAction || matchOld || matchNew || matchReason || matchRemarks;
        }

        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        return sortDescending ? timeB - timeA : timeA - timeB;
      });
  }, [changeLogList, filterCategory, searchQuery, sortDescending]);

  // Toggle single item expanded state
  const toggleExpand = (id: string) => {
    setExpandedEntryIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Submit manual note
  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim() || !onUpdateRecord) return;

    const officerName = userRole === 'REVENUE_OFFICER' 
      ? 'SDM Alok Srivastava' 
      : 'Patwari Rajesh Kumar Sharma';

    const newEntry: ChangeLogEntry = {
      id: `CL-NOTE-${Date.now()}`,
      timestamp: new Date().toISOString(),
      officerName,
      role: userRole,
      action: 'ADMINISTRATIVE_NOTE',
      fieldLabel: noteTitle,
      reason: noteTitle,
      remarks: noteText.trim(),
      digitalSignature: userRole === 'REVENUE_OFFICER' ? 'DSC-GOI-REV-2026-X88A' : undefined,
      sourceTerminal: 'Verification Station Live Console'
    };

    const updated = appendChangeLogEntry(record, newEntry);
    onUpdateRecord(updated);

    setNoteText('');
    setNoteSuccess(true);
    setTimeout(() => {
      setNoteSuccess(false);
      setIsAddingNote(false);
    }, 1800);
  };

  // Category counts
  const counts = useMemo(() => {
    const total = changeLogList.length;
    let edits = 0;
    let sanctions = 0;
    let system = 0;
    let encumbrance = 0;

    changeLogList.forEach((e) => {
      const cat = getActionMeta(e.action).category;
      if (cat === 'EDIT') edits++;
      else if (cat === 'SANCTION') sanctions++;
      else if (cat === 'SYSTEM') system++;
      else if (cat === 'ENCUMBRANCE') encumbrance++;
    });

    return { total, edits, sanctions, system, encumbrance };
  }, [changeLogList]);

  return (
    <div id="record-changelog-timeline-root" className="space-y-4">
      {/* Component Header & Filter Toolbar */}
      <div className="bg-[#F5F3EE] p-3 sm:p-4 rounded-xl border border-[#DCD7CE] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#FAF8F5] text-[#8B4513] border border-[#DCD7CE]">
              <History className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-[#33332A] natural-serif">
                  Record ChangeLog &amp; Edit Timeline
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EBE7DF] text-[#5A5A40] border border-[#DCD7CE]">
                  {changeLogList.length} Revisions Recorded
                </span>
              </div>
              <p className="text-[11px] text-[#6B6B58]">
                Immutable tamper-evident ledger of OCR corrections, field revisions, and officer sanctions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {onUpdateRecord && userRole !== 'CITIZEN_VIEWER' && (
              <button
                id="btn-add-changelog-note"
                type="button"
                onClick={() => setIsAddingNote(!isAddingNote)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[#4A3728] border border-[#DCD7CE] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#8B4513]" />
                <span>{isAddingNote ? 'Cancel Note' : 'Add Audit Note'}</span>
              </button>
            )}

            <button
              id="btn-toggle-sort-order"
              type="button"
              onClick={() => setSortDescending(!sortDescending)}
              className="p-1.5 rounded-lg text-xs font-semibold bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[#4A3728] border border-[#DCD7CE] transition-colors flex items-center gap-1 cursor-pointer"
              title={sortDescending ? 'Showing newest first (click for oldest first)' : 'Showing oldest first (click for newest first)'}
            >
              <ArrowDownUp className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span className="text-[10px] hidden md:inline">{sortDescending ? 'Newest' : 'Oldest'}</span>
            </button>
          </div>
        </div>

        {/* Add Note Form */}
        {isAddingNote && (
          <form onSubmit={handleSubmitNote} className="bg-[#FAF8F5] p-3 rounded-lg border border-[#BCD4C0] space-y-2.5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#33332A] flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-[#8B4513]" />
                Append Officer Ground-Truthing / Audit Annotation
              </span>
              <button 
                type="button" 
                onClick={() => setIsAddingNote(false)}
                className="text-[#6B6B58] hover:text-[#33332A] p-0.5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="sm:col-span-1">
                <label className="text-[10px] font-semibold text-[#6B6B58] block mb-1">Reason / Subject</label>
                <select
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  className="w-full text-xs font-bold bg-[#F5F3EE] border border-[#DCD7CE] rounded p-1.5 text-[#33332A]"
                >
                  <option value="Physical RoR Parchment Corroborated">Physical RoR Corroborated</option>
                  <option value="Field Ground-Truthing Note">Field Ground-Truthing Note</option>
                  <option value="Sub-Registrar Lien Verification">Sub-Registrar Lien Verification</option>
                  <option value="Boundary Demarcation Confirmation">Boundary Demarcation Confirmation</option>
                  <option value="Heirship Mutation Rectification">Heirship Mutation Rectification</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-[10px] font-semibold text-[#6B6B58] block mb-1">Official Notes / Legal Ref</label>
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Enter detailed observation or Section reference..."
                  required
                  className="w-full text-xs bg-[#F5F3EE] border border-[#DCD7CE] rounded p-1.5 text-[#33332A] focus:outline-hidden focus:ring-1 focus:ring-[#8B4513]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-[#6B6B58]">
                Logged as: <strong className="text-[#33332A]">{userRole.replace(/_/g, ' ')}</strong> &bull; Digitally anchored
              </span>
              <div className="flex items-center gap-2">
                {noteSuccess && (
                  <span className="text-[10px] text-[#2A5235] font-bold flex items-center gap-1 bg-[#EAF2EB] px-2 py-0.5 rounded border border-[#BCD4C0]">
                    <Check className="w-3 h-3" /> Logged to ChangeLog
                  </span>
                )}
                <button
                  type="submit"
                  disabled={!noteText.trim()}
                  className="px-3 py-1 rounded bg-[#3D5A40] hover:bg-[#2A402D] text-white text-xs font-bold disabled:opacity-50 cursor-pointer shadow-2xs transition-colors"
                >
                  Save Entry
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Filter Pills & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2 pt-1 border-t border-[#DCD7CE]/70">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              type="button"
              onClick={() => setFilterCategory('ALL')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                filterCategory === 'ALL'
                  ? 'bg-[#5A5A40] text-[#FFF9EA] border-[#43432F] shadow-2xs'
                  : 'bg-[#FAF8F5] text-[#4A3728] border-[#DCD7CE] hover:bg-[#EBE7DF]'
              }`}
            >
              All ({counts.total})
            </button>

            <button
              type="button"
              onClick={() => setFilterCategory('EDIT')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                filterCategory === 'EDIT'
                  ? 'bg-[#1E4E8C] text-white border-[#153866] shadow-2xs'
                  : 'bg-[#FAF8F5] text-[#1E4E8C] border-[#DCD7CE] hover:bg-[#EBE7DF]'
              }`}
            >
              Field Edits ({counts.edits})
            </button>

            <button
              type="button"
              onClick={() => setFilterCategory('SANCTION')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                filterCategory === 'SANCTION'
                  ? 'bg-[#2A5235] text-white border-[#1E3B26] shadow-2xs'
                  : 'bg-[#FAF8F5] text-[#2A5235] border-[#DCD7CE] hover:bg-[#EBE7DF]'
              }`}
            >
              Sanctions ({counts.sanctions})
            </button>

            <button
              type="button"
              onClick={() => setFilterCategory('ENCUMBRANCE')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                filterCategory === 'ENCUMBRANCE'
                  ? 'bg-[#8B0000] text-white border-[#660000] shadow-2xs'
                  : 'bg-[#FAF8F5] text-[#8B0000] border-[#DCD7CE] hover:bg-[#EBE7DF]'
              }`}
            >
              Lien / Encumbrance ({counts.encumbrance})
            </button>

            <button
              type="button"
              onClick={() => setFilterCategory('SYSTEM')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                filterCategory === 'SYSTEM'
                  ? 'bg-[#4A3728] text-white border-[#33261C] shadow-2xs'
                  : 'bg-[#FAF8F5] text-[#5A5A40] border-[#DCD7CE] hover:bg-[#EBE7DF]'
              }`}
            >
              Ingestion / OCR ({counts.system})
            </button>
          </div>

          <div className="relative min-w-[180px] max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6B6B58]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search edits, values, officer..."
              className="w-full pl-8 pr-3 py-1 text-xs bg-[#FAF8F5] border border-[#DCD7CE] rounded-lg text-[#33332A] placeholder-[#6B6B58] focus:outline-hidden focus:ring-1 focus:ring-[#8B4513]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6B6B58] hover:text-[#33332A]"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:top-2 before:bottom-2 before:left-3 sm:before:left-4 before:w-0.5 before:bg-[#DCD7CE]">
        {filteredEntries.length === 0 ? (
          <div className="p-8 text-center bg-[#F5F3EE] rounded-xl border border-[#DCD7CE] text-xs text-[#6B6B58]">
            <History className="w-8 h-8 text-[#DCD7CE] mx-auto mb-2" />
            <p className="font-semibold text-[#33332A]">No modification entries matching the current filter</p>
            <p className="text-[11px] mt-1">Try selecting "All" or clearing the search query.</p>
          </div>
        ) : (
          filteredEntries.map((entry, index) => {
            const meta = getActionMeta(entry.action);
            const dateMeta = formatChangeLogDate(entry.timestamp);
            const isExpanded = expandedEntryIds[entry.id] ?? false;
            const hasDiff = entry.oldValue !== undefined || entry.newValue !== undefined;
            const isLatest = index === 0;

            return (
              <div 
                key={entry.id || `entry-${index}`} 
                className="relative group transition-all duration-200"
              >
                {/* Timeline Dot Node */}
                <div 
                  className={`absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-2xs z-10 transition-transform group-hover:scale-110 ${
                    meta.dotColor
                  }`}
                  title={`${meta.label} (${dateMeta.formatted})`}
                >
                  {meta.category === 'SANCTION' ? (
                    <Stamp className="w-3 h-3 text-white" />
                  ) : meta.category === 'EDIT' ? (
                    <Edit3 className="w-3 h-3 text-white" />
                  ) : meta.category === 'SYSTEM' ? (
                    <Cpu className="w-3 h-3 text-white" />
                  ) : meta.category === 'ENCUMBRANCE' ? (
                    <ShieldAlert className="w-3 h-3 text-white" />
                  ) : meta.category === 'MUTATION' ? (
                    <GitCommit className="w-3 h-3 text-white" />
                  ) : (
                    <Clock className="w-3 h-3 text-white" />
                  )}
                </div>

                {/* Event Card */}
                <div className={`p-4 rounded-xl border transition-all ${
                  isLatest
                    ? 'bg-[#FAF8F5] border-[#BCD4C0] shadow-xs'
                    : 'bg-[#FAF8F5] border-[#DCD7CE] hover:border-[#B8D5FA]'
                }`}>
                  {/* Top Row: Meta Badge, Action & Timestamp */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#DCD7CE]/60">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${meta.badgeClass}`}>
                        {meta.label}
                      </span>

                      {entry.fieldLabel && (
                        <span className="text-xs font-bold text-[#33332A] natural-serif">
                          {entry.fieldLabel}
                        </span>
                      )}

                      {isLatest && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#EAF2EB] text-[#2A5235] border border-[#BCD4C0]">
                          Latest Revision
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#6B6B58]">
                      <span className="font-semibold text-[#33332A]" title={dateMeta.formatted}>
                        {dateMeta.relative || dateMeta.formatted}
                      </span>
                      <span>&bull;</span>
                      <span className="font-mono text-[10px] hidden sm:inline">
                        {dateMeta.formatted}
                      </span>
                    </div>
                  </div>

                  {/* Middle Row: Officer, Authority & Terminal Details */}
                  <div className="py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#5A5A40]">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#8B4513]" />
                      <span className="font-bold text-[#33332A]">{entry.officerName}</span>
                      {entry.role && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#EBE7DF] text-[#4A3728] font-semibold">
                          {entry.role.replace(/_/g, ' ')}
                        </span>
                      )}
                    </div>

                    {entry.sourceTerminal && (
                      <div className="flex items-center gap-1 text-[10px] text-[#6B6B58] font-mono">
                        <Terminal className="w-3 h-3 text-[#5A5A40]" />
                        <span>{entry.sourceTerminal}</span>
                      </div>
                    )}
                  </div>

                  {/* Value Diff Block: Before & After */}
                  {hasDiff && (entry.oldValue || entry.newValue) && (
                    <div className="mt-2 p-2.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE] space-y-1.5">
                      <span className="text-[10px] font-bold text-[#6B6B58] uppercase tracking-wider block">
                        Observed Field Modification Diff:
                      </span>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
                        {/* Old Value */}
                        <div className="flex-1 p-2 rounded bg-[#FDF0ED] border border-[#F2C2BA] text-[#8B0000]">
                          <span className="text-[9px] uppercase font-bold text-[#8B0000]/70 block">Before</span>
                          <span className="font-mono font-bold line-through">
                            {entry.oldValue || '(Empty / Unspecified)'}
                          </span>
                        </div>

                        <div className="hidden sm:flex items-center justify-center text-[#8B4513]">
                          <ArrowRight className="w-4 h-4" />
                        </div>

                        {/* New Value */}
                        <div className="flex-1 p-2 rounded bg-[#EAF2EB] border border-[#BCD4C0] text-[#2A5235]">
                          <span className="text-[9px] uppercase font-bold text-[#2A5235]/70 block">After Edit</span>
                          <span className="font-mono font-bold">
                            {entry.newValue || '(Removed)'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Reason & Officer Justification */}
                  {entry.reason && (
                    <div className="mt-2 text-xs text-[#33332A] flex items-start gap-1.5">
                      <span className="text-[11px] font-bold text-[#5A5A40] shrink-0">Reason:</span>
                      <span className="text-[#4A3728]">{entry.reason}</span>
                    </div>
                  )}

                  {/* Detailed Remarks / Notes (Collapsible or always visible) */}
                  {entry.remarks && (
                    <div className="mt-1.5 text-[11px] text-[#6B6B58] bg-[#FAF8F5] p-2 rounded border border-[#DCD7CE]/80 italic">
                      "{entry.remarks}"
                    </div>
                  )}

                  {/* Footer: Digital Signature & Quick Action */}
                  <div className="mt-3 pt-2 border-t border-[#DCD7CE]/60 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    {entry.digitalSignature ? (
                      <div className="flex items-center gap-1.5 text-[#2A5235] bg-[#EAF2EB] px-2 py-0.5 rounded border border-[#BCD4C0]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#3D5A40]" />
                        <span className="font-mono text-[10px] font-bold">
                          Digitally Attested: {entry.digitalSignature}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-[#6B6B58] font-mono">
                        Audit Ref: {entry.id}
                      </span>
                    )}

                    {entry.fieldKey && onSelectFieldToEdit && (
                      <button
                        type="button"
                        onClick={() => onSelectFieldToEdit(entry.fieldKey!)}
                        className="text-[11px] font-bold text-[#8B4513] hover:text-[#5A2D0C] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Inspect / Re-edit Field</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
