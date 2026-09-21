import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Building2, 
  ExternalLink, 
  Search, 
  Layers, 
  CheckCircle2, 
  FileText, 
  BookOpen, 
  Filter,
  Landmark
} from 'lucide-react';
import { STATE_LAND_FORMATS, StateLandFormatInfo } from '../data/stateLandFormats';
import { ExtractedLandRecord } from '../types';

interface StateFormatsDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  records: ExtractedLandRecord[];
  onSelectStateFilter: (stateName: string) => void;
}

export const StateFormatsDirectoryModal: React.FC<StateFormatsDirectoryModalProps> = ({
  isOpen,
  onClose,
  records,
  onSelectStateFilter
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStateKey, setSelectedStateKey] = useState<string>('Maharashtra');

  if (!isOpen) return null;

  const formatsList = Object.values(STATE_LAND_FORMATS);

  const filteredFormats = formatsList.filter(f => 
    f.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.formatTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.formCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.portalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.vernacularName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeFormat = STATE_LAND_FORMATS[selectedStateKey] || filteredFormats[0] || formatsList[0];
  const stateRecordCount = records.filter(r => r.state.value.toLowerCase() === activeFormat.state.toLowerCase()).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2B2B20]/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-[#FAF8F5] border border-[#DCD7CE] rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#DCD7CE] bg-[#F5F3EE]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#33332A] natural-serif">
                    National State Land Record Formats Directory
                  </h3>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#EBE7DF] text-[#4A3728] border border-[#DCD7CE]">
                    DILRMP Indic Revenue Standards
                  </span>
                </div>
                <p className="text-xs text-[#6B6B58]">
                  Statutory form codes, official revenue portals, legal acts, and document column matrices across Indian States &amp; UTs
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#6B6B58] hover:text-[#33332A] hover:bg-[#EBE7DF] transition-colors cursor-pointer"
              title="Close Directory"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search & Subheader */}
          <div className="px-6 py-3 border-b border-[#DCD7CE] bg-[#FAF8F5] flex items-center justify-between gap-4 flex-wrap">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#6B6B58] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search state, form code, portal or document type..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] text-[#33332A] focus:bg-[#FAF8F5] focus:outline-hidden focus:ring-1 focus:ring-[#5A5A40]"
              />
            </div>
            <div className="text-xs text-[#6B6B58]">
              Covering <span className="font-bold text-[#33332A]">{formatsList.length} Indian States &amp; UT Formats</span> • Total <span className="font-bold text-[#5A5A40]">{records.length} records</span> in workspace
            </div>
          </div>

          {/* Modal Content: 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
            {/* Left Column: State List */}
            <div className="md:col-span-4 border-r border-[#DCD7CE] overflow-y-auto max-h-[60vh] divide-y divide-[#DCD7CE]/60 bg-[#F5F3EE]/50">
              {filteredFormats.map((fmt) => {
                const count = records.filter(r => r.state.value.toLowerCase() === fmt.state.toLowerCase()).length;
                const isSelected = activeFormat.state === fmt.state;

                return (
                  <div
                    key={fmt.state}
                    onClick={() => setSelectedStateKey(fmt.state)}
                    className={`p-3.5 cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-[#FFF9EA] border-l-4 border-[#8B4513]' 
                        : 'hover:bg-[#EBE7DF]/70'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-[#33332A] natural-serif flex items-center gap-1.5">
                          {fmt.state}
                          {count > 0 && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full font-semibold bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]">
                              {count} records
                            </span>
                          )}
                        </h4>
                        <p className="text-[11px] font-medium text-[#8B4513] mt-0.5">
                          {fmt.formatShort}
                        </p>
                        <p className="text-[10px] text-[#6B6B58] font-mono mt-0.5">
                          {fmt.formCode}
                        </p>
                      </div>
                      <span className="text-[10px] text-[#8B4513] font-medium">
                        {fmt.portalName.split(' ')[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Detailed Format Specimen & Legislation */}
            <div className="md:col-span-8 p-6 overflow-y-auto max-h-[60vh] space-y-4 bg-[#FAF8F5]">
              {/* Header Box */}
              <div className="p-4 rounded-xl border border-[#DCD7CE] bg-[#FFF9EA]/60 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-[#8B4513] text-[#FAF8F5]">
                      {activeFormat.state}
                    </span>
                    <span className="text-xs font-semibold text-[#4A3728]">
                      {activeFormat.formCode}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#33332A] mt-1.5 natural-serif">
                    {activeFormat.formatTitle}
                  </h3>
                  <p className="text-xs text-[#6B6B58] mt-0.5 font-medium">
                    {activeFormat.vernacularName}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <button
                    onClick={() => {
                      onSelectStateFilter(activeFormat.state);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5A5A40] hover:bg-[#43432F] text-[#FAF8F5] text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
                  >
                    <Filter className="w-3.5 h-3.5" />
                    <span>Filter Records ({stateRecordCount})</span>
                  </button>
                </div>
              </div>

              {/* Statutory Act & Portal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5]">
                  <span className="block text-[10px] font-bold text-[#6B6B58] uppercase tracking-wider mb-1">
                    Statutory Legal Authority
                  </span>
                  <p className="font-semibold text-[#33332A] natural-serif">
                    {activeFormat.statutoryAct}
                  </p>
                </div>

                <div className="p-3 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5]">
                  <span className="block text-[10px] font-bold text-[#6B6B58] uppercase tracking-wider mb-1">
                    Official Digital Registry Portal
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#33332A]">
                      {activeFormat.portalName}
                    </span>
                    <a
                      href={`https://${activeFormat.portalUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B4513] hover:underline flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span>{activeFormat.portalUrl}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="p-3.5 rounded-lg border border-[#DCD7CE] bg-[#F5F3EE] text-xs text-[#4A3728] leading-relaxed">
                <span className="font-bold text-[#33332A] block mb-1 natural-serif">Structure &amp; Legislative Purpose:</span>
                {activeFormat.description}
              </div>

              {/* Key Nomenclature Fields */}
              <div>
                <h4 className="text-xs font-bold text-[#33332A] mb-2 natural-serif flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#5A5A40]" />
                  Key Statutory Nomenclature Fields
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeFormat.keyFields.map((field) => (
                    <span
                      key={field}
                      className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#EBE7DF] text-[#33332A] border border-[#DCD7CE]"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              {/* Standard Columns Matrix */}
              <div>
                <h4 className="text-xs font-bold text-[#33332A] mb-2 natural-serif flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#5A5A40]" />
                  Standard Statutory Columns &amp; Data Sections
                </h4>
                <div className="border border-[#DCD7CE] rounded-lg overflow-hidden divide-y divide-[#DCD7CE]">
                  {activeFormat.standardColumns.map((col) => (
                    <div key={col.colNo} className="p-2.5 bg-[#FAF8F5] flex items-start gap-3 text-xs">
                      <span className="px-2 py-0.5 rounded font-mono font-bold bg-[#EBE7DF] text-[#5A5A40] text-[10px] shrink-0">
                        {col.colNo}
                      </span>
                      <div className="min-w-0">
                        <span className="font-bold text-[#33332A] block natural-serif">
                          {col.title}
                        </span>
                        <span className="text-[11px] text-[#6B6B58] block mt-0.5">
                          {col.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-[#DCD7CE] bg-[#F5F3EE] flex items-center justify-between text-xs text-[#6B6B58]">
            <span>Ministry of Rural Development &amp; Department of Land Resources (DoLR) DILRMP Framework</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-[#DCD7CE] bg-[#FAF8F5] hover:bg-[#EBE7DF] text-[#33332A] font-medium transition-colors cursor-pointer"
            >
              Close Directory
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
