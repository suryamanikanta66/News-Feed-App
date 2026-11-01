// src/hooks/mockNews.js

const mockImages = {
  general: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
  technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  business: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
  health: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
  science: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
  entertainment: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80'
};

const mockArticles = {
  en: [
    {
      title: "Global Tech Summit 2026 Outlines the Future of Quantum Computing and Neural Interfaces",
      description: "Industry leaders at the Silicon Valley conference showcased breakthrough integrations of room-temperature qubits and consumer-grade brain wearables, promising revolutionary changes in daily productivity.",
      content: "The Silicon Valley Global Tech Summit opened today with unprecedented announcements from leading hardware companies. The primary focus remained on consumer quantum platforms and safe, wearable brain-machine interfaces. Developers demonstrated real-time translation and code generation directly powered by neural thought patterns, indicating that the landscape of software development and human-machine interaction will change completely within the next five years.",
      urlToImage: mockImages.technology,
      url: "https://example.com/tech-summit-2026-en",
      source: { name: "Future Tech Daily" },
      publishedAt: new Date().toISOString(),
      author: "Sarah Jenkins"
    },
    {
      title: "Market Rally: Major Index Hits All-Time High Amid Stabilizing Interest Rates",
      description: "Financial indices surged today as banking regulators announced a pause in rate hikes, sparking optimism across tech, housing, and commercial sectors.",
      content: "Trading rooms experienced intense activity this morning following the Federal Reserve's announcement regarding interest rate stabilization. Retail stocks led the surge, closely followed by high-performing tech startups. Analysts expect this momentum to continue throughout the quarter, as lower inflation expectations encourage substantial capital deployment in growth sectors.",
      urlToImage: mockImages.business,
      url: "https://example.com/market-rally-2026-en",
      source: { name: "Wall Street Journal Brief" },
      publishedAt: new Date(Date.now() - 1800000).toISOString(),
      author: "David Vance"
    },
    {
      title: "Athletes Break Long-Standing Sprint Records at World Championship Finals",
      description: "An extraordinary night at the track saw both the men's and women's 100-meter world records shattered under perfect weather conditions.",
      content: "Sparks flew at the national stadium as sprinters delivered once-in-a-generation performances. Training advancements and specialized track compounds are credited with assisting the speed, but coaches emphasize the sheer mental fortitude shown by the young champions. Crowds cheered as history was written in milliseconds.",
      urlToImage: mockImages.sports,
      url: "https://example.com/championship-finals-2026-en",
      source: { name: "Global Sports Network" },
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      author: "Marcus Vance"
    },
    {
      title: "Breakthrough Cancer Therapy Shows 95% Remission Rate in Early Trials",
      description: "Medical researchers have announced a targeted gene-delivery system that destroys tumors without damaging healthy tissues, showing immense promise.",
      content: "The oncology community is celebrating a significant milestone today. The newly engineered molecular carrier targets malignant cells specifically, leaving standard cellular structures completely untouched. Patients in the initial clinical groups reported mild side effects and extremely rapid recovery windows.",
      urlToImage: mockImages.health,
      url: "https://example.com/cancer-therapy-2026-en",
      source: { name: "Health & Medicine Journal" },
      publishedAt: new Date(Date.now() - 5400000).toISOString(),
      author: "Dr. Evelyn Shaw"
    },
    {
      title: "Deep Space Telescope Discovers Atmospheric Water on Earth-Sized Exoplanet",
      description: "Located 40 light-years away, the exoplanet orbiting a stable red dwarf displays definitive signatures of water vapor and temperature ranges suitable for liquid oceans.",
      content: "Astronomers have released data detailing the molecular composition of exoplanet Kepler-186f's atmosphere. By using high-precision infrared spectroscopy, the space-based instrument captured light absorption lines indicating significant quantities of H2O. This marks the most promising candidate in our search for habitable stellar systems.",
      urlToImage: mockImages.science,
      url: "https://example.com/exoplanet-water-2026-en",
      source: { name: "Cosmos & Astronomy" },
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      author: "Prof. Alan Stern"
    },
    {
      title: "Cities Transition to Smart Power Grids to Combat Seasonal Energy Surges",
      description: "Municipalities are rolling out intelligent grid management systems using predictive AI to redistribute electricity, preventing local blackouts during heatwaves.",
      content: "As global urban temperatures rise, energy providers are turning to machine learning grids. The newly implemented software analyzes past usage patterns, weather trends, and real-time residential demand to allocate reserve energy dynamically. Initial test cities reported a 15% reduction in fuel consumption and zero brownouts.",
      urlToImage: mockImages.general,
      url: "https://example.com/smart-grids-2026-en",
      source: { name: "Urban Developer Today" },
      publishedAt: new Date(Date.now() - 9000000).toISOString(),
      author: "Claire Bennett"
    },
    {
      title: "Venture Capital Inflow Into AI Startups Set to Double in FY2026",
      description: "A comprehensive financial report indicates venture funds are aggressively backing artificial intelligence infrastructure, shifting focus from SaaS products.",
      content: "Investment banking documents leaked today outline a significant realignment in venture capital targets. Compute-heavy infrastructure, cooling facilities, and low-latency networks are receiving the lion's share of investments. Financial analysts suggest this foundational funding will prepare the global economy for deeper automated workflows.",
      urlToImage: mockImages.business,
      url: "https://example.com/vc-ai-startup-funding-en",
      source: { name: "Financial Chronology" },
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      author: "Jameson Coyle"
    },
    {
      title: "New AI Code Assistants Achieve 90% Accuracy in Automated Code Auditing",
      description: "Software security groups demonstrate LLM-based pipelines that scan production codebases, identify security loopholes, and draft patches instantly.",
      content: "At the Secure Coding Conference, developers showcased an autonomous agent that audits codebases continuously. The system scans pull requests, detects architectural flaws, and writes verified unit tests to prove the fix. Code security experts claim this could reduce zero-day exploits by 80% globally.",
      urlToImage: mockImages.technology,
      url: "https://example.com/ai-code-auditing-en",
      source: { name: "Software Engineering Today" },
      publishedAt: new Date(Date.now() - 12600000).toISOString(),
      author: "Linus Patterson"
    },
    {
      title: "Formula 1 Unveils Aerodynamic Regulations for Next Season's Eco-Engines",
      description: "The racing federation introduced radical body design frameworks designed to decrease drag and maximize biofuel energy conversion in hybrid power units.",
      content: "F1 engineers will face fresh design constraints next season. The new rules force a smaller rear wing and a highly streamlined under-body tunnel to decrease turbulence. The goal is to prove that high-performance motorsports can function with zero carbon footprint without sacrificing speed.",
      urlToImage: mockImages.sports,
      url: "https://example.com/formula-one-regulations-en",
      source: { name: "F1 Fastlane Weekly" },
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      author: "Christian Horner"
    },
    {
      title: "Nutritionists Debunk Common Myths Surrounding Intermittent Fasting Schemes",
      description: "A multi-year clinical trial demonstrates that eating windows have minimal impact on fat loss compared to net caloric deficits, though metabolic benefits remain.",
      content: "A study published in the International Journal of Metabolism analyzed two thousand participants. The results indicate that restricting meals to an 8-hour window does not accelerate weight loss on its own. However, fasting windows did show a distinct reduction in average insulin levels and improved cardiovascular recovery metrics.",
      urlToImage: mockImages.health,
      url: "https://example.com/intermittent-fasting-myths-en",
      source: { name: "Metabolic Sciences" },
      publishedAt: new Date(Date.now() - 16200000).toISOString(),
      author: "Dr. Karen Vance"
    },
    {
      title: "Astrophysicists Detect Gravitational Waves from Unprecedented Neutron Star Collision",
      description: "The LIGO observatories captured unique space-time ripples originating from a hyper-dense merger, revealing massive gold production in deep space.",
      content: "The cosmic event, cataloged as GW2608, released more energy in one millisecond than our sun will emit in its entire lifespan. Spectral analysis of the collision zone confirmed the creation of heavy elements, including gold and platinum, validating theories on how rare elements are formed.",
      urlToImage: mockImages.science,
      url: "https://example.com/gravitational-waves-ligo-en",
      source: { name: "Space Research Journal" },
      publishedAt: new Date(Date.now() - 18000000).toISOString(),
      author: "Dr. Rebecca Vance"
    },
    {
      title: "Global Supply Chain Congestion Eases as Maritime Routes Adopt Smart Logistics",
      description: "Ocean cargo lines report a 40% reduction in average container docking delays thanks to predictive shipping routes and automated port crane management.",
      content: "Logistics corridors are breathing a sigh of relief. By leveraging automated dock schedules, port authorities are matching arriving vessels with active rail cars immediately upon arrival, avoiding storage pileups. Global trade shipping speeds are returning to pre-crisis averages.",
      urlToImage: mockImages.general,
      url: "https://example.com/supply-chain-logistics-en",
      source: { name: "Logistics Network Daily" },
      publishedAt: new Date(Date.now() - 19800000).toISOString(),
      author: "Stephen Croft"
    }
  ],
  te: [
    {
      title: "తెలుగు రాష్ట్రాల్లో ఐటీ కారిడార్ విస్తరణ: కొత్తగా 20 వేల ఉద్యోగాల сృష్టి",
      description: "ఐటీ రంగంలో విప్లవాత్మక మార్పులు రాబోతున్నాయి. కొత్తగా ఐటీ కంపెనీల ఏర్పాటుతో వేలాది మంది నిరుద్యోగులకు ఉపాధి లభించనుంది.",
      content: "హైదరాబాద్ మరియు ఆంధ్రప్రదేశ్ ఐటీ కారిడార్లలో భారీ పెట్టుబడులు పెట్టేందుకు ప్రసిద్ధ సంస్థలు ముందుకు వచ్చాయి. డిజిటల్ టెక్నాలజీలు, ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ అభివృద్ధికి ప్రత్యేక కేంద్రాలు ఏర్పాటవుతున్నాయి. దీనివల్ల స్థానిక నిపుణులకు విస్తృత అవకాశాలు లభిస్తాయి.",
      urlToImage: mockImages.technology,
      url: "https://example.com/telugu-it-expansion-2026-te",
      source: { name: "తెలుగు వార్తా తరంగిణి" },
      publishedAt: new Date().toISOString(),
      author: "రామ్ మోహన్"
    },
    {
      title: "పసిడి ధరలలో భారీ మార్పు: కొనుగోలుదారులకు తీపి కబురు",
      description: "అంతర్జాతీయ మార్కెట్లో ఏర్పడిన మార్పుల వల్ల బంగారం ధరలు భారీగా తగ్గాయి, ఇది శుభపరిణామంగా విశ్లేషకులు చెబుతున్నారు.",
      content: "మహిళలకు మరియు పెట్టుబడిదారులకు పసిడి ధరల తగ్గుదల గొప్ప ఉపశమనాన్ని ఇచ్చింది. రాబోయే పండుగల సీజన్ లో అమ్మకాలు మరింత పెరగవచ్చని వ్యాపారులు అంచనా వేస్తున్నారు. రాబోయే వారాల్లో బంగారం ధరలు మరింత స్థిరంగా ఉండే అవకాశం ఉంది.",
      urlToImage: mockImages.business,
      url: "https://example.com/telugu-gold-news-2026-te",
      source: { name: "వ్యాపార సమాచారం" },
      publishedAt: new Date(Date.now() - 1800000).toISOString(),
      author: "శ్రీనివాస రావు"
    },
    {
      title: "క్రికెట్ చరిత్రలో సరికొత్త రికార్డు సృష్టించిన భారత యువ బ్యాట్స్‌మెన్",
      description: "ఈరోజు జరిగిన కీలక మ్యాచ్‌లో భారత యువ ఆటగాడు డబుల్ సెంచరీతో అదరగొట్టాడు. అద్భుతమైన బ్యాటింగ్ ప్రదర్శనతో అభిమానులను అలరించాడు.",
      content: "అంతర్జాతీయ స్టేడియంలో సిక్సర్లు, ఫోర్లతో భారత బ్యాటర్ వీరвиహారం చేశాడు. కేవలం 98 బంతుల్లోనే ద్విశతకం పూర్తి చేసి రికార్డు బద్దలు కొట్టాడు. ఈ ఘనత సాధించిన అతి పిన్న వయస్కుడిగా రికార్డు పుస్తకాల్లోకెక్కాడు.",
      urlToImage: mockImages.sports,
      url: "https://example.com/telugu-cricket-record-2026-te",
      source: { name: "క్రీడా ప్రపంచం" },
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      author: "కిరణ్ కుమార్"
    },
    {
      title: "ఆరోగ్య చిట్కాలు: గుండె ఆరోగ్యాన్ని కాపాడుకోవడానికి పాటించాల్సిన నియమాలు",
      description: "ప్రస్తుత ఉరుకుల పరుగుల జీవితంలో గుండె ఆరోగ్యంపై ప్రత్యేక శ్రద్ధ పెట్టడం చాలా అవసరమని వైద్య నిపుణులు హెచ్చరిస్తున్నారు.",
      content: "రోజువారీ ఆహారంలో పీచు పదార్థాలు ఎక్కువగా ఉండేలా చూసుకోవాలి. కనీсом 30 నిమిషాల నడక మరియు యోగా చేయడం వల్ల గుండె పనితీరు మెరుగ్గా ఉంటుంది. మానసిక ఒత్తిడిని తగ్గించుకోవడం కూడా గుండె జబ్బులను నివారిస్తుంది.",
      urlToImage: mockImages.health,
      url: "https://example.com/telugu-heart-health-2026-te",
      source: { name: "ఆరోగ్య వేదిక" },
      publishedAt: new Date(Date.now() - 5400000).toISOString(),
      author: "డాక్టర్ అనిత"
    },
    {
      title: "ఇస్రో ప్రведение జీఎస్ఎల్వీ ప్రయోగం విజయవంతం: సరికొత్త వాతావరణ ఉపగ్రహం",
      description: "శ్రీహరికోట నుంచి ఈరోజు ఉదయం జీఎస్ఎల్వీ రోదсиలోకి విజయవంతంగా దూసుకెళ్లింది. వాతావరణ సమాచారాన్ని అందించడమే దీని లక్ష్యం.",
      content: "భారత అంతరిక్ష పరిశోధన సంస్థ (ఇస్రో) మరో మైలురాయిని అధిగమించింది. అధునాతన సెнసార్లతో కూడిన ఈ ఉపగ్రహం తుఫానులు, వరదలను ముందస్తుగా హెచ్చరించడంలో కీలక పాత్ర పోషిస్తుంది. శాస్త్రవేత్తలు హర్షం వ్యక్తం చేశారు.",
      urlToImage: mockImages.science,
      url: "https://example.com/telugu-isro-launch-2026-te",
      source: { name: "అంతరిక్ష వార్తలు" },
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      author: "పి. సతీష్"
    },
    {
      title: "టాలీవుడ్‌లో సరికొత్త ట్రెండ్: చిన్న సినిమాల ఘన విజయాలు",
      description: "స్టార్ హీరోలు లేకపోయినా కథా బలంతో బాక్సాఫీస్ వద్ద చిన్న సినిమాలు కాసుల వర్షం కుриపిస్తున్నాయి.",
      content: "తెలుగు ప్రేక్షకులు ఎల్లప్పుడూ కొత్తదనాన్ని ఆదరిస్తారని మరోసారి నిరూపితమైంది. ఈ వారం విడుదలైన మూడు చిన్న బడ్జెట్ సినిమాలు అద్భుతమైన కలెక్షన్లతో దూసుకుపోతున్నాయి. నూతన దర్శకులు, నటీनటుల ప్రతిభకు ప్రశంసలు దక్కుతున్నాయి.",
      urlToImage: mockImages.general,
      url: "https://example.com/telugu-cinema-trends-2026-te",
      source: { name: "చిత్ర వినోదం" },
      publishedAt: new Date(Date.now() - 9000000).toISOString(),
      author: "వెంకట్ రాజు"
    },
    {
      title: "తెలుగు రాష్ట్రాలలో డిజిటల్ విప్లవం: గ్రామాల్లోనూ బ్రాడ్‌బాండ్ సేవలు",
      description: "ప్రభుత్వం ప్రతిష్టాత్మకంగా చేపట్టిన ప్రాజెక్ట్ ద్వారా గ్రామీణ ప్రాంతాల్లో ఇంటర్నెట్ సౌకర్యం కల్పించనున్నారు.",
      content: "గ్రామ సచివాలయాలు మరియు పాఠశాలలకు హై స్పీడ్ ఫైబర్ కనెక్టివిటీ అందుబాటులోకి వచ్చింది. దీనివల్ల గ్రామీణ విద్యార్థులకు ఆన్‌లైన్ విద్యా సేవలు మెరుగ్గా అందుతాయి. వైద్య రంగంలోనూ టెలిమెడిసిన్ మరింత సులువు కానుంది.",
      urlToImage: mockImages.technology,
      url: "https://example.com/telugu-broadband-rural-te",
      source: { name: "డిజిటల్ ఆంధ్రప్రదేశ్" },
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      author: "ఎస్. రాజా"
    },
    {
      title: "వ్యవసాయ రంగంలో డ్రోన్ల వినియోగం: రైతులకు పెరిగిన ఆధాయం",
      description: "ఆధునిక టెక్నాలజీతో పంటలపై పురుగుమందుల చల్లడం మరియు పంటల పర్యవేక్షణ సులభతరం అవుతుంది.",
      content: "డ్రోన్ల వినియోగం వల్ల తక్కువ సమయంలో ఎక్కువ విస్తీర్ణంలో పురుగుమందులు చల్లవచ్చు. ఎరువుల దుర్వినియోగం తగ్గుతుంది. ప్రభుత్వం సబ్సిడీ ద్వారా రైతులకు డ్రోన్లను అందిస్తోంది. దీనివల్ల సాగు ఖర్చులు తగ్గాయి.",
      urlToImage: mockImages.science,
      url: "https://example.com/telugu-drone-farming-te",
      source: { name: "కృషి విజ్ఞానం" },
      publishedAt: new Date(Date.now() - 12600000).toISOString(),
      author: "రామ్ ప్రసాద్"
    },
    {
      title: "రియల్ ఎస్టేట్ రంగానికి కొత్త ఊపు: నివాస గృహాల కొనుగోళ్లు విపరీతం",
      description: "కొత్త ఐటీ కేంద్రాలు మరియు హైవేల అభివృద్ధి కారణంగా శివారు ప్రాంతాలలో ఇళ్ల నిర్మాణాలు ఊపందుకున్నాయి.",
      content: "హైదరాబాద్ పశ్చిమ భాగంలో నివాస ఫ్లాట్ల విక్రయాలు ఈ త్రైమాసికంలో 30 శాతం వృద్ధిని సాధించాయి. ఉద్యోగులు సొంత ఇళ్ల కొనుగోలుకు మొగ్గు చూపుతుండడంతో బిల్డర్లు భారీ ప్రాజెక్టులను లాంచ్ చేస్తున్నారు.",
      urlToImage: mockImages.business,
      url: "https://example.com/telugu-realestate-news-te",
      source: { name: "ఆర్థిక రంగాలు" },
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      author: "కె. శ్రీకాంత్"
    },
    {
      title: "యోగా మరియు ధ్యానం: మానసిక ఒత్తిడిని జయించే మార్గాలు",
      description: "ఆఫీస్ ఒత్తిళ్లు మరియు నిద్రలేమి సమస్యల నివారణకు యోగా శ్రేయస్కరమని ప్రముఖ గురువులు సూచిస్తున్నారు.",
      content: "రోజూ ఉదయం 15 నిమిషాల ప్రాణాయామం చేయడం వల్ల మెదడు చురుగ్గా పనిచేస్తుంది. రక్తపోటు నియంత్రణలో ఉంటుంది. పాఠశాలల్లో కూడా యోగా తరగతులు నిర్వహించాలని తల్లిదండ్రులు కోరుతున్నారు.",
      urlToImage: mockImages.health,
      url: "https://example.com/telugu-yoga-health-te",
      source: { name: "జీవన శైలి" },
      publishedAt: new Date(Date.now() - 16200000).toISOString(),
      author: "పి. మాధవి"
    }
  ],
  es: [
    {
      title: "Nuevos Avances en Fusión Nuclear Prometen Energía Limpia Ilimitada para 2030",
      description: "Científicos del consorcio internacional reportan una ganancia neta de energía récord que acelera el desarrollo de reactores comerciales sostenibles.",
      content: "El avance científico reportado hoy marca un hito crucial en la búsqueda de fuentes de energía limpias y estables. Los investigadores lograron mantener el plasma de fusión de helio a temperaturas extremas por tiempo prolongado, permitiendo capturar un volumen neto de electricidad sin precedentes.",
      urlToImage: mockImages.science,
      url: "https://example.com/fusion-nuclear-es",
      source: { name: "El Diario Científico" },
      publishedAt: new Date().toISOString(),
      author: "Elena Gómez"
    },
    {
      title: "Innovación en Smartphones: Pantallas Flexibles Auto-reparables para el Mercado Global",
      description: "Un laboratorio tecnológico de Barcelona presenta polímeros avanzados capaces de eliminar rayones superficiales en segundos de forma automática.",
      content: "La era de las pantallas rotas o rayadas podría llegar a su fin muy pronto. Investigadores en colaboración con marcas móviles líderes demostraron un cristal inteligente que se regenera con el calor corporal, manteniendo la conductividad táctil al cien por ciento.",
      urlToImage: mockImages.technology,
      url: "https://example.com/smartphones-tech-es",
      source: { name: "Mundo Digital" },
      publishedAt: new Date(Date.now() - 1800000).toISOString(),
      author: "Javier López"
    },
    {
      title: "Crecimiento de las Startups Españolas Supera las Expectativas del Mercado en 2026",
      description: "El flujo de capital de riesgo hacia empresas tecnológicas emergentes aumentó un 25% en comparación con el período del año anterior.",
      content: "Madrid y Barcelona se consolidan como hubs de innovación financiera en el sur de Europa. Sectores como el Fintech y el Proptech capturaron la mayor parte de las rondas de financiamiento de esta semana, impulsando la contratación de talento joven.",
      urlToImage: mockImages.business,
      url: "https://example.com/startups-espanolas-es",
      source: { name: "Economía y Negocios" },
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      author: "Marta Ibáñez"
    },
    {
      title: "Histórica Victoria en el Tenis Femenino: Victoria en Tres Sets Consecutivos",
      description: "La campeona nacional superó a su rival internacional en un emocionante desempate de tres horas frente a un estadio repleto.",
      content: "Un partido de tenis de proporciones legendarias culminó hoy con un trofeo brillante para la favorita local. El revés potente y el juego táctico en red marcaron una diferencia crítica frente a la tenacidad de la defensora internacional.",
      urlToImage: mockImages.sports,
      url: "https://example.com/tenis-victoria-es",
      source: { name: "As de Deportes" },
      publishedAt: new Date(Date.now() - 5400000).toISOString(),
      author: "Roberto Silva"
    },
    {
      title: "Nutrición Moderna: Dietas Inteligentes y Microbioma para la Longevidad",
      description: "Expertos en salud recomiendan un enfoque integral enfocado en la flora digestiva para prevenir enfermedades crónicas en la edad adulta.",
      content: "Nuevas investigaciones en bio-medicina señalan la correlación directa entre un colon saludable y la claridad cognitiva. El consumo regular de fermentos naturales y la reducción de alimentos ultraprocesados actúan como escudo protector de primer nivel.",
      urlToImage: mockImages.health,
      url: "https://example.com/nutricion-microbioma-es",
      source: { name: "Salud y Vida Sana" },
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      author: "Dra. Isabel Ruiz"
    },
    {
      title: "El auge del coche eléctrico en América Latina: México y Brasil lideran las ventas",
      description: "La infraestructura de carga se duplica en las principales autopistas, incentivando la adopción masiva de vehículos híbridos y de batería.",
      content: "La transición energética avanza a paso firme en la región. Las exenciones fiscales gubernamentales y la llegada de modelos compactos y asequibles han impulsado las ventas de coches eléctricos un 40% este trimestre.",
      urlToImage: mockImages.technology,
      url: "https://example.com/coche-electrico-latam-es",
      source: { name: "Motor y Ecología" },
      publishedAt: new Date(Date.now() - 9000000).toISOString(),
      author: "Carlos Pineda"
    },
    {
      title: "La Inteligencia Artificial revoluciona el diagnóstico de enfermedades cardíacas",
      description: "Nuevos algoritmos en hospitales de Madrid logran predecir infartos con hasta 48 horas de anticipación mediante análisis de electrocardiogramas.",
      content: "El uso de redes neuronales en cardiología ha demostrado una precisión del 94%. El sistema alerta a los médicos en tiempo real cuando detecta anomalías sutiles en los latidos del paciente que suelen pasar desapercibidas en revisiones de rutina.",
      urlToImage: mockImages.health,
      url: "https://example.com/ia-cardiologia-es",
      source: { name: "Salud Digital" },
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      author: "Laura Benítez"
    },
    {
      title: "España albergará el mayor centro de supercomputación ecológica de Europa",
      description: "El nuevo superordenador utilizará energía 100% renovable y refrigeración por agua de lluvia, reduciendo las emisiones de carbono.",
      content: "El proyecto, financiado por fondos europeos y nacionales, se ubicará en Aragón. La instalación dará soporte a investigaciones climáticas complejas y simulaciones de nuevos materiales de manera totalmente ecológica.",
      urlToImage: mockImages.science,
      url: "https://example.com/supercomputacion-ecologica-es",
      source: { name: "España Científica" },
      publishedAt: new Date(Date.now() - 12600000).toISOString(),
      author: "Francisco Martín"
    }
  ],
  fr: [
    {
      title: "Découverte Majeure : Un Temple Antique du IIe Siècle Découvert sous Paris",
      description: "Les archéologues ont mis au jour des colonnes monumentales et des inscriptions préservées sous les fondations du centre historique.",
      content: "Les fouilles préventives menées près de la Seine ont révélé un trésor enfoui depuis près de deux mille ans. Les statues retrouvées témoignent des rituels et de la richesse culturelle de l'ancienne Lutèce, captivant l'attention des historiens mondiaux.",
      urlToImage: mockImages.general,
      url: "https://example.com/archeologie-paris-fr",
      source: { name: "Le Parisien Flash" },
      publishedAt: new Date().toISOString(),
      author: "Jean Dupont"
    },
    {
      title: "L'Europe Révèle son Nouveau Programme d'Intelligence Artificielle Ethique et Souveraine",
      description: "Un consortium de laboratoires français et allemands lance un modèle linguistique ouvert et respectueux des données personnelles.",
      content: "Le nouveau modèle de réseau neuronal open-source vise à offrir aux entreprises européennes une alternative indépendante. Le projet, financé en partie par l'État, garantit le respect de la vie privée et se concentre sur l'apprentissage scientifique de haute précision.",
      urlToImage: mockImages.technology,
      url: "https://example.com/ia-ethique-europe-fr",
      source: { name: "Science & Tech Info" },
      publishedAt: new Date(Date.now() - 1800000).toISOString(),
      author: "Sylvie Lambert"
    },
    {
      title: "La France Domine la Coupe Européenne de Football en Finale Historique",
      description: "Les Bleus ont remporté la finale hier soir avec un but décisif à la 92e minute, déclenchant des célébrations festives dans tout le pays.",
      content: "Un match plein de suspense s'est conclu par un triomphe inoubliable au stade national. La défense solide et la coordination offensive impeccable ont scellé le score final, marquant la troisième coupe européenne de la décennie pour l'équipe nationale.",
      urlToImage: mockImages.sports,
      url: "https://example.com/foot-finale-france-fr",
      source: { name: "Sport Actu" },
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      author: "Antoine Lemaire"
    },
    {
      title: "Santé Publique : Réduction Historique de l'Usage du Sucre dans les Boissons Gazeuses",
      description: "Le plan national de nutrition enregistre des progrès significatifs, avec une baisse de 15% de la teneur en sucre des boissons manufacturées.",
      content: "Grâce aux réglementations fiscales ciblées et aux campagnes d'éducation, les consommateurs français réduisent leur apport glycémique quotidien. Les cardiologues saluent cette évolution majeure qui prévient les troubles cardiaques précoces.",
      urlToImage: mockImages.health,
      url: "https://example.com/sucre-sante-france-fr",
      source: { name: "Santé Hebdo" },
      publishedAt: new Date(Date.now() - 5400000).toISOString(),
      author: "Alice Martin"
    },
    {
      title: "Climatologie : Une Station de Recherche Arctique Enregistre des Températures Record",
      description: "Les modèles thermiques révèlent un adoucissement inattendu des courants marins, accélérant la fonte des glaciers cette saison.",
      content: "Les données recueillies par la mission polaire confirment une hausse moyenne des températures océaniques de 1,5 degré. Les climatologues réitèrent l'importance d'actions coordonnées globales pour ralentir ces bouleversements écologiques critiques.",
      urlToImage: mockImages.science,
      url: "https://example.com/climat-arctique-fr",
      source: { name: "Éco Sciences" },
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      author: "Marc Moreau"
    },
    {
      title: "Créativité Financière : Le Secteur de la FinTech Parisienne Lève 400 Millions d'Euros",
      description: "Les start-ups spécialisées dans les portefeuilles cryptographiques et l'automatisation comptable attirent des investisseurs majeurs.",
      content: "Paris conforte son attractivité auprès du capital-risque mondial. Les levées de fonds successives de cette semaine confirment le dynamisme des applications décentralisées et des outils d'investissement pour particuliers.",
      urlToImage: mockImages.business,
      url: "https://example.com/fintech-paris-fr",
      source: { name: "Bourse & Économie" },
      publishedAt: new Date(Date.now() - 9000000).toISOString(),
      author: "Pierre Laurent"
    },
    {
      title: "Innovation Aérospatiale : Une Start-up Française Teste un Moteur Spatial Écologique",
      description: "Le système utilise de l'eau surchauffée comme propulseur, offrant une alternative économique pour les constellations de satellites.",
      content: "Le vol d'essai suborbital a démontré la viabilité de la propulsion thermique à eau. Les ingénieurs prévoient les premiers lancements commerciaux d'ici la fin de l'année, réduisant le coût écologique des missions.",
      urlToImage: mockImages.science,
      url: "https://example.com/moteur-spatial-eau-fr",
      source: { name: "Espace & Avenir" },
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      author: "Julien Roche"
    },
    {
      title: "Gastronomie : Le Guide Michelin Décerne de Nouvelles Étoiles Vertes de la Durabilité",
      description: "Les tables françaises axées sur le zéro déchet et l'approvisionnement ultra-local dominent le palmarès annuel.",
      content: "Le guide gastronomique récompense les chefs engagés pour la protection de l'environnement. Le palmarès célèbre la diversité culinaire et le travail des producteurs locaux à travers des menus de saison d'une créativité sans borne.",
      urlToImage: mockImages.general,
      url: "https://example.com/guide-michelin-durable-fr",
      source: { name: "Saveurs de France" },
      publishedAt: new Date(Date.now() - 12600000).toISOString(),
      author: "Sophie Leroy"
    }
  ],
  de: [
    {
      title: "Neue Solar-Technologie bricht Effizienzrekorde an deutschen Forschungsinstituten",
      description: "Durch den Einsatz von Perowskit-Kristallen konnte die Energieausbeute herkömmlicher Paneele um über 30 Prozent gesteigert werden.",
      content: "Die Energiewende erhält einen kräftigen Schub durch neue technologische Durchbrüche in der Solarforschung. Die neuen Zellen sind nicht nur effizienter, sondern auch biegsam und günstiger in der Herstellung, was sie für breite Fassadenanwendungen attraktiv macht.",
      urlToImage: mockImages.science,
      url: "https://example.com/solar-forschung-de",
      source: { name: "Technik Heute" },
      publishedAt: new Date().toISOString(),
      author: "Hans Meier"
    },
    {
      title: "Automobilbranche stellt autonome Elektro-Busse für den Stadtverkehr vor",
      description: "Ein Münchner Mobilitätskonzern startet die Testphase für selbstfahrende Shuttles auf Linienstrecken im städtischen Nahverkehr.",
      content: "Autonomes Fahren erreicht den öffentlichen Nahverkehr. Die neuen Elektro-Busse nutzen Radar- und Lidar-Sensoren, um Hindernisse präzise zu umfahren. Sie bieten Platz für 15 Passagiere und sollen ab dem nächsten Halbjahr fest in den Fahrplan integriert werden.",
      urlToImage: mockImages.technology,
      url: "https://example.com/autonome-busse-de",
      source: { name: "Auto & Zukunft" },
      publishedAt: new Date(Date.now() - 1800000).toISOString(),
      author: "Stefan Weber"
    },
    {
      title: "Deutscher Exportüberschuss steigt dank starker Nachfrage aus Asien leicht an",
      description: "Der Außenhandel verzeichnete im abgelaufenen Monat ein Wachstum von 2,4 Prozent, insbesondere im Bereich Maschinenbau und Elektronik.",
      content: "Die deutsche Industrie bleibt trotz weltwirtschaftlicher Turbulenzen auf Wachstumskurs. Insbesondere der Export von präzisen Fertigungsmaschinen trieb das Gesamtergebnis an, was auf den anhaltenden Modernisierungsbedarf im asiatischen Raum zurückzuführen ist.",
      urlToImage: mockImages.business,
      url: "https://example.com/exportueberschuss-de",
      source: { name: "Handelsblatt Spiegel" },
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      author: "Monika Schmitt"
    },
    {
      title: "Radsport: Deutscher Meister triumphiert in spektakulärem Bergetappen-Finish",
      description: "In einem packenden Sprint auf über 2000 Metern Höhe setzte sich der Favorit gegen seine stärksten Konkurrenten durch.",
      content: "Die Alpen-Rundfahrt endete heute mit einer Sensation. Mit einer couragierten Attacke auf dem letzten Kilometer sicherte sich der deutsche Radprofi das Gelbe Trikot. Radsportexperten sprechen von einem taktischen Meisterwerk seines Teams.",
      urlToImage: mockImages.sports,
      url: "https://example.com/radsport-triumph-de",
      source: { name: "Sport Bild Journal" },
      publishedAt: new Date(Date.now() - 5400000).toISOString(),
      author: "Peter Müller"
    },
    {
      title: "Ernährungsstudie zeigt: Intervallfasten schützt Nervenzellen im Alter",
      description: "Langzeituntersuchungen an einer renommierten Berliner Klinik belegen signifikante zelluläre Regenerationseffekte durch zeitweises Fasten.",
      content: "Regelmäßige Essenspausen fördern die Autophagie – einen Prozess, bei dem Zellen beschädigte Bestandteile selbst abbauen. Die teilnehmenden Probanden zeigten über einen Zeitraum von drei Jahren eine verbesserte kognitive Fitness und geringere Entzündungswerte.",
      urlToImage: mockImages.health,
      url: "https://example.com/intervallfasten-studie-de",
      source: { name: "Gesundheit & Medizin" },
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      author: "Dr. Andrea Fischer"
    },
    {
      title: "Kultur: Sanierung des historischen Stadttheaters feierlich abgeschlossen",
      description: "Nach fünfjähriger Bauzeit öffnet das denkmalgeschützte Barockgebäude wieder seine Pforten für das Theaterpublikum.",
      content: "Die Stadt feiert die Wiedereröffnung ihres kulturellen Wahrzeichens. Mit modernster Bühnentechnik und aufwendig restaurierten Deckenfresken bietet der Konzertsaal nun wieder Platz für spektakuläre Operninszenierungen und Konzertabende.",
      urlToImage: mockImages.general,
      url: "https://example.com/stadttheater-sanierung-de",
      source: { name: "Kulturzeitung" },
      publishedAt: new Date(Date.now() - 9000000).toISOString(),
      author: "Laura Becker"
    },
    {
      title: "Künstliche Intelligenz optimiert Logistikketten im Hamburger Hafen",
      description: "Durch Echtzeit-Analysen von Verkehrs- und Containerdaten werden Staus an den Lkw-Terminals drastisch reduziert.",
      content: "Hamburg setzt auf intelligente Hafenlogistik. Algorithmen verteilen die Abholtermine für Lkw nun dynamisch, was die durchschnittliche Wartezeit um 25% verringert und den CO2-Ausstoß im Terminalbereich spürbar senkt.",
      urlToImage: mockImages.technology,
      url: "https://example.com/hafentech-hamburg-de",
      source: { name: "Elbe Logistik" },
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      author: "Christian Schulze"
    },
    {
      title: "Renommierte deutsche Universität forscht an neuartigen Wasserstoff-Speichern",
      description: "Ein Team aus Aachen präsentiert mikroporöse Metall-Gitter, die Gas bei deutlich niedrigerem Druck sicher binden können.",
      content: "Der Speicher-Durchbruch erleichtert den künftigen Transport von grünem Wasserstoff für Kraftwerke und Schwerlasttransporte. Die Materialien sind kostengünstig recyclebar und markieren einen Meilenstein für die Dekarbonisierung.",
      urlToImage: mockImages.science,
      url: "https://example.com/wasserstoff-speicher-de",
      source: { name: "Forschung & Innovation" },
      publishedAt: new Date(Date.now() - 12600000).toISOString(),
      author: "Dr. Martin Becker"
    }
  ],
  it: [
    {
      title: "L'Italia lancia il piano per la mobilità sostenibile: incentivi per e-bike e auto elettriche",
      description: "Il nuovo decreto ministeriale destina fondi significativi alla mobilità green per ridurre l'inquinamento nelle aree metropolitane.",
      content: "Con una mossa per modernizzare le infrastrutture cittadine, il Ministero ha annunciato importanti incentivi per l'acquisto di veicoli elettrici e la costruzione di corsie ciclabili protette nelle principali città italiane.",
      urlToImage: mockImages.general,
      url: "https://example.com/mobilita-green-it",
      source: { name: "Corriere della Sera Tech" },
      publishedAt: new Date().toISOString(),
      author: "Luca Rossi"
    },
    {
      title: "Cervello e Computer: L'Università di Milano sviluppa un microchip bio-compatibile",
      description: "Il dispositivo combina filamenti organici e silicio per registrare i segnali neurali con una risoluzione dieci volte superiore ai sensori tradizionali.",
      content: "La neurotecnologia compie un passo fondamentale in avanti. Il chip bio-ibrido si integra perfettamente con i tessuti organici senza innescare risposte immunitarie di rigetto, aprendo la strada a protesi artificiali controllate direttamente dal pensiero.",
      urlToImage: mockImages.technology,
      url: "https://example.com/microchip-bio-it",
      source: { name: "Scienza Oggi" },
      publishedAt: new Date(Date.now() - 1800000).toISOString(),
      author: "Francesca Neri"
    },
    {
      title: "Borsa di Milano: Piazza Affari chiude in rialzo spinta dai titoli tecnologici ed energetici",
      description: "La giornata finanziaria si conclude positivamente per l'indice principale milanese, grazie alla forte spinta delle start-up innovative.",
      content: "Il clima di fiducia sui mercati europei si riflette anche a Milano. I titoli del settore tech e delle energie rinnovabili hanno registrato i guadagni più consistenti, sostenuti dai buoni dati sulla crescita industriale trimestrale.",
      urlToImage: mockImages.business,
      url: "https://example.com/piazza-affari-it",
      source: { name: "Milano Finanza" },
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      author: "Marco Bianchi"
    },
    {
      title: "Ciclismo: Straordinaria vittoria sul traguardo alpino del ciclista italiano",
      description: "In una gara di montagna estenuante, l'atleta azzurro ha conquistato la maglia rosa con un attacco fulmineo nelle pendenze finali.",
      content: "Il Giro d'Italia ha regalato emozioni fortissime oggi. Una scalata perfetta sulle Dolomiti ha permesso all'italiano di staccare gli inseguitori e trionfare sul traguardo, regalando una gioia immensa ai tantissimi tifosi presenti sul percorso.",
      urlToImage: mockImages.sports,
      url: "https://example.com/ciclismo-giro-it",
      source: { name: "La Gazzetta dello Sport" },
      publishedAt: new Date(Date.now() - 5400000).toISOString(),
      author: "Giovanni Verdi"
    },
    {
      title: "Salute: Studio italiano dimostra i benefici della dieta mediterranea sull'invecchiamento cellulare",
      description: "Una ricerca condotta a Roma conferma che il consumo costante di olio d'oliva e verdure fresche allunga la vita delle cellule.",
      content: "I dati clinici indicano un rallentamento dello stress ossidativo grazie all'alto contenuto di polifenoli nella dieta tradizionale. I ricercatori consigliano di mantenere uno stile alimentare bilanciato per prevenire i disturbi legati alla terza età.",
      urlToImage: mockImages.health,
      url: "https://example.com/dieta-mediterranea-it",
      source: { name: "Salute & Benessere" },
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      author: "Dr.ssa Anna Neri"
    },
    {
      title: "Restauro archeologico 3D: Pompei torna a vivere nei visori di realtà virtuale",
      description: "Un progetto congiunto di università italiane e startup tecnologiche ricrea con accuratezza millimetrica le ville romane prima dell'eruzione.",
      content: "I visitatori possono ora passeggiare virtualmente tra gli affreschi originali del 79 d.C. Grazie a sensori radar ad alta frequenza e ricostruzioni grafiche immersive, Pompei diventa il primo parco archeologico interamente digitalizzato in 3D.",
      urlToImage: mockImages.technology,
      url: "https://example.com/pompei-realta-virtuale-it",
      source: { name: "Cultura e Innovazione" },
      publishedAt: new Date(Date.now() - 9000000).toISOString(),
      author: "Stefano Rossi"
    },
    {
      title: "Astronomia: Telescopio nazionale cattura l'immagine di un buco nero rotante",
      description: "Gli astrofisici italiani contribuiscono alla ricostruzione dell'anello di fuoco di una stella supermassiccia in una galassia vicina.",
      content: "La ricerca pubblicata su Nature mostra l'effetto gravitazionale estremo sulle emissioni di plasma cosmico. Il traguardo è stato possibile unendo i segnali di dieci radiotelescopi in tutto il mondo coordinati dalla base in Sardegna.",
      urlToImage: mockImages.science,
      url: "https://example.com/buco-nero-sardegna-it",
      source: { name: "Astrofisica Italiana" },
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      author: "Dr. Lorenzo Ricci"
    }
  ],
  pt: [
    {
      title: "Cientistas desenvolvem nova vacina contra a malária com eficácia superior a 90%",
      description: "Ensaios clínicos de fase final indicam proteção confiável contra a transmissão, marcando uma conquista histórica na saúde pública.",
      content: "O estudo publicado hoje traz uma nova esperança para milhões de pessoas em regiões tropicais. A vacina estimula com sucesso uma resposta imunológica duradoura de células T, prometendo erradicar infecções críticas nas próximas décadas.",
      urlToImage: mockImages.health,
      url: "https://example.com/vacina-malaria-pt",
      source: { name: "Jornal de Medicina" },
      publishedAt: new Date().toISOString(),
      author: "Ana Silva"
    },
    {
      title: "Inovação Tecnológica: Portugal lança o primeiro parque de energia solar flutuante",
      description: "Localizado na albufeira de uma grande barragem, o projeto combina captação fotovoltaica com geração hídrica limpa.",
      content: "Esta nova infraestrutura marca um avanço importante na transição ecológica. Os painéis flutuantes aproveitam o espelho de água para melhorar o arrefecimento das células solares, aumentando o rendimento energético em quase 15 por cento.",
      urlToImage: mockImages.technology,
      url: "https://example.com/solar-flutuante-pt",
      source: { name: "Tecnologia Hoje" },
      publishedAt: new Date(Date.now() - 1800000).toISOString(),
      author: "Rui Costa"
    },
    {
      title: "Exportações de calçado português registram crescimento recorde no mercado internacional",
      description: "O setor faturou um valor histórico no último trimestre, impulsionado pela alta qualidade do design sustentável português.",
      content: "O calçado 'Made in Portugal' continua a conquistar mercados exigentes na Europa e América. O foco na produção ecológica e na economia circular atraiu novos parceiros de retalho, consolidando a reputação de excelência do produto nacional.",
      urlToImage: mockImages.business,
      url: "https://example.com/calcado-portugues-pt",
      source: { name: "Portugal Económico" },
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      author: "Maria Santos"
    },
    {
      title: "Futebol: Seleção nacional garante classificação para o torneio mundial com goleada",
      description: "Uma exibição fantástica do ataque português culminou com a vitória por 4-0 no jogo decisivo realizado em Lisboa.",
      content: "A atmosfera festiva encheu o estádio nacional após uma exibição de futebol espetacular. Com jogadas coordenadas e grande consistência tática, a equipa garantiu a presença na fase final do campeonato com uma das melhores campanhas da história.",
      urlToImage: mockImages.sports,
      url: "https://example.com/futebol-selecao-pt",
      source: { name: "Diário de Desporto" },
      publishedAt: new Date(Date.now() - 5400000).toISOString(),
      author: "João Pereira"
    },
    {
      title: "Astronomia: Telescópio deteta atividade geológica inédita em lua de Júpiter",
      description: "Novos espectros de infravermelho sugerem a presença de vulcões ativos de silicato expelindo lava a centenas de quilómetros.",
      content: "A descoberta desafia os modelos astrofísicos tradicionais de aquecimento de maré. O satélite, coberto por uma camada de gelo e enxofre, exibe dinâmicas internas muito mais complexas e energéticas do que se estimava anteriormente.",
      urlToImage: mockImages.science,
      url: "https://example.com/astronomia-jupiter-pt",
      source: { name: "Ciência e Espaço" },
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      author: "Dr. Carlos Sousa"
    },
    {
      title: "Inteligência Artificial ajuda a decifrar manuscritos antigos da Biblioteca de Coimbra",
      description: "O sistema de reconhecimento ótico lê pergaminhos deteriorados pelo tempo, traduzindo textos históricos latinos com alta fidelidade.",
      content: "A tecnologia auxilia historiadores a revelar segredos medievais portugueses. Os algoritmos reconstróem caracteres apagados e trechos destruídos por humidade, permitindo a catalogação digital completa de obras raras que estavam inacessíveis.",
      urlToImage: mockImages.technology,
      url: "https://example.com/ia-manuscritos-coimbra-pt",
      source: { name: "História & Futuro" },
      publishedAt: new Date(Date.now() - 9000000).toISOString(),
      author: "Pedro Nunes"
    },
    {
      title: "Investigadores portugueses descobrem molécula marinha que combate bactérias resistentes",
      description: "Extraído de algas da costa dos Açores, o composto mostrou-se altamente eficaz na destruição de biofilmes bacterianos em ensaios.",
      content: "A descoberta abre novas vias para o tratamento de infeções hospitalares graves. Os ensaios laboratoriais indicam que a molécula ataca a barreira protetora da bactéria, permitindo que antibióticos tradicionais funcionem novamente com potência total.",
      urlToImage: mockImages.health,
      url: "https://example.com/composto-marinho-acores-pt",
      source: { name: "Fórum Biotecnológico" },
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      author: "Dra. Filipa Reis"
    }
  ],
  ru: [
    {
      title: "В Сибири обнаружен новый вид древних теплолюбивых растений эпохи динозавров",
      description: "Палеоботаники изучили окаменелости, указывающие на совершенно иной тропический климат региона миллионы лет назад.",
      content: "Удивительные находки в вечной мерзлоте проливают свет на эволюционную историю флоры Евразии. Хорошо сохранившиеся семена позволили ученым полностью реконструировать структуру древнего растения.",
      urlToImage: mockImages.science,
      url: "https://example.com/paleo-siberia-ru",
      source: { name: "Наука Сегодня" },
      publishedAt: new Date().toISOString(),
      author: "Алексей Иванов"
    },
    {
      title: "Технологический Прорыв: Представлен первый отечественный квантовый процессор",
      description: "Разработчики из научно-исследовательского центра продемонстрировали стабильную работу схемы на сверхпроводящих кубитах.",
      content: "Отечественная сфера квантовых вычислений сделала важнейший шаг вперед. Плата процессора показывает высокую точность логических операций при ультранизких температурах, что позволяет запустить новые алгоритмы машинного обучения.",
      urlToImage: mockImages.technology,
      url: "https://example.com/quantum-tech-ru",
      source: { name: "Мир IT" },
      publishedAt: new Date(Date.now() - 1800000).toISOString(),
      author: "Дмитрий Петров"
    },
    {
      title: "Финансовые рынки: Индекс акций вырос на фоне снижения инфляционного давления",
      description: "Российский фондовый рынок продемонстрировал уверенный рост в секторах высоких технологий и экологически чистой энергетики.",
      content: "Позитивный тренд укрепился благодаря сильным отчетам ведущих корпораций. Аналитики прогнозируют продолжение роста до конца квартала благодаря притоку частных инвестиций в цифровые инновации.",
      urlToImage: mockImages.business,
      url: "https://example.com/market-growth-ru",
      source: { name: "Экономика и Бизнес" },
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      author: "Елена Смирнова"
    },
    {
      title: "Хоккей: Сборная одержала яркую победу в финале международного турнира",
      description: "В напряженном матче наши хоккеисты вырвали победу со счетом 3:2 в овертайме, завоевав золотые медали.",
      content: "Драматичный поединок на льду завершился триумфом. Быстрые контратаки и надежная игра вратаря позволили сдержать натиск соперников и провести решающую шайбу в ворота на пятой минуте овертайма.",
      urlToImage: mockImages.sports,
      url: "https://example.com/hockey-triumph-ru",
      source: { name: "Спорт-Экспресс" },
      publishedAt: new Date(Date.now() - 5400000).toISOString(),
      author: "Игорь Кузнецов"
    },
    {
      title: "Медицина: Создано новое лекарство для восстановления суставов на основе биогеля",
      description: "Клинические испытания подтвердили ускоренную регенерацию хрящевой ткани без побочных эффектов у большинства пациентов.",
      content: "Новый медицинский препарат вводится локально и стимулирует естественные клеточные процессы деления. Разработка ученых поможет избежать хирургического вмешательства тысячам людей с заболеваниями суставов.",
      urlToImage: mockImages.health,
      url: "https://example.com/biogel-medicine-ru",
      source: { name: "Вестник Здоровья" },
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      author: "Д-р Ольга Соколова"
    },
    {
      title: "Компьютерное зрение помогает восстановить фрески древнерусских соборов",
      description: "ИИ анализирует осыпавшиеся осколки штукатурки и воссоздает первоначальные изображения с точностью до миллиметра.",
      content: "Специалисты Новгородского музея запустили нейросетевую систему реставрации. Алгоритмы сканируют тысячи мелких фрагментов и показывают на экране 3D-модели старинных ликов, помогая историкам восстановить наследие.",
      urlToImage: mockImages.technology,
      url: "https://example.com/ii-restavraciya-fresok-ru",
      source: { name: "Культура и Технологии" },
      publishedAt: new Date(Date.now() - 9000000).toISOString(),
      author: "Наталья Петрова"
    },
    {
      title: "Астрономы обнаружили новый астероид, сближающийся с Землей в следующем веке",
      description: "Траектория небесного тела не представляет опасности, но дает уникальную возможность для изучения его состава с близкого расстояния.",
      content: "В обсерватории на Урале подтвердили координаты обнаруженного космического тела. Астероид диаметром 200 метров состоит преимущественно из железа и никеля, что делает его ценным объектом для будущей космической добычи ресурсов.",
      urlToImage: mockImages.science,
      url: "https://example.com/asteroid- Ural-ru",
      source: { name: "Космос Пресс" },
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      author: "Сергей Васильев"
    }
  ],
  zh: [
    {
      title: "新一代量子卫星“墨子二号”成功发射升空：实现超长距离安全加密通信",
      description: "此次发射搭载了先进的纠缠光源设备，将覆盖网络安全加密层，进一步夯实全球安全数据通道基础。",
      content: "今天凌晨，新一代量子科学实验卫星在酒泉卫星发射中心成功升空。在预定轨道运行后，该卫星将开展多项量子物理基础实验研究，大幅提升全球远距离加密信息分发的效率与安全性。",
      urlToImage: mockImages.science,
      url: "https://example.com/quantum-satellite-zh",
      source: { name: "科技日报" },
      publishedAt: new Date().toISOString(),
      author: "王伟"
    },
    {
      title: "前沿科技：中国团队研发出超长寿命钠离子电池电池技术",
      description: "新型负极材料使得电池的循环充放电次数突破1万次，成本较锂电池降低近百分之四十。",
      content: "储能电池领域取得革命性突破。该款新型钠电池在极端高低温环境下均能保持出色的容量，极其适合大规模智能电网储能和短途电动汽车的电力配套。",
      urlToImage: mockImages.technology,
      url: "https://example.com/battery-tech-zh",
      source: { name: "科技新发现" },
      publishedAt: new Date(Date.now() - 1800000).toISOString(),
      author: "李明"
    },
    {
      title: "金融快讯：主要股票指数收盘创下历史新高，新能源板块领涨",
      description: "在国内宏观经济数据向好的多重利好刺激下，两市交易额放量，科技型创业企业备受追捧。",
      content: "今天A股市场表现强劲，半导体、光伏和新能源汽车板块获得了大批海外资本的持续流入。分析师认为在流动性充裕的背景下，优质龙头资产的升值空间依旧十分广阔。",
      urlToImage: mockImages.business,
      url: "https://example.com/market-rally-zh",
      source: { name: "环球财经导报" },
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      author: "张华"
    },
    {
      title: "体育盛事：国家田径队在世界大奖赛中斩获两枚百米飞人金牌",
      description: "在一场强强对话的决赛中，我国男女百米飞人分别夺冠，双双打破全国最好成绩纪录。",
      content: "在刚刚结束的世界田径大奖赛男子与女子百米决赛中，中国选手跑出了极佳的爆发节奏。两位小将均在逆风情况下率先压线冲关，赢得了满场观众的喝彩。",
      urlToImage: mockImages.sports,
      url: "https://example.com/athletics-golds-zh",
      source: { name: "体育快讯" },
      publishedAt: new Date(Date.now() - 5400000).toISOString(),
      author: "赵磊"
    },
    {
      title: "医学进展：新型靶向免疫抗癌药物临床试验显示超九成缓解率",
      description: "由生物医药实验室开发的肿瘤微环境调控分子，能在不损伤健康淋巴细胞的前提下消灭肿瘤病灶。",
      content: "临床医学报告指出，这款新型靶向抗癌药物表现出了令人满意的安全性。在首批受试者中，有九成以上实现了病理上的完全缓解，副作用发生率远低于传统化学治疗方法。",
      urlToImage: mockImages.health,
      url: "https://example.com/cancer-drug-zh",
      source: { name: "健康医学周刊" },
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      author: "陈静"
    },
    {
      title: "5G+智能工厂：重工业领域率先实现全流程机器人无缝协作",
      description: "在沈阳的大型钢机装配线上，机械臂在5G低时延网络指挥下完成精度达微米级的自动化咬合组装。",
      content: "工业物联网应用进入深水区。通过5G边缘计算节点，数百台设备之间的动作延时被压缩在1毫秒以内，不仅生产效率提高35%，还极大地降低了人工在高危车间的作业风险。",
      urlToImage: mockImages.technology,
      url: "https://example.com/smart-factory-zh",
      source: { name: "工业与自动化" },
      publishedAt: new Date(Date.now() - 9000000).toISOString(),
      author: "钱进"
    },
    {
      title: "中国空间站最新科研成果：首次完成太空培育水稻种子全生命周期培养",
      description: "神舟宇航员带回的实验容器表明，微重力环境下的第二代水稻株表现出更强的抗倒伏特性。",
      content: "空间生命科学实验再传喜讯。在轨道舱微重力及强宇宙辐射环境下，科研团队完成了从水稻种子萌发、抽穗到结籽的全部发育流程，为未来空间农业自给提供了坚实的技术累积。",
      urlToImage: mockImages.science,
      url: "https://example.com/space-rice-zh",
      source: { name: "太空探索杂志" },
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      author: "孙悟空"
    }
  ]
};

const movieArticles = {
  en: [
    {
      title: "Sci-Fi Epic 'Dune: Part III' Officially Confirmed with Denis Villeneuve Returning",
      description: "Legendary Pictures and Warner Bros. have greenlit the next installment of the desert epic, adapting Frank Herbert's 'Dune Messiah' for a 2028 release.",
      content: "Cinemagoers and sci-fi enthusiasts are celebrating today as the production studios officially confirmed that Denis Villeneuve will return to write and direct 'Dune: Part III'. The script is reportedly in active development, focusing on the dark reign of Paul Atreides. Timothée Chalamet and Zendaya are expected to reprise their iconic roles.",
      urlToImage: mockImages.entertainment,
      url: "https://example.com/dune-3-confirmed-en",
      source: { name: "Hollywood Reporter" },
      publishedAt: new Date().toISOString(),
      author: "Rebecca Land"
    },
    {
      title: "Box Office Boom: Superhero Blockbuster Surpasses $1.5 Billion Mark Globally",
      description: "The latest cinematic universe addition breaks international ticket records, entering the top 10 highest-grossing films of all time.",
      content: "The movie theaters are packed worldwide. The latest cinematic blockbuster has officially crossed the $1.5 billion milestone, driven by stellar reviews, premium IMAX screens, and repeat viewings. Theater chains report their highest quarterly revenues since 2019, sparking hope for a full theatrical resurgence.",
      urlToImage: mockImages.entertainment,
      url: "https://example.com/box-office-billion-en",
      source: { name: "Variety Cinema" },
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      author: "Ethan Hunt"
    }
  ],
  te: [
    {
      title: "సంచలనం సృష్టిస్తున్న గ్లోబల్ ప్రాజెక్ట్: 'డ్యూన్ పార్ట్ 3' మూవీ అధికారికంగా ఖరారు!",
      description: "డైరెక్టర్ డెనిస్ విల్లెనెయువే దర్శకత్వంలో మూడో భాగం రాబోతున్నట్లు హాలీవుడ్ ప్రముఖ నిర్మాణ సంస్థలు అధికారికంగా ప్రకటించాయి.",
      content: "ప్రపంచవ్యాప్తంగా ఘనవిజయం సాధించిన సైన్స్ ఫిక్షన్ ఎపిక్ 'డ్యూన్' సిరీస్ నుంచి మూడో భాగం రాబోతోంది. లెజెండరీ పిక్చర్స్ ఈ మేరకు అధికారిక ప్రకటన విడుదల చేసింది. ఫ్రాంక్ హెర్బర్ట్ రాసిన 'డ్యూన్ మెస్సీయా' నవల ఆధారంగా ఈ సినిమా స్క్రిప్ట్ సిద్ధమవుతోంది. షూటింగ్ త్వరలోనే ప్రారంభం కానుంది.",
      urlToImage: mockImages.entertainment,
      url: "https://example.com/dune-3-confirmed-te",
      source: { name: "టాలీవుడ్ టాకీస్" },
      publishedAt: new Date().toISOString(),
      author: "మనోజ్ కుమార్"
    }
  ],
  es: [
    {
      title: "La epopeya de ciencia ficción 'Dune: Parte III' confirmada oficialmente con Denis Villeneuve",
      description: "Legendary Pictures y Warner Bros. han dado luz verde a la secuela, adaptando 'Dune Messiah' de Frank Herbert para un estreno previsto en 2028.",
      content: "Los cinéfilos están de enhorabuena ya que los estudios de producción confirmaron oficialmente que Denis Villeneuve regresará para escribir y dirigir 'Dune: Parte III'. Se espera que Timothée Chalamet y Zendaya retomen sus papeles icónicos.",
      urlToImage: mockImages.entertainment,
      url: "https://example.com/dune-3-confirmed-es",
      source: { name: "Cine En Español" },
      publishedAt: new Date().toISOString(),
      author: "Carlos Gómez"
    }
  ],
  fr: [
    {
      title: "L'épopée de science-fiction 'Dune: Partie III' officiellement confirmée avec Denis Villeneuve",
      description: "Legendary Pictures et Warner Bros. ont donné le feu vert à la suite, adaptant 'Dune Messiah' de Frank Herbert pour une sortie en 2028.",
      content: "Les cinéphiles célèbrent aujourd'hui la confirmation officielle que Denis Villeneuve reviendra pour écrire et réaliser 'Dune: Partie III'. Timothée Chalamet et Zendaya devraient reprendre leurs rôles emblématiques.",
      urlToImage: mockImages.entertainment,
      url: "https://example.com/dune-3-confirmed-fr",
      source: { name: "Cinéma France" },
      publishedAt: new Date().toISOString(),
      author: "Marie Dupont"
    }
  ],
  de: [
    {
      title: "Sci-Fi-Epos 'Dune: Teil III' offiziell bestätigt, Regisseur Denis Villeneuve kehrt zurück",
      description: "Legendary Pictures und Warner Bros. haben grünes Licht für die Fortsetzung gegeben, die Frank Herberts 'Dune Messiah' für 2028 adaptiert.",
      content: "Kinogänger und Sci-Fi-Enthusiasten feiern heute die offizielle Bestätigung, dass Denis Villeneuve für 'Dune: Teil III' zurückkehren wird. Das Drehbuch befindet sich bereits in der aktiven Entwicklung.",
      urlToImage: mockImages.entertainment,
      url: "https://example.com/dune-3-confirmed-de",
      source: { name: "Kinowelt Aktuell" },
      publishedAt: new Date().toISOString(),
      author: "Hans Richter"
    }
  ],
  it: [
    {
      title: "L'epopea sci-fi 'Dune: Parte III' ufficialmente confermata con il ritorno di Denis Villeneuve",
      description: "Legendary Pictures e Warner Bros. hanno dato il via libera al sequel, che adatterà 'Dune Messiah' di Frank Herbert per il 2028.",
      content: "Grande entusiasmo tra gli appassionati di cinema per la conferma del ritorno di Denis Villeneuve alla regia e alla sceneggiatura di 'Dune: Parte III'. Riprenderanno i loro ruoli anche Timothée Chalamet e Zendaya.",
      urlToImage: mockImages.entertainment,
      url: "https://example.com/dune-3-confirmed-it",
      source: { name: "CineItalia" },
      publishedAt: new Date().toISOString(),
      author: "Giuseppe Rossi"
    }
  ],
  pt: [
    {
      title: "Épico de Ficção Científica 'Duna: Parte III' confirmado oficialmente com Denis Villeneuve",
      description: "Legendary Pictures e Warner Bros. deram luz verde à sequência, adaptando 'Duna Messias' de Frank Herbert para lançamento em 2028.",
      content: "Os fãs de cinema estão comemorando hoje a confirmação oficial de que Denis Villeneuve retornará para escrever e dirigir 'Duna: Parte III'. Timothée Chalamet e Zendaya devem reprisar seus papéis lendários.",
      urlToImage: mockImages.entertainment,
      url: "https://example.com/dune-3-confirmed-pt",
      source: { name: "Cinema Brasil" },
      publishedAt: new Date().toISOString(),
      author: "Ana Silva"
    }
  ],
  ru: [
    {
      title: "Научно-фантастическая драма 'Дюна: Часть III' официально подтверждена с Дени Вильнёвом",
      description: "Legendary Pictures и Warner Bros. одобрили продолжение франшизы, адаптирующее роман Фрэнка Герберта 'Мессия Дюны' к 2028 году.",
      content: "Сегодня киноманы по всему миру празднуют официальное подтверждение того, что Дени Вильнёв вернется в качестве режиссера и сценариста 'Дюна: Часть III'. Тимоти Шаламе и Зендея вернутся к своим ролям.",
      urlToImage: mockImages.entertainment,
      url: "https://example.com/dune-3-confirmed-ru",
      source: { name: "КиноПоиск Новости" },
      publishedAt: new Date().toISOString(),
      author: "Иван Иванов"
    }
  ],
  zh: [
    {
      title: "科幻巨制《沙丘3》官方正式宣布立项，导演丹尼斯·维伦纽瓦确认回归执导",
      description: "传奇影业与华纳兄弟正式给第三部亮起绿灯，将改编弗兰克·赫伯特的经典小说《沙丘救世主》，预计2028年上映。",
      content: "今天，全球影迷迎来了令人兴奋的消息。片方正式确认《沙丘3》已进入前期筹备与剧本开发阶段。提莫西·查拉梅与赞达亚确认回归，继续出演保罗·亚崔迪与契妮的传奇故事。",
      urlToImage: mockImages.entertainment,
      url: "https://example.com/dune-3-confirmed-zh",
      source: { name: "好莱坞电影报道" },
      publishedAt: new Date().toISOString(),
      author: "张伟"
    }
  ]
};

export function getMockArticles(language, category) {
  const langKey = mockArticles[language] ? language : 'en';
  
  if (category === 'entertainment') {
    return movieArticles[langKey] || movieArticles['en'];
  }
  
  const list = mockArticles[langKey];
  
  if (!category) {
    const extraMovies = movieArticles[langKey] || movieArticles['en'];
    return [...list, ...extraMovies];
  }
  
  // Filter by category or fallback to all if not found
  const filtered = list.filter(a => {
    if (category === 'technology' && a.urlToImage === mockImages.technology) return true;
    if (category === 'business' && a.urlToImage === mockImages.business) return true;
    if (category === 'sports' && a.urlToImage === mockImages.sports) return true;
    if (category === 'health' && a.urlToImage === mockImages.health) return true;
    if (category === 'science' && a.urlToImage === mockImages.science) return true;
    return false;
  });
  
  return filtered.length > 0 ? filtered : list;
}
