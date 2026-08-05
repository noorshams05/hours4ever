import { NextResponse } from 'next/server'

const SHOPIFY_PLANS: Record<string, { variantId: string; sellingPlan?: string }> = {
  starter: { variantId: '53759428985056' },
  monthly: { variantId: '53759429017824', sellingPlan: '11321442528' },
  quarterly: { variantId: '53759429050592', sellingPlan: '11321475296' },
}

// Safety-critical answers that must be reviewed by a licensed provider
// BEFORE checkout is allowed to proceed. Returns a list of human-readable
// reasons; an empty array means no hard-stop flags were tripped.
function getSafetyFlags(patientData: Record<string, any> = {}): string[] {
  const flags: string[] = []
  const isPositive = (v: unknown) => v === 'Yes' || v === 'Sometimes'

  if (patientData.nitrates && patientData.nitrates !== 'None') {
    flags.push(`Taking nitrates (${patientData.nitrates}) — contraindicated with ED medication, risk of severe hypotension`)
  }
  if (isPositive(patientData.fourHourErection)) {
    flags.push('History of erection lasting more than 4 hours (priapism risk)')
  }
  if (isPositive(patientData.bloodDisorders)) {
    flags.push('History of sickle cell disease, leukemia, or multiple myeloma')
  }
  if (isPositive(patientData.suddenVisionOrHearingLoss)) {
    flags.push('History of sudden vision or hearing loss')
  }
  if (isPositive(patientData.avoidSexualActivity)) {
    flags.push('Doctor previously advised avoiding sexual activity due to a heart condition')
  }
  if (isPositive(patientData.heartConditions)) {
    flags.push('History of heart attack, stroke, or heart surgery')
  }
  if (isPositive(patientData.chestPain)) {
    flags.push('Chest pain during physical activity or sex')
  }
  if (isPositive(patientData.lowBloodPressure)) {
    flags.push('Low blood pressure or fainting episodes')
  }
  if (isPositive(patientData.pulmonaryHypertensionMeds)) {
    flags.push('Taking medication for pulmonary hypertension')
  }

  return flags
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { plan, patientData } = body

    const safetyFlags = getSafetyFlags(patientData)
    const requiresReview = safetyFlags.length > 0

    const selectedPlan = SHOPIFY_PLANS[plan] || SHOPIFY_PLANS['monthly']
    const cartUrl = new URL('https://elevate2xl.myshopify.com/cart/add')
    cartUrl.searchParams.append('items[0][id]', selectedPlan.variantId)
    cartUrl.searchParams.append('items[0][quantity]', '1')
    if (selectedPlan.sellingPlan) {
      cartUrl.searchParams.append('items[0][selling_plan]', selectedPlan.sellingPlan)
    }

    // Send intake details to Jeff — subject/content differ if a hard-stop flag was tripped
    const emailPayload = {
      to: 'Jeff@elevate2xl.com',
      subject: requiresReview
        ? `⚠️ SAFETY REVIEW REQUIRED - Intake Submission - Plan: ${plan.toUpperCase()}`
        : `New Medical Intake Submission - Plan: ${plan.toUpperCase()}`,
      html: `
        ${requiresReview ? `<h2 style="color:#c00">Provider review required before this order can ship</h2>
        <ul>${safetyFlags.map((f) => `<li>${f}</li>`).join('')}</ul>
        <p><strong>Checkout has NOT been released to this patient.</strong> Review and manually approve/deny.</p>` : ''}
        <h2>New Patient Intake Details</h2>
        <p><strong>Selected Plan:</strong> ${plan}</p>
        <p><strong>Patient Name:</strong> ${patientData?.firstName || ''} ${patientData?.lastName || ''}</p>
        <p><strong>Email:</strong> ${patientData?.email || ''}</p>
        <p><strong>Phone:</strong> ${patientData?.phone || ''}</p>
        <p><strong>Date of Birth:</strong> ${patientData?.dob || ''}</p>
        <p><strong>Medical History / Answers:</strong> ${JSON.stringify(patientData?.answers || patientData, null, 2)}</p>
      `,
    }

    // If using Resend (or fetch to another email service):
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Intake System <no-reply@elevate2xl.com>',
          ...emailPayload,
        }),
      })
    }

    if (requiresReview) {
      // Do NOT return a checkoutUrl — this submission needs a human to clear it first.
      return NextResponse.json({ success: true, requiresReview: true, reasons: safetyFlags })
    }

    return NextResponse.json({ success: true, checkoutUrl: cartUrl.toString() })
  } catch (error) {
    console.error('Intake submission error:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
