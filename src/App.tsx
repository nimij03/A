import { useMemo, useState, type ReactNode } from "react";

type Screen = "home" | "age" | "interest" | "situation" | "results" | "detail" | "suggest" | "success";
type IconName = "arrow" | "back" | "check" | "home" | "phone" | "pin" | "share" | "time" | "user";

const ages = ["영유아", "아동", "청소년", "청년", "중장년", "노년"];
const interests = ["배움·취미", "건강·운동", "돌봄·육아", "일자리·경제", "관계·모임", "봉사·참여", "마음 돌봄", "지역·문화"];
const situations = ["혼자 살고 있어요", "아이를 키우고 있어요", "가족을 돌보고 있어요", "일자리를 찾고 있어요", "이사 온 지 얼마 안 됐어요", "시간 여유가 많아요", "요즘 마음이 힘들어요", "해당 없음"];

const programs = [
  {
    title: "마음이웃 소모임",
    intro: "동네 이웃과 차 한잔하며 새로운 취미를 시작해요.",
    ages: ["중장년", "노년"],
    target: "중장년·노년 주민",
    schedule: "매주 목요일 14:00–16:00",
    place: "복지관 3층 모임방",
    cost: "무료",
    status: "모집 중",
    tags: ["관계·모임", "마음 돌봄", "혼자 살고 있어요", "시간 여유가 많아요"],
  },
  {
    title: "활력 충전 건강교실",
    intro: "내 몸에 맞는 가벼운 운동으로 일상에 활력을 더해요.",
    ages: ["중장년", "노년"],
    target: "중장년·노년 주민",
    schedule: "매주 화·금요일 10:00–11:00",
    place: "복지관 2층 강당",
    cost: "월 10,000원",
    status: "모집 중",
    tags: ["건강·운동", "관계·모임", "시간 여유가 많아요"],
  },
  {
    title: "우리동네 스마트 생활",
    intro: "스마트폰 기초부터 생활에 유용한 기능까지 함께 배워요.",
    ages: ["중장년", "노년"],
    target: "중장년·노년 주민",
    schedule: "매주 수요일 10:00–12:00",
    place: "복지관 4층 배움실",
    cost: "무료",
    status: "모집 예정",
    tags: ["배움·취미", "관계·모임", "이사 온 지 얼마 안 됐어요"],
  },
  {
    title: "토닥토닥 부모 모임",
    intro: "육아 고민을 나누고 아이와 함께 쉬어 가는 시간이에요.",
    ages: ["영유아", "아동"],
    target: "영유아·아동 양육자",
    schedule: "격주 토요일 10:30–12:00",
    place: "복지관 1층 온마루",
    cost: "무료",
    status: "모집 중",
    tags: ["돌봄·육아", "관계·모임", "아이를 키우고 있어요"],
  },
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
    back: <path d="m15 18-6-6 6-6" />,
    check: <path d="m5 12 4 4L19 7" />,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><path d="m8.6 10.5 6.8-4" /><path d="m8.6 13.5 6.8 4" /><circle cx="18" cy="19" r="3" /></>,
    time: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  };
  return <svg aria-hidden="true" fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width={size}>{paths[name]}</svg>;
}

function Header({ large, onHome, onLarge }: { large: boolean; onHome: () => void; onLarge: () => void }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="wordmark" onClick={onHome}>
          <span>강남종합사회복지관</span>
          <small>GANGNAM COMMUNITY WELFARE CENTER</small>
        </button>
        <nav aria-label="도움 메뉴">
          <button aria-pressed={large} className="text-size" onClick={onLarge}>가<span>+</span> 큰 글씨</button>
          <a className="home-link" href="https://kangnamwelfare.co.kr/index.php">복지관 홈 <Icon name="arrow" size={16} /></a>
        </nav>
      </div>
    </header>
  );
}

function PageTitle({ title, description }: { title: string; description: string }) {
  return <div className="page-title"><h1>{title}</h1><p>{description}</p></div>;
}

function StepBand({ step }: { step: number }) {
  return (
    <div className="step-band" aria-label={`3단계 중 ${step}단계`}>
      {["시기", "관심사", "상황"].map((label, index) => (
        <span className={index + 1 === step ? "current" : ""} key={label}>
          <b>{index + 1}</b> {label}
        </span>
      ))}
    </div>
  );
}

function Selection({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button aria-pressed={selected} className={`selection ${selected ? "selected" : ""}`} onClick={onClick}>
      {selected && <Icon name="check" size={18} />}<span>{label}</span>
    </button>
  );
}

function PrimaryButton({ children, disabled, onClick, secondary }: { children: ReactNode; disabled?: boolean; onClick: () => void; secondary?: boolean }) {
  return <button className={`primary-button ${secondary ? "secondary" : ""}`} disabled={disabled} onClick={onClick}>{children}</button>;
}

function StepPage({ step, title, description, choices, selected, max, onToggle, onBack, onNext }: {
  step: number; title: string; description: string; choices: string[]; selected: string[]; max?: number; onToggle: (value: string) => void; onBack: () => void; onNext: () => void;
}) {
  return (
    <>
      <main className="step-page">
        <StepBand step={step} />
        <button className="back-button" onClick={onBack}><Icon name="back" size={18} /> 이전</button>
        <section className="question">
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="selection-grid">
            {choices.map((choice) => <Selection key={choice} label={choice} onClick={() => onToggle(choice)} selected={selected.includes(choice)} />)}
          </div>
          {max && <p className="choice-count">{selected.length}/{max}개 선택</p>}
        </section>
      </main>
      <div className="sticky-action"><PrimaryButton disabled={step !== 3 && selected.length === 0} onClick={onNext}>{step === 3 ? "내게 맞는 사업 보기" : "다음"} <Icon name="arrow" /></PrimaryButton></div>
    </>
  );
}

function SuggestBanner() {
  return (
    <section className="suggest-banner">
      <div><span>주민의 이야기에서 새 사업이 시작됩니다</span><h2>찾는 사업이 없나요?</h2><p>필요한 활동을 알려 주세요. 검토 후 정성껏 답변드릴게요.</p></div>
      <a className="primary-button secondary" href="https://kangnamwelfare.co.kr/bbs/content.php?co_id=KNB_1030&me_code=1030&lang=ko">복지관에 이야기하기 <Icon name="arrow" /></a>
    </section>
  );
}

function ProgramCard({ program, matches, onClick }: { program: typeof programs[number]; matches: string[]; onClick: () => void }) {
  return (
    <article className="program-card">
      <div className="card-heading">
        <span className={`status ${program.status === "모집 예정" ? "upcoming" : ""}`}>{program.status}</span>
        <span className="cost">{program.cost}</span>
      </div>
      <h2>{program.title}</h2>
      <p className="intro">{program.intro}</p>
      <dl>
        <div><dt><Icon name="user" size={18} /><span className="sr-only">대상</span></dt><dd>{program.target}</dd></div>
        <div><dt><Icon name="time" size={18} /><span className="sr-only">시간</span></dt><dd>{program.schedule}</dd></div>
        <div><dt><Icon name="pin" size={18} /><span className="sr-only">장소</span></dt><dd>{program.place}</dd></div>
      </dl>
      <div className="reason"><strong>왜 추천했나요?</strong><div>{(matches.length ? matches : program.tags.slice(0, 1)).map((tag) => <span key={tag}>{tag}</span>)}</div></div>
      <PrimaryButton onClick={onClick}>자세히 보기 <Icon name="arrow" /></PrimaryButton>
    </article>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [large, setLarge] = useState(false);
  const [age, setAge] = useState("");
  const [interest, setInterest] = useState<string[]>([]);
  const [situation, setSituation] = useState<string[]>([]);
  const [selectedProgram, setSelectedProgram] = useState(programs[0]);
  const [suggestion, setSuggestion] = useState("");
  const [anonymous, setAnonymous] = useState(true);

  const score = (program: typeof programs[number]) => {
    const interestScore = interest.filter((item) => program.tags.includes(item)).length * 3;
    const situationScore = situation.filter((item) => program.tags.includes(item)).length * 2;
    return interestScore + situationScore + (program.status === "모집 중" ? 1 : 0);
  };
  const recommendations = useMemo(() => programs.filter((program) => !age || program.ages.includes(age)).sort((a, b) => score(b) - score(a)), [age, interest, situation]);
  const toggle = (value: string, list: string[], setter: (next: string[]) => void, max?: number) => {
    if (list.includes(value)) setter(list.filter((item) => item !== value));
    else if (!max || list.length < max) setter([...list, value]);
  };
  const selections = [age, ...interest, ...situation].filter(Boolean);
  const home = () => setScreen("home");

  let content: ReactNode;
  if (screen === "home") {
    content = (
      <main className="home-page">
        <PageTitle description="내 상황에 맞는 복지관 사업을 찾아 드려요" title="나에게 맞는 복지관" />
        <section className="hero-banner">
          <div className="hero-copy">
            <span className="eyebrow">로그인 없이 1분이면 충분해요</span>
            <h2>오늘의 나에게<br />맞는 시간을 찾아보세요.</h2>
            <p>나이와 관심사, 요즘의 생활을 골라 주세요.<br />함께할 수 있는 복지관 사업을 바로 알려 드려요.</p>
            <PrimaryButton onClick={() => setScreen("age")}>시작하기 <Icon name="arrow" /></PrimaryButton>
          </div>
          <div className="activity-art" role="img" aria-label="복지관에서 함께 배우고 이야기하는 주민들을 표현한 일러스트">
            <span className="sun" />
            <span className="person person-one"><i /><b /></span>
            <span className="person person-two"><i /><b /></span>
            <span className="table" />
            <span className="paper" />
          </div>
        </section>
        <section className="home-info" aria-label="서비스 특징">
          <div><b>01</b><strong>가볍게 선택해요</strong><span>개인정보를 받지 않아요</span></div>
          <div><b>02</b><strong>바로 확인해요</strong><span>세 번의 선택이면 충분해요</span></div>
          <div><b>03</b><strong>언제든 물어봐요</strong><span>전화와 방문 안내도 함께해요</span></div>
        </section>
      </main>
    );
  } else if (screen === "age") {
    content = <StepPage choices={ages} description="나를 위해 찾는다면 나의 시기를, 가족을 위해 찾는다면 가족의 시기를 골라 주세요." onBack={home} onNext={() => setScreen("interest")} onToggle={setAge} selected={age ? [age] : []} step={1} title="누구를 위해 찾고 계세요?" />;
  } else if (screen === "interest") {
    content = <StepPage choices={interests} description="지금 마음이 가는 것을 3개까지 골라 주세요." max={3} onBack={() => setScreen("age")} onNext={() => setScreen("situation")} onToggle={(value) => toggle(value, interest, setInterest, 3)} selected={interest} step={2} title="요즘 무엇에 관심이 있으세요?" />;
  } else if (screen === "situation") {
    content = <StepPage choices={situations} description="모두 선택 사항이에요. 해당하는 것이 없다면 바로 결과를 볼 수 있어요." onBack={() => setScreen("interest")} onNext={() => setScreen("results")} onToggle={(value) => value === "해당 없음" ? setSituation(["해당 없음"]) : toggle(value, situation.filter((item) => item !== "해당 없음"), setSituation)} selected={situation} step={3} title="요즘 어떤 시간을 보내고 계세요?" />;
  } else if (screen === "results") {
    content = (
      <main className="results-page">
        <PageTitle description="선택한 내용과 가까운 순서로 보여 드려요" title={`${age || "주민"}님을 위한 추천`} />
        <section className="summary">
          <div><strong>나의 선택</strong><div>{selections.map((item) => <span key={item}>{item}</span>)}</div></div>
          <button onClick={() => setScreen("age")}>선택 수정</button>
        </section>
        <div className="result-toolbar"><p><strong>{recommendations.length}개</strong>의 사업을 찾았어요</p><button onClick={() => navigator.clipboard?.writeText(window.location.href)}><Icon name="share" size={18} /> 결과 공유</button></div>
        <section className="card-grid">{recommendations.slice(0, 3).map((program) => <ProgramCard key={program.title} matches={program.tags.filter((tag) => [...interest, ...situation].includes(tag))} onClick={() => { setSelectedProgram(program); setScreen("detail"); }} program={program} />)}</section>
        <SuggestBanner />
        <button className="floating-suggest" onClick={() => setScreen("suggest")}><span>‹</span> 건의하기</button>
      </main>
    );
  } else if (screen === "detail") {
    content = (
      <main className="detail-page">
        <button className="back-button" onClick={() => setScreen("results")}><Icon name="back" size={18} /> 추천 결과</button>
        <div className="detail-visual" role="img" aria-label={`${selectedProgram.title} 활동 이미지 자리`}>
          <span /><div><Icon name="home" size={48} /></div>
        </div>
        <article className="detail-content">
          <span className="status">{selectedProgram.status}</span>
          <h1>{selectedProgram.title}</h1>
          <p className="detail-intro">{selectedProgram.intro}</p>
          <dl className="detail-facts">
            {[["대상", selectedProgram.target], ["시간", selectedProgram.schedule], ["장소", selectedProgram.place], ["비용", selectedProgram.cost], ["담당", "지역복지팀"]].map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}
          </dl>
          <section className="detail-description"><h2>이렇게 진행해요</h2><p>부담 없이 인사를 나누고 오늘의 활동을 함께 시작해요. 처음 오시는 분도 편안하게 참여할 수 있도록 담당자가 천천히 안내해 드립니다.</p></section>
          <div className="detail-actions"><a className="primary-button" href="tel:025640101"><Icon name="phone" /> 전화로 문의하기</a><PrimaryButton secondary onClick={() => alert("신청 페이지로 연결됩니다.")}>참여 신청하기</PrimaryButton></div>
        </article>
        <SuggestBanner />
        <button className="floating-suggest" onClick={() => setScreen("suggest")}><span>‹</span> 건의하기</button>
      </main>
    );
  } else if (screen === "suggest") {
    content = (
      <main className="form-page">
        <button className="back-button" onClick={() => setScreen("results")}><Icon name="back" size={18} /> 추천 결과</button>
        <PageTitle description="완성된 아이디어가 아니어도 괜찮아요" title="복지관에 이야기해 주세요" />
        <form onSubmit={(event) => { event.preventDefault(); setScreen("success"); }}>
          <div className="attached-selections"><strong>앞에서 선택한 내용</strong><p>선택값은 제안과 함께 전달되며, 아래 항목을 눌러 뺄 수 있어요.</p><div>{selections.map((item) => <button key={item} onClick={() => { if (item === age) setAge(""); else if (interest.includes(item)) setInterest(interest.filter((x) => x !== item)); else setSituation(situation.filter((x) => x !== item)); }} type="button">{item} <span>×</span></button>)}</div></div>
          <label htmlFor="suggestion">어떤 활동이 있으면 좋을까요? <b>필수</b></label>
          <textarea id="suggestion" onChange={(event) => setSuggestion(event.target.value)} placeholder="예: 주말에 이웃과 함께 요리하는 모임이 있으면 좋겠어요." required value={suggestion} />
          <label className="check-label"><input checked={anonymous} onChange={(event) => setAnonymous(event.target.checked)} type="checkbox" /><span>연락처 없이 익명으로 남길게요</span></label>
          {!anonymous && <><label htmlFor="phone">답변받을 연락처 <small>선택</small></label><input id="phone" inputMode="tel" placeholder="010-0000-0000" /></>}
          <p className="form-notice">보내 주신 이야기는 담당자가 확인하고 7일 안에 처리 안내를 드립니다. 제안이 바로 사업 개설로 이어지지 않을 수 있어요.</p>
          <PrimaryButton disabled={!suggestion.trim()} onClick={() => undefined}>이야기 전하기 <Icon name="arrow" /></PrimaryButton>
        </form>
      </main>
    );
  } else {
    content = (
      <main className="success-page">
        <div className="success-icon"><Icon name="check" size={40} /></div>
        <PageTitle description="보내 주신 제안은 담당자가 꼼꼼히 살펴볼게요" title="소중한 이야기를 잘 받았어요" />
        <div className="receipt"><span>접수번호</span><strong>GN-261012-042</strong><p>7일 안에 처리 안내를 드립니다.</p></div>
        <PrimaryButton onClick={home}>처음 화면으로</PrimaryButton>
      </main>
    );
  }

  return <div className={`app ${large ? "large-text" : ""}`}><Header large={large} onHome={home} onLarge={() => setLarge(!large)} />{content}<a aria-label="전화 문의 02-564-0101" className="phone-float" href="tel:025640101"><Icon name="phone" size={22} /><span>전화 문의</span></a></div>;
}
