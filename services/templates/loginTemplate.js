function loginTemplate() {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>

  <body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table
            width="600"
            style="
              max-width:600px;
              background:#ffffff;
              border-radius:12px;
              overflow:hidden;
              box-shadow:0 4px 20px rgba(0,0,0,0.06);
            "
          >
            <tr>
              <td style="padding:32px;text-align:center;background:#111827;color:white;">
                <h1 style="margin:0;font-size:24px;">
                  New Login Detected
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:40px 32px;">
                <p style="font-size:16px;color:#374151;">
                  A new login to your account was detected.
                </p>

                <p style="font-size:16px;color:#374151;">
                  If this was you, no action is required.
                </p>

                <p style="
                  margin-top:24px;
                  padding:12px 16px;
                  background:#fef3c7;
                  color:#92400e;
                  border-radius:8px;
                  font-size:14px;
                ">
                  If you do not recognize this activity, secure your account immediately.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px;text-align:center;font-size:12px;color:#9ca3af;">
                Security notification
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

module.exports = loginTemplate;