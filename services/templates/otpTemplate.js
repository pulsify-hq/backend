function generateOtpEmail(otp) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verification Code</title>
  </head>

  <body style="margin:0;padding:0;background:#0f172a;font-family:Arial,Helvetica,sans-serif;">
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
              background:#111827;
              border-radius:12px;
              overflow:hidden;
              box-shadow:0 4px 20px rgba(0,0,0,0.3);
            "
          >

            <!-- Logo -->
            <tr>
              <td style="padding:24px 32px 0;">
                <table width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="right">
                      <img
                        src="cid:pulsify-logo"
                        alt="Pulsify"
                        width="50"
                        height="50"
                        style="
                          border-radius:50%;
                          object-fit:cover;
                          border:2px solid #334155;
                        "
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>


            <!-- Content -->
            <tr>
              <td style="padding:24px 32px 40px;">

                <h1
                  style="
                    margin:0 0 20px;
                    font-size:24px;
                    color:#f8fafc;
                  "
                >
                  Verify Your Account
                </h1>

                <p style="margin:0 0 16px;font-size:16px;color:#cbd5e1;">
                  Hello,
                </p>

                <p style="margin:0 0 24px;font-size:16px;color:#cbd5e1;">
                  Use the verification code below to continue.
                </p>


                <!-- OTP -->
                <div style="text-align:center;margin:32px 0;">
                  <span
                    style="
                      display:inline-block;
                      padding:18px 32px;
                      font-size:32px;
                      font-weight:700;
                      letter-spacing:8px;
                      color:#f8fafc;
                      background:#1e293b;
                      border:1px solid #334155;
                      border-radius:10px;
                    "
                  >
                    ${otp}
                  </span>
                </div>


                <!-- Expiry Notice -->
                <div
                  style="
                    margin-top:24px;
                    padding:12px 16px;
                    background:#422006;
                    color:#fcd34d;
                    border-radius:8px;
                    font-size:14px;
                    line-height:1.6;
                  "
                >
                  This code expires in 5 minutes.
                </div>


                <p
                  style="
                    margin:24px 0 0;
                    font-size:14px;
                    color:#94a3b8;
                    line-height:1.6;
                  "
                >
                  If you didn't request this code, you can safely ignore this email.
                </p>

              </td>
            </tr>


            <!-- Footer -->
            <tr>
              <td
                style="
                  padding:20px 32px;
                  text-align:center;
                  font-size:12px;
                  color:#64748b;
                  border-top:1px solid #1e293b;
                "
              >
                © Pulsify. All rights reserved.
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

module.exports = generateOtpEmail;