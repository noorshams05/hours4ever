export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-2xl text-center space-y-6">
        <h1 className="text-3xl font-bold text-pink-500">Payment Successful!</h1>
        <p className="text-neutral-300">
          Your medical intake has been submitted. Please schedule your review appointment with Jeff using the calendar below.
        </p>
        
        <div className="w-full h-[600px] bg-neutral-800 rounded-lg overflow-hidden">
          <iframe
            src="https://calendly.com/hours4everjeff/30min"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Schedule Review with Jeff"
          ></iframe>
        </div>
      </div>
    </main>
  )
}
