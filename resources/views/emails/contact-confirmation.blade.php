<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Contacting Devlecta</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #1e40af;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: #f9fafb;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-top: none;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #6b7280;
        }
        .button {
            display: inline-block;
            background-color: #1e40af;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Thank You for Contacting Us!</h1>
    </div>

    <div class="content">
        <p>Hi {{ $name }},</p>

        <p>Thank you for reaching out to Devlecta. We have received your message and will get back to you within 24-48 hours.</p>

        <p><strong>Your message:</strong></p>
        <p style="background-color: white; padding: 15px; border-left: 4px solid #1e40af;">
            {{ $message }}
        </p>

        <p>In the meantime, feel free to explore our portfolio and learn more about our services:</p>

        <a href="{{ url('/en/portfolio') }}" class="button">View Our Portfolio</a>

        <p style="margin-top: 30px;">Best regards,<br>
        <strong>The Devlecta Team</strong></p>
    </div>

    <div class="footer">
        <p>&copy; {{ date('Y') }} Devlecta. All rights reserved.</p>
        <p>You received this email because you submitted a contact form on our website.</p>
    </div>
</body>
</html>
