/**
 * ULEK Canonical Data Store (Kora Framer Redesign Edition)
 * Strictly aligned with Antikode Designer Skill Test Brief C & https://kora.framer.media/ layout architecture
 */

window.ULEK_DATA = {
  brand: {
    name: "ulek",
    displayName: "ULEK",
    foundedYear: 1987,
    birthplace: "Sidoarjo, East Java",
    generation: "Third Generation (Gen III)",
    classicPrice: 25000,
    classicPriceFormatted: "Rp25.000",
    reservePrice: 100000,
    reservePriceFormatted: "Rp100.000",
    giftBoxPrice: 380000,
    giftBoxPriceFormatted: "Rp380.000",
    heroHeadline: "Archipelago sambal crafted for tables ready to savor.",
    heroSub: "ULEK brings three generations of 1987 Sidoarjo stone grinding to four single origin reserve jars (Rp100.000) while keeping our original warung jar untouched at Rp25.000.",
    problemRevealText: "The shortcuts that fill supermarket shelves won't earn a place in a nice pantry."
  },

  /**
   * Before vs After Comparison (Section 2 Kora Comparison Cards)
   */
  comparison: {
    beforeTitle: "Before Mass Market Jar Traps",
    beforeSub: "What usually happens when a heritage food brand 'goes premium'.",
    beforeItems: [
      "Discontinuing or hiding the affordable original jar that loyal fans love.",
      "Chasing 'Level 10 extreme spicy' gimmicks instead of culinary balance.",
      "High speed industrial blades that turn shallots and chilies into watery paste.",
      "Vague ingredient labels that make urban buyers hesitate when gifting food.",
      "Plastic packaging that gets hidden at the back of the refrigerator door."
    ],
    afterTitle: "After The ULEK Gen III Standard",
    afterSub: "One Sidoarjo family cobek since 1987. Two proud lines for every table.",
    afterItems: [
      "Our 1987 Sidoarjo Original stays in daily production at Rp25.000 no fan left behind.",
      "Calibrated heat (2/5 to 4/5) tuned specifically for grilled fish, rice, tempe & noodles.",
      "Coarse volcanic stone grinding (ulek) that preserves aromatic oil and texture.",
      "100% transparent dietary & halal notes (plant based Matah & Andaliman jars) for worry free gifting.",
      "Heavyweight UV glass & embossed linen labels designed for a 'nice' pantry and specialty grocers."
    ]
  },

  /**
   * The 4 Canonical Reserve Line Variants (Rp100.000) + 1987 Classic (Rp25.000)
   * Structured for Kora's Split Service/Product Cards & Full PDP
   */
  products: [
    {
      id: "matah",
      serial: "01",
      name: "Matah",
      koraLabel: "Bali · Heat 2/5",
      koraHeading: "Bright raw shallots & lemongrass that wake up grilled fish.",
      subtitle: "Raw Karangasem Shallot, Lemongrass & Cold Pressed Coconut Oil",
      line: "The Archipelago Reserve",
      isReserve: true,
      origin: "Bali",
      regionDetail: "Karangasem & Gianyar, East Bali",
      coordinates: "08°24'34\"S 115°11'20\"E",
      heat: 2,
      heatMax: 5,
      heatTag: "Heat 2/5",
      heatCharacter: "Bright, Floral & Crisp Warmth",
      price: 100000,
      priceFormatted: "Rp100.000",
      jarSize: "185g Heavyweight UV Glass Jar",
      canonicalPairing: "With grilled fish",
      pairingId: "grilled-fish",
      extendedPairings: [
        "Charcoal grilled sea bass (Ikan Bakar Jimbaran)",
        "Crispy skin salmon or barramundi",
        "Seared tuna tataki & warm jasmine rice",
        "Roast duck or herb chicken"
      ],
      koraSubFeaturesTitle: "Inside the jar & table pairing",
      koraSubFeatures: [
        "Canonical Pairing: With grilled fish & coastal seafood",
        "Calibrated Heat: 2/5 gentle bird's eye chili warmth",
        "Hand sliced Karangasem purple shallots (never blended)",
        "White lemongrass hearts & hand torn kaffir lime leaf",
        "Flash cured in cold pressed Balinese virgin coconut oil",
        "100% Plant Based & Terasi Free batch for universal gifting"
      ],
      koraQuote: {
        text: "\"Most jarred sambal Matah turns soggy. ULEK's shallots still snap when you spoon them over hot grilled fish it's our go to dinner host gift.\"",
        author: "Nadia Kusuma",
        role: "Culinary Host & Pantry Curator, Kemang"
      },
      image: "./assets/jar-matah.png",
      accentColor: "#5DC39B",
      stageTint: "#F5F5E9",
      shortHeroCopy: "Hand sliced Karangasem shallots, bruised lemongrass stalks, and kaffir lime ribbons flash cured in first press Balinese coconut oil.",
      tastingNotes: "Unblended and unapologetically crisp. Every spoonful delivers the sharp snap of purple Balinese shallots, citrusy kaffir lime oil, and a gentle 2/5 bird's eye chili glow that lifts delicate seafood without overpowering it.",
      why100k: "Machine blades bruise shallots into bitter mush. Our kitchen hand slices every shallot ring and flash cures them in virgin Karangasem coconut oil within 6 hours of harvest.",
      ingredients: [
        "Karangasem Purple Shallots (42%)",
        "Cold Pressed Balinese Virgin Coconut Oil",
        "White Lemongrass Hearts (Serai)",
        "Red Bird's Eye Chili (Cabai Rawit Bali)",
        "Hand Torn Kaffir Lime Leaves (Daun Jeruk Purut)",
        "Kusamba Sea Salt & Fresh Calamansi Juice"
      ],
      sensory: {
        heatIntensity: 40,
        aromaticFreshness: 96,
        savoryUmami: 68,
        grindCoarseness: 88
      },
      dietary: {
        badge: "100% Plant Based · Halal Friendly",
        isPlantBased: true,
        containsSeafood: false,
        giftSafeNote: "Crafted without fermented shrimp paste (terasi) in our Reserve batch so its floral lemongrass aroma stays pure 100% vegan, halal friendly, and effortless to gift."
      },
      shelfLife: "6 months unopened · Keep refrigerated after opening (consume within 4 weeks)"
    },
    {
      id: "roa",
      serial: "02",
      name: "Roa",
      koraLabel: "Manado · Heat 3/5",
      koraHeading: "72 hour wood smoked flying fish built for warm rice and eggs.",
      subtitle: "Wood Smoked Manado Flying Fish & Volcanic Red Chili",
      line: "The Archipelago Reserve",
      isReserve: true,
      origin: "Manado",
      regionDetail: "Bitung & Manado Bay, North Sulawesi",
      coordinates: "01°28'29\"N 124°50'31\"E",
      heat: 3,
      heatMax: 5,
      heatTag: "Heat 3/5",
      heatCharacter: "Smoky, Rich & Deep Savory Umami",
      price: 100000,
      priceFormatted: "Rp100.000",
      jarSize: "185g Heavyweight UV Glass Jar",
      canonicalPairing: "With rice and eggs",
      pairingId: "rice-eggs",
      extendedPairings: [
        "Steaming white rice & jammy sunny side eggs",
        "Bubur Manado (Tinutuan) & crispy shallots",
        "Crispy fried plantains (Pisang Goroho)",
        "Midnight buttered noodles or congee"
      ],
      koraSubFeaturesTitle: "Inside the jar & table pairing",
      koraSubFeatures: [
        "Canonical Pairing: With rice and eggs",
        "Calibrated Heat: 3/5 lingering Minahasa volcanic warmth",
        "62% pure wood smoked Manado flying fish (Ikan Roa) by weight",
        "Stone pounded into coarse savory floss (zero breadcrumb fillers)",
        "Slow simmered for 3 hours with confit shallots & garlic",
        "Halal compliant ingredients (Allergen: marine fish)"
      ],
      koraQuote: {
        text: "\"One spoonful of ULEK Roa over steaming rice and a runny egg tastes like a North Sulawesi smokehouse. You immediately taste why it's Rp100.000.\"",
        author: "Rendy Pratama",
        role: "Architect & Specialty Grocer Regular, SCBD"
      },
      image: "./assets/jar-roa.png",
      accentColor: "#C25D5D",
      stageTint: "#F5F5E9",
      shortHeroCopy: "Wild caught North Sulawesi flying fish wood smoked for 72 hours, stone pounded into savory floss, and slow simmered in aromatic chili oil.",
      tastingNotes: "Our most deeply savory jar. The smoky umami of hand flaked Manado Roa fish melts into caramelized shallots and medium 3/5 red chili heat turning a simple bowl of warm rice and fried egg into a midnight feast.",
      why100k: "Over 60% of every jar by weight is genuine smoked Ikan Roa from Bitung fishermen never diluted with cheap breadcrumbs, soy protein, or artificial smoke flavoring.",
      ingredients: [
        "Wood Smoked Manado Flying Fish / Ikan Roa (62%)",
        "Minahasa Red Chilies & Bird's Eye Chili",
        "Slow Confit Shallots & Garlic",
        "First Press Coconut Oil",
        "Fresh Tomato & Bruised Ginger",
        "Artisanal Sea Salt & Cane Sugar"
      ],
      sensory: {
        heatIntensity: 60,
        aromaticFreshness: 64,
        savoryUmami: 98,
        grindCoarseness: 76
      },
      dietary: {
        badge: "Halal Ingredients · Contains Smoked Fish",
        isPlantBased: false,
        containsSeafood: true,
        giftSafeNote: "Prepared with 100% halal compliant ingredients. Allergen notice for gift givers: contains wild caught marine fish (Ikan Roa)."
      },
      shelfLife: "9 months unopened · Keep in a cool pantry or refrigerate after opening"
    },
    {
      id: "bajak",
      serial: "03",
      name: "Bajak",
      koraLabel: "Jawa · Heat 2/5",
      koraHeading: "Caramelized Javanese chili & aged terasi for tempe and fried chicken.",
      subtitle: "Fire Roasted Javanese Chili, Aged Sidoarjo Terasi & Palm Nectar",
      line: "The Archipelago Reserve",
      isReserve: true,
      origin: "Jawa",
      regionDetail: "Sidoarjo & East Java Heartland",
      coordinates: "07°26'52\"S 112°43'05\"E",
      heat: 2,
      heatMax: 5,
      heatTag: "Heat 2/5",
      heatCharacter: "Caramelized, Warm & Savory Sweet",
      price: 100000,
      priceFormatted: "Rp100.000",
      jarSize: "185g Heavyweight UV Glass Jar",
      canonicalPairing: "With tempe, fried chicken",
      pairingId: "tempe-chicken",
      extendedPairings: [
        "Crispy spiced tempe & tahu goreng",
        "Ayam Goreng Lengkuas (Javanese fried chicken)",
        "Charred beef ribs (Iga Bakar) & Empal",
        "Grilled cheese sourdough or roast potatoes"
      ],
      koraSubFeaturesTitle: "Inside the jar & table pairing",
      koraSubFeatures: [
        "Canonical Pairing: With tempe, fried chicken",
        "Calibrated Heat: 2/5 crowd pleasing caramelized ember",
        "Direct third generation tribute to our 1987 Sidoarjo roots",
        "Barrel aged coastal Sidoarjo shrimp paste (terasi udang)",
        "4 hour slow reduction with organic dark palm sugar & tamarind",
        "Halal friendly East Java heritage preparation"
      ],
      koraQuote: {
        text: "\"My parents have bought ULEK's Rp25k jar in Sidoarjo since the 90s. The Reserve Bajak takes that familiar family soul and turns it into pure velvet.\"",
        author: "Larasati Wibowo",
        role: "Third Generation Customer, Surabaya & Jakarta"
      },
      image: "./assets/jar-bajak.png",
      accentColor: "#B4532A",
      stageTint: "#F5F5E9",
      shortHeroCopy: "Our third generation love letter to East Java: fire charred curly chilies, barrel aged Sidoarjo shrimp paste, tamarind, and dark palm sugar.",
      tastingNotes: "Where ULEK's 1987 soul meets reserve grade ingredients. Slow simmered for four hours until the shallots, galangal, and organic Javanese palm sugar caramelize into a glossy, savory sweet 2/5 ember that clings to crispy tempe and fried chicken.",
      why100k: "While our Rp25.000 Original is built for bright everyday heat, Reserve Bajak uses barrel aged coastal Sidoarjo terasi, tree ripened red chilies, and a 4 hour low flame reduction.",
      ingredients: [
        "Fire Roasted Java Curly Red Chilies (48%)",
        "Caramelized Brebes Shallots & Garlic",
        "Aged Coastal Sidoarjo Terasi (Fermented Shrimp Paste)",
        "Organic Dark Palm Sugar (Gula Aren) & Tamarind Pulp",
        "Bruised Galangal (Lengkuas) & Salam Leaves",
        "Cold Pressed Coconut Oil"
      ],
      sensory: {
        heatIntensity: 40,
        aromaticFreshness: 72,
        savoryUmami: 94,
        grindCoarseness: 65
      },
      dietary: {
        badge: "Halal Ingredients · Contains Coastal Terasi",
        isPlantBased: false,
        containsSeafood: true,
        giftSafeNote: "100% halal friendly East Javanese recipe. Allergen notice for gift givers: contains traditional fermented shrimp paste (crustacean)."
      },
      shelfLife: "9 months unopened · Keep in a cool pantry or refrigerate after opening"
    },
    {
      id: "andaliman",
      serial: "04",
      name: "Andaliman",
      koraLabel: "Batak · Heat 4/5",
      koraHeading: "Wild Lake Toba citrus pepper that cuts through grilled pork and noodles.",
      subtitle: "Wild Toba Andaliman Pepper, Highland Green Chili & Candlenut",
      line: "The Archipelago Reserve",
      isReserve: true,
      origin: "Batak",
      regionDetail: "Lake Toba Highlands, North Sumatra",
      coordinates: "02°41'04\"N 098°52'32\"E",
      heat: 4,
      heatMax: 5,
      heatTag: "Heat 4/5",
      heatCharacter: "Electric Citrus Numbing & Fiery",
      price: 100000,
      priceFormatted: "Rp100.000",
      jarSize: "185g Heavyweight UV Glass Jar",
      canonicalPairing: "With grilled pork, noodles",
      pairingId: "pork-noodles",
      extendedPairings: [
        "Traditional Batak grilled pork (Babi Panggang Karo)",
        "Artisan chewy noodles, Mie Gomak & Bakmi",
        "Halal pairing: Smoked duck breast & charred beef brisket",
        "Crispy dumplings, gyoza & charred skewers"
      ],
      koraSubFeaturesTitle: "Inside the jar & dietary transparency",
      koraSubFeatures: [
        "Canonical Pairing: With grilled pork, noodles",
        "Calibrated Heat: 4/5 electric citrus tingling Batak fire",
        "100% PLANT BASED JAR: Zero pork, zero lard inside the jar",
        "Wild foraged Lake Toba Andaliman berries ('Batak Sichuan pepper')",
        "Stone crushed with roasted candlenut (kemiri) & green cayenne",
        "Safe & versatile for both Batak feasts and halal noodle tables"
      ],
      koraQuote: {
        text: "\"Clarifying right on the label that the Andaliman jar itself is 100% plant based while honoring its Batak grilled pork & noodle pairing made gifting this box effortless.\"",
        author: "Daniel Sihombing",
        role: "Creative Director & Food Gifter, Menteng"
      },
      image: "./assets/jar-andaliman.png",
      accentColor: "#5DC39B",
      stageTint: "#F5F5E9",
      shortHeroCopy: "Wild foraged Toba green Andaliman pepper stone crushed with green cayenne, roasted candlenut, and garlic for an electric citrus tingling 4/5 kick.",
      tastingNotes: "Indonesia's answer to Sichuan mala brighter, wilder, and unmistakably Batak. Wild Andaliman berries deliver an immediate lemon lime perfume followed by a thrilling 4/5 numbing vibration that cuts cleanly through rich grilled meats and springy noodles.",
      why100k: "Andaliman cannot be cultivated on plantations; it grows wild in North Sumatra's volcanic highlands and loses its essential oils within days. We air freight small batches straight from Toba foragers.",
      ingredients: [
        "Wild Foraged Toba Andaliman Pepper Berries (24%)",
        "Highland Green Cayenne & Green Curly Chili",
        "Fire Roasted Candlenut (Kemiri) & Garlic",
        "White Shallots & Young Ginger",
        "Fresh Calamansi Lime Juice",
        "Pure Botanical Oil & Sea Salt"
      ],
      sensory: {
        heatIntensity: 80,
        aromaticFreshness: 95,
        savoryUmami: 78,
        grindCoarseness: 82
      },
      dietary: {
        badge: "100% Plant Based Jar · Zero Pork or Lard Inside",
        isPlantBased: true,
        containsSeafood: false,
        giftSafeNote: "IMPORTANT FOR GIFTING: In Batak culinary tradition, Andaliman is famously served 'with grilled pork, noodles'. However, the sambal inside this jar is 100% plant based (zero pork, zero lard, zero alcohol) and prepared on dedicated botanical equipment making it versatile for both traditional Batak feasts and halal noodle or smoked duck tables."
      },
      shelfLife: "6 months unopened · Keep refrigerated after opening to preserve citrus numbing oil"
    },
    {
      id: "classic-1987",
      serial: "87",
      name: "Warung 1987 Original",
      koraLabel: "Sidoarjo · Heat 3/5 · Rp25.000",
      koraHeading: "The unchanged 1987 Sidoarjo warung jar because loyal fans come first.",
      subtitle: "The Unchanged Everyday Sidoarjo Warung Sambal",
      line: "The 1987 Heritage Line",
      isReserve: false,
      origin: "Sidoarjo",
      regionDetail: "Pasar Larangan Warung, Sidoarjo (Est. 1987)",
      coordinates: "07°27'14\"S 112°42'57\"E",
      heat: 3,
      heatMax: 5,
      heatTag: "Heat 3/5",
      heatCharacter: "Honest Everyday East Java Table Heat",
      price: 25000,
      priceFormatted: "Rp25.000",
      jarSize: "150g Classic Red Lid Warung Jar",
      canonicalPairing: "With everyday penyetan, warm rice & family meals",
      pairingId: "tempe-chicken",
      extendedPairings: [
        "Everyday Tempe & Tahu Penyet",
        "Crispy Telur Dadar & Ayam Goreng Warung",
        "Ikan Mujair Goreng & Lalapan",
        "Sayur Asem & Krupuk Udang Sidoarjo"
      ],
      koraSubFeaturesTitle: "Our promise to 1987 regulars",
      koraSubFeatures: [
        "Unchanged price: Still Rp25.000 a jar online & in local markets",
        "Unchanged recipe: Exact 1987 Pasar Larangan Sidoarjo ratio",
        "Blistered East Java plum tomatoes & red bird's eye chilies",
        "Local coastal Sidoarjo terasi & crushed garlic",
        "Stone ground every morning by our Sidoarjo kitchen team",
        "Available alongside the Reserve Line in one shared cart"
      ],
      koraQuote: {
        text: "\"When the grandchildren launched the Rp100k line, we worried our everyday red lid jar would disappear. Instead, they gave it a place of honor.\"",
        author: "Pak Hendra & Bu Rini",
        role: "Sidoarjo Regulars Since 1994"
      },
      image: "./assets/jar-classic-1987.png",
      accentColor: "#C25D5D",
      stageTint: "#F5F5E9",
      shortHeroCopy: "The exact stone ground recipe that started our family warung in Sidoarjo in 1987. Unchanged for three generations, and forever Rp25.000.",
      tastingNotes: "Bright, garlicky, and deeply familiar. Crushed red bird's eye chilies, blistered East Java tomatoes, garlic, and local Sidoarjo terasi cooked in small daily batches the jar our loyal regulars have kept on their dining tables for nearly four decades.",
      why100k: "Why is this Rp25.000 while our Reserve Line is Rp100.000? Because our daily Sidoarjo harvest is local and abundant, and our promise to our loyal regulars is that the jar that built ULEK will never leave them behind.",
      ingredients: [
        "Fresh Sidoarjo Red Bird's Eye & Curly Chilies",
        "Blistered East Java Plum Tomatoes",
        "Local Garlic & Shallots",
        "Traditional Sidoarjo Terasi (Shrimp Paste)",
        "Cane Sugar, Salt & Vegetable Oil"
      ],
      sensory: {
        heatIntensity: 65,
        aromaticFreshness: 76,
        savoryUmami: 88,
        grindCoarseness: 72
      },
      dietary: {
        badge: "Halal Everyday Classic · Unchanged Since 1987",
        isPlantBased: false,
        containsSeafood: true,
        giftSafeNote: "Our original 1987 Sidoarjo warung recipe. Contains local shrimp paste (terasi). Still Rp25.000 a jar always."
      },
      shelfLife: "6 months unopened · Keep refrigerated after opening"
    }
  ],

  /**
   * 4-Phase Horizontal Expanding Accordion (Section 4 Kora "How we work" Architecture)
   */
  craftPhases: [
    {
      number: "01",
      title: "Single Origin Harvest",
      body: "We source directly from four distinct archipelago terroirs: dawn picked purple shallots in East Bali, 72 hour wood smoked flying fish in Bitung Manado, coastal terasi in Sidoarjo, and wild foraged Andaliman berries from Lake Toba.",
      metric: "4 Islands · Direct Harvest",
      tagline: "Wild Foraged & Direct From Farm",
      image: "./assets/craft-phase-01-harvest.jpg"
    },
    {
      number: "02",
      title: "Volcanic Stone Ulek",
      body: "High speed steel blades shred cell walls and turn chilies watery and bitter. Just as our grandparents began in Sidoarjo in 1987, we crush our aromatics on porous East Java volcanic stone to release essential oils while keeping a coarse, toothsome texture.",
      metric: "1987 Cobek Technique",
      tagline: "Crushed on Porous Basalt Stone",
      image: "./assets/craft-phase-02-ulek.jpg"
    },
    {
      number: "03",
      title: "Calibrated Oil Infusion",
      body: "Every jar is cooked to its regional character: Matah is flash cured raw in cold pressed Balinese coconut oil (Heat 2/5), while Bajak and Roa simmer over low flame for up to four hours until rich, glossy, and deeply savory.",
      metric: "Heat 2/5 to 4/5 · Zero Extracts",
      tagline: "Slow Simmered Essential Oils",
      image: "./assets/craft-phase-03-infusion.jpg"
    },
    {
      number: "04",
      title: "Pantry & Gifting Seal",
      body: "Packed hot into heavyweight UV protected glass jars with embossed linen labels and transparent dietary cards ready to sit proudly on an urban dining table, specialty grocer shelf, or curated food gift box.",
      metric: "Online & 18+ Specialty Grocers",
      tagline: "UV Glass & Embossed Linen Seal",
      image: "./assets/craft-phase-04-pantry.jpg"
    }
  ],

  /**
   * Interactive Pairing Guide (Section 5 Kora Green Interactive Rows)
   */
  pairings: [
    {
      id: "grilled-fish",
      number: "01",
      plateLabel: "With grilled fish",
      plateTitle: "Charcoal Grilled Fish & Coastal Seafood",
      recommendedProductId: "matah",
      chemistryHeadline: "Raw Shallot Crispness + Cold Pressed Coconut Oil Cuts Through Char & Smoke.",
      chemistryBody: "Delicate white fish gets buried under heavy cooked paste. Matah's raw Karangasem shallots, bruised lemongrass, and kaffir lime leaves act like a bright Indonesian vinaigrette waking up charred fish skin with a calibrated 2/5 warmth.",
      servingRitual: "Spoon 1.5 tablespoons directly over hot grilled fish right before serving so the residual heat releases the lemongrass and kaffir lime oils.",
      metrics: [
        { label: "Citrus & Herbal Lift", value: 96 },
        { label: "Char & Oil Balance", value: 92 },
        { label: "Heat Restraint (2/5)", value: 88 }
      ]
    },
    {
      id: "rice-eggs",
      number: "02",
      plateLabel: "With rice and eggs",
      plateTitle: "Steaming White Rice & Jammy Fried Eggs",
      recommendedProductId: "roa",
      chemistryHeadline: "72 Hour Wood Smoked Roa Floss Turns Humble Comfort Food Into an Umami Feast.",
      chemistryBody: "Plain warm rice and a crispy edged egg crave texture and savory depth. Because 62% of our Roa jar is hand pounded smoked flying fish, a single spoonful wraps every grain of rice in rich North Sulawesi smoke and 3/5 volcanic chili heat.",
      servingRitual: "Fold a generous spoonful of Roa and its ruby chili oil directly into steaming rice, then break a runny egg yolk over the top.",
      metrics: [
        { label: "Smoked Umami Density", value: 98 },
        { label: "Yolk & Grain Coating", value: 95 },
        { label: "Savory Lingering Heat (3/5)", value: 84 }
      ]
    },
    {
      id: "tempe-chicken",
      number: "03",
      plateLabel: "With tempe, fried chicken",
      plateTitle: "Crispy Tempe, Tahu & Javanese Fried Chicken",
      recommendedProductId: "bajak",
      chemistryHeadline: "4 Hour Caramelized Palm Nectar & Aged Terasi Clings to Golden Fried Crusts.",
      chemistryBody: "Dry, crispy fried foods need a lush, rounded condiment. Our third generation Bajak pairs fire roasted Javanese chilies with dark palm sugar, tamarind, and aged Sidoarjo terasi creating a glossy 2/5 glaze that anchors every bite of tempe and ayam goreng.",
      servingRitual: "Serve at room temperature on the side of the plate and press warm crispy tempe directly into the caramelized paste.",
      metrics: [
        { label: "Caramelized Savory Sweet", value: 94 },
        { label: "Crunch Adhesion", value: 91 },
        { label: "Crowd Pleasing Warmth (2/5)", value: 96 }
      ]
    },
    {
      id: "pork-noodles",
      number: "04",
      plateLabel: "With grilled pork, noodles",
      plateTitle: "Grilled Pork, Chewy Noodles & Smoked Meats",
      recommendedProductId: "andaliman",
      chemistryHeadline: "Wild Toba Citrus Pepper ('Batak Mala') Slices Through Rich Fat & Springy Starch.",
      chemistryBody: "Rich grilled pork belly, roasted duck, or chewy oil tossed noodles demand high voltage. Wild Andaliman berries deliver an electric 4/5 lemon pepper tingle and candlenut creaminess that resets your palate after every rich bite.",
      servingRitual: "Toss half a teaspoon into hot noodles or dab onto smoky grilled meats. Note: The jar itself is 100% plant based (zero pork/lard inside).",
      metrics: [
        { label: "Rich Fat & Noodle Cut", value: 97 },
        { label: "Citrus Tingle Vibration", value: 96 },
        { label: "Highland Fire (4/5)", value: 89 }
      ]
    }
  ],

  /**
   * Categorized FAQ (Section 7 Kora Categorized FAQ Architecture)
   */
faqs: [
    {
      category: "General",
      items: [
        {
          q: "What exactly does ULEK do?",
          a: "We craft single origin archipelago reserve sambal honoring three generations of Sidoarjo stone grinding heritage. Rather than competing on extreme artificial heat challenges, we curate regional terroir into aesthetic UV protected pantry jars built for fine dining and food gifting."
        },
        {
          q: "Why does the Reserve Line cost Rp100.000 a jar compared to Rp25.000?",
          a: "Three reasons: (1) Single origin archipelago sourcing such as 62% wood smoked Manado Roa fish by weight, air freighted wild Lake Toba Andaliman berries, and cold pressed Balinese virgin coconut oil; (2) Multi hour small batch cooking and hand slicing; and (3) Heavyweight UV protected glass jars designed for modern pantries and gifting."
        },
        {
          q: "Is ULEK discontinuing the original Rp25.000 Sidoarjo jar now that the Rp100.000 line is here?",
          a: "Never. Our 1987 Sidoarjo Original remains in daily production at Pasar Larangan and online for the exact same Rp25.000 price. The Rp100.000 Reserve Line is a third generation exploration built to sit alongside our original jar, never to replace it."
        },
        {
          q: "Where can I buy ULEK offline in specialty grocers?",
          a: "The Reserve Line (Rp100.000) is stocked at curated specialty grocers across Jakarta (Kem Chicks, The FoodHall, Grand Lucky SCBD), Surabaya (Hokky, Ranch Market), and Bali (Pepito, Bali Buda), while our 1987 Original (Rp25.000) is available online and at our Pasar Larangan Sidoarjo flagship."
        }
      ]
    },
    {
      category: "Pricing",
      items: [
        {
          q: "Why does the Reserve Line cost Rp100.000 a jar compared to Rp25.000?",
          a: "Three reasons: (1) Single origin archipelago sourcing such as 62% wood smoked Manado Roa fish by weight, air freighted wild Lake Toba Andaliman berries, and cold pressed Balinese virgin coconut oil; (2) Multi hour small batch cooking and hand slicing; and (3) Heavyweight UV protected glass jars designed for modern pantries and gifting."
        },
        {
          q: "How much do I save with the 4 Jar Archipelago Gift Box?",
          a: "The 4 Jar Archipelago Gift Box is priced at Rp380.000, saving Rp20.000 compared to purchasing four individual reserve jars (Rp400.000). It also includes a complimentary textured cream linen presentation box and personalized printed linen gift card."
        },
        {
          q: "Do you provide complimentary shipping for pantry orders?",
          a: "Yes. Orders over Rp300.000 automatically unlock complimentary express delivery across Java and Bali, packed in chilled thermal insulation foil."
        }
      ]
    },
    {
      category: "Process",
      items: [
        {
          q: "How does volcanic stone cobek crushing differ from blending?",
          a: "Factory industrial blenders shear chili seeds with high speed steel blades, causing cellular aeration and bitter oxidation. ULEK uses low speed volcanic andesite stone cobek crushing, which crushes cellular walls to release pure aromatic capsaicin oils while keeping seeds intact and digestion gentle."
        },
        {
          q: "How long does a jar remain fresh in the pantry?",
          a: "Unopened reserve jars stay fresh for up to 6 months in a cool dark pantry thanks to our airtight seal and UV protective glass. Once opened, store in the refrigerator and enjoy within 4 weeks for peak aromatic flavor."
        },
        {
          q: "Are all ULEK sambal varieties prepared with halal friendly ingredients?",
          a: "Yes 100%. All four Reserve Line varieties (Matah, Roa, Bajak, Andaliman) and our 1987 Sidoarjo Original use pure certified halal ingredients, prepared without alcohol, pork, or porcine byproducts."
        }
      ]
    },
    {
      category: "Results",
      items: [
        {
          q: "Andaliman says 'With grilled pork, noodles'. Does the Andaliman jar contain pork or lard?",
          a: "No 0% pork and 0% lard. The sambal inside our Andaliman jar is 100% plant based (wild Toba Andaliman berries, green chilies, roasted candlenut, garlic, and pure botanical oil) prepared on dedicated botanical equipment. 'With grilled pork, noodles' honors its canonical Batak cultural pairing (Babi Panggang Karo & Mie Gomak), while the jar itself is equally delicious with halal beef noodles, smoked duck, or roasted chicken."
        },
        {
          q: "Which jars are vegan or seafood free for gifting to colleagues?",
          a: "Both Matah (Bali) and Andaliman (Batak) are 100% plant based and seafood free. Roa (Manado) contains smoked marine flying fish, and Bajak (Jawa) + 1987 Original contain traditional fermented shrimp paste (terasi). Every gift box includes a printed Dietary & Pairing Card so your recipient knows exactly what is inside each jar."
        },
        {
          q: "Can I customize the flavors inside the 4 Jar Pantry Gift Box?",
          a: "Yes. You can choose our signature Archipelago Tasting Flight (Matah, Roa, Bajak, Andaliman), select our 1 click 100% Plant Based / Seafood Free Box (2x Matah + 2x Andaliman), or tap any of the 4 slots in our Gift Box Builder to customize your exact combination and add a printed linen gift note."
        }
      ]
    }
  ],

  /**
   * Specialty Grocers & Heritage Markets ("Sold online and in specialty grocers")
   */
  stockists: [
    {
      city: "Jakarta",
      type: "Specialty Grocers & Pantry Curators",
      locations: [
        "Kem Chicks Pacific Place & Kemang",
        "The FoodHall Plaza Indonesia & Senayan City",
        "Grand Lucky Superstore SCBD",
        "Crumbs & Pantry Curated Cipete"
      ],
      carries: "Reserve Line (Rp100k) & Gift Boxes",
      image: "./assets/stockist-jakarta-monas.jpg",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Specialty+Grocers+Jakarta"
    },
    {
      city: "Surabaya & Sidoarjo",
      type: "Home Heritage & Specialty Grocers",
      locations: [
        "Warung ULEK 1987 Flagship Pasar Larangan, Sidoarjo",
        "Hokky Buah & Pantry Graha Famili, Surabaya",
        "Ranch Market Galaxy Mall & Basuki Rahmat",
        "Papaya Fresh Gallery Margorejo, Surabaya"
      ],
      carries: "1987 Original (Rp25k) & Reserve Line (Rp100k)",
      image: "./assets/stockist-surabaya-sidoarjo.jpg",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Specialty+Grocers+Surabaya"
    },
    {
      city: "Bali",
      type: "Artisanal Grocers & Delis",
      locations: [
        "Pepito Market Seminyak, Canggu & Uluwatu",
        "Bali Buda Ubud & Kerobokan",
        "island.pantry Collective Pererenan"
      ],
      carries: "Reserve Line (Rp100k) & Travel Quartet",
      image: "./assets/stockist-bali-temple.jpg",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=Specialty+Grocers+Bali"
    }
  ],

  /**
   * Built-in Antikode Skill Test Evaluation & Case Study Data
   */
  caseStudy: {
    senseMaking: [
      {
        number: "01",
        title: "The 4x Price Jump Paradox (Rp25.000 → Rp100.000)",
        observation: "ULEK's original jar sells at Rp25.000 in local markets, while the new line launches at Rp100.000. Yet the brief explicitly warns: 'Existing: loyal fans of the original jar, who mustn't feel the brand left them behind.'",
        framing: "If the site hides the Rp25.000 jar to look 'luxury', loyal fans feel betrayed. If it looks like a budget stall, urban buyers won't pay Rp100.000. The real problem is building a Dual Tier Brand Architecture where the 1987 warung is celebrated as the master craft foundation, and both the Rp25k Classic and Rp100k Reserve coexist proudly."
      },
      {
        number: "02",
        title: "The 'With Grilled Pork, Noodles' Detail on Andaliman vs. Food Gifting",
        observation: "Under Andaliman (Batak · heat 4/5), the brief specifies 'With grilled pork, noodles'. Meanwhile, the new audience is 'urban buyers aged 25 to 40 who gift food'.",
        framing: "In Indonesia, seeing 'with grilled pork' on a food site triggers an immediate question for Muslim buyers and corporate/friend gift givers: 'Does the sambal jar itself contain pork/lard, or is that just the traditional Batak serving suggestion?' Addressing this with a transparent '100% Plant Based Jar · Zero Pork Inside' badge and a customizable Gift Box turns a potential conversion blocker into deep brand trust."
      },
      {
        number: "03",
        title: "Why a Sidoarjo (East Java) Warung is Making Bali, Manado & Batak Sambal",
        observation: "Sidoarjo is in East Java (home to Bajak), yet the premium line spans Bali (Matah), Manado (Roa), Jawa (Bajak), and Batak (Andaliman).",
        framing: "The narrative bridge is the 3rd Generation: Gen 1 & 2 mastered the volcanic stone cobek in Sidoarjo since 1987; Gen 3 applies that family grinding technique to rare single origin ingredients flown in from four islands."
      },
      {
        number: "04",
        title: "Calibrated Heat (2/5, 3/5, 2/5, 4/5 Zero 5/5 Gimmicks)",
        observation: "None of the four jars is rated 5/5 heat. Two are mild medium (2/5), one is 3/5, and the highest is 4/5.",
        framing: "Mass market sambal competes on 'extreme spicy challenges'. A Rp100.000 pantry condiment competes on aroma, texture, regional terroir, and plate pairing. We designed an Interactive Pairing Sommelier and Kora style Split Product Cards instead of generic flame graphics."
      }
    ],
    visualExplorations: [
      {
        id: "dir-a",
        tag: "EXPLORATION 01 · REJECTED",
        name: "Direction A: Cold Clinical Apothecary",
        inspiration: "Monochrome lab white/black, sterile Swiss grids, zero culinary warmth.",
        pros: "Signals high price point for modern apartments.",
        whyRejected: "Strips away Indonesian appetite appeal and completely alienates loyal fans of the 1987 Sidoarjo warung jar.",
        swatchColors: ["#FFFFFF", "#E5E7EB", "#111827", "#6B7280"]
      },
      {
        id: "dir-b",
        tag: "EXPLORATION 02 · REJECTED",
        name: "Direction B: Loud Pasar Warung Retro",
        inspiration: "High saturation red/yellow banners, brush typography, marketplace badges.",
        pros: "Familiar to existing Rp25.000 market buyers.",
        whyRejected: "Fails to justify Rp100.000 a jar to 25 40 urban buyers who curate a 'nice pantry' and buy food gifts at specialty grocers.",
        swatchColors: ["#FEF08A", "#DC2626", "#78350F", "#F97316"]
      },
      {
        id: "dir-c",
        tag: "EXPLORATION 03 · SELECTED REBRAND DIRECTION",
        name: "Direction C: Minimalist Volcanic Cobek & Fiery Cayenne (#E63E26)",
        inspiration: "Rebranded 2026: Minimalist andesite cobek & ulekan emblem combined with fiery cayenne red orange (#E63E26), volcanic basalt (#1A1A1A), and artisanal ivory (#FCFCFA).",
        pros: "Bridges generational gap: ultra modern aesthetic for design conscious youth, grounded stonecraft authenticity for heritage sambal purists.",
        whyRejected: "Selected as final rebrand identity: bridges both youth and elders with world class minimalist culinary prestige.",
        swatchColors: ["#E63E26", "#F06A2B", "#1A1A1A", "#FCFCFA"]
      }
    ]
  },

  /**
   * Community & Curator Testimonials (Section 6 Pantry Lifestyle Vertical Auto Scroll Marquee)
   * 5 authentic voices from urban dinner hosts, private chefs, architects & food curators
   */
  testimonials: [
    {
      id: "nadia-dimas",
      name: "Nadia Kusuma & Dimas",
      role: "Culinary Hosts & Food Gifters",
      location: "Senopati, Jakarta Selatan",
      avatar: "./assets/avatar-nadia.jpg",
      quote: "We stopped bringing generic wine to dinner parties. A 4 jar linen box of ULEK Reserve turns any table into an Indonesian archipelago tasting flight and every guest knows immediately which jars are plant based or seafood free.",
      badge: "4 Jar Archipelago Gift Box · Rp380.000",
      productTagged: "The 4 Jar Gift Box"
    },
    {
      id: "chef-arga",
      name: "Chef Arga Bramantyo",
      role: "Private Dining Chef & Food Consultant",
      location: "Canggu & Ubud, Bali",
      avatar: "./assets/avatar-arga.jpg",
      quote: "Industrial blades shred chili cells into watery bitter mush. ULEK’s volcanic stone cobek technique keeps the shallots crisp and toothsome. The Sambal Matah flash cured in Balinese coconut oil is unmatched on grilled barramundi.",
      badge: "Matah & Andaliman Reserve · Rp100.000",
      productTagged: "Matah (Bali) & Andaliman"
    },
    {
      id: "maya-kartika",
      name: "Maya Kartika",
      role: "Interior Architect & Weekend Cook",
      location: "Menteng, Jakarta Pusat",
      avatar: "./assets/avatar-maya.jpg",
      quote: "Finally an Indonesian heritage food brand that looks breathtaking on an open kitchen shelf. The heavyweight UV glass and linen labels don’t get hidden away in the fridge door they sit proudly right next to my specialty olive oils.",
      badge: "The Reserve Line Quartet",
      productTagged: "4 Single Reserve Jars"
    },
    {
      id: "daniel-sihombing",
      name: "Daniel Sihombing",
      role: "Creative Director & Gifting Curator",
      location: "Dharmawangsa, Jakarta Selatan",
      avatar: "./assets/avatar-daniel.jpg",
      quote: "We sent 40 custom ULEK linen gift boxes to our creative agency clients last holiday. Having transparent dietary cards and the third generation Sidoarjo story made gifting traditional Indonesian sambal effortless and dignified.",
      badge: "Curated Corporate Gift Order",
      productTagged: "Custom Corporate Gifting"
    },
    {
      id: "michelle-kevin",
      name: "Michelle Tan & Kevin",
      role: "Artisanal Pantry Grocer Curators",
      location: "Surabaya Barat, Jawa Timur",
      avatar: "./assets/avatar-michelle.jpg",
      quote: "Growing up in East Java, our family always kept the 1987 Sidoarjo warung sambal on the table. Seeing the 3rd generation elevate the recipe into these reserve jars while preserving the original stone cobek soul is remarkable.",
      badge: "1987 Classic + Reserve Box",
      productTagged: "1987 Warung Original"
    }
  ]
};
