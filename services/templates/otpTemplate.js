function generateOtpEmail(otp) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verification Code</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table
            role="presentation"
            width="600"
            cellspacing="0"
            cellpadding="0"
            style="
              max-width:600px;
              background:#ffffff;
              border-radius:12px;
              overflow:hidden;
              box-shadow:0 4px 20px rgba(0,0,0,0.06);
            "
          >
            <tr>
              <td
                style="
                  padding:32px;
                  text-align:center;
                  background:#111827;
                  color:#ffffff;
                "
              >
                <h1 style="margin:0;font-size:24px;">
                  Verify Your Account
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:40px 32px;">
                <p style="margin:0 0 16px;font-size:16px;color:#374151;">
                  Hello,
                </p>

                <p style="margin:0 0 24px;font-size:16px;color:#374151;">
                  Use the verification code below to continue.
                </p>

                <div style="text-align:center;margin:32px 0;">
                  <span
                    style="
                      display:inline-block;
                      padding:18px 32px;
                      font-size:32px;
                      font-weight:700;
                      letter-spacing:8px;
                      color:#111827;
                      background:#f3f4f6;
                      border:1px solid #e5e7eb;
                      border-radius:10px;
                    "
                  >
                    ${otp}
                  </span>
                </div>

                <p
                  style="
                    margin:24px 0 0;
                    padding:12px 16px;
                    background:#fff7ed;
                    color:#9a3412;
                    border-radius:8px;
                    font-size:14px;
                  "
                >
                  This code expires in 5 minutes.
                </p>

                <p
                  style="
                    margin:24px 0 0;
                    font-size:14px;
                    color:#6b7280;
                  "
                >
                  If you didn't request this code, you can safely ignore this
                  email.
                </p>
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding:20px 32px;
                  text-align:center;
                  font-size:12px;
                  color:#9ca3af;
                  border-top:1px solid #f3f4f6;
                "
              >
                © Your App. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

module.exports = generateOtpEmail