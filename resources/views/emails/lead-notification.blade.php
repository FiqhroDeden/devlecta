<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Lead Notification</title>
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
            background-color: #059669;
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
        .info-row {
            display: flex;
            margin-bottom: 15px;
            padding: 10px;
            background-color: white;
            border-radius: 3px;
        }
        .info-label {
            font-weight: bold;
            width: 150px;
            color: #6b7280;
        }
        .info-value {
            flex: 1;
        }
        .message-box {
            background-color: white;
            padding: 15px;
            border-left: 4px solid #059669;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            background-color: #059669;
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
        <h1>🎉 New Lead Received!</h1>
    </div>

    <div class="content">
        <h2 style="margin-top: 0;">Lead Details</h2>

        <div class="info-row">
            <div class="info-label">Name:</div>
            <div class="info-value">{{ $lead->name }}</div>
        </div>

        <div class="info-row">
            <div class="info-label">Email:</div>
            <div class="info-value"><a href="mailto:{{ $lead->email }}">{{ $lead->email }}</a></div>
        </div>

        @if($lead->phone)
        <div class="info-row">
            <div class="info-label">Phone:</div>
            <div class="info-value">{{ $lead->phone }}</div>
        </div>
        @endif

        @if($lead->company)
        <div class="info-row">
            <div class="info-label">Company:</div>
            <div class="info-value">{{ $lead->company }}</div>
        </div>
        @endif

        <div class="info-row">
            <div class="info-label">Service Interest:</div>
            <div class="info-value">{{ $lead->service_interest }}</div>
        </div>

        @if($lead->budget_range)
        <div class="info-row">
            <div class="info-label">Budget Range:</div>
            <div class="info-value">{{ $lead->budget_range }}</div>
        </div>
        @endif

        <div class="info-row">
            <div class="info-label">Preferred Language:</div>
            <div class="info-value">{{ strtoupper($lead->preferred_lang) }}</div>
        </div>

        <div class="info-row">
            <div class="info-label">Submitted:</div>
            <div class="info-value">{{ $lead->created_at->format('F d, Y \a\t h:i A') }}</div>
        </div>

        <h3>Message:</h3>
        <div class="message-box">
            {{ $lead->message }}
        </div>

        <a href="{{ url('/admin/leads/' . $lead->id) }}" class="button">View in Admin Dashboard</a>
    </div>
</body>
</html>
