/**
 * Sends the ArcSultans whitelist confirmation email.
 *
 * The email template system is wired up once an email sender domain is
 * configured for the project. Until then this is a no-op so signups still
 * succeed and are stored.
 */
export async function sendWhitelistConfirmation(email: string): Promise<void> {
  console.log("Whitelist confirmation email pending email domain setup for:", email);
}
