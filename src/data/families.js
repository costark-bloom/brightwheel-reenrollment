export const ENROLLMENT_DEADLINE = new Date('2026-07-08');
export const SEMESTER_LABEL = 'Fall 2026';

export const INITIAL_FAMILIES = [
  {
    id: 1,
    familyName: 'Smith',
    studentName: 'Alex Smith',
    classroom: 'Pre-K A',
    monthlyRevenue: 1450,
    status: 'unconfirmed',
    lastContact: '2026-06-14',
    parentName: 'Jordan Smith',
  },
  {
    id: 2,
    familyName: 'Patel',
    studentName: 'Priya Patel',
    classroom: 'Toddler B',
    monthlyRevenue: 1320,
    status: 'unconfirmed',
    lastContact: '2026-06-14',
    parentName: 'Anita Patel',
  },
  {
    id: 3,
    familyName: 'Johnson',
    studentName: 'Mia Johnson',
    classroom: 'Pre-K A',
    monthlyRevenue: 1450,
    status: 'pending',
    lastContact: '2026-06-20',
    parentName: 'Chris Johnson',
  },
  {
    id: 4,
    familyName: 'Williams',
    studentName: 'Noah Williams',
    classroom: 'Infant Care',
    monthlyRevenue: 1680,
    status: 'unconfirmed',
    lastContact: '2026-05-28',
    parentName: 'Taylor Williams',
  },
  {
    id: 5,
    familyName: 'Garcia',
    studentName: 'Sofia Garcia',
    classroom: 'Pre-K B',
    monthlyRevenue: 1450,
    status: 'confirmed',
    lastContact: '2026-06-18',
    parentName: 'Maria Garcia',
  },
  {
    id: 6,
    familyName: 'Chen',
    studentName: 'Liam Chen',
    classroom: 'Toddler A',
    monthlyRevenue: 1280,
    status: 'unconfirmed',
    lastContact: '2026-06-14',
    parentName: 'Wei Chen',
  },
  {
    id: 7,
    familyName: 'Brown',
    studentName: 'Emma Brown',
    classroom: 'Pre-K A',
    monthlyRevenue: 1450,
    status: 'pending',
    lastContact: '2026-06-22',
    parentName: 'Dana Brown',
  },
  {
    id: 8,
    familyName: 'Davis',
    studentName: 'Ethan Davis',
    classroom: 'Toddler B',
    monthlyRevenue: 1320,
    status: 'unconfirmed',
    lastContact: '2026-06-10',
    parentName: 'Sam Davis',
  },
  {
    id: 9,
    familyName: 'Martinez',
    studentName: 'Isabella Martinez',
    classroom: 'Infant Care',
    monthlyRevenue: 1680,
    status: 'confirmed',
    lastContact: '2026-06-21',
    parentName: 'Rosa Martinez',
  },
  {
    id: 10,
    familyName: 'Anderson',
    studentName: 'Lucas Anderson',
    classroom: 'Pre-K B',
    monthlyRevenue: 1450,
    status: 'unconfirmed',
    lastContact: '2026-06-14',
    parentName: 'Jamie Anderson',
  },
  {
    id: 11,
    familyName: 'Taylor',
    studentName: 'Ava Taylor',
    classroom: 'Toddler A',
    monthlyRevenue: 1280,
    status: 'unconfirmed',
    lastContact: '2026-06-01',
    parentName: 'Morgan Taylor',
  },
  {
    id: 12,
    familyName: 'Wilson',
    studentName: 'Oliver Wilson',
    classroom: 'Pre-K A',
    monthlyRevenue: 1450,
    status: 'confirmed',
    lastContact: '2026-06-19',
    parentName: 'Casey Wilson',
  },
  {
    id: 13,
    familyName: 'Thomas',
    studentName: 'Charlotte Thomas',
    classroom: 'Toddler B',
    monthlyRevenue: 1320,
    status: 'unconfirmed',
    lastContact: '2026-06-14',
    parentName: 'Alex Thomas',
  },
  {
    id: 14,
    familyName: 'Moore',
    studentName: 'Henry Moore',
    classroom: 'Infant Care',
    monthlyRevenue: 1680,
    status: 'unconfirmed',
    lastContact: '2026-06-14',
    parentName: 'Pat Moore',
  },
  {
    id: 15,
    familyName: 'Jackson',
    studentName: 'Ella Jackson',
    classroom: 'Pre-K B',
    monthlyRevenue: 1450,
    status: 'pending',
    lastContact: '2026-06-23',
    parentName: 'Riley Jackson',
  },
  {
    id: 16,
    familyName: 'White',
    studentName: 'Benjamin White',
    classroom: 'Toddler A',
    monthlyRevenue: 1280,
    status: 'confirmed',
    lastContact: '2026-06-17',
    parentName: 'Jordan White',
  },
  {
    id: 17,
    familyName: 'Harris',
    studentName: 'Amelia Harris',
    classroom: 'Pre-K A',
    monthlyRevenue: 1450,
    status: 'unconfirmed',
    lastContact: '2026-06-14',
    parentName: 'Drew Harris',
  },
  {
    id: 18,
    familyName: 'Clark',
    studentName: 'James Clark',
    classroom: 'Toddler B',
    monthlyRevenue: 1320,
    status: 'confirmed',
    lastContact: '2026-06-20',
    parentName: 'Quinn Clark',
  },
];

export function daysSince(dateStr) {
  const then = new Date(dateStr);
  const now = new Date('2026-06-24');
  return Math.floor((now - then) / (1000 * 60 * 60 * 24));
}

export function daysUntilDeadline() {
  const now = new Date('2026-06-24');
  return Math.ceil((ENROLLMENT_DEADLINE - now) / (1000 * 60 * 60 * 24));
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getNudgeMessage(family) {
  return `Hi ${family.parentName.split(' ')[0]}, this is ABC Academy. We're preparing for ${SEMESTER_LABEL} and haven't received your re-enrollment confirmation for ${family.studentName} yet. Please confirm by ${ENROLLMENT_DEADLINE.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} to secure their spot. Tap here to confirm in one step: [link]`;
}
