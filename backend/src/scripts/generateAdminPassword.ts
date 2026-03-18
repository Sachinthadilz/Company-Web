import bcrypt from "bcryptjs";
import crypto from "crypto";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question: string) =>
  new Promise<string>((resolve) => {
    rl.question(question, resolve);
  });

const run = async () => {
  console.log("\n=== ARTecX Admin Password Generator ===\n");

  const email = await ask(
    "Enter admin email (or press Enter for admin@yourcompany.com): ",
  );
  const password = await ask("Enter admin password: ");

  rl.close();

  console.log("\nGenerating credentials...\n");

  // Generate bcrypt hash (much simpler than PBKDF2!)
  const passwordHash = await bcrypt.hash(password, 10);

  // Generate random session secret
  const sessionSecret = crypto.randomBytes(32).toString("hex");

  console.log("✅ Copy these to your backend/.env file:\n");
  console.log(`ADMIN_EMAIL=${email || "admin@yourcompany.com"}`);
  console.log(`ADMIN_SESSION_SECRET=${sessionSecret}`);
  console.log(`ADMIN_PASSWORD_HASH=${passwordHash}`);
  console.log("");
};

run().catch((error) => {
  rl.close();
  console.error("Failed to generate admin credentials:", error);
  process.exit(1);
});
