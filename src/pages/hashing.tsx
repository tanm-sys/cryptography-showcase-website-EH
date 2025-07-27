import Sha256Interactive from "@/components/crypto/sha256-interactive";

export default function HashingPage() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          SHA-256 Hashing
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-muted-foreground">
          See how the Secure Hash Algorithm 256 works in real-time. Any small change in the input will result in a completely different hash.
        </p>
      </div>
      <Sha256Interactive />
    </div>
  );
}
