const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')

admin.initializeApp()
const db = admin.firestore()

const app = express()

app.use(cors({ origin: true }))
app.use(express.json())

/* ── Input sanitizer ── */
function sanitize(str, maxLen = 500) {
  if (typeof str !== 'string') return ''
  return str.trim().slice(0, maxLen)
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

/* ── POST /api/contact ── */
app.post('/contact', async (req, res) => {
  try {
    const name = sanitize(req.body.name, 100)
    const email = sanitize(req.body.email, 200)
    const phone = sanitize(req.body.phone, 20)
    const message = sanitize(req.body.message, 1000)
    const language = req.body.language === 'te' ? 'te' : 'en'

    if (!name) return res.status(400).json({ error: 'Name is required' })
    if (!email || !isValidEmail(email)) return res.status(400).json({ error: 'Valid email is required' })
    if (!message) return res.status(400).json({ error: 'Message is required' })

    await db.collection('contacts').add({
      name,
      email,
      phone,
      message,
      language,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })

    return res.status(200).json({ success: true, message: 'Contact saved successfully' })
  } catch (err) {
    console.error('Contact error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

/* ── POST /api/download ── */
app.post('/download', async (req, res) => {
  try {
    const statsRef = db.collection('stats').doc('downloads')
    const snap = await statsRef.get()
    if (!snap.exists) {
      await statsRef.set({ count: 1 })
    } else {
      await statsRef.update({ count: admin.firestore.FieldValue.increment(1) })
    }
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Download error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

/* ── GET /api/stats ── */
app.get('/stats', async (req, res) => {
  try {
    const snap = await db.collection('stats').doc('downloads').get()
    const count = snap.exists ? (snap.data().count ?? 0) : 0
    return res.status(200).json({ downloadCount: count })
  } catch (err) {
    console.error('Stats error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

/* ── Trigger Email for New Contacts ── */
exports.onContactCreated = functions.firestore
  .document('contacts/{docId}')
  .onCreate(async (snap, context) => {
    const contact = snap.data();

    const CONTACT_EMAIL = 'support.kisaankrushi@gmail.com';

    const emailHtml = `
      <div style="font-family:sans-serif;max-width:540px;margin:auto;border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;">
        <div style="background:#1B5E20;padding:24px 28px;">
          <h2 style="color:#F9A825;margin:0;font-size:20px;">🌿 Kisaan Krushi — New Contact</h2>
        </div>
        <div style="padding:28px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#666;font-size:13px;width:100px;">Name</td>
                <td style="padding:8px 0;font-weight:600;color:#1C1C1C;">${contact.name}</td></tr>
            <tr><td style="padding:8px 0;color:#666;font-size:13px;">Email</td>
                <td style="padding:8px 0;font-weight:600;color:#1C1C1C;"><a href="mailto:${contact.email}" style="color:#1B5E20;">${contact.email}</a></td></tr>
            ${contact.phone ? `<tr><td style="padding:8px 0;color:#666;font-size:13px;">Phone</td>
                <td style="padding:8px 0;font-weight:600;color:#1C1C1C;">${contact.phone}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#666;font-size:13px;">Language</td>
                <td style="padding:8px 0;font-weight:600;color:#1C1C1C;">${contact.language === 'te' ? 'Telugu' : 'English'}</td></tr>
          </table>
          <div style="margin-top:20px;background:#f9f9f7;border-radius:8px;padding:16px;border-left:4px solid #1B5E20;">
            <p style="margin:0;color:#666;font-size:12px;margin-bottom:6px;">MESSAGE</p>
            <p style="margin:0;color:#1C1C1C;line-height:1.6;">${(contact.message || '').replace(/\n/g, '<br/>')}</p>
          </div>
          <p style="margin-top:24px;font-size:11px;color:#aaa;">Sent via Kisaan Krushi contact form · ${new Date().toLocaleString('en-IN')}</p>
        </div>
      </div>
    `;

    return db.collection('mail').add({
      to: [CONTACT_EMAIL],
      message: {
        subject: `📩 New Contact from Kisaan Krushi — ${contact.name}`,
        html: emailHtml
      }
    });
  });

exports.api = functions.https.onRequest(app)
