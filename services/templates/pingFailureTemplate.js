function pingFailureTemplate(url) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Monitor Down Alert</title>
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
              <td style="padding:32px;text-align:center;background:#991b1b;color:white;">
                <h1 style="margin:0;font-size:24px;">
                  Monitor Down
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:40px 32px;">
                <p style="font-size:16px;color:#374151;">
                  Your monitor has detected that the following service is unavailable:
                </p>

                <a
                  href="${url}"
                  style="
                    display:block;
                    margin:24px 0;
                    padding:16px;
                    background:#f3f4f6;
                    border-radius:8px;
                    color:#2563eb;
                    text-decoration:none;
                    word-break:break-all;
                  "
                >
                  ${url}
                </a>

                <p style="font-size:14px;color:#6b7280;">
                  We will continue monitoring this service and notify you when it recovers.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:20px;text-align:center;font-size:12px;color:#9ca3af;">
                Monitoring alert
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