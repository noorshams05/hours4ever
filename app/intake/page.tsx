'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function IntakePage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState('starter')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    edDuration: '',
    edFrequency: '',
    morningErections: '',
    masturbationErections: '',
    libidoChange: '',
    severityScale: '',
    partnerAware: '',
    ableToPenetrate: '',
    ableToOrgasm: '',
    erectionDuration: '',
    avoidSexualActivity: '',
    heartConditions: '',
    chestPain: '',
    lowBloodPressure: '',
    nitrates: '',
    alphaBlockers: '',
    pulmonaryHypertensionMeds: '',
    kidneyDisease: '',
    liverDisease: '',
    peyroniesDisease: '',
    multipleSclerosis: '',
    parkinsonsDisease: '',
    spinalCordInjury: '',
    lowTestosterone: '',
    sleepApnea: '',
    depressionOrAnxiety: '',
    previousPelvicSurgery: '',
    hasAllergies: '',
    allergyDetails: '',
    smokingStatus: '',
    height: '',
    weight: '',
    exerciseFrequency: '',
    sideEffects: '',
    previousStrength: '',
    primaryGoal: '',
    fourHourErection: '',
    bloodDisorders: '',
    suddenVisionOrHearingLoss: '',
    attestationChecked: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.attestationChecked) {
      alert('Please check the final attestation before submitting.')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/intake/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: selectedPlan,
          patientData: formData,
        }),
      })

      const data = await response.json()
      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        alert('Error processing intake submission.')
        setLoading(false)
      }
    } catch (err) {
      console.error(err)
      alert('Network error occurred.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-pink-500">Medical Intake Questionnaire</h1>
        <p className="text-neutral-400 mb-8">Please fill out all details below carefully for clinical review.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Plan Selection */}
          <div className="bg-neutral-800 p-4 rounded-lg">
            <label className="block text-sm font-semibold mb-2">Select Plan</label>
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-white"
            >
              <option value="starter">Starter - $49.00</option>
              <option value="monthly">Monthly Subscription</option>
              <option value="quarterly">Quarterly Subscription</option>
            </select>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-neutral-800 pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">First Name <span className="text-red-500">*</span></label>
                <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Last Name <span className="text-red-500">*</span></label>
                <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Email <span className="text-red-500">*</span></label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Phone <span className="text-red-500">*</span></label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Date of Birth <span className="text-red-500">*</span></label>
                <input type="date" name="dob" required value={formData.dob} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white" />
              </div>
            </div>
          </div>

          {/* Erectile Function */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-neutral-800 pb-2">Erectile Function</h2>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">How long have you been experiencing erectile dysfunction? <span className="text-red-500">*</span></label>
              <select name="edDuration" required value={formData.edDuration} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Less than 1 month</option>
                <option>1–6 months</option>
                <option>6–12 months</option>
                <option>More than 1 year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Is your ED: <span className="text-red-500">*</span></label>
              <select name="edFrequency" required value={formData.edFrequency} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Always present</option>
                <option>Most of the time</option>
                <option>Occasionally</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Do you wake up with morning erections? <span className="text-red-500">*</span></label>
              <select name="morningErections" required value={formData.morningErections} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Yes</option>
                <option>No</option>
                <option>Sometimes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Are you able to get an erection during masturbation? <span className="text-red-500">*</span></label>
              <select name="masturbationErections" required value={formData.masturbationErections} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Yes</option>
                <option>No</option>
                <option>Sometimes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Has your sex drive (libido) changed? <span className="text-red-500">*</span></label>
              <select name="libidoChange" required value={formData.libidoChange} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Increased</option>
                <option>Normal</option>
                <option>Decreased</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">On a scale of 1–10, how would you rate the severity of your ED? <span className="text-red-500">*</span></label>
              <select name="severityScale" required value={formData.severityScale} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Does your partner know you are seeking treatment? <span className="text-red-500">*</span></label>
              <select name="partnerAware" required value={formData.partnerAware} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Yes</option>
                <option>No</option>
                <option>Sometimes</option>
                <option>Not applicable</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Are you able to achieve penetration? <span className="text-red-500">*</span></label>
              <select name="ableToPenetrate" required value={formData.ableToPenetrate} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Yes</option>
                <option>No</option>
                <option>Sometimes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Are you able to achieve orgasm? <span className="text-red-500">*</span></label>
              <select name="ableToOrgasm" required value={formData.ableToOrgasm} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Yes</option>
                <option>No</option>
                <option>Sometimes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">How long does your erection typically last? <span className="text-red-500">*</span></label>
              <select name="erectionDuration" required value={formData.erectionDuration} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Less than 1 minute</option>
                <option>1–5 minutes</option>
                <option>5–15 minutes</option>
                <option>More than 15 minutes</option>
              </select>
            </div>
          </div>

          {/* Heart & General Health */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-neutral-800 pb-2">Heart & General Health</h2>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Have you ever been told by a doctor that you should avoid sexual activity because of a heart condition? <span className="text-red-500">*</span></label>
              <select name="avoidSexualActivity" required value={formData.avoidSexualActivity} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Yes</option>
                <option>No</option>
                <option>Sometimes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Have you had a heart attack, stroke, or heart surgery? <span className="text-red-500">*</span></label>
              <select name="heartConditions" required value={formData.heartConditions} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Yes</option>
                <option>No</option>
                <option>Sometimes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Do you experience chest pain during physical activity or sex? <span className="text-red-500">*</span></label>
              <select name="chestPain" required value={formData.chestPain} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Yes</option>
                <option>No</option>
                <option>Sometimes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Do you have low blood pressure or episodes of fainting? <span className="text-red-500">*</span></label>
              <select name="lowBloodPressure" required value={formData.lowBloodPressure} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Yes</option>
                <option>No</option>
                <option>Sometimes</option>
              </select>
            </div>
          </div>

          {/* Medication Safety */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-neutral-800 pb-2">Medication Safety (Very Important)</h2>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Are you currently taking nitrates for chest pain? <span className="text-red-500">*</span></label>
              <select name="nitrates" required value={formData.nitrates} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Nitroglycerin</option>
                <option>Isosorbide mononitrate</option>
                <option>Isosorbide dinitrate</option>
                <option>None</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Are you taking alpha-blockers? <span className="text-red-500">*</span></label>
              <select name="alphaBlockers" required value={formData.alphaBlockers} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Tamsulosin (Flomax)</option>
                <option>Doxazosin</option>
                <option>Terazosin</option>
                <option>None</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Are you taking medications for pulmonary hypertension? <span className="text-red-500">*</span></label>
              <select name="pulmonaryHypertensionMeds" required value={formData.pulmonaryHypertensionMeds} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Yes</option>
                <option>No</option>
                <option>Sometimes</option>
              </select>
            </div>
          </div>

          {/* Medical History */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-neutral-800 pb-2">Medical History (Yes/No)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Kidney disease', name: 'kidneyDisease' },
                { label: 'Liver disease', name: 'liverDisease' },
                { label: "Peyronie's disease (curved penis)", name: 'peyroniesDisease' },
                { label: 'Multiple sclerosis', name: 'multipleSclerosis' },
                { label: "Parkinson's disease", name: 'parkinsonsDisease' },
                { label: 'Spinal cord injury', name: 'spinalCordInjury' },
                { label: 'Low testosterone', name: 'lowTestosterone' },
                { label: 'Sleep apnea', name: 'sleepApnea' },
                { label: 'Depression or anxiety', name: 'depressionOrAnxiety' },
                { label: 'Previous pelvic surgery', name: 'previousPelvicSurgery' },
              ].map((item) => (
                <div key={item.name} className="bg-neutral-800 p-3 rounded flex justify-between items-center">
                  <span className="text-sm">{item.label} <span className="text-red-500">*</span></span>
                  <select
                    name={item.name}
                    required
                    value={(formData as any)[item.name]}
                    onChange={handleChange}
                    className="bg-neutral-900 border border-neutral-700 rounded p-1 text-white text-sm"
                  >
                    <option value="">Select...</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                    <option value="Sometimes">Sometimes</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Allergies & Lifestyle */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-neutral-800 pb-2">Allergies & Lifestyle</h2>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Are you allergic to any medications? <span className="text-red-500">*</span></label>
              <select name="hasAllergies" required value={formData.hasAllergies} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white mb-2">
                <option value="">Select option...</option>
                <option>No</option>
                <option>Yes</option>
              </select>
              {formData.hasAllergies === 'Yes' && (
                <input
                  type="text"
                  name="allergyDetails"
                  required
                  placeholder="Please list allergies..."
                  value={formData.allergyDetails}
                  onChange={handleChange}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white"
                />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Smoking Status <span className="text-red-500">*</span></label>
                <select name="smokingStatus" required value={formData.smokingStatus} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                  <option value="">Select...</option>
                  <option>Never</option>
                  <option>Former</option>
                  <option>Current</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Height <span className="text-red-500">*</span></label>
                <input type="text" name="height" required placeholder="e.g. 5'10&quot;" value={formData.height} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white" />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Weight <span className="text-red-500">*</span></label>
                <input type="text" name="weight" required placeholder="e.g. 170 lbs" value={formData.weight} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Exercise Frequency <span className="text-red-500">*</span></label>
              <select name="exerciseFrequency" required value={formData.exerciseFrequency} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Never</option>
                <option>1–2 times/week</option>
                <option>3–5 times/week</option>
                <option>Daily</option>
              </select>
            </div>
          </div>

          {/* Previous ED Treatment & Goals */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-neutral-800 pb-2">Previous ED Treatment & Goals</h2>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Did you experience side effects from past treatments? <span className="text-red-500">*</span></label>
              <select name="sideEffects" required value={formData.sideEffects} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>None</option>
                <option>Headache</option>
                <option>Flushing</option>
                <option>Nasal congestion</option>
                <option>Heartburn</option>
                <option>Vision changes</option>
                <option>Muscle aches</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Which strength did you take? <span className="text-red-500">*</span></label>
              <select name="previousStrength" required value={formData.previousStrength} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Sildenafil 25/50/100 mg</option>
                <option>Tadalafil 5/10/20 mg</option>
                <option>Vardenafil</option>
                <option>Unsure</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">What would you like to improve? <span className="text-red-500">*</span></label>
              <select name="primaryGoal" required value={formData.primaryGoal} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>Get and maintain an erection</option>
                <option>Last longer</option>
                <option>Increase confidence</option>
                <option>Improve firmness</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Required Safety Questions */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-neutral-800 pb-2 text-pink-500">Required Safety Questions</h2>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Have you ever had an erection lasting more than 4 hours? <span className="text-red-500">*</span></label>
              <select name="fourHourErection" required value={formData.fourHourErection} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>No</option>
                <option>Yes</option>
                <option>Sometimes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Have you ever been diagnosed with sickle cell disease, leukemia, or multiple myeloma? <span className="text-red-500">*</span></label>
              <select name="bloodDisorders" required value={formData.bloodDisorders} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>No</option>
                <option>Yes</option>
                <option>Sometimes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Have you experienced sudden vision or hearing loss? <span className="text-red-500">*</span></label>
              <select name="suddenVisionOrHearingLoss" required value={formData.suddenVisionOrHearingLoss} onChange={handleChange} className="w-full bg-neutral-800 border border-neutral-700 rounded p-2 text-white">
                <option value="">Select option...</option>
                <option>No</option>
                <option>Yes</option>
                <option>Sometimes</option>
              </select>
            </div>
          </div>

          {/* Final Attestation */}
          <div className="bg-neutral-800 p-4 rounded-lg space-y-3">
            <h2 className="font-semibold text-white">Final Attestation</h2>
            <ul className="text-xs text-neutral-400 space-y-1 list-disc pl-4">
              <li>I certify that the information I provided is accurate and complete.</li>
              <li>I understand a licensed healthcare provider will review my answers before determining whether treatment is appropriate.</li>
              <li>I understand that submitting this questionnaire does not guarantee a prescription.</li>
            </ul>
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                name="attestationChecked"
                id="attestation"
                required
                checked={formData.attestationChecked}
                onChange={handleChange}
                className="w-4 h-4 accent-pink-500"
              />
              <label htmlFor="attestation" className="text-sm font-medium text-white cursor-pointer">
                I agree to the terms and certify my statements above. *
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Processing & Redirecting...' : 'Submit & Proceed to Checkout'}
          </button>
        </form>
      </div>
    </main>
  )
}
