export interface OperationalRoute {
  id: string;
  name: string;
  code: 'Group A' | 'Group B' | 'Group C' | 'Group D';
  color: string;
  commanders: string[];
  armyGroup: string;
  summary: string;
  path: [number, number][];
  waypoints: { name: string; lat: number; lng: number }[];
}

export interface MassacreSite {
  id: string;
  name: string;
  originalName: string;
  locationTitle: string;
  lat: number;
  lng: number;
  dateRange: string;
  exactDate: string;
  casualtiesConfirmed: number;
  casualtyDisplay: string;
  executionUnit: string;
  commandingOfficers: string;
  executionMethod: string;
  shortSummary: string;
  timelineStepId: number; // Step when this site occurred
  historicalQuote: {
    source: string;
    date: string;
    germanDocument: string;
    koreanTranslation: string;
  };
  contextNote: string;
  investigationDetails: string;
}

export interface TimelineStep {
  id: number;
  dateStr: string;
  displayDate: string;
  title: string;
  subtitle: string;
  militaryFront: string;
  description: string;
  activeMassacreIds: string[];
  cumulativeCasualties: number;
  cumulativeCasualtiesDisplay: string;
  routeProgressRatio: number; // 0.0 to 1.0 progress of the front
}

// 1. Einsatzgruppen Operational Routes
export const OPERATIONAL_ROUTES: OperationalRoute[] = [
  {
    id: 'group-a',
    name: '아인자츠그루페 A (Group A)',
    code: 'Group A',
    color: '#f59e0b', // Amber
    commanders: ['프란츠 발터 슈탈레커 (SS 여단지도자, 1942년 3월 전사)', '하인츠 요스트'],
    armyGroup: '북부 집단군 (Heeresgruppe Nord) 배속',
    summary: '발트 3국(리투아니아, 라트비아, 에스토니아)을 관통하여 레닌그라드 외곽까지 진격. 현지 민병대(리투아니아 민병대, 라트비아 아라이스 코만도)를 선동하여 대규모 학살을 가장 신속하게 체계화함.',
    path: [
      [54.700, 20.500], // 동프로이센 (쾨니히스베르크)
      [54.898, 23.903], // 카우나스
      [54.687, 25.279], // 빌뉴스
      [56.949, 24.105], // 리가
      [59.437, 24.753], // 탈린
      [59.733, 30.083], // 레닌그라드 축선 (푸시킨/크라스노예 셀로)
    ],
    waypoints: [
      { name: '동프로이센 출발기지', lat: 54.700, lng: 20.500 },
      { name: '카우나스 요새', lat: 54.898, lng: 23.903 },
      { name: '빌뉴스 포나리 축선', lat: 54.687, lng: 25.279 },
      { name: '리가 룸불라 축선', lat: 56.949, lng: 24.105 },
      { name: '탈린 진주선', lat: 59.437, lng: 24.753 },
      { name: '레닌그라드 봉쇄선', lat: 59.733, lng: 30.083 },
    ]
  },
  {
    id: 'group-b',
    name: '아인자츠그루페 B (Group B)',
    code: 'Group B',
    color: '#06b6d4', // Cyan
    commanders: ['아르투어 네베 (형사경찰국장, SS 소장)', '에리히 나우만'],
    armyGroup: '중앙 집단군 (Heeresgruppe Mitte) 배속',
    summary: '바르샤바를 거점으로 벨라루스 및 서부 러시아 중앙 축선을 따라 스몰렌스크를 거쳐 모스크바 접근선까지 전진. 유대인 박멸과 함께 반파르티잔 작전을 명목으로 수많은 촌락을 전소시킴.',
    path: [
      [52.229, 21.012], // 바르샤바 거점
      [53.132, 23.168], // 비아위스토크
      [53.904, 27.561], // 민스크
      [53.900, 30.333], // 모길료프
      [54.782, 32.045], // 스몰렌스크
      [55.500, 36.500], // 모스크바 접근선 (모자이스크 부근)
    ],
    waypoints: [
      { name: '바르샤바 사령부 거점', lat: 52.229, lng: 21.012 },
      { name: '비아위스토크 돌파선', lat: 53.132, lng: 23.168 },
      { name: '민스크 게토 축선', lat: 53.904, lng: 27.561 },
      { name: '모길료프 참호선', lat: 53.900, lng: 30.333 },
      { name: '스몰렌스크 본부', lat: 54.782, lng: 32.045 },
      { name: '모스크바 전진한계선', lat: 55.500, lng: 36.500 },
    ]
  },
  {
    id: 'group-c',
    name: '아인자츠그루페 C (Group C)',
    code: 'Group C',
    color: '#f43f5e', // Rose
    commanders: ['오토 라슈 (법학·정치학 이중 박사, SS 소장)', '막스 토마스 (의학 박사)'],
    armyGroup: '남부 집단군 (Heeresgruppe Süd) 배속',
    summary: '상레지아에서 갈리시아를 거쳐 우크라이나 중북부 평원을 횡단. 키이우 바비 야르와 하르키우 드로비츠키 야르 등 역사상 가장 밀도 높은 총살 및 가스차 학살을 집행함.',
    path: [
      [50.264, 19.023], // 상레지아 (카토비체 축선)
      [49.839, 24.029], // 르비우
      [50.254, 28.658], // 지토미르
      [50.450, 30.523], // 키이우
      [49.588, 34.551], // 폴타바
      [49.993, 36.230], // 하르키우
    ],
    waypoints: [
      { name: '상레지아 집결지', lat: 50.264, lng: 19.023 },
      { name: '르비우 점령지', lat: 49.839, lng: 24.029 },
      { name: '지토미르 야전지령부', lat: 50.254, lng: 28.658 },
      { name: '키이우 바비 야르 축선', lat: 50.450, lng: 30.523 },
      { name: '폴타바 통과선', lat: 49.588, lng: 34.551 },
      { name: '하르키우 공업지구선', lat: 49.993, lng: 36.230 },
    ]
  },
  {
    id: 'group-d',
    name: '아인자츠그루페 D (Group D)',
    code: 'Group D',
    color: '#c084fc', // Purple
    commanders: ['오토 올렌도르프 (경제학·법학 박사, SS 소장, 뉘른베르크 사형)', '발터 비어캄프'],
    armyGroup: '제11군 (11. Armee) 배속',
    summary: '루마니아 국경에서 출발하여 몰도바, 남부 우크라이나, 크림 반도를 거쳐 코카서스 유전 지대까지 진격. 오토 올렌도르프의 지휘 아래 지적이고 군사적인 정당화를 앞세워 크림차크 및 집시까지 무차별 학살.',
    path: [
      [46.928, 26.370], // 피아트라네암츠 (루마니아 출발)
      [47.010, 28.863], // 키시너우 (베사라비아)
      [46.975, 31.994], // 미콜라이우
      [44.952, 34.102], // 심페로폴 (크림 반도)
      [44.616, 33.525], // 세바스토폴
      [45.035, 38.974], // 크라스노다르 (북카프카스 진입선)
    ],
    waypoints: [
      { name: '피아트라네암츠 출발기지', lat: 46.928, lng: 26.370 },
      { name: '키시너우 진주지', lat: 47.010, lng: 28.863 },
      { name: '미콜라이우 해군항', lat: 46.975, lng: 31.994 },
      { name: '심페로폴 크림사령부', lat: 44.952, lng: 34.102 },
      { name: '세바스토폴 항구선', lat: 44.616, lng: 33.525 },
      { name: '크라스노다르 코카서스 축선', lat: 45.035, lng: 38.974 },
    ]
  }
];

// 2. Major Massacre Pins (Pulsating Custom Markers)
export const MASSACRE_SITES: MassacreSite[] = [
  {
    id: 'babi-yar',
    name: '바비 야르 대참살',
    originalName: 'Babi Yar (Бабин Яр)',
    locationTitle: '우크라이나 키이우 북서부 협곡',
    lat: 50.471,
    lng: 30.474,
    dateRange: '1941.09.29 – 09.30',
    exactDate: '1941년 9월 29일 ~ 30일 (단 이틀간)',
    casualtiesConfirmed: 33771,
    casualtyDisplay: '33,771명 (초기 36시간 공식 보고)',
    executionUnit: '아인자츠그루페 C 소속 존더코만도 4a (Sonderkommando 4a)',
    commandingOfficers: '파울 블로벨 (SS 대령), 프리드리히 예켈른 (남부 SS 및 경찰지도자)',
    executionMethod: '협곡 단애 집단 총살 및 시신 층상 매장 (Sardinenpackung 변형)',
    shortSummary: '키이우 함락 직후 단 이틀 만에 33,771명의 민간인을 깊은 협곡으로 몰아넣고 기관총으로 학살한 홀로코스트 최대 단일 작전 중 하나.',
    timelineStepId: 3,
    historicalQuote: {
      source: '나치 보안경찰 및 보안국 작전 보고서 제106호 (Ereignismeldung UdSSR Nr. 106)',
      date: '1941년 10월 7일 베를린 접수',
      germanDocument: 'Sonderkommando 4a hat in Zusammenarbeit mit dem Gruppenstabe und 2 Kommandos des Polizei-Regiments Süd am 29. und 30. 9. 41 in Kiew 33.771 Juden exekutiert. Geld, Wertsachen, Wäsche und Kleidungsstücke wurden sichergestellt...',
      koreanTranslation: '“존더코만도 4a는 아인자츠그루페 지휘부 및 남부 경찰연대 2개 코만도와의 긴밀한 공조 하에 1941년 9월 29일과 30일 이틀 동안 키이우에서 총 33,771명의 유대인을 처형 완료하였다. 몰수된 현금, 귀중품, 속옷 및 의복 일체는 국가사회주의 인민복지기구(NSV)에 인계되었다.”'
    },
    contextNote: '키이우 점령 후 소련 내무인민위원부(NKVD)의 지연 폭파로 시내 건물이 파괴되자, 이를 유대인의 파괴공작으로 조작하여 시내 전역에 “모든 유대인은 귀중품과 따뜻한 옷을 지참하여 지정된 공동묘지 인근으로 집결하라. 불응 시 사형”이라는 포고문을 게시했습니다. 모인 사람들은 옷을 모두 벗긴 뒤 협곡 안쪽으로 끌려가 차례로 사살당했습니다.',
    investigationDetails: '1943년 가을, 소련 붉은 군대가 키이우로 다가오자 주동자 파울 블로벨은 ‘1005 작전’의 일환으로 시신 발굴 소각을 명령했습니다. 수감자들은 밤낮으로 썩은 시신을 파내어 불태웠으며, 유골 가루는 분쇄기로 갈아 강물에 버려졌습니다.'
  },
  {
    id: 'ponary',
    name: '포나리 숲 대학살',
    originalName: 'Ponary Massacre (Paneriai)',
    locationTitle: '리투아니아 빌뉴스 서남쪽 10km 포나리 숲',
    lat: 54.626,
    lng: 25.161,
    dateRange: '1941.07 – 1943.11',
    exactDate: '1941년 7월 ~ 1943년 11월 (지속 집행)',
    casualtiesConfirmed: 100000,
    casualtyDisplay: '약 100,000명 (유대인 70,000명, 폴란드 지식인 및 소련 포로 30,000명)',
    executionUnit: '아인자츠그루페 A 소속 아인자츠코만도 9/3 및 리투아니아 특수부대(Ypatingasis būrys)',
    commandingOfficers: '프란츠 발터 슈탈레커, 카를 예거 (SS 표준대장)',
    executionMethod: '원형 유류 저장 구덩이 총살 및 화장',
    shortSummary: '소련군이 건설하다 중단한 지름 수십 미터의 원형 거대 유류 탱크 굴착 구덩이를 학살장으로 전용하여 약 10만 명을 체계적으로 살해.',
    timelineStepId: 1,
    historicalQuote: {
      source: '예거 보고서 (Jäger-Report, 종합 학살 결산)',
      date: '1941년 12월 1일 카우나스 작성',
      germanDocument: 'Ich kann heute feststellen, daß das Ziel, das Judenproblem für Litauen zu lösen, vom Einsatzkommando 3 erreicht worden ist. In Litauen gibt es keine Juden mehr, außer den Arbeitsjuden und ihren Familien.',
      koreanTranslation: '“본관은 오늘 아인자츠코만도 3에 의해 리투아니아의 유대인 문제가 최종적으로 해결되었음을 선언한다. 이제 리투아니아에는 강제 노동 인력과 그들의 가족을 제외하고는 단 한 명의 유대인도 존재하지 않는다.”'
    },
    contextNote: '‘북방의 예루살렘’이라 불릴 정도로 찬란한 유대 문화의 중심지였던 빌뉴스는 점령 직후 순식간에 게토로 봉쇄되었고, 남녀노소 주민들은 소총 개머리판에 맞으며 기차와 도보로 포나리 숲으로 끌려갔습니다. 현지 협력 부대원들은 하루 수천 명씩 구덩이 가장자리에 세우고 일제 사격을 가했습니다.',
    investigationDetails: '1943년 말, 나치는 시신 은폐를 위해 80명의 유대인 수감자로 구성된 ‘소각 특수대(Brandkommando)’를 구성해 시신을 파내어 소각하게 했습니다. 이 수감자들은 숟가락과 손톱으로 3개월간 지하 비밀 탈출 터널을 뚫어 1944년 4월 15일 밤 집단 탈출을 감행했고, 극소수의 생존자가 전 세계에 포나리의 실상을 증언했습니다.'
  },
  {
    id: 'rumbula',
    name: '룸불라 숲 학살',
    originalName: 'Rumbula Massacre',
    locationTitle: '라트비아 리가 남동쪽 12km 룸불라 소나무 숲',
    lat: 56.883,
    lng: 24.233,
    dateRange: '1941.11.30 – 12.08',
    exactDate: '1941년 11월 30일 및 12월 8일 (이틀간 작전)',
    casualtiesConfirmed: 25000,
    casualtyDisplay: '약 25,000명 (리가 게토 주민 24,000명 + 독일 본토 추방자 1,000명)',
    executionUnit: '아인자츠그루페 A, 예켈른 직속 친위대 및 라트비아 아라이스 코만도',
    commandingOfficers: '프리드리히 예켈른 (친위대 상급집단지도자), 빅토르스 아라이스',
    executionMethod: '‘정어리 통조림(Sardinenpackung)’ 공법의 계단식 직결 총살',
    shortSummary: '친위대 장군 프리드리히 예켈른이 고안한 극도의 공간 최적화 총살 기법을 적용하여 숲속 6개의 대형 구덩이에 시신을 층층이 매장함.',
    timelineStepId: 5,
    historicalQuote: {
      source: '나치 작전 보고서 제155호 (Ereignismeldung UdSSR Nr. 155)',
      date: '1942년 1월 11일 베를린 접수',
      germanDocument: 'In Riga wurden im Zuge von zwei Großaktionen am 30. 11. und 8. 12. 1941 insgesamt 25.000 Juden liquidiert, um Platz für die aus dem Reichsgebiet eintreffenden Transporte zu schaffen...',
      koreanTranslation: '“리가에서는 1941년 11월 30일과 12월 8일 두 차례의 대규모 작전을 통하여 총 25,000명의 유대인이 청산되었다. 이는 제국 본토로부터 속속 도착하는 이송 수송대를 수용하기 위한 공간 확보 조치였다.”'
    },
    contextNote: '독일 본토(베를린, 함부르크, 쾰른 등)에서 강제 이송되는 서유럽 유대인들을 수용할 숙소가 부족하다는 이유로, 하인리히 힘러는 리가 게토의 원주민 유대인들을 “청소하라”고 명령했습니다. 영하의 혹한 속에 주민들은 10km의 얼어붙은 길을 맨발과 잠옷 차림으로 걸어 룸불라 숲으로 행진해야 했습니다.',
    investigationDetails: '예켈른은 구덩이 파는 데 걸리는 노동력을 아끼기 위해 희생자들에게 스스로 구덩이 안으로 걸어 들어가 이미 사살된 사람들의 시신 위에 엎드리도록 강요한 후, 정수리에 한 발씩 사격하는 잔혹한 공학적 수법을 자랑스럽게 운용했습니다.'
  },
  {
    id: 'kamianets',
    name: '카미야네츠-포딜스키 대학살',
    originalName: 'Kamianets-Podilskyi Massacre',
    locationTitle: '우크라이나 서부 흐멜니츠키주 카미야네츠-포딜스키 탄약고 공터',
    lat: 48.683,
    lng: 26.583,
    dateRange: '1941.08.27 – 08.28',
    exactDate: '1941년 8월 27일 ~ 28일',
    casualtiesConfirmed: 23600,
    casualtyDisplay: '23,600명 (하루 희생자 최초 2만 명 돌파)',
    executionUnit: '아인자츠그루페 C 및 남부 SS 경찰대대 320, 예켈른 참모진',
    commandingOfficers: '프리드리히 예켈른 (남부 SS 및 경찰지도자)',
    executionMethod: '폭파된 탄약고 참호 집단 총살 및 수류탄 투척',
    shortSummary: '헝가리 정부가 국경 너머로 추방한 무국적 난민들을 처리하기 위해 자행된 홀로코스트 최초의 2만 명 단위 초고속 학살.',
    timelineStepId: 2,
    historicalQuote: {
      source: '나치 작전 보고서 제80호 (Ereignismeldung UdSSR Nr. 80)',
      date: '1941년 9월 11일',
      germanDocument: 'Kamenetz-Podolsk: Bei einer Aktion des HSSPF wurden an drei Tagen 23.600 Juden erschossen. Damit ist die Frage der ungarischen Grenzübergänger vorerst bereinigt.',
      koreanTranslation: '“카미야네츠-포딜스키: 고위 SS 및 경찰지도자(HSSPF)의 주관 작전으로 사흘에 걸쳐 23,600명의 유대인이 총살되었다. 이로써 헝가리 국경 월경자 문제는 완전히 해결되었다.”'
    },
    contextNote: '헝가리 왕국이 자국 내 외국 국적 또는 무국적 유대인들을 독일 점령하의 우크라이나로 일방 추방하자, 현지 독일 군정 당국은 식량 부족과 수용 불가 불만을 터뜨렸습니다. 이에 프리드리히 예켈른은 “전원 사살하여 국경 문제를 말끔히 정리하겠다”고 자원하여 이틀 만에 2만 3천여 명을 탄약고 폐허 참호에서 사살했습니다.',
    investigationDetails: '이 사건은 나치 지도부가 “이동 학살(Mass murder by bullet)”을 통해 하룻밤 사이에 대규모 인구를 완전히 소멸시킬 수 있음을 입증한 중대한 전환점으로 기록됩니다.'
  },
  {
    id: 'simferopol',
    name: '심페로폴 참호 학살',
    originalName: 'Simferopol Massacre',
    locationTitle: '크림 반도 심페로폴 페오도시야 고속도로 10km 지점 대전차 참호',
    lat: 44.952,
    lng: 34.102,
    dateRange: '1941.12.09 – 12.13',
    exactDate: '1941년 12월 9일 ~ 13일',
    casualtiesConfirmed: 14000,
    casualtyDisplay: '약 14,000명 (유대인, 크림차크, 로마인 민간인)',
    executionUnit: '아인자츠그루페 D 및 존더코만도 11b (Sonderkommando 11b)',
    commandingOfficers: '오토 올렌도르프 (SS 소장, 법학·경제학 박사)',
    executionMethod: '소련군 대전차 방어 참호를 활용한 연속 소총 처형',
    shortSummary: '경제학자 출신 사령관 오토 올렌도르프가 군사적 배후 안전을 구실로 참호에서 여성과 어린이까지 체계적으로 말살한 현장.',
    timelineStepId: 5,
    historicalQuote: {
      source: '뉘른베르크 재판 피고인 오토 올렌도르프의 실제 법정 증언 (Case 9)',
      date: '1947년 10월 뉘른베르크',
      germanDocument: 'Ich hielt die Erschießung von Frauen und Kindern für militärisch notwendig, weil wir wussten, dass Kinder zu Rächern heranwachsen würden. Es geschah diszipliniert und ohne Exzesse...',
      koreanTranslation: '“여성과 어린이를 사살하는 것은 군사적으로 불가피하다고 판단했습니다. 아이들이 자라면 독일군에게 복수할 적이 될 것이기 때문입니다. 모든 처형은 엄격한 군사적 규율 하에 감정적 잔혹 행위 없이 차분하게 집행되었습니다.”'
    },
    contextNote: '올렌도르프는 심페로폴 시내에 등록소를 설치하고 가옥 수탈을 마친 후, 민간인들을 트럭에 태워 외곽의 대전차 참호로 이동시켰습니다. 그는 처형 대원들의 심리적 동요를 방지한다며 대원 2명이 희생자 1명의 심장과 머리를 동시에 쏘도록 지침을 내리는 등 살인을 극도로 규격화했습니다.',
    investigationDetails: '올렌도르프는 뉘른베르크 재판정에서 자신의 죄를 단 한 번도 뉘우치지 않았으며, “국가의 합법적 최고 지도자의 명령을 수행했을 뿐”이라고 항변하다 1951년 란츠베르크 교도소에서 교수형에 처해졌습니다.'
  },
  {
    id: 'drobitsky-yar',
    name: '드로비츠키 야르 참극',
    originalName: 'Drobitsky Yar (Дробицький Яр)',
    locationTitle: '우크라이나 하르키우 동남쪽 협곡 계곡',
    lat: 49.933,
    lng: 36.417,
    dateRange: '1941.12 – 1942.01',
    exactDate: '1941년 12월 14일 ~ 1942년 1월',
    casualtiesConfirmed: 16000,
    casualtyDisplay: '약 16,000명 (가스차 집중 투입)',
    executionUnit: '아인자츠그루페 C 소속 존더코만도 4a',
    commandingOfficers: '파울 블로벨 (SS 대령)',
    executionMethod: '이동식 밀폐 가스차(Gaswagen) 및 동토 협곡 총살',
    shortSummary: '영하 20도가 넘는 혹한으로 땅이 얼어붙자 배기가스를 차실 안으로 유입시키는 살인 트럭(Gas Van)을 대규모로 도입한 전환기 학살.',
    timelineStepId: 6,
    historicalQuote: {
      source: '나치 작전 보고서 제164호 (Ereignismeldung UdSSR Nr. 164)',
      date: '1942년 2월 4일 베를린 접수',
      germanDocument: 'Die Evakuierung des jüdischen Wohnviertels in Charkow ist abgeschlossen. Durch den Einsatz von Spezialwagen konnte die Exekution auch bei extremer Bodenfrostung reibungslos durchgeführt werden.',
      koreanTranslation: '“하르키우 유대인 거주 구역의 소개 작업이 완수되었다. 극심한 지면 동결 상태에서도 특수 차량(Spezialwagen, 가스차)의 투입으로 인해 처형 작업이 아무런 지체 없이 원활하게 진행될 수 있었다.”'
    },
    contextNote: '1941년 겨울 하르키우는 혹한으로 얼어붙어 구덩이를 파는 데 다이너마이트까지 동원해야 했습니다. 총살 대원들의 정신적 피로와 사격 거부 현상이 나타나자, 베를린 보안본부는 배기가스 파이프를 적재함 내부로 연결한 밀폐형 다이아몬드 T 트럭(가스차)을 하르키우에 긴급 배치하여 수송 도중 질식사시키는 방식을 가동했습니다.',
    investigationDetails: '드로비츠키 야르는 이동식 가스차 시험 운영을 거쳐 아우슈비츠, 헬름노, 트레블링카 등 고정식 가스실 산업화로 진화해 나가는 절멸 수용소 체제의 직접적인 기술적 징검다리가 되었습니다.'
  },
  {
    id: 'odessa',
    name: '오데사 흑해 대학살',
    originalName: 'Odessa Massacre',
    locationTitle: '우크라이나 오데사 달니크(Dalnyk) 화약고 및 군용 창고 지구',
    lat: 46.482,
    lng: 30.723,
    dateRange: '1941.10.22 – 10.24',
    exactDate: '1941년 10월 22일 ~ 24일',
    casualtiesConfirmed: 34000,
    casualtyDisplay: '약 34,000명 (점령 전 기간 동안 10만 명 이상)',
    executionUnit: '아인자츠그루페 D 및 루마니아 왕국군 제10보병사단 공조',
    commandingOfficers: '이온 안토네스쿠 (루마니아 독재자), 니콜라에 마치치 장군',
    executionMethod: '창고 감금 후 석유 방화, 포병 직사 및 대공 기관총 난사',
    shortSummary: '오데사 주둔 사령부 폭파 사건에 대한 보복으로 수만 명의 민간인을 항만 창고 9개 동에 몰아넣고 통째로 소각 살해함.',
    timelineStepId: 4,
    historicalQuote: {
      source: '루마니아 육군 사령부 전보 및 아인자츠그루페 D 합동 보고',
      date: '1941년 10월 23일',
      germanDocument: 'General Antonescu befahl die sofortige Repressalie: Für jeden getöteten Offizier 200 Juden, für jeden Soldaten 100 Juden zu liquidieren. Die Lagerhäuser bei Dalnik wurden in Brand gesteckt.',
      koreanTranslation: '“안토네스쿠 장군은 즉각적인 보복을 명령했다: 전사한 장교 1명당 200명, 사병 1명당 100명의 유대인을 사살할 것. 달니크 인근의 창고 시설에 집결시킨 후 일제히 방화 조치하였다.”'
    },
    contextNote: '흑해의 진주라 불리던 오데사를 점령한 지 며칠 만에 사령부 건물에 매설된 소련군 시한폭탄이 폭발하자, 독일군과 루마니아군은 광기에 휩싸여 시내 가로등과 발코니마다 민간인을 목매달았습니다. 이후 3만 명이 넘는 이들을 외곽 군 창고로 끌고 가 문을 걸어 잠그고 가솔린을 부어 생지옥을 만들었습니다.',
    investigationDetails: '도망쳐 나오는 사람들에게는 창문에 거치된 기관총 난사가 가해졌으며, 창고 하나가 완전히 불타 재가 될 때까지 포병 포격이 계속되었습니다. 전후 루마니아 전범재판에서 핵심 책임자 마치치는 사형 선고를 받았습니다.'
  }
];

// 3. Sequential 10-Step Timeline (1941.06 to 1943.12)
export const TIMELINE_STEPS: TimelineStep[] = [
  {
    id: 0,
    dateStr: '1941.06',
    displayDate: '1941년 6월',
    title: '바르바로사 작전 개시 (Operation Barbarossa)',
    subtitle: '국가적 섬멸전 선포와 아인자츠그루펜 4개 특수임무부대 창설',
    militaryFront: '독일 국방군 300만 대군, 소련 국경 전면 침공 (북부·중앙·남부 3개 축선)',
    description: '1941년 6월 22일 새벽, 나치 독일은 불가침조약을 파기하고 소련을 기습 공격했습니다. 라인하르트 하이드리히의 지휘 아래 친위대(SS), 보안경찰(Sipo), 게슈타포 엘리트 정예 3,000여 명으로 편성된 아인자츠그루펜 A·B·C·D 4개 부대가 육군 부대 바로 뒤를 따라 동유럽으로 진입했습니다. 이들의 임무는 후방 치안이 아닌, 공산주의 정권 간부와 유대인 민간인의 조직적 ‘제거’였습니다.',
    activeMassacreIds: [],
    cumulativeCasualties: 12500,
    cumulativeCasualtiesDisplay: '12,500명 (국경선 초기 처형)',
    routeProgressRatio: 0.10,
  },
  {
    id: 1,
    dateStr: '1941.07',
    displayDate: '1941년 7월',
    title: '발트 3국 진입 & 포나리 숲 학살 개시',
    subtitle: 'Group A의 발트 점령과 현지 민병대 동원 포그롬 촉발',
    militaryFront: '북부 집단군, 리투아니아와 라트비아 주요 거점 장악',
    description: 'Group A(슈탈레커)는 카우나스와 빌뉴스에 진입하여 리투아니아 극우 민병대를 부추겨 유대인 주민에 대한 잔혹한 사적 린치와 포그롬을 유도했습니다. 곧이어 친위대 특수부대는 소련군이 남긴 포나리 숲의 원형 연료 구덩이들을 대량 학살장으로 개조하여 빌뉴스 게토 주민들을 매일 수천 명씩 끌고 가 사살하기 시작했습니다.',
    activeMassacreIds: ['ponary'],
    cumulativeCasualties: 85000,
    cumulativeCasualtiesDisplay: '약 85,000명 돌파',
    routeProgressRatio: 0.22,
  },
  {
    id: 2,
    dateStr: '1941.08',
    displayDate: '1941년 8월',
    title: '카미야네츠-포딜스키 2만 명 초고속 학살',
    subtitle: '일일 학살 규모 2만 명 돌파: 헝가리 추방 난민 대상 집단 총살',
    militaryFront: '서부 우크라이나 갈리시아 함락, 키이우 포위망 형성 착수',
    description: '헝가리 정부가 국적 없는 유대인들을 독일 점령지로 강제 추방하자, 남부 SS 및 경찰지도자 프리드리히 예켈른은 보급과 식량 문제를 빌미로 단 사흘 만에 23,600명을 사살했습니다. 홀로코스트 역사상 단일 작전으로 하루에 2만 명 이상이 살해된 최초의 사례였으며, 나치는 이동 총살 부대의 무제한적 파괴력을 확신하게 되었습니다.',
    activeMassacreIds: ['ponary', 'kamianets'],
    cumulativeCasualties: 220000,
    cumulativeCasualtiesDisplay: '약 220,000명 돌파',
    routeProgressRatio: 0.35,
  },
  {
    id: 3,
    dateStr: '1941.09',
    displayDate: '1941년 9월',
    title: '키이우 함락 & 바비 야르 대협곡의 비극',
    subtitle: '단 36시간 만에 33,771명 사살: 역사상 가장 밀도 높은 총살 작전',
    militaryFront: '키이우 거대 포위전 종결, 소련군 60만 포로 발생',
    description: '키이우를 점령한 나치는 시내 폭파 사건을 구실로 포고문을 붙여 유대인들을 집결시켰습니다. 존더코만도 4a와 보조 경찰들은 남녀노소 33,771명을 바비 야르 계곡으로 몰아넣고 옷을 벗긴 뒤 협곡 바닥에 눕혀 기관총으로 난사했습니다. 시신들은 산 채로 흙 속에 묻혔으며, 피로 물든 대지는 며칠 동안 꿈틀거렸다고 증언됩니다.',
    activeMassacreIds: ['ponary', 'kamianets', 'babi-yar'],
    cumulativeCasualties: 395000,
    cumulativeCasualtiesDisplay: '약 395,000명 돌파',
    routeProgressRatio: 0.48,
  },
  {
    id: 4,
    dateStr: '1941.10',
    displayDate: '1941년 10월',
    title: '오데사 흑해 연안 대학살',
    subtitle: '사령부 폭파 보복을 빌미로 군용 창고에 3만 명 이상 감금 방화',
    militaryFront: '모스크바 태풍 작전 개시 및 크림 반도 진입로 개척',
    description: '흑해 항구도시 오데사를 점령한 루마니아군과 아인자츠그루페 D는 사령부 폭파 사건에 대한 보복으로 시내에서 수천 명을 가로수에 매달았고, 34,000여 명의 유대인을 달니크 외곽 화약고와 창고에 가둔 채 불을 질렀습니다. 탈출하려는 민간인들에게는 기관총과 야포 사격이 가해져 전원이 잿더미 속에 산화했습니다.',
    activeMassacreIds: ['ponary', 'kamianets', 'babi-yar', 'odessa'],
    cumulativeCasualties: 580000,
    cumulativeCasualtiesDisplay: '약 580,000명 돌파',
    routeProgressRatio: 0.58,
  },
  {
    id: 5,
    dateStr: '1941.11 – 12',
    displayDate: '1941년 11월~12월',
    title: '룸불라 숲 & 심페로폴 참호 학살',
    subtitle: '예켈른의 ‘정어리 통조림’ 공법과 경제학자 올렌도르프의 참호 학살',
    militaryFront: '모스크바 문전 독일군 혹한 정체, 동계 반격 직면',
    description: '리가에서는 제국 본토 유대인을 수용할 공간을 만든다는 이유로 룸불라 숲에서 25,000명이 이틀 만에 계단식으로 사살되었습니다. 같은 시기 크림 반도 심페로폴에서는 경제학 박사 오토 올렌도르프가 이끄는 Group D가 대전차 참호에서 14,000명을 군사적 안보를 구실로 체계적으로 총살했습니다.',
    activeMassacreIds: ['ponary', 'kamianets', 'babi-yar', 'odessa', 'rumbula', 'simferopol'],
    cumulativeCasualties: 790000,
    cumulativeCasualtiesDisplay: '약 790,000명 돌파',
    routeProgressRatio: 0.70,
  },
  {
    id: 6,
    dateStr: '1942.01',
    displayDate: '1942년 1월',
    title: '반제 회의 & 드로비츠키 야르 가스차 투입',
    subtitle: '‘유대인 문제의 최종 해결책’ 체계화와 살인의 산업적 기계화',
    militaryFront: '모스크바 공방전 패퇴로 인한 전선 교착 및 후방 보안 강화',
    description: '1942년 1월 20일 베를린 교외 반제(Wannsee)에서 유럽 유대인 1,100만 명을 체계적으로 절멸하기 위한 차관급 회의가 열렸습니다. 한편 우크라이나 하르키우의 드로비츠키 야르에서는 혹한기 총살의 한계를 극복하고 대원들의 심리적 동요를 덜기 위해 배기가스를 이용한 밀폐 살인 트럭(가스차)이 집중 운용되기 시작했습니다.',
    activeMassacreIds: ['ponary', 'kamianets', 'babi-yar', 'odessa', 'rumbula', 'simferopol', 'drobitsky-yar'],
    cumulativeCasualties: 980000,
    cumulativeCasualtiesDisplay: '약 980,000명 돌파 (100만 육박)',
    routeProgressRatio: 0.80,
  },
  {
    id: 7,
    dateStr: '1942.07 – 12',
    displayDate: '1942년 하반기',
    title: '청색 작전 (Fall Blau) & 카프카스 진출',
    subtitle: '남부 유전 지대 전진과 후방 게토 및 촌락의 완전한 절멸',
    militaryFront: '스탈린그라드 공방전 개시 및 코카서스 유전 침투',
    description: '히틀러의 하계 공세에 발맞추어 아인자츠그루펜은 볼가 강과 코카서스 산맥 부근까지 이동했습니다. 벨라루스와 우크라이나 잔여 게토들이 일제히 정리되었고, 고정식 절멸 수용소(트레블링카, 소비보르, 아우슈비츠-비르케나우)로의 대규모 열차 수송과 야전 현장 총살이 병행되어 희생자는 기하급수적으로 폭증했습니다.',
    activeMassacreIds: ['ponary', 'kamianets', 'babi-yar', 'odessa', 'rumbula', 'simferopol', 'drobitsky-yar'],
    cumulativeCasualties: 1350000,
    cumulativeCasualtiesDisplay: '약 1,350,000명 추산',
    routeProgressRatio: 0.90,
  },
  {
    id: 8,
    dateStr: '1943.02 – 07',
    displayDate: '1943년 상반기',
    title: '스탈린그라드 참패와 전선의 붕괴',
    subtitle: '독일 제6군의 항복과 나치의 후퇴, 증거 인멸의 준비',
    militaryFront: '스탈린그라드에서 독일군 완패, 붉은 군대의 대대적 서진 반격',
    description: '1943년 2월 파울루스 원수의 제6군이 스탈린그라드에서 궤멸되면서 동부 전선의 형세는 완전히 역전되었습니다. 소련 붉은 군대가 파죽지세로 우크라이나와 서부 러시아를 수복하기 시작하자, 하인리히 힘러는 동유럽 전역에 남겨진 수천 개의 대형 암매장 구덩이와 학살 증거가 연합군에게 발각될 것을 극도로 두려워하기 시작했습니다.',
    activeMassacreIds: ['ponary', 'kamianets', 'babi-yar', 'odessa', 'rumbula', 'simferopol', 'drobitsky-yar'],
    cumulativeCasualties: 1470000,
    cumulativeCasualtiesDisplay: '약 1,470,000명',
    routeProgressRatio: 0.96,
  },
  {
    id: 9,
    dateStr: '1943.08 – 12',
    displayDate: '1943년 가을~겨울',
    title: '1005 작전 (Aktion 1005): 거대한 증거 인멸',
    subtitle: '시신을 파내어 소각하고 뼈를 갈다: 국가적 범죄 은폐와 최종 심판의 서막',
    militaryFront: '쿠르스크 기갑전 패배 이후 독일군의 전면적 패퇴 및 드네프르 강 방어선 붕괴',
    description: '바비 야르의 학살 지휘관 파울 블로벨(Paul Blobel)이 특별 임무를 맡아 ‘1005 작전’을 총괄했습니다. 유대인 수감자들을 쇠사슬로 묶어 이미 부패한 시신 100만 구 이상을 파내게 한 뒤, 철도 레일 위에 장작과 함께 쌓아 석유를 붓고 태웠습니다. 남은 뼛가루는 뼈 분쇄기로 갈아 강에 버렸으며, 작업이 끝난 수감자들은 전원 사살되었습니다. 그러나 대지의 기억은 지워지지 않았습니다.',
    activeMassacreIds: ['ponary', 'kamianets', 'babi-yar', 'odessa', 'rumbula', 'simferopol', 'drobitsky-yar'],
    cumulativeCasualties: 1500000,
    cumulativeCasualtiesDisplay: '총 150만 ~ 200만 명 (추정 전모)',
    routeProgressRatio: 1.0,
  }
];

// 4. Banality of Evil Analytical Data
export const BANALITY_EDITORIAL = {
  quote: {
    korean: '“그에게는 단순한 생각의 무능(사유의 부재, Thoughtlessness) 외에는 어떠한 동기도 없었다... 그는 결코 악마적인 악인(이아고나 맥베스)이 아니었다. 그의 유일한 특성은 자신이 무엇을 하고 있는지 전혀 깨닫지 못하는 순전한 무사유였다.”',
    source: '한나 아렌트 (Hannah Arendt), 『예루살렘의 아이히만: 악의 평범성에 관한 보고』 (1963)',
    german: '“Er hatte keine Motive, außer einer ganz außergewöhnlichen Gedankenlosigkeit... Es war reine Gedankenlosigkeit, die ihn dafür prädestinierte, einer der größten Verbrecher jener Zeit zu werden.”'
  },
  cards: [
    {
      id: 'language-rules',
      number: '01',
      title: '관료제적 기계화와 언어 규칙',
      subtitle: 'Sprachregelung: 행정적 은어로 양심의 감각을 마비시키다',
      icon: 'FileText',
      content: `나치 관료 기구에서 '살인(Morden)'이나 '학살(Massaker)'이라는 단어는 공문서에서 철저히 금기시되었습니다. 대신 사용된 단어들은 '특별 처리(Sonderbehandlung)', '소개(Evakuierung)', '청소 및 정화(Säuberungsaktion)', '유대인 거주지 재정비' 같은 메마른 행정 용어였습니다.\n\n이러한 언어 규칙은 가해자들의 심리적 장벽을 완벽하게 무너뜨렸습니다. 그들은 자신이 인간의 생명을 빼앗는 범죄를 저지르는 것이 아니라, "상부의 방침에 따라 이주와 위생 문제를 처리하는 성실한 공무원"이라는 자기기만에 안주할 수 있었습니다. 서류상의 수치와 도표 뒤에 구체적인 인간의 얼굴을 지워버리는 관료제의 기계적 차가움은 악을 일상적인 사무로 둔갑시켰습니다.`
    },
    {
      id: 'inability-to-think',
      number: '02',
      title: '타인의 관점에서 생각하기의 무능',
      subtitle: 'Inability to Think: 상투어의 감옥에 갇혀 공감을 상실한 인간',
      icon: 'HeartOff',
      content: `한나 아렌트는 재판정의 아이히만을 관찰하며 그가 끊임없이 공허한 상투어(cliché)와 관용구만을 앵무새처럼 되풀이하고 있음에 주목했습니다. 그는 자신의 언어로 말할 줄 몰랐고, 정형화된 조직의 언어 뒤로 숨었습니다.\n\n아렌트는 이를 "타인의 관점에서 서서 세계를 바라보는 능력의 완전한 파탄"으로 규정했습니다. 피해자들이 겪는 공포, 영하 20도의 눈밭에서 발가벗겨진 채 참호로 걸어 들어가는 어머니와 아이의 고통을 단 1초도 상상하지 못하는 정서적 마비 상태였습니다. 사유의 부재는 필연적으로 공감의 부재를 낳고, 공감의 부재는 무제한의 파괴로 이어졌습니다.`
    },
    {
      id: 'warning-for-modernity',
      number: '03',
      title: '현대 사회로의 경고',
      subtitle: 'The Warning for Modernity: 시스템의 부품이 되어 질문을 멈출 때',
      icon: 'AlertTriangle',
      content: `악의 평범성 개념이 현대인에게 던지는 가장 뼈아픈 충격은, 인류 역사상 최악의 학살이 사이코패스나 광신도 집단에 의해서만 저질러진 것이 아니라는 사실입니다. 아인자츠그루펜의 최고 지휘관 24명 중 무려 8명이 박사 학위 소지자(법학자, 경제학자, 신학자 출신)였습니다.\n\n고도의 지성과 합리성을 갖춘 엘리트들이 "조직의 목표", "국가의 법률", "효율성과 성과"라는 대의명분 아래 개인의 도덕적 사유를 정지시켰을 때, 그들은 세계에서 가장 정밀한 살인 기계로 전락했습니다. 현대의 기업, 관료조직, 테크 알고리즘 속에서도 개인이 '내가 하는 일이 어떤 결과를 낳는가'를 스스로 묻지 않는다면, 언제든 침묵의 공모자가 될 수 있습니다.`
    }
  ],
  commandersProfile: [
    {
      name: '오토 올렌도르프 (Dr. Otto Ohlendorf)',
      title: '아인자츠그루페 D 사령관 / SS 소장',
      academic: '라이프치히·괴팅겐·튀빙겐 대학교 법학 및 경제학 박사',
      defense: '“본관은 명령을 받았고, 군사적 안전을 위해 비극적이지만 필요한 결정을 내렸다. 감정적 가학 행위를 철저히 통제했으므로 나는 양심의 가책을 느끼지 않는다.”',
      verdict: '1948년 뉘른베르크 사형 선고, 1951년 교수형 집행'
    },
    {
      name: '오토 라슈 (Dr. Dr. Otto Rasch)',
      title: '아인자츠그루페 C 사령관 / 바비 야르 초기 승인자',
      academic: '라이프치히 대학교 법학 박사 및 정치경제학 박사 (이중 박사)',
      defense: '기업 경영 고문 및 변호사 출신으로 지토미르와 키이우 일대의 대량 학살을 법률적 행정 처리의 일환으로 관리함.',
      verdict: '뉘른베르크 재판 기소 중 파킨슨병 악화로 공소 기각 후 1948년 사망'
    },
    {
      name: '프란츠 발터 슈탈레커 (Dr. Franz Walter Stahlecker)',
      title: '아인자츠그루페 A 사령관 / 발트 3국 대학살 지휘',
      academic: '튀빙겐 대학교 법학 박사',
      defense: '발트 3국 전역에서 20만 명 이상의 학살을 완수하고 상세한 통계 지도를 히틀러에게 직접 보고하며 자부심을 드러냄.',
      verdict: '1942년 3월 에스토니아 인근에서 소련 파르티잔과의 교전 중 전사'
    },
    {
      name: '파울 블로벨 (Paul Blobel)',
      title: '존더코만도 4a 지휘관 / 1005 작전(증거 인멸) 총책',
      academic: '건축가 출신 / 제1차 세계대전 1급 철십자 훈장 수훈',
      defense: '“시신을 파내어 불태우는 것은 전염병을 막기 위한 위생 조치였을 뿐이다.” 궤변 고수',
      verdict: '1948년 사형 선고, 1951년 란츠베르크 교도소에서 교수형 집행'
    }
  ],
  reflectionQuestions: [
    {
      id: 'q1',
      question: '우리는 조직에서 불합리하거나 비윤리적인 지시를 마주했을 때, “규정이 그렇다”거나 “조직의 지침”이라는 방패 뒤로 숨어 나의 비판적 사유를 멈춘 적은 없는가?',
      context: '일상적인 업무 환경에서도 부당한 관행이나 타인에게 피해를 주는 시스템을 침묵으로 용인하는 순간, 우리는 스스로 생각하기를 멈춘 것입니다.',
      actionableAdvice: '조직의 규정이 나의 윤리적 상식과 충돌할 때, 잠시 멈추어 "이 결정의 최종 피해자는 누구인가?"를 질문하는 용기가 필요합니다.'
    },
    {
      id: 'q2',
      question: '내가 사용하는 전문적·행정적 언어가 타인의 구체적인 눈물과 아픔을 무감각하게 지워버리는 완충재 역할을 하고 있지는 않은가?',
      context: '‘구조조정’, ‘손실 처리’, ‘부수적 피해’ 등의 추상적 단어는 숫자로 사람의 생계를 치환해 버립니다. 언어의 메마름은 공감의 마비를 동반합니다.',
      actionableAdvice: '숫자와 보고서 뒤에 존재하는 구체적인 한 사람의 삶과 가족의 얼굴을 머릿속에 떠올리는 인지적 노력을 기울여야 합니다.'
    },
    {
      id: 'q3',
      question: '나는 나와 전혀 다른 배경, 이념, 처지에 놓인 타인의 시선에서 세상을 상상해보는 훈련을 의식적으로 하고 있는가?',
      context: '아렌트가 말한 악의 본질은 ‘타인의 처지에서 생각하지 못하는 무능’이었습니다. 내 집단과 내 편의 편의만을 좇을 때 타인은 손쉽게 배제 대상이 됩니다.',
      actionableAdvice: '익숙한 집단 내의 상투적인 언어와 확증 편향에서 벗어나, 가장 취약한 이들의 목소리에 귀를 기울이는 대화와 독서를 지속해야 합니다.'
    }
  ]
};

// 5. Comprehensive Verdict Modal Data (Nuremberg & Aktion 1005)
export const VERDICT_DATA = {
  title: '거대한 침묵의 결말: 뉘른베르크 아인자츠그루펜 재판과 1005 작전',
  subtitle: 'The Nuremberg Einsatzgruppen Trial (Case 9, 1947–1948) & Aktion 1005',
  stats: {
    totalVictimsMin: 1500000,
    totalVictimsMax: 2000000,
    perpetratorsCount: 3000,
    ratioText: '가해 부대 단 3,000여 명 대비 희생자 약 150만~200만 명: 1인당 수백 명의 민간인을 학살한 가공할 살인 효율성'
  },
  aktion1005: {
    title: '1005 작전 (Aktion 1005): 국가 차원의 거대한 증거 인멸 범죄',
    commander: '파울 블로벨 (SS 대령, 바비 야르 주범)',
    period: '1942년 6월 ~ 1944년 중반',
    details: [
      '패색이 짙어지자 하인리히 힘러는 동유럽 전역의 대규모 집단 매장지를 모두 파헤쳐 시신을 불태우라는 극비 지령을 하달했습니다.',
      '유대인 강제노동자(Sonderkommando 1005)의 발목에 쇠사슬을 채워 수십만 구의 썩은 시신을 갈고리로 끌어내게 했습니다.',
      '철도 레일을 피라미드 형태로 쌓아 시신 2,000여 구와 통나무를 층층이 얹고 타르와 석유를 부어 화장했습니다.',
      '불타고 남은 두개골과 뼈는 체코제 특수 뼈 분쇄기(Knochenmühle)로 미세하게 갈아 인근 강물에 뿌리거나 밭에 비료로 위장해 뿌렸습니다.',
      '증거 인멸 작업이 완료된 후, 비밀 누설을 막기 위해 작업에 투입되었던 유대인 수감자들까지 전원 총살하여 소각했습니다.'
    ]
  },
  nurembergTrial: {
    title: '뉘른베르크 아인자츠그루펜 재판 (Case 9)',
    prosecutor: '벤저민 B. 페렌츠 (Benjamin B. Ferencz, 당시 27세 수석 검사)',
    judges: '마이클 무스만노(Michael A. Musmanno) 재판장 등 미국 군사법정',
    defendants: '24명의 아인자츠그루펜 최고위 지휘관 전원 기소',
    plea: '“무죄(Nicht schuldig)” 주장: 국가 지도자(Führer)의 합법적 명령에 따른 공무 집행이자 군사적 자위권 행사라는 궤변',
    verdictsSummary: '14명에게 사형 선고, 2명에게 종신형, 5명에게 10~20년 징역형 선고',
    aftermathNote: '그러나 냉전의 개막과 서독 사회의 ‘과거 묻어두기’ 분위기 속에서 존 맥클로이(John J. McCloy) 미 고등판무관의 대규모 사면으로 인해 실제 사형이 집행된 인물은 오토 올렌도르프, 파울 블로벨, 에리히 나우만, 베르너 브라우네 등 단 4명에 불과했습니다. 수많은 지휘관들이 1950년대 중반에 감형되어 석방되었으며, 이는 전후 정의의 불완전한 한계로 기록되었습니다.'
  },
  ferenczQuote: '“내가 기소한 피고인들은 괴물이 아니었습니다. 그들은 똑똑하고 세련된 교양인이었으며 대학에서 박사 학위를 받은 인텔리들이었습니다. 이것이 바로 문명사회가 가장 경계해야 할 가장 무서운 진실입니다.” — 벤저민 페렌츠 뉘른베르크 수석 검사'
};
