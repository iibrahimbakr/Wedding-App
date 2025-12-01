import React, { useEffect, useState } from 'react'
import { Heart, Calendar, Camera, Sparkles, Users, Clock, FileText, CheckCircle } from 'lucide-react'

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
    { text: 'الفستان', icon: '👗' },
    { text: 'البدلة', icon: '🤵' },
    { text: 'البوكية', icon: '💐' },
    { text: 'البصمة + المنديل + البروش', icon: '💍' },
    { text: 'ورق الصحة (البطاقة + صور شخصية 4×6)', icon: '📋' },
    { text: 'المكان', icon: '🏛️' },
    { text: 'المأذون', icon: '📜' }
  ]

  const yomElfarahItems: Item[] = [
    { text: 'الفستان', icon: '👗', price: null },
    { text: 'الطرحة', icon: '👰', price: '1000' },
    { text: 'الميكاب', icon: '💄', price: '4000' },
    { text: 'الفوتجرافر (ايه حمدي)', icon: '📸', price: '5000' },
    { text: 'البوكية', icon: '💐', price: null },
    { text: 'البدلة', icon: '🤵', price: null },
    { text: 'المكان (مكان الميكاب والسيشن والبارتي للأهل)', icon: '🏰', price: null }
  ]

  const totalCost = yomElfarahItems.filter(i => i.price).reduce((s, it) => s + Number(it.price), 0)

  return (
    <div dir="rtl" className="min-h-screen p-6 max-w-6xl mx-auto">
      <div className="relative bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-white py-12 px-6 rounded-3xl shadow-lg mb-8">
        <div className="text-center">
          <Heart className="mx-auto w-16 h-16 animate-pulse-custom" />
          <h1 className="text-4xl font-bold mt-4">قائمة تجهيزات الفرح</h1>
          <p className="mt-2 text-pink-100">صفحة واحدة لكم — يتم الحفظ تلقائياً</p>
        </div>
      </div>

      <section className="mb-8">
        <div className="bg-white rounded-3xl shadow-md p-6 border-2 border-pink-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl"><FileText /></div>
              <div>
                <h2 className="text-2xl font-bold">كتب الكتاب</h2>
                <p className="text-sm text-pink-500">الخطوة الأولى المباركة</p>
              </div>
            </div>
            <div className="text-xl font-bold">{getProgress(ktbElKitabItems, 'ktb')}%</div>
          </div>

          <div className="space-y-3">
            {ktbElKitabItems.map((it, i) => (
              <div key={i} onClick={() => toggleCheck('ktb', i)} className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition ${isChecked('ktb', i) ? 'bg-green-50 border border-green-200' : 'bg-pink-50 border border-pink-100'}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isChecked('ktb', i) ? 'bg-green-500 text-white' : 'bg-white'}`}>
                  {isChecked('ktb', i) ? <CheckCircle /> : it.icon}
                </div>
                <div className={`${isChecked('ktb', i) ? 'line-through text-green-700' : ''}`}>{it.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="bg-white rounded-3xl shadow-md p-6 border-2 border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl"><Heart /></div>
              <div>
                <h2 className="text-2xl font-bold">يوم الفرح</h2>
                <p className="text-sm text-purple-500">اليوم الأجمل في العمر</p>
              </div>
            </div>
            <div className="text-xl font-bold">{getProgress(yomElfarahItems, 'farah')}%</div>
          </div>

          <div className="space-y-3 mb-4">
            {yomElfarahItems.map((it, i) => (
              <div key={i} onClick={() => toggleCheck('farah', i)} className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition ${isChecked('farah', i) ? 'bg-green-50 border border-green-200' : 'bg-purple-50 border border-purple-100'}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isChecked('farah', i) ? 'bg-green-500 text-white' : 'bg-white'}`}>{isChecked('farah', i) ? <CheckCircle /> : it.icon}</div>
                <div className="flex-1 flex items-center justify-between">
                  <div className={`${isChecked('farah', i) ? 'line-through text-green-700' : ''}`}>{it.text}</div>
                  {it.price && <div className="bg-yellow-400 text-white px-3 py-1 rounded-md font-bold">{Number(it.price).toLocaleString('ar-EG')} ج</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center justify-between">
            <div className="font-bold">إجمالي التكاليف المحددة</div>
            <div className="text-lg font-bold text-orange-600">{totalCost.toLocaleString('ar-EG')} ج</div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-3xl shadow-md p-6 border-2 border-rose-100">
        <div className="flex items-center gap-4 mb-3">
          <div className="bg-white bg-opacity-20 p-3 rounded-xl"><Calendar /></div>
          <div>
            <h3 className="text-2xl font-bold">سيناريو يوم الفرح</h3>
            <p className="text-sm text-rose-500">البرنامج اليومي خطوة بخطوة</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white"><Sparkles /></div>
            <div>
              <div className="text-sm font-bold bg-pink-100 inline-block px-3 py-1 rounded-full">قبل العصر</div>
              <h4 className="font-bold mt-2">التجهيز والميكاب</h4>
              <p className="text-sm">الوصول للمكان والتجهيز مع الميكاب ارتست</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white"><Camera /></div>
            <div>
              <div className="text-sm font-bold bg-pink-100 inline-block px-3 py-1 rounded-full">العصر</div>
              <h4 className="font-bold mt-2">الفيرست لوك والسيشن</h4>
              <p className="text-sm">لقاء العريس وعمل الفيرست لوك وتصوير بقية السيشن</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white"><Clock /></div>
            <div>
              <div className="text-sm font-bold bg-pink-100 inline-block px-3 py-1 rounded-full">المغرب</div>
              <h4 className="font-bold mt-2">انتهاء التصوير</h4>
              <p className="text-sm">نهاية السيشن والاستعداد لاستقبال المعازيم</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white"><Users /></div>
            <div>
              <div className="text-sm font-bold bg-pink-100 inline-block px-3 py-1 rounded-full">بعد العشاء</div>
              <h4 className="font-bold mt-2">الاحتفال</h4>
              <p className="text-sm">المعازيم يباركون ويفرحون.. وأتم الله علينا اليوم ❤️</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
