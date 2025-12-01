import React, { useEffect, useState } from 'react'
import { Check, Calendar, Heart, Camera, Sparkles, MapPin, FileText, Users, Clock, CheckCircle2 } from 'lucide-react'


type Item = { text: string; icon: string; price?: string | null }

function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initial
    } catch (e) {
      return initial
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state))
    } catch (e) {}
  }, [key, state])

  return [state, setState] as const
}

export default function App() {
  const [checkedItems, setCheckedItems] = useLocalStorage<Record<string, boolean>>('wedding-checked', {})

  const toggleCheck = (section: string, index: number) => {
    const key = `${section}-${index}`
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const isChecked = (section: string, index: number) => !!checkedItems[`${section}-${index}`]

  const getProgress = (items: Item[], section: string) => {
    if (!items.length) return 0
    const checked = items.filter((_, i) => isChecked(section, i)).length
    return Math.round((checked / items.length) * 100)
  }

  const ktbElKitabItems: Item[] = [
    { text: "الفستان", icon: "👗" },
    { text: "البدلة", icon: "🤵" },
    { text: "البوكية", icon: "💐" },
    { text: "البصمة + المنديل + البروش", icon: "💍" },
    { text: "ورق الصحة (البطاقة + صور شخصية 4×6)", icon: "📋" },
    { text: "المكان", icon: "🏛️" },
    { text: "المأذووووووووووووووووووون", icon: "📜" }
  ];

  const yomElfarahItems: Item[] = [
    { text: "الفستان", icon: "👗", price: null },
    { text: "الطرحة", icon: "👰", price: "1000ج" },
    { text: "الميكاب", icon: "💄", price: "4000ج" },
    { text: "الفوتجرافر (ايه حمدي)", icon: "📸", price: "5000ج" },
    { text: "البوكية", icon: "💐", price: null },
    { text: "البدلة", icon: "🤵", price: null },
    { text: "المكان (مكان الميكاب والسيشن والبارتي للأهل)", icon: "🏰", price: null }
  ];

  const totalCost = yomElfarahItems
    .filter(item => item.price)
    .reduce((sum, item) => {
      const price = parseInt((item.price || '').replace(/[^\d]/g, ''));
      return sum + price;
    }, 0);

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div className="relative bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white py-10 px-4 sm:py-16 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl">💕</div>
          <div className="absolute top-32 right-20 text-5xl">💍</div>
          <div className="absolute bottom-10 left-1/4 text-7xl">✨</div>
          <div className="absolute top-20 right-1/3 text-4xl">🌸</div>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <Heart className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 animate-pulse" />
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4">
            قائمة تجهيزات الفرح
          </h1>
          <p className="text-lg sm:text-2xl text-pink-100 mb-2">
            كل التفاصيل اللي محتاجينها ليوم العمر 💐
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 text-base sm:text-xl">
            <div className="bg-white bg-opacity-20 px-4 py-2 sm:px-6 sm:py-3 rounded-full backdrop-blur-sm">
              📝 كتب الكتاب
            </div>
            <div className="bg-white bg-opacity-20 px-4 py-2 sm:px-6 sm:py-3 rounded-full backdrop-blur-sm">
              💒 يوم الفرح
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-2 sm:px-6 py-6 sm:py-12">
        {/* كتب الكتاب Section */}
        <div className="mb-8 sm:mb-12">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-2 sm:border-4 border-pink-200">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="bg-white bg-opacity-20 p-2 sm:p-4 rounded-2xl backdrop-blur-sm">
                    <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-4xl font-bold">كتب الكتاب</h2>
                    <p className="text-pink-100 text-sm sm:text-lg mt-1 sm:mt-2">الخطوة الأولى المباركة 💫</p>
                  </div>
                </div>
                <div className="text-center bg-white bg-opacity-20 px-4 py-2 sm:px-6 sm:py-4 rounded-2xl backdrop-blur-sm">
                  <div className="text-2xl sm:text-4xl font-bold">{getProgress(ktbElKitabItems, 'ktb')}%</div>
                  <div className="text-xs sm:text-sm text-pink-100">مكتمل</div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-8">
              <div className="space-y-3 sm:space-y-4">
                {ktbElKitabItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => toggleCheck('ktb', index)}
                    className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-6 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 ${
                      isChecked('ktb', index)
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400'
                        : 'bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200 hover:border-pink-400'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all ${
                      isChecked('ktb', index)
                        ? 'bg-green-500 text-white'
                        : 'bg-white border-2 border-pink-300'
                    }`}>
                      {isChecked('ktb', index) ? (
                        <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                      ) : (
                        <div className="w-6 h-6 sm:w-7 sm:h-7 border-2 border-pink-400 rounded-lg"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl sm:text-3xl">{item.icon}</span>
                        <span className={`text-base sm:text-xl font-semibold ${
                          isChecked('ktb', index) ? 'text-green-700 line-through' : 'text-gray-800'
                        }`}>
                          {item.text}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* يوم الفرح Section */}
        <div className="mb-8 sm:mb-12">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-2 sm:border-4 border-purple-200">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="bg-white bg-opacity-20 p-2 sm:p-4 rounded-2xl backdrop-blur-sm">
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-4xl font-bold">يوم الفرح</h2>
                    <p className="text-purple-100 text-sm sm:text-lg mt-1 sm:mt-2">اليوم الأجمل في العمر 🎊</p>
                  </div>
                </div>
                <div className="text-center bg-white bg-opacity-20 px-4 py-2 sm:px-6 sm:py-4 rounded-2xl backdrop-blur-sm">
                  <div className="text-2xl sm:text-4xl font-bold">{getProgress(yomElfarahItems, 'farah')}%</div>
                  <div className="text-xs sm:text-sm text-purple-100">مكتمل</div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-8">
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {yomElfarahItems.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => toggleCheck('farah', index)}
                    className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-6 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 ${
                      isChecked('farah', index)
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400'
                        : 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 hover:border-purple-400'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all ${
                      isChecked('farah', index)
                        ? 'bg-green-500 text-white'
                        : 'bg-white border-2 border-purple-300'
                    }`}>
                      {isChecked('farah', index) ? (
                        <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                      ) : (
                        <div className="w-6 h-6 sm:w-7 sm:h-7 border-2 border-purple-400 rounded-lg"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl sm:text-3xl">{item.icon}</span>
                          <span className={`text-base sm:text-xl font-semibold ${
                            isChecked('farah', index) ? 'text-green-700 line-through' : 'text-gray-800'
                          }`}>
                            {item.text}
                          </span>
                        </div>
                        {item.price && (
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg shadow-md">
                            {item.price}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Cost */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 sm:border-4 border-yellow-300 rounded-xl sm:rounded-2xl p-3 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-2xl sm:text-4xl">💰</span>
                    <span className="text-base sm:text-2xl font-bold text-gray-800">إجمالي التكاليف المحددة</span>
                  </div>
                  <div className="text-xl sm:text-4xl font-bold text-orange-600">
                    {totalCost.toLocaleString('ar-EG')} جنيه
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-2 sm:border-4 border-rose-200">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-4 sm:p-8">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="bg-white bg-opacity-20 p-2 sm:p-4 rounded-2xl backdrop-blur-sm">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div>
                <h2 className="text-xl sm:text-4xl font-bold">سيناريو يوم الفرح</h2>
                <p className="text-rose-100 text-sm sm:text-lg mt-1 sm:mt-2">البرنامج اليومي خطوة بخطوة ⏰</p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-8">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute right-4 sm:right-8 top-8 bottom-8 w-1 bg-gradient-to-b from-pink-400 via-rose-400 to-purple-400"></div>

              <div className="space-y-6 sm:space-y-8">
                {[
                  {
                    time: "قبل العصر",
                    title: "التجهيز والميكاب",
                    description: "الوصول للمكان والتجهيز مع الميكاب ارتست",
                    icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                  },
                  {
                    time: "العصر",
                    title: "الفيرست لوك والسيشن",
                    description: "لقاء العريس وعمل الفيرست لوك وتصوير بقية السيشن",
                    icon: <Camera className="w-5 h-5 sm:w-6 sm:h-6" />
                  },
                  {
                    time: "المغرب",
                    title: "انتهاء التصوير",
                    description: "نهاية السيشن والاستعداد لاستقبال المعازيم",
                    icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                  },
                  {
                    time: "بعد العشاء",
                    title: "الاحتفال",
                    description: "المعازيم يباركون ويفرحون.. وأتم الله علينا اليوم ❤️",
                    icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  }
                ].map((step, index) => (
                  <div key={index} className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-xl border-2 sm:border-4 border-white">
                        {step.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-pink-200 shadow-lg hover:shadow-xl transition-shadow">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-2 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
                          {step.time}
                        </span>
                        <span className="text-lg sm:text-2xl">⏰</span>
                      </div>
                      <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final Message */}
        <div className="mt-8 sm:mt-12 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-xl sm:rounded-3xl p-4 sm:p-8 text-white text-center shadow-2xl">
          <Heart className="w-10 h-10 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-4 animate-pulse" />
          <h3 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-3">مبروك مقدماً! 🎉</h3>
          <p className="text-base sm:text-xl text-pink-100 leading-relaxed">
            ربنا يتمم ليكم على خير ويجعله يوم مليان بركة وسعادة 💕
          </p>
          <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 sm:gap-3 text-lg sm:text-2xl">
            <span>💐</span>
            <span>💍</span>
            <span>👰</span>
            <span>🤵</span>
            <span>🎊</span>
            <span>✨</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
