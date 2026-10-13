export interface PredefinedQuestion {
  id: string;
  category: 'general' | 'academics' | 'admissions' | 'fees' | 'campus' | 'contact';
  categoryLabel: string;
  question: string;
  shortSnippet: string;
  keywords: string[];
  answer: string;
  highlights?: { label: string; value: string }[];
  bulletPoints?: string[];
  actionType?: 'calculator' | 'grade_finder' | 'tour_booking' | 'prospectus' | 'courses' | 'contact_form';
  actionButtonLabel?: string;
  followUpQuestions?: string[];
}

export interface CourseDetail {
  id: string;
  title: string;
  stage: 'Early Years' | 'Primary School' | 'Middle School' | 'Senior (IGCSE)' | 'Sixth Form (IB DP / A-Levels)';
  grades: string;
  ages: string;
  curriculum: string;
  description: string;
  keySubjects: string[];
  outcomes: string;
  specialFeatures: string[];
}

export const SCHOOL_INFO = {
  name: 'Brighton International School',
  motto: 'Sapientia, Virtus et Veritas (Wisdom, Virtue, and Truth)',
  founded: 2004,
  location: 'Brighton Hills Campus, 45 Academic Avenue, Greenfield District',
  phone: '+1 (800) 555-BRIGHTON',
  admissionsEmail: 'admissions@brighton-international.edu',
  generalEmail: 'info@brighton-international.edu',
  website: 'www.brighton-international.edu',
  officeHours: 'Monday – Friday: 08:00 – 17:00 | Saturday: 09:00 – 13:00',
  stats: {
    students: '1,450+',
    nationalities: '48',
    studentTeacherRatio: '8:1',
    ibAverageScore: '36.8 pts (World Avg: 30.2)',
    aLevelAStarRate: '84% A*-A',
    campusSize: '35 Acres Parkland',
    ivyOxbridgePlacement: '98% First-Choice University Acceptance'
  },
  accreditations: [
    'Council of International Schools (CIS)',
    'International Baccalaureate (IB) World School',
    'Cambridge Assessment International Education (CAIE)',
    'New England Association of Schools and Colleges (NEASC)'
  ]
};

export const PREDEFINED_QUESTIONS: PredefinedQuestion[] = [
  // --- GENERAL & ABOUT SCHOOL ---
  {
    id: 'about-brighton',
    category: 'general',
    categoryLabel: 'About Brighton',
    question: 'What makes Brighton International School unique?',
    shortSnippet: 'Dual British-IB curriculum, 8:1 student-to-teacher ratio, and 35-acre state-of-the-art campus.',
    keywords: ['about', 'overview', 'unique', 'why brighton', 'reputation', 'mission', 'history', 'values'],
    answer: 'Brighton International School is a premier independent international day and boarding academy serving students aged 3 to 18. We combine the rigorous standards of the British National Curriculum and Cambridge IGCSE with the holistic inquiry of the International Baccalaureate (IB) Diploma Programme.\n\nOur educational philosophy balances exceptional academic scholarship with character development, leadership, competitive athletics, and world-class performing arts.',
    highlights: [
      { label: 'Academic Rigour', value: 'Cambridge + IB World School' },
      { label: 'Mentorship', value: '8:1 Student-Teacher Ratio' },
      { label: 'Global Diversity', value: '48 Nationalities Represented' },
      { label: 'Graduation Success', value: '98% Top-Choice University Entry' }
    ],
    bulletPoints: [
      'Dual Pathway: Cambridge A-Levels and International Baccalaureate (IBDP) in Sixth Form.',
      'Dedicated University Counselling Office with 1-on-1 Ivy League & Russell Group guidance from Grade 9.',
      '35-acre parkland campus featuring an Olympic-standard aquatics centre, black-box theatre, and robotics laboratory.',
      'Well-being & Pastoral Care system rooted in the traditional British House System.'
    ],
    actionType: 'prospectus',
    actionButtonLabel: 'View Digital Prospectus',
    followUpQuestions: [
      'What curriculum does Brighton International School follow?',
      'Where is the campus located and what are the facilities?',
      'What are the university matriculation outcomes?'
    ]
  },
  {
    id: 'curriculum-overview',
    category: 'academics',
    categoryLabel: 'Curriculum & Courses',
    question: 'What curriculum does Brighton International School follow?',
    shortSnippet: 'Early Years (EYFS), Cambridge Primary & Lower Secondary, IGCSE (Grades 9-10), and IBDP / A-Levels in Sixth Form.',
    keywords: ['curriculum', 'syllabus', 'cambridge', 'ib', 'igcse', 'a-levels', 'british', 'pathway', 'framework'],
    answer: 'We offer an internationally recognized through-train pathway structured across 4 key stages:\n\n1. Early Years (Ages 3–5): Reggio-inspired Early Years Foundation Stage (EYFS).\n2. Primary School (Grades 1–5): Cambridge Primary Curriculum with inquiry-led STEM & Languages.\n3. Middle School (Grades 6–8): Cambridge Lower Secondary with specialized subject teaching.\n4. Senior School (Grades 9–10): Cambridge IGCSE examinations across 14 subject disciplines.\n5. Sixth Form (Grades 11–12): Choice of the International Baccalaureate Diploma (IBDP) or Cambridge International A-Levels.',
    highlights: [
      { label: 'Primary & Middle', value: 'Cambridge International' },
      { label: 'Upper Secondary', value: 'Cambridge IGCSE' },
      { label: 'Pre-University', value: 'IBDP & A-Levels Option' },
      { label: 'Languages', value: '5 Modern Languages Offered' }
    ],
    bulletPoints: [
      'Seamless transition between Cambridge foundation and pre-university diploma programs.',
      'Full external accreditation with transcripts recognized globally by US, UK, Canadian, European, and Asian universities.',
      'Bilingual immersion opportunities in English, Mandarin, French, Spanish, and German.',
      'Co-curricular research projects including the Extended Essay and Theory of Knowledge.'
    ],
    actionType: 'courses',
    actionButtonLabel: 'Explore All Course Stages',
    followUpQuestions: [
      'What IGCSE subjects are offered in Grades 9-10?',
      'What is the difference between IBDP and Cambridge A-Levels at Brighton?',
      'What foreign languages are taught?'
    ]
  },
  {
    id: 'courses-igcse-ib',
    category: 'academics',
    categoryLabel: 'Curriculum & Courses',
    question: 'What subjects are offered in IGCSE and Sixth Form (IBDP / A-Levels)?',
    shortSnippet: 'Over 28 subject options including Pure Sciences, Economics, Computer Science, Literature, Arts, and Psychology.',
    keywords: ['igcse', 'subjects', 'ibdp', 'a-levels', 'sixth form', 'grades 9-12', 'courses', 'electives', 'higher level'],
    answer: 'Students in Grades 9–12 benefit from an expansive course catalog taught by subject specialists holding master’s and doctoral degrees.\n\nAt IGCSE (Grades 9–10), students take core English, Mathematics, and Sciences, paired with electives in Global Perspectives, Computer Science, Art & Design, Economics, History, and Modern Languages.\n\nAt Sixth Form (Grades 11–12), students choose between:\n• IB Diploma: 6 subjects (3 Higher Level, 3 Standard Level) + Theory of Knowledge, Extended Essay, and CAS.\n• Cambridge A-Levels: 3 to 4 specialized deep-dive subjects tailored for targeted university disciplines (e.g. STEM, Medicine, Law, Finance).',
    bulletPoints: [
      'Group 1 & 2: English Language & Literature, Mandarin, French, Spanish, German.',
      'Group 3 (Humanities): Economics, Business Management, History, Geography, Psychology.',
      'Group 4 (Sciences): Physics, Chemistry, Biology, Computer Science, Environmental Systems.',
      'Group 5 (Mathematics): Analysis & Approaches (HL/SL), Applications & Interpretation.',
      'Group 6 (Arts): Visual Arts, Music, Theatre Arts, Film Studies.'
    ],
    actionType: 'courses',
    actionButtonLabel: 'View Detailed Subject Guide',
    followUpQuestions: [
      'What foreign languages can students learn?',
      'What STEM, AI, and Robotics programs are available?',
      'What is the university matriculation rate?'
    ]
  },
  {
    id: 'stem-robotics-arts',
    category: 'academics',
    categoryLabel: 'Curriculum & Courses',
    question: 'What STEM, AI, and Co-Curricular programs does Brighton offer?',
    shortSnippet: 'VEX Robotics, AI & Data Science lab, Model UN, conservatory music suites, and 40+ student clubs.',
    keywords: ['stem', 'robotics', 'ai', 'coding', 'arts', 'music', 'drama', 'activities', 'clubs', 'co-curricular'],
    answer: 'Brighton International School places experiential learning at the core of education. Our dedicated Innovation & Design Hub features rapid prototyping labs, 3D printing farms, VR simulation suites, and competitive VEX robotics arenas.\n\nOutside the classroom, students participate in over 40 weekly clubs, our annual TedX Youth conference, Model United Nations delegations in Geneva and New York, symphony orchestra, and regional athletics championships.',
    highlights: [
      { label: 'Maker Spaces', value: '3 Dedicated Fab Labs' },
      { label: 'Robotics', value: 'VEX International Champions 2025' },
      { label: 'Performing Arts', value: '450-Seat Black Box Theatre' },
      { label: 'Clubs', value: '40+ Student Societies' }
    ],
    followUpQuestions: [
      'What curriculum does Brighton International School follow?',
      'Where is the campus located and what are the facilities?',
      'What sports academies are available?'
    ]
  },
  // --- ADMISSIONS ---
  {
    id: 'admissions-process',
    category: 'admissions',
    categoryLabel: 'Admissions & Enrollment',
    question: 'What is the step-by-step admissions process for 2026-2027?',
    shortSnippet: '4-step process: Online Application, Assessment & CAT4, Family Interview, and Official Offer of Admission.',
    keywords: ['admissions', 'apply', 'enroll', 'process', 'steps', 'application', 'how to apply', 'requirements', 'intake'],
    answer: 'Admissions at Brighton International School operates on a rolling basis with primary intakes in Autumn (September) and Spring (January). The application journey consists of four clear steps:\n\nStep 1: Submit Application Form online along with past 2 academic years report cards and identification.\nStep 2: Cognitive & Skills Assessment (CAT4 test for Grades 3+, age-appropriate play observation for Early Years).\nStep 3: Student & Family Interview with the Head of Section or Admissions Director.\nStep 4: Formal Offer Letter within 5 working days of assessment review, followed by seat confirmation.',
    highlights: [
      { label: 'Step 1', value: 'Online Submission' },
      { label: 'Step 2', value: 'CAT4 / Readiness Test' },
      { label: 'Step 3', value: 'Family Interview' },
      { label: 'Step 4', value: 'Offer in 5 Days' }
    ],
    bulletPoints: [
      'Applications for Academic Year 2026-2027 are currently open across all year groups.',
      'International applicants may complete testing and interviews remotely via proctored video sessions.',
      'Application fee of $150 (one-time, non-refundable) covers all assessment and diagnostic services.'
    ],
    actionType: 'tour_booking',
    actionButtonLabel: 'Schedule Admissions Consultation',
    followUpQuestions: [
      'What documents are required for application?',
      'What are the age requirements and grade placement criteria?',
      'What are the application deadlines for next term?'
    ]
  },
  {
    id: 'age-grade-placement',
    category: 'admissions',
    categoryLabel: 'Admissions & Enrollment',
    question: 'What are the age criteria and grade placement guidelines?',
    shortSnippet: 'Age cut-off is September 1st of the entry academic year, spanning ages 3 (Nursery) to 17 (Grade 12).',
    keywords: ['age', 'grade', 'placement', 'year group', 'cut off', 'calculator', 'eligibility', 'birth date'],
    answer: 'Grade placement at Brighton International School corresponds strictly to the student’s age as of September 1st of the academic entry year:\n\n• Nursery / Pre-K: Age 3 turning 4\n• Kindergarten / Reception: Age 4 turning 5\n• Grade 1 (Year 2): Age 5 turning 6\n• Grade 6 (Year 7 / Middle School Entry): Age 11 turning 12\n• Grade 9 (Year 10 / IGCSE Entry): Age 14 turning 15\n• Grade 11 (Year 12 / Sixth Form / IBDP Entry): Age 16 turning 17',
    actionType: 'grade_finder',
    actionButtonLabel: 'Open Age & Grade Finder',
    followUpQuestions: [
      'What entrance assessments are required?',
      'What is the step-by-step admissions process for 2026-2027?',
      'Are admissions open for mid-term transfers?'
    ]
  },
  {
    id: 'admissions-documents',
    category: 'admissions',
    categoryLabel: 'Admissions & Enrollment',
    question: 'What documents are required to apply?',
    shortSnippet: 'Passport copies, last 2 years of official school transcripts, confidential teacher reference, and vaccination records.',
    keywords: ['documents', 'transcripts', 'checklist', 'passport', 'reference letter', 'immunization', 'requirements'],
    answer: 'To ensure swift processing of your child’s file, please prepare digital copies of the following documents:\n\n1. Student & Parents’ Passport photo page or national identification.\n2. Official school report cards / transcripts covering the previous two academic years (with certified English translation if applicable).\n3. Standardized test results (if available, e.g. MAP, CAT4, IGCSE, SSAT).\n4. Confidential Principal/Teacher Recommendation Letter (downloadable template provided).\n5. Up-to-date Immunization & Medical History record.\n6. Recent passport-sized color photograph of the applicant.',
    bulletPoints: [
      'Documents can be uploaded in PDF or JPG format directly via our secure parent admissions portal.',
      'Conditional review can begin with partial transcripts while waiting for end-of-year grades.'
    ],
    followUpQuestions: [
      'What is the step-by-step admissions process for 2026-2027?',
      'What entrance assessments are required?',
      'Can I download the 2026-2027 School Prospectus?'
    ]
  },
  {
    id: 'admissions-deadlines',
    category: 'admissions',
    categoryLabel: 'Admissions & Enrollment',
    question: 'What are the application deadlines for 2026-2027?',
    shortSnippet: 'Round 1 Early Decision: November 15 | Round 2 Regular: January 31 | Rolling Admissions thereafter subject to seat availability.',
    keywords: ['deadlines', 'dates', 'intake', 'when to apply', 'early decision', 'seat availability', 'term dates'],
    answer: 'We operate three strategic admission cycles for the 2026-2027 Academic Year:\n\n• Round 1 (Priority & Scholarship Intake): Deadline November 15, 2025 (Decisions by Dec 15).\n• Round 2 (Main Intake): Deadline January 31, 2026 (Decisions by Feb 28).\n• Rolling Admissions: Applications received after February 1 are reviewed bi-weekly on a space-available basis.\n\nMid-Term Transfers for January entry are accepted until December 1st.',
    highlights: [
      { label: 'Priority & Scholarship', value: 'November 15' },
      { label: 'Main Intake', value: 'January 31' },
      { label: 'Mid-Year Entry', value: 'December 1' },
      { label: 'Waitlist Policy', value: 'Priority to Siblings' }
    ],
    followUpQuestions: [
      'Are merit or means-tested scholarships available?',
      'What are the annual tuition and boarding fees?',
      'How can I book a private campus tour or open day?'
    ]
  },
  // --- FEES & SCHOLARSHIPS ---
  {
    id: 'tuition-fees',
    category: 'fees',
    categoryLabel: 'Fees & Scholarships',
    question: 'What are the tuition fees at Brighton International School?',
    shortSnippet: 'Tuition ranges from $14,200 (Early Years) to $24,800 (Sixth Form / IBDP) per year, payable termly.',
    keywords: ['fees', 'tuition', 'cost', 'how much', 'payment', 'installments', 'pricing', 'calculator', 'rates'],
    answer: 'Tuition fees at Brighton are all-inclusive of standard academic instruction, laboratory materials, sports facilities, and technology licenses. Fees for the 2026-2027 academic year are as follows:\n\n• Early Years (Nursery & Reception): $14,200 / year ($4,733 per term)\n• Primary School (Grades 1–5): $17,500 / year ($5,833 per term)\n• Middle School (Grades 6–8): $19,800 / year ($6,600 per term)\n• Senior School (Grades 9–10 / IGCSE): $22,400 / year ($7,466 per term)\n• Sixth Form (Grades 11–12 / IBDP & A-Levels): $24,800 / year ($8,266 per term)\n\nFees are payable in three equal termly installments or an annual single payment with a 3% prepayment reduction.',
    highlights: [
      { label: 'Early Years', value: '$14,200 / yr' },
      { label: 'Primary (Gr 1-5)', value: '$17,500 / yr' },
      { label: 'Middle (Gr 6-8)', value: '$19,800 / yr' },
      { label: 'Sixth Form (Gr 11-12)', value: '$24,800 / yr' }
    ],
    bulletPoints: [
      'Tuition includes textbooks, digital device access, library resources, and basic co-curricular activities.',
      'Sibling discount: 10% reduction for the 2nd child, 15% for the 3rd and subsequent children.',
      'Capital Assessment / Development levy: $1,200 (one-off on first entry).'
    ],
    actionType: 'calculator',
    actionButtonLabel: 'Calculate Total Estimated Fees',
    followUpQuestions: [
      'Are merit or means-tested scholarships available?',
      'What additional fees apply (uniforms, bus, meals)?',
      'What boarding options are available and what do they cost?'
    ]
  },
  {
    id: 'scholarships',
    category: 'fees',
    categoryLabel: 'Fees & Scholarships',
    question: 'Are scholarships and financial aid available at Brighton?',
    shortSnippet: 'Scholarships covering 20% to 50% tuition for Academic Excellence, Performing Arts, Sports, and Global Citizenship.',
    keywords: ['scholarships', 'financial aid', 'bursary', 'discount', 'merit', 'talent', 'funding', 'awards'],
    answer: 'Brighton International School awards prestigious merit-based scholarships annually to students entering Grade 7 through Grade 11 who demonstrate exemplary achievement, character, and potential:\n\n1. Academic Scholar Award: 25% – 50% fee remission for candidates demonstrating top 5% score in standardized testing and strong academic portfolio.\n2. Performing Arts & Music Scholarship: 20% – 35% remission for exceptional instrumentalists, vocalists, or theatre practitioners.\n3. Sports Leadership Fellowship: 20% – 40% remission for national or regional competitive athletes.\n4. STEM & Innovation Award: 25% remission for standout coding, robotics, or scientific research projects.\n\nApplications open September 1st and close November 15th for the upcoming academic cycle.',
    highlights: [
      { label: 'Coverage', value: '20% to 50% Tuition' },
      { label: 'Eligible Grades', value: 'Grades 7 through 11' },
      { label: 'Renewal', value: 'Annual Review based on GPA' },
      { label: 'Deadline', value: 'November 15th annually' }
    ],
    actionType: 'calculator',
    actionButtonLabel: 'Check Scholarship Eligibility',
    followUpQuestions: [
      'What are the tuition fees at Brighton International School?',
      'What is the step-by-step admissions process for 2026-2027?',
      'What documents are required to apply?'
    ]
  },
  // --- CAMPUS LIFE & FACILITIES ---
  {
    id: 'campus-facilities',
    category: 'campus',
    categoryLabel: 'Campus Life & Facilities',
    question: 'Where is the campus located and what are the facilities?',
    shortSnippet: '35-acre green parkland with 50m pool, FIFA 2-star football pitch, observatory, and science labs.',
    keywords: ['campus', 'facilities', 'location', 'grounds', 'pool', 'sports', 'theatre', 'labs', 'address'],
    answer: 'Located in the secure, green enclave of Brighton Hills (45 Academic Avenue), our 35-acre parkland campus is purpose-designed for 21st-century international learning:\n\n• Athletics: 50m Olympic competition pool, FIFA-grade artificial turf football pitch, indoor 4-court sports hall, 4 floodlit tennis courts, and fitness gymnasium.\n• Arts: 450-seat proscenium auditorium, 12 acoustically treated music practice studios, ceramics & kiln studio, and darkroom photography lab.\n• STEM: 10 state-of-the-art physics/chemistry/biology laboratories, rooftop astronomical observatory, and high-spec AI & computing labs.\n• Student Life: Central dining commons offering international chef-prepared organic meals, wellbeing wellness hub, and modern secondary library.',
    highlights: [
      { label: 'Acreage', value: '35 Acres Parkland' },
      { label: 'Aquatics', value: '50m Olympic Pool' },
      { label: 'Performance', value: '450-Seat Auditorium' },
      { label: 'Green Campus', value: 'Zero-Carbon Solar Certified' }
    ],
    actionType: 'tour_booking',
    actionButtonLabel: 'Book an In-Person Campus Tour',
    followUpQuestions: [
      'What boarding options are available?',
      'How does school transport and security work?',
      'What dining and nutrition options are offered?'
    ]
  },
  {
    id: 'boarding-options',
    category: 'campus',
    categoryLabel: 'Campus Life & Facilities',
    question: 'What boarding options are available (Full, Weekly, Flexi)?',
    shortSnippet: 'Co-ed residential boarding from Grade 7+ offering Full Boarding, Weekly Boarding, and Flexi-stays.',
    keywords: ['boarding', 'dormitory', 'residential', 'full boarding', 'weekly boarding', 'housemaster', 'pastoral'],
    answer: 'Brighton offers modern residential boarding houses for students in Grades 7 through 12, overseen by live-in Housemasters, Matrons, and academic tutors:\n\n• Full Boarding: Complete 7-day immersive residential experience with weekend cultural excursions, study hours, and sports.\n• Weekly Boarding: Residence from Sunday evening through Friday afternoon; students spend weekends at home with family.\n• Flexi-Boarding: Pre-booked overnight stays (up to 3 nights/week) during exam prep or late sports training.\n\nBoarding facilities include single en-suite study bedrooms for Sixth Formers, double rooms for junior boarders, high-speed secure Wi-Fi, communal lounge with kitchenette, and 24/7 medical supervision.',
    highlights: [
      { label: 'Entry Age', value: 'Grade 7 (Age 12+)' },
      { label: 'Options', value: 'Full, Weekly, & Flexi' },
      { label: 'Sixth Form Rooms', value: 'Single En-Suite Study' },
      { label: 'Supervision', value: '24/7 Resident Matron & Medical' }
    ],
    actionType: 'calculator',
    actionButtonLabel: 'Estimate Boarding & Tuition Cost',
    followUpQuestions: [
      'Where is the campus located and what are the facilities?',
      'What are the annual tuition and boarding fees?',
      'How does pastoral care and student wellbeing work?'
    ]
  },
  {
    id: 'transport-bus-security',
    category: 'campus',
    categoryLabel: 'Campus Life & Facilities',
    question: 'How does school transport, bus routes, and campus security work?',
    shortSnippet: 'Air-conditioned GPS-tracked bus fleet covering 18 regional routes, with biometric campus access.',
    keywords: ['transport', 'bus', 'routes', 'safety', 'security', 'pick up', 'drop off', 'cctv'],
    answer: 'Student safety is our top priority:\n\n• School Bus Fleet: We operate 18 daily bus routes equipped with live GPS tracking, RFID student boarding verification, speed regulators, and adult bus monitors on every route. Parents can view the live bus location via the Brighton Parent App.\n• Campus Security: Gated 24/7 perimeter security, automated facial recognition and visitor biometric badge scanning, CCTV monitoring across all public areas, and emergency medical response teams on campus.',
    followUpQuestions: [
      'Where is the campus located and what are the facilities?',
      'What dining and nutrition options are offered?',
      'How can I book a private campus tour or open day?'
    ]
  },
  {
    id: 'university-placement',
    category: 'general',
    categoryLabel: 'About Brighton',
    question: 'What universities do Brighton graduates matriculate into?',
    shortSnippet: 'Graduates attend Oxford, Cambridge, Harvard, MIT, Imperial, Stanford, UCL, and top global institutions.',
    keywords: ['universities', 'matriculation', 'college', 'destinations', 'oxbridge', 'ivy league', 'counselling', 'results'],
    answer: 'Over 98% of Brighton graduates receive offers from their top-two university choices. In the past three graduating cohorts, alumni have matriculated to:\n\n• United Kingdom: University of Oxford, University of Cambridge, Imperial College London, LSE, University College London, Edinburgh, St Andrews.\n• United States: Harvard University, Stanford, Columbia, UPenn, UC Berkeley, Cornell, NYU, UCLA.\n• Canada & Europe: University of Toronto, McGill, UBC, ETH Zurich, Sciences Po.\n• Asia & Australia: University of Melbourne, NUS Singapore, HKU.\n\nOur full-time University & Careers Guidance Centre provides bespoke SAT/ACT guidance, personal statement clinics, and mock admissions interviews.',
    highlights: [
      { label: 'Acceptance Rate', value: '98% Top-Two Choices' },
      { label: 'Ivy / Oxbridge', value: '24% of Graduating Class' },
      { label: 'Scholarships Won', value: '$4.2M in College Merit Aid' }
    ],
    followUpQuestions: [
      'What are the IB Diploma Programme (IBDP) and A-Level options in Sixth Form?',
      'What makes Brighton International School unique?',
      'Can I download the 2026-2027 School Prospectus?'
    ]
  },
  // --- CONTACT & VISIT ---
  {
    id: 'book-campus-tour',
    category: 'contact',
    categoryLabel: 'Visit & Contact',
    question: 'How can I book a private campus tour or attend an Open Day?',
    shortSnippet: 'Tours are conducted Tuesday & Thursday at 10:00 AM & 2:00 PM. Virtual tours also available.',
    keywords: ['tour', 'visit', 'open day', 'schedule', 'walkthrough', 'appointment', 'see campus'],
    answer: 'We warmly invite prospective families to experience our vibrant community in person. Private tours are guided by Senior Leadership and Admissions Ambassadors:\n\n• Weekly Campus Tours: Tuesdays & Thursdays at 10:00 AM and 2:00 PM.\n• Saturday Open Morning: Held on the first Saturday of each month featuring interactive masterclasses and student performances.\n• Virtual 360° Tours: Available anytime with a live virtual Q&A session with an admissions counselor for overseas families.',
    actionType: 'tour_booking',
    actionButtonLabel: 'Reserve Campus Visit Slot',
    followUpQuestions: [
      'Where is the campus located and what are the facilities?',
      'What is the step-by-step admissions process for 2026-2027?',
      'How do I speak directly with an admissions counselor?'
    ]
  },
  {
    id: 'contact-counselor',
    category: 'contact',
    categoryLabel: 'Visit & Contact',
    question: 'How do I speak directly with an admissions counselor?',
    shortSnippet: 'Reach our team via admissions@brighton-international.edu, call +1 (800) 555-BRIGHTON, or request an instant callback.',
    keywords: ['contact', 'call', 'email', 'counselor', 'phone', 'adviser', 'speak', 'office'],
    answer: 'Our dedicated Admissions Team is available to guide you through application queries, fee schedules, curriculum options, and grade placement.\n\n• Direct Line: +1 (800) 555-BRIGHTON (Mon–Fri, 8:00 AM – 5:00 PM)\n• Admissions Email: admissions@brighton-international.edu\n• Address: Brighton International School, 45 Academic Avenue, Brighton Hills\n• WhatsApp / WeChat Admissions Desk: +1 (800) 555-0199',
    actionType: 'contact_form',
    actionButtonLabel: 'Request an Admissions Callback',
    followUpQuestions: [
      'How can I book a private campus tour or attend an Open Day?',
      'What is the step-by-step admissions process for 2026-2027?',
      'What are the annual tuition and boarding fees?'
    ]
  }
];

export const COURSES_DATA: CourseDetail[] = [
  {
    id: 'eyfs',
    title: 'Early Years Foundation Stage (EYFS)',
    stage: 'Early Years',
    grades: 'Nursery & Reception',
    ages: 'Ages 3 – 5',
    curriculum: 'Reggio Emilia-inspired British EYFS',
    description: 'Play-based, inquiry-driven learning nurturing social skills, early literacy, numeracy, sensorial discovery, and emotional confidence in a safe, garden-rich environment.',
    keySubjects: [
      'Personal, Social & Emotional Development',
      'Communication & Early Phonics',
      'Mathematical Concepts & Patterning',
      'Expressive Arts & Sensory Music',
      'Physical Movement & Gross Motor Play'
    ],
    outcomes: 'Self-confident, curious communicators equipped for structured primary learning.',
    specialFeatures: [
      '1:5 adult-to-child ratio',
      'Sensory garden & water play zone',
      'Daily Mandarin conversational immersion',
      'Child-led loose parts atelier'
    ]
  },
  {
    id: 'primary',
    title: 'Cambridge Primary School',
    stage: 'Primary School',
    grades: 'Grades 1 – 5 (Years 2 – 6)',
    ages: 'Ages 5 – 11',
    curriculum: 'Cambridge Primary with Global Perspectives',
    description: 'A vibrant curriculum building firm foundational mastery in mathematics, sciences, literacy, and digital literacy with project-based inquiry.',
    keySubjects: [
      'Cambridge Primary English & Reading',
      'Mastery Mathematics & Logic',
      'Inquiry Science (Lab-based)',
      'Global Perspectives & Social Studies',
      'Modern Languages (Mandarin / French / Spanish)',
      'Visual Arts, Instrumental Music & PE'
    ],
    outcomes: 'Critical thinkers with robust foundational numeracy, bilingual skills, and scientific inquiry.',
    specialFeatures: [
      'Annual Cambridge Checkpoint Diagnostics',
      '1:1 iPad learning from Grade 3',
      'Weekly swimming and aquatic safety instruction',
      'Junior Model United Nations & Science Fair'
    ]
  },
  {
    id: 'middle',
    title: 'Cambridge Lower Secondary (Middle School)',
    stage: 'Middle School',
    grades: 'Grades 6 – 8 (Years 7 – 9)',
    ages: 'Ages 11 – 14',
    curriculum: 'Cambridge Lower Secondary Programme',
    description: 'Specialist-taught academic blocks fostering independent research, abstract reasoning, and leadership through the crucial transitional adolescent years.',
    keySubjects: [
      'Literature & Rhetoric',
      'Algebra, Geometry & Statistics',
      'Integrated Biology, Chemistry & Physics',
      'World History & Human Geography',
      'Computer Science & Python Programming',
      'Design Technology & Robotics'
    ],
    outcomes: 'Analytical problem-solvers ready for high-stakes IGCSE coursework and exam stamina.',
    specialFeatures: [
      'Specialist science wet labs for every lesson',
      'VEX Robotics competition teams',
      'House system competitions & pastoral tutors',
      'Residential outdoor leadership expedition'
    ]
  },
  {
    id: 'igcse',
    title: 'Cambridge IGCSE (Senior School)',
    stage: 'Senior (IGCSE)',
    grades: 'Grades 9 – 10 (Years 10 – 11)',
    ages: 'Ages 14 – 16',
    curriculum: 'Cambridge International General Certificate of Secondary Education (IGCSE)',
    description: 'Rigorous 2-year examination curriculum recognized worldwide. Students study 8 to 10 subjects balancing compulsory core disciplines with passion electives.',
    keySubjects: [
      'First & Second Language English',
      'Extended Mathematics & Additional Math',
      'Triple Science (Biology, Chemistry, Physics)',
      'Economics & Business Studies',
      'Computer Science & Artificial Intelligence',
      'Modern Languages, History & Visual Arts'
    ],
    outcomes: 'Internationally benchmarked qualifications opening direct pathways to elite Sixth Form curricula.',
    specialFeatures: [
      '84% A* to A grade historical track record',
      'Personalized university profile consultation',
      'Duke of Edinburgh’s International Award',
      'Dedicated laboratory dissertations'
    ]
  },
  {
    id: 'sixth-form',
    title: 'Sixth Form: IB Diploma Programme & Cambridge A-Levels',
    stage: 'Sixth Form (IB DP / A-Levels)',
    grades: 'Grades 11 – 12 (Years 12 – 13)',
    ages: 'Ages 16 – 18',
    curriculum: 'Dual Pathway: IBDP or Cambridge A-Levels',
    description: 'Pre-university pinnacle education. Students select either the holistic International Baccalaureate Diploma (6 subjects + TOK/EE/CAS) or focused Cambridge A-Levels (3-4 subjects).',
    keySubjects: [
      'IBDP Higher Level / Standard Level Subjects',
      'Cambridge A-Level Mathematics & Further Math',
      'Pure Physics, Chemistry & Biology',
      'Economics, Psychology & Global Politics',
      'Theory of Knowledge (TOK) & 4,000-word Extended Essay',
      'Creativity, Activity, Service (CAS) Portfolio'
    ],
    outcomes: 'Matriculation into the world’s top universities (Oxbridge, Ivy League, Imperial, Toronto, Stanford).',
    specialFeatures: [
      'Average IB score 36.8 (top 10% worldwide)',
      'Dedicated College Counsellors with 1-on-1 coaching',
      'SAT/ACT & UCAT testing center on campus',
      'Private Sixth Form study lounge and research library'
    ]
  }
];

export const TUITION_RATES: Record<string, { label: string; tuition: number; termTuition: number; defaultStage: string }> = {
  eyfs: { label: 'Early Years (Nursery & Reception)', tuition: 14200, termTuition: 4733, defaultStage: 'Early Years' },
  primary: { label: 'Primary School (Grades 1–5)', tuition: 17500, termTuition: 5833, defaultStage: 'Primary' },
  middle: { label: 'Middle School (Grades 6–8)', tuition: 19800, termTuition: 6600, defaultStage: 'Middle' },
  igcse: { label: 'Senior School (Grades 9–10 / IGCSE)', tuition: 22400, termTuition: 7466, defaultStage: 'Senior' },
  sixth_form: { label: 'Sixth Form (Grades 11–12 / IBDP & A-Levels)', tuition: 24800, termTuition: 8266, defaultStage: 'Sixth Form' },
};

export const BOARDING_RATES: Record<string, { label: string; fee: number; description: string }> = {
  none: { label: 'Day Student (No Boarding)', fee: 0, description: 'Commuting student' },
  weekly: { label: 'Weekly Boarding (Sunday – Friday)', fee: 9800, description: 'Includes 5 nights room, board, meals, and laundry' },
  full: { label: 'Full Boarding (7 Days Residential)', fee: 14500, description: 'Includes 7 nights full residence, meals, weekend excursions, and medical access' },
};

export const BUS_ROUTES = [
  { id: 'none', label: 'No Bus Transport', fee: 0 },
  { id: 'zone1', label: 'Zone 1: Brighton Hills & Green Valley (< 10km)', fee: 1400 },
  { id: 'zone2', label: 'Zone 2: City Centre & North Ridge (10 – 20km)', fee: 1850 },
  { id: 'zone3', label: 'Zone 3: West Marina & South Bay (> 20km)', fee: 2200 },
];
