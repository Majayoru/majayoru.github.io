/* =========================================================
   사이트 내용은 이 파일만 고치면 됩니다.
   - projects    : Work 섹션 (featured: true 인 항목이 크게 표시)
   - experiments : Lab 섹션
   - careers     : About > Career
   - stack, certs, contacts : About / Contact
   Journal(최신 글)은 posts.json 에서 자동으로 불러옵니다.
   ========================================================= */

const SITE = {
  blogUrl: "https://jujumalon.tistory.com/",
  typingLines: [
    "Initializing system...",
    "Education meets Technology",
    "Building the future of learning",
    "Status: Learning | Coding | Growing",
  ],
};

const projects = [
  {
    id: "hrd-automation",
    title: "HRD Auto",
    subtitle: "국비훈련 행정 반복 업무 자동화",
    category: "Featured Project",
    type: "Personal Project",
    status: "RUNNING",
    description:
      "출결 확인, 훈련생 명단 정리, 각종 보고 서식 작성처럼 매일 반복되는 HRD 행정 업무를 Python 스크립트로 자동화하는 프로젝트입니다.",
    role: [
      "엑셀 출결·명단 데이터 정리 자동화",
      "반복 보고 서식 자동 생성",
      "운영 현장의 실제 업무 흐름을 기준으로 기능 설계",
    ],
    techStack: ["Python", "pandas", "openpyxl", "Excel"],
    github: "",
    featured: true,
  },
  {
    id: "portfolio",
    title: "Portfolio Site",
    subtitle: "터미널 콘셉트 개인 포트폴리오",
    category: "Web",
    type: "Personal Project",
    status: "RUNNING",
    description:
      "HTML, CSS, JavaScript로 만든 포트폴리오입니다. GitHub Actions가 티스토리 RSS를 읽어 최신 글 목록을 자동으로 갱신합니다.",
    role: ["반응형 레이아웃 및 라이트/다크 테마", "GitHub Actions 기반 블로그 글 자동 수집"],
    techStack: ["HTML", "CSS", "JavaScript", "GitHub Actions"],
    github: "https://github.com/kangxoals-debug/jujumalon",
  },
  {
    id: "edu-ai-tool",
    title: "Edu AI Tool",
    subtitle: "AI 활용 교육 운영 도구",
    category: "AI",
    type: "Personal Project",
    status: "QUEUED",
    description:
      "훈련과정 운영에 필요한 안내문, 평가 피드백 정리 등을 AI로 보조하는 도구를 기획하고 있습니다.",
    role: ["요구사항 정리 및 기획"],
    techStack: ["Python", "AI / ML"],
    github: "",
  },
];

const experiments = [
  {
    id: "daily-log",
    number: "01",
    title: "Daily Study Log",
    subtitle: "매일 학습 기록 → 개발 블로그 정리",
    category: "Habit",
    status: "RUNNING",
    description:
      "매일 공부한 내용을 정리해 티스토리에 기록합니다. 기록이 쌓이는 과정 자체를 성장 로그로 남깁니다.",
    methods: ["학습 내용 요약", "코드 예제 정리", "블로그 업로드"],
    techStack: ["Markdown", "Tistory"],
    github: "",
  },
  {
    id: "frontend-basics",
    number: "02",
    title: "Frontend Basics",
    subtitle: "HTML / CSS / JavaScript 실습",
    category: "Web",
    status: "QUEUED",
    description:
      "레이아웃, 반응형, DOM 조작 등 웹 프론트엔드 기초를 작은 예제로 하나씩 실습합니다.",
    methods: ["Flexbox · Grid 레이아웃", "반응형 미디어쿼리", "DOM 이벤트 처리"],
    techStack: ["HTML", "CSS", "JavaScript"],
    github: "",
  },
];

const summary = [
  { label: "HRD OPERATION", value: "국비훈련", desc: "운영 · 총무 · HRD 행정 실무" },
  { label: "NOW BUILDING", value: "2026 ~", desc: "Python 자동화 · 웹 개발 학습" },
];

const careers = [
  {
    tag: "NOW",
    title: "교육기관 운영 / 고용노동부 위탁 직업훈련",
    tasks: ["KDT, AI 캠퍼스 과정 운영", "프로젝트 평가 수행"],
  },
  {
    tag: "PREV",
    title: "국비지원 훈련기관 운영 · 총무 · HRD 행정",
    tasks: ["학원 운영 및 총무 업무", "과정평가형 훈련 운영", "이수자 평가 수행"],
  },
  {
    tag: "PREV",
    title: "대규모 시설 관리",
    tasks: ["대규모 아파트 단지 시설관리 경험"],
  },
];

const stack = [
  "Python", "HTML5", "CSS3", "JavaScript", "AI / ML", "Git",
  "GitHub", "VS Code", "Excel", "ERP", "Photoshop",
];

const certs = [
  "직업훈련교사", "직업상담사 2급", "사무자동화산업기사", "ERP정보관리사 Master",
  "ITQ OA 마스터", "GTQ", "컴퓨터활용능력 2급", "워드프로세서",
];

const contacts = [
  { label: "github", value: "kangxoals-debug", url: "https://github.com/kangxoals-debug" },
  { label: "blog", value: "jujumalon.tistory.com", url: "https://jujumalon.tistory.com/" },
  // 이메일을 공개하려면 아래 줄의 // 를 지우고 주소를 넣으세요.
  // { label: "email", value: "you@example.com", url: "mailto:you@example.com" },
];
