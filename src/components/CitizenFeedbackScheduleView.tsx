import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  UserCheck, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Phone, 
  Mail, 
  Layers, 
  ShieldCheck, 
  Video, 
  Building2, 
  Compass, 
  FileText, 
  Download, 
  Search, 
  ArrowRight, 
  CalendarCheck, 
  RotateCcw, 
  X, 
  Info,
  Map as MapIcon,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { 
  CitizenAppointment, 
  CitizenFeedbackCategory, 
  ConsultationMode, 
  AppointmentStatus, 
  AuthUser,
  ExtractedLandRecord
} from '../types';
import { CADASTRAL_GIS_OFFICERS } from '../data/sampleAppointments';

interface CitizenFeedbackScheduleViewProps {
  appointments?: CitizenAppointment[];
  onAddAppointment: (appointment: CitizenAppointment) => void;
  onUpdateAppointment: (appointment: CitizenAppointment) => void;
  currentUser?: AuthUser | null;
  records?: ExtractedLandRecord[];
  onNavigateToMap: (khasra?: string) => void;
  initialKhasra?: string;
  initialVillage?: string;
}

export const CitizenFeedbackScheduleView: React.FC<CitizenFeedbackScheduleViewProps> = ({
  appointments = [],
  onAddAppointment,
  onUpdateAppointment,
  currentUser,
  records = [],
  onNavigateToMap,
  initialKhasra,
  initialVillage
}) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'my_appointments' | 'officers'>('schedule');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'UPCOMING' | 'RESOLVED'>('ALL');

  const safeRecords = records || [];
  const safeAppointments = appointments || [];

  // Form States
  const isCitizen = currentUser?.role === 'CITIZEN_VIEWER';
  const citizenVillage = currentUser?.assignedVillage || 'Wagholi';
  const citizenKhasra = currentUser?.assignedKhasra || '142/1';

  const [selectedVillage, setSelectedVillage] = useState<string>(
    isCitizen ? citizenVillage : (initialVillage || 'Wagholi')
  );
  const [khasraNumber, setKhasraNumber] = useState<string>(
    isCitizen ? citizenKhasra : (initialKhasra || '142/1')
  );
  const [khataNumber, setKhataNumber] = useState<string>('882');
  const [category, setCategory] = useState<CitizenFeedbackCategory>('BOUNDARY_DISCREPANCY');
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [consultationMode, setConsultationMode] = useState<ConsultationMode>('FIELD_DEMARCATION');
  const [selectedOfficerId, setSelectedOfficerId] = useState<string>('CAD-SETT-042');

  // Enforce citizen isolation when currentUser changes
  useEffect(() => {
    if (isCitizen) {
      setSelectedVillage(citizenVillage);
      if (!initialKhasra) {
        setKhasraNumber(citizenKhasra);
      }
    }
  }, [isCitizen, citizenVillage, citizenKhasra, initialKhasra]);
  
  // Suggested dates (next available working days)
  const defaultDate = '2026-09-22';
  const [preferredDate, setPreferredDate] = useState<string>(defaultDate);
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<string>('11:00 AM - 12:00 PM');
  
  // Citizen Contact
  const [citizenName, setCitizenName] = useState<string>(currentUser?.name || 'Vikramjit Singh Dhillon');
  const [citizenPhone, setCitizenPhone] = useState<string>('+91 98765 43210');
  const [citizenEmail, setCitizenEmail] = useState<string>(currentUser?.email || 'vikram.singh@gmail.com');
  const [landmarkRef, setLandmarkRef] = useState<string>('');

  // Confirmation Modal
  const [confirmedTicket, setConfirmedTicket] = useState<CitizenAppointment | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Helper to safely extract village name string from ExtractedLandRecord
  const getRecordVillage = (r: ExtractedLandRecord | any): string => {
    if (!r) return '';
    if (typeof r.village === 'string') return r.village;
    if (r.village && typeof r.village.value === 'string') return r.village.value;
    return '';
  };

  // Available unique villages from records (Strictly restricted to citizen's own village for citizens)
  const extractedVillages = isCitizen
    ? [citizenVillage]
    : Array.from(new Set(safeRecords.map(getRecordVillage).filter(Boolean)));
  const uniqueVillages = extractedVillages.length > 0 ? extractedVillages : [citizenVillage];

  // Available Khasras for chosen village
  const availableKhasras = safeRecords
    .filter(r => {
      const v = getRecordVillage(r);
      const targetVil = isCitizen ? citizenVillage : selectedVillage;
      return !targetVil || (v && v.toLowerCase() === targetVil.toLowerCase());
    })
    .map(r => ({
      khasra: r.khasraNumber?.value || '',
      khata: r.khataNumber?.value || '',
      owner: r.primaryOwnerName?.value || ''
    }));

  const categories: { id: CitizenFeedbackCategory; label: string; description: string; icon: string }[] = [
    {
      id: 'BOUNDARY_DISCREPANCY',
      label: 'Boundary Demarcation (Medhbandi)',
      description: 'Physical bund alignment dispute or request for DGPS measurement',
      icon: '📏'
    },
    {
      id: 'AREA_VARIANCE',
      label: 'Area Variance / Discrepancy',
      description: 'Area mismatch between Ground, RoR Saat-Baara, and Digitized Map',
      icon: '📐'
    },
    {
      id: 'CO_SHARER_DISPUTE',
      label: 'Co-Sharer Hissa Boundary',
      description: 'Partition and internal division line inquiry between joint owners',
      icon: '👥'
    },
    {
      id: 'DRONE_SURVEY_INQUIRY',
      label: 'SVAMITVA / Drone Orthophoto',
      description: 'Verification of high-resolution aerial imagery & parcel overlay',
      icon: '🛰️'
    },
    {
      id: 'MUTATION_INQUIRY',
      label: 'Mutation / Title Transfer Hearing',
      description: 'Pending succession or transfer entry on the cadastral sheet',
      icon: '📜'
    },
    {
      id: 'GENERAL_FEEDBACK',
      label: 'General Feedback & Suggestion',
      description: 'Public suggestions for the Cadastral GIS modern portal',
      icon: '💬'
    }
  ];

  const consultationModes: { id: ConsultationMode; label: string; description: string; icon: any }[] = [
    {
      id: 'FIELD_DEMARCATION',
      label: 'On-Site Field Demarcation',
      description: 'Cadastral GIS surveyor visits plot with Total Station / DGPS',
      icon: Compass
    },
    {
      id: 'IN_PERSON_TEHSIL',
      label: 'Tehsil GIS Lab In-Person',
      description: 'Meet Cadastral GIS Officer at District GIS Workstation Lab',
      icon: Building2
    },
    {
      id: 'VIRTUAL_MEETING',
      label: 'Virtual Video Consultation',
      description: 'Join secure video conference with GIS Officer via NIC Meet',
      icon: Video
    }
  ];

  const timeSlots = [
    '10:30 AM - 11:15 AM',
    '11:30 AM - 12:15 PM',
    '02:00 PM - 02:45 PM',
    '03:00 PM - 03:45 PM',
    '04:00 PM - 04:45 PM'
  ];

  const selectedOfficer = CADASTRAL_GIS_OFFICERS.find(o => o.id === selectedOfficerId) || CADASTRAL_GIS_OFFICERS[0];

  const handleVillageChange = (vil: string) => {
    setSelectedVillage(vil);
    const matching = safeRecords.filter(r => {
      const v = getRecordVillage(r);
      return v && v.toLowerCase() === vil.toLowerCase();
    });
    if (matching.length > 0) {
      setKhasraNumber(matching[0].khasraNumber?.value || '');
      setKhataNumber(matching[0].khataNumber?.value || '');
    }
  };

  const handleKhasraChange = (kh: string) => {
    setKhasraNumber(kh);
    const matched = safeRecords.find(r => {
      const v = getRecordVillage(r);
      return r.khasraNumber?.value === kh && (!selectedVillage || (v && v.toLowerCase() === selectedVillage.toLowerCase()));
    });
    if (matched) {
      setKhataNumber(matched.khataNumber?.value || '');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!khasraNumber.trim()) {
      setFormError('Please select or specify a valid Khasra Number.');
      return;
    }

    if (!feedbackText.trim() || feedbackText.trim().length < 15) {
      setFormError('Please provide a detailed description of your grievance or feedback (minimum 15 characters).');
      return;
    }

    if (!citizenPhone.trim()) {
      setFormError('Please provide a valid contact mobile number for SMS notifications.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newAppointment: CitizenAppointment = {
      id: `GIS-APT-2026-${randomSuffix}`,
      citizenName: citizenName.trim(),
      citizenPhone: citizenPhone.trim(),
      citizenAadhaarOrId: currentUser?.badgeNumber || 'AADHAAR-VERIFIED-771',
      citizenEmail: citizenEmail.trim(),
      village: selectedVillage,
      khasraNumber: khasraNumber.trim(),
      khataNumber: khataNumber.trim(),
      category,
      feedbackText: feedbackText.trim() + (landmarkRef.trim() ? ` [Landmark Reference: ${landmarkRef.trim()}]` : ''),
      consultationMode,
      preferredDate,
      preferredTimeSlot,
      assignedOfficerName: selectedOfficer.name,
      assignedOfficerDesignation: selectedOfficer.designation,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
      officerRemarks: `Scheduled automatically under DILRMP Citizen Fast-Track. Assigned to ${selectedOfficer.name}. Notice dispatched to Tehsil GIS registry.`,
      venueOrMeetingLink: consultationMode === 'VIRTUAL_MEETING' 
        ? `NIC Video Portal (https://meet.nic.in/dilrmp-cadastral-${randomSuffix})`
        : consultationMode === 'IN_PERSON_TEHSIL'
        ? selectedOfficer.officeLocation
        : `Plot #${khasraNumber.trim()} On-site, Village ${selectedVillage}`,
      rescheduledCount: 0
    };

    onAddAppointment(newAppointment);
    setConfirmedTicket(newAppointment);
  };

  const handleCancelAppointment = (aptId: string) => {
    const target = safeAppointments.find(a => a.id === aptId);
    if (target) {
      onUpdateAppointment({
        ...target,
        status: 'CANCELLED',
        officerRemarks: 'Cancelled by citizen request via citizen web portal.'
      });
    }
  };

  // Filtered appointments
  const filteredAppointments = safeAppointments.filter(apt => {
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'UPCOMING') return apt.status === 'SCHEDULED' || apt.status === 'CONFIRMED' || apt.status === 'SURVEY_DISPATCHED';
    if (statusFilter === 'RESOLVED') return apt.status === 'RESOLVED' || apt.status === 'CANCELLED';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* 1. Portal Banner & Citizen Authority Header */}
      <div className="bg-[#FAF8F5] rounded-2xl border border-[#DCD7CE] p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAF2EB] text-[#3D5A40] text-xs font-bold border border-[#BCD4C0] flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                Citizen Landowner Portal (नागरिक सेवा केंद्र)
              </span>
              <span className="text-xs text-[#6B6B58] font-mono">
                DILRMP Public Service Guarantee
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#33332A] natural-serif">
              Land Map Feedback &amp; Cadastral GIS Officer Consultation
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5A40] max-w-3xl">
              Citizen landowners can directly submit boundary feedback, report map discrepancies, and schedule verified hearings or on-site demarcation with the Settlement &amp; Cadastral GIS Officer.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              id="btn-switch-to-map"
              type="button"
              onClick={() => onNavigateToMap(khasraNumber)}
              className="px-3.5 py-2 rounded-xl bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] text-xs font-bold flex items-center gap-2 transition-all shadow-2xs cursor-pointer"
            >
              <MapIcon className="w-4 h-4" />
              <span>Explore Land Map (भू-नक्शा)</span>
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-[#DCD7CE]">
          <div className="bg-[#F5F3EE] p-3 rounded-xl border border-[#DCD7CE]">
            <span className="text-[11px] text-[#6B6B58] block font-medium">Total Inquiries Logged</span>
            <span className="text-lg font-bold text-[#33332A] font-mono">{appointments.length}</span>
          </div>
          <div className="bg-[#EAF2EB] p-3 rounded-xl border border-[#BCD4C0]">
            <span className="text-[11px] text-[#3D5A40] block font-medium">Confirmed Consultations</span>
            <span className="text-lg font-bold text-[#3D5A40] font-mono">
              {appointments.filter(a => a.status === 'CONFIRMED' || a.status === 'SCHEDULED').length}
            </span>
          </div>
          <div className="bg-[#FFF9EA] p-3 rounded-xl border border-[#DCD7CE]">
            <span className="text-[11px] text-[#8B4513] block font-medium">Demarcations Dispatched</span>
            <span className="text-lg font-bold text-[#8B4513] font-mono">
              {appointments.filter(a => a.consultationMode === 'FIELD_DEMARCATION').length}
            </span>
          </div>
          <div className="bg-[#F5F3EE] p-3 rounded-xl border border-[#DCD7CE]">
            <span className="text-[11px] text-[#5A5A40] block font-medium">Resolved Cases</span>
            <span className="text-lg font-bold text-[#5A5A40] font-mono">
              {appointments.filter(a => a.status === 'RESOLVED').length}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center border-b border-[#DCD7CE] gap-2">
        <button
          id="tab-feedback-schedule"
          type="button"
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'schedule'
              ? 'border-[#5A5A40] text-[#5A5A40] bg-[#FAF8F5] rounded-t-xl'
              : 'border-transparent text-[#6B6B58] hover:text-[#33332A]'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Schedule Hearing / Submit Feedback</span>
        </button>

        <button
          id="tab-feedback-my-appointments"
          type="button"
          onClick={() => setActiveTab('my_appointments')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'my_appointments'
              ? 'border-[#5A5A40] text-[#5A5A40] bg-[#FAF8F5] rounded-t-xl'
              : 'border-transparent text-[#6B6B58] hover:text-[#33332A]'
          }`}
        >
          <CalendarCheck className="w-4 h-4" />
          <span>My Inquiries &amp; Appointments ({appointments.length})</span>
        </button>

        <button
          id="tab-feedback-officers"
          type="button"
          onClick={() => setActiveTab('officers')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'officers'
              ? 'border-[#5A5A40] text-[#5A5A40] bg-[#FAF8F5] rounded-t-xl'
              : 'border-transparent text-[#6B6B58] hover:text-[#33332A]'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Cadastral GIS Officers &amp; SLA</span>
        </button>
      </div>

      {/* 3. TAB CONTENT */}
      <AnimatePresence mode="wait">
        {/* TAB 1: SCHEDULE CONSULTATION & SUBMIT FEEDBACK */}
        {activeTab === 'schedule' && (
          <motion.div
            key="tab-schedule"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <form onSubmit={handleSubmit} className="bg-[#FAF8F5] rounded-2xl border border-[#DCD7CE] p-6 shadow-2xs space-y-6">
              {/* Form Error Banner */}
              {formError && (
                <div className="p-3.5 rounded-xl bg-[#FDF0ED] border border-[#F2C2BA] text-xs text-[#8B0000] flex items-center gap-2.5 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#8B0000]" />
                  <span className="font-semibold">{formError}</span>
                </div>
              )}

              {/* Step 1: Land Parcel Context */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#5A5A40] uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-[#5A5A40] text-[#FFF9EA] flex items-center justify-center text-[10px]">1</span>
                  <span>Select Target Land Parcel (भू-खंड संदर्भ)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Village */}
                  <div>
                    <label htmlFor="select-village" className="block text-xs font-bold text-[#33332A] mb-1">
                      Village / Revenue Halka (गाव / मौजा)
                    </label>
                    {isCitizen ? (
                      <div className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F5] border border-[#DCD7CE] text-[#33332A] font-bold flex items-center justify-between">
                        <span>{citizenVillage} (Haveli, Pune)</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">Your Village</span>
                      </div>
                    ) : (
                      <select
                        id="select-village"
                        value={selectedVillage}
                        onChange={(e) => handleVillageChange(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-[#F5F3EE] border border-[#DCD7CE] text-[#33332A] font-medium focus:ring-1 focus:ring-[#5A5A40] outline-hidden cursor-pointer"
                      >
                        {uniqueVillages.map(v => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Khasra / Survey Number */}
                  <div>
                    <label htmlFor="select-khasra" className="block text-xs font-bold text-[#33332A] mb-1">
                      Khasra / Gat Number (खसरा / गट क्र.)
                    </label>
                    <select
                      id="select-khasra"
                      value={khasraNumber}
                      onChange={(e) => handleKhasraChange(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#F5F3EE] border border-[#DCD7CE] text-[#33332A] font-bold focus:ring-1 focus:ring-[#5A5A40] outline-hidden cursor-pointer"
                    >
                      {availableKhasras.map((k, idx) => (
                        <option key={`${k.khasra}-${idx}`} value={k.khasra}>
                          Khasra #{k.khasra} &bull; Khata #{k.khata} ({k.owner})
                        </option>
                      ))}
                      <option value="CUSTOM">-- Other / Specify Manually --</option>
                    </select>
                  </div>

                  {/* Khata Number */}
                  <div>
                    <label htmlFor="input-khata" className="block text-xs font-bold text-[#33332A] mb-1">
                      Khata Number (खाता क्र.)
                    </label>
                    <input
                      id="input-khata"
                      type="text"
                      value={khataNumber}
                      onChange={(e) => setKhataNumber(e.target.value)}
                      placeholder="e.g. 882"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#F5F3EE] border border-[#DCD7CE] text-[#33332A] font-medium focus:ring-1 focus:ring-[#5A5A40] outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Feedback & Inquiry Category */}
              <div className="space-y-3 pt-4 border-t border-[#DCD7CE]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#5A5A40] uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-[#5A5A40] text-[#FFF9EA] flex items-center justify-center text-[10px]">2</span>
                  <span>Inquiry / Grievance Category (विषय / प्रवर्ग)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      id={`category-card-${cat.id}`}
                      onClick={() => setCategory(cat.id)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        category === cat.id
                          ? 'bg-[#EBE7DF] border-[#5A5A40] shadow-xs ring-1 ring-[#5A5A40]'
                          : 'bg-[#F5F3EE] border-[#DCD7CE] hover:bg-[#EBE7DF]/60'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-xs font-bold text-[#33332A] leading-snug">{cat.label}</span>
                      </div>
                      <p className="text-[11px] text-[#6B6B58] mt-1 line-clamp-2">
                        {cat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Detailed Feedback & Landmark */}
              <div className="space-y-3 pt-4 border-t border-[#DCD7CE]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#5A5A40] uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-[#5A5A40] text-[#FFF9EA] flex items-center justify-center text-[10px]">3</span>
                  <span>Feedback Description &amp; Ground Details (तपशील व संदर्भ)</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label htmlFor="textarea-feedback" className="block text-xs font-bold text-[#33332A] mb-1">
                      Detailed Observation / Inquiry Note <span className="text-[#8B0000]">*</span>
                    </label>
                    <textarea
                      id="textarea-feedback"
                      rows={4}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Describe the physical boundary discrepancy, ridge displacement, area variation, or question about your land map parcel..."
                      className="w-full p-3 text-xs rounded-xl bg-[#F5F3EE] border border-[#DCD7CE] text-[#33332A] focus:ring-1 focus:ring-[#5A5A40] outline-hidden resize-none font-sans"
                    />
                    <div className="flex justify-between text-[10px] text-[#6B6B58] mt-1">
                      <span>Minimum 15 characters. Be as specific as possible.</span>
                      <span>{feedbackText.length} characters</span>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="input-landmark" className="block text-xs font-bold text-[#33332A] mb-1">
                      Prominent Physical Landmark / Boundary Point (Optional)
                    </label>
                    <input
                      id="input-landmark"
                      type="text"
                      value={landmarkRef}
                      onChange={(e) => setLandmarkRef(e.target.value)}
                      placeholder="e.g. Near Northern irrigation canal culvert, adjacent to Old Banyan Tree bund marker"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#F5F3EE] border border-[#DCD7CE] text-[#33332A] focus:ring-1 focus:ring-[#5A5A40] outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Step 4: Consultation Mode & Scheduling */}
              <div className="space-y-3 pt-4 border-t border-[#DCD7CE]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#5A5A40] uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-[#5A5A40] text-[#FFF9EA] flex items-center justify-center text-[10px]">4</span>
                  <span>Schedule Hearing with Cadastral GIS Officer (अधिकारी परामर्श समय)</span>
                </div>

                {/* Consultation Mode Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {consultationModes.map((m) => {
                    const Icon = m.icon;
                    return (
                      <div
                        key={m.id}
                        id={`mode-card-${m.id}`}
                        onClick={() => setConsultationMode(m.id)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                          consultationMode === m.id
                            ? 'bg-[#EBE7DF] border-[#5A5A40] shadow-xs ring-1 ring-[#5A5A40]'
                            : 'bg-[#F5F3EE] border-[#DCD7CE] hover:bg-[#EBE7DF]/60'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-[#5A5A40]" />
                          <span className="text-xs font-bold text-[#33332A]">{m.label}</span>
                        </div>
                        <p className="text-[11px] text-[#6B6B58] mt-1">{m.description}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label htmlFor="input-hearing-date" className="block text-xs font-bold text-[#33332A] mb-1">
                      Preferred Date (कार्यकारी दिवस)
                    </label>
                    <input
                      id="input-hearing-date"
                      type="date"
                      value={preferredDate}
                      min="2026-09-17"
                      max="2026-10-31"
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#F5F3EE] border border-[#DCD7CE] text-[#33332A] font-semibold focus:ring-1 focus:ring-[#5A5A40] outline-hidden cursor-pointer"
                    />
                    <span className="text-[10px] text-[#6B6B58] mt-1 block">
                      Cadastral hearings scheduled on official working days (10 AM - 5 PM).
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#33332A] mb-1">
                      Available Time Slot (वेळ स्लॉट)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {timeSlots.map(slot => (
                        <button
                          key={slot}
                          id={`slot-btn-${slot.replace(/\s+/g, '-')}`}
                          type="button"
                          onClick={() => setPreferredTimeSlot(slot)}
                          className={`px-2 py-1.5 text-[11px] font-bold rounded-lg border text-center transition-all cursor-pointer ${
                            preferredTimeSlot === slot
                              ? 'bg-[#5A5A40] text-[#FFF9EA] border-[#5A5A40]'
                              : 'bg-[#F5F3EE] text-[#33332A] border-[#DCD7CE] hover:bg-[#EBE7DF]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Assigned Cadastral GIS Officer Dossier */}
                <div className="p-3.5 rounded-xl bg-[#F5F3EE] border border-[#DCD7CE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#5A5A40] text-[#FFF9EA] font-bold flex items-center justify-center text-sm">
                      PN
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#33332A]">{selectedOfficer.name}</span>
                        <span className="px-1.5 py-0.2 rounded bg-[#EAF2EB] text-[#3D5A40] font-bold text-[10px] border border-[#BCD4C0]">
                          Cadastral GIS Officer
                        </span>
                      </div>
                      <span className="text-[11px] text-[#6B6B58] block">{selectedOfficer.department}</span>
                      <span className="text-[10px] text-[#5A5A40] font-mono">{selectedOfficer.email} &bull; {selectedOfficer.hearingDays}</span>
                    </div>
                  </div>

                  <div className="text-right sm:border-l sm:border-[#DCD7CE] sm:pl-4 text-[11px]">
                    <span className="text-[#6B6B58] block text-[10px]">Consultation Venue / Link</span>
                    <span className="font-bold text-[#33332A]">
                      {consultationMode === 'FIELD_DEMARCATION' 
                        ? 'On-Plot DGPS Demarcation' 
                        : consultationMode === 'IN_PERSON_TEHSIL' 
                        ? 'Tehsil GIS Lab Room 104' 
                        : 'Secure NIC Video Conference'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Step 5: Citizen Contact & Verification */}
              <div className="space-y-3 pt-4 border-t border-[#DCD7CE]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#5A5A40] uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-[#5A5A40] text-[#FFF9EA] flex items-center justify-center text-[10px]">5</span>
                  <span>Citizen Contact Details (नागरिक संपर्क माहिती)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="input-citizen-name" className="block text-xs font-bold text-[#33332A] mb-1">
                      Applicant Full Name
                    </label>
                    <input
                      id="input-citizen-name"
                      type="text"
                      value={citizenName}
                      onChange={(e) => setCitizenName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#F5F3EE] border border-[#DCD7CE] text-[#33332A] font-semibold focus:ring-1 focus:ring-[#5A5A40] outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="input-citizen-phone" className="block text-xs font-bold text-[#33332A] mb-1">
                      Mobile Number (for SMS confirmation)
                    </label>
                    <input
                      id="input-citizen-phone"
                      type="tel"
                      value={citizenPhone}
                      onChange={(e) => setCitizenPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#F5F3EE] border border-[#DCD7CE] text-[#33332A] font-semibold focus:ring-1 focus:ring-[#5A5A40] outline-hidden"
                    />
                  </div>

                  <div>
                    <label htmlFor="input-citizen-email" className="block text-xs font-bold text-[#33332A] mb-1">
                      Email Address
                    </label>
                    <input
                      id="input-citizen-email"
                      type="email"
                      value={citizenEmail}
                      onChange={(e) => setCitizenEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-[#F5F3EE] border border-[#DCD7CE] text-[#33332A] font-semibold focus:ring-1 focus:ring-[#5A5A40] outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#DCD7CE] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#6B6B58]">
                  <ShieldCheck className="w-4 h-4 text-[#3D5A40]" />
                  <span>Authenticated under National Land Records Modernization Programme (DILRMP).</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="btn-reset-feedback-form"
                    type="button"
                    onClick={() => {
                      setFeedbackText('');
                      setLandmarkRef('');
                      setFormError(null);
                    }}
                    className="px-4 py-2 rounded-xl border border-[#DCD7CE] bg-[#F5F3EE] hover:bg-[#EBE7DF] text-xs font-semibold text-[#5A5A40] transition-colors cursor-pointer"
                  >
                    Reset Form
                  </button>

                  <button
                    id="btn-submit-feedback-schedule"
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit &amp; Schedule Hearing</span>
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* TAB 2: MY INQUIRIES & SCHEDULED APPOINTMENTS */}
        {activeTab === 'my_appointments' && (
          <motion.div
            key="tab-my-appointments"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Filter Chips */}
            <div className="flex items-center justify-between gap-2 pb-2">
              <div className="flex items-center gap-1.5">
                <button
                  id="filter-appointments-all"
                  type="button"
                  onClick={() => setStatusFilter('ALL')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === 'ALL'
                      ? 'bg-[#5A5A40] text-[#FFF9EA]'
                      : 'bg-[#F5F3EE] text-[#5A5A40] border border-[#DCD7CE] hover:bg-[#EBE7DF]'
                  }`}
                >
                  All Inquiries ({safeAppointments.length})
                </button>
                <button
                  id="filter-appointments-upcoming"
                  type="button"
                  onClick={() => setStatusFilter('UPCOMING')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === 'UPCOMING'
                      ? 'bg-[#5A5A40] text-[#FFF9EA]'
                      : 'bg-[#F5F3EE] text-[#5A5A40] border border-[#DCD7CE] hover:bg-[#EBE7DF]'
                  }`}
                >
                  Upcoming / Active ({safeAppointments.filter(a => a.status === 'SCHEDULED' || a.status === 'CONFIRMED' || a.status === 'SURVEY_DISPATCHED').length})
                </button>
                <button
                  id="filter-appointments-resolved"
                  type="button"
                  onClick={() => setStatusFilter('RESOLVED')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    statusFilter === 'RESOLVED'
                      ? 'bg-[#5A5A40] text-[#FFF9EA]'
                      : 'bg-[#F5F3EE] text-[#5A5A40] border border-[#DCD7CE] hover:bg-[#EBE7DF]'
                  }`}
                >
                  Resolved / History ({safeAppointments.filter(a => a.status === 'RESOLVED' || a.status === 'CANCELLED').length})
                </button>
              </div>

              <button
                id="btn-book-another-consultation"
                type="button"
                onClick={() => setActiveTab('schedule')}
                className="px-3 py-1.5 rounded-lg bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book New Consultation</span>
              </button>
            </div>

            {/* Appointment Cards */}
            {filteredAppointments.length === 0 ? (
              <div className="bg-[#FAF8F5] rounded-2xl border border-[#DCD7CE] p-8 text-center space-y-2">
                <Calendar className="w-8 h-8 text-[#A3A390] mx-auto" />
                <h4 className="font-bold text-[#33332A] text-sm">No Appointments Found</h4>
                <p className="text-xs text-[#6B6B58]">There are no consultation inquiries under the selected filter.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((apt) => {
                  const isUpcoming = apt.status === 'CONFIRMED' || apt.status === 'SCHEDULED' || apt.status === 'SURVEY_DISPATCHED';
                  return (
                    <div
                      key={apt.id}
                      id={`appointment-card-${apt.id}`}
                      className="bg-[#FAF8F5] rounded-2xl border border-[#DCD7CE] p-5 shadow-2xs space-y-4 hover:border-[#5A5A40] transition-colors"
                    >
                      {/* Card Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 pb-3 border-b border-[#DCD7CE]">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#5A5A40]">{apt.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              apt.status === 'CONFIRMED'
                                ? 'bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0]'
                                : apt.status === 'SCHEDULED'
                                ? 'bg-[#FFF9EA] text-[#8B4513] border border-[#DCD7CE]'
                                : apt.status === 'RESOLVED'
                                ? 'bg-[#F5F3EE] text-[#5A5A40] border border-[#DCD7CE]'
                                : 'bg-[#FDF0ED] text-[#8B0000] border border-[#F2C2BA]'
                            }`}>
                              {apt.status === 'CONFIRMED' ? 'Confirmed Appointment' :
                               apt.status === 'SCHEDULED' ? 'Scheduled / Under Review' :
                               apt.status === 'RESOLVED' ? 'Hearing Resolved' : apt.status}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-[#33332A] natural-serif mt-0.5">
                            Khasra #{apt.khasraNumber} &bull; Village {apt.village} (Khata #{apt.khataNumber || 'N/A'})
                          </h4>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] text-[#6B6B58] block">Hearing Date &amp; Time</span>
                          <span className="font-bold text-xs text-[#33332A]">
                            {apt.preferredDate} &bull; {apt.preferredTimeSlot}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-2">
                          <div>
                            <span className="text-[10px] text-[#6B6B58] uppercase block font-semibold">Grievance / Feedback Category</span>
                            <span className="font-bold text-[#33332A]">
                              {categories.find(c => c.id === apt.category)?.label || apt.category}
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] text-[#6B6B58] uppercase block font-semibold">Citizen Observation Notes</span>
                            <p className="text-[#33332A] bg-[#F5F3EE] p-2.5 rounded-xl border border-[#DCD7CE] text-[11px] leading-relaxed">
                              "{apt.feedbackText}"
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <span className="text-[10px] text-[#6B6B58] uppercase block font-semibold">Assigned Cadastral Officer</span>
                            <span className="font-bold text-[#5A5A40]">
                              {apt.assignedOfficerName} ({apt.assignedOfficerDesignation})
                            </span>
                          </div>

                          <div>
                            <span className="text-[10px] text-[#6B6B58] uppercase block font-semibold">Consultation Venue / Link</span>
                            <div className="flex items-center gap-1.5 text-[#33332A] font-medium text-[11px]">
                              {apt.consultationMode === 'VIRTUAL_MEETING' ? (
                                <>
                                  <Video className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                                  <span className="truncate">{apt.venueOrMeetingLink}</span>
                                </>
                              ) : (
                                <>
                                  <MapPin className="w-3.5 h-3.5 text-[#8B4513] shrink-0" />
                                  <span>{apt.venueOrMeetingLink}</span>
                                </>
                              )}
                            </div>
                          </div>

                          {apt.officerRemarks && (
                            <div>
                              <span className="text-[10px] text-[#3D5A40] uppercase block font-bold">Officer Action Notes</span>
                              <div className="text-[11px] text-[#3D5A40] bg-[#EAF2EB] p-2 rounded-lg border border-[#BCD4C0]">
                                {apt.officerRemarks}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Actions Footer */}
                      <div className="pt-3 border-t border-[#DCD7CE] flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-[11px] text-[#6B6B58]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Logged: {new Date(apt.createdAt).toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            id={`btn-view-map-${apt.id}`}
                            type="button"
                            onClick={() => onNavigateToMap(apt.khasraNumber)}
                            className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#EBE7DF] border border-[#DCD7CE] text-[#5A5A40] font-bold text-xs flex items-center gap-1 cursor-pointer"
                          >
                            <MapIcon className="w-3.5 h-3.5" />
                            <span>View Plot on Map</span>
                          </button>

                          {isUpcoming && (
                            <button
                              id={`btn-cancel-apt-${apt.id}`}
                              type="button"
                              onClick={() => handleCancelAppointment(apt.id)}
                              className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#FDF0ED] border border-[#DCD7CE] hover:border-[#F2C2BA] text-[#8B0000] font-semibold text-xs cursor-pointer transition-colors"
                            >
                              Cancel Hearing
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 3: CADASTRAL GIS OFFICERS DIRECTORY & SLA */}
        {activeTab === 'officers' && (
          <motion.div
            key="tab-officers"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CADASTRAL_GIS_OFFICERS.map((officer) => (
                <div
                  key={officer.id}
                  id={`officer-profile-${officer.id}`}
                  className="bg-[#FAF8F5] rounded-2xl border border-[#DCD7CE] p-6 shadow-2xs space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#5A5A40] text-[#FFF9EA] font-bold text-base flex items-center justify-center shrink-0 shadow-xs">
                      {officer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[#33332A] natural-serif">{officer.name}</h3>
                        <span className="px-2 py-0.5 rounded-full bg-[#EAF2EB] text-[#3D5A40] text-[10px] font-bold border border-[#BCD4C0]">
                          Verified Officer
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-[#5A5A40]">{officer.designation}</p>
                      <p className="text-[11px] text-[#6B6B58]">{officer.department}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs border-t border-[#DCD7CE] pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B6B58]">Jurisdiction:</span>
                      <span className="font-semibold text-[#33332A] text-right">{officer.jurisdiction}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B6B58]">Office Location:</span>
                      <span className="font-semibold text-[#33332A] text-right">{officer.officeLocation}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B6B58]">Public Hearing Days:</span>
                      <span className="font-bold text-[#8B4513] text-right">{officer.hearingDays}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6B6B58]">Citizen Feedback Rating:</span>
                      <span className="font-bold text-[#3D5A40] text-right">{officer.rating}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      id={`btn-schedule-with-${officer.id}`}
                      type="button"
                      onClick={() => {
                        setSelectedOfficerId(officer.id);
                        setActiveTab('schedule');
                      }}
                      className="w-full py-2 rounded-xl bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Hearing with {officer.name.split(' ')[0]}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* DILRMP Citizen Charter Box */}
            <div className="bg-[#F5F3EE] rounded-2xl border border-[#DCD7CE] p-6 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#5A5A40]" />
                <h4 className="font-bold text-sm text-[#33332A] natural-serif">
                  DILRMP Public Service Guarantee &amp; Demarcation Timeline
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#DCD7CE]">
                  <span className="font-bold text-[#5A5A40] block">Boundary Feedback Acknowledgment</span>
                  <span className="text-[11px] text-[#6B6B58]">Within 24 hours via SMS &amp; Digital Portal</span>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#DCD7CE]">
                  <span className="font-bold text-[#5A5A40] block">On-Site DGPS Demarcation</span>
                  <span className="text-[11px] text-[#6B6B58]">Completed within 7 working days from hearing</span>
                </div>
                <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#DCD7CE]">
                  <span className="font-bold text-[#5A5A40] block">Cadastral Map Correction (*Shudhikaran*)</span>
                  <span className="text-[11px] text-[#6B6B58]">Sanctioned by SDM/Tehsildar within 15 days</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. CONFIRMATION TICKET MODAL */}
      <AnimatePresence>
        {confirmedTicket && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#33332A]/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-[#FAF8F5] rounded-2xl border border-[#DCD7CE] max-w-lg w-full shadow-2xl p-6 space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF2EB] text-[#3D5A40] border border-[#BCD4C0] flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#33332A] natural-serif">
                      Consultation Booked Successfully!
                    </h3>
                    <span className="font-mono text-xs text-[#5A5A40] font-bold">
                      Tracking ID: {confirmedTicket.id}
                    </span>
                  </div>
                </div>

                <button
                  id="btn-close-ticket-modal"
                  type="button"
                  onClick={() => setConfirmedTicket(null)}
                  className="p-1.5 rounded-lg text-[#6B6B58] hover:bg-[#EBE7DF] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Receipt Body */}
              <div className="bg-[#F5F3EE] rounded-xl border border-[#DCD7CE] p-4 text-xs space-y-2">
                <div className="flex justify-between border-b border-[#DCD7CE] pb-2">
                  <span className="text-[#6B6B58]">Land Parcel:</span>
                  <span className="font-bold text-[#33332A]">
                    Khasra #{confirmedTicket.khasraNumber} &bull; Village {confirmedTicket.village}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#DCD7CE] pb-2">
                  <span className="text-[#6B6B58]">Cadastral GIS Officer:</span>
                  <span className="font-bold text-[#5A5A40]">{confirmedTicket.assignedOfficerName}</span>
                </div>
                <div className="flex justify-between border-b border-[#DCD7CE] pb-2">
                  <span className="text-[#6B6B58]">Hearing Date &amp; Time:</span>
                  <span className="font-bold text-[#33332A]">
                    {confirmedTicket.preferredDate} &bull; {confirmedTicket.preferredTimeSlot}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#DCD7CE] pb-2">
                  <span className="text-[#6B6B58]">Consultation Mode:</span>
                  <span className="font-bold text-[#33332A]">
                    {consultationModes.find(m => m.id === confirmedTicket.consultationMode)?.label}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#6B6B58]">Location / Link:</span>
                  <span className="font-mono text-[11px] text-[#33332A] text-right truncate max-w-[200px]">
                    {confirmedTicket.venueOrMeetingLink}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#FFF9EA] border border-[#DCD7CE] rounded-xl text-[11px] text-[#8B4513]">
                An SMS confirmation with the DILRMP hearing token has been dispatched to <strong>{confirmedTicket.citizenPhone}</strong>.
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  id="btn-view-ticket-in-list"
                  type="button"
                  onClick={() => {
                    setConfirmedTicket(null);
                    setActiveTab('my_appointments');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#F5F3EE] hover:bg-[#EBE7DF] border border-[#DCD7CE] text-xs font-bold text-[#33332A] cursor-pointer"
                >
                  View My Appointments
                </button>

                <button
                  id="btn-dismiss-ticket"
                  type="button"
                  onClick={() => setConfirmedTicket(null)}
                  className="px-5 py-2 rounded-xl bg-[#5A5A40] hover:bg-[#43432F] text-[#FFF9EA] text-xs font-bold cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
