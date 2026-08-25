import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Sun, Heart, Flame, BookOpen } from 'lucide-react';

interface CulturalLoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CulturalLoreModal: React.FC<CulturalLoreModalProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            className="w-full max-w-2xl my-auto rounded-3xl glass-panel-amber p-6 sm:p-8 border border-amber-400/40 shadow-2xl max-h-[88vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-amber-500/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
                  <Sun className="w-6 h-6 animate-spin" style={{ animationDuration: '12s' }} />
                </div>
                <div>
                  <h3 className="font-hindi-display text-2xl sm:text-3xl text-amber-100">
                    छठ महापर्व का आध्यात्मिक व वैज्ञानिक महात्म्य
                  </h3>
                  <p className="text-xs font-outfit text-amber-300/80">
                    The Eternal Heritage of Nature, Purity, and Gratitude
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl text-stone-400 hover:text-stone-100 hover:bg-stone-800/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Sections */}
            <div className="space-y-5 pt-4 font-outfit text-stone-200 text-sm leading-relaxed">
              {/* Point 1: Setting & Rising Sun */}
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20">
                <h4 className="font-hindi-display text-lg text-amber-300 mb-1 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>डूबते सूर्य को पहला नमन (Homage to the Setting Sun)</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-300">
                  संसार का एकमात्र महापर्व जो उगते सूर्य से पहले डूबते हुए सूर्य (अस्ताचलगामी भुवन भास्कर) को अर्घ्य देता है। यह जीवन का सर्वोच्च संदेश है कि जो अस्त होता है, उसका उदय भी निश्चित है; और जीवन के हर पड़ाव का सम्मान आवश्यक है।
                </p>
              </div>

              {/* Point 2: No Middlemen / Direct Nature Worship */}
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20">
                <h4 className="font-hindi-display text-lg text-amber-300 mb-1 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>समानता व प्रकृति के साथ सीधा संवाद (Pristine Equality)</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-300">
                  इस पर्व में किसी पुरोहित या मध्यस्थ की आवश्यकता नहीं होती। राजा हो या रंक, सब एक साथ गंगा के तट पर खड़े होकर सूर्य देव और षष्ठी माता की आराधना करते हैं। बांस के सूप से लेकर मिट्टी के दीये तक, समाज के प्रत्येक वर्ग के श्रम का आदर होता है।
                </p>
              </div>

              {/* Point 3: Scientific Solar Prana */}
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20">
                <h4 className="font-hindi-display text-lg text-amber-300 mb-1 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>वैज्ञानिक दृष्टिकोण (Bio-Solar Resonance)</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-300">
                  शरद ऋतु में कार्तिक शुक्ल षष्ठी के समय सूर्य की पराबैंगनी किरणें न्यूनतम और लाभदायक अवरक्त (Infrared) तरंगें अधिकतम होती हैं। नदी के जल में खड़े होकर दूध की धारा से छनकर आती सूर्य किरणों को देखना नेत्र ज्योति और प्रतिरोधक क्षमता को बढ़ाता है।
                </p>
              </div>

              {/* Point 4: Sharda Sinha & Folk Music Heritage */}
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20">
                <h4 className="font-hindi-display text-lg text-amber-300 mb-1 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>शारदा सिन्हा और अमर लोक परंपरा</span>
                </h4>
                <p className="text-xs sm:text-sm text-stone-300">
                  बिहार कोकिला पद्मभूषण डॉ. शारदा सिन्हा जी के स्वर के बिना छठ अधूरा है। 'केलवा के पात पर' और 'काँच ही बाँस के बहंगिया' जैसी अमर रचनाएं हर प्रवासी बिहारी को उसकी मिट्टी, मां और संस्कृति से जोड़ती हैं।
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-amber-500/20 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-semibold text-xs sm:text-sm font-outfit hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg"
              >
                जय छठी मईया (Close)
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
