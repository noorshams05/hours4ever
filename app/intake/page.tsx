'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function IntakeFormContent() {
  const searchParams = useSearchParams()
  const planParam = searchParams.get('plan') || 'monthly'

  const [step, setStep] = useState<'contact' | 'medical' | 'summary'>('contact')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    state: '',
    takingNitrates: 'no',
    heartCondition: 'no',
    medicalNotes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 'contact') setStep('medical')
    else if (step === 'medical') setStep('summary')
  }

  const handleCompleteAndCheckout = () => {
    const checkoutUrls: Record<string, string> = {
      starter: 'https://elevate2xl.myshopify.com/cart/53759428985056:1',
      monthly: 'https://elevate2xl.myshopify.com/cart/53759429017824:1?selling_plan=11321442528',
      quarterly: 'https://elevate2xl.myshopify.com/cart/53759429050592:1?selling_plan=11321475296',
    }

    const targetUrl = checkoutUrls[planParam] || checkoutUrls['monthly']
    window.location.href = targetUrl
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full mx-auto space-y-8 bg-zinc-900/80 border border-white/10 p-8 rounded-2xl shadow-2xl">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#ff2a85] font-bold text-center mb-2">
            Confidential Consultation — Plan: {planParam.toUpperCase()}
          </p>
          <h2 className="text-3xl font-bold text-center">Medical Intake Form</h2>
          <p className="mt-2 text-sm text-center text-zinc-400">
            A licensed U.S. physician will review your responses before your order processes.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-between items-center text-xs border-b border-white/10 pb-4">
          <span className={step === 'contact' ? 'text-[#ff2a85] font-bold' : 'text-zinc-500'}>1. Contact</span>
          <span className={step === 'medical' ? 'text-[#ff2a85] font-bold' : 'text-zinc-500'}>2. Health</span>
          <span className={step === 'summary' ? 'text-[#ff2a85] font-bold' : 'text-zinc-500'}>3. Summary</span>
        </div>

        <form onSubmit={handleNext} className="space-y-6">
          {step === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase mb-1 text-zinc-300">First Name</label>
                  <input
                    type="text"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ff2a85]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase mb-1 text-zinc-300">Last Name</label>
                  <input
                    type="text"
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ff2a85]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase mb-1 text-zinc-300">Email Address</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ff2a85]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase mb-1 text-zinc-300">Date of Birth</label>
                  <input
                    type="date"
                    required
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ff2a85]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase mb-1 text-zinc-300">State</label>
                  <input
                    type="text"
                    required
                    name="state"
                    placeholder="e.g. CA"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ff2a85]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#ff2a85] hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-xl transition cursor-pointer"
              >
                Continue to Health Assessment →
              </button>
            </div>
          )}

          {step === 'medical' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase mb-2 text-zinc-300">Do you take nitrates or nitroglycerin?</label>
                <select
                  name="takingNitrates"
                  value={formData.takingNitrates}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ff2a85]"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase mb-2 text-zinc-300">Do you have a history of heart conditions or low blood pressure?</label>
                <select
                  name="heartCondition"
                  value={formData.heartCondition}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ff2a85]"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase mb-2 text-zinc-300">Additional Notes / Allergies (Optional)</label>
                <textarea
                  name="medicalNotes"
                  rows={3}
                  value={formData.medicalNotes}
                  onChange={handleChange}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#ff2a85]"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep('contact')}
                  className="w-1/3 border border-white/20 text-white font-bold py-3 rounded-xl hover:bg-white/5 transition cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-[#ff2a85] hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition cursor-pointer"
                >
                  Review Summary →
                </button>
              </div>
            </div>
          )}

          {step === 'summary' && (
            <div className="space-y-6">
              <div className="bg-black/50 p-4 rounded-xl space-y-2 text-sm border border-white/10 text-zinc-300">
                <p><strong>Selected Plan:</strong> {planParam.toUpperCase()}</p>
                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>DOB / State:</strong> {formData.dob} ({formData.state})</p>
                <p><strong>Nitrates:</strong> {formData.takingNitrates.toUpperCase()}</p>
                <p><strong>Heart Condition:</strong> {formData.heartCondition.toUpperCase()}</p>
              </div>

              <button
                type="button"
                onClick={handleCompleteAndCheckout}
                className="w-full bg-[#ff2a85] hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition cursor-pointer shadow-lg shadow-pink-500/20"
              >
                Submit & Proceed to Checkout →
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default function IntakePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading intake form...</div>}>
      <IntakeFormContent />
    </Suspense>
  )
}
