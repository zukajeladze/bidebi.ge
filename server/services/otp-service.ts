import bcrypt from 'bcrypt';
import { storage } from '../storage';
import { smsService } from './sms-service';
import type { OtpVerification } from '@shared/schema';

const SALT_ROUNDS = 10;
const MAX_ATTEMPTS = 5;
const OTP_EXPIRY_MINUTES = 10;

interface CreateOtpResult {
  verificationId: string;
  expiresAt: Date;
}

interface VerifyOtpResult {
  success: boolean;
  error?: string;
  verifiedPhone?: string;
}

class OtpService {
  async createAndSendOtp(phone: string, purpose: string = 'registration', ipAddress?: string): Promise<CreateOtpResult | null> {
    try {
      // Delete any existing OTP verifications for this phone/purpose
      await storage.deleteOtpVerificationsByPhone(phone, purpose);

      // Generate 4-digit OTP code
      const otpCode = smsService.generateOTP();
      
      // Hash the OTP code
      const otpHash = await bcrypt.hash(otpCode, SALT_ROUNDS);

      // Calculate expiry time
      const expiresAt = new Date();
      expiresAt.setMinutes(expiresAt.getMinutes() + OTP_EXPIRY_MINUTES);

      // Store hashed OTP in database
      const otpVerification = await storage.createOtpVerification({
        phone,
        otpHash,
        expiresAt,
        purpose,
        ipAddress: ipAddress || null,
        attemptCount: 0,
      });

      // Send SMS with OTP code
      const smsSent = await smsService.sendOTP(phone, otpCode);
      
      if (!smsSent) {
        // If SMS fails, delete the verification record
        await storage.deleteOtpVerificationsByPhone(phone, purpose);
        return null;
      }

      return {
        verificationId: otpVerification.id,
        expiresAt: otpVerification.expiresAt,
      };
    } catch (error) {
      console.error('Error creating and sending OTP:', error);
      return null;
    }
  }

  async verifyOtp(verificationId: string, code: string, expectedPhone?: string): Promise<VerifyOtpResult> {
    try {
      // Get OTP verification record
      const otpVerification = await storage.getOtpVerificationById(verificationId);

      if (!otpVerification) {
        return { success: false, error: 'Invalid or expired verification ID' };
      }

      // Check if already consumed
      if (otpVerification.consumedAt) {
        return { success: false, error: 'OTP code has already been used' };
      }

      // Check if expired
      if (new Date() > otpVerification.expiresAt) {
        return { success: false, error: 'OTP code has expired. Please request a new one' };
      }

      // Check if too many attempts
      if (otpVerification.attemptCount >= MAX_ATTEMPTS) {
        return { success: false, error: 'Too many failed attempts. Please request a new OTP' };
      }

      // Verify phone matches (if provided)
      if (expectedPhone && otpVerification.phone !== expectedPhone) {
        await storage.incrementOtpAttempt(verificationId);
        return { success: false, error: 'Phone number does not match verification request' };
      }

      // Verify OTP code using constant-time comparison (bcrypt.compare)
      const isValid = await bcrypt.compare(code, otpVerification.otpHash);

      if (!isValid) {
        // Increment attempt count
        await storage.incrementOtpAttempt(verificationId);
        return { success: false, error: 'Invalid OTP code' };
      }

      // Mark as consumed to prevent reuse
      await storage.consumeOtpVerification(verificationId);

      return {
        success: true,
        verifiedPhone: otpVerification.phone,
      };
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return { success: false, error: 'Failed to verify OTP' };
    }
  }

  async cleanupExpiredOtps(): Promise<void> {
    try {
      await storage.deleteExpiredOtpVerifications();
      console.log('Expired OTP verifications cleaned up');
    } catch (error) {
      console.error('Error cleaning up expired OTPs:', error);
    }
  }

  async getActiveOtpByPhone(phone: string, purpose: string = 'registration'): Promise<OtpVerification | undefined> {
    return storage.getActiveOtpVerificationByPhone(phone, purpose);
  }
}

export const otpService = new OtpService();
