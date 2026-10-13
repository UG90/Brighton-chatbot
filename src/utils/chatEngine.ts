import { PREDEFINED_QUESTIONS, PredefinedQuestion, SCHOOL_INFO } from '../data/brightonData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  timestamp: string;
  text: string;
  matchedQuestionId?: string;
  categoryLabel?: string;
  highlights?: { label: string; value: string }[];
  bulletPoints?: string[];
  actionType?: 'calculator' | 'grade_finder' | 'tour_booking' | 'prospectus' | 'courses' | 'contact_form';
  actionButtonLabel?: string;
  followUpQuestions?: string[];
  feedback?: 'like' | 'dislike' | null;
}

export function findMatchingPredefined(query: string): PredefinedQuestion | null {
  const clean = query.trim().toLowerCase();
  if (!clean) return null;

  // 1. Check exact question match or ID match
  const exact = PREDEFINED_QUESTIONS.find(
    (q) => q.id.toLowerCase() === clean || q.question.toLowerCase() === clean
  );
  if (exact) return exact;

  // 2. Score each predefined question based on keyword and title tokens
  const queryTokens = clean
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2);

  let bestMatch: PredefinedQuestion | null = null;
  let highestScore = 0;

  for (const q of PREDEFINED_QUESTIONS) {
    let score = 0;
    const qTitle = q.question.toLowerCase();
    const qSnippet = q.shortSnippet.toLowerCase();

    // Direct phrase includes
    if (qTitle.includes(clean)) score += 20;

    for (const token of queryTokens) {
      if (qTitle.includes(token)) score += 5;
      if (qSnippet.includes(token)) score += 3;
      if (q.keywords.some((kw) => kw.toLowerCase().includes(token))) score += 4;
      if (q.keywords.includes(token)) score += 6;
      if (q.category.includes(token)) score += 2;
    }

    if (score > highestScore && score >= 7) {
      highestScore = score;
      bestMatch = q;
    }
  }

  return bestMatch;
}

export function generateSmartAnswer(query: string): Omit<ChatMessage, 'id' | 'sender' | 'timestamp'> {
  const clean = query.trim().toLowerCase();

  // 1. Check if matches predefined directly
  const predefined = findMatchingPredefined(query);
  if (predefined) {
    return {
      text: predefined.answer,
      matchedQuestionId: predefined.id,
      categoryLabel: predefined.categoryLabel,
      highlights: predefined.highlights,
      bulletPoints: predefined.bulletPoints,
      actionType: predefined.actionType,
      actionButtonLabel: predefined.actionButtonLabel,
      followUpQuestions: predefined.followUpQuestions,
    };
  }

  // 2. Fallback / conversational intent parser for specific frequent school inquiries:
  if (clean.includes('hello') || clean.includes('hi') || clean.includes('hey') || clean.includes('good morning')) {
    return {
      text: `Hello and welcome to Brighton International School! I am your interactive admissions and academic advisor.\n\nI can assist you with our curriculum pathways (Cambridge & IB), 2026-2027 admissions criteria, tuition fees & scholarships, campus tour bookings, or age-to-grade placement. How can I help you today?`,
      categoryLabel: 'Welcome',
      highlights: [
        { label: 'Campus Ratio', value: '8:1 Student-Teacher' },
        { label: 'Curriculum', value: 'Cambridge + IB DP' },
        { label: 'AY 2026-27', value: 'Enrolment Open' }
      ],
      actionType: 'courses',
      actionButtonLabel: 'Explore School Curricula',
      followUpQuestions: [
        'What makes Brighton International School unique?',
        'What curriculum does Brighton International School follow?',
        'What is the step-by-step admissions process for 2026-2027?',
        'What are the tuition fees at Brighton International School?'
      ]
    };
  }

  if (clean.includes('food') || clean.includes('meal') || clean.includes('lunch') || clean.includes('diet') || clean.includes('vegan') || clean.includes('cafeteria') || clean.includes('dining')) {
    return {
      text: `At Brighton International School, nutrition and wellbeing are integral to student vitality. Our dining commons serves fresh, chef-prepared hot meals daily using seasonal organic produce.\n\nWe cater extensively to diverse dietary requirements including vegetarian, vegan, halal-certified, gluten-free, and nut-aware diets. A registered nutritionist oversees all menu rotations to ensure balanced macro- and micro-nutrient profiles.`,
      categoryLabel: 'Campus Dining & Nutrition',
      bulletPoints: [
        'International salad bar, warm artisan bread, and fresh fruit daily.',
        'Zero artificial transfats and strictly nut-free preparation kitchens.',
        'Boarding students receive 3 cooked meals plus evening supper & snacks.'
      ],
      highlights: [
        { label: 'Meal Plan', value: '$1,450 / Year' },
        { label: 'Special Diets', value: 'Halal, Vegan & Allergen-Free' }
      ],
      actionType: 'tour_booking',
      actionButtonLabel: 'Tour Our Campus Dining Commons',
      followUpQuestions: [
        'Where is the campus located and what are the facilities?',
        'What are the tuition fees at Brighton International School?',
        'What boarding options are available (Full, Weekly, Flexi)?'
      ]
    };
  }

  if (clean.includes('uniform') || clean.includes('dress code')) {
    return {
      text: `Brighton students wear our traditional tailored navy blazer and academy uniform, designed for elegance, comfort, and pride in school identity.\n\n• Formal Uniform: Navy blazer with embroidered crest, crisp white oxford shirt, collegiate tie, and charcoal trousers/pleated kilt.\n• Summer Uniform: Short-sleeve monogrammed polo and tailored shorts/skirt during warmer months.\n• House & Sports Kit: Moisture-wicking technical athletic apparel branded with student House colors.\n\nUniforms can be fitted at our on-campus Brighton Uniform Shop or ordered through the parent portal.`,
      categoryLabel: 'Student Life',
      bulletPoints: [
        'Estimated initial uniform package is approximately $350–$450.',
        'Eco-friendly sustainable fabric blends.',
        'Second-hand uniform exchange run by the Brighton Parent Association (BPA).'
      ],
      followUpQuestions: [
        'What makes Brighton International School unique?',
        'What sports academies and arts facilities are available?',
        'What are the tuition fees at Brighton International School?'
      ]
    };
  }

  if (clean.includes('sport') || clean.includes('swimming') || clean.includes('football') || clean.includes('tennis') || clean.includes('basketball') || clean.includes('athletics')) {
    return {
      text: `Athletics is a cornerstone of life at Brighton. We compete in the Federation of International British Schools in Asia (FOBISIA) and regional international leagues.\n\nOur sporting infrastructure includes an Olympic 50m competition pool, FIFA 2-star artificial pitch, 4 floodlit hardcourt tennis courts, indoor air-conditioned gymnasium, dance studio, and dedicated strength & conditioning suites.`,
      categoryLabel: 'Sports & Athletics',
      highlights: [
        { label: 'Pool', value: '50m 8-Lane Olympic' },
        { label: 'Teams', value: '24 Varsity Squads' },
        { label: 'Coaching', value: 'Ex-National Athletes' }
      ],
      bulletPoints: [
        'Core sports: Football, Basketball, Swimming, Tennis, Volleyball, Track & Field, and Rugby.',
        'Elite Athlete Pathway providing timetable flexibility for national tournament training.',
        'Sports leadership and coaching awards for Sixth Form students.'
      ],
      actionType: 'tour_booking',
      actionButtonLabel: 'Book Campus Tour to View Sports Facilities',
      followUpQuestions: [
        'Are scholarships and financial aid available at Brighton?',
        'Where is the campus located and what are the facilities?',
        'What curriculum does Brighton International School follow?'
      ]
    };
  }

  // Generic intelligent fallback with guidance and relevant suggestions
  return {
    text: `Thank you for your inquiry regarding "${query}". Brighton International School is committed to providing comprehensive transparency for all prospective families.\n\nWhile this specific query touches on custom school life details, here are the most relevant official resources and answers you can explore right now:`,
    categoryLabel: 'Brighton Admissions Advisor',
    bulletPoints: [
      `Curriculum Pathways: Dual Cambridge International & IB World School framework.`,
      `Admissions Year 2026–2027: Rolling evaluations with priority deadlines.`,
      `Direct Consultation: Contact our admissions desk at ${SCHOOL_INFO.admissionsEmail} or ${SCHOOL_INFO.phone}.`
    ],
    actionType: 'contact_form',
    actionButtonLabel: 'Request Callback from Admissions',
    followUpQuestions: [
      'What is the step-by-step admissions process for 2026-2027?',
      'What curriculum does Brighton International School follow?',
      'What are the tuition fees at Brighton International School?',
      'How can I book a private campus tour or attend an Open Day?'
    ]
  };
}
