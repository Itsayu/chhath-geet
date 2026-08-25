import { ChhathDay, FolkTrack, NostalgicMemory, GhatObject } from '../types';

export const CHHATH_DAYS: ChhathDay[] = [
  {
    id: 1,
    hindiName: 'नहाय-खाय',
    englishName: 'Nahay Khay',
    datePhase: 'कार्तिक शुक्ल चतुर्थी (Day 1)',
    tagline: 'पवित्र स्नान, शुद्धता का संकल्प और कद्दू-भात का महाप्रसाद',
    rituals: [
      'गंगा या पवित्र नदी में स्नान कर मन व तन की शुद्धि',
      'पीतल या मिट्टी के नए बर्तनों में सेंधा नमक व शुद्ध घी में पकाया गया भोजन',
      'लौकी (कद्दू), चने की दाल और अरवा चावल का सात्विक महाप्रसाद',
      'व्रती के भोजनोपरांत ही परिवार के अन्य सदस्यों द्वारा प्रसाद ग्रहण'
    ],
    prasad: 'कद्दू-भात, चने की दाल (सेंधा नमक व शुद्ध घी निर्मित)',
    specialMemory: 'सुबह-सुबह माई के साथ गंगा स्नान के बाद चूल्हे से उठती कद्दू-भात की सौंधी खुशबू...',
    colorTheme: {
      bgGradient: 'from-amber-950/40 via-stone-900/60 to-orange-950/30',
      accent: 'amber-400',
      glow: 'rgba(245, 158, 11, 0.4)'
    }
  },
  {
    id: 2,
    hindiName: 'खरना / लोहंडा',
    englishName: 'Kharna',
    datePhase: 'कार्तिक शुक्ल पंचमी (Day 2)',
    tagline: 'दिनभर का निर्जला उपवास और मिट्टी के चूल्हे पर बनी गुड़ की खीर (रसिया)',
    rituals: [
      'सूर्योदय से सूर्यास्त तक पूर्ण निर्जला उपवास',
      'शाम को मिट्टी के नए चूल्हे पर आम की लकड़ी से गुड़-दूध की खीर (रसिया) का निर्माण',
      'केले के पत्ते पर छठी मईया को खीर, घी की रोटी और केले का भोग अर्पण',
      'भोग के बाद एकांत में व्रती द्वारा प्रसाद ग्रहण कर 36 घंटे के महाव्रत का आरंभ'
    ],
    prasad: 'गुड़ की खीर (रसिया), घी चुपड़ी गेहूं की रोटी और केला',
    specialMemory: 'मिट्टी के चूल्हे पे आम की लकड़ी का धुआं और गुड़ की खीर का वो स्वाद जो साल भर याद रहता है...',
    colorTheme: {
      bgGradient: 'from-orange-950/50 via-stone-900/70 to-red-950/40',
      accent: 'orange-400',
      glow: 'rgba(249, 115, 22, 0.45)'
    }
  },
  {
    id: 3,
    hindiName: 'संध्या अर्घ्य',
    englishName: 'Sandhya Arghya',
    datePhase: 'कार्तिक शुक्ल षष्ठी (Day 3)',
    tagline: 'अस्ताचलगामी सूर्य देव को नमन, सूप-दउरा की सजावट और घाट का दिव्य दृश्य',
    rituals: [
      'घर में शुद्ध घी से पारंपरिक ठेकुआ और कसार का निर्माण',
      'बांस के सूप और दउरा में मौसमी फल, गन्ना, मूली, अदरक, गागल नींबू का शृंगार',
      'माथे पर दउरा उठाए "जय छठी मईया" के जयघोष के साथ घाट की ओर प्रस्थान',
      'शीतल जल में कमर तक खड़े होकर डूबते सूर्य देव को दूध व जल का अर्घ्य'
    ],
    prasad: 'शुद्ध देसी घी का ठेकुआ, कसार, गागल नींबू, नारियल, ईख',
    specialMemory: 'घाट पे चारों तरफ गन्ने के मंडप, सैकड़ों जलते दीये और शारदा सिन्हा जी के गूंजते गीत...',
    colorTheme: {
      bgGradient: 'from-rose-950/60 via-amber-950/50 to-indigo-950/60',
      accent: 'rose-400',
      glow: 'rgba(244, 63, 94, 0.5)'
    }
  },
  {
    id: 4,
    hindiName: 'उषा अर्घ्य / पारण',
    englishName: 'Usha Arghya',
    datePhase: 'कार्तिक शुक्ल सप्तमी (Day 4)',
    tagline: 'उदीयमान भुवन भास्कर को प्रातःकालीन अर्घ्य, मंगलकामना और व्रत का पारण',
    rituals: [
      'भोर में ब्रह्म मुहूर्त में पूरे परिवार सहित गंगा घाट पर एकत्र होना',
      'हल्की सिहरन वाली ठंड में नदी की लहरों के बीच सूर्योदय की प्रतीक्षा',
      'लाल-सुनहरी किरणों के फूटते ही उदीयमान सूर्य को दूध व जल का अंतिम अर्घ्य',
      'छठी मईया से संतान व परिवार की सुख-समृद्धि का आशीर्वाद और पारण'
    ],
    prasad: 'पारण के बाद ठेकुआ, कच्चा चना, अदरक, फल और चरणामृत',
    specialMemory: 'भोर की ठंडी हवा, जलते दीयों की लालिमा और "उग हो सुरुज देव भइले अरग के बेर" की गूंज...',
    colorTheme: {
      bgGradient: 'from-amber-900/60 via-orange-950/50 to-sky-950/60',
      accent: 'amber-300',
      glow: 'rgba(251, 191, 36, 0.55)'
    }
  }
];

export const FOLK_TRACKS: FolkTrack[] = [
  {
    id: 'track-1',
    titleHindi: 'केलवा के पात पर उगलें सुरुज मल झाँके-झुके',
    titleEnglish: 'Kelwa Ke Paat Par',
    singer: 'पद्मभूषण शारदा सिन्हा (Sharda Sinha)',
    duration: '6:42',
    youtubeId: 'qQjH88fD-7U',
    culturalNote: 'छठ का सबसे अमर और कालजयी गीत। केले के पत्ते पर सूर्य देव की सुनहरी किरणों का अद्भुत वर्णन।',
    spotifyUrl: 'https://open.spotify.com/search/Kelwa%20Ke%20Paat%20Par%20Sharda%20Sinha',
    ytMusicUrl: 'https://music.youtube.com/search?q=Kelwa+Ke+Paat+Par+Sharda+Sinha'
  },
  {
    id: 'track-2',
    titleHindi: 'काँच ही बाँस के बहँगिया, बहँगी लचकत जाए',
    titleEnglish: 'Kaanch Hi Baans Ke Bahangiya',
    singer: 'अनुराधा पौडवाल (Anuradha Paudwal)',
    duration: '5:50',
    youtubeId: 'Oq5Q5m2hC54',
    culturalNote: 'कच्चे बांस की बहंगी पर दउरा सजाकर घाट जाने का भावुक और हृदयस्पर्शी लोकगीत।',
    spotifyUrl: 'https://open.spotify.com/search/Kaanch%20Hi%20Baans%20Ke%20Bahangiya%20Anuradha%20Paudwal',
    ytMusicUrl: 'https://music.youtube.com/search?q=Kaanch+Hi+Baans+Ke+Bahangiya+Anuradha+Paudwal'
  },
  {
    id: 'track-3',
    titleHindi: 'हो दीनानाथ! उगीं हे सुरुज देव, भइले अरघ के बेर',
    titleEnglish: 'Ho Deenanath',
    singer: 'शारदा सिन्हा (Sharda Sinha)',
    duration: '7:18',
    youtubeId: '7Q3Z8QZ1n6I',
    culturalNote: 'घाट के ठंडे पानी में खड़े होकर भगवान सूर्य के उदित होने की प्रार्थना।',
    spotifyUrl: 'https://open.spotify.com/search/Ho%20Deenanath%20Sharda%20Sinha',
    ytMusicUrl: 'https://music.youtube.com/search?q=Ho+Deenanath+Sharda+Sinha'
  },
  {
    id: 'track-4',
    titleHindi: 'मारबो रे सुगवा धनुष से, सुगा गिरे मुरझाए',
    titleEnglish: 'Marbo Re Sugwa',
    singer: 'शारदा सिन्हा (Sharda Sinha)',
    duration: '5:32',
    youtubeId: 'Hj-gE1YwF7Q',
    culturalNote: 'प्रसाद के फलों को झूठा होने से बचाने की मातृ-पवित्रता और भोला-भाला लोक अनुराग।',
    spotifyUrl: 'https://open.spotify.com/search/Marbo%20Re%20Sugwa%20Sharda%20Sinha',
    ytMusicUrl: 'https://music.youtube.com/search?q=Marbo+Re+Sugwa+Sharda+Sinha'
  },
  {
    id: 'track-5',
    titleHindi: 'पहिले पहिल हम कईनी, छठी मईया बरत तोहार',
    titleEnglish: 'Pahile Pahil Hum Kaini',
    singer: 'शारदा सिन्हा (Sharda Sinha)',
    duration: '6:15',
    youtubeId: 'Jg6T9Q8b5qg',
    culturalNote: 'पहली बार छठ व्रत उठाने वाली नई व्रती के हृदय की श्रद्धा और पवित्र कंपन।',
    spotifyUrl: 'https://open.spotify.com/search/Pahile%20Pahil%20Hum%20Kaini%20Sharda%20Sinha',
    ytMusicUrl: 'https://music.youtube.com/search?q=Pahile+Pahil+Hum+Kaini+Sharda+Sinha'
  },
  {
    id: 'track-6',
    titleHindi: 'जोड़े जोड़े फलवा सुरुज देव के चढ़इबे',
    titleEnglish: 'Jode Jode Phalwa',
    singer: 'पवन सिंह / देवी (Pawan Singh / Devi)',
    duration: '4:58',
    youtubeId: 'X7wG3y9l-z8',
    culturalNote: 'जोड़े-जोड़े फल, नारियल और गन्ने के साथ छठी मईया के चरणों में मनौती।',
    spotifyUrl: 'https://open.spotify.com/search/Jode%20Jode%20Phalwa%20Chhath',
    ytMusicUrl: 'https://music.youtube.com/search?q=Jode+Jode+Phalwa+Chhath'
  }
];

export const NOSTALGIC_MEMORIES: NostalgicMemory[] = [
  {
    id: 'mem-1',
    quoteHindi: 'काँच ही बाँस के बहंगिया, बहँगी लचकत जाए... बात जे पूछे बटोहिया, बहँगी केकरा के जाए?',
    quoteEnglish: '"The tender bamboo shoulder-pole gently bends under the weight of holy offerings... As a passerby asks, for whom does this sacred journey go?"',
    author: 'पारंपरिक लोकगीत (Traditional Folk Lore)',
    category: 'lyric',
    tag: 'Folk Verse'
  },
  {
    id: 'mem-2',
    quoteHindi: 'छठ के गेहूं धोने के बाद छत पर पहरा देना कि कोई चिड़िया भी उसे झूठा न कर दे... वो बचपन का समर्पण आज भी आंखों में है।',
    quoteEnglish: 'Guarding the washed wheat on the rooftop with a stick so not even a sparrow could peck at it... that childhood sense of sanctity is irreplaceable.',
    author: 'घाट की यादें (Nostalgic Recollection)',
    category: 'childhood',
    tag: 'Childhood Vigil'
  },
  {
    id: 'mem-3',
    quoteHindi: 'मिट्टी के चूल्हे पे आम की सूखी लकड़ियों की आंच, शुद्ध घी में सिकते ठेकुआ के सांचे के निशान और पूरे घर में महकती इलायची की खुशबू।',
    quoteEnglish: 'The crackling mango wood on clay hearths, pure desi ghee sizzling over hand-carved wooden Thekua molds, filling every corner with cardamom aroma.',
    author: 'माई का रसोईघर (Mother\'s Kitchen)',
    category: 'aroma',
    tag: 'Thekua Aroma'
  },
  {
    id: 'mem-4',
    quoteHindi: 'भोर के 3 बजे कड़ाके की ठंड में सिर पर दउरा लिए, नंगे पांव "जय छठी मईया" के नारों के साथ घाट की सीढ़ियों पर कदम रखना।',
    quoteEnglish: 'Walking barefoot at 3 AM through the morning mist with the heavy Daura on the head, illuminated only by lamps and chorus chants of Jai Chhathi Maiya.',
    author: 'गंगा तट की अनुभूति (Ghat Pilgrimage)',
    category: 'tradition',
    tag: 'Ghat Pilgrimage'
  },
  {
    id: 'mem-5',
    quoteHindi: 'उग हो सुरुज देव भइले अरग के बेर... नदी के ठंडे पानी में खड़े होकर उगते सूरज की पहली लाल किरण पर अर्घ्य का वो दिव्य क्षण।',
    quoteEnglish: 'Standing knee-deep in freezing Ganga water, waiting in quiet devotion for the first golden rays to break over the horizon to offer the morning Arghya.',
    author: 'उषा अर्घ्य दर्शन (Dawn Transcendence)',
    category: 'tradition',
    tag: 'Surya Arghya'
  },
  {
    id: 'mem-6',
    quoteHindi: 'नाक से मांग तक गहरा सिंदूर, छठी मईया के गीतों पर माताओं का रोना और हंसना... यह पर्व नहीं, हमारी आत्मा है।',
    quoteEnglish: 'The vermilion line drawn from nose tip to hair parting, mothers tearfully singing hymns—Chhath is not merely a festival, it is our collective soul.',
    author: 'संस्कृति धरोहर (Cultural Identity)',
    category: 'tradition',
    tag: 'Eternal Bond'
  }
];

export const SACRED_SOOP_OBJECTS: GhatObject[] = [
  {
    id: 'thekua',
    nameHindi: 'ठेकुआ (महाप्रसाद)',
    nameEnglish: 'Thekua (Sacred Mahaprasad)',
    description: 'गेहूं के आटे, गुड़ या चीनी, शुद्ध देसी घी, सौंफ व इलायची से बना लकड़ी के पारंपरिक सांचे (सांचा) पर गढ़ा हुआ अमर प्रसाद।',
    culturalSignificance: 'प्रकृति और सात्विकता का प्रतीक। बिना किसी मिलावट के पवित्रता की सर्वोच्च कसौटी पर तैयार।',
    iconType: 'thekua'
  },
  {
    id: 'supa',
    nameHindi: 'काँच के बाँस का सूप',
    nameEnglish: 'Bamboo Soop & Daura',
    description: 'प्राकृतिक बांस से हाथ से बुना सूप और दउरा जिसमें सभी ऋतु फल और पूजन सामग्री व्यवस्थित की जाती है।',
    culturalSignificance: 'प्रकृति के सहज संसाधनों का सम्मान; समाज के हर वर्ग की सहभागिता का अप्रतिम उदाहरण।',
    iconType: 'basket'
  },
  {
    id: 'sugarcane',
    nameHindi: 'ईख / केतारी की छतरी',
    nameEnglish: 'Sugarcane Mandap',
    description: 'हरे पत्तों सहित 5 गन्नों को बांधकर बनाया गया पवित्र मंडप, जिसके नीचे अखंड दीप प्रज्वलित किए जाते हैं।',
    culturalSignificance: 'कृषि उपज की पहली फसल का ईश्वर को समर्पण और प्रकृति के प्रति अटूट कृतज्ञता।',
    iconType: 'cane'
  },
  {
    id: 'diya',
    nameHindi: 'मिट्टी का चौमुखी दीप',
    nameEnglish: 'Terracotta Diya',
    description: 'शुद्ध मिट्टी का बना दीपक जिसमें गाय के घी या तिल के तेल की बत्ती चारों दिशाओं में ज्ञान व प्रकाश फैलाती है।',
    culturalSignificance: 'अज्ञान के अंधकार का नाश और सूर्य देव के तेज का धरती पर जीवंत वंदन।',
    iconType: 'flame'
  },
  {
    id: 'arghya-lota',
    nameHindi: 'पीतल का अर्घ्य लोटा',
    nameEnglish: 'Brass Arghya Kalash',
    description: 'गाय के कच्चे दूध और गंगाजल से भरा पीतल का कलश जिससे सूर्य देव की ओर पतली धारा प्रवाहित की जाती है।',
    culturalSignificance: 'सूर्य किरणों और जल-दूध की धारा का संगम नेत्र ज्योति और आध्यात्मिक ओज में वृद्धि करता है।',
    iconType: 'lota'
  },
  {
    id: 'daabh-nimbu',
    nameHindi: 'गागल / डाभ नींबू',
    nameEnglish: 'Daabh Nimboo (Pomelo)',
    description: 'बड़े आकार का मीठा-खट्टा डाभ नींबू जो विशेष रूप से शरद ऋतु में छठ पूजा के सूप की शोभा बढ़ाता है।',
    culturalSignificance: 'ऋतु अनुकूलता और औषधीय गुणों से भरपूर फल जो सूर्य देव को अत्यंत प्रिय है।',
    iconType: 'fruit'
  }
];

export const GHAT_AMBIENT_QUOTES = [
  'गंगा तट • 4:15 AM ब्रह्म मुहूर्त • जलते दीयों की कतार',
  'मिट्टी के चूल्हे की महक • शुद्ध घी का ठेकुआ • शारदा सिन्हा के गीत',
  '36 घंटे का अखंड निर्जला तप • लोक आस्था का महापर्व',
  'काँच ही बाँस के बहंगिया बहँगी लचकत जाए'
];
