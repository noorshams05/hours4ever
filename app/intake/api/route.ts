import { NextResponse } from 'next/server'

const SHOPIFY_PLANS: Record<string, { variantId: string; sellingPlan?: string }> = {
  starter: { variantId: '53759428985056' },
  monthly: { variantId: '53759429017824', sellingPlan: '11321442528' },
  quarterly: { variantId: '53759429050592', sellingPlan: '11321475296' },
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { plan, patientData } = body

    const selectedPlan = SHOPIFY_PLANS[plan] || SHOPIFY_PLans['monthly']
    const cartUrl = new URL('https://elevate2xl.myshopify.com/cart/add')
    cartUrl.searchParams.append('id', selectedPlan.variantId)
    cartUrl.searchParams.append('quantity', '1')
    if (selectedPlan.sellingPlan) {
      cartUrl.searchParams.append('selling_plan', selectedPlan.sellingPlan)
    }

    // Send intake details to Jeff
    const emailPayload = {
      to: 'Jeff@elevate2xl.com',
      subject: `New Medical Intake Submission - Plan: ${plan.toUpperCase()}`,
      html: `
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

    return NextResponse.json({ success: true, checkoutUrl: cartUrl.toString() })
  } catch (error) {
    console.error('Intake submission error:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
