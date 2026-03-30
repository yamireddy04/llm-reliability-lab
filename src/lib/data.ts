export interface MedicalQuestion {
    id: number;
    question: string;
    answer: string;
    category: string;
    difficulty: "easy" | "medium" | "hard";
    explanation: string;
  }
  
  export const medicalDataset: MedicalQuestion[] = [
    {
      id: 1,
      question: "What is the first-line treatment for type 2 diabetes mellitus?",
      answer: "Metformin",
      category: "Pharmacology",
      difficulty: "easy",
      explanation: "Metformin is the preferred initial pharmacologic agent for type 2 diabetes due to its efficacy, safety, and low cost.",
    },
    {
      id: 2,
      question: "Which enzyme is deficient in Phenylketonuria (PKU)?",
      answer: "Phenylalanine hydroxylase",
      category: "Biochemistry",
      difficulty: "medium",
      explanation: "PKU is caused by a deficiency of phenylalanine hydroxylase, leading to accumulation of phenylalanine.",
    },
    {
      id: 3,
      question: "What is the most common cause of community-acquired pneumonia in adults?",
      answer: "Streptococcus pneumoniae",
      category: "Microbiology",
      difficulty: "easy",
      explanation: "Streptococcus pneumoniae (pneumococcus) is responsible for the majority of community-acquired pneumonia cases.",
    },
    {
      id: 4,
      question: "Which nerve is damaged in carpal tunnel syndrome?",
      answer: "Median nerve",
      category: "Anatomy",
      difficulty: "easy",
      explanation: "Carpal tunnel syndrome results from compression of the median nerve as it passes through the carpal tunnel.",
    },
    {
      id: 5,
      question: "What is the mechanism of action of aspirin?",
      answer: "Irreversible inhibition of COX-1 and COX-2 enzymes",
      category: "Pharmacology",
      difficulty: "medium",
      explanation: "Aspirin acetylates and irreversibly inhibits cyclooxygenase enzymes, preventing prostaglandin and thromboxane synthesis.",
    },
    {
      id: 6,
      question: "Which vitamin deficiency causes scurvy?",
      answer: "Vitamin C (ascorbic acid)",
      category: "Nutrition",
      difficulty: "easy",
      explanation: "Scurvy results from vitamin C deficiency, impeding collagen synthesis and causing bleeding gums and poor wound healing.",
    },
    {
      id: 7,
      question: "What is the gold standard test for diagnosing pulmonary embolism?",
      answer: "CT pulmonary angiography (CTPA)",
      category: "Radiology",
      difficulty: "medium",
      explanation: "CTPA is the preferred diagnostic test for PE due to its high sensitivity and specificity.",
    },
    {
      id: 8,
      question: "Which electrolyte abnormality is most commonly associated with digoxin toxicity?",
      answer: "Hypokalemia",
      category: "Pharmacology",
      difficulty: "hard",
      explanation: "Hypokalemia potentiates digoxin toxicity by increasing its binding to Na+/K+-ATPase.",
    },
    {
      id: 9,
      question: "What is the most common type of kidney stone?",
      answer: "Calcium oxalate stones",
      category: "Nephrology",
      difficulty: "easy",
      explanation: "Calcium oxalate is responsible for approximately 80% of all kidney stones.",
    },
    {
      id: 10,
      question: "Which chromosome is affected in Down syndrome?",
      answer: "Chromosome 21 (trisomy 21)",
      category: "Genetics",
      difficulty: "easy",
      explanation: "Down syndrome is caused by trisomy 21, the presence of an extra copy of chromosome 21.",
    },
    {
      id: 11,
      question: "What is the mechanism of HIV antiviral resistance to nucleoside reverse transcriptase inhibitors?",
      answer: "Mutations in the reverse transcriptase gene that reduce drug binding or enhance excision",
      category: "Microbiology",
      difficulty: "hard",
      explanation: "NRTI resistance occurs via M184V mutation (reduced binding) or thymidine analog mutations (enhanced excision).",
    },
    {
      id: 12,
      question: "Which cell type is primarily affected in multiple sclerosis?",
      answer: "Oligodendrocytes (myelin-producing cells in the CNS)",
      category: "Neurology",
      difficulty: "medium",
      explanation: "MS involves autoimmune destruction of oligodendrocytes and myelin in the central nervous system.",
    },
    {
      id: 13,
      question: "What is the normal range of serum sodium?",
      answer: "135–145 mEq/L",
      category: "Clinical Chemistry",
      difficulty: "easy",
      explanation: "Normal serum sodium ranges between 135 and 145 milliequivalents per liter.",
    },
    {
      id: 14,
      question: "Which artery supplies the sinoatrial node in most individuals?",
      answer: "Right coronary artery",
      category: "Anatomy",
      difficulty: "hard",
      explanation: "In ~60% of people, the SA node is supplied by the right coronary artery; in ~40% by the left circumflex.",
    },
    {
      id: 15,
      question: "What is the treatment of choice for Clostridioides difficile (C. diff) infection?",
      answer: "Vancomycin (oral) or fidaxomicin",
      category: "Pharmacology",
      difficulty: "medium",
      explanation: "Current guidelines recommend oral vancomycin or fidaxomicin for C. difficile infection.",
    },
    {
      id: 16,
      question: "Which hormone is produced by the beta cells of the pancreas?",
      answer: "Insulin",
      category: "Endocrinology",
      difficulty: "easy",
      explanation: "Beta cells of the islets of Langerhans produce insulin, the primary hormone for glucose uptake.",
    },
    {
      id: 17,
      question: "What is the most sensitive early marker of acute myocardial infarction?",
      answer: "Troponin I or Troponin T",
      category: "Clinical Chemistry",
      difficulty: "medium",
      explanation: "Cardiac troponins are highly sensitive and specific markers, detectable within 3-4 hours of myocardial injury.",
    },
    {
      id: 18,
      question: "Which bacteria produces the Shiga toxin?",
      answer: "Escherichia coli O157:H7 and Shigella dysenteriae",
      category: "Microbiology",
      difficulty: "medium",
      explanation: "Shiga toxin is produced by Shigella dysenteriae type 1 and enterohemorrhagic E. coli strains like O157:H7.",
    },
    {
      id: 19,
      question: "What is the pathophysiology of myasthenia gravis?",
      answer: "Autoantibodies against acetylcholine receptors at the neuromuscular junction",
      category: "Neurology",
      difficulty: "hard",
      explanation: "Myasthenia gravis is caused by IgG antibodies against nicotinic acetylcholine receptors, reducing neuromuscular transmission.",
    },
    {
      id: 20,
      question: "What is the primary function of the lymphatic system?",
      answer: "Fluid homeostasis, immune surveillance, and lipid absorption from the gut",
      category: "Physiology",
      difficulty: "medium",
      explanation: "The lymphatic system returns interstitial fluid to circulation, supports immune function, and transports dietary lipids.",
    },
  ];
  
  export const categories = [...new Set(medicalDataset.map((q) => q.category))];
  export const difficulties = ["easy", "medium", "hard"] as const;
  
  export interface ExperimentResult {
    questionId: number;
    question: string;
    groundTruth: string;
    modelResponse: string;
    isCorrect: boolean;
    isHallucination: boolean;
    hallucinationType?: "factual_error" | "fabricated" | "overconfident";
    model: string;
    promptStrategy: string;
    confidence?: number;
  }
  
  export interface ExperimentConfig {
    model: string;
    promptStrategy: string;
    sampleCount: number;
    customPrompt?: string;
  }