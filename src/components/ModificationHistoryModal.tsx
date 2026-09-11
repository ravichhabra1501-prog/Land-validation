import React, { useState, useEffect, useMemo } from 'react';
import { 
  History, 
  X, 
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
  Download, 
  PlusCircle, 
  Terminal, 
  Check, 
  Calendar,
  Layers,
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';
import { ExtractedLandRecord, RecordModificationEntry, ModificationChangeType, UserRole } from '../types';
import { 
  getRecordModificationHistory, 
  formatAuditTimestamp, 
  getChangeTypeMeta, 
  formatUserRole 
} from '../utils/modificationHistoryUtils';

interface ModificationHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: ExtractedLandRecord;
  userRole: UserRole;
  onAddModification?: (entry: RecordModificationEntry) => void;
}

export const ModificationHistoryModal: React.FC<ModificationHistoryModalProps> = ({
  isOpen,
  onClose,
  record,
  userRole,
  onAddModification
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('ALL');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  
  // Quick manual audit note state
  const [showAddNoteForm, setShowAddNoteForm] = useState<boolean>(false);
  const [noteText, setNoteText] = useState<string>('');
  const [noteCategory, setNoteCategory] = useState<string>('Physical Deed Corroboration');
  const [noteSuccess, setNoteSuccess] = useState<boolean>(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Retrieve complete history (synthesized or existing)
  const allHistory = useMemo(() => {
    return getRecordModificationHistory(record);
  }, [record]);

  // Filter and sort entries
  const filteredEntries = useMemo(() => {
    return allHistory
      .filter((entry) => {
        // Type filter
        if (selectedTypeFilter !== 'ALL' && entry.changeType !== selectedTypeFilter) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchField = entry.fieldLabel?.toLowerCase().includes(q) || entry.fieldKey?.toLowerCase().includes(q);
          const matchUser = entry.userName.toLowerCase().includes(q);
          const matchNotes = entry.notes?.toLowerCase().includes(q);
          const matchReason = entry.reason?.toLowerCase().includes(q);
          const matchPrev = entry.previousValue?.toLowerCase().includes(q);
          const matchNew = entry.newValue?.toLowerCase().includes(q);
          return matchField || matchUser || matchNotes || matchReason || matchPrev || matchNew;
        }
        return true;
      })
      .sort((a, b) => {
        const timeA = new Date(a.timestamp).getTime();
        const timeB = new Date(b.timestamp).getTime();
        return sortOrder === 'desc' ? timeB - timeA : timeA - timeB;
      });
  }, [allHistory, selectedTypeFilter, searchQuery, sortOrder]);

  // Metrics summary
  const totalModifications = allHistory.length;
  const fieldCorrectionsCount = allHistory.filter(e => e.changeType === 'FIELD_CORRECTION').length;
  const sanctionEventsCount = allHistory.filter(e => e.changeType === 'SANCTION_APPROVAL').length;
  const uniqueUsersCount = new Set(allHistory.map(e => e.userName)).size;
  const latestModification = allHistory[0];

  // Handle adding an administrative audit note
  const handleAppendAuditNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    const isRevenueOfficer = userRole === 'REVENUE_OFFICER' || userRole === 'SETTLEMENT_OFFICER';
    const newEntry: RecordModificationEntry = {
      id: `MOD-NOTE-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId: isRevenueOfficer ? 'OFF-REV-094' : 'SPEC-PAT-108',
      userName: isRevenueOfficer ? 'Revenue Officer (SDM/Tehsildar)' : 'Verification Specialist (Patwari)',
      userRole: userRole,
      changeType: 'ADMINISTRATIVE_NOTE',
      fieldLabel: 'Administrative Audit Verification Note',
      reason: noteCategory,
      notes: noteText.trim(),
      sourceTerminal: 'Revenue Workstation Terminal #02'
    };

    if (onAddModification) {
      onAddModification(newEntry);
    }
    setNoteText('');
    setShowAddNoteForm(false);
    setNoteSuccess(true);
    setTimeout(() => setNoteSuccess(false), 3000);
  };

  // Export Audit Trail
  const handleExportAuditLog = () => {
    const auditData = {
      exportMetadata: {
        system: 'DILRMP Indic Land Records Modernization System',
        standard: 'ISO 19152 LADM / DILRMP National Land Records Modernization Program',
        exportedAt: new Date().toISOString(),
        exportedByRole: userRole,
        totalModifications: allHistory.length
      },
      recordSummary: {
        id: record.id,
        documentNumber: record.documentNumber,
        documentType: record.documentType,
        village: record.village.value,
        tehsil: record.tehsil.value,
        district: record.district.value,
        state: record.state.value,
        khasraNumber: record.khasraNumber.value,
        khataNumber: record.khataNumber.value,
        status: record.status,
        overallConfidence: record.overallConfidence
      },
      modificationTrail: allHistory
    };

    const blob = new Blob([JSON.stringify(auditData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${record.documentNumber}_Modification_History_Audit_Trail.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAF8F5] rounded-2xl border border-[#DCD7CE] shadow-2xl flex flex-col overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-[#DCD7CE] bg-[#F5F3EE] flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE] shadow-2xs shrink-0 mt-0.5">
              <History className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-[#33332A] natural-serif">
                  Record Modification History &amp; Audit Trail
                </h3>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]">
                  {allHistory.length} Logged Events
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  record.status === 'VERIFIED_AND_SANCTIONED'
                    ? 'bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]'
                    : 'bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]'
                }`}>
                  {record.status.replace(/_/g, ' ')}
                </span>
              </div>
              <p className="text-xs text-[#6B6B58] mt-1 font-mono">
                Deed: <strong className="text-[#33332A]">{record.documentNumber}</strong> &bull; Khasra #{record.khasraNumber.value} &bull; Village {record.village.value}, {record.district.value}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-export-audit-json"
              onClick={handleExportAuditLog}
              className="px-3 py-1.5 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] hover:bg-[#EBE7DF] text-xs font-semibold text-[#4A3728] transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Download official JSON audit log"
            >
              <Download className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span className="hidden sm:inline">Export Audit Log</span>
            </button>

            <button
              id="btn-close-history-modal"
              onClick={onClose}
              className="p-2 rounded-lg text-[#6B6B58] hover:text-[#33332A] hover:bg-[#EBE7DF] transition-colors cursor-pointer"
              title="Close Modal (Esc)"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3.5 bg-[#FAF8F5] border-b border-[#DCD7CE] text-xs">
          <div className="p-2.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE]">
            <span className="text-[10px] text-[#6B6B58] uppercase font-bold block">Total Modifications</span>
            <span className="text-base font-bold text-[#33332A] natural-serif">{totalModifications}</span>
            <span className="text-[10px] text-[#5A5A40] block mt-0.5">Chronological trail</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE]">
            <span className="text-[10px] text-[#6B6B58] uppercase font-bold block">Field Corrections</span>
            <span className="text-base font-bold text-[#1E4E8C] natural-serif">{fieldCorrectionsCount}</span>
            <span className="text-[10px] text-[#6B6B58] block mt-0.5">Manual HITL overrides</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE]">
            <span className="text-[10px] text-[#6B6B58] uppercase font-bold block">Official Sanctions</span>
            <span className="text-base font-bold text-[#2A5235] natural-serif">{sanctionEventsCount}</span>
            <span className="text-[10px] text-[#6B6B58] block mt-0.5">DSC tokens appended</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE]">
            <span className="text-[10px] text-[#6B6B58] uppercase font-bold block">Active Contributors</span>
            <span className="text-base font-bold text-[#8B4513] natural-serif">{uniqueUsersCount}</span>
            <span className="text-[10px] text-[#6B6B58] block mt-0.5">Officers &amp; System AI</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-3.5 bg-[#FAF8F5] border-b border-[#DCD7CE] flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <input
              id="input-history-search"
              type="text"
              placeholder="Search user, field, value, or note..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] text-xs text-[#33332A] placeholder:text-[#A3A390] focus:outline-hidden focus:border-[#5A5A40]"
            />
            <Search className="w-3.5 h-3.5 text-[#6B6B58] absolute left-2.5 top-2.5" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Category Filter */}
            <div className="flex items-center gap-1 bg-[#F5F3EE] p-1 rounded-lg border border-[#DCD7CE] text-[11px]">
              <Filter className="w-3 h-3 text-[#6B6B58] ml-1" />
              {[
                { id: 'ALL', label: 'All' },
                { id: 'FIELD_CORRECTION', label: 'Field Edits' },
                { id: 'SANCTION_APPROVAL', label: 'Sanctions' },
                { id: 'ADMINISTRATIVE_NOTE', label: 'Notes' },
                { id: 'INITIAL_INGESTION', label: 'Ingestion' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`btn-filter-${tab.id.toLowerCase()}`}
                  onClick={() => setSelectedTypeFilter(tab.id)}
                  className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                    selectedTypeFilter === tab.id
                      ? 'bg-[#5A5A40] text-[#FFF9EA]'
                      : 'text-[#4A3728] hover:text-[#33332A]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sort Toggle */}
            <button
              id="btn-toggle-sort-order"
              onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
              className="px-2.5 py-1.5 rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] text-xs font-semibold text-[#4A3728] flex items-center gap-1.5 transition-colors cursor-pointer"
              title={sortOrder === 'desc' ? 'Showing Newest First' : 'Showing Oldest First'}
            >
              <ArrowDownUp className="w-3.5 h-3.5 text-[#5A5A40]" />
              <span>{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
            </button>

            {/* Append Note Toggle */}
            <button
              id="btn-open-add-note"
              onClick={() => setShowAddNoteForm(!showAddNoteForm)}
              className="px-3 py-1.5 rounded-lg bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Audit Note</span>
            </button>
          </div>
        </div>

        {/* Append Audit Note Inline Form */}
        {showAddNoteForm && (
          <form onSubmit={handleAppendAuditNote} className="p-4 bg-[#FFF9EA] border-b border-[#DCD7CE] space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#8B4513] flex items-center gap-1.5 natural-serif">
                <PlusCircle className="w-4 h-4" />
                Log Official Administrative Verification Note to Permanent Trail
              </span>
              <button
                type="button"
                onClick={() => setShowAddNoteForm(false)}
                className="text-xs text-[#8B4513] hover:text-[#5A2D0C] font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="sm:col-span-1">
                <label className="text-[11px] font-bold text-[#5A5A40] block mb-1">Audit Category:</label>
                <select
                  value={noteCategory}
                  onChange={(e) => setNoteCategory(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] text-xs text-[#33332A] focus:outline-hidden"
                >
                  <option value="Physical Deed Corroboration">Physical Deed Corroboration</option>
                  <option value="Cadastral Boundary Injunction Review">Cadastral Boundary Injunction Review</option>
                  <option value="Sub-Registrar Lien Verification">Sub-Registrar Lien Verification</option>
                  <option value="Patwari Ground Inspection Note">Patwari Ground Inspection Note</option>
                  <option value="Heirship & Inheritance Quota Check">Heirship &amp; Inheritance Quota Check</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-bold text-[#5A5A40] block mb-1">Official Notes / Findings:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter observation, deed seal confirmation, or field remark..."
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] text-xs text-[#33332A] focus:outline-hidden focus:border-[#5A5A40]"
                    autoFocus
                  />
                  <button
                    type="submit"
                    disabled={!noteText.trim()}
                    className="px-4 py-1.5 rounded-lg bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] text-xs font-bold disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    Save to Audit Trail
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Success Alert */}
        {noteSuccess && (
          <div className="p-3 bg-[#EAF2EB] border-b border-[#BCD4C0] flex items-center gap-2 text-xs text-[#2A402D] animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-[#3D5A40]" />
            <span>Audit entry successfully registered and timestamped in the modification history log.</span>
          </div>
        )}

        {/* Modification Timeline Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="p-12 text-center text-[#6B6B58] space-y-2">
              <History className="w-8 h-8 text-[#A3A390] mx-auto opacity-50" />
              <h4 className="font-bold text-[#33332A]">No Matching Modification Entries</h4>
              <p className="text-xs max-w-md mx-auto">
                No history entries match your current search query or filter selection. Reset filters or clear search query to inspect the full audit trail.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedTypeFilter('ALL'); }}
                className="mt-2 px-3 py-1 text-xs font-semibold text-[#5A5A40] hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#DCD7CE]">
              {filteredEntries.map((entry, index) => {
                const { formatted, relative } = formatAuditTimestamp(entry.timestamp);
                const typeMeta = getChangeTypeMeta(entry.changeType);
                const isFieldChange = entry.changeType === 'FIELD_CORRECTION';
                const isSanction = entry.changeType === 'SANCTION_APPROVAL';

                return (
                  <div key={entry.id || index} className="relative group">
                    {/* Timeline Node Bullet */}
                    <div className={`absolute -left-6 sm:-left-8 top-3.5 w-6 sm:w-8 flex items-center justify-center`}>
                      <div className={`w-3.5 h-3.5 rounded-full border-2 border-[#FAF8F5] shadow-xs flex items-center justify-center ${
                        isSanction 
                          ? 'bg-[#3D5A40] ring-3 ring-[#BCD4C0]'
                          : isFieldChange
                          ? 'bg-[#1E4E8C] ring-3 ring-[#B8D5FA]'
                          : 'bg-[#5A5A40] ring-3 ring-[#DCD7CE]'
                      }`}>
                      </div>
                    </div>

                    {/* Main Log Card */}
                    <div className="bg-[#FAF8F5] rounded-xl border border-[#DCD7CE] hover:border-[#B5AFA6] transition-all shadow-2xs p-4 space-y-3">
                      {/* Top Card Header: User & Timestamp */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DCD7CE] pb-2.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${typeMeta.badgeClass}`}>
                            {typeMeta.label}
                          </span>
                          
                          <span className="font-bold text-sm text-[#33332A] natural-serif flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#5A5A40]" />
                            {entry.userName}
                          </span>

                          <span className="text-[11px] px-2 py-0.2 rounded-full bg-[#F5F3EE] text-[#5A5A40] border border-[#DCD7CE]">
                            {formatUserRole(entry.userRole)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-[#6B6B58] font-mono">
                          <Clock className="w-3.5 h-3.5 text-[#5A5A40]" />
                          <span>{formatted}</span>
                          {relative && (
                            <span className="px-1.5 py-0.2 rounded bg-[#EBE7DF] text-[#4A3728] text-[10px] font-bold">
                              {relative}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Nature of the Edit / Field Change Details */}
                      <div className="space-y-2 text-xs">
                        {entry.fieldLabel && (
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase font-bold text-[#5A5A40] tracking-wider natural-serif">
                              Field Modified:
                            </span>
                            <span className="font-bold text-[#33332A] text-xs">
                              {entry.fieldLabel}
                            </span>
                            {entry.fieldKey && (
                              <span className="font-mono text-[10px] text-[#6B6B58] bg-[#F5F3EE] px-1.5 py-0.2 rounded border border-[#DCD7CE]">
                                key: {entry.fieldKey}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Visual Before & After Diff Box */}
                        {(entry.previousValue !== undefined || entry.newValue !== undefined) && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2.5 rounded-lg bg-[#F5F3EE] border border-[#DCD7CE]">
                            {/* Previous Value */}
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold uppercase text-[#8B0000] flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#8B0000]"></span>
                                Previous Value:
                              </span>
                              <div className="p-2 rounded bg-[#FAF8F5] border border-[#F2C2BA] text-[#8B0000] font-mono text-xs line-through break-all">
                                {entry.previousValue || '(None / Empty)'}
                              </div>
                            </div>

                            {/* New Updated Value */}
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold uppercase text-[#2A5235] flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#3D5A40]"></span>
                                Updated Value:
                              </span>
                              <div className="p-2 rounded bg-[#FAF8F5] border border-[#BCD4C0] text-[#2A5235] font-mono font-bold text-xs flex items-center justify-between break-all">
                                <span>{entry.newValue || '(Cleared)'}</span>
                                <Check className="w-3.5 h-3.5 text-[#3D5A40] shrink-0 ml-1" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Reason and Notes */}
                        {entry.reason && (
                          <div className="flex items-start gap-2 pt-0.5">
                            <span className="text-[10px] uppercase font-bold text-[#6B6B58] shrink-0 mt-0.5">
                              Justification:
                            </span>
                            <span className="text-[#33332A] font-medium bg-[#FFF9EA] px-2 py-0.5 rounded border border-[#DCD7CE] text-[11px]">
                              {entry.reason}
                            </span>
                          </div>
                        )}

                        {entry.notes && (
                          <p className="text-[11px] text-[#6B6B58] bg-[#F5F3EE] p-2 rounded border border-[#DCD7CE] italic leading-relaxed">
                            "{entry.notes}"
                          </p>
                        )}
                      </div>

                      {/* Technical Footer Metadata (Digital Signature, Terminal Ref, ID) */}
                      <div className="pt-2 border-t border-[#DCD7CE] flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#6B6B58] font-mono">
                        <div className="flex items-center gap-3">
                          {entry.digitalSignatureRef && (
                            <span className="text-[#2A5235] font-bold flex items-center gap-1 bg-[#EAF2EB] px-1.5 py-0.5 rounded border border-[#BCD4C0]">
                              <Stamp className="w-3 h-3" />
                              DSC: {entry.digitalSignatureRef}
                            </span>
                          )}
                          {entry.sourceTerminal && (
                            <span className="flex items-center gap-1">
                              <Terminal className="w-3 h-3 text-[#5A5A40]" />
                              {entry.sourceTerminal}
                            </span>
                          )}
                        </div>

                        <span className="text-[#A3A390]">
                          Log Ref: #{entry.id}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#DCD7CE] bg-[#F5F3EE] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#5A5A40]">
            <ShieldCheck className="w-4 h-4 text-[#3D5A40]" />
            <span className="text-[11px]">
              DILRMP Section 22 / ISO 19152 LADM Compliant Immutable Audit Trail
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-close-modal-bottom"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] font-semibold text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
