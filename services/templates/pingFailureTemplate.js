function pingFailureTemplate(url) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Monitor Down Alert</title>
  </head>

  <body style="margin:0;padding:0;background:#0f172a;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding:40px 20px;">

          <table
            width="600"
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
                    color:#f87171;
                  "
                >
                  Monitor Down
                </h1>

                <p
                  style="
                    font-size:16px;
                    line-height:1.7;
                    color:#cbd5e1;
                  "
                >
                  Your monitor has detected that the following service is currently unavailable:
                </p>


                <!-- URL -->
                <a
                  href="${url}"
                  style="
                    display:block;
                    margin:24px 0;
                    padding:16px;
                    background:#1e293b;
                    border:1px solid #334155;
                    border-radius:8px;
                    color:#60a5fa;
                    text-decoration:none;
                    word-break:break-all;
                    font-size:14px;
                  "
                >
                  ${url}
                </a>


                <div
                  style="
                    margin-top:24px;
                    padding:14px 16px;
                    background:#450a0a;
                    border-radius:8px;
                    color:#fca5a5;
                    font-size:14px;
                    line-height:1.6;
                  "
                >
                 Your service is currently unavailable. Please take action to investigate and resolve the issue. Pulsify will continue monitoring the endpoint and reflect its current status.
                </div>

              </td>
            </tr>


            <!-- Footer -->
            <tr>
              <td
                style="
                  padding:20px;
                  text-align:center;
                  font-size:12px;
                  color:#64748b;
                  border-top:1px solid #1e293b;
                "
              >
                Pulsify monitoring alert.
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

module.exports = pingFailureTemplate;