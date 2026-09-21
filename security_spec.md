# Security Specification: Portfolio Firebase ABAC Rules

## 1. Data Invariants
1. **Public Read Integrity**: The public must be able to view `projects`, `skills`, and `profile` documents without authentication.
2. **Inquiry Write Integrity**: Any visitor can submit a valid `messages` document with constrained string lengths and `read == false`.
3. **Inquiry Privacy / PII Isolation**: Only authenticated admins (`dindafika686@gmail.com` with `email_verified == true` or admin document in `/admins/{uid}`) can read, list, update, or delete visitor messages.
4. **Admin Protection**: Only authorized, email-verified administrators can write, modify, or delete `projects`, `skills`, `profile`, and `admins` documents.
5. **ID Poisoning Protection**: Path IDs must conform to `^[a-zA-Z0-9_\\-]+$` with a maximum length of 128 characters.

## 2. The "Dirty Dozen" Threat Payloads
1. **Unauthenticated Project Creation**: Anonymous or non-admin user attempts to write a malicious project. (Expected: PERMISSION_DENIED)
2. **Ghost Field Injection on Project Update**: Attacker attempts to update a project with arbitrary unauthorized keys. (Expected: PERMISSION_DENIED)
3. **Admin Identity Spoofing (Unverified Email)**: Attacker authenticates with `dindafika686@gmail.com` without `email_verified == true`. (Expected: PERMISSION_DENIED)
4. **Public Message Scraping / PII Breach**: Unauthenticated or non-admin user attempts to list or read `/messages` to harvest emails. (Expected: PERMISSION_DENIED)
5. **Message Pre-marking as Read**: Visitor sends a message with `read: true` to conceal or manipulate inbox state. (Expected: PERMISSION_DENIED)
6. **Huge Message Denial-of-Wallet (Oversized payload)**: Attacker attempts to send a 5MB message body. (Expected: PERMISSION_DENIED)
7. **Skill Tampering by Non-Admin**: Non-admin user attempts to delete or alter technical proficiency percentages. (Expected: PERMISSION_DENIED)
8. **Profile Override by Non-Admin**: Unauthorized user tries to change CV URL or contact email in `/profile/main`. (Expected: PERMISSION_DENIED)
9. **Admin Collection Escalation**: Non-admin writes their own UID into `/admins/{uid}`. (Expected: PERMISSION_DENIED)
10. **ID Injection Attack**: Malicious document ID containing special characters or paths (e.g. `../../config`). (Expected: PERMISSION_DENIED)
11. **Blanket Collection Write**: Unauthorized user attempts to write to `{document=**}` catch-all. (Expected: PERMISSION_DENIED)
12. **Malicious Negative Skill Level**: Attacker injects a skill with level > 100 or level < 0. (Expected: PERMISSION_DENIED)
