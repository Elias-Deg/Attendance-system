export type Locale = "am" | "en";

export type I18nKey =
  | "app.title"
  | "app.subtitle"
  | "nav.dashboard"
  | "nav.soldiers"
  | "nav.proofs"
  | "nav.reports"
  | "top.roleOfficer"
  | "top.online"
  | "top.offline"
  | "dashboard.title"
  | "dashboard.subtitle"
  | "dashboard.manageSoldiers"
  | "stats.totalSoldiers"
  | "stats.presentToday"
  | "stats.absentToday"
  | "stats.desertersDerived"
  | "filters.searchLabel"
  | "filters.searchPlaceholder"
  | "filters.unitLabel"
  | "filters.unitPlaceholder"
  | "table.photo"
  | "table.name"
  | "table.soldierId"
  | "table.rank"
  | "table.unit"
  | "table.last3Days"
  | "table.status"
  | "table.absenceReason"
  | "table.action"
  | "action.present"
  | "action.absent"
  | "reason.select"
  | "reason.family"
  | "reason.health"
  | "reason.duty"
  | "reason.other"
  | "profile.title"
  | "profile.subtitle"
  | "profile.soldierId"
  | "profile.dateJoined"
  | "profile.phone"
  | "profile.today"
  | "profile.status"
  | "profile.reason"
  | "profile.recentAttendance"
  | "common.close"
  | "common.back"
  | "common.cancel"
  | "soldiers.title"
  | "soldiers.subtitle"
  | "soldiers.register"
  | "soldiers.searchPlaceholder"
  | "soldiers.unitPlaceholder"
  | "soldiers.noSoldiers"
  | "soldiers.modalTitle"
  | "soldiers.modalHelp"
  | "soldiers.save"
  | "proofs.title"
  | "proofs.subtitle"
  | "proofs.total"
  | "proofs.search"
  | "proofs.status"
  | "proofs.all"
  | "proofs.pending"
  | "proofs.verified"
  | "proofs.rejected"
  | "proofs.markPending"
  | "proofs.verify"
  | "proofs.reject"
  | "proofs.empty"
  | "reports.title"
  | "reports.subtitle"
  | "reports.daily"
  | "reports.exportCsv"
  | "reports.plan"
  | "reports.deserterList"
  | "reports.deserterCountLabel"
  | "soldierProfile.title"
  | "soldierProfile.subtitle"
  | "soldierProfile.back"
  | "soldierProfile.addProof"
  | "soldierProfile.notFound"
  | "soldierProfile.noAttendance"
  | "soldierProfile.proofs"
  | "soldierProfile.reviewQueue"
  | "soldierProfile.noProofs"
  | "soldierProfile.addProofTitle"
  | "soldierProfile.proofUrl"
  | "soldierProfile.notesOptional"
  | "soldierProfile.sparkNote"
  | "soldierProfile.saveProof"
  | "theme.label"
  | "theme.dark"
  | "theme.light";

export const translations: Record<Locale, Record<I18nKey, string>> = {
  en: {
    "app.title": "Attendance Management",
    "app.subtitle": "Military Training Camp",
    "nav.dashboard": "Dashboard",
    "nav.soldiers": "Soldiers",
    "nav.proofs": "Proof Verification",
    "nav.reports": "Reports",
    "top.roleOfficer": "Role: Officer",
    "top.online": "Online",
    "top.offline": "Offline",
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "Spreadsheet-style attendance for {date}",
    "dashboard.manageSoldiers": "Manage soldiers",
    "stats.totalSoldiers": "Total Soldiers",
    "stats.presentToday": "Present Today",
    "stats.absentToday": "Absent Today",
    "stats.desertersDerived": "Deserters (derived)",
    "filters.searchLabel": "Search (Name / ID)",
    "filters.searchPlaceholder": "e.g. MIL-000123 or John",
    "filters.unitLabel": "Unit",
    "filters.unitPlaceholder": "unit id (for now)",
    "table.photo": "Photo",
    "table.name": "Name",
    "table.soldierId": "Soldier ID",
    "table.rank": "Rank",
    "table.unit": "Unit",
    "table.last3Days": "Last 3 days",
    "table.status": "Status",
    "table.absenceReason": "Absence Reason",
    "table.action": "Action",
    "action.present": "Present",
    "action.absent": "Absent",
    "reason.select": "Select reason",
    "reason.family": "Family Issue",
    "reason.health": "Health Problem",
    "reason.duty": "Official Duty",
    "reason.other": "Other",
    "profile.title": "Soldier profile",
    "profile.subtitle": "Detailed overview for daily review",
    "profile.soldierId": "Soldier ID",
    "profile.dateJoined": "Date joined",
    "profile.phone": "Phone",
    "profile.today": "Today",
    "profile.status": "Status",
    "profile.reason": "Reason",
    "profile.recentAttendance": "Recent attendance",
    "common.close": "Close",
    "common.back": "Back",
    "common.cancel": "Cancel",
    "soldiers.title": "Soldiers",
    "soldiers.subtitle": "Register, edit, and manage soldier records.",
    "soldiers.register": "Register soldier",
    "soldiers.searchPlaceholder": "Search soldiers...",
    "soldiers.unitPlaceholder": "Alpha / Bravo ...",
    "soldiers.noSoldiers": "No soldiers found.",
    "soldiers.modalTitle": "Register soldier",
    "soldiers.modalHelp":
      "For the demo, use any public image URL. In production we would store an external link or a small thumbnail.",
    "soldiers.save": "Save soldier",
    "proofs.title": "Proof Verification",
    "proofs.subtitle": "Review absence proof links and mark them as Verified/Rejected.",
    "proofs.total": "Total proofs",
    "proofs.search": "Search",
    "proofs.status": "Status",
    "proofs.all": "All",
    "proofs.pending": "Pending",
    "proofs.verified": "Verified",
    "proofs.rejected": "Rejected",
    "proofs.markPending": "Mark pending",
    "proofs.verify": "Verify",
    "proofs.reject": "Reject",
    "proofs.empty": "No proofs found. Add one from a soldier profile.",
    "reports.title": "Reports",
    "reports.subtitle": "Export attendance data (CSV).",
    "reports.daily": "Daily attendance",
    "reports.exportCsv": "Export CSV",
    "reports.plan":
      "Production plan: add weekly/monthly range and Excel export.",
    "reports.deserterList": "Deserter list",
    "reports.deserterCountLabel": "Count",
    "soldierProfile.title": "Soldier Profile",
    "soldierProfile.subtitle": "Detailed overview for daily review",
    "soldierProfile.back": "Back",
    "soldierProfile.addProof": "Add proof link",
    "soldierProfile.notFound": "Soldier not found.",
    "soldierProfile.noAttendance": "No attendance marked yet.",
    "soldierProfile.proofs": "Proof documents",
    "soldierProfile.reviewQueue": "Review queue",
    "soldierProfile.noProofs": "No proofs uploaded yet.",
    "soldierProfile.addProofTitle": "Add absence proof (external link)",
    "soldierProfile.proofUrl": "Proof URL",
    "soldierProfile.notesOptional": "Notes (optional)",
    "soldierProfile.sparkNote":
      "Spark plan constraint: we store only an external link (no Firebase Storage).",
    "soldierProfile.saveProof": "Save proof",
    "theme.label": "Language",
    "theme.dark": "Dark",
    "theme.light": "Light",
  },
  am: {
    "app.title": "የመገኘት መቆጣጠሪያ",
    "app.subtitle": "የስልጠና ሰፈር",
    "nav.dashboard": "ዳሽቦርድ",
    "nav.soldiers": "ወታደሮች",
    "nav.proofs": "ማስረጃ ማረጋገጫ",
    "nav.reports": "ሪፖርቶች",
    "top.roleOfficer": "ሚና፡ አሰልጣኝ",
    "top.online": "በመስመር ላይ",
    "top.offline": "ከመስመር ውጭ",
    "dashboard.title": "ዳሽቦርድ",
    "dashboard.subtitle": "የሰንጠረዥ ዓይነት መገኘት ለ {date}",
    "dashboard.manageSoldiers": "ወታደሮችን አስተዳድር",
    "stats.totalSoldiers": "ጠቅላላ ወታደሮች",
    "stats.presentToday": "ዛሬ የተገኙ",
    "stats.absentToday": "ዛሬ ያልተገኙ",
    "stats.desertersDerived": "ሸሹ (ተገምቷል)",
    "filters.searchLabel": "ፈልግ (ስም / መለያ)",
    "filters.searchPlaceholder": "ለምሳሌ፡ MIL-000123 ወይም ጆን",
    "filters.unitLabel": "ክፍል",
    "filters.unitPlaceholder": "ክፍል (ለአሁን)",
    "table.photo": "ፎቶ",
    "table.name": "ስም",
    "table.soldierId": "የወታደር መለያ",
    "table.rank": "ደረጃ",
    "table.unit": "ክፍል",
    "table.last3Days": "ያለፉ 3 ቀናት",
    "table.status": "ሁኔታ",
    "table.absenceReason": "የመቅረት ምክንያት",
    "table.action": "እርምጃ",
    "action.present": "ተገኝቷል",
    "action.absent": "ቀርቷል",
    "reason.select": "ምክንያት ምረጥ",
    "reason.family": "የቤተሰብ ጉዳይ",
    "reason.health": "የጤና ችግኝ",
    "reason.duty": "ኦፊሴላዊ ስራ",
    "reason.other": "ሌላ",
    "profile.title": "የወታደር መረጃ",
    "profile.subtitle": "ለዕለታዊ ምርመራ ዝርዝር እይታ",
    "profile.soldierId": "የወታደር መለያ",
    "profile.dateJoined": "የገባበት ቀን",
    "profile.phone": "ስልክ",
    "profile.today": "ዛሬ",
    "profile.status": "ሁኔታ",
    "profile.reason": "ምክንያት",
    "profile.recentAttendance": "የቅርብ ጊዜ መገኘት",
    "common.close": "ዝጋ",
    "common.back": "ተመለስ",
    "common.cancel": "ሰርዝ",
    "soldiers.title": "ወታደሮች",
    "soldiers.subtitle": "ወታደሮችን መመዝገብ፣ ማሻሻል እና መቆጣጠር።",
    "soldiers.register": "ወታደር መመዝገብ",
    "soldiers.searchPlaceholder": "ወታደሮችን ፈልግ...",
    "soldiers.unitPlaceholder": "አልፋ / ብራቮ ...",
    "soldiers.noSoldiers": "ምንም ወታደር አልተገኘም።",
    "soldiers.modalTitle": "ወታደር መመዝገብ",
    "soldiers.modalHelp":
      "ለዚህ ሙከራ ማንኛውንም የሕዝብ የምስል አድራሻ ተጠቀም። በስራ ላይ ግን የውጭ አድራሻ ወይም ትንሽ ምስል እንከማችላለን።",
    "soldiers.save": "ወታደሩን አስቀምጥ",
    "proofs.title": "ማስረጃ ማረጋገጫ",
    "proofs.subtitle": "የመቅረት ማስረጃዎችን ይመርምሩ እና ያረጋግጡ/ውድቅ ያድርጉ።",
    "proofs.total": "ጠቅላላ ማስረጃዎች",
    "proofs.search": "ፈልግ",
    "proofs.status": "ሁኔታ",
    "proofs.all": "ሁሉም",
    "proofs.pending": "በመጠባበቅ ላይ",
    "proofs.verified": "ተረጋግጧል",
    "proofs.rejected": "ተቀባይነት አልተሰጠም",
    "proofs.markPending": "በመጠባበቅ ላይ ምልክት ሂድ",
    "proofs.verify": "አረጋግጥ",
    "proofs.reject": "አትቀበል",
    "proofs.empty": "ምንም ማስረጃ አልተገኘም። ከወታደር መገለጫ ገጽ ይጨምሩ።",
    "reports.title": "ሪፖርቶች",
    "reports.subtitle": "የመገኘት መረጃን ወደ CSV ያስወግዱ።",
    "reports.daily": "ዕለታዊ መገኘት",
    "reports.exportCsv": "CSV አስወግድ",
    "reports.plan":
      "በስራ ላይ፡ የሳምንት/ወር ክልል እና የExcel አስወግድ ማከል።",
    "reports.deserterList": "የሸሹ ዝርዝር",
    "reports.deserterCountLabel": "ብዛት",
    "soldierProfile.title": "የወታደር መረጃ",
    "soldierProfile.subtitle": "ለዕለታዊ ምርመራ ዝርዝር እይታ",
    "soldierProfile.back": "ወደ ወታደሮች ተመለስ",
    "soldierProfile.addProof": "ማስረጃ አክል",
    "soldierProfile.notFound": "ወታደር አልተገኘም።",
    "soldierProfile.noAttendance": "መገኘት ገና አልተመዘገበም።",
    "soldierProfile.proofs": "የማስረጃ ሰነዶች",
    "soldierProfile.reviewQueue": "የግምገማ ዝርዝር",
    "soldierProfile.noProofs": "ምንም ማስረጃ አልተጨመረም።",
    "soldierProfile.addProofTitle": "የመቅረት ማስረጃ አክል (የውጭ አድራሻ)",
    "soldierProfile.proofUrl": "የማስረጃ አድራሻ",
    "soldierProfile.notesOptional": "ማብራሪያ (እንደፈለጉ)",
    "soldierProfile.sparkNote":
      "የSpark ፕላን ገደብ፡ እዚህ የውጭ አድራሻ ብቻ እንከማችላለን (Firebase Storage አይጠቀምም)።",
    "soldierProfile.saveProof": "ማስረጃ አስቀምጥ",
    "theme.label": "ቋንቋ",
    "theme.dark": "ጨለማ",
    "theme.light": "ብርሃን",
  },
};

