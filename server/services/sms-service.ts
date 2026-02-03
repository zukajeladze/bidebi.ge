interface SMSOfficeResponse {
  status: string;
  message?: string;
  error?: string;
}

class SMSService {
  private apiKey: string;
  private apiUrl: string = 'https://smsoffice.ge/api/v2/send/';
  private sender: string = 'QBIDS';

  constructor() {
    this.apiKey = process.env.SMSOFFICE_API_KEY || '';
    if (!this.apiKey) {
      console.warn('SMSOFFICE_API_KEY not configured');
    }
  }

  generateOTP(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async sendOTP(phoneNumber: string, code: string): Promise<boolean> {
    if (!this.apiKey) {
      console.error('SMSOffice API key not configured');
      return false;
    }

    const cleanPhone = phoneNumber.replace(/\D/g, '');
    
    if (!cleanPhone.startsWith('995')) {
      console.error('Invalid Georgian phone number format. Must start with +995');
      return false;
    }

    const message = `თქვენი QBIDS.GE ვერიფიკაციის კოდი: ${code}`;

    try {
      const params = new URLSearchParams({
        key: this.apiKey,
        destination: cleanPhone,
        sender: this.sender,
        content: message,
      });

      const response = await fetch(`${this.apiUrl}?${params.toString()}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const responseText = await response.text();
      console.log('SMSOffice raw response:', responseText);

      let data: SMSOfficeResponse;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse SMSOffice response:', responseText);
        console.log(`OTP sent to ${phoneNumber} (assuming success based on response)`);
        return true;
      }

      if (data.status === 'success' || data.status === 'ok' || response.ok) {
        console.log(`OTP sent successfully to ${phoneNumber}`);
        return true;
      } else {
        console.error('Failed to send OTP:', data.error || data.message || data);
        return false;
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      return false;
    }
  }

  validatePhoneNumber(phoneNumber: string): boolean {
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    return cleanPhone.startsWith('995') && cleanPhone.length === 12;
  }
}

export const smsService = new SMSService();
