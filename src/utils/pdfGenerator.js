// Professional B2B PDF & Printable Document Generator Engine for Nexora Digital

export const generateB2BInvoicePDF = (project) => {
  const printWindow = window.open('', '_blank', 'width=900,height=1000')
  if (!printWindow) {
    alert('Please allow popups to generate and print PDF invoices.')
    return
  }

  const depositAmt = (project.amount || 1500) * 0.5
  const finalAmt = (project.amount || 1500) * 0.5

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Invoice_${project.id}_NEXORA_DIGITAL</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #0B1020;
          margin: 0;
          padding: 40px;
          background: #ffffff;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid #0066FF;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: 900;
          color: #0B1020;
          letter-spacing: -0.5px;
        }
        .logo span {
          color: #0066FF;
        }
        .invoice-title {
          text-align: right;
        }
        .invoice-title h1 {
          margin: 0;
          font-size: 22px;
          color: #0066FF;
          font-family: monospace;
        }
        .invoice-title p {
          margin: 4px 0 0 0;
          font-size: 12px;
          color: #6B7280;
        }
        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }
        .box {
          background: #F8FAFC;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
        }
        .box h4 {
          margin: 0 0 8px 0;
          font-size: 11px;
          text-transform: uppercase;
          color: #6B7280;
          letter-spacing: 0.5px;
        }
        .box p {
          margin: 3px 0;
          font-size: 13px;
          font-weight: 600;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }
        th {
          background: #0B1020;
          color: #ffffff;
          font-size: 11px;
          text-transform: uppercase;
          text-align: left;
          padding: 12px;
        }
        td {
          padding: 12px;
          border-bottom: 1px solid #E2E8F0;
          font-size: 13px;
        }
        .amount {
          text-align: right;
          font-family: monospace;
          font-weight: 700;
        }
        .terms {
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          padding: 16px;
          border-radius: 12px;
          font-size: 12px;
          color: #1E40AF;
          margin-bottom: 30px;
        }
        .terms p {
          margin: 4px 0;
        }
        .footer {
          text-align: center;
          font-size: 11px;
          color: #94A3B8;
          border-top: 1px solid #E2E8F0;
          padding-top: 20px;
        }
        @media print {
          body { padding: 20px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom: 20px; text-align: right;">
        <button onclick="window.print()" style="background: #0066FF; color: white; border: none; padding: 10px 20px; font-weight: bold; border-radius: 8px; cursor: pointer;">
          🖨️ Download PDF / Print Invoice
        </button>
      </div>

      <div class="header">
        <div class="logo">
          NEXORA<span>DIGITAL</span>
          <p style="font-size: 10px; color: #6B7280; font-weight: normal; margin: 2px 0 0 0;">ENTERPRISE DIGITAL TECHNOLOGY SUITE</p>
        </div>
        <div class="invoice-title">
          <h1>INVOICE ${project.id}</h1>
          <p>Date: ${new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div class="details-grid">
        <div class="box">
          <h4>Billed To (Client):</h4>
          <p style="font-size: 16px; color: #0066FF;">${project.client}</p>
          <p>${project.clientEmail || 'contact@client-domain.com'}</p>
          <p>Service: ${project.service}</p>
        </div>
        <div class="box">
          <h4>Issued By (Agency):</h4>
          <p style="font-size: 16px;">NEXORA DIGITAL</p>
          <p>Karachi, Pakistan 🇵🇰</p>
          <p>Email: sales.nexorahms@gmail.com</p>
          <p>WhatsApp: +92 345 3937195</p>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Service Deliverable Scope</th>
            <th>SLA Guarantee</th>
            <th class="amount">Contract Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>${project.service}</strong><br>
              <span style="font-size: 11px; color: #6B7280;">Includes 100% Full IP Source Code Handoff &amp; GitHub Repository Handoff</span>
            </td>
            <td>100% Satisfaction SLA</td>
            <td class="amount">$${project.amount || 1500} USD</td>
          </tr>
        </tbody>
      </table>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
        <div className="box" style="background: #F0FDF4; border-color: #BBF7D0;">
          <h4 style="color: #166534;">50% Upfront Milestone Deposit</h4>
          <p style="color: #15803D; font-size: 16px;">$${depositAmt} USD — ${project.depositPaid ? '✓ PAID' : 'PENDING'}</p>
        </div>
        <div className="box" style="background: #FFFBEB; border-color: #FDE68A;">
          <h4 style="color: #92400E;">50% Final Scope Release</h4>
          <p style="color: #B45309; font-size: 16px;">$${finalAmt} USD — ${project.finalPaid ? '✓ PAID' : 'PENDING'}</p>
        </div>
      </div>

      <div class="terms">
        <strong style="display: block; margin-bottom: 6px;">B2B CONTRACT &amp; IP PROTECTION CLAUSE:</strong>
        <p>• <strong>100% Source Code Ownership:</strong> Complete GitHub repository and intellectual property rights are handed over upon final milestone payment.</p>
        <p>• <strong>Signed Mutual NDA:</strong> All proprietary business data, client information, and custom code remain strictly confidential.</p>
        <p>• <strong>Performance SLA:</strong> Guaranteed sub-1.2s page load speed benchmark and 99+ Google PageSpeed rating.</p>
      </div>

      <div class="footer">
        © 2026 NEXORA DIGITAL. Official B2B Milestone Invoice &amp; Escrow Guarantee.
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 600);
        }
      </script>
    </body>
    </html>
  `

  printWindow.document.write(htmlContent)
  printWindow.document.close()
}

export const generateExecutiveProposalPDF = (leadMsg) => {
  const printWindow = window.open('', '_blank', 'width=900,height=1000')
  if (!printWindow) {
    alert('Please allow popups to generate PDF proposal.')
    return
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Executive_Proposal_${leadMsg.id}_NEXORA_DIGITAL</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          color: #0B1020;
          margin: 0;
          padding: 40px;
          background: #ffffff;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 3px solid #0066FF;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: 900;
          color: #0B1020;
        }
        .logo span { color: #0066FF; }
        .proposal-badge {
          background: #0066FF;
          color: white;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .box {
          background: #F8FAFC;
          padding: 20px;
          border-radius: 14px;
          border: 1px solid #E2E8F0;
          margin-bottom: 25px;
        }
        h2 {
          font-size: 18px;
          color: #0B1020;
          margin-top: 0;
          border-bottom: 1px solid #E2E8F0;
          padding-bottom: 10px;
        }
        .tech-pill {
          display: inline-block;
          background: #E0E7FF;
          color: #3730A3;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
          margin: 3px;
        }
        .milestone-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid #F1F5F9;
        }
        .milestone-number {
          background: #0066FF;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: bold;
          flex-shrink: 0;
        }
        .footer {
          text-align: center;
          font-size: 11px;
          color: #94A3B8;
          border-top: 1px solid #E2E8F0;
          padding-top: 20px;
          margin-top: 40px;
        }
        @media print {
          body { padding: 20px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="no-print" style="margin-bottom: 20px; text-align: right;">
        <button onclick="window.print()" style="background: #0066FF; color: white; border: none; padding: 10px 20px; font-weight: bold; border-radius: 8px; cursor: pointer;">
          🖨️ Download PDF / Print Proposal
        </button>
      </div>

      <div class="header">
        <div class="logo">
          NEXORA<span>DIGITAL</span>
          <p style="font-size: 10px; color: #6B7280; font-weight: normal; margin: 2px 0 0 0;">EXECUTIVE TECHNICAL PROPOSAL &amp; SCOPE BREAKDOWN</p>
        </div>
        <div class="proposal-badge">PROPOSAL #${leadMsg.id}</div>
      </div>

      <div class="box">
        <h2 style="color: #0066FF;">CLIENT &amp; PROJECT OVERVIEW</h2>
        <p><strong>Prepared For:</strong> ${leadMsg.fullName} (${leadMsg.businessName})</p>
        <p><strong>Requested Service:</strong> ${leadMsg.service}</p>
        <p><strong>Target Budget Scope:</strong> ${leadMsg.budget}</p>
        <p><strong>Client Location:</strong> ${leadMsg.location || 'Karachi, Pakistan 🇵🇰'}</p>
        <p><strong>Date Issued:</strong> ${new Date().toLocaleDateString()}</p>
      </div>

      <div class="box">
        <h2>AI ARCHITECTURE &amp; RECOMMENDED TECH STACK</h2>
        <p style="font-size: 13px; color: #4B5563; line-height: 1.6;">
          Based on your requirements, NEXORA DIGITAL recommends a high-performance Single Page Application (SPA) architecture engineered for sub-1.2s page loads and 99+ Google Lighthouse performance score.
        </p>
        <div style="margin-top: 12px;">
          <span class="tech-pill">React 19 Core</span>
          <span class="tech-pill">Tailwind CSS 4</span>
          <span class="tech-pill">Framer Motion WebGL</span>
          <span class="tech-pill">Vite Fast Hydration</span>
          <span class="tech-pill">Google Lighthouse 99+</span>
          <span class="tech-pill">Stripe &amp; PayPal API</span>
          <span class="tech-pill">JSON-LD SEO Schema</span>
        </div>
      </div>

      <div class="box">
        <h2>5-STEP SPRINT EXECUTION ROADMAP</h2>
        <div class="milestone-item">
          <div class="milestone-number">1</div>
          <div>
            <strong>Sprint 01: Scope Alignment &amp; Interactive UI/UX Figma Mockup</strong><br>
            <span style="font-size: 11px; color: #6B7280;">Establishing design system, responsive breakpoints, and client approval.</span>
          </div>
        </div>
        <div class="milestone-item">
          <div class="milestone-number">2</div>
          <div>
            <strong>Sprint 02: High-Performance Frontend &amp; State Engineering</strong><br>
            <span style="font-size: 11px; color: #6B7280;">Developing clean React 19 components with zero blocking scripts.</span>
          </div>
        </div>
        <div class="milestone-item">
          <div class="milestone-number">3</div>
          <div>
            <strong>Sprint 03: Telemetry, Payment Gateways &amp; Technical SEO Audit</strong><br>
            <span style="font-size: 11px; color: #6B7280;">Configuring Google PageSpeed 99+ optimizations, SSL, and payment methods.</span>
          </div>
        </div>
        <div class="milestone-item">
          <div class="milestone-number">4</div>
          <div>
            <strong>Sprint 04: Netlify Staging QA Test &amp; Multi-Device Verification</strong><br>
            <span style="font-size: 11px; color: #6B7280;">Cross-browser and mobile responsive QA testing on live staging domain.</span>
          </div>
        </div>
        <div class="milestone-item">
          <div class="milestone-number">5</div>
          <div>
            <strong>Sprint 05: 100% Full IP Source Code Handoff &amp; Live Domain Launch</strong><br>
            <span style="font-size: 11px; color: #6B7280;">Transferring full GitHub repository ownership and DNS configuration.</span>
          </div>
        </div>
      </div>

      <div class="box" style="background: #F0FDF4; border-color: #BBF7D0;">
        <h2 style="color: #166534;">CLIENT GUARANTEES &amp; TERMS OF ENGAGEMENT</h2>
        <p style="font-size: 12px; color: #15803D;">• <strong>50% Upfront / 50% Final Milestone:</strong> Transparent payment structure with zero hidden fees.</p>
        <p style="font-size: 12px; color: #15803D;">• <strong>100% Code Ownership:</strong> Full GitHub repository ownership handoff upon final release.</p>
        <p style="font-size: 12px; color: #15803D;">• <strong>Signed Mutual NDA:</strong> Complete data privacy and source code protection.</p>
      </div>

      <div class="footer">
        © 2026 NEXORA DIGITAL. Official B2B Executive Technical Proposal.
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() { window.print(); }, 600);
        }
      </script>
    </body>
    </html>
  `

  printWindow.document.write(htmlContent)
  printWindow.document.close()
}
